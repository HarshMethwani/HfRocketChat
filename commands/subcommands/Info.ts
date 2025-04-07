import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IRead, IModify, IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { TokenStore } from '../../helpers/TokenStore';
import { HfClient } from '../../helpers/HfClient';

export async function info(
    args: string[],
    ctx: SlashCommandContext,
    read: IRead,
    modify: IModify,
    http: IHttp,
): Promise<void> {
    const model = args[0];
    if (!model) {
        await send(modify, ctx, 'Usage: `/hf info <model>`');
        return;
    }

    const token = await new TokenStore(ctx.getSender()).get(read);
    if (!token) {
        await send(modify, ctx, 'Login first with `/hf login <token>`');
        return;
    }

    const client = new HfClient(http, token);
    const res = await client.getModelInfo(model);
    if (res.statusCode !== 200) {
        await send(modify, ctx, `❌ Could not fetch info for **${model}**`);
        return;
    }

    const d = res.data as any;
    const text = [
        `**${d.id || d.modelId}**`,
        `• 🏷️ Tags: ${d.tags?.slice(0, 6).join(', ') || 'none'}`,
        `• ❤️ Likes: ${d.likes ?? 0}`,
        `• 📥 Downloads: ${d.downloads ?? 0}`,
        `• 🕒 Last update: ${d.lastModified?.split('T')[0] || 'n/a'}`,
        `[Open on HF](https://huggingface.co/${d.id || d.modelId})`,
    ].join('\n');

    await send(modify, ctx, text);
}

async function send(mod: IModify, ctx: SlashCommandContext, text: string): Promise<void> {
    await mod.getCreator().finish(
        mod.getCreator().startMessage().setRoom(ctx.getRoom()).setSender(ctx.getSender()).setText(text),
    );
}
