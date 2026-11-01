# Alpha Stream — Google Play release readiness

Audit basis: repository branch `alpha-stream-release-candidate` as inspected on 2026-11-01. This document records evidence and unresolved items; it is not a certification of Play policy compliance.

## 1. Release gate summary

| Gate | Evidence in repository | Status |
|---|---|---|
| Reference-design match | Existing UI work is spread across draft PRs #3 and #4; PR #4 is only a visual foundation. | Not complete; compare all supplied reference screens on-device. |
| Signed production AAB | Manual workflow `.github/workflows/play-upload-bundle.yml` builds `bundleStableRelease` if four signing secrets exist. No successful run for the current candidate was verified during this audit. | Not verified; no production AAB evidence. |
| Privacy policy | No verified final policy URL or completed data-flow inventory was found in the inspected candidate tree. | Blocked pending app/SDK/provider data audit and publisher contact details. |
| Data safety | App includes network, account/sync, extension, subtitle, analytics-like external integrations and other libraries; the exact data flows of all code and optional extensions have not been verified. | Cannot truthfully complete yet. |
| Content/provider rights | README instructs users to use owned, public-domain, or explicitly authorized sources. No provider-specific license/authorization evidence was found in this repository audit. | Blocked pending written rights evidence for every promoted/configured source. |
| Physical-device test | No test report from the target Redmi Note 8 was supplied or verified. | Not tested. |
| Store listing | An original text draft is included below; final screenshots, feature graphic, privacy URL, rating and declarations are not verified. | Draft only. |

## 2. Manifest and policy review required

The candidate manifest currently declares:

- `INTERNET`, `ACCESS_NETWORK_STATE`
- legacy `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`
- `MANAGE_EXTERNAL_STORAGE` (comment says plugin API)
- `REQUEST_INSTALL_PACKAGES` (comment says app update)
- `UPDATE_PACKAGES_WITHOUT_USER_ACTION`
- `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`
- `QUERY_ALL_PACKAGES`
- notifications, foreground data-sync service, biometric and Android TV EPG permissions
- `android:usesCleartextTraffic="true"`

Do not remove permissions blindly: first trace every call site and decide whether the function is essential to the Play-distributed core app. Prefer Android's Storage Access Framework/document picker and narrowly scoped package visibility where they satisfy the actual feature. Remove cleartext traffic unless a documented, unavoidable endpoint requires it; use HTTPS. Any retained restricted permission needs a policy justification and, where required, a Play Console declaration and review approval. This audit does not establish that any restricted permission will be accepted.

## 3. Privacy and Data safety evidence still required

Before writing a final privacy policy or completing Play Console Data safety, inventory and verify:

1. Every first-party network request, account/sync endpoint, authentication flow and data-retention behavior.
2. Every bundled SDK/library's data collection and sharing behavior, including crash reporting, analytics, image/network libraries, authentication and media integrations.
3. Optional extension/provider behavior, and whether extensions can access identifiers, files, browsing/search activity, playback history or credentials.
4. Data stored locally, backed up, exported, deleted, or transmitted to third parties.
5. Whether users can request account/data deletion, and the actual process and contact address.
6. Encryption in transit, access controls, retention periods, and the publisher's support/privacy contact.

Do not declare "no data collected" until first-party code, bundled SDKs and supported extension behavior have been checked. Google Play requires the Data safety form and a privacy policy for apps on relevant testing and production tracks; third-party SDK behavior must be included in the assessment.

## 4. Provider rights register

For every provider that the Play listing, onboarding, screenshots or app defaults mention or enable, retain written evidence covering:

- provider's legal identity and contact;
- exact content/catalogue and territories covered;
- authorization to index, link, stream, cache, download, display artwork/subtitles and use trademarks (only where specifically granted);
- term, expiry, revocation and takedown contact;
- whether the authorization covers commercial distribution through Google Play.

A public repository, API, extension, accessible URL or permission to use software is not proof of rights to the underlying films, shows, anime, artwork or subtitles. Until evidence exists, do not advertise or bundle that provider. The app must not encourage unauthorized streaming or downloading.

## 5. Signing and build verification

The workflow requires these protected repository secrets (never commit them or place them in issues/chat):

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

The workflow is manual-only and uploads an artifact; it does not publish to Google Play. After the publisher configures the secrets, run the workflow and verify the resulting AAB's package ID, version code/name, signing certificate fingerprint, target SDK, artifact integrity and installability through Play internal testing. Keep the upload key securely backed up. Prefer Google Play App Signing for the app-signing key.

## 6. Physical-device test plan — Redmi Note 8

Record Android version, build number, app version and test date. Test at minimum:

- clean install, first launch, onboarding and permissions;
- launch after force-stop and after device restart;
- navigation, search, detail pages, bookmarks and playback history;
- lawful test media playback, pause/seek/subtitles/audio selection;
- authorized local-file access and download behavior;
- background/foreground transitions, notification behavior and battery use;
- network loss/recovery, slow connection and server errors;
- rotation, small-screen layout, accessibility labels and text scaling;
- memory pressure, repeated navigation and crash-free soak;
- update from the previous signed version using the same signing identity.

Attach screenshots, logs with personal data removed, and pass/fail notes. Do not mark tests passed without actual device execution.

## 7. Draft Google Play listing (not final)

**App name:** Alpha Stream

**Short description:** A customizable media player and media library for content you are authorized to access.

**Full description:**

Alpha Stream is an Android media-center application for organizing and playing media you own, public-domain media, or content you are explicitly authorized to access.

Features include:
- Search and browse media from compatible sources you configure.
- Keep bookmarks and track your viewing progress.
- Play supported video files with subtitle options.
- Manage authorized downloads and local media.
- Customize the interface and playback preferences.

Source availability and compatibility depend on the provider, content rights, device and Android version. Alpha Stream does not grant rights to third-party content. You are responsible for ensuring that you have permission to access, stream or save content through any source you configure.

Alpha Stream is based on the open-source CloudStream project. See the in-app and repository license notices for applicable attribution and license terms.

**Listing assets still needed:** original app icon, original feature graphic, phone screenshots of the actual release build, and (if supported) tablet/TV screenshots. Do not use movie/anime posters, studio logos, copyrighted characters or third-party artwork without written permission.

## 8. Final submission gate

Do not submit for production until all of these have evidence:

- [ ] Full reference-design comparison signed off.
- [ ] Successful signed stable AAB workflow run and certificate verified.
- [ ] Privacy policy published at a stable public URL and matching actual behavior.
- [ ] Data safety answers completed from the verified data inventory.
- [ ] Every enabled/promoted content source has documented rights, or is removed/disabled from the Play build and listing.
- [ ] Restricted permissions justified, removed or accepted through the required Play declaration/review.
- [ ] Redmi Note 8 physical-device test report passed.
- [ ] Store listing assets and metadata are original, accurate and policy-compliant.
- [ ] Publisher reviews all declarations and submits manually.

## 9. Official policy references

- Google Play Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play intellectual property: https://support.google.com/googleplay/android-developer/answer/9888072
- Google Play App Signing: https://support.google.com/googleplay/android-developer/answer/9842756
- Google Play developer policies: https://support.google.com/googleplay/android-developer/
