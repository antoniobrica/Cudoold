import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
  numParts?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  allSets?: Maybe<Array<Maybe<Set>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSet?: Maybe<Set>;
};


export type MutationAddSetArgs = {
  name?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  numParts?: Maybe<Scalars['Int']>;
};

export type SetListQueryVariables = Exact<{ [key: string]: never; }>;


export type SetListQuery = (
  { __typename?: 'Query' }
  & { allSets?: Maybe<Array<Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name' | 'numParts' | 'year'>
  )>>> }
);

export type AddSetMutationVariables = Exact<{
  name: Scalars['String'];
  year: Scalars['String'];
  numParts: Scalars['Int'];
}>;


export type AddSetMutation = (
  { __typename?: 'Mutation' }
  & { addSet?: Maybe<(
    { __typename?: 'Set' }
    & Pick<Set, 'id' | 'name' | 'numParts' | 'year'>
  )> }
);


export const SetListDocument = gql`
    query setList {
  allSets {
    id
    name
    numParts
    year
  }
}
    `;

/**
 * __useSetListQuery__
 *
 * To run a query within a React component, call `useSetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetListQuery(baseOptions?: Apollo.QueryHookOptions<SetListQuery, SetListQueryVariables>) {
        return Apollo.useQuery<SetListQuery, SetListQueryVariables>(SetListDocument, baseOptions);
      }
export function useSetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SetListQuery, SetListQueryVariables>) {
          return Apollo.useLazyQuery<SetListQuery, SetListQueryVariables>(SetListDocument, baseOptions);
        }
export type SetListQueryHookResult = ReturnType<typeof useSetListQuery>;
export type SetListLazyQueryHookResult = ReturnType<typeof useSetListLazyQuery>;
export type SetListQueryResult = Apollo.QueryResult<SetListQuery, SetListQueryVariables>;
export const AddSetDocument = gql`
    mutation addSet($name: String!, $year: String!, $numParts: Int!) {
  addSet(name: $name, year: $year, numParts: $numParts) {
    id
    name
    numParts
    year
  }
}
    `;
export type AddSetMutationFn = Apollo.MutationFunction<AddSetMutation, AddSetMutationVariables>;

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      year: // value for 'year'
 *      numParts: // value for 'numParts'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: Apollo.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        return Apollo.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, baseOptions);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = Apollo.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = Apollo.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;