"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeotakeoffTrigger = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class SeotakeoffTrigger {
    constructor() {
        this.description = {
            displayName: 'SEOTakeoff Trigger',
            name: 'seotakeoffTrigger',
            icon: 'file:seotakeoff.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{$parameter["event"]}}',
            description: 'Starts workflow when SEOTakeoff events occur',
            defaults: {
                name: 'SEOTakeoff Trigger',
            },
            inputs: [],
            outputs: ['main'],
            credentials: [
                {
                    name: 'seotakeoffApi',
                    required: true,
                },
            ],
            polling: true,
            properties: [
                {
                    displayName: 'Event',
                    name: 'event',
                    type: 'options',
                    options: [
                        {
                            name: 'Article Ready',
                            value: 'articleReady',
                            description: 'Triggers when an article finishes generating and is ready for review',
                        },
                        {
                            name: 'Article Published',
                            value: 'articlePublished',
                            description: 'Triggers when an article is published to your CMS',
                        },
                        {
                            name: 'Article Failed',
                            value: 'articleFailed',
                            description: 'Triggers when article generation fails',
                        },
                        {
                            name: 'New Cluster',
                            value: 'newCluster',
                            description: 'Triggers when a new topic cluster is created',
                        },
                    ],
                    default: 'articleReady',
                    required: true,
                },
            ],
        };
    }
    async poll() {
        const event = this.getNodeParameter('event');
        const webhookData = this.getWorkflowStaticData('node');
        const now = new Date().toISOString();
        let items = [];
        let endpoint;
        // Map event to appropriate endpoint
        switch (event) {
            case 'articleReady':
                endpoint = '/articles/ready';
                break;
            case 'articlePublished':
                endpoint = '/articles/published';
                break;
            case 'articleFailed':
                endpoint = '/articles/failed';
                break;
            case 'newCluster':
                endpoint = '/clusters';
                break;
            default:
                endpoint = '/articles/ready';
        }
        const response = await GenericFunctions_1.seotakeoffApiRequest.call(this, 'GET', endpoint);
        // Filter to items since last poll
        const lastPollTime = webhookData.lastPollTime;
        if (lastPollTime) {
            items = response.filter((item) => new Date(item.created_at) > new Date(lastPollTime));
        }
        else {
            // First run - get most recent item only to avoid flooding
            items = response.slice(0, 1);
        }
        webhookData.lastPollTime = now;
        if (items.length === 0) {
            return null;
        }
        return [items.map((item) => ({ json: item }))];
    }
}
exports.SeotakeoffTrigger = SeotakeoffTrigger;
