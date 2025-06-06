"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    
    DialogFooter,
    DialogHeader,
    DialogTitle

} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,


} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import qs from "query-string"
import axios from "axios"
import {  useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { ChannelType } from "@prisma/client";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(name=>name!=="general",{
        message:"Channel name cannot be 'general'"
    }),
    type: z.nativeEnum(ChannelType)

   
});



export const EditChannelModal = () => {
    const {isOpen,onClose,type,data}=useModal()
   const isModalOpen = isOpen && type==="editChannel"
   const { channel ,server } =data;
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            
            type: channel?.type ||  ChannelType.TEXT
            
           
        }
    });

    const router =useRouter()
    

    useEffect(()=>{
        if(channel)
        {
            form.setValue("name",channel.name);
            form.setValue("type",channel.type)
        }
       
    },[form,channel])

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url =qs.stringifyUrl({
                url:`/api/channels/${channel?.id}`,
                query:{
                    serverId:server?.id
                }
            })
             await axios.patch(url, values);
           
    
            form.reset();
            
    
           
            router.refresh()
            onClose();
        } catch (error) {
            console.log(error);
        }
    };
    
    
const handleClose=()=>{
    form.reset()
    onClose()
}
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>


            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Channel
                    </DialogTitle>
                    

                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Channel Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading}
                                            className="bg-zinc-300/50  border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 rounded p-2"
                                            placeholder="Enter Channel name"
                                            {...field}
                                        />

                                    </FormControl>
                                    <FormMessage />


                                </FormItem>
                            )} />
                            <FormField control={form.control}
                                   name="type"
                                  render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Channel Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger className="w-full outline-none capitalize bg-zinc-300/50 border-0 focus-visible:ring-0 text-black ring-offset-0 focus-visible:ring-offset-0 rounded p-2">
                                                    <SelectValue placeholder="Select Channel Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {Object.values(ChannelType).map((type) => (
                                                <SelectItem key={type} className="capitalize" value={type}>
                                                        {type.toLowerCase()}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                        </Select>
                                        
                                        <FormMessage />

                                    </FormItem>

                                 )} />

                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant={"primary"} disabled={isLoading}>
                                Save
                            </Button>
                        </DialogFooter>

                    </form>

                </Form>


            </DialogContent>

        </Dialog>
    )
}