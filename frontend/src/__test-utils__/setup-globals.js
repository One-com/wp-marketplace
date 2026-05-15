// Stub browser APIs not implemented in jsdom
window.scrollTo = jest.fn();

// Default window.marketplaceConfig for all tests.
// Individual tests can override with Object.assign or per-property assignment.
global.window.marketplaceConfig = {
  brand: 'onecom',
  locale: 'en_GB',
  wpVersion: '6.7',
  activePlugins: [],
  activeThemeAuthor: '',
  data_consent_status: false,
  pendingProcurements: {},
  pendingCancellations: {},
  siteUrl: 'https://example.com',
  menuSlug: 'onecom-marketplace',
  wpConfig: {
    ajaxUrl: 'https://example.com/wp-admin/admin-ajax.php',
    nonce: 'test-nonce-123',
    adminUrl: 'https://example.com/wp-admin/',
    rankMathRegistrationSkip: false,
  },
  assetsBaseUrl: 'https://example.com/wp-content/plugins/onecom-themes-plugins/modules/plugin-marketplace/',
  mixpanel: null,
};
