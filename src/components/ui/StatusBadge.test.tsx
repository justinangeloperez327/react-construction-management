import { render,screen } from "@testing-library/react";
import { describe,expect,it } from "vitest";
import { StatusBadge } from "./StatusBadge";
describe("StatusBadge",()=>{it("preserves textual status meaning",()=>{render(<StatusBadge tone="danger">Overdue</StatusBadge>);expect(screen.getByText("Overdue")).toBeInTheDocument()})});
