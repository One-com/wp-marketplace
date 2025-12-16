<?php
namespace Groupone\Marketplace\Tests\Models;

use PHPUnit\Framework\TestCase;
use Groupone\Marketplace\Models\MarketplaceModel;
use Groupone\Marketplace\Tests\MockDataProvider;
use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery;

/**
 * Test cases for MarketplaceModel class
 * Tests API data fetching with mock data only
 */
class MarketplaceModelTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
        Monkey\setUp();
    }

    protected function tearDown(): void {
        Monkey\tearDown();
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test fetch_plugins returns complete catalog data successfully
     */
    public function testFetchPluginsReturnsDataSuccessfully() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        // Use realistic mock data
        $mockResponse = MockDataProvider::getCompletePluginsCatalog();
        $mockBody = json_encode($mockResponse);

        Functions\expect('wp_remote_get')
            ->once()
            ->with($apiUrl, ['timeout' => 30])
            ->andReturn(['body' => $mockBody]);

        Functions\expect('is_wp_error')
            ->once()
            ->andReturn(false);

        Functions\expect('wp_remote_retrieve_body')
            ->once()
            ->andReturn($mockBody);

        $result = $model->fetch_plugins();

        $this->assertIsArray($result);
        $this->assertTrue($result['success']);
        $this->assertArrayHasKey('catalog', $result['data']);
        $this->assertCount(3, $result['data']['catalog']);

        // Verify first plugin structure
        $firstPlugin = $result['data']['catalog'][0];
        $this->assertEquals('WooCommerce', $firstPlugin['name']);
        $this->assertEquals('woocommerce', $firstPlugin['slug']);
        $this->assertEquals('8.4.0', $firstPlugin['version']);
        $this->assertArrayHasKey('download_url', $firstPlugin);
        $this->assertArrayHasKey('rating', $firstPlugin);
    }

    /**
     * Test fetch_plugins with payload
     */
    public function testFetchPluginsWithPayload() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        $payload = ['brand' => 'test-brand', 'api_key' => 'test-key'];
        $mockResponse = ['success' => true, 'data' => []];
        $mockBody = json_encode($mockResponse);

        Functions\expect('wp_remote_get')
            ->once()
            ->with($apiUrl, ['timeout' => 30, 'body' => $payload])
            ->andReturn(['body' => $mockBody]);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('wp_remote_retrieve_body')->andReturn($mockBody);

        $result = $model->fetch_plugins($payload);

        $this->assertIsArray($result);
    }

    /**
     * Test fetch_plugins returns empty array on WP_Error
     */
    public function testFetchPluginsReturnsEmptyArrayOnError() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        $wpError = Mockery::mock('WP_Error');

        Functions\expect('wp_remote_get')
            ->once()
            ->andReturn($wpError);

        Functions\expect('is_wp_error')
            ->once()
            ->with($wpError)
            ->andReturn(true);

        $result = $model->fetch_plugins();

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    /**
     * Test fetch_plugins handles invalid JSON response
     */
    public function testFetchPluginsHandlesInvalidJson() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        $invalidJson = 'invalid json response';

        Functions\expect('wp_remote_get')
            ->once()
            ->andReturn(['body' => $invalidJson]);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('wp_remote_retrieve_body')->andReturn($invalidJson);

        $result = $model->fetch_plugins();

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    /**
     * Test fetch_plugins handles null response
     */
    public function testFetchPluginsHandlesNullResponse() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        Functions\expect('wp_remote_get')
            ->once()
            ->andReturn(['body' => null]);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('wp_remote_retrieve_body')->andReturn(null);

        $result = $model->fetch_plugins();

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    /**
     * Test constructor sets API URL correctly
     */
    public function testConstructorSetsApiUrl() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        $reflection = new \ReflectionClass($model);
        $property = $reflection->getProperty('api_url');
        $property->setAccessible(true);

        $this->assertEquals($apiUrl, $property->getValue($model));
    }

    /**
     * Test fetch_plugins with empty payload array
     */
    public function testFetchPluginsWithEmptyPayload() {
        $apiUrl = 'https://api.example.com/plugins';
        $model = new MarketplaceModel($apiUrl);

        $mockResponse = ['success' => true, 'data' => []];
        $mockBody = json_encode($mockResponse);

        Functions\expect('wp_remote_get')
            ->once()
            ->with($apiUrl, ['timeout' => 30])
            ->andReturn(['body' => $mockBody]);

        Functions\expect('is_wp_error')->andReturn(false);
        Functions\expect('wp_remote_retrieve_body')->andReturn($mockBody);

        $result = $model->fetch_plugins([]);

        $this->assertIsArray($result);
    }
}

