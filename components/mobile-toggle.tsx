import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./servers/server-sidebar";

export const MobileToggle = ({
    serverId
}: {
    serverId: string

}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>

            </SheetTrigger>
            <SheetContent side="left" className="flex p-0 gap-0 w-full">
                <SheetHeader className="sr-only">
                    <SheetTitle>Mobile navigation menu</SheetTitle>
                </SheetHeader>
                <div className="flex w-full h-full">
                    <div className="w-[72px]">
                        <NavigationSidebar />
                    </div>
                    <ServerSidebar serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}