import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('corporate-customer-order-success-flow-check', async ({ page }) => {
  await CheckHelper.checkCorporateCustomerOrderSuccessFlow(page);
});
