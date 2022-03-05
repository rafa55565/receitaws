/**
 *  receitaws.serv.js
 *
 *  @author	Rafael Vinicius Barros Ferreira
 */
 (function(app, $)
 {
	'use strict';

	function ServicoReceitaWs()
	{ // Model
		var _this = this;

		// Cria um objeto de ReceitaWs

		_this.consultarCNPJ = function consultarCNPJ(cnpj) {
			return $.ajax({
				headers: null,
				url:`https://receitaws.com.br/v1/cnpj/${cnpj}`,
				type:'get',
				dataType:'jsonp'
			});
		};
	}; // ServicoReceitaWs

	// Registrando
	app.ServicoReceitaWs = ServicoReceitaWs;
})(app, $);