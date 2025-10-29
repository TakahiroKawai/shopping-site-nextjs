const _global = global as unknown as { Request?: unknown; Response?: unknown };
if (typeof _global.Request === "undefined") {
  _global.Request = class {
    url?: string;
    method: string;
    headers: Record<string, string> | undefined;
    body?: string;
    constructor(input?: string | { url?: string }, init?: { method?: string; headers?: Record<string, string>; body?: string }) {
      this.url = typeof input === "string" ? input : input?.url;
      this.method = init?.method ?? "GET";
      this.headers = init?.headers ?? {};
      this.body = init?.body;
    }
    async json(): Promise<unknown> {
      return this.body ? JSON.parse(this.body) : {};
    }
  } as unknown;
}

jest.mock("next/server", () => ({
  NextResponse: {
    json(body: unknown) {
      return {
        async json(): Promise<unknown> {
          return body;
        },
        status: 200,
      };
    },
  },
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

// mock prisma client before route import
jest.mock("@/script/prismaclient", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    profile: {
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

jest.mock("@/app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

import { GET, POST } from "@/app/api/profile/route";
import prisma from "@/script/prismaclient";
import { getServerSession } from "next-auth/next";

describe("profile API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GET returns profile for authenticated user", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@b.com" } });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "a@b.com",
      profile: { userId: 1, age: "30", address: "Tokyo", profileImageUrl: "" },
    });

    const res = await GET();
    const json = await res.json();
    expect(json).toHaveProperty("age", "30");
  });

  test("POST upserts profile", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { email: "a@b.com" } });
    (prisma.user.upsert as jest.Mock).mockResolvedValue({ id: 1, email: "a@b.com" });
    (prisma.profile.upsert as jest.Mock).mockResolvedValue({ userId: 1, age: "31", address: "Osaka" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "A", age: "31", address: "Osaka", profileImageUrl: "" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req as any);
    const json = await res.json();
    expect(json).toHaveProperty("age", "31");
  });
});

afterAll(async () => {
  await (prisma.$disconnect as unknown as jest.Mock)();
});
