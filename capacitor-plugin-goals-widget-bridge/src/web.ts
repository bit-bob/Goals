import { WebPlugin } from '@capacitor/core';

import type { GoalsWidgetBridgePlugin } from './definitions';

export class GoalsWidgetBridgeWeb
  extends WebPlugin
  implements GoalsWidgetBridgePlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
