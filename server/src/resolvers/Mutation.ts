/* eslint-disable node/no-unsupported-features/es-syntax */
import { favoriteTransform, tweetTransform } from "../transforms";
import { TwitterResolverContext } from "../resolvers";
import { MutationResolvers } from "../resolvers-types.generated";


export const mutationTweetResolver: MutationResolvers<TwitterResolverContext> = {
    async createTweet(_parent, args, { dbTweetCache, db }) {
        const { body, userId } = args
        const dbTweet = await db.createTweet({
            message: body,
            userId
        })
        const dbTweetMap = (dbTweetCache ||= {})
        dbTweetMap[dbTweet.id] = dbTweet

        const dbAuhtor = db.getUserById(userId)
        if (!dbAuhtor) {
            throw new Error("No author found.")
        }
        return { ...tweetTransform(dbTweet), author: dbAuhtor }
    },
    async createFavorite(_parent, args, { db }) {
        const { favorite } = args
        const fav = await db.createFavorite(favorite)
        return {
            ...favoriteTransform(fav),
            user: db.getUserById(fav.userId),
            tweet: tweetTransform(db.getTweetById(fav.tweetId))
        }
    },
    async deleteFavorite(_parent, args, { db }) {
        const { favorite } = args
        const fav = await db.deleteFavorite(favorite)
        return {
            ...favoriteTransform(fav),
            user: db.getUserById(fav.userId),
            tweet: tweetTransform(db.getTweetById(fav.tweetId))
        }
    }
}