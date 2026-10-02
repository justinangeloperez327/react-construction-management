import { expect,test } from "@playwright/test";

test("account dropdown opens profile and supports sign out and sign in",async({page})=>{
  await page.goto("/");

  await page.getByRole("button",{name:"Account menu"}).click();
  await expect(page.getByRole("menuitem",{name:/Profile/})).toBeVisible();
  await page.getByRole("menuitem",{name:/Profile/}).click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("heading",{name:"Profile",exact:true})).toBeVisible();

  await page.getByRole("button",{name:"Account menu"}).click();
  await page.getByRole("menuitem",{name:/Sign out/}).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading",{name:"Sign in",exact:true})).toBeVisible();

  await page.getByLabel("Password").fill("demo123");
  await page.getByRole("button",{name:"Sign in",exact:true}).click();
  await expect(page).toHaveURL(/\/$/);
});

test("signed-out users are redirected to login",async({page})=>{
  await page.goto("/");
  await page.getByRole("button",{name:"Account menu"}).click();
  await page.getByRole("menuitem",{name:/Sign out/}).click();
  await page.goto("/projects/1/rfis");
  await expect(page).toHaveURL(/\/login$/);
});
