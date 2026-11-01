# Alpha Stream — Privacy and Data Inventory

**Status:** Source-informed preliminary inventory; NOT a completed privacy audit, runtime traffic audit, SBOM, legal review, or Google Play Data safety determination.  
**Reviewed:** 2026-11-01  
**Branch:** `alpha-stream-full-repair`

## Review scope and limits

Reviewed the Android manifest, app Gradle configuration, version catalog, and selected application source files for account integrations, provider loading, playback, downloads, and log export. This is a targeted review, not an exhaustive line-by-line audit. The app was not executed and outbound traffic was not captured. Transitive dependencies, every provider/extension, remote repository content, vendor privacy statements, and production configuration have not been fully examined.

**No statement that the app collects no personal data is supported by this review.** No final Data safety answers can be prepared yet.

## Directly observed in repository source

| Source | What the code shows | Privacy/security implication |
|---|---|---|
| `app/src/main/java/com/lagradost/cloudstream3/ui/APIRepository.kt` | Provider methods are invoked for search, quick search, homepage, content loading, playback-link extraction and subtitles. | Search terms, content identifiers, provider URLs, IP address, request headers/cookies and provider-side logs may be processed by whichever provider/extension is active. Exact fields and recipients require provider-by-provider review and runtime capture. |
| `app/src/main/java/com/lagradost/cloudstream3/MainActivity.kt` | Initializes providers and plugin management; account/sync integrations are referenced. | App behavior and external data flows can depend on installed/loaded plugins and connected services. |
| `app/src/main/java/com/lagradost/cloudstream3/plugins/RepositoryManager.kt` and plugin manager references | The app supports extension/repository management. | Remote extension code/configuration can add network destinations and data handling not captured by the base-app dependency list. Audit the complete enabled repository and extension set. |
| `app/src/main/java/com/lagradost/cloudstream3/syncproviders/AccountManager.kt` | Source references third-party sync/catalog integrations including MyAnimeList, Kitsu, AniList and Simkl, plus local-list handling. | If users enable these integrations, account identifiers, authorization data, watch-list or related sync information may be sent to those services. Confirm exact scopes, fields, endpoints, token storage, retention and deletion. |
| `app/src/main/java/com/lagradost/cloudstream3/services/VideoDownloadService.kt` and downloader classes | Background download service and download manager are present. | Download URLs, file identifiers/paths, progress and notification state may be handled locally and/or by source hosts. Confirm exact behavior and retention. |
| `app/src/main/java/com/lagradost/cloudstream3/ui/settings/logcat/LogcatDialog.kt` | User can read device logcat, copy it to clipboard, or save it as a text file. | Logs may contain device/app diagnostic data and potentially sensitive values emitted by app code or dependencies. Determine whether logs are uploaded anywhere; warn users to inspect/redact logs before sharing. |
| `app/build.gradle.kts` | BuildConfig fields are populated for Simkl client ID/secret and MAL/AniList keys from environment variables or local properties. | Determine whether any values are secrets, whether they are embedded in the APK, their permitted public-client use, and whether any credential must be rotated or moved server-side. Never commit private credentials. |
| `gradle/libs.versions.toml` and `app/build.gradle.kts` | Direct dependencies include networking, media playback, image loading, HTML/JSON parsing, JavaScript/extension runtime, background work, account and media integrations. | Direct dependencies are not a complete SBOM; enumerate transitive dependencies and inspect SDK behavior and licences. |

## Observed Android manifest declarations

The manifest declares INTERNET, ACCESS_NETWORK_STATE, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, MANAGE_EXTERNAL_STORAGE, MODIFY_AUDIO_SETTINGS, REQUEST_INSTALL_PACKAGES, POST_NOTIFICATIONS, UPDATE_PACKAGES_WITHOUT_USER_ACTION, FOREGROUND_SERVICE, FOREGROUND_SERVICE_DATA_SYNC, USE_BIOMETRIC, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Android TV EPG read/write permissions, and QUERY_ALL_PACKAGES. It also declares `android:usesCleartextTraffic="true"`.

A permission declaration does not prove runtime use. Map every permission to a current user-facing feature, verify actual use on supported Android versions, document the purpose and Play eligibility, and remove permissions not essential to the released product. The cleartext setting needs review; production endpoints should use HTTPS/TLS, with any exception narrowly scoped and justified.

## Direct dependency families observed

AndroidX/Jetpack, Compose Multiplatform, lifecycle/navigation/WorkManager/TV Provider/biometric; Media3 playback and casting; Cronet/OkHttp; Coil; Ktor; NiceHttp; NewPipeExtractor; Jsoup/Ksoup; Rhino; Zipline; Jackson/Gson/kotlinx serialization; image/media utilities; torrent-related libraries and other support libraries. This is not a full SBOM and does not enumerate transitive libraries.

No advertising or analytics SDK was positively identified in the limited direct-dependency review. This is not proof that none is packaged, that no telemetry occurs, or that extensions do not introduce such behavior.

## Data-flow register — still to be completed

| Data item / activity | Preliminary status | Required evidence |
|---|---|---|
| IP address and network metadata | Likely visible to network endpoints when requests are made; exact recipients unknown | Runtime network capture by feature/provider |
| Search terms, content IDs, playback requests | Provider calls observed; exact transmitted fields unknown | Inspect each provider and capture requests |
| Cookies, headers, tokens | Networking and account integrations exist; exact handling unknown | Source trace, storage review and redacted runtime capture |
| Third-party account/watch-list data | Integrations are present; use depends on user configuration | API scopes, fields, consent, token storage and deletion tests |
| Download metadata/local files | Download feature and background service observed | Trace paths, file metadata, local retention and any remote calls |
| Logcat/diagnostics | User-triggered read/copy/export observed | Inspect log content, redaction, destinations and user disclosure |
| Plugin/extension data flows | Dynamic extension mechanism observed | Inventory every enabled repository and extension; audit remote code |
| Analytics/advertising/crash reports | Not established either way | Full dependency/SBOM scan and runtime verification |

## Required evidence before publication

- [ ] Generate a complete SBOM including resolved and transitive dependencies, bundled SDKs and licences.
- [ ] Audit all app source paths for network clients, analytics, crash reporting, identifiers, cookies, tokens, logging, account APIs and storage writes.
- [ ] Inventory all supported/default/optional provider repositories and extensions; review their code, endpoints and privacy notices.
- [ ] Test representative flows while capturing outbound domains, request metadata and any diagnostic uploads.
- [ ] Obtain current privacy/data-processing documentation for each third-party service and SDK.
- [ ] Map every data item to purpose, trigger, recipient, legal basis where applicable, retention, deletion and security control.
- [ ] Confirm whether BuildConfig credential fields contain public identifiers or confidential secrets in the distributed APK.
- [ ] Review every retained permission against current Android and Google Play policy.
- [ ] Match final privacy policy, in-app notices and Play Console Data safety answers to verified production behavior.
- [ ] Obtain jurisdiction-specific privacy review and written publisher approval.

## Metadata inconsistency

The existing Fastlane English listing contains a legacy statement that the app has no ads and analytics. This limited review does not substantiate that claim. Do not publish or reuse it until the full dependency, extension and runtime audit confirms it.

## Publisher information — not supplied / not inferable

The repository does not establish the publisher's legal entity/name, registered or service address, privacy contact, support contact, jurisdiction, policy effective date, or public HTTPS policy URL. These must be supplied and approved by the authorized publisher. Do not substitute a GitHub username or invent an email/address.
