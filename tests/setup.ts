import { vi } from "vitest";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock next-auth
vi.mock("next-auth", () => ({
  default: () => ({
    GET: vi.fn(),
    POST: vi.fn(),
  }),
  getServerSession: vi.fn(() => Promise.resolve(null)),
}));

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock Prisma client
vi.mock("@/lib/prisma", () => ({
  prisma: {
    issue: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));
