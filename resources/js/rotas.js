
/**
 *  rotas.js
 *
 *  @author	Rafael vinicius barros ferreira
 */

(function (window, app, document, $, Grapnel) {
   'use strict';
   var router = new Grapnel();
   var conteudo = $('#app');
   const templateOpcoesTopo = (rota) => { return `<span class="center local-dto">${rota.descricao}</span><a href="#${rota.caminhoVolta}" class="left m16-dto link_topo"><i class="material-icons">navigate_before</i></a>` };

   function esperar(tempo) {
      return new Promise(resolve => setTimeout(resolve, tempo));
   }

   var carregarPagina = function carregarPagina(pagina) {
      conteudo.empty().load('views/paginas/' + pagina);
   };

   var criarRotaPara = function criarRotaPara(pagina) {
      return function () {
         carregarPagina(pagina);
      };
   };

   // Rotas: adicione sua rota ACIMA das existentes, a seguir. -Rafael
   window.rotas = [
      { rota: '/', caminho: criarRotaPara('inicio.html'), descicao: "Ínicio", caminhoVolta: '/' },  
      { rota: '/fornecedores', caminho: criarRotaPara('fornecedores.html'), descricao: "Fornecedores", caminhoVolta: '/' },  
      { rota: '/fornecedores/cadastrar', caminho: criarRotaPara('fornecedor-form.html'), descricao: "Cadstrar Fonecedor", caminhoVolta: '/' },  
      { rota: '/fornecedores/editar/:id', caminho: criarRotaPara('fornecedor-form.html'), descricao: "Editar Fonecedor", caminhoVolta: '/' },  
      {
         rota: '/*', caminho: function (req, e) {
            if (!e.parent()) {
               carregarPagina('404.html');
            }
         }, descricao: ''
      }
   ];

   rotas.forEach((rota) => router.get(rota.rota, rota.caminho));

   router.on('navigate', function () {
      for (const key in rotas) {
         if (Object.hasOwnProperty.call(rotas, key)) {
            const rota = rotas[key];
            if (rota.rota == router.path() && rota.rota == '/') {
               $('body').find('.topo-opcoes').empty().append(`<a id="logo-container" href="${rota.caminhoVolta}" class="brand-logo center link_topo"><img src="${app.api}/images/logo_branco.png" alt="" class="logo-dto"></a>
               <a href="/" data-target="nav-mobile" class="sidenav-trigger button-collapse show-on-large"><i class="material-icons">menu</i></a>`);
               break;
            }
            else if (router.path() != '/' && rota.rota != '/') {
               var rotasArray = rota.rota.split('/');
               var eArota = false;

               for (const key in rotasArray) {
                  if (Object.hasOwnProperty.call(rotasArray, key)) {
                     const rotaAtual = rotasArray[key];
                     if (rotaAtual != ':id' && rotaAtual != '*' && rotaAtual != '') {
                        if (window.location.href.search(rotaAtual) != -1) {

                           eArota = true;
                        }
                     }
                  }
               }

               if (eArota) {
                  $('body').find('.topo-opcoes').empty().append(templateOpcoesTopo(rota));
                  break;
               }
            }
         }
      }
   });

   // Registra como global
   window.router = router;
   // app.verficarLogin = verficarLogin;

})(window, app, document, jQuery, Grapnel);
