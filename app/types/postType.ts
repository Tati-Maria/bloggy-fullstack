export type PostType = {
    id: string;
    title: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        image: string;
        email: string;
    }
    comments: {
        id: string;
        postId: string;
        userId: string;
        message: string;
        createdAt: string;
        user: {
            id: string;
            name: string;
            image: string;
            email: string;
        }
    }[]
}