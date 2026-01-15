import { Seotakeoff } from '../nodes/Seotakeoff/Seotakeoff.node';

describe('Seotakeoff Node', () => {
  let node: Seotakeoff;

  beforeEach(() => {
    node = new Seotakeoff();
  });

  describe('Node Metadata', () => {
    test('has correct name', () => {
      expect(node.description.name).toBe('seotakeoff');
    });

    test('has correct display name', () => {
      expect(node.description.displayName).toBe('SEOTakeoff');
    });

    test('has correct description', () => {
      expect(node.description.description).toBe('AI-powered SEO content generation');
    });

    test('has correct icon', () => {
      expect(node.description.icon).toBe('file:seotakeoff.svg');
    });

    test('is in transform group', () => {
      expect(node.description.group).toContain('transform');
    });

    test('has version 1', () => {
      expect(node.description.version).toBe(1);
    });
  });

  describe('Credentials', () => {
    test('requires seotakeoffApi credentials', () => {
      const creds = node.description.credentials;
      expect(creds).toContainEqual(
        expect.objectContaining({ name: 'seotakeoffApi', required: true })
      );
    });
  });

  describe('Resources', () => {
    test('has article resource', () => {
      const resourceProp = node.description.properties.find(p => p.name === 'resource');
      const options = resourceProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'article' }));
    });

    test('has cluster resource', () => {
      const resourceProp = node.description.properties.find(p => p.name === 'resource');
      const options = resourceProp?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'cluster' }));
    });

    test('default resource is article', () => {
      const resourceProp = node.description.properties.find(p => p.name === 'resource');
      expect(resourceProp?.default).toBe('article');
    });
  });

  describe('Article Operations', () => {
    test('has generate operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const articleOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('article')
      );
      const options = articleOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'generate' }));
    });

    test('has get operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const articleOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('article')
      );
      const options = articleOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'get' }));
    });

    test('has getAll operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const articleOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('article')
      );
      const options = articleOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'getAll' }));
    });

    test('has search operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const articleOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('article')
      );
      const options = articleOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'search' }));
    });
  });

  describe('Cluster Operations', () => {
    test('has create operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const clusterOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('cluster')
      );
      const options = clusterOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'create' }));
    });

    test('has getAll operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const clusterOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('cluster')
      );
      const options = clusterOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'getAll' }));
    });

    test('has search operation', () => {
      const operationProps = node.description.properties.filter(p => p.name === 'operation');
      const clusterOps = operationProps.find(p =>
        p.displayOptions?.show?.resource?.includes('cluster')
      );
      const options = clusterOps?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ value: 'search' }));
    });
  });

  describe('Generate Options', () => {
    test('has title option', () => {
      const additionalOptions = node.description.properties.find(p => p.name === 'additionalOptions');
      const options = additionalOptions?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ name: 'title' }));
    });

    test('has include_images option', () => {
      const additionalOptions = node.description.properties.find(p => p.name === 'additionalOptions');
      const options = additionalOptions?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ name: 'include_images' }));
    });

    test('has include_faq option', () => {
      const additionalOptions = node.description.properties.find(p => p.name === 'additionalOptions');
      const options = additionalOptions?.options as any[];
      expect(options).toContainEqual(expect.objectContaining({ name: 'include_faq' }));
    });
  });

  describe('Generate Fields', () => {
    test('has websiteId field for generate', () => {
      const websiteField = node.description.properties.find(p => p.name === 'websiteId');
      expect(websiteField).toBeDefined();
      expect(websiteField?.required).toBe(true);
    });

    test('has keyword field for generate', () => {
      const keywordField = node.description.properties.find(p => p.name === 'keyword');
      expect(keywordField).toBeDefined();
      expect(keywordField?.required).toBe(true);
    });
  });

  describe('Load Options', () => {
    test('has getWebsites load option', () => {
      expect(node.methods.loadOptions.getWebsites).toBeDefined();
    });

    test('has getClusters load option', () => {
      expect(node.methods.loadOptions.getClusters).toBeDefined();
    });
  });

  describe('Execute Method', () => {
    test('has execute method', () => {
      expect(node.execute).toBeDefined();
      expect(typeof node.execute).toBe('function');
    });
  });
});
