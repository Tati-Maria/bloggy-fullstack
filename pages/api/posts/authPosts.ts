import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
   if(req.method === 'GET') {
    //check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if(!session) {
        res.status(401).json({message: 'Please login to view posts'});
        return;
    }
    //get user posts
    try {
       const result = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        include: {
            posts: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    comments: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            }
        }
       })
        res.status(200).json(result);
    } catch (error) {
        res.status(403).json({message: 'Something went wrong'});
    }
   }
}