import { render,screen } from "@testing-library/react";
import { describe,expect,it,vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs accessibility",()=>{
  it("links the active tab to its panel",()=>{
    render(<Tabs items={[{id:"one",label:"One",content:"First"},{id:"two",label:"Two",content:"Second"}]} activeId="one" onChange={vi.fn()}/>);
    const tab=screen.getByRole("tab",{name:"One"});
    const controls=tab.getAttribute("aria-controls");
    expect(tab).toHaveAttribute("aria-selected","true");
    expect(controls).toBeTruthy();
    expect(document.getElementById(controls!)).toHaveAttribute("role","tabpanel");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("First");
  });
});
