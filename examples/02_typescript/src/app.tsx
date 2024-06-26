import { Suspense } from 'react';
import { Provider, useAtom } from 'jotai/react';
import { createStore } from 'jotai/vanilla';
import { environmentAtom, atomWithQuery } from 'jotai-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
// eslint-disable-next-line
// @ts-ignore
import graphql from 'babel-plugin-relay/macro';

import type { appCountriesQuery } from './__generated__/AppCountriesQuery.graphql';

const myEnvironment = new Environment({
  network: Network.create(async (params, variables) => {
    const response = await fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });
    return response.json();
  }),
  store: new Store(new RecordSource()),
});

const countriesAtom = atomWithQuery<appCountriesQuery>(
  graphql`
    query appCountriesQuery {
      countries {
        name
      }
    }
  `,
  () => ({}),
);

const Main = () => {
  const [data] = useAtom(countriesAtom);
  return (
    <ul>
      {data.countries.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

const store = createStore();
store.set(environmentAtom, myEnvironment);

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback="Loading...">
        <Main />
      </Suspense>
    </Provider>
  );
};

export default App;
