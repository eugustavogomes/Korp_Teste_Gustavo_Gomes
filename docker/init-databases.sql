-- O banco estoque_db é criado automaticamente pela variável POSTGRES_DB no docker-compose.
-- Este script cria o banco adicional necessário para o FaturamentoService.

SELECT 'CREATE DATABASE faturamento_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'faturamento_db')\gexec
