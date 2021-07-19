import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { LazyLoading } from '@cudo/shared-components'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
// import 'semantic-ui-css/semantic.min.css'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import * as serviceWorker from "./serviceWorker";
import "./SubscriberWidgetElement";
import App from './app/app';
// import ErrorContainer from './app/ErrorContainer';
import { MS_SERVICE_URL } from '@cudo/mf-core';

declare global {
  interface Window {
    renderProjectApp: any;
    unmountProjectApp: any;
  }
}
const client = new ApolloClient({
  uri: MS_SERVICE_URL['ms_project'].url,
  cache: new InMemoryCache()
});

// const App = lazy(() => import('./app/app'))

window.renderProjectApp = (containerId, history) => {
  ReactDOM.render(
    <Suspense fallback={<LazyLoading />}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client as any}>
            <App />
            {/* <ErrorContainer /> */}
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Suspense>
    , document.getElementById(containerId)
  );
  serviceWorker.unregister();
};
window.unmountProjectApp = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("ProjectApp-container")) {
  // ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(
    // <React.StrictMode>
    <Suspense fallback={<LazyLoading />}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client as any}>
            <App />
            {/* <ErrorContainer /> */}
          </ApolloHooksProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Suspense>
    // </React.StrictMode>
    ,
    document.getElementById("root")
  );
  serviceWorker.unregister();
}