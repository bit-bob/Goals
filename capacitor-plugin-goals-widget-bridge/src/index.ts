import { registerPlugin } from '@capacitor/core';

import type { GoalsWidgetBridgePlugin } from './definitions';

const GoalsWidgetBridge = registerPlugin<GoalsWidgetBridgePlugin>(
  'GoalsWidgetBridge',
  {
    web: () => import('./web').then(m => new m.GoalsWidgetBridgeWeb()),
  },
);

export * from './definitions';
export { GoalsWidgetBridge };
