import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

// individual customer order paid success
test('individual-customer-order-success-flow-check', async ({ page }) => {
  await CheckHelper.checkIndividualCustomerOrderSuccessFlow(page);
});
