(function (window, app, document, $) {
	'use strict';
	function iniciarFuncoesPadroesSistema(event) {
		var evento = event;
		if (typeof (evento) != 'undefined') {
			$(evento.target).find('.desabilitado').each(function (i) {
				$(this).desabilitar(true)
			});

			$(evento.target).find('.bootstrap-dialog-header').each(function (i) {
				$(this).find('.bootstrap-dialog-close-button').addClass('d-none')
			});

			$(evento.target).find('.link_topo').each(function(){
				$(this).on('click', '.link_topo', function (event) {
					event.preventDefault();
					event.stopPropagation();
					if(router.path() == '/') router.navigate('home');
					router.navigate($(this).attr('href'));
				});
			});
		}
	};

	var bodyEvento = {
		target: 'body'
	};

	iniciarFuncoesPadroesSistema(bodyEvento);

	$('body').on('DOMNodeInserted', function (evento) {
		iniciarFuncoesPadroesSistema(evento);
	});

	let url = window.location.href.replace(/^.*\//g, '');

	if (url == '#' || url == '') {
		router.navigate('/');
	}
	
	moment.locale('pt-BR');

	$.validator.setDefaults({
		ignore: [],
		highlight: function(element)
		{
			$(element).closest('.row').addClass('has-error');
		},
		unhighlight: function(element)
		{
			$(element).closest('.row').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function (error, element)
		{
			var possivelSelect2 = element.nextAll('span .select2:first');
			var possivelInputaAddon = element.parent('div .input-group').nextAll('div .menu_input_addon_erro:first');
			if(possivelSelect2.length)
			{
				element = possivelSelect2;
			}
			else
			{
				if(possivelInputaAddon.length)
				{
					element = possivelInputaAddon;
				}
			}

			element.after(error);
		}
	});

})(window, app, document, jQuery);