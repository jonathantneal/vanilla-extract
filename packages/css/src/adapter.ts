import type { Adapter } from './types';

export const mockAdapter: Adapter = {
  appendCss: () => {},
  registerClassName: () => {},
  onEndFileScope: () => {},
  registerComposition: () => {},
  markCompositionUsed: () => {},
  getIdentOption: () => 'debug',
};

let adapter: Adapter = mockAdapter;

let hasConfiguredAdapter = false;

export const setAdapterIfNotSet = (newAdapter: Adapter) => {
  if (!hasConfiguredAdapter) {
    setAdapter(newAdapter);
  }
};

export const setAdapter = (newAdapter: Adapter) => {
  hasConfiguredAdapter = true;
  adapter = newAdapter;
};

export const appendCss: Adapter['appendCss'] = (...props) => {
  return adapter.appendCss(...props);
};

export const registerClassName: Adapter['registerClassName'] = (...props) => {
  return adapter.registerClassName(...props);
};

export const registerComposition: Adapter['registerComposition'] = (
  ...props
) => {
  return adapter.registerComposition(...props);
};

export const markCompositionUsed: Adapter['markCompositionUsed'] = (
  ...props
) => {
  return adapter.markCompositionUsed(...props);
};

export const onEndFileScope: Adapter['onEndFileScope'] = (...props) => {
  return adapter.onEndFileScope(...props);
};

export const getIdentOption: Adapter['getIdentOption'] = (...props) => {
  // Backwards compatibility with old versions of the integration package
  if (!('getIdentOption' in adapter)) {
    return process.env.NODE_ENV === 'production' ? 'short' : 'debug';
  }

  return adapter.getIdentOption(...props);
};
