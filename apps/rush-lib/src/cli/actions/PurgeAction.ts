// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as colors from 'colors';
import * as os from 'os';

import { CommandLineFlagParameter } from '@microsoft/ts-command-line';

import { BaseRushAction } from './BaseRushAction';
import { Event } from '../../data/EventHooks';
import { RushCommandLineParser } from './RushCommandLineParser';
import { Stopwatch } from '../../utilities/Stopwatch';
import { PurgeManager } from '../logic/PurgeManager';

export class PurgeAction extends BaseRushAction {
  private _unsafeParameter: CommandLineFlagParameter;

  constructor(parser: RushCommandLineParser) {
    super({
      actionName: 'purge',
      summary: 'For diagnostic purposes, use this command to delete caches and other temporary files used by Rush',
      documentation: 'The "rush purge" command is used to delete temporary files created by Rush.',
      parser
    });
  }

  protected onDefineParameters(): void {
    this._unsafeParameter = this.defineFlagParameter({
      parameterLongName: '--unsafe',
      description: '(UNSAFE!) Also delete shared files such as the package manager instances stored in'
        + ' the ".rush" folder in the user\'s home directory.  This is a more aggressive fix that is'
        + ' NOT SAFE to run in a live environment because it will cause other concurrent Rush processes to fail.'
    });
  }

  protected run(): Promise<void> {
    return Promise.resolve().then(() => {
      const stopwatch: Stopwatch = Stopwatch.start();

      this.eventHooksManager.handle(Event.preRushInstall);

      const purgeManager: PurgeManager = new PurgeManager(this.rushConfiguration);

      if (this._unsafeParameter.value!) {
        purgeManager.purgeUnsafe();
      } else {
        purgeManager.purgeNormal();
      }

      purgeManager.deleteAll();

      console.log(os.EOL + colors.green(`Rush purge started successfully and will complete asynchronously.`
        + ` (${stopwatch.toString()})`));
    });
  }

}
