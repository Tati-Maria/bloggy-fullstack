import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
   if(req.method === 'PATCH' || req.method === 'PUT') { 
    //check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({message: 'Please login to edit posts'});
        return;
    }
    //edit post
    try {
       const {id, title} = req.body;
         const post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title: title,
                updatedAt: new Date().toISOString()
            }
         });
            res.status(200).json(post);
    } catch (error) {
        res.status(403).json({message: 'Something went wrong'});
    }
   }
}