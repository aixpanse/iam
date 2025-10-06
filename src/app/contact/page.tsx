'use client';

import AppBar from "@/components/app-bar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MailIcon, MessageSquareIcon } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <AppBar />
            <div className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
                <div className="space-y-12">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Have questions about IAM or need support? We're here to help. Reach out to us through any of the channels below.
                        </p>
                    </div>

                    {/* Email Information */}
                    <div className="flex justify-center">
                        <Card className="max-w-md">
                            <CardHeader className="text-center">
                                <MailIcon className="mx-auto h-8 w-8 text-primary mb-2" />
                                <CardTitle className="text-lg">Email</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground mb-2">General inquiries</p>
                                <p className="font-medium">hello@iam-service.com</p>
                                <p className="text-muted-foreground mb-2 mt-4">Support</p>
                                <p className="font-medium">support@iam-service.com</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            {/* Contact Form */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquareIcon className="h-5 w-5" />
                                            Send us a message
                                        </CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {submitted ? (
                                            <div className="text-center py-8">
                                                <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                                                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                                                        Message Sent!
                                                    </h3>
                                                    <p className="text-green-700 dark:text-green-300">
                                                        Thank you for contacting us. We'll respond to your inquiry within 24 hours.
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() => setSubmitted(false)}
                                                    variant="outline"
                                                    className="mt-4"
                                                >
                                                    Send Another Message
                                                </Button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Name *</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            placeholder="Your full name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email *</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="your@email.com"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject *</Label>
                                                    <Input
                                                        id="subject"
                                                        name="subject"
                                                        type="text"
                                                        placeholder="What's this about?"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message *</Label>
                                                    <textarea
                                                        id="message"
                                                        name="message"
                                                        rows={5}
                                                        placeholder="Tell us more about your inquiry..."
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
