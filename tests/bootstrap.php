<?php
/**
 * PHPUnit Bootstrap File for Marketplace Plugin Tests
 *
 * This bootstrap file initializes the testing environment for the Marketplace plugin.
 * It uses Brain Monkey and WP_Mock to mock WordPress functions.
 */

// Autoload dependencies
require_once dirname(__DIR__) . '/vendor/autoload.php';

// Initialize Brain Monkey
\Brain\Monkey\setUp();

// Define WordPress constants if not already defined
if (!defined('ABSPATH')) {
    define('ABSPATH', '/tmp/wordpress/');
}

if (!defined('WP_PLUGIN_DIR')) {
    define('WP_PLUGIN_DIR', ABSPATH . 'wp-content/plugins');
}

if (!defined('WP_CONTENT_DIR')) {
    define('WP_CONTENT_DIR', ABSPATH . 'wp-content');
}

if (!defined('HOUR_IN_SECONDS')) {
    define('HOUR_IN_SECONDS', 3600);
}

// Mock WordPress functions that are commonly used
if (!function_exists('__')) {
    function __($text, $domain = 'default') {
        return $text;
    }
}

if (!function_exists('esc_url')) {
    function esc_url($url) {
        return $url;
    }
}

if (!function_exists('esc_url_raw')) {
    function esc_url_raw($url) {
        return filter_var($url, FILTER_SANITIZE_URL);
    }
}

if (!function_exists('sanitize_text_field')) {
    function sanitize_text_field($str) {
        return strip_tags($str);
    }
}

if (!function_exists('sanitize_key')) {
    function sanitize_key($key) {
        return strtolower(preg_replace('/[^a-z0-9_\-]/', '', $key));
    }
}

if (!function_exists('wp_unslash')) {
    function wp_unslash($value) {
        return stripslashes($value);
    }
}

if (!function_exists('trailingslashit')) {
    function trailingslashit($string) {
        return rtrim($string, '/\\') . '/';
    }
}

if (!function_exists('wp_normalize_path')) {
    function wp_normalize_path($path) {
        $path = str_replace('\\', '/', $path);
        $path = preg_replace('|(?<=.)/+|', '/', $path);
        if (':' === substr($path, 1, 1)) {
            $path = ucfirst($path);
        }
        return $path;
    }
}

// Note: is_admin, add_action, plugins_url, etc. are mocked by Brain Monkey in each test
// Do not define them here as it prevents Brain Monkey from intercepting them

// Mock require_once for WordPress core files
if (!function_exists('mockRequireOnce')) {
    function mockRequireOnce($file) {
        // Silently ignore WordPress core file includes in tests
        return true;
    }
}

// Load the plugin files
require_once dirname(__DIR__) . '/backend/src/marketplace.php';
require_once dirname(__DIR__) . '/backend/src/Controllers/MarketplaceController.php';
require_once dirname(__DIR__) . '/backend/src/Models/MarketplaceModel.php';

echo "Bootstrap loaded successfully.\n";

