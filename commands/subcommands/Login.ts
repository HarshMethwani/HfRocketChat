import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IModify, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { TokenStore } from '../../helpers/TokenStore';

export async function login(args: string[], ctx: SlashCommandContext, modify: IModify, persis: IPersistence) {
    const token = args[0];
    if (!token) {
        return send(modify, ctx, 'Usage: `/hf login <token>`');
    }
    await new TokenStore(ctx.getSender()).save(token, persis);
    return send(modify, ctx, '✅ Token saved!');
}

function send(modify: IModify, ctx: SlashCommandContext, text: string) {
    return modify.getCreator().finish(
        modify.getCreator().startMessage().setRoom(ctx.getRoom()).setSender(ctx.getSender()).setText(text),
    );
}