# Cloudflare Workers Deployment

This project now deploys to **Cloudflare Workers** via **OpenNext**.

## 1. Required versions

- `next`: `14.2.35`
- `@opennextjs/cloudflare`: `1.14.10`
- `wrangler`: `4.77.0`

Do not upgrade `@opennextjs/cloudflare` blindly while the app is still on Next 14. Newer adapter versions target Next 15/16 and will fail during Worker bundling.

## 2. Build and preview locally

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Fill at least `PASSWORD`.
3. Run:

```bash
pnpm preview
```

This command will:

1. build the Next.js app,
2. generate the OpenNext Worker bundle,
3. start Wrangler local preview.

## 3. Deploy from local CLI

Make sure you have authenticated Wrangler first:

```bash
pnpm exec wrangler login
```

Then deploy:

```bash
pnpm deploy
```

## 4. Deploy from Cloudflare dashboard

Use these commands in the Cloudflare Workers Git integration:

- Build command: `pnpm workers:build`
- Deploy command: `pnpm exec wrangler deploy`

## 5. Required environment variables

Minimum for `localstorage`:

- `PASSWORD`

Recommended:

- `USERNAME`
- `NEXT_PUBLIC_STORAGE_TYPE`

## 6. D1 setup

1. Create a D1 database in Cloudflare.
2. Execute [d1-init.sql](/home/zhangyong/MoonTV/d1-init.sql) in that database.
3. Edit [wrangler.jsonc](/home/zhangyong/MoonTV/wrangler.jsonc) and uncomment the `d1_databases` section.
4. Keep the binding name as `DB`.
5. Set `NEXT_PUBLIC_STORAGE_TYPE=d1`.
6. Re-run:

```bash
pnpm cf-typegen
pnpm deploy
```

## 7. Important files

- [package.json](/home/zhangyong/MoonTV/package.json)
- [next.config.js](/home/zhangyong/MoonTV/next.config.js)
- [wrangler.jsonc](/home/zhangyong/MoonTV/wrangler.jsonc)
- [open-next.config.ts](/home/zhangyong/MoonTV/open-next.config.ts)
- [src/lib/cloudflare.ts](/home/zhangyong/MoonTV/src/lib/cloudflare.ts)
- [src/lib/d1.db.ts](/home/zhangyong/MoonTV/src/lib/d1.db.ts)

## 8. Verified commands

These were executed successfully in this repo:

```bash
pnpm workers:build
pnpm exec wrangler deploy --dry-run --outdir .wrangler-dry-run
```
