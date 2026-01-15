import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  IDataObject,
} from 'n8n-workflow';

import { seotakeoffApiRequest } from './GenericFunctions';

export class Seotakeoff implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SEOTakeoff',
    name: 'seotakeoff',
    icon: 'file:seotakeoff.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'AI-powered SEO content generation',
    defaults: {
      name: 'SEOTakeoff',
    },
    inputs: ['main'],
    outputs: ['main'],
    usableAsTool: true,
    credentials: [
      {
        name: 'seotakeoffApi',
        required: true,
      },
    ],
    properties: [
      // Resource Selection
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Article',
            value: 'article',
          },
          {
            name: 'Cluster',
            value: 'cluster',
          },
        ],
        default: 'article',
      },

      // ===== ARTICLE OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['article'],
          },
        },
        options: [
          {
            name: 'Generate',
            value: 'generate',
            description: 'Generate a new article from a keyword',
            action: 'Generate an article',
          },
          {
            name: 'Get',
            value: 'get',
            description: 'Get an article by ID',
            action: 'Get an article',
          },
          {
            name: 'Get Many',
            value: 'getAll',
            description: 'Get multiple articles',
            action: 'Get many articles',
          },
          {
            name: 'Search',
            value: 'search',
            description: 'Search for articles by title or keyword',
            action: 'Search articles',
          },
        ],
        default: 'generate',
      },

      // Article: Generate
      {
        displayName: 'Website Name or ID',
        name: 'websiteId',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getWebsites',
        },
        required: true,
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['generate'],
          },
        },
        default: '',
        description: 'The website to create the article for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
      },
      {
        displayName: 'Keyword',
        name: 'keyword',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['generate'],
          },
        },
        default: '',
        placeholder: 'e.g., how to make cold brew coffee',
        description: 'The keyword to target for this article. Be specific for best SEO results.',
      },
      {
        displayName: 'Additional Options',
        name: 'additionalOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['generate'],
          },
        },
        options: [
          {
            displayName: 'Custom Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'Custom article title. If blank, SEOTakeoff generates an SEO-optimized title.',
          },
          {
            displayName: 'Include Images',
            name: 'include_images',
            type: 'boolean',
            default: true,
            description: 'Whether to generate AI images for the article',
          },
          {
            displayName: 'Include FAQ',
            name: 'include_faq',
            type: 'boolean',
            default: true,
            description: 'Whether to include a FAQ section in the article',
          },
        ],
      },

      // Article: Get
      {
        displayName: 'Article ID',
        name: 'articleId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['get'],
          },
        },
        default: '',
        description: 'The ID of the article to retrieve',
      },

      // Article: Get All
      {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['getAll'],
          },
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['getAll'],
            returnAll: [false],
          },
        },
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
      },

      // Article: Search
      {
        displayName: 'Search Query',
        name: 'searchQuery',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['article'],
            operation: ['search'],
          },
        },
        default: '',
        description: 'Search term to find articles by title or keyword',
      },

      // ===== CLUSTER OPERATIONS =====
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['cluster'],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Create a new topic cluster',
            action: 'Create a cluster',
          },
          {
            name: 'Get Many',
            value: 'getAll',
            description: 'Get all topic clusters',
            action: 'Get many clusters',
          },
          {
            name: 'Search',
            value: 'search',
            description: 'Search for clusters by name',
            action: 'Search clusters',
          },
        ],
        default: 'getAll',
      },

      // Cluster: Create
      {
        displayName: 'Cluster Name',
        name: 'clusterName',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['cluster'],
            operation: ['create'],
          },
        },
        default: '',
        placeholder: 'e.g., Coffee Brewing Guide',
        description: 'Name for the new topic cluster',
      },
      {
        displayName: 'Seed Keywords',
        name: 'seedKeywords',
        type: 'string',
        displayOptions: {
          show: {
            resource: ['cluster'],
            operation: ['create'],
          },
        },
        default: '',
        placeholder: 'e.g., cold brew, pour over, french press',
        description: 'Comma-separated list of initial keywords for the cluster',
      },

      // Cluster: Search
      {
        displayName: 'Search Query',
        name: 'clusterSearchQuery',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            resource: ['cluster'],
            operation: ['search'],
          },
        },
        default: '',
        description: 'Search term to find clusters by name',
      },
    ],
  };

  methods = {
    loadOptions: {
      async getWebsites(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const websites = await seotakeoffApiRequest.call(this, 'GET', '/websites');
        return websites.map((website: any) => ({
          name: website.name,
          value: website.id,
        }));
      },

      async getClusters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const clusters = await seotakeoffApiRequest.call(this, 'GET', '/clusters');
        return clusters.map((cluster: any) => ({
          name: cluster.name,
          value: cluster.id,
        }));
      },
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData;

        if (resource === 'article') {
          if (operation === 'generate') {
            const websiteId = this.getNodeParameter('websiteId', i) as string;
            const keyword = this.getNodeParameter('keyword', i) as string;
            const additionalOptions = this.getNodeParameter('additionalOptions', i) as IDataObject;

            const body: IDataObject = {
              website_id: websiteId,
              keyword: keyword,
              ...additionalOptions,
            };

            responseData = await seotakeoffApiRequest.call(this, 'POST', '/articles/generate', body);
          }

          if (operation === 'get') {
            const articleId = this.getNodeParameter('articleId', i) as string;
            responseData = await seotakeoffApiRequest.call(this, 'GET', `/articles/${articleId}`);
          }

          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;

            if (returnAll) {
              responseData = await seotakeoffApiRequest.call(this, 'GET', '/articles');
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              responseData = await seotakeoffApiRequest.call(
                this,
                'GET',
                '/articles',
                {},
                { limit },
              );
            }
          }

          if (operation === 'search') {
            const query = this.getNodeParameter('searchQuery', i) as string;
            responseData = await seotakeoffApiRequest.call(
              this,
              'GET',
              '/articles/search',
              {},
              { query },
            );
          }
        }

        if (resource === 'cluster') {
          if (operation === 'create') {
            const name = this.getNodeParameter('clusterName', i) as string;
            const seedKeywordsRaw = this.getNodeParameter('seedKeywords', i) as string;

            const seedKeywords = seedKeywordsRaw
              ? seedKeywordsRaw.split(',').map(k => k.trim()).filter(k => k)
              : [];

            const body: IDataObject = {
              name,
              seed_keywords: seedKeywords,
            };

            responseData = await seotakeoffApiRequest.call(this, 'POST', '/clusters/create', body);
          }

          if (operation === 'getAll') {
            responseData = await seotakeoffApiRequest.call(this, 'GET', '/clusters');
          }

          if (operation === 'search') {
            const query = this.getNodeParameter('clusterSearchQuery', i) as string;
            responseData = await seotakeoffApiRequest.call(
              this,
              'GET',
              '/clusters/search',
              {},
              { query },
            );
          }
        }

        // Handle array responses
        if (Array.isArray(responseData)) {
          returnData.push(...responseData.map((item) => ({ json: item })));
        } else if (responseData) {
          returnData.push({ json: responseData });
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
