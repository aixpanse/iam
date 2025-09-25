import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-100 to-gray-500 flex items-center justify-center px-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Access Denied
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        You don't have permission to access the dashboard. Please contact your administrator to get the required "iam" label assigned to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-gray-500 mb-4">
                        Only users with "iam" label can access the dashboard and its features.
                    </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full">
                            Go Back Home
                        </Button>
                    </Link>
                    <Link href="/auth/account" className="flex-1">
                        <Button className="w-full">
                            View Profile
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}