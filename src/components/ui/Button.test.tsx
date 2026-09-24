import { render,screen } from "@testing-library/react";
import { describe,expect,it } from "vitest";
import { Button } from "./Button";
describe("Button",()=>{it("renders an accessible button",()=>{render(<Button>Save project</Button>);expect(screen.getByRole("button",{name:"Save project"})).toBeInTheDocument()});it("supports disabled state",()=>{render(<Button disabled>Save</Button>);expect(screen.getByRole("button")).toBeDisabled()})});
