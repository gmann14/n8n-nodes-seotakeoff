import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class Seotakeoff implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getWebsites(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getClusters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
