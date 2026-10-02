import { fireEvent,render,screen } from "@testing-library/react";
import { describe,expect,it,vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog accessibility",()=>{
  it("exposes accessible dialog semantics and closes with Escape",()=>{
    const close=vi.fn();
    render(<Dialog open title="Edit record" description="Update details" onClose={close}><button>Save</button></Dialog>);
    const dialog=screen.getByRole("dialog",{name:"Edit record"});
    expect(dialog).toHaveAccessibleDescription("Update details");
    expect(screen.getByRole("button",{name:"Save"})).toBeVisible();
    fireEvent.keyDown(document,{key:"Escape"});
    expect(close).toHaveBeenCalled();
  });
});
