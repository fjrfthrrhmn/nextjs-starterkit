import { Providers } from '@/components/provider';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const renderApp = (
  ui: React.ReactElement,
  renderOptions: Record<string, any> = {},
) => {
  return {
    ...rtlRender(ui, {
      wrapper: Providers,
      ...renderOptions,
    }),
  };
};

export * from '@testing-library/react';
export { rtlRender, userEvent };

