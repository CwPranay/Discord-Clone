"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-model-store";
import qs from "query-string"
import { Button } from "@/components/ui/button"; // Fixed incorrect import path

import { useState } from "react";
import axios from "axios";
import {  useRouter } from "next/navigation";


export const DeleteChannelModal = () => {
    const { isOpen, onClose, type ,data} = useModal();
    const isModalOpen = isOpen && type === "deleteChannel";

    const{server,channel} = data;
    const router =useRouter()
    
    

   
    const [isLoading,SetIsLoading]=useState(false)
    const onClick =async () =>{
        try {
            SetIsLoading(true)
            const url =qs.stringifyUrl({
                url:`/api/channels/${channel?.id}`,
                query:{
                    serverId: server?.id
                }
            })

            await axios.delete(url)
            onClose();
            router.refresh();
           
            
        } catch (error) {
            console.log(error)
        }
        finally{
            SetIsLoading(false)
        }
    }


    

   
  

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="text-indigo-500 font-semibold ">{channel?.name}</span> will be permanently deleted.

                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                       <Button
                       disabled={isLoading}
                       variant="ghost"
                       onClick={onClose}
                       >
                        Cancel

                       </Button>
                       <Button
                       disabled={isLoading}
                       variant="primary"
                       onClick={onClick}>
                        Confirm

                       </Button>
                         </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
