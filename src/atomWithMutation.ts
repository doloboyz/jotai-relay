import { atom } from 'jotai/vanilla';
import type { Getter, WritableAtom } from 'jotai/vanilla';
import type {
  Disposable,
  Environment,
  MutationConfig,
  MutationParameters,
} from 'relay-runtime';
import { commitMutation } from 'relay-runtime';
import { environmentAtom } from './environmentAtom.js';

/**
 * Creates a Jotai atom with a Relay mutation.
 *
 * @param getEnvironment - Function to retrieve the Relay environment. Defaults to using the environmentAtom.
 * @returns A Jotai writable atom that commits the mutation.
 */
export function atomWithMutation<T extends MutationParameters>(
  getEnvironment: (get: Getter) => Environment = (get) => get(environmentAtom),
): WritableAtom<undefined, [MutationConfig<T>], Disposable> {
  // Define a Jotai atom that performs a Relay mutation when set.
  const mutationAtom = atom(
    undefined, // Initial value of the atom is undefined.
    (get, _set, config: MutationConfig<T>) => {
      const environment = getEnvironment(get);
      return commitMutation(environment, config);
    },
  );

  return mutationAtom;
}
