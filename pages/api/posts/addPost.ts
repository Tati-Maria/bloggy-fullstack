import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

type Data = {
    title: string;
    userId: string | null | undefined;
}

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
    const title: string = req.body.title;
    //get user
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    });

    if(title.trim().length < 1) {
        res.status(403).json({message: 'Please enter a valid post message'});
        return;
    } else if(title.trim().length > 300) {
        res.status(403).json({message: 'Please enter a post less than 300 characters'});
        return;
    }

    //create a post
    try {
        const result = await prisma.post.create({
            data: {
                title,
                userId: prismaUser?.id
            } 
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(403).json({message: 'Something went wrong'});
    }
   }
}