'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import Image from "next/image"
import { useState } from "react";
import Toggle from "./Toggle";
import toast from "react-hot-toast"
import TextInput from "../components/TextInput";

interface EditPostProps {
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

const EditPost = ({name, avatar, content, comments, id}: EditPostProps) => {
    const [isToggled, setIsToggled] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    let deleteToastId: string;
    const queryClient = useQueryClient();

    //delete a post
    const {mutate} = useMutation(
        async(id: string) => await axios.delete(`/api/posts/deletePost`, {data: id}),
        {
        onError: (error) => {
           if(error instanceof AxiosError) {
                toast.error(error.response?.data.message, {id: deleteToastId})
           }
        }, 
        onSuccess: () => {
            toast.success("Post deleted successfully", {id: deleteToastId});
            queryClient.invalidateQueries(["authPosts"]);
        }
    }
    );

    const deletePost = () => {
        deleteToastId = toast.loading("Deleting post...", {id: "deleteToastId"})
        mutate(id);
    }
    //edit a post
    // const {mutate: editPost} =  useMutation(
    //     async (data: {id: string; text: string}) => await axios.put("/api/posts/editPost", data),
    //     {
    //         onError: (error) => {
    //             if(error instanceof AxiosError) {
    //                 toast.error(error.response?.data.message)
    //             }
    //         },
    //         onSuccess: () => {
    //             toast.success("Post edited successfully");
    //             queryClient.invalidateQueries(["authPosts"]);
    //         }
    //     }
    // );

    // const edit = () => {
    //     editPost({id, text})
    // }

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     edit();
    // }


  return (
    <>
    <div className="bg-slate-800 my-8 p-8 rounded-lg text-white">
        <div className="flex items-center gap-2">
            <Image width={36} height={36} alt="user image" src={avatar} className='rounded-full' />
            <h3 className="text-blue-400">{name}</h3>
        </div>
        <div className="my-8">
        <p className="break-all font-light text-sm md:text-base">{content}</p>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-blue-700">
                {comments?.length} Comments
            </p>
            <button
            onClick={() => setIsToggled(!isToggled)} 
            className="text-sm font-bold text-red-600">
                Delete
            </button>
            <button
            onClick={() => setOpen(!open)}
            className="text-sm font-bold text-green-600"
            >
                Edit
            </button>
        </div>
    </div>
    {isToggled && <Toggle setIsToggled={setIsToggled} deletePost={deletePost} />}
    {open && <TextInput text={text} setText={setText} setOpen={setOpen} />}
    </>
  )
}

export default EditPost