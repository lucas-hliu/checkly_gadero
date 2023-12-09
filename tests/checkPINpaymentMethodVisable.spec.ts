import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('pin-check', async ({ page }) => {
  await CheckHelper.checkPINpaymentMethodVisable(page);
});