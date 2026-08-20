# Changelog

All notable changes to the marketplace module are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`composer.json`'s `version` field is the single source of truth for the released
version (see [readme.md → Releasing a New Version](readme.md#releasing-a-new-version)).
When cutting a release, move the items under `Unreleased` into a new dated version
section that matches the `composer.json` bump and the `Marketplace::VERSION` constant.

## [Unreleased]

## [2.0.8-beta.2] - 2026-08-20

Pre-release. `2.0.8-beta.1` shipped the same changes but was tagged without a
changelog entry and left `Marketplace::VERSION` at `2.0.7`; this release fixes
that divergence.

### Added
- MCP ability telemetry (`MarketplaceAbilitiesTracking`): one Mixpanel event per
  marketplace ability executed over MCP, using the same property schema as the
  admin-UI tracker so both sources can be compared in one report. `item_source`
  distinguishes `MCP` from UI-driven events.
- `MixpanelClient::track_batch()` — events queued during a request are sent in a
  single `/track` call instead of one request each.

### Changed
- **Breaking (MCP clients):** the `{brand}-marketplace/list-plugins` ability is
  renamed to `list-products`, and its `event_action` from `plugins_listed` to
  `products_listed`. No alias is registered, so clients referencing the old tool
  name must be updated.
- `item_category` on product-scoped ability events now carries the product's real
  catalog category instead of a literal `plugin`, resolved slug-first exactly as
  the frontend does.
- Telemetry property names aligned to the frontend tracker: `application` (was
  `application_name`), `result` (was `status`), plus `hit_type`, `product_slug`,
  `product_name` and `error_message`. `is_sandbox` is no longer sent.

### Fixed
- MCP telemetry now respects `data_consent_status`; it previously tracked
  unconditionally while the frontend refused to initialise Mixpanel without it.

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
