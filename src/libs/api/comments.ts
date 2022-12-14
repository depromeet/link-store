import Repository from "./repository"

interface IComment {
  id: number
  contents: string
  userId: number
  postId: number
  createdAt: string
}

export class CommentsRepository extends Repository {
  public async getCommentsOfPost(postId: number): Promise<IComment[]> {
    const response = await this.client.get(`/comments/${postId}`, {
      headers: { AUTH: this.authToken },
    })

    return response.data.data

    // TODO: 백엔드 문의(500)
    // TODO: add response types

    throw new Error("not implemented")

    return []
  }

  public async createCommentOnPost(
    postId: number,
    contents: string
  ): Promise<void> {
    await this.client.post(
      `/comments/`,
      {
        postId,
        contents,
      },
      { headers: { AUTH: this.authToken } }
    )
  }
}
