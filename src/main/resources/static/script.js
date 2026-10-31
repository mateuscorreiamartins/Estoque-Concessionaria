const API_URL = '/api/carros';

// Carregar e exibir a lista de veículos na tabela
async function carregarVeiculos() {
    try {
        const response = await fetch(API_URL);
        const carros = await response.json();
        const tbody = document.getElementById('tabelaVeiculos');
        tbody.innerHTML = '';

        if (carros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-3">Nenhum veículo cadastrado.</td></tr>';
            return;
        }

        carros.forEach(carro => {
            const statusBadge = getStatusBadge(carro.status);
            const precoFormatado = Number(carro.precoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${carro.id}</strong></td>
                <td>${carro.marca ? carro.marca.nomeMarca : 'N/A'}</td>
                <td>${carro.modelo ? carro.modelo.nome : 'N/A'}</td>
                <td>${carro.anoFabricacao}</td>
                <td>${carro.cor}</td>
                <td class="fw-bold text-success">${precoFormatado}</td>
                <td>${Number(carro.quilometragem).toLocaleString('pt-BR')} km</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletarVeiculo(${carro.id})">🗑️ Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar veículos:', error);
    }
}

// Enviar formulário para cadastrar novo veículo (POST)
async function salvarVeiculo(event) {
    event.preventDefault();

    const novoCarro = {
        marca: { id: parseInt(document.getElementById('marcaId').value) },
        modelo: { id: parseInt(document.getElementById('modeloId').value) },
        anoFabricacao: parseInt(document.getElementById('anoFabricacao').value),
        cor: document.getElementById('cor').value,
        precoVenda: parseFloat(document.getElementById('precoVenda').value),
        quilometragem: parseFloat(document.getElementById('quilometragem').value),
        status: document.getElementById('status').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCarro)
        });

        if (response.ok) {
            alert('Veículo guardado com sucesso!');
            document.getElementById('formVeiculo').reset();
            carregarVeiculos();
        } else {
            alert('Erro ao guardar veículo. Verifique se o ID da Marca e do Modelo existem.');
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}

// Eliminar veículo pelo ID (DELETE)
async function deletarVeiculo(id) {
    if (!confirm(`Tem a certeza que deseja eliminar o veículo #${id}?`)) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarVeiculos();
        } else {
            alert('Erro ao eliminar veículo.');
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
    }
}

function getStatusBadge(status) {
    switch(status) {
        case 'DISPONIVEL':
            return '<span class="badge badge-disponivel">● DISPONÍVEL</span>';
        case 'RESERVADO':
            return '<span class="badge badge-reservado">● RESERVADO</span>';
        case 'VENDIDO':
            return '<span class="badge badge-vendido">● VENDIDO</span>';
        default:
            return `<span class="badge badge-descontinuado">${status}</span>`;
    }
}

// Carregar a lista automaticamente ao abrir a página
carregarVeiculos();