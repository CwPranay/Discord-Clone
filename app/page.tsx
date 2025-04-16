import { initialProfile } from "@/lib/intital.profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { InitialModal } from "@/components/modals/initial-modal";
import "./globals.css";


const SetupPage = async () =>{

  const profile =await initialProfile()

  if (!profile) {
    return <RedirectToSignIn />;
  }
  
  const server =await db.server.findFirst({
    where:{
      members:{
        some:{
          profileId :   profile?.id
        }      }
    }
  });

  if(server){
    return redirect(`/servers/${server.id}`)
  }
  return <InitialModal/>
;
}

export default SetupPage