# `create-t3-turbo` with Tailwind and Prisma

> Note this repository utilizes the "app" directory in Next.js version 14.x.

## Installation

use Turbo's CLI to `init` your project (use PNPM as package manager):

```bash
pnpx create-turbo@latest -e https://github.com/SOUMITRO-SAHA/create-t3-trubo
```

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turbo.build/) and contains:

```bash
.github
  └─ workflow
    └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ web
  |  ├─ Next.js 14
  |  ├─ React 18
  |  ├─ Tailwind CSS
  |  └─ E2E Typesafe API Server & Client

packages
  ├─ api
  |   └─ tRPC v11 router definition
  ├─ auth
  |   └─ Authentication using next-auth. **NOTE: Only for Next.js app, not Expo**
  ├─ db
  |   └─ Typesafe prisma
  └─ ui
      └─ Start of a UI package for the webapp using shadcn-ui
tooling
  ├─ eslint-config
  |   └─ shared, fine-grained, eslint presets
  ├─ tailwind
  |   └─ shared tailwind configuration
  └─ tsconfig
      └─ shared tsconfig you can extend from
```

> In this template, we use @repo as a placeholder for package names. As a user, you might want to replace it with your own organization or project name. You can use find-and-replace to change all the instances of @acme to something like @my-company or @project-name.

## Quick Start

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```