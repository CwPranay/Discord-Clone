// app/(invite)/(routes)/invite/[inviteCode]/page.tsx

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// ✅ CORRECT typing
type PageParams = {
  params:{
    inviteCode: string
  };
};

export default async function InviteCodePage({ params }:PageParams) {
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
}
