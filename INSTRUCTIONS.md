## Subir o banco com Docker

Certifique-se de possuir o Docker instalado e configurado em sua máquina.

Entre no diretório do seu projeto pelo terminal e rode o seguinte comando:
- docker compose up

O terminal em que o Docker está rodando deve permanecer aberto, já que ele fica ocupado pelo processo.

Verifique se o container está rodando com:
- docker ps

## Executar migrations

Com o banco rodando, aplique as migrations:
- npx knex migrate:latest

Acesse o banco de dados para verificar se as tabelas foram criadas: 
- docker exec -it postgres_policia psql -U postgres -d policia_db

## Rodar seeds

Para popular o banco com dados iniciais, rode:
- npx knex seed:run