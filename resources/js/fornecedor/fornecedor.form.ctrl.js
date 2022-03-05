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

      _this.avatar = null;
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
                  if(_this.avatar !=  null){
                     jqXHR = servicoFornecedor.atualizarAvatar(function (){
                        var formData =  new FormData();
                        formData.append('avatar', _this.avatar);
                        return formData;
                     }, _this.obj.id).done(function(response){
                        if (resposta.status) {
                           router.navigate('/colaboradores');
                           toastr.success(resposta.mensagem);
                        }
                        else {
                           terminado();
                           if (resposta != undefined && resposta.erros)  distribuirErros(_this.formulario, resposta.erros);

                           if (resposta != undefined && resposta.mensagem) toastr.error(resposta.mensagem);
                        }
                     });
                  }
                  else{
                     router.navigate('/colaboradores');
                  }
               }
               else {
                  terminado();
                  if (resposta != undefined && resposta.erros)  distribuirErros(_this.formulario, resposta.erros);

                  if (resposta != undefined && resposta.mensagem) toastr.error(resposta.mensagem);
               }

            }).fail(window.erro).always(terminado);
         }; // submitHandler

         return opcoes;
      };

      // Obtém o conteúdo atual do form como um objeto
      _this.conteudo = function conteudo() {
         var data = new FormData(_this.formulario[0]);
         return data;
      };

      _this.configurarBotoes = function configurarBotoes() {
         _this.botaoSubmissao.on('click', _this.salvar);
         
         $('#pesquisar-cnpj').on('click', function() {
            var cnpj = $('#cnpj').val().replace(/[^\d]+/g,'');
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
      };

      _this.definirForm = function definirForm(status) {
         _this.formulario.on('submit', false);
         _this.configurarBotoes();
      }

      // Desenha o objeto no formulário
      _this.desenhar = function desenhar(resposta) {
         _this.obj = resposta.colaborador.original;
         $('#id').val(_this.obj.id).trigger('focus').trigger('blur');
         $('#nome').val(_this.obj.nome).trigger('focus').trigger('blur');
         $('#sobrenome').val(_this.obj.sobrenome).trigger('focus').trigger('blur');
         $('#email').val(_this.obj.user.email).trigger('focus').trigger('blur');
         $('#login').val(_this.obj.user.name).trigger('focus').trigger('blur');
         if(_this.obj.avatar != null)$('.avatar:first').attr('src', _this.obj.avatar.caminho)

         if (_this.obj.lojas != null) {
            for (const index in _this.obj.lojas) {
               var loja = _this.obj.lojas[index];
               $('#lojas option').each(function (i, value) {
                  if (parseInt($(this).val()) == loja.id) $(this).attr('selected', true);
               });
            }
            $('#lojas').formSelect().trigger('focus').trigger('blur');
         }

         if (_this.obj.setor != null) {
            for (const index in _this.obj.lojas) {
               var setor = _this.obj.setor;
               $('#setor option').each(function (i, value) {
                  if (parseInt($(this).val()) == setor.id) $(this).attr('selected', true);
               });
            }
            $('#setor').formSelect().trigger('focus').trigger('blur');
         }

         if (window.location.href.search('visualizar') != -1) {
            _this.formulario.desabilitar(true);
            _this.formulario.find('#botoes').desabilitar(false);
            _this.formulario.find('#botoes').prepend(' <div class="col col-md-4 col-12 col-sm-5 col-lg-4"><button type="submit" id="remover" class="waves-effect waves-light btn white grey-text text-darken-4 col-12 quebra-linha"><i class="mdi mdi-delete red-text text-darken-4"></i>Remover</button></div>').promise().done(function () {
               $('#botoes').find('#remover').on('click', _this.remover);
            });
				_this.formulario.find('#botoes').prepend(' <div class="col col-md-4 col-12 col-sm-5 col-lg-4"><button type="button" id="editar" class="waves-effect waves-light btn white grey-text text-darken-4 col-12 quebra-linha"><i class="mdi mdi-checkbox-marked-circle-outline orange-text text-accent-4 "></i>Editar</button></div>').promise().done(function () {
					_this.formulario.find('#editar').on('click', function (event) {
                  router.navigate('/editar-colaborador/' + _this.obj.id);
               });
            });

         } else if (window.location.href.search('editar') != -1) {
            _this.alterar = true;
            var html = '';
            html += '<div class="col col-md-4 col-12 col-sm-5 col-lg-4">';
            html += '<button id="salvar" type="submit" class="waves-effect waves-light btn white grey-text text-darken-4 col-12 quebra-linha">';
            html += '<i class="mdi mdi-checkbox-marked-circle-outline orange-text text-accent-4 ">';
            html += '</i>salvar</button>';
            html += '</div>';

            _this.formulario.find('#botoes').prepend(html).promise().done(function () {
               $('#salvar').on('click', _this.salvar);
            });
         }

      };

      _this.salvar = function salvar() {
         _this.formulario.validate(criarOpcoesValidacao());
      };

      _this.remover = function remover() {
         BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            title: 'Deseja remover este colaborador?',
            message: 'Id: ' + _this.obj.id + '.<br> Colaborador: ' + (_this.obj.nome + ' ' + _this.obj.sobrenome) + '.',
            size: BootstrapDialog.SIZE_LARGE,
            buttons: [{
               label: '<u>S</u>im',
               hotkey: 'S'.charCodeAt(0),
               action: function (dialog) {
                  servicoFornecedor.remover(_this.obj.id).done(function (resposta) {
                     if (resposta.status) {
                        router.navigate('/colaboradores');
                        toastr.success('Colaborador removido com sucesso!');
                        dialog.close();

                     }
                     else {
                        if (resposta != undefined && resposta.mensagem) toastr.error(resposta.mensagem);

                        dialog.close();
                     }
                  });
               }
            }, {
               label: '<u>N</u>ão',
               hotkey: 'N'.charCodeAt(0),
               action: function (dialog) {
                  dialog.close();
               }
            }
            ]
         });
      };

      // Configura os eventos do formulário
      _this.configurar = function configurar(status = false) {
         _this.definirForm(status);
      };
   }; // ControladoraFormFornecedor

   // Registrando
   app.ControladoraFormFornecedor = ControladoraFormFornecedor;

})(window, app, jQuery, toastr);
