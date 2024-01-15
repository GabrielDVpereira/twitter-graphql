import { trendTransform, tweetTransform } from "../transforms"
import { TwitterResolverContext } from "../resolvers"
import { QueryResolvers } from "../resolvers-types.generated"

export const queryTwitterResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [currUser] = db.getAllUsers()
    if (!currUser) {
      throw new Error("No user found")
    }
    return currUser
  },
  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions()
  },
  tweets: (_, __, { db, dbTweetCache, dbTweetToFavoriteCountMap, dbUsersCache }) => {
    db.getAllUsers().forEach((user) => {
      dbUsersCache[user.id] = user
    })

    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1
    });

    return db.getAllTweets().map(t => {
      dbTweetCache[t.id] = t
      return tweetTransform(t)
    })
  },
  trends: (_, __, { db }) => {
    return db.getAllTrends().map(trendTransform)
  }
}