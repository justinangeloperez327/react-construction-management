import { expect,test } from "@playwright/test";

test("opens a project and navigates core workspace modules",async({page})=>{
  await page.goto("/projects");
  await page.getByRole("link",{name:/CM-00049/}).click();
  await expect(page).toHaveURL(/\/projects\/1\/overview/);
  await expect(page.getByRole("heading",{name:"Commercial Building Development",exact:true})).toBeVisible();

  const modulesTrigger=page.getByRole("button",{name:"Project modules"});
  if(await modulesTrigger.isVisible())await modulesTrigger.click();

  const workspace=page.getByRole("navigation",{name:"Project workspace"});
  await workspace.getByRole("link",{name:"RFIs",exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/1\/rfis/);
  await expect(page.getByRole("heading",{name:/RFIs/i})).toBeVisible();
});

test("sidebar marks only the exact current route active",async({page},testInfo)=>{
  test.skip(testInfo.project.name.includes("mobile"),"desktop navigation assertion");
  await page.goto("/projects/1/rfis");

  const sidebar=page.getByRole("complementary",{name:"Application sidebar"});
  const projects=sidebar.getByRole("link",{name:"Projects",exact:true});
  const rfis=sidebar.getByRole("link",{name:"RFIs",exact:true});

  await expect(rfis).toHaveAttribute("aria-current","page");
  await expect(projects).not.toHaveAttribute("aria-current","page");
});
