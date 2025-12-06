import { useSyncExternalStore } from 'react';

let loggedIn = false;
const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getSnapshot() {
  return loggedIn;
}

export function setLoggedIn(value: boolean) {
  if (loggedIn !== value) {
    loggedIn = value;
    subscribers.forEach((cb) => cb());
  }
}

export function useLoggedIn() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
