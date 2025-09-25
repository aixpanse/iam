export default function Footer() {
    return (
        <div className="bg-white/10 backdrop-blur-lg border-t border-black/10 px-6 py-4 z-50">
            <div className="flex justify-between items-center">
                <div className="text-sm">
                    © 2024 IAM. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms" >Terms</a>
                    <a href="/contact" >Contact</a>
                </div>
            </div>
        </div>
    );
}