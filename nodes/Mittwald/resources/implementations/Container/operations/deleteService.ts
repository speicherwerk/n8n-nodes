import { containerResource } from '../resource';
import Z from 'zod';

export default containerResource
	.addOperation({
		name: 'Delete Service',
		action: 'Delete a service from a project',
		description:
			'Remove a service from a container project without replacing the rest of the project definition',
	})
	.withProperties({
		stackId: {
			displayName: 'Stack ID',
			description: 'The unique identifier of the stack',
			type: 'string',
			required: true,
			default: '',
		},
		serviceName: {
			displayName: 'Service Name',
			type: 'string',
			required: true,
			default: '',
			description: 'Name of the service to delete. Maximum 63 characters.',
		},
	})
	.withExecuteFn(async ({ properties, apiClient }) => {
		const { stackId, serviceName } = properties;

		return apiClient.request({
			path: `/stacks/${stackId}`,
			method: 'PATCH',
			requestSchema: Z.object({
				services: Z.record(Z.string().min(1).max(63), Z.object({})),
			}),
			body: {
				services: {
					[serviceName]: {},
				},
			},
		});
	});
