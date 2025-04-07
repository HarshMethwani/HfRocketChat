import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IRead, IModify, IHttp, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { login } from './subcommands/Login';
import { logout } from './subcommands/Logout';
import { list } from './subcommands/List';
import { info } from './subcommands/Info';
import { cardchat } from './subcommands/CardChat';
export class HfCommand implements ISlashCommand {
    public command = 'hf';
    public i18nDescription = 'Hugging Face helper command';
    public i18nParamsExample = 'login|logout|list|info|cardchat';
    public providesPreview = false;

    public async executor(
        ctx: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<void> {

        const [sub, ...args] = ctx.getArguments();

        switch (sub) {
            case 'login':     await login(args, ctx, modify, persis); break;
            case 'logout':    await logout(ctx, modify, persis); break;
            case 'list':      await list(args, ctx, read, modify, http); break;
            case 'info':      await info(args, ctx, read, modify, http); break;
            case 'cardchat':  await cardchat(args, ctx, read, modify, http); break;
            default:
                await modify.getCreator().finish(
                    modify.getCreator().startMessage()
                        .setRoom(ctx.getRoom())
                        .setSender(ctx.getSender())
                        .setText('Usage: `/hf login <token>` | `/hf logout` | `/hf list [--private]` | `/hf info <model>` | `/hf cardchat <model>`'),
                );
        }
    }
}
