import { BadgeAlertIcon, BadgeCheckIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export default function UserBadge({ verified }: { verified: boolean }) {
    return (
        <Badge variant={verified ? "secondary" : "destructive"}>
            {verified ? <BadgeCheckIcon /> : <BadgeAlertIcon />}
            {verified ? "Verified" : "Unverified"}
        </Badge >
    );
}