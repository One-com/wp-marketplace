/**
 * Factory functions for mock plugin data.
 * Use these in tests and for TDD when API endpoints aren't ready yet.
 */

const basePlugin = {
  name: 'Test Plugin',
  slug: 'test-plugin',
  thumbnail: 'https://example.com/icon.png',
  iconUrl: '',
  description: 'A test plugin description.',
  download: 'https://example.com/test-plugin.zip',
  author: 'Test Author',
  authorUrl: 'https://example.com',
  priceAmount: undefined,
  priceCurrency: undefined,
  licenseType: 'free',
  installed: false,
  activated: false,
  featured: false,
  hasSubscription: false,
  subscriptions: [],
  productId: null,
  onboardingUrl: null,
  redirectUrl: 'wp-admin/admin.php?page=test-plugin',
  rules: null,
  version: '1.0.0',
  activeInstalls: 10000,
  pluginLastUpdated: '2026-01-15T10:00:00.000Z',
  freeTrial: null,
  rating: 4.0,
  ratingCount: 150,
  requiresDomain: false,
  requiresWpVersion: '5.8',
  requiresPhpVersion: '7.4',
  testedUpTo: '6.7',
  i18n: {},
};

export const makeFreePlugin = ( overrides = {} ) => ( {
  ...basePlugin,
  licenseType: 'free',
  ...overrides,
} );

export const makePremiumPlugin = ( overrides = {} ) => ( {
  ...basePlugin,
  name: 'Premium Plugin',
  slug: 'premium-plugin',
  licenseType: 'premium',
  productId: '08ca98ea-1a8e-400b-9612-c75332bc813d',
  prices: [
    { priceType: 'full', amount: 9.99, currency: 'EUR', period: 'month', isActive: true },
    { priceType: 'rebate', amount: 4.99, currency: 'EUR', period: 'month', isActive: true },
  ],
  ...overrides,
} );

export const makePremiumPluginLegacy = ( overrides = {} ) => ( {
  ...basePlugin,
  name: 'Legacy Premium Plugin',
  slug: 'legacy-premium-plugin',
  licenseType: 'premium',
  priceAmount: 7.99,
  priceCurrency: 'USD',
  ...overrides,
} );

export const makeInstalledPlugin = ( overrides = {} ) => ( {
  ...basePlugin,
  name: 'Installed Plugin',
  slug: 'installed-plugin',
  installed: true,
  activated: false,
  ...overrides,
} );

export const makeActivatedPlugin = ( overrides = {} ) => ( {
  ...basePlugin,
  name: 'Activated Plugin',
  slug: 'activated-plugin',
  installed: true,
  activated: true,
  ...overrides,
} );

export const makeRawCatalogResponse = ( plugins = [], uiI18nOverrides = {}, locale = 'en_GB' ) => ( {
  data: {
    catalog: plugins.map( ( p ) => ( { ...basePlugin, ...p } ) ),
    uiI18n: {
      labels: { free: 'Free' },
      ...uiI18nOverrides,
    },
    locale,
  },
} );
