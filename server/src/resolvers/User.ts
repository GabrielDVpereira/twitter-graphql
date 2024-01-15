/* eslint-disable node/no-unsupported-features/es-syntax */
import { favoriteTransform, tweetTransform } from "../transforms";
import { TwitterResolverContext } from "../resolvers";
import { UserResolvers } from "../resolvers-types.generated";

export const userTwitterResolver: UserResolvers<TwitterResolverContext> = {
    stats: (user, _, { db }) => {
        return {
            followerCount: 123,
            followingCount: 123,
            tweetCount: db.getUserTweets(user.id).length
        }
    },
    favorite: (user, _, { db }) => {
        const faves = db.getUserFavorites(user.id);
        return faves.map((f) => {
            return {
                ...favoriteTransform(f),
                user,
                tweet: tweetTransform(db.getTweetById(f.tweetId))
            }
        })
    }
}