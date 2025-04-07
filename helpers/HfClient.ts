import { IHttp, IHttpResponse } from '@rocket.chat/apps-engine/definition/accessors';

export class HfClient {
    constructor(private http: IHttp, private token: string) {}

    listModels(isPrivate = false): Promise<IHttpResponse> {
        const url = isPrivate
            ? 'https://huggingface.co/api/models?private=true&full=true&limit=5'
            : 'https://huggingface.co/api/models?sort=downloads&limit=5';
        return this.http.get(url, { headers: { Authorization: `Bearer ${this.token}` } });
    }

    getModelInfo(model: string): Promise<IHttpResponse> {
        const url = `https://huggingface.co/api/models/${encodeURIComponent(model)}`;
        return this.http.get(url, { headers: { Authorization: `Bearer ${this.token}` } });
    }

    async cardChat(model: string): Promise<string> {
        const prompt = `You are an assistant. Briefly explain what the model "${model}" can be used for.`;
        const res = await this.http.post(`https://api-inference.huggingface.co/models/${model}`, {
            headers: { Authorization: `Bearer ${this.token}` },
            data: { inputs: prompt, options: { wait_for_model: true } },
        });
        if (!res || res.statusCode !== 200) { return 'Model is loading or unavailable.'; }
        // Response is array of generated text
        return res.data[0]?.generated_text ?? 'No response.';
    }
    
}
