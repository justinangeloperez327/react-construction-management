import { expect,test } from "@playwright/test";

test("mobile sidebar exposes grouped project navigation",async({page},testInfo)=>{
  test.skip(!testInfo.project.name.includes("mobile"),"mobile-only journey");
  await page.goto("/projects/1/overview");

  await page.getByRole("button",{name:"Open navigation"}).click();
  const drawer=page.getByRole("complementary",{name:"Mobile navigation"});
  await expect(drawer).toBeVisible();

  const dailyProgress=drawer.getByRole("link",{name:"Daily Progress",exact:true});
  if(!await dailyProgress.isVisible())await drawer.locator("summary").filter({hasText:"Execution"}).click();
  await dailyProgress.click();
  await expect(page).toHaveURL(/\/projects\/1\/daily-progress/);
  await expect(page.getByRole("complementary",{name:"Mobile navigation"})).toHaveCount(0);
});

test("mobile sidebar closes cleanly after navigation and escape",async({page},testInfo)=>{
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
