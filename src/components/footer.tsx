import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-white/10 backdrop-blur-lg border-t border-black/10 px-6 py-4 z-50">
            <div className="flex justify-between items-center">
                <a className="text-sm hover:underline" href="/">
                    © 2024 IAM. All rights reserved.
                </a>
                <div className="flex gap-6 text-sm">
                    <Link href="/privacy" className="hover:underline">Privacy</Link>
                    <Link href="/terms" className="hover:underline">Terms</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </div>
    );
}