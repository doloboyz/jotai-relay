import { requestSubscription } from 'relay-runtime';
import type {
  Environment,
  GraphQLTaggedNode,
  OperationType,
  SelectorStoreUpdater,
  Subscribable,
} from 'relay-runtime';
import type { Getter, WritableAtom } from 'jotai/vanilla';
import { environmentAtom } from './environmentAtom.js';
import { createAtom } from './common.js';

type Configs = Parameters<typeof requestSubscription>[1]['configs'];

type Action = {
  type: 'refetch';
};

/**
 * Creates a Jotai atom with a Relay subscription.
 *
 * @param taggedNode - The GraphQL tagged node for the subscription.
 * @param getVariables - Function to retrieve the subscription variables.
 * @param getConfigs - Optional function to retrieve the subscription configurations.
 * @param updater - Optional updater function for the subscription.
 * @param getEnvironment - Function to retrieve the Relay environment. Defaults to using the environmentAtom.
 * @returns A Jotai writable atom that subscribes to the Relay subscription.
 */
export function atomWithSubscription<T extends OperationType>(
  taggedNode: GraphQLTaggedNode,
  getVariables: (get: Getter) => T['variables'],
  getConfigs?: (get: Getter) => Configs,
  updater?: SelectorStoreUpdater<T['response']>,
  getEnvironment: (get: Getter) => Environment = (get) => get(environmentAtom),
): WritableAtom<T['response'], [Action], void> {
  // Create a Jotai atom that subscribes to a Relay subscription.
  return createAtom(
    (get) => ({
      configs: getConfigs?.(get),
      subscription: taggedNode,
      variables: getVariables(get),
    }),
    getEnvironment,
    (environment, config) => {
      const subscribable: Subscribable<T['response']> = {
        subscribe: (observer) => {
          const disposable = requestSubscription(environment, {
            ...config,
            updater,
            onNext: observer.next,
            onError: observer.error,
            onCompleted: observer.complete,
          });
          return {
            unsubscribe: () => {
              disposable.dispose();
            },
            closed: false, // HACK: we don't use this.
          };
        },
      };
      return subscribable;
    },
    (action, _environment, refresh) => {
      if (action.type === 'refetch') {
        refresh();
      }
    },
  );
}
