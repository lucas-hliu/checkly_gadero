import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('corporate-customer-order-failed-flow', async ({ page }) => {
  await CheckHelper.checkCorporateCustomerOrderFailedFlow(page);
});