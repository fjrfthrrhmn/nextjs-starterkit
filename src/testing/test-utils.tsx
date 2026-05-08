import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from '@/app/provider';

export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const renderApp = (
  ui: React.ReactElement,
  renderOptions: Record<string, any> = {},
) => {
  return {
    ...rtlRender(ui, {
      wrapper: AppProvider,
      ...renderOptions,
    }),
  };
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
