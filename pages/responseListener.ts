import { Response } from '@playwright/test';

export interface IResponseListener {
  onResponse(response: Response):  Promise<void>;
}