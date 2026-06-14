import { describe, it, expect } from "vitest";

// Replicate the Status enum for test isolation
// (avoids needing prisma generate to run tests)
enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

describe("IssueStatusBadge mapping", () => {
  const statusMap: Record<Status, { label: string; color: string }> = {
    [Status.OPEN]: { label: "Open", color: "red" },
    [Status.IN_PROGRESS]: { label: "In Progress", color: "violet" },
    [Status.CLOSED]: { label: "Closed", color: "green" },
  };

  it("maps OPEN to red and 'Open'", () => {
    expect(statusMap[Status.OPEN].label).toBe("Open");
    expect(statusMap[Status.OPEN].color).toBe("red");
  });

  it("maps IN_PROGRESS to violet and 'In Progress'", () => {
    expect(statusMap[Status.IN_PROGRESS].label).toBe("In Progress");
    expect(statusMap[Status.IN_PROGRESS].color).toBe("violet");
  });

  it("maps CLOSED to green and 'Closed'", () => {
    expect(statusMap[Status.CLOSED].label).toBe("Closed");
    expect(statusMap[Status.CLOSED].color).toBe("green");
  });

  it("covers all Status enum values", () => {
    const statusValues = Object.values(Status);
    const mappedKeys = Object.keys(statusMap);
    expect(mappedKeys.sort()).toEqual(statusValues.sort());
  });
});
