/**
 *  fornecedor.form.ctrl.js
 *
 *  @author  Rafael Vinicius Barros Ferreira
 *	 @version 1.0
 */
(function (window, app, $, toastr) {
   'use strict';

   function ControladoraFormFornecedor(servicoFornecedor) {
      var _this = this;

      _this.formulario = $('#forncedor_form');
      _this.botaoSubmissao = $('#salvar');
      _this.cancelarModoEdicao = $('#cancelar_edicao');
      _this.obj = null;

      var pegarId = function pegarId(url, palavra) {

         // Terminando com "ID/palavra"
         var regexS = palavra + '+\/[0-9]{1,}';

         var regex = new RegExp(regexS);
         var resultado = regex.exec(url);

         if (!resultado || resultado.length < 1) {
            return 0;
         }

         var array = resultado[0].split('/');
         return array[1];
      };

      // Cria as opções de validação do formulário
      var criarOpcoesValidacao = function criarOpcoesValidacao() {
         var opcoes = {
            rules: {
            },

            messages: {
            }
         };

         // Irá disparar quando a validação passar, após chamar o método validate().
         opcoes.submitHandler = function submitHandler(form) {
            // crie um FormData {Object}
            var data = _this.conteudo();

            var terminado = function terminado() {
               _this.formulario.desabilitar(false);
            };

            _this.formulario.desabilitar(true);

            var jqXHR = (window.location.href.search('editar') != -1) ? servicoFornecedor.atualizar(data, _this.obj.id) : servicoFornecedor.adicionar(data);

            jqXHR.done(function (resposta) {
               if (resposta.status) {
                  toastr.success(resposta.mensagem);

                  router.navigate('/fornecedores');
               }
               else {
                  terminado();
                  if (resposta != undefined && resposta.mensagem) toastr.error(resposta.mensagem);
               }

            }).fail(window.erro).always(terminado);
         }; // submitHandler

         return opcoes;
      };

      // Obtém o conteúdo atual do form como um objeto
      _this.conteudo = function conteudo() {
         return  (window.location.href.search('editar') != -1) ? {
            id :   $('#id').val(),
            cnpj :   $('#cnpj').val(),
            nome :   $('#nome').val(),
            nome_fantasia :   $('#nome_fantasia').val(),
            email :   $('#email').val(),
            telefone :   $('#telefone').val(),
            cep :   $('#cep').val(),
            logradouro :   $('#logradouro').val(),
            numero :   $('#numero').val(),
            complemento :   $('#complemento').val(),
            bairro :   $('#bairro').val(),
            cidade :   $('#cidade').val(),
            uf :   $('#uf').val(),
			} :  new FormData(_this.formulario[0]);

      };

      _this.configurarBotoes = function configurarBotoes() {
         _this.botaoSubmissao.on('click', _this.salvar);

         $('#pesquisar-cnpj').on('click', function () {
            var cnpj = $('#cnpj').val().replace(/[^\d]+/g, '');
            let servicoReceitaWs = new app.ServicoReceitaWs();
            var jqXHR = servicoReceitaWs.consultarCNPJ(cnpj).done(function (resposta) {
               $('#nome').val(resposta.nome);
               $('#nome_fantasia').val(resposta.fantasia);
               $('#telefone').val(resposta.telefone);
               $('#email').val(resposta.email);
               $('#cep').val(resposta.cep);
               $('#logradouro').val(resposta.logradouro);
               $('#numero').val(resposta.numero);
               $('#complemento').val(resposta.complemento);
               $('#bairro').val(resposta.bairro);
               $('#cidade').val(resposta.municipio);
               $('#uf').val(resposta.uf);
            });
         });

         $("#cnpj").inputmask("99.999.999/9999-99");
         $("#telefone").inputmask("(99)99999-9660");
      };

      _this.definirForm = function definirForm(status) {
         _this.formulario.on('submit', false);
         _this.configurarBotoes();
         if (window.location.href.search('editar') != -1) {
            servicoFornecedor.editForm(pegarId(window.location.href, 'editar')).done(_this.desenhar);
         }
      }

      // Desenha o objeto no formulário
      _this.desenhar = function desenhar(resposta) {
         _this.obj = resposta.fornecedor.original;
         $('#id').val(_this.obj.id).trigger('focus').trigger('blur');
         $('#cnpj').val(_this.obj.cnpj).trigger('focus').trigger('blur');
         $('#nome').val(_this.obj.nome).trigger('focus').trigger('blur');
         $('#nome_fantasia').val(_this.obj.nome_fantasia).trigger('focus').trigger('blur');
         $('#email').val(_this.obj.email).trigger('focus').trigger('blur');
         $('#telefone').val(_this.obj.telefone).trigger('focus').trigger('blur');
         $('#cep').val(_this.obj.endereco.cep).trigger('focus').trigger('blur');
         $('#logradouro').val(_this.obj.endereco.logradouro).trigger('focus').trigger('blur');
         $('#numero').val(_this.obj.endereco.numero).trigger('focus').trigger('blur');
         $('#complemento').val(_this.obj.endereco.complemento).trigger('focus').trigger('blur');
         $('#bairro').val(_this.obj.endereco.bairro).trigger('focus').trigger('blur');
         $('#cidade').val(_this.obj.endereco.cidade).trigger('focus').trigger('blur');
         $('#uf').val(_this.obj.endereco.uf).trigger('focus').trigger('blur');

          if (window.location.href.search('editar') != -1) {
            $('#salvar').on('click', _this.salvar);
         }

      };

      _this.salvar = function salvar() {
         _this.formulario.validate(criarOpcoesValidacao());
      };

      // Configura os eventos do formulário
      _this.configurar = function configurar(status = false) {
         _this.definirForm(status);
      };
   }; // ControladoraFormFornecedor

   // Registrando
   app.ControladoraFormFornecedor = ControladoraFormFornecedor;

})(window, app, jQuery, toastr);
