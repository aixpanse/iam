import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <div className="space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground text-lg">
                            Last updated: October 6, 2025
                        </p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to IAM (Identity Access Management). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, process, and protect your information when you use our identity and access management services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-medium mb-3">2.1 Information You Provide</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Account Information:</strong> Name, email address, password, and other registration details</li>
                                <li><strong>Profile Information:</strong> Additional details you choose to add to your profile</li>
                                <li><strong>Communication Data:</strong> Messages, feedback, and support requests you send to us</li>
                            </ul>

                            <h3 className="text-xl font-medium mb-3">2.2 Information We Collect Automatically</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Usage Data:</strong> Information about how you use our services, including login times and frequency</li>
                                <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                                <li><strong>Log Data:</strong> Server logs, error reports, and security event logs</li>
                                <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">We use your information to:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Provide, maintain, and improve our identity management services</li>
                                <li>Authenticate your identity and manage access to your applications</li>
                                <li>Send you important updates about your account and our services</li>
                                <li>Provide customer support and respond to your inquiries</li>
                                <li>Detect, prevent, and address technical issues and security threats</li>
                                <li>Comply with legal obligations and protect our legitimate interests</li>
                                <li>Analyze usage patterns to improve our services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
                            <p className="mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                                <li><strong>Service Providers:</strong> With trusted third-party providers who assist us in operating our services</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                                <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of our users or others</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                            <p className="mb-4">
                                We implement industry-standard security measures to protect your information:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Employee training on data protection best practices</li>
                                <li>Incident response procedures for security breaches</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                            <p className="mb-4">
                                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal or regulatory purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                            <p className="mb-4">Depending on your location, you may have the following rights:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Access:</strong> Request a copy of your personal information</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                                <li><strong>Objection:</strong> Object to certain processing of your information</li>
                                <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
                            </ul>
                            <p className="mb-4">
                                To exercise these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
                            <p className="mb-4">
                                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences, though disabling certain cookies may affect functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                            <p className="mb-4">
                                Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                            <p className="mb-4">
                                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
                            <p className="mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="mb-2"><strong>Email:</strong> privacy@aixpanse.pl</p>
                                <p className="mb-2"><strong>Mail:</strong> IAM Privacy Team, contact@aixpanse.pl</p>
                                <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 30 days</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}