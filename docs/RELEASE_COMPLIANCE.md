# Alpha Stream — Release Compliance Gate

**Status:** Open; not approved for public distribution.  
**Review date:** 2026-11-01  
**Pull request:** https://github.com/shadow112008s-ctrl/Alpha-Stream/pull/1

This checklist records evidence and remaining gates. It does not replace legal advice or Google Play review.

## Provider and content authorization
- [ ] Publisher retains written authorization for every media provider, catalog, artwork source, metadata service, and streamed/downloaded work enabled by the app.
- [ ] Authorization covers territories, app distribution, streaming/download features, branding, and duration.
- [ ] Provider terms permit the exact integration and user-facing behavior.
- [ ] Takedown/contact and provider revocation processes are documented.
- [ ] Qualified reviewer checks the provider register and territorial restrictions.

**Owner statement:** The project owner states provider rights are verified. This repository review has not independently examined contracts, licences, or provider terms. Retain evidence securely; do not commit confidential contracts.

## Open-source and third-party licences
- [ ] Generate and review a complete SBOM and third-party licence report, including transitive dependencies and bundled assets.
- [ ] Confirm GPL-3.0 source, notice, corresponding-source, and applicable installation-information obligations for the exact distributed build.
- [ ] Confirm all other dependencies, extensions, artwork, fonts, and icons are compatible with the distribution model.
- [ ] Include required copyright notices and licence texts.
- [ ] Obtain qualified review of combined-work and distribution obligations.

GPL-3.0 covers software under its terms; it does not grant rights to third-party films, anime, provider services, trademarks, posters, or other media.

## Privacy and data protection
- [ ] Complete docs/PRIVACY_DATA_INVENTORY.md using source review, a complete SBOM, and observed runtime network behavior.
- [ ] Complete and approve docs/PRIVACY_POLICY_DRAFT.md; remove every placeholder.
- [ ] Add a public HTTPS privacy-policy URL in Play Console and make the policy accessible in-app.
- [ ] Ensure Play Console Data safety answers match app behavior and every SDK/service.
- [ ] Implement required in-app prominent disclosures and affirmative consent.
- [ ] Verify retention, deletion, security, privacy contact, and jurisdictional requirements.
- [ ] Review intended audience, age rating, and child-safety requirements.

## Android permissions and network security
- [ ] Map every manifest permission to an implemented feature and policy-compliant purpose.
- [ ] Review MANAGE_EXTERNAL_STORAGE, QUERY_ALL_PACKAGES, REQUEST_INSTALL_PACKAGES, UPDATE_PACKAGES_WITHOUT_USER_ACTION, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, and legacy storage permissions for necessity and Play eligibility.
- [ ] Review usesCleartextTraffic="true"; disable cleartext unless a documented, controlled, policy-compliant requirement remains.
- [ ] Verify exported components, backup/data extraction rules, file-provider paths, deep links, and update flows.
- [ ] Confirm secrets and personal data are not unintentionally exposed in logs or URLs.

## Signing and build integrity
- [ ] Authorized publisher owns and protects the upload key and recovery process.
- [ ] Use Google Play App Signing where appropriate; keep the upload key separate from Google's app-signing key.
- [ ] Store signing credentials only in publisher-controlled protected storage or a controlled local environment. Never commit keys/passwords or send them to an assistant.
- [ ] Verify release AAB signature, package ID, version code/name, target SDK, and build provenance.
- [ ] Confirm update compatibility with the currently distributed app's signing identity and package ID.

## Testing and store readiness
- [ ] Install/upgrade test on supported physical Android phones/tablets/TV devices.
- [ ] Test provider search, authorized playback, subtitles, downloads, offline playback, external-player intents, notifications, background work, permissions, updates, and crash/restart behavior.
- [ ] Test minimum and current supported Android versions.
- [ ] Review all test/lint reports and resolve high/critical security issues.
- [ ] Replace legacy CloudStream store metadata with accurate Alpha Stream copy and original assets.
- [ ] Authorized publisher completes content rating, app access, ads, target audience, Data safety, privacy policy, and other Play declarations.
- [ ] Authorized publisher explicitly approves the final listing and release.

## CI evidence
- Previous successful PR run: https://github.com/shadow112008s-ctrl/Alpha-Stream/actions/runs/41313519426
- Latest release-variant validation run at document creation: https://github.com/shadow112008s-ctrl/Alpha-Stream/actions/runs/41315633958
- Recheck the latest run before claiming a current APK/AAB artifact exists.
- CI intentionally does not sign, publish, create releases, or deploy.

## Decision
Do not merge or publish while required gates remain unchecked. Keep the PR in draft pending evidence and authorized publisher approval.
