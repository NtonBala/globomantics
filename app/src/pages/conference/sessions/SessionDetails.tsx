import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { SessionItem } from './SessionItem';

export const SESSION_BY_ID = gql`
  query sessionById($id: ID!) {
    sessionById(id: $id) {
      id
      title
      day
      room
      level
      speakers {
        id
        name
      }
    }
    user: me {
      id
      favorites {
        id
      }
    }
  }
`;

export function SessionDetails() {
  const { session_id } = useParams<{ session_id: string }>();
  const { loading, error, data } = useQuery(SESSION_BY_ID, {
    variables: { id: session_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const session = data.sessionById;

  if (!session) {
    return <div>No session found.</div>;
  }

  const favorites = data.user?.favorites ?? [];

  return (
    <SessionItem
      session={{
        ...session,
        favorite: favorites.map((favorite: any) => favorite.id).includes(session.id),
      }}
    />
  );
}
