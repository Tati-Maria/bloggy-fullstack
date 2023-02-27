'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/authPosts";
import EditPost from "./EditPost";

const getAuthPosts = async () => {
    const { data } = await axios.get("/api/posts/authPosts");
    return data;
}

const MyPosts = () => {
    const { data, isLoading, isError } = useQuery<AuthPosts>({ queryFn: getAuthPosts, queryKey: ["authPosts"] });

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Something went wrong</div>

  return (
    <div>
        {data?.posts.map(post => (
        <EditPost 
        key={post.id} 
        id={post.id} 
        avatar={data.image} 
        name={data.name} 
        content={post.title} 
        comments={post.comments} 
        />
        ))}
    </div>
  )
}

export default MyPosts;