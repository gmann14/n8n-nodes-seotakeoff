import {
  IExecuteFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  IPollFunctions,
  IDataObject,
} from 'n8n-workflow';

export async function seotakeoffApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<any> {
  const options: IHttpRequestOptions = {
    method,
    url: `https://api.seotakeoff.com/api/zapier${endpoint}`,
    json: true,
  };

  if (Object.keys(body).length > 0) {
    options.body = body;
  }

  if (Object.keys(query).length > 0) {
    options.qs = query;
  }

  return await this.helpers.httpRequestWithAuthentication.call(
    this,
    'seotakeoffApi',
    options,
  );
}

export async function seotakeoffApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<any[]> {
  const returnData: any[] = [];
  let responseData;
  let page = 1;
  const limit = 100;

  do {
    responseData = await seotakeoffApiRequest.call(
      this,
      method,
      endpoint,
      body,
      { ...query, page, limit },
    );

    if (Array.isArray(responseData)) {
      returnData.push(...responseData);
    } else if (responseData.items) {
      returnData.push(...responseData.items);
    } else {
      break;
    }

    page++;
  } while (responseData.length === limit);

  return returnData;
}
