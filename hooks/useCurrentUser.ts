import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

type ReturnType = {
    currentUser: any;
    loading: boolean;
    error: any;
};

const GET_CURRENT_USER = gql`
    {
        currentUser {
            id
            firstName
            lastName
            email
            roles
            company {
                id
                name
            }
            phoneNumber
        }
    }
`;

const useCurrentUser: () => ReturnType = () => {
    const { data, loading, error } = useQuery(GET_CURRENT_USER);
    let currentUser = null;
    if (!loading && !error) {
        currentUser = data.currentUser;
    }
    return {
        currentUser,
        loading,
        error,
    };
};
export default useCurrentUser;
