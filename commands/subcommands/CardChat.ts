import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IRead, IModify, IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { TokenStore } from '../../helpers/TokenStore';
import { HfClient } from '../../helpers/HfClient';

export async function cardchat(
    args: string[],
    ctx: SlashCommandContext,
    read: IRead,
    modify: IModify,
    http: IHttp,
): Promise<void> {
    const model = args[0];
    if (!model) {
        await send(modify, ctx, 'Usage: `/hf cardchat <model>`');
        return;
    }

    const token = await new TokenStore(ctx.getSender()).get(read);
    if (!token) {
        await send(modify, ctx, 'Login first with `/hf login <token>`');
        return;
    }

    const reply = await new HfClient(http, token).cardChat(model);
    await send(modify, ctx, `💬 **Card Chat**\n${reply}`);
}

async function send(mod: IModify, ctx: SlashCommandContext, text: string): Promise<void> {
    await mod.getCreator().finish(
        mod.getCreator().startMessage().setRoom(ctx.getRoom()).setSender(ctx.getSender()).setText(text),
    );
}
