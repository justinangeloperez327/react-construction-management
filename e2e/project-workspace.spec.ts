import { expect,test } from "@playwright/test";

test("opens a project and navigates core modules from the sidebar",async({page},testInfo)=>{
  test.skip(testInfo.project.name.includes("mobile"),"desktop sidebar journey");
  await page.goto("/projects");
  await page.getByRole("link",{name:"CM-00049",exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/1\/overview/);
  await expect(page.getByRole("heading",{name:"Commercial Building Development",exact:true})).toBeVisible();

  const sidebar=page.getByRole("complementary",{name:"Application sidebar"});
  await sidebar.locator("summary").filter({hasText:"Technical"}).click();
  await sidebar.getByRole("link",{name:"RFIs",exact:true}).click();
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

test("dashboard keeps project sections one interaction away",async({page},testInfo)=>{
  test.skip(testInfo.project.name.includes("mobile"),"desktop navigation assertion");
  await page.goto("/");

  const sidebar=page.getByRole("complementary",{name:"Application sidebar"});
  await expect(sidebar.locator("summary").filter({hasText:"Execution"})).toBeVisible();
  await expect(sidebar.locator("summary").filter({hasText:"Technical"})).toBeVisible();
  await expect(sidebar.locator("summary").filter({hasText:"Commercial"})).toBeVisible();

  await sidebar.locator("summary").filter({hasText:"Execution"}).click();
  await sidebar.getByRole("link",{name:"Schedule",exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/1\/schedule/);
});

test("project pages no longer render duplicate workspace navigation",async({page},testInfo)=>{
  test.skip(testInfo.project.name.includes("mobile"),"desktop navigation assertion");
  await page.goto("/projects/1/schedule");
  await expect(page.getByRole("navigation",{name:"Project workspace"})).toHaveCount(0);
});
