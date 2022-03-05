<div class="flex-shrink-0 p-3 bg-white col-md-3" style="width: 280px;">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24">
            <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-5 fw-semibold">ReceitaWs</span>
    </a>
    
    <ul class="list-unstyled ps-0">
        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            Ínicio
            </button>
        </li>

        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#fornecedor-collapse" aria-expanded="false">
                Fornecedores
            </button>

            <div class="collapse show" id="fornecedor-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#/fornecedores" class="link-dark rounded">Listar</a></li>
                    <li><a href="#/fornecedores/cadastrar" class="link-dark rounded">Cadastrar</a></li>
                </ul>
            </div>
        </li>
        
        <li class="mb-1">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#cliente-collapse" aria-expanded="false">
                Clientes
            </button>
            <div class="collapse show" id="cliente-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#/clientes" class="link-dark rounded">Listar</a></li>
                    <li><a href="#/clientes/cadastrar" class="link-dark rounded">Cadastrar</a></li>
                </ul>
            </div>
        </li>
    </ul>
</div>