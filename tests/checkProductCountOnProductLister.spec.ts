//https://gadero.vercel.app/blokhut/ -->https://gadero.vercel.app/populaire-blokhutten/ 
import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('product-count-on-productLister-check', async ({ page }) => {
  await CheckHelper.checkProductCount(page);
});