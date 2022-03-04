// Apollo

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { getAuthToken } from 'shared/contexts/AuthContext';
import { HttpLink } from 'apollo-link-http';
import BaseUrlConstants from "../constants/BaseUrlConstants";
import { ApolloLink, from } from 'apollo-link';

let AUTH_TOKEN: string | null = null;

const cache: any = new InMemoryCache();

const httpLink = new HttpLink({
    uri: BaseUrlConstants.BASE_URL + 'graphql/',
});

// @ts-ignore
const uploadLink = new createUploadLink({
    uri: BaseUrlConstants.BASE_URL + 'graphql/',
});

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
            headers: {
                "X-Auth-Token": getAuthToken() ? getAuthToken().value : null,
            }
        });

    return forward(operation);
});

const loggOutAfterware = onError(({ graphQLErrors }) => {
    if (! graphQLErrors) {
        return;
    }
    const error = graphQLErrors.filter((pError: any) => pError.unauthenticated)[0];

    if (error) {
        //AuthContext.logout();
    }
});

const client = new ApolloClient({
    link: from([loggOutAfterware, authLink, /*uploadLink, */ httpLink]),
    cache
});

function updateAuthToken(authToken: any) {
    AUTH_TOKEN = authToken;
}
//AuthContext.addListener(updateAuthToken);

export { client, updateAuthToken };
