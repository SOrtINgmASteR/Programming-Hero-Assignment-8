import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {

    return (
        <footer className="relative isolate overflow-hidden bg-slate-900 text-slate-200">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" aria-hidden="true" />
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                            <span className="rounded-md bg-blue-500/10 px-2 py-1 text-blue-400">Hero</span>
                            <span>IO</span>
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Hero IO curates high-quality applications for modern productivity. Follow curated installs, discover community picks, and manage your hero workflow effortlessly.
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-lg">
                            <a href="#" className="btn btn-circle btn-sm bg-blue-500/10 text-slate-100 hover:bg-blue-500/20" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="#" className="btn btn-circle btn-sm bg-blue-500/10 text-slate-100 hover:bg-blue-500/20" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="btn btn-circle btn-sm bg-blue-500/10 text-slate-100 hover:bg-blue-500/20" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Navigate</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-400">
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Apps
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Installation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    My Installation
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Resources</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-400">
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Release Notes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                                    Brand Assets
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Stay in the loop</h3>
                        <p className="mt-4 text-sm text-slate-400">
                            Join the early access list to receive curated app drops, install tips, and product updates.
                        </p>
                        <form className="mt-6 space-y-3">
                            <label htmlFor="newsletter-email" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Email address
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="you@hero.io"
                                    required
                                    className="input input-bordered w-full border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                                />
                                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                                    Notify me
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">No spam promise. Unsubscribe anytime.</p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© 2025 Hero IO. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                            Privacy
                        </a>
                        <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                            Terms
                        </a>
                        <a href="#" className="transition-colors duration-200 hover:text-blue-400">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;