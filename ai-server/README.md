# Alpha Stream AI server

This optional Node.js service provides a secure server-side gateway to the OpenAI Responses API.

## Why it is separate

**Never put an OpenAI API key in the Android app, APK, browser JavaScript, or Git repository.** The app should call this service; this service reads `OPENAI_API_KEY` from its server environment.

## Run locally

1. Install Node.js 20 or newer.
2. From this directory, run `npm install`.
3. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` in your local server environment.
4. Run `npm test`.
5. Run `npm start`.

The service exposes:
- `GET /health` — health check.
- `POST /api/assistant` — JSON body `{"message":"How do I use subtitles?"}`; returns `{"answer":"..."}`.

## Deployment checklist

- Store `OPENAI_API_KEY` in the hosting provider's encrypted environment/secrets store, never in GitHub source files.
- Set `OPENAI_MODEL` to a model enabled for your Platform project.
- Set `ALLOWED_ORIGINS` to exact trusted web origins if browser clients will call the service.
- Add authentication/user quotas before exposing this endpoint publicly; the included IP rate limit is only a basic safeguard.
- Use HTTPS, monitor usage and set a project budget/usage alert in OpenAI Platform.
- Keep API usage server-side. API billing/limits are separate from a ChatGPT app subscription.

## Current integration status

This commit adds and tests the secure API service foundation. It does **not** embed credentials, deploy a server, or claim the Android UI is connected yet. The Android app needs a configured HTTPS service URL and a client UI integration in a later reviewed change.
