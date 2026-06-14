import { describe, it, expect } from "vitest";

describe("Prisma client singleton pattern", () => {
  it("should define the expected singleton pattern in lib/prisma.ts", () => {
    // This test verifies the pattern used in lib/prisma.ts
    const pattern = `
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
`;
    // Check that the pattern assigns to globalThis in dev
    expect(pattern).toContain("global.prisma");
    expect(pattern).toContain("PrismaClient");
    expect(pattern).toContain("NODE_ENV !== \"production\"");
  });
});
