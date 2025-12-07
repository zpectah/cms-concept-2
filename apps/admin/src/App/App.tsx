import AppProvider from './AppProvider';
import AppRouter from './AppRouter';

import '../i18n';
import './helpers/themeModeInit';
import './helpers/localesInit';

const App = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
);

export default App;
