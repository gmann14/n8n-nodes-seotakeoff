"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeotakeoffApi = void 0;
class SeotakeoffApi {
    constructor() {
        this.name = 'seotakeoffApi';
        this.displayName = 'SEOTakeoff API';
        this.documentationUrl = 'https://docs.seotakeoff.com/integrations/n8n';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your SEOTakeoff API key. Find it at Settings -> API Keys in your dashboard.',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.seotakeoff.com',
                url: '/api/zapier/websites',
            },
        };
    }
}
exports.SeotakeoffApi = SeotakeoffApi;
