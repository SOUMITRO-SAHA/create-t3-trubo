import {
  createTRPCContext,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const authRouter = createTRPCContext({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can see this secret message";
  }),
});
