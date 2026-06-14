import { describe, it, expect, vi } from "vitest";
import { IssueSchema, patchIssueSchema } from "@/app/validationSchema";

describe("IssueSchema", () => {
  it("accepts valid input", () => {
    const result = IssueSchema.safeParse({
      title: "Fix login button",
      description: "The button is misaligned on mobile.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = IssueSchema.safeParse({
      title: "",
      description: "Some description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects title exceeding 255 characters", () => {
    const result = IssueSchema.safeParse({
      title: "x".repeat(256),
      description: "Some description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty description", () => {
    const result = IssueSchema.safeParse({
      title: "Valid title",
      description: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description exceeding 65535 characters", () => {
    const result = IssueSchema.safeParse({
      title: "Valid title",
      description: "x".repeat(65536),
    });
    expect(result.success).toBe(false);
  });
});

describe("patchIssueSchema", () => {
  it("accepts partial update with just title", () => {
    const result = patchIssueSchema.safeParse({ title: "New title" });
    expect(result.success).toBe(true);
  });

  it("accepts partial update with just description", () => {
    const result = patchIssueSchema.safeParse({
      description: "New description",
    });
    expect(result.success).toBe(true);
  });

  it("accepts assignedToUserId as string", () => {
    const result = patchIssueSchema.safeParse({
      assignedToUserId: "cl12345",
    });
    expect(result.success).toBe(true);
  });

  it("accepts assignedToUserId as null (unassign)", () => {
    const result = patchIssueSchema.safeParse({
      assignedToUserId: null,
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty object", () => {
    const result = patchIssueSchema.safeParse({});
    expect(result.success).toBe(true); // all fields optional
  });
});
