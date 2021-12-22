const mix = require('laravel-mix')
require('dotenv').config()

mix.webpackConfig({
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false
    }
  },
  stats: {
    children: true
  }
})

// Disable generating License file
mix.options({
  terser: {
    extractComments: false
  }
})

/*
 |----------------------------------------------------------------------------------------------------------------------
 | Main CSS & JS
 |----------------------------------------------------------------------------------------------------------------------
 |
 *

// Sass to css
mix.sass('resources/sass/both.scss', 'public/assets/css/dev1/both.css');
mix.sass('resources/sass/back.scss', 'public/assets/css/dev1/back.css');
mix.sass('resources/sass/front.scss', 'public/assets/css/dev1/front.css');
mix.sass('resources/sass/preview.scss', 'public/assets/css/dev1/preview.css');
mix.sass('resources/sass/livechat.scss', 'public/assets/css/livechat.css');
mix.sass('resources/sass/chatbox.scss', 'public/assets/css/chatbox.css');
mix.sass('resources/sass/login.scss', 'public/assets/css/dev2/login.css');
mix.sass('resources/sass/app.scss', 'public/assets/css/app.css');

// Admin | User Dashboard All CSS.
mix.styles([
    'public/assets/vendors/base/vendors.bundle.css',
    'public/assets/vendors/base/style.bundle.css',
    'public/assets/vendors/datatable/datatables.min.css',
    'public/assets/vendors/izitoastr/iziToast.min.css',
    'public/assets/vendors/tooltip/tooltipster.bundle.min.css',
    'public/assets/vendors/tooltip/tooltipster-sideTip-noir.min.css',
    'public/assets/vendors/slim/slim.min.css',
    'public/assets/css/dev1/back.css',
    'public/assets/css/dev1/both.css',
], 'public/assets/css/all.css').version();

// Front Pages All CSS
mix.styles([
    'public/assets/vendors/fontawesome/fontawesome.min.css',
    'public/assets/vendors/tooltip/tooltipster.bundle.min.css',
    'public/assets/vendors/tooltip/tooltipster-sideTip-noir.min.css',
    'public/assets/vendors/izitoastr/iziToast.min.css',
    'public/assets/css/dev1/both.css',
    'public/assets/css/dev1/front.css'
], 'public/assets/css/style.css').version();

// Admin | User Dashboard All JS.
mix.scripts([
    'public/assets/vendors/base/vendors.bundle.js',
    'public/assets/vendors/base/scripts.bundle.js',
    'public/assets/vendors/datatable/datatables.min.js',
    'public/assets/vendors/izitoastr/iziToast.min.js',
    'public/assets/vendors/tooltip/tooltipster.bundle.min.js',
    'public/assets/vendors/slim/slim.kickstart.min.js',
    'public/assets/js/dev2/progressive-image.js',
    'public/assets/js/dev1/back.js',
    'public/assets/js/dev1/both.js'
], 'public/assets/js/all.js').version();

// Front Pages All JS.
mix.scripts([
    'public/assets/js/dev2/core.min.js',
    'public/assets/js/dev2/main.js',
    'public/assets/vendors/izitoastr/iziToast.min.js',
    'public/assets/vendors/tooltip/tooltipster.bundle.min.js',
    'public/assets/js/dev2/progressive-image.js',
    'public/assets/js/dev1/front.js',
    'public/assets/js/dev1/both.js'
], 'public/assets/js/script.js').version();

// app.js for npm installed
mix.js('resources/js/app.js', 'public/assets/js').version();

// chat.js for npm installed
mix.js('resources/js/chat.js', 'public/assets/js/chat.js');

/*--------------------------------------------   Main CSS & JS    ---------------------------------------------------- */

/*
 |----------------------------------------------------------------------------------------------------------------------
 | Section Builder
 |----------------------------------------------------------------------------------------------------------------------
 |
 */

// Page Builder with Sections (Template builder for admin)
// Uses section.css below for styling
mix.js('resources/js/section-builder/page.js', 'public/assets/js/page.js').vue()

// Sections js & CSS
// These are used on front part to build Vue components for sections stored to database
mix.js('resources/js/section-builder/build/builder.js', 'public/assets/js/section.js').vue().sass('resources/sass/section.scss', 'public/assets/css/section.css')

/* --------------------------------------------   Section Builder   ---------------------------------------------------- */

/*
 |----------------------------------------------------------------------------------------------------------------------
 | Logo Maker
 |----------------------------------------------------------------------------------------------------------------------
 *

// Logo Editor Common js components
mix.js('resources/js/logo/js/bootstrap.js', 'public/assets/logo/js/bootstrap.js');
mix.js('resources/js/logo/js/app.js', 'public/assets/logo/js/app.js');
mix.js('resources/js/logo/js/lodash.js', 'public/assets/logo/js');
mix.js('resources/js/logo/js/jquery.js', 'public/assets/logo/js');

// Logo Editor Common css components
mix.sass('resources/js/logo/sass/app.scss', 'public/assets/logo/css')
    .sass('resources/js/logo/sass/_editor.scss', 'public/assets/logo/editor/sass-editor.css')
    .styles(['resources/logo/css/editor.css', 'node_modules/vue2-animate/dist/vue2-animate.min.css'],
        'public/assets/logo/editor/custom-editor.css')
    .options({
        processCssUrls: false,
    });

// Copy images
mix.copy('resources/js/logo/images', 'public/assets/logo/images');

// logo maker
mix.js('resources/js/logo/js/admin-vue.js', 'public/assets/logo/js/admin/admin-vue.js').vue();

// Logo editor components
mix.js('resources/js/logo/js/editor_v2/vue.js', 'public/assets/logo/js/editor/vue.js').vue();

// Videos page css
mix.sass('resources/js/logo/sass/video.scss', 'public/assets/logo/css/video.css').vue();

/*--------------------------------------------       Logo Maker    ---------------------------------------------------- */
