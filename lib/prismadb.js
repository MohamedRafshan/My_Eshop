import { PrismaClient } from "@prisma/client";

const prismadb = globalThis.prismadb || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prismadb = prismadb;

export default prismadb;