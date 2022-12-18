import { useRouter } from "next/router"
import React, { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import PostCard from "@components/PostCard"
import postsRepository, {
  PostPrimaryCategoryType,
  PostSortType,
} from "@libs/api/posts"

type Props = {}

const PostList: React.FC<Props> = ({}) => {
  const router = useRouter()

  const currentSort = useMemo<PostSortType>(() => {
    return `${router.query.sort || `VIEWS`}`.toUpperCase() as PostSortType
  }, [router])

  const currentCategory = useMemo<PostPrimaryCategoryType | undefined>(() => {
    if (!router.query.tab || router.query.tab === "all") return undefined
    return `${router.query.tab}`.toUpperCase() as PostPrimaryCategoryType
  }, [router])

  const { data } = useQuery(
    ["posts", { currentSort, currentCategory }],
    () => postsRepository.getPosts(currentSort, currentCategory),
    {}
  )

  return (
    <div className="post-list">
      {data!.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  )
}

export default PostList
