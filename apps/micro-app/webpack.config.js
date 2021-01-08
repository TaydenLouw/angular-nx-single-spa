const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack')
  .default;
module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(
    angularWebpackConfig,
    options
  );

  singleSpaWebpackConfig.output.library = 'microApp';

  const mappings = {
    '@angular/core': 'core',
    '@angular/common': 'common',
    '@angular/common/http': 'common.http',
    '@angular/platform-browser': 'platformBrowser',
    '@angular/platform-browser-dynamic': 'platformBrowserDynamic',
    '@angular/compiler': 'compiler',
    '@angular/animations': 'animations',
  };

  const angularExternals = Object.keys(mappings).reduce(
    (accumulator, mapping) => {
      const request = ['ng', mappings[mapping]];

      accumulator[mapping] = {
        root: request,
        commonjs: request,
        commonjs2: request,
        amd: request,
      };

      return accumulator;
    }
  );

  return {
    ...singleSpaWebpackConfig,
    externals: {
      rxjs: 'rxjs',
      ...angularExternals,
      'single-spa-angular': 'single-spa-angular',
      'single-spa-single-spa-angular-internals': 'single-spa-angular-internals',
    },
  };
};
