
import { currentProfile } from "@/lib/current-profile"
import { UserButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation"

import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "../mode-toggle";


export const NavigationSidebar = async ()=>{
    const profile =await currentProfile()

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId:profile.id,
                }
            }
        }
    })
return (
    <div className="space-y-4 flex flex-col items-center h-full w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3 text-primary">
       <NavigationAction/>
       <Separator
       className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
       <ScrollArea className="w-full flex">
        {servers.map((server) => (
            <div key={server.id} className="mb-4">
                <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}/>
            </div>
        ))}

       </ScrollArea>
       <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle/>
        <UserButton
        afterSignOutUrl="/"
       />
       </div>
    </div>
)
}