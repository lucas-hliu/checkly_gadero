import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('related-products-check', async ({ page }) => {
  await CheckHelper.checkRelatedProducts(page);
});