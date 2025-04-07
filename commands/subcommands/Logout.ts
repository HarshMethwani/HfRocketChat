import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IModify, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { TokenStore } from '../../helpers/TokenStore';

export async function logout(ctx: SlashCommandContext, modify: IModify, persis: IPersistence) {
    await new TokenStore(ctx.getSender()).delete(persis);
    return modify.getCreator().finish(
        modify.getCreator().startMessage().setRoom(ctx.getRoom()).setSender(ctx.getSender()).setText('🚪 Logged out from Hugging Face.'),
    );
}