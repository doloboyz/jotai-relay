import { fetchQuery } from 'relay-runtime';
import type {
  Environment,
  GraphQLTaggedNode,
  OperationType,
} from 'relay-runtime';
import type { Getter, WritableAtom } from 'jotai/vanilla';
import { environmentAtom } from './environmentAtom.js';
import { createAtom } from './common.js';

type Config = Parameters<typeof fetchQuery>[3];

type Action = {
  type: 'refetch';
};

/**
 * Creates a Jotai atom that fetches a GraphQL query with Relay.
 *
 * @param taggedNode - The GraphQL tagged node for the query.
 * @param getVariables - Function to retrieve the query variables.
 * @param getConfig - Optional function to retrieve the fetch query configuration.
 * @param getEnvironment - Function to retrieve the Relay environment. Defaults to using the environmentAtom.
 * @returns A Jotai writable atom that fetches the query response.
 */
export function atomWithQuery<T extends OperationType>(
  taggedNode: GraphQLTaggedNode,
  getVariables: (get: Getter) => T['variables'],
  getConfig?: (get: Getter) => Config,
  getEnvironment: (get: Getter) => Environment = (get) => get(environmentAtom),
): WritableAtom<T['response'], [Action], void> {
  // Create a Jotai atom that fetches a GraphQL query with Relay when set.
  return createAtom(
    (get) => [taggedNode, getVariables(get), getConfig?.(get)] as const,
    getEnvironment,
    (environment, args) => fetchQuery(environment, ...args),
    (action, _environment, refresh) => {
      if (action.type === 'refetch') {
        refresh();
      }
    },
  );
}
