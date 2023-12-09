import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

// individual customer order paid failed(cancel)
test('individual-customer-order-failed-flow', async ({ page }) => {
  await CheckHelper.CheckIndividualCustomerOrderFailedFlow(page);
});