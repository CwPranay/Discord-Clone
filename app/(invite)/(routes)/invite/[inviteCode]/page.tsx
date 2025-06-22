import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: { inviteCode: string };
};

export default async function InviteCodePage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  if (!params.inviteCode) {
    return redirect("/");
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
    return redirect(`/servers/${existingServer.id}`);
  }

  const serverToJoin = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!serverToJoin) {
    return redirect("/");
  }

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
}
