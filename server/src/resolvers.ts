import { Resolvers } from "./resolvers-types.generated";
import { mutationTweetResolver } from "./resolvers/Mutation";
import { userTwitterResolver } from "./resolvers/User";
import { queryTwitterResolver } from "./resolvers/Query";
import { tweetTwitterResolver } from "./resolvers/Tweet";
import Db, { DbTweet, DbUser } from "./db";
import { trendTwitterResolver } from "./resolvers/Trend";


export interface TwitterResolverContext {
    db: Db,
    dbTweetCache: Record<string, DbTweet>,
    dbTweetToFavoriteCountMap: Record<string, number>,
    dbUsersCache: Record<string, DbUser>
}
export const resolvers: Resolvers<TwitterResolverContext> = {
    Query: queryTwitterResolver,
    User: userTwitterResolver,
    Tweet: tweetTwitterResolver,
    Mutation: mutationTweetResolver,
    Trend: trendTwitterResolver
}