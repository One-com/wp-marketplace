# Changelog

All notable changes to the marketplace module are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`composer.json`'s `version` field is the single source of truth for the released
version (see [readme.md → Releasing a New Version](readme.md#releasing-a-new-version)).
When cutting a release, move the items under `Unreleased` into a new dated version
section that matches the `composer.json` bump and the `Marketplace::VERSION` constant.

## [Unreleased]

## [2.0.7] - 2026-08-06

### Added
- Module version is now exposed at PHP runtime via the `Marketplace::VERSION`
  constant, localized into `window.marketplaceConfig.version`, and rendered in the
  marketplace admin UI so the running version is visible without inspecting code.
- This `CHANGELOG.md`.
- A CI guard (`package-validation`) that fails the build if `Marketplace::VERSION`
  and the `composer.json` version diverge.

## [2.0.6] - 2026-08-02

- Prior baseline. Changes before 2.0.6 are tracked via the Git tag history and
  are not backfilled here.
