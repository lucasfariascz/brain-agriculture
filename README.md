
# Brain Agriculture - Teste Técnico v2

API para gereciamento de produtores rurais e suas propriedades. 

## Autor

- [@lucasfariascz](https://www.github.com/lucasfariascz)


## Referência

 - [Readme SO](https://readme.so/)
 - [Documentação NestJS](https://docs.nestjs.com/)
 - [Documentação TypeOrm](https://typeorm.io/)
 - [Validador CPF/CNPJ](https://www.npmjs.com/package/cpf-cnpj-validator)
 - [Winston para logs](https://www.npmjs.com/package/winston)

## Documentação da API

### Rural Producer - Produtores Rurais

#### Retorna todos os produtores rurais

```http
  GET /get-rural-producers
```

**Resposta:** Array de objetos com informações dos produtores rurais

#### Retorna um produtor rural

```http
  GET /get-rural-producer-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do produtor rural         |

#### Retorna um produtor rural com suas propriedades

```http
  GET /get-rural-producer-with-property-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do produtor rural         |

#### Cria um novo produtor rural

```http
  POST /create-rural-producer
```

| Parâmetro   | Tipo     | Descrição                                      |
| :---------- | :------- | :--------------------------------------------- |
| `name`      | `string` | **Obrigatório**. Nome do produtor rural       |
| `cpfOrCnpj` | `string` | **Obrigatório**. CPF ou CNPJ do produtor      |

#### Atualiza um produtor rural

```http
  PUT /update-rural-producer/${id}
```

| Parâmetro   | Tipo     | Descrição                                      |
| :---------- | :------- | :--------------------------------------------- |
| `id`        | `string` | **Obrigatório**. O ID do produtor rural       |
| `name`      | `string` | **Obrigatório**. Nome do produtor rural       |
| `cpfOrCnpj` | `string` | **Obrigatório**. CPF ou CNPJ do produtor      |

#### Remove um produtor rural

```http
  DELETE /delete-rural-producer/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do produtor rural         |

### Property - Propriedades Agrícolas

#### Retorna todas as propriedades

```http
  GET /get-properties
```

**Resposta:** Array de objetos com informações das propriedades

#### Retorna uma propriedade

```http
  GET /get-property-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da propriedade            |

#### Retorna uma propriedade com suas culturas

```http
  GET /get-property-with-plant-crop-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da propriedade            |

#### Cria uma nova propriedade

```http
  POST /create-property
```

| Parâmetro                | Tipo     | Descrição                                      |
| :----------------------- | :------- | :--------------------------------------------- |
| `farmName`               | `string` | **Obrigatório**. Nome da fazenda               |
| `farmCity`               | `string` | **Obrigatório**. Cidade da fazenda             |
| `farmState`              | `string` | **Obrigatório**. Estado da fazenda             |
| `totalAreaHectares`      | `number` | **Obrigatório**. Área total em hectares       |
| `arableAreaHectares`     | `number` | **Obrigatório**. Área arável em hectares      |
| `vegetationAreaHectares` | `number` | **Obrigatório**. Área de vegetação em hectares|
| `ruralProducerId`        | `string` | **Obrigatório**. ID do produtor rural         |

#### Atualiza uma propriedade

```http
  PUT /update-property/${id}
```

| Parâmetro                | Tipo     | Descrição                                      |
| :----------------------- | :------- | :--------------------------------------------- |
| `id`                     | `string` | **Obrigatório**. O ID da propriedade          |
| `farmName`               | `string` | **Obrigatório**. Nome da fazenda               |
| `farmCity`               | `string` | **Obrigatório**. Cidade da fazenda             |
| `farmState`              | `string` | **Obrigatório**. Estado da fazenda             |
| `totalAreaHectares`      | `number` | **Obrigatório**. Área total em hectares       |
| `arableAreaHectares`     | `number` | **Obrigatório**. Área arável em hectares      |
| `vegetationAreaHectares` | `number` | **Obrigatório**. Área de vegetação em hectares|
| `ruralProducerId`        | `string` | **Obrigatório**. ID do produtor rural         |

#### Remove uma propriedade

```http
  DELETE /delete-property/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da propriedade            |

#### Adiciona culturas a uma propriedade

```http
  POST /add-plant-crops-to-property/${id}/plant-crops
```

| Parâmetro     | Tipo     | Descrição                                      |
| :------------ | :------- | :--------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID da propriedade          |
| `plantCrops`  | `array`  | **Obrigatório**. Array de culturas            |

**Estrutura do objeto plantCrops:**
| Parâmetro   | Tipo     | Descrição                                      |
| :---------- | :------- | :--------------------------------------------- |
| `name`      | `string` | **Obrigatório**. Nome da cultura              |
| `harvestId` | `string` | **Obrigatório**. ID da safra                  |

### Harvest - Safras

#### Retorna todas as safras

```http
  GET /get-harvests
```

**Resposta:** Array de objetos com informações das safras

#### Retorna uma safra

```http
  GET /get-harvest-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da safra                  |

#### Cria uma nova safra

```http
  POST /create-harvest
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `year`    | `number` | **Obrigatório**. Ano da safra (mínimo 1900)   |

#### Atualiza uma safra

```http
  PUT /update-harvest/${id}
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da safra                |
| `year`    | `number` | **Obrigatório**. Ano da safra (mínimo 1900)   |

#### Remove uma safra

```http
  DELETE /delete-harvest/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da safra                  |

### Plant Crop - Culturas Plantadas

#### Retorna todas as culturas plantadas

```http
  GET /get-plant-crops
```

**Resposta:** Array de objetos com informações das culturas plantadas

#### Retorna uma cultura plantada

```http
  GET /get-plant-crop-by-id/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da cultura plantada       |

#### Cria uma nova cultura plantada

```http
  POST /create-plant-crop
```

| Parâmetro    | Tipo     | Descrição                                      |
| :----------- | :------- | :--------------------------------------------- |
| `name`       | `string` | **Obrigatório**. Nome da cultura              |
| `propertyId` | `string` | **Obrigatório**. ID da propriedade            |
| `harvestId`  | `string` | **Obrigatório**. ID da safra                  |

#### Atualiza uma cultura plantada

```http
  PUT /update-plant-crop/${id}
```

| Parâmetro    | Tipo     | Descrição                                      |
| :----------- | :------- | :--------------------------------------------- |
| `id`         | `string` | **Obrigatório**. O ID da cultura plantada     |
| `name`       | `string` | **Obrigatório**. Nome da cultura              |
| `propertyId` | `string` | **Obrigatório**. ID da propriedade            |
| `harvestId`  | `string` | **Obrigatório**. ID da safra                  |

#### Remove uma cultura plantada

```http
  DELETE /delete-plant-crop/${id}
```

| Parâmetro | Tipo     | Descrição                                        |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da cultura plantada       |

### Dashboard - Relatórios e Estatísticas

#### Retorna resumo geral do dashboard

```http
  GET /dashboard-summary
```

**Resposta:** Objeto com estatísticas gerais do sistema

#### Retorna dados por estado

```http
  GET /dashboard-by-state
```

**Resposta:** Array de objetos com dados agrupados por estado

#### Retorna dados por cultura

```http
  GET /dashboard-by-crop
```

**Resposta:** Array de objetos com dados agrupados por cultura

#### Retorna total de fazendas

```http
  GET /dashboard-farms-total
```

**Resposta:** Objeto com o total de fazendas cadastradas

#### Retorna área total

```http
  GET /dashboard-area-total
```

**Resposta:** Objeto com a área total em hectares

#### Retorna áreas aráveis e de vegetação

```http
  GET /dashboard-arable-vegetation-areas
```

**Resposta:** Objeto com as áreas aráveis e de vegetação separadamente

## Documentação Swagger

A documentação interativa da API está disponível em:

```
GET /api-docs
```

Para acessar a documentação JSON:

```
GET /api-docs-json
```


## Apêndice

### JSONs para Swagger

> **⚠️ IMPORTANTE:** Antes de testar as APIs no Swagger, execute as seeds do banco de dados para popular com dados iniciais:
> ```bash
> pnpm run migration:seed
> # ou
> npm run migration:seed
> ```

### Rural Producer APIs

#### POST /create-rural-producer
```json
{
  "name": "Maria Silva Agricultura",
  "cpfOrCnpj": "018.484.290-53"
}
```

#### PUT /update-rural-producer/{id}
**URL:** `/update-rural-producer/59af6bba-dc6a-4fcc-9673-45b40b7be51c`
```json
{
  "name": "L F Souza LTDA - Atualizado",
  "cpfOrCnpj": "68.489.606/0001-76"
}
```

### Property APIs

#### POST /create-property
```json
{
  "farmName": "Fazenda Esperança",
  "farmCity": "Ribeirão Preto",
  "farmState": "SP",
  "totalAreaHectares": 150,
  "arableAreaHectares": 120,
  "vegetationAreaHectares": 30,
  "ruralProducerId": "59af6bba-dc6a-4fcc-9673-45b40b7be51c"
}
```

#### PUT /update-property/{id}
**URL:** `/update-property/c1e55996-1d6f-492a-83a6-b65434d9712a`
```json
{
  "farmName": "Fazenda do Souza 1 - Renovada",
  "farmCity": "São Paulo",
  "farmState": "SP",
  "totalAreaHectares": 120,
  "arableAreaHectares": 90,
  "vegetationAreaHectares": 30,
  "ruralProducerId": "59af6bba-dc6a-4fcc-9673-45b40b7be51c"
}
```

#### POST /add-plant-crops-to-property/{id}/plant-crops
**URL:** `/add-plant-crops-to-property/c1e55996-1d6f-492a-83a6-b65434d9712a/plant-crops`
```json
{
  "plantCrops": [
    {
      "name": "Milho",
      "harvestId": "be89a300-80d3-40c0-8a59-8fb6501a9838"
    },
    {
      "name": "Feijão",
      "harvestId": "be89a300-80d3-40c0-8a59-8fb6501a9838"
    }
  ]
}
```

### Harvest APIs

#### POST /create-harvest
```json
{
  "year": 2026
}
```

#### PUT /update-harvest/{id}
**URL:** `/update-harvest/be89a300-80d3-40c0-8a59-8fb6501a9838`
```json
{
  "year": 2025
}
```

### Plant Crop APIs

#### POST /create-plant-crop
```json
{
  "name": "Algodão",
  "propertyId": "c1e55996-1d6f-492a-83a6-b65434d9712a",
  "harvestId": "be89a300-80d3-40c0-8a59-8fb6501a9838"
}
```

#### PUT /update-plant-crop/{id}
**URL:** `/update-plant-crop/e1437cce-f708-49cd-8b53-1ba301c774d2`
```json
{
  "name": "Soja Transgênica",
  "propertyId": "c1e55996-1d6f-492a-83a6-b65434d9712a",
  "harvestId": "be89a300-80d3-40c0-8a59-8fb6501a9838"
}
```

### IDs Disponíveis no Seed

Para facilitar os testes, aqui estão os IDs criados pelas seeds:

| Entidade | ID | Descrição |
|:---------|:---|:----------|
| **Rural Producer** | `59af6bba-dc6a-4fcc-9673-45b40b7be51c` | L F Souza LTDA |
| **Property 1** | `c1e55996-1d6f-492a-83a6-b65434d9712a` | Fazenda do Souza 1 |
| **Property 2** | `cdaf799f-7f24-4669-9f49-e61ed7011ec3` | Fazenda do Souza 2 |
| **Harvest** | `be89a300-80d3-40c0-8a59-8fb6501a9838` | Safra 2025 |
| **Plant Crop** | `e1437cce-f708-49cd-8b53-1ba301c774d2` | Soja |


## Variáveis de Ambiente

Para rodar esse projeto local, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=brain_agriculture_prod
DATABASE_PASSWORD=brain_agriculture_prod
```
## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run local database with Docker Compose

```bash
$ pnpm run database
```
## Run a local test database with Docker Compose

```bash
$ pnpm run database:test
```

## Run tests

> **⚠️ IMPORTANTE:** Antes de rodar os testes e2e precisa subir o banco de dados de teste:

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Rodar seed

1. Execute as seeds: `pnpm run migration:seed`
2. Acesse o Swagger em: `http://localhost:3000/api-docs`
3. Copie e cole os JSONs acima nos endpoints correspondentes
4. Use os IDs da tabela para testar operações que requerem relacionamentos entre entidades