import { expect,test } from "@playwright/test";

test("mobile project module selector remains usable",async({page},testInfo)=>{
  test.skip(!testInfo.project.name.includes("mobile"),"mobile-only journey");
  await page.goto("/projects/1/overview");

  const trigger=page.getByRole("button",{name:"Project modules"});
  await expect(trigger).toBeVisible();
  await trigger.click();

  const workspace=page.getByRole("navigation",{name:"Project workspace"});
  await workspace.getByRole("link",{name:"Daily Progress",exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/1\/daily-progress/);
  await expect(trigger).toBeVisible();
});

test("mobile sidebar opens, navigates and closes cleanly",async({page},testInfo)=>{
  test.skip(!testInfo.project.name.includes("mobile"),"mobile-only journey");
  await page.goto("/");

  await page.getByRole("button",{name:"Open navigation"}).click();
  const drawer=page.getByRole("complementary",{name:"Mobile navigation"});
  await expect(drawer).toBeVisible();

  await drawer.getByRole("link",{name:"Projects",exact:true}).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("complementary",{name:"Mobile navigation"})).toHaveCount(0);

  await page.getByRole("button",{name:"Open navigation"}).click();
  await expect(page.getByRole("complementary",{name:"Mobile navigation"})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("complementary",{name:"Mobile navigation"})).toHaveCount(0);
});
