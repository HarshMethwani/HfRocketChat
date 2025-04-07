import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IRead, IModify, IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { TokenStore } from '../../helpers/TokenStore';
import { HfClient } from '../../helpers/HfClient';

export async function list(args: string[], ctx: SlashCommandContext, read: IRead, modify: IModify, http: IHttp) {
    const isPrivate = args.includes('--private');
    const token = await new TokenStore(ctx.getSender()).get(read);
    if (!token) { return send(modify, ctx, 'Login first with `/hf login <token>`'); }

    const hf = new HfClient(http, token);
    const res = await hf.listModels(isPrivate);
    if (res.statusCode !== 200 || !Array.isArray(res.data)) {
        return send(modify, ctx, '❌ Failed to fetch models.');
    }

    const models = res.data.map((m: any, i: number) => `${i + 1}. ${m.id} (❤️ ${m.likes ?? 0})`).join('\n');
    return send(modify, ctx, `📦 Models:\n${models}`);
}

function send(modify: IModify, ctx: SlashCommandContext, text: string) {
    return modify.getCreator().finish(
        modify.getCreator().startMessage().setRoom(ctx.getRoom()).setSender(ctx.getSender()).setText(text),
    );
}
