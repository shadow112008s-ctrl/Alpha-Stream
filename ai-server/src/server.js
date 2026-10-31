import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import OpenAI from "openai";
import { z } from "zod";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (allowedOrigins.length > 0) {
  app.use(cors({
    origin(origin, callback) {
      // Native mobile clients may omit Origin. Browser origins must be allow-listed.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }));
}

const messageSchema = z.object({
  message: z.string().trim().min(1).max(4000),
}).strict();

const limiter = rateLimit({
  windowMs: 60_000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait a moment and try again." },
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "alpha-stream-ai" });
});

app.post("/api/assistant", limiter, async (req, res) => {
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Send a message between 1 and 4000 characters." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "AI assistant is not configured on the server yet." });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: [
        "You are Alpha Stream Assistant, a helpful guide to using the Alpha Stream app.",
        "Help users understand app features, playback settings, accessibility, and troubleshooting.",
        "Only guide users to media they own, public-domain works, or sources they are authorized to access.",
        "Do not help locate unauthorized copies or bypass access controls.",
        "Do not claim to have changed app settings, installed updates, or played media unless the app confirms it."
      ].join(" "),
      input: parsed.data.message,
      max_output_tokens: 700,
    });

    return res.status(200).json({ answer: response.output_text || "I couldn't produce an answer. Please try again." });
  } catch (error) {
    // Do not expose provider errors, request payloads, or credentials to clients.
    console.error("OpenAI request failed:", error?.status || "unknown status");
    return res.status(502).json({ error: "The AI service is temporarily unavailable. Please try again later." });
  }
});

app.use((error, _req, res, _next) => {
  if (error?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request is too large." });
  }
  if (error?.message === "Origin is not allowed") {
    return res.status(403).json({ error: "Origin is not allowed." });
  }
  return res.status(400).json({ error: "Invalid request." });
});

const port = Number(process.env.PORT || 8787);
if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Alpha Stream AI server listening on port ${port}`);
  });
}

export { app, messageSchema };
