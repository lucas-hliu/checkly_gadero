import { test } from '@playwright/test';
import { CheckHelper } from '../pages/checkHelper';

test('extra-options-check', async ({ page }) => {
  await CheckHelper.checkExtraOptions(page);
});