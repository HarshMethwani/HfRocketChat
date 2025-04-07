import { IConfigurationExtend, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { HfCommand } from './commands/HfCommand';

export class HuggingFaceApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }
    public async extendConfiguration(config: IConfigurationExtend): Promise<void> {
        await config.slashCommands.provideSlashCommand(new HfCommand());
    }
}