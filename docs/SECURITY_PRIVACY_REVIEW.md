# Alpha Stream security and privacy review

Review scope: static inspection of the Android manifest and repository workflow configuration on the Alpha Stream redesign branch. This is a technical review note, not a legal certification, penetration test, provider-rights review, or verification of runtime network behavior.

## Findings requiring publisher review before public distribution

| Area | Observed configuration | Required action |
|---|---|---|
| Cleartext traffic | The application manifest sets `android:usesCleartextTraffic="true"`. | Identify every HTTP endpoint used by first-party code and supported providers. Migrate first-party endpoints to HTTPS. Disable cleartext where compatible, then test provider integrations and playback on physical devices. Do not remove this flag without runtime compatibility testing. |
| Broad storage access | `MANAGE_EXTERNAL_STORAGE` is declared for plugin/download functionality. | Verify whether scoped storage and Android's Storage Access Framework can replace it. If broad access remains necessary, document the exact feature, user-facing disclosure and distribution-policy eligibility. |
| Package visibility | `QUERY_ALL_PACKAGES` is declared, alongside explicit package and intent queries. | Determine whether explicit `<queries>` declarations cover supported external players and torrent clients. Remove broad visibility if possible and document the permitted core use case if it remains. |
| App installation | `REQUEST_INSTALL_PACKAGES` and package-update related permissions are declared. | Keep only if the user-facing in-app update flow genuinely requires them. Explain that installation is user initiated and review distribution-policy restrictions. |
| Battery optimization | `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` is declared. | Request an exemption only when a core feature needs it, explain the reason clearly, and test behavior when the user declines. |
| Notifications and foreground work | Notification and data-sync foreground-service permissions are declared. | Verify runtime notification consent on Android 13+, service types, notification channels, task completion behavior and Android 14+ foreground-service restrictions. |
| Backups | Backup is enabled and backup/data-extraction XML resources are configured. | Review which user data, provider configuration, credentials and tokens are included in backups. Exclude secrets and sensitive provider data where appropriate. |
| Privacy disclosures | No verified publisher-specific privacy policy and data inventory were established by this static review. | The publisher must document actual collection, processing, sharing, retention, deletion, analytics, crash reporting, provider traffic and contact details before release. Do not publish a generic template as if it were verified. |

## CI and artifact safety

- Pull-request CI checks Kotlin ABI compatibility, stable-debug unit tests, Android lint and the stable-debug APK build.
- CI APKs are debug artifacts intended for testing, not production-signed releases.
- The optional background-maintenance workflow must not be treated as a release gate. It may report failure when optional external credentials are not configured.
- No signing private key, keystore password or production credential should be committed to the repository or included in build logs.
- Review workflow permissions and third-party actions before granting write access or adding secrets.

## Release blockers not verifiable from source alone

1. Confirm the legal publisher name, contact email and country/address required for distribution.
2. Confirm rights and licenses for every provider, metadata source, artwork, logo, subtitle source and streaming integration.
3. Publish a truthful privacy policy based on the actual data flows and a reachable support/contact page.
4. Complete a merged-manifest permission audit for each release flavor.
5. Test network behavior, downloads, notifications, app updates, backups and playback on supported physical Android devices.
6. Sign the production build using a publisher-controlled upload key, and document secure backup/recovery ownership.
7. Verify the final downloadable package, checksum, version, signing certificate and source offer required by the GPL-3.0 distribution terms.

## Identity and compatibility

The Android application ID is `com.shadow112008s.alphastream`; the Kotlin namespace remains `com.lagradost.cloudstream3` for source compatibility. The application ID differs from upstream CloudStream, so this package installs separately from the upstream app. The GPL-3.0 license and upstream attribution must remain with redistributed builds and source.

## Review status

Static findings documented. Runtime verification, publisher identity, provider rights, production signing and legal/privacy approval remain outstanding. This document must be updated after those checks are completed.
