import {inject, type InjectionKey} from "vue";

/** As {@link inject} but fails if no value is provided. */
export function injectStrict<T>(key: InjectionKey<T>, defaultValue?: T): T {
  const resolved = inject(key, defaultValue);
  if (!resolved) { throw new Error(`Injection failed: value ${key.description} not provided but required.`); }
  return resolved;
}