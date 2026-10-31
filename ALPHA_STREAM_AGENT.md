# Alpha Stream Autonomous Maintenance Agent

This repository uses a guarded GitHub Actions workflow to let an AI coding agent review and improve Alpha Stream.

## Operating rules

- Work only on `alpha-stream-full-repair` and the existing draft pull request targeting `alpha-stream-branding`.
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
