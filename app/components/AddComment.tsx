'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, {AxiosError} from "axios"
import toast from "react-hot-toast";

type AddCommentProps = {
    id: string;
}

type Comment = {
    postId: string;
    comment: string;
}


const AddComment = ({id}: AddCommentProps) => {
    const [comment, setComment] = useState('');
    const [disabled, setDisabled] = useState(false);
    const queryClient = useQueryClient();
    let commentToastId: string;

    const {mutate} = useMutation(
        async(data: Comment) => axios.post('/api/posts/addComment', {data}),
        {
            onSuccess: () => {
                setDisabled(false);
                queryClient.invalidateQueries(['detail-post']);
                toast.success("Comment added successfully", {id: commentToastId});
                setComment('');
            }, 
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, {id: commentToastId})
                }
                setDisabled(false);
            }
        }
    );

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        commentToastId = toast.loading("Adding comment...");
        mutate({comment, postId: id})
    }

  return (
    <form className="my-8" onSubmit={addComment}>
        <legend className="text-lg py-2 text-blue-300 inline-block text-center">Add a comment</legend>
        <fieldset className="flex flex-col my-2">
            <input 
            type="text"
            name="comment"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
             />
        </fieldset>
        <div className="flex items-center justify-between">
            <button
            disabled={disabled}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
                Add Comment
            </button>
            <p className={`font-bold ${comment.length > 300 ? "text-red-600" : 'text-blue-500'}`}>
                {comment.length}/300
            </p>
        </div>
    </form>
  )
}

export default AddComment