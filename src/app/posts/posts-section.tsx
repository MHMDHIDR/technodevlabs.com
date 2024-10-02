import { PostCard } from '@/components/custom/post-card'
import { getPosts } from '@/data/posts'

export async function PostsSection() {
  const posts = await getPosts()

  return posts && posts.length !== 0 ? (
    <div className='container max-w-5xl'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2.5'>
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  ) : null
}
