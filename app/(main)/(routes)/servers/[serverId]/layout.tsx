import { ServerSidebar } from "@/components/servers/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation"; // ✅ Use this instead of redirectToSignIn

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    const profile = await currentProfile();

    if (!profile) {

        return redirect("/sign-in");
    }
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/")
    }

    return <div className="h-full">
        <div className="hidden fixed md:flex h-full w-60 z-20 inset-y-0 flex-col">
            <ServerSidebar serverId={params.serverId}/>

        </div>
        <main className="h-full md:pl-60">

            {children}</main></div>;
};

export default ServerIdLayout;
