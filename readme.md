# Marketplace Module

A reusable WordPress plugin module for managing and displaying a marketplace of plugins with a React frontend and PHP backend. Designed to be embedded into other plugins while providing install/activate functionality and a REST API.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation with Mozart ](#installation-with-mozart-recommended-for-distributable-plugins)
- [Configuration Options](#configuration-options)
- [Assets Path Configuration](#assets-path-configuration)
- [How It Works](#how-it-works)
- [Asset Copying](#asset-copying)

---

## Features

- React-based frontend for displaying plugin listings
- Backend PHP controller & model to handle API requests and install/activate actions
- Works inside WordPress Admin and can be used in React apps
- REST API endpoint for fetching plugin data
- Flexible CSS loading – custom or default styles
- Composer-ready with PSR-4 autoloading
- Mozart-compatible for distribution and wrapping namespaces to avoid conflicts

---

## Requirements

- PHP >= 8.0
- WordPress >= 5.8
- Composer (for development and building)
- Mozart (for wrapping namespaces and copying assets)

---

## Installation with Mozart (Recommended for Distributable Plugins)

This module is designed to work when your plugin uses the Mozart tool to prefix namespaces and copy assets at build time.

Step-by-step

1) Add repository details (under repositories) and other dependencies to your plugin's composer.json

`Note:`  Example of a complete composer.json (replace `YourPlugin` with your plugin's namespace and path in`copy-assets` where you want to copy assets ):

```json
{
  "name": "<YourPlugin>",
  "type": "<wordpress-plugin>",
  "require": {
    "php": ">=8.0",
    "groupone/marketplace": "^1.0"
  },
  "repositories": [
    { "type": "vcs", "url": "git@github.com:One-com/wp-marketplace.git" }
  ],
  "require-dev": {
    "coenjacobs/mozart": "^0.7"
  },
  "autoload": {
    "psr-4": {
      "YourPlugin\\Dependencies\\": "/inc/Dependencies/YourPlugin/"
    },
    "classmap": [
      "inc/Dependencies/YourPlugin/"
    ]
  },
  "extra": {
    "mozart": {
      "dep_namespace": "YourPlugin\\Dependencies\\",
      "dep_directory": "/inc/Dependencies/YourPlugin/",
      "classmap_directory": "/inc/Dependencies/YourPlugin/",
      "packages": [
        "groupone/marketplace"
      ],
      "delete_vendor_directories": false
    }
  },
  "scripts": {
    "post-install-cmd": [
      "@mozart-compose",
      "@copy-assets",
      "composer dump-autoload -o"
    ],
    "post-update-cmd": [
      "@mozart-compose",
      "@copy-assets",
      "composer dump-autoload -o"
    ],
    "mozart-compose": [
      "[ -f vendor/bin/mozart ] && php vendor/bin/mozart compose || echo 'Mozart not found, skipping...'"
    ],
    "copy-assets": [
      "mkdir -p inc/Dependencies/YourPlugin/Groupone/Marketplace/frontend",
      "mkdir -p inc/Dependencies/YourPlugin/Groupone/Marketplace/assets",
      "[ -d vendor/groupone/marketplace/frontend ] && rsync -a vendor/groupone/marketplace/frontend/ inc/Dependencies/YourPlugin/Groupone/Marketplace/frontend/ || true",
      "[ -d vendor/groupone/marketplace/assets ] && rsync -a vendor/groupone/marketplace/assets/ inc/Dependencies/YourPlugin/Groupone/Marketplace/assets/ || true"
    ]
  },
  "config": {
    "allow-plugins": {
      "composer/installers": true
    }
  }
}
```

2) Install dependencies and run Mozart

When adding this module to a plugin that already has a `composer.json` and `composer.lock`:
- First time (after adding the dependency): run `composer update groupone/marketplace` to update your lock file and install the package. You can also run `composer update` if you want to update all dependencies.
- On CI or environments using an existing lock file: run `composer install`.

Either command will trigger the defined Composer scripts (mozart-compose and copy-assets).

Examples:

```bash
# First time after adding groupone/marketplace
composer update groupone/marketplace
# or update everything (broader)
composer update
```

```bash
# Subsequent installs when composer.lock is present (CI, deployments)
composer install
```

3) Bootstrap the module in your plugin code(replace `YourPlugin` with your plugin's namespace)

```php
// Composer autoloader registers both your plugin classes and the Mozart-prefixed dependencies
require_once __DIR__ . '/vendor/autoload.php';

// Using the Mozart-prefixed class name after Composer autoload is registered
'\YourPlugin\Dependencies\Groupone\Marketplace\Marketplace'::run([
    'parent_menu_slug' => 'your-menu-slug',
    'page_title'       => 'Plugin Marketplace',
    'menu_title'       => 'Marketplace',
    'menu_slug'        => 'plugin-marketplace',
    'addons_menu_slug' => 'your-addons-menu-slug', // Optional: slug for your addons page
    'addons_page_title' => 'Your Add-ons',        // Optional: page title for your addons page
    'addons_menu_title' => 'Your Add-ons',        // Optional: menu title for your addons page
    'api_url'          => 'https://example.com/marketplace.json',
    'brand'            => 'your_brand_name', // Optional: brand identifier for API filtering
    'payload'          => [                  // Optional: request body data for API payload
        'locale' => 'en_US',
        'action'     => '',
    ],
    // Optional: Explicitly set assets path if auto-detection doesn't work
    'assets_path'      => __DIR__ . '/inc/Dependencies/YourPlugin/Groupone/Marketplace/',
    'mixp_props'       => [],                // Optional: custom Mixpanel properties
    'mixp_distinct_id' => '',                // Optional: distinct ID for Mixpanel tracking
    'data_consent_status' => false,          // Optional: user data consent status
]);
```

---

## Configuration Options

- `parent_menu_slug`: WordPress menu slug under which the module submenu will be added. Default: options-general.php
- `page_title`: Page title for the Marketplace screen. Default: Plugin Marketplace
- `menu_title`: Menu title for the submenu. Default: Marketplace
- `menu_slug`: Slug used for the submenu and page. Default: plugin-marketplace
- `addons_menu_slug`: Slug used for the addons submenu and page. Default: onecom-marketplace-products
- `addons_page_title`: Page title for the your add-ons screen. Default: Marketplace Products
- `addons_menu_title`: Menu title for the your add-ons submenu. Default: Your add-ons
- `api_url`: External API endpoint returning marketplace data. Default: ""
- `brand`: Optional brand identifier used when constructing marketplace API requests. Can be used to filter or customize marketplace content based on brand. Default: ""
- `payload`: Optional key-value array passed in the request body for API authentication when fetching plugins. Can be used to include authentication tokens, API keys, or other custom data required by the marketplace API. Default: []
- `css_url`: URL to a custom CSS file that styles the frontend. Default: ""
- `css_handle`: WordPress style handle when registering/enqueuing styles. Default: marketplace-frontend-style
- `assets_path`: Filesystem path to the package root containing the frontend/ directory. If empty, the module auto-detects it (see below).
- `register_menu`: Boolean flag to control automatic menu registration. Set to `false` to skip menu registration when your plugin handles it manually (prevents duplicate menus). Default: true
- `mixp_props`: Optional key-value array for custom Mixpanel properties. Used to send additional tracking data. Default: []
- `mixp_distinct_id`: Optional string for Mixpanel tracking to identify a unique user. Default: ""
- `data_consent_status`: Boolean flag for user data consent. Controls whether tracking is enabled. Default: false

---

## Assets Path Configuration

- Explicit: Pass `assets_path` in the config.`(optional) if you are not following the path as mentioned in composer json & moved assets to a custom path` 
Example:

```php
'\YourPlugin\Dependencies\Groupone\Marketplace\Marketplace'::run([
  'assets_path' => WP_PLUGIN_DIR . '/your-plugin/inc/Dependencies/YourPlugin/assets/'
]);
```


---

## How It Works

When booted, the module:

- Registers a submenu page under the provided `parent_menu_slug`
- Enqueues the React frontend (`frontend/build` assets)
- Localizes configuration and labels to JavaScript
- Registers a REST route at `/wp-json/marketplace/v1/plugins`
- Provides AJAX handlers to install, activate, and deactivate plugins

---

## Asset Copying

How to reference assets

- If you keep the default structure suggested in the example `composer.json`, `assets_path` can be omitted because auto-detection will locate the package root.
- If you move files to a custom location, pass `assets_path` explicitly so the module can find `frontend/build/index.js` and related files.

---

