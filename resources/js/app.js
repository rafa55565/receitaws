var app = {
    isLoading: true,
    api: window.location.protocol,
    acessoNegado: false,
    template: new Object()
 };
 // const { jsPDF } = window.jspdf;
 // window.html2canvas = html2canvas;
 
// var $  = require( 'jquery' );
// var dt = require( 'datatables.net' )( window, $ );

 (function (app, document, $, toastr, window, BootstrapDialog) {
    'use strict';
    // Opções para mensagens
    toastr.options.closeButton = false;
    toastr.options.debug = false;
    toastr.options.newestOnTop = true;
    toastr.options.progressBar = false;
    toastr.options.positionClass = "toast-top-right";
    toastr.options.preventDuplicates = false;
    toastr.options.onclick = null;
    toastr.options.showDuration = "8000";
    toastr.options.hideDuration = "8000";
    toastr.options.timeOut = "8000";
    toastr.options.extendedTimeOut = "8000";
    var nua = navigator.userAgent
    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
 
    if (isAndroid) {
       $('select.form-control').removeClass('form-control').css('width', '100%')
    }
 
    $.validator.setDefaults({
       ignore: [],
       highlight: function (element) {
          $(element).closest('.row').addClass('has-error');
       },
       unhighlight: function (element) {
          $(element).closest('.row').removeClass('has-error');
       },
       errorElement: 'span',
       errorClass: 'help-block',
       errorPlacement: function (error, element) {
          element.parents('body').find('.msg').empty().append(error).append('<br>').removeClass('d-none').desabilitar(false);
       }
    });
 
    // Opções para diálogos
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = 'Informação';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = 'Informação';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = 'Informação';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = 'Sucesso';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = 'Aviso';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = 'Erro';
    BootstrapDialog.DEFAULT_TEXTS['OK'] = 'OK';
    BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = 'Cancelar';
    BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = 'Confirmação';
 
    $.fn.extend({
       desabilitar: function (status, sucesso = null) {
          $(this).find("*").each(function () {
             $(this).prop('disabled', status);
 
          }).promise().done(function () {
             if (typeof sucesso == 'function') sucesso();
             $(this).find("*").each(function () {
                if ($(this).hasClass('select') && !status) $(this).trigger('change').formSelect();
             });
          });
 
          $(this).prop('disabled', status);
       },
 
       ocultarEDesabilitar: function () {
          $(this).addClass('d-none').addClass('desabilitado').desabilitar(true);
       },
 
       desocultarEHabilitar: function () {
          $(this).removeClass('d-none').removeClass('desabilitado').desabilitar(false);
       },
 
       estaOcultoEDesabilitado: function () {
          return ($(this).hasClass('d-none') && $(this).hasClass('desabilitado')) ? true : false;
       }
    });
 
    $.ajaxSetup({
       headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       }
    });
 })(app, document, jQuery, toastr, window, BootstrapDialog);