'use client';

import { useState } from 'react';
import { Mail, Phone, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { submitContactForm, ApiError } from '@/lib/api';

import type { SocialLink } from '@portfolio/shared';

interface ContactSectionProps {
    email: string;
    phone: string;
    socialLinks?: SocialLink[];
}

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, phone, socialLinks }) => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await submitContactForm(formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) setError(null);
    };

    const handleSendAnother = () => {
        setSubmitted(false);
    };

    return (
        <section id="contact" className="section bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
                <h2 className="section-title">Get In Touch</h2>

                <div className="mt-12 grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
                        </p>

                        <div className="space-y-4">
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                                    <Mail size={24} className="text-teal-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email</p>
                                    <p className="text-slate-100 font-medium">{email}</p>
                                </div>
                            </a>

                            <a
                                href={`tel:${phone}`}
                                className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                                    <Phone size={24} className="text-teal-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Phone</p>
                                    <p className="text-slate-100 font-medium">{phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center">
                                    <MapPin size={24} className="text-teal-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Location</p>
                                    <p className="text-slate-100 font-medium">Remote / Worldwide</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <p className="text-slate-400 mb-4">Connect with me:</p>
                            <SocialLinks links={socialLinks} size="lg" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-gradient-to-br from-teal-500/30 to-emerald-500/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                    <CheckCircle size={40} className="text-teal-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-100 mb-3">Message Sent!</h3>
                                <p className="text-slate-300 mb-2 max-w-sm">
                                    Thank you for reaching out! Your message has been received.
                                </p>
                                <p className="text-slate-400 text-sm mb-6">
                                    I&apos;ll get back to you as soon as possible.
                                </p>
                                <button
                                    onClick={handleSendAnother}
                                    className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send size={14} />
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 animate-in slide-in-from-top duration-300">
                                        <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            minLength={2}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="formEmail" className="block text-sm font-medium text-slate-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="formEmail"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        minLength={5}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        minLength={10}
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
