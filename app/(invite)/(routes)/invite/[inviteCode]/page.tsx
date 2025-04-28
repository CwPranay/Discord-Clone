import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // Check if the user is already a member of the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // Find the server by invite code to make sure it exists
  const serverToJoin = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!serverToJoin) {
    return redirect("/"); // or show a 404/error page
  }

  // Add the current profile as a member
  const server = await db.server.update({
    where: {
      id: serverToJoin.id,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  return redirect(`/servers/${server.id}`);
};

export default InviteCodePage;
