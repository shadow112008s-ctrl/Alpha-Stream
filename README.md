# Alpha Stream

Alpha Stream is an Android media-center app based on the open-source [CloudStream project](https://github.com/recloudstream/cloudstream). It uses a dark interface with electric-blue and red accents.

## Important source and copyright note

The app does not bundle movie, series, or anime catalogues by default. Media availability depends on sources or extensions that a user chooses to configure. Only use sources for content that you own, that is public domain, or that you are explicitly authorized to access. Do not install extensions that distribute copyrighted material without permission.

## Current capabilities

- Android phone and TV layouts inherited from the upstream media-center project
- Search, bookmarks, watch progress, and media details
- Built-in video playback and subtitle support
- Download management for content that the user is authorized to save
- Optional extension support for compatible, lawful sources
- Multiple themes and accessibility labels

Some capabilities depend on the configured provider, Android version, and device.

## Build verification

Pull requests run the **Alpha Stream Android CI** workflow. It checks Kotlin binary compatibility, runs stable-debug unit tests and Android lint, builds a stable debug APK, and uploads the APK as a temporary GitHub Actions artifact.

To download a CI APK, open the pull request's **Checks** or the repository's **Actions** page, open the successful **Alpha Stream Android CI** run, and download the `alpha-stream-stable-debug-apk` artifact.

CI artifacts are development builds, not signed production releases. This repository is not configured to publish releases or deploy builds automatically.

## Upstream and license

Alpha Stream is derived from [CloudStream](https://github.com/recloudstream/cloudstream). See the repository's LICENSE file and upstream notices for licensing and attribution requirements. Contributions must preserve applicable open-source license terms.
