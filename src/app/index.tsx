import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { 
  TokenStore, 
  AuthStore, 
  HostStore, 
  OverViewStore,
  AssetsStore,
  CommonDataStore,
  PageStore,
  RealTimeStore  
} from './stores';
import registerServiceWorker from './registerServiceWorker';
import { Root } from './containers/Root';
import './index.css';
import Container from './containers/Container';
import SignIn from './containers/Auth/signIn';
import SignUp from './containers/Auth/signUp';
import './macarons';
import 'echarts/map/js/world';

useStrict(true);

const browserHistory = createBrowserHistory();
const routerStore =  new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);
const rootStore = {
  token: new TokenStore(),
  auth: new AuthStore(),
  host: new HostStore(),
  overview: new OverViewStore(),
  assets: new AssetsStore(),
  commmon: new CommonDataStore(),
  page: new PageStore(),
  realtime: new RealTimeStore(),
  router: routerStore
};

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Switch>
          <Route
            path="/signIn"
            component={SignIn}
          />
          <Route
            path="/signUp"
            component={SignUp}
          />
          <Route
            path="/"
            component={Container}
          />
        </Switch>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
