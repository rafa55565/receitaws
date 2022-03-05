/**
 *  fornecedor.list.ctrl.js
 *
 *  @author	Rafael Vinicius Barros Ferreira
 */
(function (window, app, $, toastr) {
   'use strict';

   function ControladoraListagemFornecedor(servicoFornecedor) {
      var _this = this;
      var _cont = 0;
      
      _this.tabela = $('#fornecedor');

      //Configura a tabela
      _this.atualizar = function atualizar() {
         _tabela.ajax.reload();
      };


      _this.configurar = function configurar() {
         var jqXHR = servicoFornecedor.todos().done(function (resposta) {
            var fonecedoresHTML = resposta.map((fornecedor) => {
               return `<tr>
                        <td>${fornecedor.id}</td>
                        <td>${fornecedor.cnpj}</td>
                        <td>${fornecedor.nome}</td>
                        <td>${fornecedor.nome_fantasia}</td>
                        <td>${fornecedor.telefone}</td>
                        <td>${fornecedor.email}</td>
                        <td>${fornecedor.endereco.logradouro}, ${fornecedor.endereco.numero}, ${fornecedor.endereco.complemento}, ${fornecedor.endereco.bairro} - ${fornecedor.endereco.cidade}/${fornecedor.endereco.uf}</td>
                        <td>
                           <a href="#/fornecedores/editar/${fornecedor.id}" class="btn btn-warning">Alterar</a>
                           <a href="#/fornecedores/remover/${fornecedor.id}" class="btn btn-danger remover" id="remover" data-id="${fornecedor.id}">Remover</a>
                        </td>
                     </tr>`;
            }).join('');
            _this.tabela.find('tbody').empty().html(fonecedoresHTML);

            _this.tabela.on('click', '.remover', function (event) {
               event.preventDefault();
               var id = $(this).attr('data-id');
               servicoFornecedor.remover(id);
               window.location.reload()            
            });
         });
      };
   } // ControladoraListagemFornecedor

   // Registrando
   app.ControladoraListagemFornecedor = ControladoraListagemFornecedor;
})(window, app, jQuery, toastr);