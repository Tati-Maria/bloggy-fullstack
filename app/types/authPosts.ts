export type AuthPosts = {
    email: string;
    id: string;
    image: string;
    name: string;
    posts: {
        createdAt: string;
        id: string;
        title: string;
        comments?: {
            id: string;
            createdAt: string;
            postId: string;
            userId: string;
            content: string;
        }[]
    }[]
}