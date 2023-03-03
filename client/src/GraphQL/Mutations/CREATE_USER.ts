import { gql } from '@apollo/client';

//essentially a graphql query that is formatted properly
export const CREATE_USER_MUTATION = gql`
mutation createUser($name: String! $email: String! $password: String) {
        createUser(
            name: $name
            email: $email
            password: $password
            ) {
                name,
                email
            }
    }
`;