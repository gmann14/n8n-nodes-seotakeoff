import { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions, IHttpRequestMethods, IPollFunctions, IDataObject } from 'n8n-workflow';
export declare function seotakeoffApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, query?: IDataObject): Promise<any>;
export declare function seotakeoffApiRequestAllItems(this: IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, query?: IDataObject): Promise<any[]>;
