'use client'

import Image from "next/image";
import Link from "next/link";

interface PostProps {
    name: string;
    avatar: string;
    content: string;
    id: string;
    comments?: {
        id: string;
        postId: string;
        userId: string;
    }[]
}

export default function Post({name, avatar, content, id, comments}: PostProps) { 
    return (
        <div className="bg-slate-800 my-8 p-8 rounded-lg text-white">
            <div className="flex items-center gap-2">
                <Image 
                src={avatar} 
                width={32} 
                height={32} 
                className="rounded-full"
                alt="User avatar" 
                />
                <h3 className="font-bold text-blue-500">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{content}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-white">
                        {comments?.length} Comments
                    </p>
                </Link>
            </div>
        </div>
    )
}