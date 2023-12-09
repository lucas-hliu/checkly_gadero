import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('individual-customer-details-filled-check', async ({ page }) => {
  await CheckHelper.checkIndividualCustomerDetailsFilled(page);
});