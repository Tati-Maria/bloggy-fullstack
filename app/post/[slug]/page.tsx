'use client'

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post"
import {PostType} from "@/app/types/postType"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import Image from "next/image";
import SyncLoader from "react-spinners/SyncLoader";

type URL = {
    params: {
        slug: string;
    }
}

const getPost = async (slug: string) => {
    const { data } = await axios.get(`/api/posts/${slug}`);
    return data;
}


const Detail = (url: URL) => {
    const {data, isLoading, isError} = useQuery<PostType>(
        {queryKey: ['detail-post'], 
        queryFn: () => getPost(url.params.slug)}
        );

        if(isLoading) return <SyncLoader color="#fff" />;
        if(isError) return <div>Something went wrong</div>;
    
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return (
    <div>
        <Post 
        id={data?.id} 
        name={data.user.name} 
        content={data.title} 
        avatar={data.user.image} 
        comments={data.comments} 
        />
        <AddComment id={data?.id} />
        <div>
            {data.comments.map((comment) => (
                <div key={comment.id} className='my-4 bg-slate-800 text-white p-8'>
                    <div className="flex items-center gap-2">
                        <Image
                        width={30}
                        height={30}
                        src={comment.user?.image}
                        alt="avatar"
                        className="rounded-full"
                         />
                        <div>
                            <h3 className="text-base font-medium">{comment?.user?.name}</h3>
                            <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString('pt-PT')}</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p>{comment.message}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Detail;