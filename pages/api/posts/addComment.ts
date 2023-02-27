import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
   if(req.method === 'POST') {
    //check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({message: 'Please login to create a post'});
        return;
    }
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })
  
    //add a comment
    try {
        const {comment, postId} = req.body.data;
        if(comment.trim() === '') {
            res.status(403).json({message: 'Comment cannot be empty'});
            return;
        } else if(comment.length > 300) {
            res.status(403).json({message: 'Comment cannot be more than 500 characters'});
            return;
        } else if(!postId) {
            res.status(403).json({message: 'Post not found'});
            return;
        } 

        const newComment = await prisma.comment.create({
            data: {
                message: comment,
                userId: prismaUser?.id,
                postId: postId
            }
        });
        res.status(200).json(newComment);
        
    } catch (error) {
        res.status(403).json({message: 'Something went wrong'});
    }
   }
}