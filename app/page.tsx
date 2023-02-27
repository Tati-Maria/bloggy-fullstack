'use client'
import AddPost from "./components/AddPost"
import { PostType } from "./types/Posts";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Post from "./components/Post";
//useQuery is a hook that allows us to perform a query. it will track the state of a query and return the appropriate data.

const getAllPosts = async () => {
  const res = await axios.get('/api/posts/getPosts')
  return res.data
}

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>({queryFn: getAllPosts, queryKey: ['posts']});

  if(error) return error;
  if(isLoading) return 'Loading...'; 
  
  return (
    <main>
     <AddPost />
     {data?.map((post) => (
      <Post comments={post.comments} key={post.id} id={post.id} name={post.user.name} avatar={post.user.image} content={post.title} />
     ))}
    </main>
  )
}
