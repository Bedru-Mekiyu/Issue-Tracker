import { describe, it, expect } from "vitest";

describe("Pagination logic", () => {
  it("calculates page count correctly", () => {
    const itemCount = 25;
    const pageSize = 10;
    const pageCount = Math.ceil(itemCount / pageSize);
    expect(pageCount).toBe(3);
  });

  it("returns 0 pages for 0 items", () => {
    const pageCount = Math.ceil(0 / 10);
    expect(pageCount).toBe(0);
  });

  it("hides pagination when pageCount <= 1", () => {
    const shouldHide = (itemCount: number, pageSize: number) =>
      Math.ceil(itemCount / pageSize) <= 1;

    expect(shouldHide(5, 10)).toBe(true);
    expect(shouldHide(10, 10)).toBe(true);
    expect(shouldHide(11, 10)).toBe(false);
  });

  it("disables first/prev on page 1", () => {
    const isFirstPage = (page: number) => page === 1;
    expect(isFirstPage(1)).toBe(true);
    expect(isFirstPage(2)).toBe(false);
  });

  it("disables next/last on last page", () => {
    const isLastPage = (page: number, pageCount: number) =>
      page === pageCount;
    expect(isLastPage(3, 3)).toBe(true);
    expect(isLastPage(2, 3)).toBe(false);
  });
});
