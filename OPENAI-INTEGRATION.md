# OpenAI integration plan

Alpha Stream will use OpenAI in two separate ways:

1. Development assistance and reviewed code changes through GitHub pull requests.
2. An optional in-app assistant, accessed through the server-side service in `ai-server/`.

## Security

- API keys are server secrets only; never add them to Kotlin, Gradle, Android resources, APKs, GitHub commits, or client-side configuration.
- The Android app must call an HTTPS backend URL, not api.openai.com directly with a secret.
- The backend currently exposes a minimal Responses API endpoint and validation tests.
- The backend is not deployed and the Android UI is not yet wired to it.

## Approval and release policy

- Work happens on feature branches and is submitted as a pull request.
- CI may test and upload debug artifacts.
- No automatic merging, release publishing, or production deployment is permitted.
- A human must review and approve every merge and release.
