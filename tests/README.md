# PHPUnit Test Suite for Marketplace Plugin

This directory contains comprehensive PHPUnit test cases for the Marketplace WordPress plugin with mock data and no real API calls.

## Setup

### 1. Install Dependencies

```bash
composer install
```

This will install:
- PHPUnit 9.5
- Mockery for mocking
- Brain Monkey for WordPress function mocking

### 2. Run Tests

Run all tests:
```bash
composer test
# or
./vendor/bin/phpunit
```

Run tests with detailed output:
```bash
./vendor/bin/phpunit --testdox
```

Run tests with code coverage:
```bash
composer test-coverage
```

Run specific test file:
```bash
./vendor/bin/phpunit tests/MarketplaceTest.php
```

Run specific test method:
```bash
./vendor/bin/phpunit --filter testFetchPluginsReturnsDataSuccessfully
```

## Test Structure

```
tests/
├── bootstrap.php                           # Bootstrap file for test environment
├── MarketplaceTest.php                     # Tests for Marketplace main class
├── Models/
│   └── MarketplaceModelTest.php           # Tests for MarketplaceModel
└── Controllers/
    └── MarketplaceControllerTest.php      # Tests for MarketplaceController
```

## Test Coverage

### MarketplaceTest.php
- Tests the main `Marketplace::run()` method
- Tests exception handling
- Tests with various configuration options

### MarketplaceModelTest.php
- Tests `fetch_plugins()` with mock API responses
- Tests error handling (WP_Error, invalid JSON, null responses)
- Tests with and without payload
- **All tests use mock data - NO real API calls**

### MarketplaceControllerTest.php
- Tests controller initialization and hooks
- Tests REST API route registration
- Tests AJAX handlers (install, activate, deactivate)
- Tests permission checks
- Tests transient caching
- **All WordPress functions are mocked**

## Key Testing Features

### 1. No Real API Calls
All API interactions are mocked using Mockery. Tests use predefined mock data.

### 2. WordPress Functions Mocked
WordPress functions like `wp_remote_get`, `add_action`, `wp_send_json_error`, etc. are all mocked using Brain Monkey.

### 3. WordPress Constants Defined
Common WordPress constants like `ABSPATH`, `WP_PLUGIN_DIR`, etc. are defined in the bootstrap.

### 4. Isolated Tests
Each test is isolated and doesn't affect other tests. Setup and teardown methods ensure clean state.

## Mock Data Examples

### Mock API Response
```php
$mockResponse = [
    'success' => true,
    'data' => [
        'catalog' => [
            ['id' => 1, 'name' => 'Plugin 1', 'slug' => 'plugin-1'],
            ['id' => 2, 'name' => 'Plugin 2', 'slug' => 'plugin-2'],
        ],
    ],
];
```

### Mock WordPress Error
```php
$wpError = Mockery::mock('WP_Error');
Functions\expect('wp_remote_get')->andReturn($wpError);
Functions\expect('is_wp_error')->andReturn(true);
```

## Writing New Tests

1. Extend `PHPUnit\Framework\TestCase`
2. Use `Brain\Monkey\setUp()` and `Brain\Monkey\tearDown()` in setup/teardown
3. Mock WordPress functions using `Brain\Monkey\Functions\expect()`
4. Mock objects using `Mockery::mock()`
5. Use descriptive test method names starting with `test`

Example:
```php
public function testMyFeature() {
    // Arrange
    Functions\expect('get_option')->once()->andReturn([]);
    
    // Act
    $result = $myObject->myMethod();
    
    // Assert
    $this->assertTrue($result);
}
```

## Continuous Integration

The test suite is designed to run in CI/CD environments without requiring:
- WordPress installation
- Database
- Real API endpoints
- Network access

## Troubleshooting

### "Class already exists" errors
This happens when Mockery tries to overload a class that's already loaded. Use partial mocks or instance mocks instead.

### "Function already defined" errors
Make sure Brain Monkey's setUp() is called before any WordPress function usage.

### PHPUnit version issues
This suite requires PHPUnit 9.5+. Check your PHP version (requires PHP 7.4+).

## Test Coverage Report

After running `composer test-coverage`, open `coverage/index.html` in your browser to see detailed code coverage.

## Best Practices

1. **One assertion concept per test** - Each test should verify one behavior
2. **Clear test names** - Test names should describe what they test
3. **AAA Pattern** - Arrange, Act, Assert
4. **Mock external dependencies** - Never call real APIs or databases
5. **Clean up after tests** - Use tearDown() to reset state

## WordPress Compatibility

These tests are compatible with WordPress coding standards and test WordPress-specific functionality including:
- Admin menu registration
- AJAX handlers
- REST API endpoints
- Plugin activation/deactivation
- Transient caching
- Capability checks

## Additional Resources

- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [Mockery Documentation](http://docs.mockery.io/)
- [Brain Monkey Documentation](https://brain-wp.github.io/BrainMonkey/)

