# Alpha Stream Autonomous Maintenance Agent

This repository uses a guarded GitHub Actions workflow to let an AI coding agent review and improve Alpha Stream.

## Operating rules

- Work only on `alpha-stream-full-repair` and the existing draft pull request targeting `alpha-stream-branding`.
- Treat this file (`ALPHA_STREAM_AGENT.md`) as high-trust policy input: do not modify it in agent-authored changes unless a trusted human explicitly requests and reviews the change.
- If workflow logic ingests this policy, require an integrity check (for example, verify a pinned hash or trusted revision) before using it as instructions.
- Review recent source changes, build/test/lint failures, dependency warnings, app identity, updater configuration, and documentation.
- Make small, evidence-based fixes. Prefer one focused change at a time.
- Let the Android CI workflow verify every pushed change. Read its results before claiming success.
- Keep the pull request in draft state. Never merge it.
- Never publish releases, deploy, distribute APKs, change repository settings, alter secrets, or weaken security controls.
- Never expose credentials or copy secrets into logs, commits, issues, or comments.
- Do not add media sources that facilitate copyright infringement or bypass access controls. Integrations must be for authorized content only.
- Do not claim device playback, installation, iOS support, or real-device compatibility unless those have actually been tested.
- If a change needs a paid API, a credential, legal review, a device test, or user approval, stop and explain the blocker.
- Do not make broad rewrites or delete features just to make CI green.

## Completion report

Summarize changed files, why each change was needed, CI run links and actual outcomes, remaining risks, and the next user action. If no safe fix is justified, report that no code change was made.


## Required external setup (owner action)

The repository cannot create paid-service credentials or signing keys on the owner's behalf.

### Claude AI coding

1. Obtain an Anthropic API key from the Anthropic Console (API billing may apply; the free Claude mobile app subscription is not an API key).
2. In GitHub, open Settings -> Secrets and variables -> Actions -> New repository secret.
3. Name it exactly `ANTHROPIC_API_KEY`; paste the key directly into GitHub's secret field, never into chat, source files, or workflow logs.
4. Run **Actions -> Alpha Stream AI Maintenance Agent -> Run workflow** on `alpha-stream-full-repair`.

Without this secret, the workflow intentionally skips the AI coding step and reports that it is not configured. The scheduled workflow now invokes the Claude step when the secret exists; previously it was incorrectly restricted to manual dispatch.

### Play Store signing

The signed AAB workflow requires four repository Actions secrets: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, and `ANDROID_KEY_PASSWORD`. Generate/own and back up the upload keystore securely. Never commit it or paste it into chat. A signed bundle is not proof of Play policy compliance or publication readiness.

### Play Store release evidence still required

- Confirm app ownership and rights to all bundled assets, source code, provider integrations, and content.
- Verify the final application ID, versioning, target SDK, permissions, privacy policy URL, Data safety answers, and account/deletion requirements if applicable.
- Complete the Play Console store listing, screenshots, app access instructions, content rating, and testing-track requirements.
- Test installation, launch, playback with authorized providers, downloads where permitted, updates, and crash behavior on supported physical Android devices.
- Build and inspect the signed AAB, verify signing identity, and upload it to a testing track for Play Console review before production rollout.

Do not mark any item complete without publisher evidence. Do not publish automatically.
