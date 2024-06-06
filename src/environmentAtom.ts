import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { atom } from 'jotai/vanilla';

// Retrieve the default GraphQL URL from environment variables or fallback to '/graphql'
const DEFAULT_URL =
  (() => {
    try {
      return process.env.JOTAI_RELAY_DEFAULT_URL;
    } catch {
      return undefined;
    }
  })() || '/graphql';

// Create a default Relay Environment
const defaultEnvironment = new Environment({
  network: Network.create(async (params, variables) => {
    // Perform a POST request to the GraphQL endpoint
    const response = await fetch(DEFAULT_URL, {
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

// Create a Jotai atom to hold the default Relay environment
export const environmentAtom = atom(defaultEnvironment);

// Enable debug mode for the atom in non-production environments
if (process.env.NODE_ENV !== 'production') {
  environmentAtom.debugPrivate = true;
}
