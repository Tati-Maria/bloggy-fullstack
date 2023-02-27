'use client'
import { useState } from "react";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

//useQueryClient is a hook that allows us to access the query client from anywhere in our application.
//This is useful when we want to update the cache after a mutation.
//useMutation is a hook that allows us to perform a mutation. it will track the state of a mutation and return the appropriate data.

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let toastPostId: string | undefined;

    //create a post
    const {mutate} = useMutation(
        async(title: string) => await axios.post('/api/posts/addPost', {title}),
        {onError: (error) => {
            if(error instanceof AxiosError) {
                toast.error(error?.response?.data.message, {id: toastPostId})
            }
            setIsDisabled(false);
        }, onSuccess: () => {
            toast.success('Post created successfully 🔥', {id: toastPostId});
            queryClient.invalidateQueries(['posts']);
            setTitle('');
            setIsDisabled(false);
        }}
    );

    const submitPost = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toastPostId = toast.loading('Creating post...', {id: toastPostId});
        setIsDisabled(true);
        mutate(title);
    };


  return (
    <form onSubmit={submitPost} className="bg-slate-800 my-8 p-8 rounded-md shadow">
        <legend className="text-lg text-white font-medium">Add a new Post</legend>
        <fieldset className="flex flex-col my-4">
            <textarea 
            name="content"
            placeholder="Add something..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-4 text-base rounded-md my-2 bg-gray-200 w-full placeholder:text-black/70"
            />
        </fieldset>
        <div className="flex items-center justify-between gap-2">
            <p
            className={`font-medium text-xs 
            ${title.trim().length > 300 ? 'text-red-700' : 'text-white'}`
            }
            >
                {`${title.length}/300`}
            </p>
        <button
        disabled={isDisabled}
        type="submit"
        className="text-sm border-2 border-white rounded-md py-2 px-5 text-white disabled:opacity-25"
        >
            Create a post
        </button>
        </div>
    </form>
  )
}

export default AddPost;