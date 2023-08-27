import { FC } from 'react';

import { RootStore, StoreProvider } from './stores';
import { Home } from './screens';

const rootStore = new RootStore();

export const App: FC = () => {
  return (
    <StoreProvider store={rootStore}>
      <Home />
    </StoreProvider>
  );
}
