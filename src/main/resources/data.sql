-- MARCAS POPULARES NO BRASIL

INSERT INTO tb_marca (nome_marca, pais_origem) VALUES
('Chevrolet', 'EUA'),
('Volkswagen', 'Alemanha'),
('Fiat', 'Itália'),
('Toyota', 'Japão'),
('Hyundai', 'Coreia do Sul');

-- MODELOS POPULARES

INSERT INTO tb_modelo (nome, categoria, marca_id) VALUES
('Onix', 'Hatchback', 1),
('Tracker', 'SUV', 1),
('Polo', 'Hatchback', 2),
('T-Cross', 'SUV', 2),
('Argo', 'Hatchback', 3),
('Strada', 'Picape', 3),
('Corolla', 'Sedan', 4),
('Hilux', 'Picape', 4),
('HB20', 'Hatchback', 5),
('Creta', 'SUV', 5);

-- VEÍCULOS NO ESTOQUE

-- CHEVROLET (marca_id = 1)
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id) VALUES
(2023, 'Preto', 78500.00, 15000, 'DISPONIVEL', 1, 1),
(2021, 'Prata', 65000.00, 45000, 'DISPONIVEL', 1, 1),
(2022, 'Branco', 110000.00, 28000, 'RESERVADO', 1, 2),
(2024, 'Cinza', 135000.00, 5000, 'DISPONIVEL', 1, 2),
(2020, 'Vermelho', 58000.00, 62000, 'VENDIDO', 1, 1);

-- VOLKSWAGEN (marca_id = 2)
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id) VALUES
(2023, 'Branco', 82000.00, 18000, 'DISPONIVEL', 2, 3),
(2022, 'Cinza', 74000.00, 32000, 'DISPONIVEL', 2, 3),
(2021, 'Preto', 105000.00, 40000, 'RESERVADO', 2, 4),
(2023, 'Prata', 128000.00, 12000, 'DISPONIVEL', 2, 4),
(2019, 'Azul', 52000.00, 75000, 'VENDIDO', 2, 3);

-- FIAT (marca_id = 3)
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id) VALUES
(2022, 'Vermelho', 68000.00, 25000, 'DISPONIVEL', 3, 5),
(2023, 'Branco', 75000.00, 14000, 'DISPONIVEL', 3, 5),
(2021, 'Prata', 85000.00, 38000, 'DISPONIVEL', 3, 6),
(2023, 'Preto', 98000.00, 10000, 'RESERVADO', 3, 6),
(2020, 'Cinza', 55000.00, 58000, 'DESCONTINUADO', 3, 5);

-- TOYOTA (marca_id = 4)
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id) VALUES
(2022, 'Branco', 142000.00, 22000, 'DISPONIVEL', 4, 7),
(2020, 'Preto', 118000.00, 50000, 'DISPONIVEL', 4, 7),
(2021, 'Prata', 215000.00, 45000, 'DISPONIVEL', 4, 8),
(2023, 'Branco', 260000.00, 15000, 'RESERVADO', 4, 8),
(2018, 'Cinza', 92000.00, 85000, 'VENDIDO', 4, 7);

-- HYUNDAI (marca_id = 5)
INSERT INTO tb_carro (ano_fabricacao, cor, preco_venda, quilometragem, status, marca_id, modelo_id) VALUES
(2023, 'Cinza', 79000.00, 12000, 'DISPONIVEL', 5, 9),
(2021, 'Branco', 64000.00, 39000, 'DISPONIVEL', 5, 9),
(2022, 'Preto', 115000.00, 26000, 'DISPONIVEL', 5, 10),
(2024, 'Azul', 138000.00, 4000, 'RESERVADO', 5, 10),
(2019, 'Prata', 53000.00, 70000, 'VENDIDO', 5, 9);