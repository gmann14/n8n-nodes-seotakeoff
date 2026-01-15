import { SeotakeoffApi } from '../credentials/SeotakeoffApi.credentials';

describe('SeotakeoffApi Credentials', () => {
  let credentials: SeotakeoffApi;

  beforeEach(() => {
    credentials = new SeotakeoffApi();
  });

  test('has correct name', () => {
    expect(credentials.name).toBe('seotakeoffApi');
  });

  test('has correct display name', () => {
    expect(credentials.displayName).toBe('SEOTakeoff API');
  });

  test('has documentation URL', () => {
    expect(credentials.documentationUrl).toBe('https://docs.seotakeoff.com/integrations/n8n');
  });

  test('has apiKey property', () => {
    const apiKeyProp = credentials.properties.find(p => p.name === 'apiKey');
    expect(apiKeyProp).toBeDefined();
    expect(apiKeyProp?.type).toBe('string');
    expect(apiKeyProp?.typeOptions?.password).toBe(true);
  });

  test('apiKey property is required', () => {
    const apiKeyProp = credentials.properties.find(p => p.name === 'apiKey');
    expect(apiKeyProp?.required).toBe(true);
  });

  test('has correct authentication type', () => {
    expect(credentials.authenticate.type).toBe('generic');
  });

  test('sets X-API-Key header', () => {
    const headers = credentials.authenticate.properties.headers as Record<string, string>;
    expect(headers['X-API-Key']).toBe('={{$credentials.apiKey}}');
  });

  test('has test request configured', () => {
    expect(credentials.test.request.url).toBe('/api/v1/zapier/website');
  });

  test('test request uses correct base URL', () => {
    expect(credentials.test.request.baseURL).toBe('https://api.seotakeoff.com');
  });
});
