import { containerResource } from '../resource';

export default containerResource
	.addOperation({
		name: 'Get Service Logs',
		action: 'Get logs of a service',
		description: 'Get log output from a service in a container project',
	})
	.withProperties({
		stackId: {
			displayName: 'Stack ID',
			description: 'The unique identifier of the stack',
			type: 'string',
			required: true,
			default: '',
		},
		serviceId: {
			displayName: 'Service ID',
			description: 'The unique identifier of the service',
			type: 'string',
			required: true,
			default: '',
		},
		tail: {
			displayName: 'Tail',
			type: 'number',
			required: false,
			default: 0,
			description: 'Number of lines from the end of the logs to return (0 = all)',
		},
	})
	.withExecuteFn(async ({ properties, apiClient }) => {
		const { stackId, serviceId, tail } = properties;

		return apiClient.request<string>({
			path: `/stacks/${stackId}/services/${serviceId}/logs`,
			method: 'GET',
			qs: tail > 0 ? { tail } : undefined,
			returnFullResponse: true,
		});
	});
