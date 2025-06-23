import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

// ✅ This is the correct type for route segment props in App Router
interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  if (!params.inviteCode) {
    redirect("/");
  }

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
    redirect(`/servers/${existingServer.id}`);
  }

  const serverToJoin = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!serverToJoin) {
    redirect("/");
  }

  const server = await db.server.update({
    where: {
      id: serverToJoin.id,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  redirect(`/servers/${server.id}`);
};

export default InviteCodePage;
