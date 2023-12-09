import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('payByLink-check', async ({ page }) => {
  await CheckHelper.checkPayByLinkPaymentMethodVisibleAndOrder(page);
});