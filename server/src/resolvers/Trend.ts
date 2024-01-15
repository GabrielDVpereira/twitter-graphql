import { TwitterResolverContext } from "../resolvers";
import { TrendResolvers, } from "../resolvers-types.generated";

export const trendTwitterResolver: TrendResolvers<TwitterResolverContext> = {
    __resolveType(obj, _context, _info) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        if (typeof (obj as any).hashtag === "string") {
            return "HashtagTrend"
        } else {
            return "TopicTrend"
        }
    }
}