# Alpha Stream — Privacy and Data Inventory

**Status:** Preliminary static-code inventory only. This is NOT a completed privacy audit or Data safety declaration.  
**Reviewed:** 2026-11-01  
**Branch:** alpha-stream-full-repair

## Scope and limits
Reviewed the Android manifest, app Gradle configuration, and Gradle version catalog. The app was not executed; all runtime code paths, network traffic, transitive SDK behavior, and vendor privacy statements were not fully examined. No conclusion that data is or is not collected can be made from this limited review.

## Observed manifest declarations
The manifest declares INTERNET, ACCESS_NETWORK_STATE, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, MANAGE_EXTERNAL_STORAGE, MODIFY_AUDIO_SETTINGS, REQUEST_INSTALL_PACKAGES, POST_NOTIFICATIONS, UPDATE_PACKAGES_WITHOUT_USER_ACTION, FOREGROUND_SERVICE, FOREGROUND_SERVICE_DATA_SYNC, USE_BIOMETRIC, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Android TV EPG read/write permissions, and QUERY_ALL_PACKAGES. It also declares android:usesCleartextTraffic="true".

A permission declaration does not prove runtime use. Map every permission to a current user-facing feature and review Play eligibility. Broad storage, package visibility, app install/update, battery optimization, and cleartext network access require specific scrutiny and removal if unnecessary.

## Direct dependency families observed
The app Gradle configuration and version catalog include AndroidX/Jetpack, Compose Multiplatform, lifecycle/navigation/WorkManager/TV Provider/biometric; Media3 playback and casting; Cronet/OkHttp; Coil; Ktor; NiceHttp; NewPipeExtractor; Jsoup/Ksoup; Rhino; Zipline; Jackson/Gson/kotlinx serialization; image/media utilities; and torrent-related libraries. This is not a full SBOM and does not enumerate transitive libraries.

No advertising or analytics SDK was positively identified in this limited direct-dependency review. This is not proof that none is packaged or that no telemetry occurs.

## Data-flow questions requiring verification
| Area | Verify whether it accesses, stores, transmits, or shares |
|---|---|
| Provider search/playback | Search terms, content IDs, stream URLs, IP address, request headers, cookies, provider logs, recipients |
| Images/posters | Requested URLs, IP address, headers, caching, image-host recipients |
| Downloads/background work | File names/URIs, download URLs, progress, notifications, logs |
| Local media/storage | File names, paths, metadata, and whether information stays on-device |
| Optional integrations | Tokens, account data, watch history, bookmarks, sync information |
| Diagnostics | Crash logs, stack traces, device details, identifiers, recipients |
| Package visibility | Installed-app details queried and purpose |
| Network security | HTTP endpoints, TLS enforcement, secrets/tokens in URLs or logs |

Do not state "no data collected", "no analytics", or "data stays on device" until supported by source review and runtime evidence.

## Required evidence before publication
- [ ] Generate a complete SBOM, including transitive dependencies and SDKs.
- [ ] Search source for network clients, analytics, crash reporting, identifiers, cookies, tokens, logging, account APIs, and storage writes.
- [ ] Test representative app flows while recording outbound domains and request metadata.
- [ ] Obtain current privacy/data-processing documentation for each third-party service and SDK.
- [ ] Map each data item to purpose, collection trigger, recipient, retention, deletion, and security controls.
- [ ] Review every retained permission against current Play policy.
- [ ] Match the final privacy policy, in-app disclosure, and Play Console Data safety answers to the verified inventory.
- [ ] Obtain jurisdiction-specific privacy review from the authorized publisher.

## Metadata inconsistency
The existing Fastlane English listing contains a legacy statement that the app has no ads and analytics. This limited inventory does not substantiate that claim. Do not publish or reuse it until the full dependency and runtime audit confirms it.
