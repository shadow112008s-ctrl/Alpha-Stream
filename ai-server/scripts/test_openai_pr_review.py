import unittest

from openai_pr_review import redact_sensitive_diff


class RedactionTests(unittest.TestCase):
    def test_redacts_bearer_authorization(self):
        text = "Authorization: Bearer abcdefghijklmnopqrstuvwxyz123456"
        self.assertNotIn("abcdefghijklmnopqrstuvwxyz123456", redact_sensitive_diff(text))

    def test_redacts_github_tokens(self):
        text = "github_pat_abcdefghijklmnopqrstuvwxyz123456 ghp_abcdefghijklmnopqrstuvwxyz123456"
        result = redact_sensitive_diff(text)
        self.assertNotIn("github_pat_", result)
        self.assertNotIn("ghp_", result)
        self.assertEqual(result.count("[REDACTED GITHUB TOKEN]"), 2)

    def test_redacts_openai_keys(self):
        text = "OPENAI_API_KEY=sk-proj-abcdefghijklmnopqrstuvwxyz123456"
        result = redact_sensitive_diff(text)
        self.assertNotIn("sk-proj-", result)
        self.assertIn("[REDACTED API KEY]", result)

    def test_redacts_secret_assignments(self):
        text = 'client_secret: "very-sensitive-value"'
        result = redact_sensitive_diff(text)
        self.assertNotIn("very-sensitive-value", result)
        self.assertIn("[REDACTED]", result)

    def test_redacts_pem_private_key_blocks(self):
        text = "-----BEGIN PRIVATE KEY-----\nprivate-material\n-----END PRIVATE KEY-----"
        result = redact_sensitive_diff(text)
        self.assertNotIn("private-material", result)
        self.assertIn("[REDACTED PRIVATE KEY]", result)

    def test_keeps_ordinary_code(self):
        text = "fun greet() = \"Hello Alpha Stream\""
        self.assertEqual(redact_sensitive_diff(text), text)


if __name__ == "__main__":
    unittest.main()
