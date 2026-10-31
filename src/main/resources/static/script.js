const API_CARROS = '/api/carros';
const API_MARCAS = '/api/marcas';
const API_MODELOS = '/api/modelos';

let marcasCache = [];
let modelosCache = [];

// ================= INDEX (ESTOQUE) =================
async function carregarEstoque(url = API_CARROS) {
    try {
        const response = await fetch(url);
        const carros = await response.json();
        const tbody = document.getElementById('tabelaEstoque');
        tbody.innerHTML = '';

        if (carros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #94a3b8;">Nenhum veículo encontrado no estoque.</td></tr>';
            return;
        }

        carros.forEach(carro => {
            const precoFmt = Number(carro.precoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const kmFmt = Number(carro.quilometragem).toLocaleString('pt-BR');
            const nomeModelo = carro.modelo ? carro.modelo.nome : 'N/A';
            const nomeMarca = carro.marca ? carro.marca.nomeMarca : (carro.modelo && carro.modelo.marca ? carro.modelo.marca.nomeMarca : 'N/A');

            const tr = document.createElement('tr');
            const podeDeletar = carro.status === 'VENDIDO' || carro.status === 'DESCONTINUADO';
            const estiloBotao = podeDeletar ? '' : 'style="opacity: 0.5; cursor: not-allowed;" title="Apenas veículos VENDIDO ou DESCONTINUADO podem ser removidos"';

            tr.innerHTML = `
                <td><strong>${nomeModelo}</strong></td>
                <td>${nomeMarca}</td>
                <td>${carro.anoFabricacao} - ${carro.cor}</td>
                <td><strong style="color: #059669;">${precoFmt}</strong></td>
                <td>${kmFmt} km</td>
                <td><span class="badge badge-${carro.status.toLowerCase()}">${carro.status}</span></td>
                <td style="text-align: center;">
                    <a href="editar-veiculo.html?id=${carro.id}" class="btn-sm-edit">Editar</a>
                    <button class="btn-sm-delete" ${estiloBotao} onclick="deletarVeiculo(${carro.id}, '${carro.status}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) { console.error('Erro ao carregar estoque:', e); }
}

// Função de exclusão com validação do status
async function deletarVeiculo(id, status) {
    if (status === 'DISPONIVEL' || status === 'RESERVADO') {
        alert(`Veículos com status "${status}" não podem ser removidos do estoque.\n\nEdite o veículo e altere o status para VENDIDO ou DESCONTINUADO para permitir a exclusão.`);
        return;
    }

    if (!confirm(`Tem a certeza que deseja remover o veículo #${id} do estoque?`)) return;

    try {
        const res = await fetch(`${API_CARROS}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            carregarEstoque();
        } else {
            const mensagemErro = await res.text();
            alert(mensagemErro || 'Erro ao remover veículo.');
        }
    } catch (e) {
        console.error('Erro ao deletar:', e);
    }
}

function toggleFiltros() {
    const painel = document.getElementById('painelFiltros');
    painel.style.display = painel.style.display === 'none' ? 'block' : 'none';
}

async function carregarMarcasFiltro() {
    const res = await fetch(API_MARCAS);
    marcasCache = await res.json();
    const selectMarca = document.getElementById('filtroMarca');
    selectMarca.innerHTML = '<option value="">Todas</option>';
    marcasCache.forEach(m => selectMarca.innerHTML += `<option value="${m.id}">${m.nomeMarca}</option>`);

    const resMod = await fetch(API_MODELOS);
    modelosCache = await resMod.json();
    atualizarModelosFiltro();
}

function atualizarModelosFiltro() {
    const marcaId = parseInt(document.getElementById('filtroMarca').value);
    const selectModelo = document.getElementById('filtroModelo');
    selectModelo.innerHTML = '<option value="">Todos</option>';

    const filtrados = marcaId ? modelosCache.filter(m => m.marca && m.marca.id === marcaId) : modelosCache;
    filtrados.forEach(m => selectModelo.innerHTML += `<option value="${m.id}">${m.nome}</option>`);
}

function aplicarFiltros() {
    const marcaId = document.getElementById('filtroMarca').value;
    const modeloId = document.getElementById('filtroModelo').value;
    const ano = document.getElementById('filtroAno').value;
    const precoMin = document.getElementById('filtroPrecoMin').value;
    const precoMax = document.getElementById('filtroPrecoMax').value;
    const status = document.getElementById('filtroStatus').value;

    const params = new URLSearchParams();
    if (marcaId) params.append('marcaId', marcaId);
    if (modeloId) params.append('modeloId', modeloId);
    if (ano) params.append('ano', ano);
    if (precoMin) params.append('precoMin', precoMin);
    if (precoMax) params.append('precoMax', precoMax);
    if (status) params.append('status', status);

    const url = params.toString() ? `${API_CARROS}?${params.toString()}` : API_CARROS;
    carregarEstoque(url);
}

function limparFiltros() {
    document.getElementById('filtroMarca').value = '';
    document.getElementById('filtroModelo').value = '';
    document.getElementById('filtroAno').value = '';
    document.getElementById('filtroPrecoMin').value = '';
    document.getElementById('filtroPrecoMax').value = '';
    document.getElementById('filtroStatus').value = '';
    carregarEstoque();
}

// ================= FORMULÁRIO DE NOVO VEÍCULO =================
async function carregarFormularioNovoVeiculo() {
    const resMarcas = await fetch(API_MARCAS);
    marcasCache = await resMarcas.json();

    const resModelos = await fetch(API_MODELOS);
    modelosCache = await resModelos.json();

    const selectMarca = document.getElementById('carroMarca');
    selectMarca.innerHTML = '<option value="">Selecione a Marca...</option>';
    marcasCache.forEach(m => {
        selectMarca.innerHTML += `<option value="${m.id}">${m.nomeMarca}</option>`;
    });
}

function aoSelecionarMarca() {
    const marcaId = parseInt(document.getElementById('carroMarca').value);
    const selectModelo = document.getElementById('carroModelo');
    selectModelo.innerHTML = '<option value="">Selecione o Modelo...</option>';

    if (!marcaId) {
        selectModelo.disabled = true;
        return;
    }

    const modelosDaMarca = modelosCache.filter(m => m.marca && m.marca.id === marcaId);
    if (modelosDaMarca.length === 0) {
        selectModelo.innerHTML = '<option value="">Nenhum modelo nesta marca</option>';
        selectModelo.disabled = true;
        return;
    }

    modelosDaMarca.forEach(m => {
        selectModelo.innerHTML += `<option value="${m.id}">${m.nome}</option>`;
    });
    selectModelo.disabled = false;
}

async function salvarNovoVeiculo(event) {
    event.preventDefault();
    const payload = {
        marca: { id: parseInt(document.getElementById('carroMarca').value) },
        modelo: { id: parseInt(document.getElementById('carroModelo').value) },
        anoFabricacao: parseInt(document.getElementById('carroAno').value),
        cor: document.getElementById('carroCor').value,
        precoVenda: parseFloat(document.getElementById('carroPreco').value),
        quilometragem: parseFloat(document.getElementById('carroKm').value),
        status: document.getElementById('carroStatus').value
    };

    const res = await fetch(API_CARROS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        alert('Veículo guardado no estoque!');
        window.location.href = 'index.html';
    } else { alert('Erro ao guardar veículo.'); }
}

// ================= EDIÇÃO DE VEÍCULO =================
async function carregarDadosEdicaoVeiculo() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) { window.location.href = 'index.html'; return; }

    await carregarFormularioNovoVeiculo();

    const res = await fetch(`${API_CARROS}/${id}`);
    const carro = await res.json();

    document.getElementById('carroId').value = carro.id;
    document.getElementById('tituloEdicao').textContent = `Editar Veículo #${carro.id}`;

    if (carro.marca) document.getElementById('carroMarca').value = carro.marca.id;
    aoSelecionarMarca();
    if (carro.modelo) document.getElementById('carroModelo').value = carro.modelo.id;

    document.getElementById('carroAno').value = carro.anoFabricacao;
    document.getElementById('carroCor').value = carro.cor;
    document.getElementById('carroPreco').value = carro.precoVenda;
    document.getElementById('carroKm').value = carro.quilometragem;
    document.getElementById('carroStatus').value = carro.status;
}

async function salvarEdicaoVeiculo(event) {
    event.preventDefault();
    const id = document.getElementById('carroId').value;
    const payload = {
        marca: { id: parseInt(document.getElementById('carroMarca').value) },
        modelo: { id: parseInt(document.getElementById('carroModelo').value) },
        anoFabricacao: parseInt(document.getElementById('carroAno').value),
        cor: document.getElementById('carroCor').value,
        precoVenda: parseFloat(document.getElementById('carroPreco').value),
        quilometragem: parseFloat(document.getElementById('carroKm').value),
        status: document.getElementById('carroStatus').value
    };

    const res = await fetch(`${API_CARROS}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        alert('Veículo atualizado!');
        window.location.href = 'index.html';
    }
}

// ================= MARCAS E MODELOS =================
async function carregarMarcasEModelosPagina() {
    const resM = await fetch(API_MARCAS);
    const marcas = await resM.json();
    const tbodyM = document.getElementById('tabelaMarcas');
    tbodyM.innerHTML = '';

    const selectMarca = document.getElementById('modeloMarcaSelect');
    selectMarca.innerHTML = '<option value="">Selecione...</option>';

    marcas.forEach(m => {
        tbodyM.innerHTML += `<tr><td><strong>${m.nomeMarca}</strong></td><td>${m.paisOrigem||'-'}</td><td><button class="btn-sm-delete" onclick="deletarMarca(${m.id})">Excluir</button></td></tr>`;
        selectMarca.innerHTML += `<option value="${m.id}">${m.nomeMarca}</option>`;
    });

    const resMod = await fetch(API_MODELOS);
    const modelos = await resMod.json();
    const tbodyMod = document.getElementById('tabelaModelos');
    tbodyMod.innerHTML = '';
    modelos.forEach(mod => {
        const nomeMarca = mod.marca ? mod.marca.nomeMarca : 'N/A';
        tbodyMod.innerHTML += `<tr><td><strong>${mod.nome}</strong></td><td>${mod.categoria||'-'}</td><td>${nomeMarca}</td><td><button class="btn-sm-delete" onclick="deletarModelo(${mod.id})">️Excluir</button></td></tr>`;
    });
}

async function salvarMarca(event) {
    event.preventDefault();
    const payload = { nomeMarca: document.getElementById('marcaNome').value, paisOrigem: document.getElementById('marcaPais').value };
    await fetch(API_MARCAS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    document.getElementById('formMarca').reset();
    carregarMarcasEModelosPagina();
}

async function salvarModelo(event) {
    event.preventDefault();
    const payload = { nome: document.getElementById('modeloNome').value, categoria: document.getElementById('modeloCategoria').value, marca: { id: parseInt(document.getElementById('modeloMarcaSelect').value) } };
    await fetch(API_MODELOS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    document.getElementById('formModelo').reset();
    carregarMarcasEModelosPagina();
}

async function deletarMarca(id) {
    if (confirm('Eliminar marca?')) { await fetch(`${API_MARCAS}/${id}`, { method: 'DELETE' }); carregarMarcasEModelosPagina(); }
}

async function deletarModelo(id) {
    if (confirm('Eliminar modelo?')) { await fetch(`${API_MODELOS}/${id}`, { method: 'DELETE' }); carregarMarcasEModelosPagina(); }
}