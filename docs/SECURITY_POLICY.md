# Alpha Stream — Security Policy and Vulnerability Disclosure

**Status:** Draft security policy and preliminary source observations. NOT a security certification, penetration-test report, or proof that controls are implemented.  
**Reviewed:** 2026-11-01  
**Repository:** https://github.com/shadow112008s-ctrl/Alpha-Stream

## 1. Security commitment

The project intends to protect users through secure development, least-privilege permissions, dependency maintenance, protected credentials, and responsible vulnerability handling. Only controls that have been implemented and tested may be represented as active safeguards. This document does not certify the current app as secure.

## 2. Vulnerability reporting — publisher action required

**Security contact:** [ADD A MONITORED PRIVATE EMAIL OR ENABLED PRIVATE VULNERABILITY REPORTING CHANNEL]  
**Acknowledgement target:** [SET A REALISTIC, STAFFED COMMITMENT]  
**Supported versions:** [LIST ONLY VERSIONS THE MAINTAINER CAN PATCH]

Do not publish this policy as an operational promise until the contact is monitored and the response process is staffed. Until then, use GitHub's private vulnerability reporting feature if enabled. Never post credentials, private keys, personal data or sensitive exploit details in a public issue.

Reports should include the affected version/commit, Android version/device class, impact, safe reproduction steps, and evidence with secrets/personal data removed. Only test systems and accounts you own or have explicit permission to assess. Do not disrupt services, access other people's data, or conduct destructive testing.

## 3. Source observations requiring remediation or verification

### Android network security
- `app/src/main/AndroidManifest.xml` declares `android:usesCleartextTraffic="true"`. This allows cleartext capability at the application policy level; verify actual endpoints and remove the broad allowance for production unless a documented, narrowly scoped exception is unavoidable.
- The manifest includes broad permissions such as `MANAGE_EXTERNAL_STORAGE`, `QUERY_ALL_PACKAGES`, `REQUEST_INSTALL_PACKAGES`, `UPDATE_PACKAGES_WITHOUT_USER_ACTION` and `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`. Each needs feature-by-feature necessity, runtime behavior and current Play policy review.

### Credentials in build configuration
- `app/build.gradle.kts` defines BuildConfig values for Simkl client ID/secret and MyAnimeList/AniList keys from environment variables or local properties. Determine which are public client identifiers versus confidential credentials and inspect the resulting APK. Values compiled into an APK must be treated as extractable; do not embed server secrets. Rotate any confidential credential found in a distributed build and move privileged operations server-side where appropriate.

### Extensions and providers
- The app calls provider APIs and supports a plugin/repository mechanism. Each installed extension may add code, network endpoints and data flows. Establish trusted repository policy, integrity/provenance checks, update validation, URL/redirect validation, and a user-visible trust boundary. Audit the exact production extension set.

### Diagnostics and logs
- `LogcatDialog.kt` allows users to view, copy and export device logcat. Inspect log statements and dependency logs for tokens, cookies, personal data and URLs; redact sensitive fields before display/export where possible and explain the user-controlled export behavior.

These are review findings, not proof that a vulnerability has been exploited.

## 4. Controls to implement and verify

- [ ] Enforce HTTPS/TLS for production endpoints; remove broad cleartext traffic capability or narrowly scope and document any exception.
- [ ] Keep API keys, signing credentials, tokens and passwords out of source control, APKs, logs, screenshots and issue reports.
- [ ] Verify BuildConfig fields and shipped binaries contain no confidential credentials.
- [ ] Use least-privilege GitHub Actions permissions; pin third-party actions to reviewed immutable SHAs where practical.
- [ ] Require human approval for signing and publishing; CI must not publish or deploy automatically.
- [ ] Review exported Android components, intent filters, deep links, WebViews, file providers, backup rules and pending intents.
- [ ] Review storage, package visibility, install/update, notification and background-service permissions; remove unnecessary permissions.
- [ ] Validate external provider URLs and redirects; do not trust provider responses as instructions or executable code.
- [ ] Protect cookies, authentication headers and tokens; avoid logging sensitive request/response data.
- [ ] Keep dependencies current; review advisories, licences, provenance and transitive dependencies.
- [ ] Run static analysis, dependency scanning, lint, tests and release-build checks; triage findings and retain evidence.
- [ ] Test update/download flows for tampering, unsafe file paths and untrusted packages.
- [ ] Define incident response, contact, user notification criteria and recovery/rollback procedures.
- [ ] Perform independent security review before public distribution.

## 5. CI and signing boundary

The pull-request workflow is intended to validate builds and produce review artifacts only. No production signing key or publishing credential should be placed in the repository or shared in chat. The authorized publisher must retain control of signing and publishing credentials. CI must not publish releases or deploy without explicit approved controls.

## 6. Coordinated disclosure

Maintainers should assess reports, coordinate a reasonable remediation timeline, and agree on disclosure timing with the reporter. Do not promise response times until a responsible maintainer has accepted and can meet them.

## 7. Scope and safe harbor

Only test systems and accounts you own or have explicit written permission to assess. Do not access, modify, exfiltrate or destroy data; disrupt services; conduct social engineering; or attempt physical attacks. Stop testing and report if personal data is encountered. This policy does not authorize testing third-party providers; their reporting policies apply.

## 8. Policy maintenance

Review at least annually and after material changes to the app, infrastructure, dependencies or incident process. Keep the security contact, supported versions and response commitment current.
