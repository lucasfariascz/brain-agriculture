## Repository overview

This is a NestJS (v10) API that manages rural producers, properties, harvests and plant-crops. The codebase is organized as feature modules under `src/features/*` (e.g. `rural-producer`, `property`, `harvest`, `plat-crop`, `dashboard`). Each feature follows the same convention: `controllers/`, `services/`, `repositories/`, `dtos/`, `entities/`.

Key bootstrapping files
- `src/main.ts` — app bootstrap: global ValidationPipe, AllExceptionsFilter, Swagger at `/api-docs`, and logging provider registration.
- `src/app.module.ts` — imports modules, configures `nest-winston`, global interceptors and middleware (transaction id).

Data and persistence
- TypeORM is used with a single centralized data source at `src/shared/database/data-source.ts` (reads `.env`).
- Entities are discovered with the glob `src/**/*.entity{.ts,.js}`. Migrations live in `migrations/`.
- Seed scripts: `src/shared/database/seed.ts` and npm script `migration:seed`.

Observability and request tracing
- A `transaction-id` header is injected by `TransactionMiddleware` and/or `TransactionInterceptor` and attached to `req.transactionId` and `res.locals.transactionId`. Use this value for log correlation.
- Logging uses `nest-winston` with `src/shared/config/log/winston/winston.config.ts` (JSON logs including transactionId). The Winston provider token is `WINSTON_MODULE_NEST_PROVIDER`.
- Incoming requests and outgoing responses are logged by `LoggingInterceptor` (sanitizes sensitive headers/body and truncates large bodies).

Error handling and validation
- Global exception handler: `src/shared/config/exceptions/all-exceptions-filter.ts`.
- Validation: `ValidationPipe` is enabled globally in `main.ts`. DTOs use `class-validator` and `class-transformer`. Keep DTOs strict (whitelist:true).

Typical code patterns to follow
- Controllers call Services; Services call Repositories which use TypeORM Entities. Follow the existing folder layout under `src/features/<feature>/...`.
- Entities often extend shared audited/base entities: see `src/shared/database/entity.ts` and `full-audited-entity.ts`.
- DTOs live in `dtos/` and are used with decorators (`@Body()`, `@Param()`) and validated by the global pipe.

Common developer commands
- Start dev server: `pnpm run start:dev` or `npm run start:dev`
- Build: `pnpm run build` or `npm run build`
- Run tests: `pnpm run test` (unit), `pnpm run test:e2e` (e2e via `test/jest-e2e.json`)
- Run database locally (Docker compose): `pnpm run database` or `npm run database` (and `database:test` uses `docker-compose-test.yml`).
- Migrations via helper script: `npm run typeorm` — other scripts: `migration:generate`, `migration:run`, `migration:revert`.
- Seed DB: `npm run migration:seed` (or `pnpm run migration:seed`).

Testing specifics
- E2E tests expect database helpers in `src/shared/database/database-test.module.ts`. Use `docker compose -f docker-compose-test.yml up --build` or `npm run database:test` to provision the DB for tests.

Conventions and gotchas
- Prefer `pnpm` when available (lockfile present). npm works with the provided scripts.
- All API docs are at `/api-docs` and JSON at `/api-docs-json`.
- When adding entities: add migrations (do not rely on `synchronize: true` — it is disabled in `data-source.ts`).
- Logging: include `transactionId` from request for traceability. Don't remove the middleware/interceptors unless replacing them with an equivalent tracing approach.
- Sensitive data: Logging interceptor already redacts some headers/fields; follow the same sanitization rules for any new logging.

Files to inspect for examples
- Boot: `src/main.ts`, `src/app.module.ts`
- DB: `src/shared/database/data-source.ts`, `src/shared/database/seed.ts`, `migrations/`
- Logging/tracing: `src/shared/config/log/winston/winston.config.ts`, `src/shared/config/log/interceptors/*.ts`, `src/shared/config/middleware/transaction.middleware.ts`
- Error handling: `src/shared/config/exceptions/all-exceptions-filter.ts`
- Feature layout example: `src/features/property/`, `src/features/rural-producer/`

When you make a change
- Run unit tests and lint for quick feedback: `pnpm run test` and `pnpm run lint`.
- If you add DB schema changes, create a migration via `npm run migration:generate` and run it with `npm run migration:run`.

If anything above is unclear or you want this file written in Portuguese or with extra examples (e.g. example migration command usage), tell me and I will iterate.
## Project-specific conventions

- File layout: follow `src/features/<feature>/{controllers,services,repositories,dtos,entities}`. Keep a 1:1 mapping between controller routes and service methods.
- Repositories use TypeORM and should be thin wrappers around query construction. Prefer query builders for complex queries (see `src/features/dashboard/repositories/dashboard.repository.ts`).
- Auditing: entities typically extend `src/shared/database/full-audited-entity.ts` or `entity.ts` to get common id/createdAt/updatedAt fields. Reuse these base entities.
- Validation: DTOs are strict (ValidationPipe with `whitelist: true`). Always add `@Is...` validators and `@ApiProperty()` for Swagger when exposing new DTO fields.
- Logging: include `transactionId` in service and repository logs. Use `LogService` (`src/shared/config/service/log.service.ts`) or the `WINSTON_MODULE_NEST_PROVIDER` token to log structured JSON.

## Editing & PR guidance for AI agents

- Keep changes minimal and scoped per PR: one feature or one bugfix. Keep PR descriptions short and reference files changed.
- Tests: include/adjust unit tests under `test/` for new logic. E2E tests live under `test/*/*.e2e-spec.ts` and require the test DB (`npm run database:test`).
- Migrations: whenever you change entities, generate a migration and include it in the PR. Commands:

```bash
# generate (requires typeorm cli configured):
npm run migration:generate -- <migration-name>
# run locally against dev DB:
npm run migration:run
```

- Linting & formatting: run `pnpm run lint` and `pnpm run format` before creating PRs.
- PR checklist for AI edits:
	- [ ] Code compiles (run `pnpm run build`).
	- [ ] Unit tests pass (`pnpm run test`).
	- [ ] Lint passes (`pnpm run lint`).
	- [ ] If DB model changed, migration included and seed updated if needed.
	- [ ] Swagger decorators added for new endpoints.

## Debugging & common tasks

- Start dev server with hot reload: `pnpm run start:dev` (listens on PORT env or 3000).
- Run unit tests quickly: `pnpm run test`.
- Run a single test file: `pnpm run test -- test/<feature>/<file>.spec.ts` or use Jest's `-t` option.
- Run e2e tests: first bring up the test DB:

```bash
npm run database:test
# in another terminal
pnpm run test:e2e
```

- Inspect logs: logs are JSON; to view prettified output use `jq` or Pipe to a formatter.

- Common debugging patterns:
	- To trace a request, include `transaction-id` header (or read `transaction-id` from response headers) and search logs for that transactionId.
	- For database query issues, enable TypeORM logging in `src/shared/database/data-source.ts` (currently `logging: true`). Use query runner or run the failing query in psql.

## Patterns and copyable examples

Add controller -> service -> repository snippet (adapt paths as needed):

Controller (src/features/<feature>/controllers/example.controller.ts)

```ts
import { Controller, Get } from '@nestjs/common';
import { ExampleService } from '../services/example.service';

@Controller('examples')
export class ExampleController {
	constructor(private readonly service: ExampleService) {}

	@Get()
	async findAll() {
		return this.service.findAll();
	}
}
```

Service (src/features/<feature>/services/example.service.ts)

```ts
import { Injectable } from '@nestjs/common';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class ExampleService {
	constructor(private readonly repo: ExampleRepository) {}

	async findAll() {
		return this.repo.find();
	}
}
```

Repository (src/features/<feature>/repositories/example.repository.ts)

```ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ExampleEntity } from '../entities/example.entity';

@Injectable()
export class ExampleRepository extends Repository<ExampleEntity> {
	constructor(private dataSource: DataSource) {
		super(ExampleEntity, dataSource.createEntityManager());
	}

	// custom query example using QueryBuilder
	async findByName(name: string) {
		return this.createQueryBuilder('e').where('e.name = :name', { name }).getMany();
	}
}
```

Entity extending audited base (`src/shared/database/full-audited-entity.ts`)

```ts
import { FullAuditedEntity } from 'src/shared/database/full-audited-entity';

export class ExampleEntity extends FullAuditedEntity {
	name: string;
}
```

How to add a new entity and migration (example steps):

1. Create `src/features/<feature>/entities/<name>.entity.ts` extending the audited base.
2. Create repository/service/controller following other features.
3. Run `npm run migration:generate -- Add<Feature>NameEntity` and include the generated migration in the PR.
4. Run `npm run migration:run` locally to verify migrations apply.

---

If you want these snippets translated to Portuguese or expanded into a full contributor checklist, tell me which parts to expand and I'll update the file.
