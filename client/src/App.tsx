import { isDefined } from '@full-stack-ts/shared';
import * as React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';
import { gql } from '@apollo/client';
import { useGetCurrentUserQuery } from './generated/graphql';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      handle
      avatarUrl
      createdAt
      stats {
        followingCount
        followerCount
        tweetCount
      }
      favorite {
        tweet {
          id
        }
      }
    }
    suggestions {
      name
      handle
      avatarUrl
      reason
    }
    trends {
      ... on TopicTrend {
        tweetCount
        topic
        quote {
          title
          imageUrl
          description
        }
      }

      ... on HashtagTrend {
        tweetCount
        hashtag
      }
    }
  }
`;

const TRENDS = [
  {
    topic: 'Frontend Masters',
    tweetCount: 12345,
    title: 'Frontend Masters',
    description: 'Launch of new full stack TS course',
    imageUrl: 'http://localhost:3000/static/fem_logo.png',
  },
];

const App: React.FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery();

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!data) return <p>No Data.</p>;

  const { favorite: rawFavorites } = data.currentUser;

  const favorites = (rawFavorites || [])
    .map((f) => f.tweet?.id)
    .filter(isDefined);

  const { suggestions = [], currentUser } = data;

  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline
          currentUserId={currentUser.id}
          currentUserFavorites={favorites}
        />
        <RightBar trends={TRENDS} suggestions={suggestions} />
      </div>
    </div>
  );
};
export default App;
