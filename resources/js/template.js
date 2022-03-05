
 
 (function (app, document, $) {
    'use strict';

    app.template.bntSalvarPadrao = (id, tipo, nome) => {
        return`<div class="col col-md-4 col-12 col-sm-5 col-lg-4">
        <button id="${id}" type="${tipo}" class="waves-effect waves-light btn white grey-text text-darken-4 col-12 quebra-linha">
        <i class="mdi mdi-checkbox-marked-circle-outline orange-text text-accent-4 ">
        </i>${nome}</button>
        </div>`;
    };  
   
    app.template.bntRemoverPadrao = (id, tipo, nome) => {
        return`<div class="col col-md-4 col-12 col-sm-5 col-lg-4">
            <button type="${tipo}" id="${id}" class="waves-effect waves-light btn white grey-text text-darken-4 col-12">
                <i class="mdi mdi-delete red-text text-darken-4">
                </i>${nome}
            </button>
        </div>`;
    };  
 })(app, document, jQuery);
 