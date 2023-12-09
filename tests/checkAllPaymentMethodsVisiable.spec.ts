import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('all-payment-methods-visiable-check', async ({ page }) => {
  await CheckHelper.checkAllPaymentMethodsVisiable(page);
});