/**
 *  fornecedor.serv.js
 *
 *  @author	Rafael Vinicius Barros Ferreira
 */
 (function(app, $)
 {
	'use strict';

	function ServicoFornecedor() { // Model
		var _this = this;
		// Rota no servidor
        _this.rota = function rota() {
			return app.api + '/fornecedor';
		};


      _this.createForm = function createForm() {
         return $.ajax({
            type: "GET",
            url: _this.rota() + '/create',
         });
      };

      _this.editForm = function editForm(id) {
         return $.ajax({
            type: "GET",
            url: _this.rota() + '/' + id + '/edit',
         });
      };

		_this.adicionar = function adicionar(form) {
			return $.ajax({
				enctype: 'multipart/form-data',
				type: "POST",
				url: _this.rota(),
				data: form,
				processData: false, // impedir que o jQuery tranforma a "data" em querystring
				contentType: false, // desabilitar o cabeçalho "Content-Type"
				cache: false, // desabilitar o "cache"
			});
		};

		_this.todos = function todos() {
			return $.ajax({
				type : "GET",
				url: _this.rota()
			});
		};

		_this.atualizar = function atualizar(form, id) {
			return $.ajax({
				type: "PUT",
				url: `${_this.rota()}/${id}`,
				data: form,
			});
		};


		_this.remover = function remover(id) {
			return $.ajax({
				type: "DELETE",
				url: _this.rota() + '/' + id
			});
		};

		_this.comId = function comId(id) {
			return $.ajax({
				type: "GET",
				url: _this.rota() + '/' + id
			});
		};
	}; // ServicoCategoria

	// Registrando
	app.ServicoFornecedor = ServicoFornecedor;
})(app, $);