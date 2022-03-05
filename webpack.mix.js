const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/inputmask/dist/jquery.inputmask.min.js',
    'node_modules/toastr/build/toastr.min.js',
    'node_modules/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',
    'node_modules/jquery-validation/dist/jquery.validate.min.js',
    'node_modules/jquery-validation/dist/additional-methods.min.js',
    'node_modules/grapnel/dist/grapnel.min.js',
    'node_modules/grapnel-server/node_modules/grapnel/dist/grapnel.min.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/moment/locale/pt-br.js',
    // Inicialização
    'resources/js/app.js',
    'resources/js/template.js',
    'resources/js/rotas.js',

    'resources/js/funcoesSistema.js',
    'resources/js/receitaws.serv.js',

    'resources/js/fornecedor/fornecedor.serv.js',
    'resources/js/fornecedor/fornecedor.list.ctrl.js',
    'resources/js/fornecedor/fornecedor.form.ctrl.js',
], 'public/js/main.js')
    .styles([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-reboot.min.css',
        'node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
        'node_modules/@fortawesome/fontawesome-free/css/all.css',
        'node_modules/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
        'node_modules/toastr/build/toastr.min.css',
        // 'node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css',

        'resources/css/app.css',
    ], 'public/css/main.css')
    .copy('resources/views/paginas', 'public/views/paginas')
    .copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts')
    .version();