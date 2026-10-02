import { fireEvent,render,screen } from "@testing-library/react";
import { describe,expect,it,vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs accessibility",()=>{
  it("links tabs to panels and supports arrow navigation",()=>{
    const change=vi.fn();
    render(<Tabs items={[{id:"one",label:"One",content:"First"},{id:"two",label:"Two",content:"Second"}]} activeId="one" onChange={change}/>);
    const tab=screen.getByRole("tab",{name:"One"});
    const controls=tab.getAttribute("aria-controls");
    expect(controls).toBeTruthy();
    expect(document.getElementById(controls!)).toHaveAttribute("role","tabpanel");
    fireEvent.keyDown(tab,{key:"ArrowRight"});
    expect(change).toHaveBeenCalledWith("two");
  });
});
