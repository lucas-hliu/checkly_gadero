import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('corporate-customer-details-filled-check', async ({ page }) => {
  await CheckHelper.checkCorporateCustomerDetailsFilled(page);
});