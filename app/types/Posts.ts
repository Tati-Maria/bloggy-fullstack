export type PostType = {
    title: string;
    id: string;
    createdAt: string;
    user: {
        name: string;
        id: string;
        image: string;
    }
    comments?: {
        createdAt: string;
        id: string;
        postId: string;
        userId: string;
    }[];
}