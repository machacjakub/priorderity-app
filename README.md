# Branches and stages

`main` - `testing-deploy` - https://testing-deploy-priorderity.vercel.app/

`preproduction` - `beta` - https://testing-deploy-priorderity.vercel.app/

`production` - https://testing-deploy-priorderity.vercel.app/

# Priorderity App

Description to be added...

## How to use

## Stack

> Check out [Supabase Auth with Next.js App router](https://supabase.com/docs/guides/auth/auth-helpers/nextjs#automatic-configuration-recommended) configuration.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [App Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

### Create `todo` table and seed with data (optional)

This will create a basic `todos` table, enable Row Level Security (RLS), and write RLS policies enabling `select` and `insert` actions for `authenticated` users.

To seed your `todos` table with some dummy data, run the contents of the [seed.sql](database/seed.sql) file.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
