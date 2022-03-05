/**
 *  fornecedor.list.ctrl.js
 *
 *  @author	Rafael Vinicius Barros Ferreira
 */
(function (window, app, $, toastr) {
   'use strict';

   function ControladoraListagemFornecedor(ServicoFornecedor) {
      var _this = this;
      var _cont = 0;
      var _tabela = null;
      _this.botaoEditar = $('#editar');
      _this.botaoRemover = $('#remover');
      _this.idTabela = $('#fornecedores');

      //Configura a tabela
      _this.opcoesDaTabela = function opcoesDaTabela() {
         var objeto = new Object();
         objeto.ajax = ServicoFornecedor.rota();

         objeto.carregando = true;
         objeto.pageLength = 20;
         objeto.lengthMenu = [20, 30, 40, 100];
         objeto.searching = true;
         objeto.ordering = true;
         objeto.searching = true;
         objeto.searchDelay = 600;
         objeto.order = 'DESC';
         objeto.cadastrarLink = 'cadastrar_fornecedor_link';
         objeto.columnDefs = function (data) {
            let imagem = (data.avatar != null) ? data.avatar.caminho : window.location.pathname + 'images/avatar-padrao.png';

            var lojas = '<br>';

            for (const key in data.lojas) {
               if (data.lojas.hasOwnProperty(key)) {
                  const element = data.lojas[key];
                  lojas += 'Razão Social : ' + element.razao_social + ' Nome Fantasia: ' +  element.nome_fantasia +'; <br>'
               }
            }
            var html = '';
            html += '<div class="col col-12 col-lg-12 col-md-12 col-sm-12 mb-0-dto">';
            html += '<div class="row">';

            html += '<div class="col co-lg-2 col-md-2 col-sm-2 col-4 ">';
               html += '<img src="'+ imagem + '" class="avatar"></img>';
            html += '</div>';
            
            html += '<div class="col co-lg-10 col-md-10 col-sm-10 col-8">'
               html += '<p class="f-12-dto"><strong>Nome : </strong>' + data.nome + ' ' + data.sobrenome + '</p>'
               html += '<p class="f-12-dto"><strong>Email : </strong>' + data.user.email + '</p>'

               html += '<p class="f-12-dto"><strong>Setor : </strong>' + data.setor.titulo + '</p>';
               html += '<p class="f-12-dto"> <strong>Lojas de atuação:</strong> '+ lojas +'</p>';
               html += '<p class="f-12-dto"> <strong>Usuário: </strong>  ' + data.user.name + '</p>';
            html += '</div>';

            html += '<div class="col col-12 col-lg-12 col-md-12 col-sm-12 mb-0-dto opc_tabela">';
               html += '<div class="col col-12 col-lg-4 col-md-4 col-sm-4 mb-0-dto">';
                  html += '<p class="mb-0-dto">';
                     html += '<a href="#" class="detalhes-dto visualizar_checklist">';
                        html += '<i class="mdi mdi-eye-outline small orange-text text-accent-4"></i>';
                        html += 'VER DETALHES';
                     html += '</a>';
                  html += '</p>';
               html += '</div>';

               html += '<div class="col col-12 col-lg-4 col-md-4 col-sm-4 mb-0-dto">';
                  html += '<p class="mb-0-dto">';
                     html += '<a href="#" parametros="Usuario/' + data.usuario_id + '" class="detalhes-dto configurar_acessos_link">';
                        html += '<i class="mdi mdi-key small orange-text text-accent-4"></i>';
                        html += 'ACESSOS';
                     html += '</a>';
                  html += '</p>';
                  html += '</div>';
                  html += '</div>';
               html += '</div>';
            html += '</div>';


            return html;
         };
         objeto.rowsCallback = function (resposta) {
            $('.visualizar_checklist').on('click', function (event) {
               event.preventDefault();
               var objeto = _tabela.getObjetos()[$(this).parents('.listagem-padrao-item').index()];
               router.navigate('/visualizar-fornecedor/' + objeto.id);
            });
         }
         return objeto;
      };

      _this.atualizar = function atualizar() {
         _tabela.ajax.reload();
      };

      _this.configurar = function configurar() {
         _tabela = $('#fornecedor').DataTable({
            responsive: true
          });
         _this.botaoCadastrar.on('click', _this.cadastrar);
         _this.botaoEditar.on('click', _this.editar)
         _this.botaoAtualizar.on('click', _this.atualizar);
         _this.botaoRemover.on('click', _this.remover);;
      };
   } // ControladoraListagemFornecedor

   // Registrando
   app.ControladoraListagemFornecedor = ControladoraListagemFornecedor;
})(window, app, jQuery, toastr);