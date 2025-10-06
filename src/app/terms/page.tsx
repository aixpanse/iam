import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <div className="space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                        <p className="text-muted-foreground text-lg">
                            Last updated: October 6, 2025
                        </p>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                By accessing or using IAM (Identity Access Management) services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services. These Terms constitute a legally binding agreement between you and IAM.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                            <p className="mb-4">
                                IAM provides identity and access management services, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>User authentication and authorization services</li>
                                <li>Single sign-on (SSO) capabilities</li>
                                <li>User identity management and verification</li>
                                <li>Access control and permission management</li>
                                <li>API integrations for third-party applications</li>
                                <li>Security monitoring and reporting</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. Account Registration and Security</h2>

                            <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
                            <p className="mb-4">
                                To use our services, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>

                            <h3 className="text-xl font-medium mb-3">3.2 Account Security</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>You must use a strong password and keep it confidential</li>
                                <li>You must notify us immediately of any unauthorized use of your account</li>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>We recommend enabling two-factor authentication when available</li>
                            </ul>

                            <h3 className="text-xl font-medium mb-3">3.3 Account Termination</h3>
                            <p className="mb-4">
                                You may terminate your account at any time. We may suspend or terminate your account if you violate these Terms or engage in activities that harm our service or other users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                            <p className="mb-4">You agree not to use our services to:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Violate any laws, regulations, or third-party rights</li>
                                <li>Engage in fraudulent, deceptive, or malicious activities</li>
                                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                                <li>Distribute malware, viruses, or other harmful code</li>
                                <li>Interfere with or disrupt our services or servers</li>
                                <li>Use our services for any illegal or unauthorized purposes</li>
                                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                                <li>Resell or redistribute our services without authorization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Service Availability and Support</h2>

                            <h3 className="text-xl font-medium mb-3">5.1 Service Availability</h3>
                            <p className="mb-4">
                                We strive to maintain high service availability but cannot guarantee uninterrupted access. We may perform maintenance, updates, or modifications that temporarily affect service availability.
                            </p>

                            <h3 className="text-xl font-medium mb-3">5.2 Support</h3>
                            <p className="mb-4">
                                We provide support through various channels as outlined in your service plan. Support response times may vary based on your subscription level and the nature of the issue.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Data and Privacy</h2>
                            <p className="mb-4">
                                Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
                            </p>
                            <div className="bg-muted p-4 rounded-lg">
                                <p className="font-medium">
                                    📖 Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for detailed information about how we handle your data.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>

                            <h3 className="text-xl font-medium mb-3">7.1 Our Rights</h3>
                            <p className="mb-4">
                                All rights, title, and interest in our services, including software, designs, trademarks, and proprietary technology, remain our exclusive property or that of our licensors.
                            </p>

                            <h3 className="text-xl font-medium mb-3">7.2 Your Content</h3>
                            <p className="mb-4">
                                You retain ownership of any content you provide to our services. By using our services, you grant us a limited license to use, store, and process your content solely to provide our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">8. Payment and Billing</h2>

                            <h3 className="text-xl font-medium mb-3">8.1 Subscription Fees</h3>
                            <p className="mb-4">
                                If you subscribe to paid services, you agree to pay all applicable fees as described in your chosen plan. Fees are non-refundable except as expressly stated in these Terms.
                            </p>

                            <h3 className="text-xl font-medium mb-3">8.2 Billing</h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Subscription fees are billed in advance on a recurring basis</li>
                                <li>You are responsible for providing current and accurate billing information</li>
                                <li>We may suspend services for non-payment after appropriate notice</li>
                                <li>Price changes will be communicated with at least 30 days' notice</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                            <p className="mb-4">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IAM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                            </p>
                            <p className="mb-4">
                                Our total liability to you for all claims arising from your use of our services shall not exceed the amount you paid us in the 12 months preceding the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">10. Disclaimers</h2>
                            <p className="mb-4">
                                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                            </p>
                            <p className="mb-4">
                                We do not warrant that our services will be uninterrupted, error-free, or completely secure, although we implement reasonable security measures.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                            <p className="mb-4">
                                You agree to indemnify, defend, and hold harmless IAM and its officers, directors, employees, and agents from and against any claims, damages, losses, costs, and expenses arising from your use of our services or violation of these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">12. Dispute Resolution</h2>

                            <h3 className="text-xl font-medium mb-3">12.1 Governing Law</h3>
                            <p className="mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.
                            </p>

                            <h3 className="text-xl font-medium mb-3">12.2 Dispute Resolution Process</h3>
                            <p className="mb-4">
                                Any disputes arising from these Terms or your use of our services shall first be addressed through good faith negotiation. If unresolved, disputes may be submitted to binding arbitration or resolved in the courts of [Your Jurisdiction].
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">13. Modifications to Terms</h2>
                            <p className="mb-4">
                                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
                            <p className="mb-4">
                                If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
                            <p className="mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="mb-2"><strong>Email:</strong> legal@iam-service.com</p>
                                <p className="mb-2"><strong>Mail:</strong> IAM Legal Team, [Your Address]</p>
                                <p><strong>Response Time:</strong> We aim to respond to all legal inquiries within 5-10 business days</p>
                            </div>
                        </section>

                        <section className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                            <h2 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">⚠️ Important Notice</h2>
                            <p className="text-amber-700 dark:text-amber-300">
                                These Terms of Service constitute the entire agreement between you and IAM. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}