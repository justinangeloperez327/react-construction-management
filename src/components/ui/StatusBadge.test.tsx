import { render,screen } from "@testing-library/react";
import { describe,expect,it } from "vitest";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge",()=>{
  it("preserves textual status meaning and requested tone",()=>{
    render(<StatusBadge tone="danger">Overdue</StatusBadge>);
    const badge=screen.getByText("Overdue");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-tone","danger");
  });
  it("defaults to neutral",()=>{
    render(<StatusBadge>Unknown</StatusBadge>);
    expect(screen.getByText("Unknown")).toHaveAttribute("data-tone","neutral");
  });
});
