import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";


export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session){
        return redirect("/api/auth/signin");
    }
    return (
        <main>
            <h1 className="text-base md:text-2xl text-blue-400">
                Welcome back <span> {session?.user?.name}
                </span>
            </h1>
            <MyPosts />
        </main>
    )
}