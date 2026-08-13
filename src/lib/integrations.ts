/** Server-only integration contracts. Implement adapters using environment variables, never client-side keys. */
export const integrations = {
  beehiiv: { publicationId: process.env.BEEHIIV_PUBLICATION_ID ?? 'pub_0081bc14-f163-453a-9a1c-4685ece44494', subscribePath:'/api/subscribe', postsPath:'/api/integrations/beehiiv/posts' },
  youtube: { channelId:'UCsr7W63vA711gx8cQnJ05ig', channelUrl:'https://www.youtube.com/channel/UCsr7W63vA711gx8cQnJ05ig' },
  commerce: { checkoutPath:'/checkout', accountPath:'/account' }
} as const
