import { TwitterResolverContext } from "../resolvers";
import { TweetResolvers } from "../resolvers-types.generated";

export const tweetTwitterResolver: TweetResolvers<TwitterResolverContext> = {
    author(tweet, _, { dbUsersCache, dbTweetCache }) {
        const dbTweet = dbTweetCache[tweet.id]
        if (!dbTweet) {
            throw new Error("No tweet in the db")
        }
        const dbUser = dbUsersCache[dbTweet.userId]
        if (!dbUser) {
            throw new Error("No user in the db")
        }
        return dbUser
    },
    stats(tweet, _, { dbTweetToFavoriteCountMap }) {
        return {
            commentCount: 99,
            retweetCount: 1,
            favoriteCount: dbTweetToFavoriteCountMap[tweet.id] || 0
        }
    }
}