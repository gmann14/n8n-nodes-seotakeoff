"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seotakeoffApiRequest = seotakeoffApiRequest;
exports.seotakeoffApiRequestAllItems = seotakeoffApiRequestAllItems;
async function seotakeoffApiRequest(method, endpoint, body = {}, query = {}) {
    const options = {
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
    return await this.helpers.httpRequestWithAuthentication.call(this, 'seotakeoffApi', options);
}
async function seotakeoffApiRequestAllItems(method, endpoint, body = {}, query = {}) {
    const returnData = [];
    let responseData;
    let page = 1;
    const limit = 100;
    do {
        responseData = await seotakeoffApiRequest.call(this, method, endpoint, body, { ...query, page, limit });
        if (Array.isArray(responseData)) {
            returnData.push(...responseData);
        }
        else if (responseData.items) {
            returnData.push(...responseData.items);
        }
        else {
            break;
        }
        page++;
    } while (responseData.length === limit);
    return returnData;
}
