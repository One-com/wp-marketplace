<?php
namespace Groupone\Marketplace\Tests;

/**
 * Comprehensive Mock Data Provider for Tests
 *
 * Provides realistic mock data for all test scenarios
 */
class MockDataProvider {

    /**
     * Get complete mock plugin catalog with all fields
     *
     * @return array
     */
    public static function getCompletePluginsCatalog(): array {
        return [
            'success' => true,
            'data' => [
                'catalog' => [
                    [
                        'id' => 1,
                        'name' => 'WooCommerce',
                        'slug' => 'woocommerce',
                        'version' => '8.4.0',
                        'author' => 'Automattic',
                        'author_profile' => 'https://profiles.wordpress.org/automattic/',
                        'description' => 'An open-source eCommerce plugin for WordPress.',
                        'short_description' => 'Everything you need to launch an online store.',
                        'download_url' => 'https://downloads.wordpress.org/plugin/woocommerce.8.4.0.zip',
                        'homepage' => 'https://woocommerce.com/',
                        'icon' => 'https://ps.w.org/woocommerce/assets/icon-256x256.png',
                        'banner' => 'https://ps.w.org/woocommerce/assets/banner-1544x500.png',
                        'rating' => 4.6,
                        'num_ratings' => 5234,
                        'active_installs' => 5000000,
                        'downloaded' => 150000000,
                        'last_updated' => '2023-12-01 10:30:00',
                        'added' => '2011-09-15',
                        'requires' => '6.3',
                        'tested' => '6.4.2',
                        'requires_php' => '7.4',
                        'installed' => false,
                        'activated' => false,
                    ],
                    [
                        'id' => 2,
                        'name' => 'Yoast SEO',
                        'slug' => 'wordpress-seo',
                        'version' => '21.7',
                        'author' => 'Team Yoast',
                        'author_profile' => 'https://profiles.wordpress.org/yoast/',
                        'description' => 'Improve your WordPress SEO.',
                        'short_description' => 'The #1 WordPress SEO plugin.',
                        'download_url' => 'https://downloads.wordpress.org/plugin/wordpress-seo.21.7.zip',
                        'homepage' => 'https://yoast.com/',
                        'icon' => 'https://ps.w.org/wordpress-seo/assets/icon-256x256.png',
                        'rating' => 4.9,
                        'num_ratings' => 2876,
                        'active_installs' => 4000000,
                        'downloaded' => 500000000,
                        'last_updated' => '2023-12-10 14:20:00',
                        'requires' => '6.2',
                        'tested' => '6.4.2',
                        'requires_php' => '7.2',
                        'installed' => true,
                        'activated' => true,
                    ],
                    [
                        'id' => 3,
                        'name' => 'Rank Math Pro',
                        'slug' => 'rank-math-pro',
                        'version' => '3.0.48',
                        'author' => 'Rank Math',
                        'description' => 'Advanced SEO plugin with AI.',
                        'download_url' => 'https://example.com/rank-math-pro.zip',
                        'icon' => 'https://example.com/rank-math-icon.png',
                        'rating' => 4.9,
                        'active_installs' => 100000,
                        'requires' => '5.9',
                        'tested' => '6.4',
                        'requires_php' => '7.4',
                        'installed' => false,
                        'activated' => false,
                    ],
                ],
            ],
        ];
    }

    /**
     * Get mock catalog with sections
     *
     * @return array
     */
    public static function getCatalogWithSections(): array {
        return [
            'success' => true,
            'data' => [
                'sections' => [
                    [
                        'id' => 'featured',
                        'title' => 'Featured Plugins',
                        'description' => 'Hand-picked plugins for your site',
                        'items' => [
                            [
                                'id' => 1,
                                'name' => 'Contact Form 7',
                                'slug' => 'contact-form-7',
                                'version' => '5.8.4',
                                'download_url' => 'https://downloads.wordpress.org/plugin/contact-form-7.5.8.4.zip',
                                'rating' => 4.0,
                                'active_installs' => 5000000,
                            ],
                        ],
                    ],
                    [
                        'id' => 'recommended',
                        'title' => 'Recommended Plugins',
                        'description' => 'Recommended for your site configuration',
                        'items' => [
                            [
                                'id' => 2,
                                'name' => 'Akismet Anti-Spam',
                                'slug' => 'akismet',
                                'version' => '5.3',
                                'download_url' => 'https://downloads.wordpress.org/plugin/akismet.5.3.zip',
                                'rating' => 4.5,
                                'active_installs' => 5000000,
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * Get mock installed plugins list
     *
     * @return array
     */
    public static function getInstalledPlugins(): array {
        return [
            'woocommerce/woocommerce.php' => [
                'Name' => 'WooCommerce',
                'PluginURI' => 'https://woocommerce.com',
                'Version' => '8.4.0',
                'Description' => 'An open-source eCommerce plugin',
                'Author' => 'Automattic',
                'AuthorURI' => 'https://automattic.com',
                'TextDomain' => 'woocommerce',
                'DomainPath' => '/languages',
            ],
            'wordpress-seo/wp-seo.php' => [
                'Name' => 'Yoast SEO',
                'Version' => '21.7',
                'Author' => 'Team Yoast',
            ],
            'seo-by-rank-math-pro/rank-math-pro.php' => [
                'Name' => 'Rank Math Pro',
                'Version' => '3.0.48',
                'Author' => 'Rank Math',
            ],
            'akismet/akismet.php' => [
                'Name' => 'Akismet Anti-Spam',
                'Version' => '5.3',
            ],
        ];
    }

    /**
     * Get mock active plugins list
     *
     * @return array
     */
    public static function getActivePlugins(): array {
        return [
            'woocommerce/woocommerce.php',
            'wordpress-seo/wp-seo.php',
            'akismet/akismet.php',
        ];
    }

    /**
     * Get mock WordPress user
     *
     * @return \stdClass
     */
    public static function getMockUser(): \stdClass {
        $user = new \stdClass();
        $user->ID = 1;
        $user->user_login = 'testadmin';
        $user->user_email = 'admin@example.com';
        $user->roles = ['administrator'];
        $user->display_name = 'Test Administrator';
        return $user;
    }

    /**
     * Get mock transient data (cached catalog)
     *
     * @return array
     */
    public static function getMockTransientData(): array {
        return [
            'success' => true,
            'data' => [
                'catalog' => [
                    [
                        'id' => 1,
                        'slug' => 'cached-plugin',
                        'name' => 'Cached Plugin',
                        'version' => '1.0.0',
                        'installed' => false,
                        'activated' => false,
                    ],
                ],
            ],
            'cached_at' => time(),
        ];
    }

    /**
     * Get mock API error response
     *
     * @return array
     */
    public static function getApiErrorResponse(): array {
        return [
            'success' => false,
            'error' => [
                'code' => 'api_request_failed',
                'message' => 'Unable to connect to API endpoint',
                'data' => [
                    'status' => 500,
                ],
            ],
        ];
    }

    /**
     * Get empty catalog response
     *
     * @return array
     */
    public static function getEmptyCatalog(): array {
        return [
            'success' => true,
            'data' => [
                'catalog' => [],
            ],
        ];
    }

    /**
     * Get mock marketplace config
     *
     * @return array
     */
    public static function getMockConfig(): array {
        return [
            'parent_menu_slug' => 'options-general.php',
            'page_title' => 'Plugin Marketplace',
            'menu_title' => 'Marketplace',
            'menu_slug' => 'plugin-marketplace',
            'api_url' => 'https://api.example.com/v1/plugins',
            'brand' => 'test-brand',
            'css_url' => '',
            'css_handle' => 'marketplace-frontend-style',
            'assets_path' => '/path/to/marketplace',
            'payload' => [
                'api_key' => 'test-api-key-12345',
                'brand' => 'test-brand',
                'license' => 'premium',
            ],
            'mixp_props' => [
                'source' => 'wp-admin',
                'environment' => 'test',
            ],
            'mixp_distinct_id' => 'test-user-123',
        ];
    }

    /**
     * Get mock WP_REST_Request
     *
     * @return array
     */
    public static function getMockRestRequest(): array {
        return [
            'params' => [],
            'headers' => [
                'X-WP-Nonce' => 'test-nonce',
            ],
        ];
    }
}

