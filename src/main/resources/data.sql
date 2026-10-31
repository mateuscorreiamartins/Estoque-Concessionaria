-- Marcas de Teste
INSERT INTO tb_marca (nome_marca, pais_origem) VALUES ('Toyota', 'Japão');
INSERT INTO tb_marca (nome_marca, pais_origem) VALUES ('Volkswagen', 'Alemanha');
INSERT INTO tb_marca (nome_marca, pais_origem) VALUES ('Chevrolet', 'EUA');

-- Modelos de Teste
INSERT INTO tb_modelo (nome, categoria, marca_id) VALUES ('Corolla', 'Sedan', 1);
INSERT INTO tb_modelo (nome, categoria, marca_id) VALUES ('Golf', 'Hatchback', 2);
INSERT INTO tb_modelo (nome, categoria, marca_id) VALUES ('Onix', 'Hatchback', 3);

-- Carros de Teste no Estoque
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id)
VALUES (2022, 'Preto', 115000.00, 25000, 'DISPONIVEL', 1, 1);

INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id)
VALUES (2021, 'Branco', 95000.00, 42000, 'DISPONIVEL', 2, 2);

INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id)
VALUES (2023, 'Prata', 82000.00, 10000, 'DISPONIVEL', 3, 3);