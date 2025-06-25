"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { set } from "date-fns";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;

};

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) {
            return;

        }
        const name = `${user.firstName} ${user.lastName}`;
        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
                const data = await resp.json();
                setToken(data.token);

            } catch (error) {
                console.log(error);
            }
        })()
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-col items-center justify-center ">
                <Loader2 className="w-7 h-7 animate-spin text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            data-tk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}


        >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full max-h-[calc(100vh-100px)]">
                    <VideoConference />
                </div>
            </div>
        </LiveKitRoom>
    )

}