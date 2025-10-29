import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Database read-only checks", () => {
  test("can read products", async () => {
    const products = await prisma.product.findMany({ take: 5 });
    expect(Array.isArray(products)).toBe(true);
    products.forEach((p) => {
      expect(p).toBeDefined();
      expect(p.id).toBeDefined();
    });
  });

  test("can read users", async () => {
    const users = await prisma.user.findMany({ take: 5 });
    expect(Array.isArray(users)).toBe(true);
    users.forEach((u) => {
      expect(u).toBeDefined();
      if ("email" in u) expect(u.email).toBeDefined();
    });
  });

  test("can read profiles", async () => {
    const profiles = await prisma.profile.findMany({ take: 5 });
    expect(Array.isArray(profiles)).toBe(true);
    profiles.forEach((p) => {
      expect(p).toBeDefined();
      expect(p.userId).toBeDefined();
    });
  });
});
