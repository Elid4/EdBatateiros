async function carregarLanches() {
    try {
        const response = await fetch('../dados/dados.json');
        const dados = await response.json();
        
        const container = document.getElementById('lanches-container');
        container.innerHTML = '';
        
        // Define as categorias na ordem que quer
        const categorias = ['promocoes', 'prensados', 'batatas', 'bebidas'];
        
        // Nomes para exibir
        const nomesCategorias = {
            'promocoes': 'PROMOÇÕES',
            'prensados': 'PRENSADOS',
            'batatas': 'BATATAS',
            'bebidas': 'BEBIDAS'
        };
        
        // Para cada categoria
        categorias.forEach(categoria => {
            // Filtra os lanches dessa categoria
            const lanches = dados.lanches.filter(l => l.categoria === categoria);
            
            // Cria a seção da categoria
            const secao = document.createElement('div');
            secao.id = categoria;  // Adiciona ID para o link funcionar
            secao.className = 'categoria-secao mt-5';
            
            // Adiciona o título
            const titulo = document.createElement('h2');
            titulo.textContent = nomesCategorias[categoria];
            titulo.className = 'mb-4 categoria-titulo';
            secao.appendChild(titulo);
            
            // Cria uma row para os cards
            const row = document.createElement('div');
            row.className = 'row';
            
            // Para cada lanche da categoria
            lanches.forEach(lanche => {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4 mb-4';
                
                card.innerHTML = `
                    <div class="card">
                        <img src="${lanche.imagem}" class="card-img-top" alt="${lanche.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${lanche.nome}</h5>
                            <p class="card-text">${lanche.descricao}</p>
                            <p class="preco">R$ ${lanche.preco.toFixed(2)}</p>
                           <!--<button class="btn btn-primary btn-sm">Adicionar ao Carrinho</button>-->
                        </div>
                    </div>
                `;
                
                row.appendChild(card);
            });
            
            secao.appendChild(row);
            container.appendChild(secao);
        });
    } catch (error) {
        console.error('Erro ao carregar JSON:', error);
    }
}

window.addEventListener('load', carregarLanches);

// Função de busca
function buscarLanches(termo) {
    const container = document.getElementById('lanches-container');
    const cards = container.querySelectorAll('.card');
    
    cards.forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        const descricao = card.querySelector('.card-text').textContent.toLowerCase();
        
        // Se o termo está no título ou descrição, mostra. Senão, esconde
        if (titulo.includes(termo.toLowerCase()) || descricao.includes(termo.toLowerCase())) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

// Quando o usuário digita no input
document.querySelector('.d-flex input').addEventListener('input', (e) => {
    buscarLanches(e.target.value);
});

// Quando clica no botão buscar
document.querySelector('.d-flex button').addEventListener('click', (e) => {
    e.preventDefault();
    const termo = document.querySelector('.d-flex input').value;
    buscarLanches(termo);
});