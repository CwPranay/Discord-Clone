"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Fixed incorrect import path
import { Button } from "@/components/ui/button"; // Fixed incorrect import path
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
    const { isOpen,onOpen, onClose, type ,data} = useModal();
    const isModalOpen = isOpen && type === "invite";

    const{server} = data;
    const origin =useOrigin();

    const [copied,setCopied]=useState(false)
    const [isLoading,SetIsLoading]=useState(false)


    const inviteUrl= `${origin}/invite/${server?.inviteCode}`

    const onCopy=()=>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000);

        
    }

    const onNew= async () => {
        try {
            SetIsLoading(true)
            const respone =await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite",{server:respone.data})

        } catch (error) {
            console.log(error)
            
        }
        finally{
            SetIsLoading(false);
        }

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Invite Link
                    </Label>

                    <div className="flex bg-zinc-300/50 items-center mt-2 gap-x-2">
                        <Input disabled={isLoading}
                            readOnly
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            value={inviteUrl}
                        />
                        <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied?<Check className="w-4 h-4"/> : <Copy className="w-4 h-4" />}
                            
                        </Button>
                    </div>
                    <Button  
                    onClick={onNew}
                     disabled={isLoading}
                    variant="link"
                    size="sm"
                    className="text-sm text-zinc-500 mt-4">


                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
