import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export type IError = {
  data: {
    error: { statue: number; message: string; path: string };
    timestamp: string;
  };
};
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', action);
    if (Array.isArray(action.payload)) {
      (action.payload as any[]).map((item) =>
        toast.error(item, {
          position: 'bottom-center',
        }),
      );
    } else {
      toast.error(action.payload, {
        position: 'bottom-center',
      });
    }
  }

  return next(action);
};
