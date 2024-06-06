import type { Environment, Subscribable } from 'relay-runtime';
import { atom } from 'jotai/vanilla';
import type { Getter } from 'jotai/vanilla';
import { atomWithObservable } from 'jotai/vanilla/utils';

/**
 * Creates a Jotai atom with observable data and action handling.
 *
 * @param getArgs - Function to retrieve the arguments for the subscription.
 * @param getEnvironment - Function to retrieve the Relay environment.
 * @param execute - Function to execute the subscription.
 * @param handleAction - Function to handle actions and refresh the subscription.
 * @returns A Jotai writable atom that manages the subscription and handles actions.
 */
export const createAtom = <Args, Result, Action, ActionResult>(
  getArgs: (get: Getter) => Args,
  getEnvironment: (get: Getter) => Environment,
  execute: (environment: Environment, args: Args) => Subscribable<Result>,
  handleAction: (
    action: Action,
    environment: Environment,
    refresh: () => void,
  ) => ActionResult,
) => {
  // Atom to trigger refreshes
  const refreshAtom = atom(0);
  if (process.env.NODE_ENV !== 'production') {
    refreshAtom.debugPrivate = true;
  }

  // Atom to create and manage the observable
  const observableAtom = atom((get) => {
    get(refreshAtom);
    const args = getArgs(get);
    const environment = getEnvironment(get);
    const observable = execute(environment, args);
    return observable;
  });
  if (process.env.NODE_ENV !== 'production') {
    observableAtom.debugPrivate = true;
  }

  // Base data atom to handle the observable subscription
  const baseDataAtom = atom((get) => {
    const observable = get(observableAtom);
    const resultAtom = atomWithObservable(() => observable);
    return resultAtom;
  });
  if (process.env.NODE_ENV !== 'production') {
    baseDataAtom.debugPrivate = true;
  }

  // Data atom to manage the state and handle actions
  const dataAtom = atom(
    (get) => {
      const resultAtom = get(baseDataAtom);
      const result = get(resultAtom);
      return result;
    },
    (get, set, action: Action) => {
      const environment = getEnvironment(get);
      const refresh = () => {
        set(refreshAtom, (c) => c + 1);
      };
      return handleAction(action, environment, refresh);
    },
  );

  return dataAtom;
};
