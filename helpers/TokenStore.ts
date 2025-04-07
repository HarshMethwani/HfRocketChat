import { IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export class TokenStore {
    private assoc: RocketChatAssociationRecord;

    constructor(private user: IUser) {
        this.assoc = new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id);
    }

    public async save(token: string, persis: IPersistence) {
        await persis.updateByAssociation(this.assoc, { token }, true);
    }

    public async delete(persis: IPersistence) {
        await persis.removeByAssociation(this.assoc);
    }

    public async get(read: IRead): Promise<string | undefined> {
        const data = await read.getPersistenceReader().readByAssociation(this.assoc);
        return (data[0] as any)?.token;
    }
}
