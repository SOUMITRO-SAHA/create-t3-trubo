import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCContext, createCallerFactory } from "./trpc";

import type { AppRouter } from "./root";

import { appRouter } from "./root";

const createCaller = createCallerFactory(appRouter);

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
