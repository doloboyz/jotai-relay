import { Suspense } from 'react';
import { Provider, useAtom } from 'jotai/react';
import { createStore } from 'jotai/vanilla';
import { environmentAtom, atomWithQuery } from 'jotai-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  graphql,
} from 'relay-runtime';

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
      {data.countries.map((country: { name: string }) => (
        <li key={country.name}>{country.name}</li>
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
