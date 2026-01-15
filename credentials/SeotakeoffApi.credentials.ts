import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SeotakeoffApi implements ICredentialType {
  name = 'seotakeoffApi';
  displayName = 'SEOTakeoff API';
  documentationUrl = 'https://docs.seotakeoff.com/integrations/n8n';

  properties: INodeProperties[] = [
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-API-Key': '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.seotakeoff.com',
      url: '/api/zapier/websites',
    },
  };
}
