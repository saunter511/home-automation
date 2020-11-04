import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const csrfLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			'X-CSRFToken': csrf_token,
		},
	};
});

const httpLink = createHttpLink({
	uri: '/graphql/',
	credentials: 'same-origin',
});

const secure = document.location.protocol == 'https';

const wsLink = new WebSocketLink({
	uri: `${secure ? 'wss' : 'ws'}://${document.location.host}/graphql/`,
	options: {
		reconnect: true,
	},
});

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: csrfLink.concat(link),
});

export default client;
