import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaDownload, FaStar } from 'react-icons/fa';
import { FaGooglePlay, FaApple } from 'react-icons/fa6';
import AppCard from '../Components/AppCard.jsx';
import { fetchApps, selectTopApps } from '../utils/index.js';
import hero from '../assets/hero.png';


const Home = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            const data = await fetchApps();
            if (isMounted) {
                setApps(data);
                setLoading(false);
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    const topApps = useMemo(() => selectTopApps(apps, 8), [apps]);

    return (
        <div className="space-y-24">
            <section className='max-w-[1400px] mx-auto'>
                <div>
                    <h1 className="text-6xl font-bold text-black text-center mb-4">
                        We Build <span className="text-purple-600">Productive</span> Apps
                    </h1>
                    <p className="mb-6 max-w-3xl text-lg text-slate-600 text-center mx-auto">
                        Explore a curated selection of top-rated applications designed to enhance your productivity, creativity, and entertainment. Whether you're looking for the latest tools or hidden gems, we've got you covered.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://apps.apple.com/us/genre/ios/id36"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-wide gap-3 rounded-xl border border-black bg-white text-sm font-semibold text-black shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <FaApple className="text-xl" />
                        App Store
                    </a>
                    <a
                        href="https://play.google.com/store/apps"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-wide gap-3 rounded-xl border border-black bg-white text-sm font-semibold text-black shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <FaGooglePlay className="text-xl" />
                        Play Store
                    </a>
                </div>
                <div className="mt-10 flex justify-center">
                    <img
                        src={hero}
                        alt="Hero dashboard illustration"
                        className="max-w-4xl"
                    />
                </div>
            </section>

            <section className="w-full rounded-sm bg-linear-to-r from-purple-500 to-indigo-500 py-30 px-12 shadow-md space-y-10 text-white">
                <div className='text-white'>
                    <h1 className='text-center text-6xl font-bold'>Trusted by Millions, Built for You</h1>
                </div>
                <div className='flex justify-around text-white'>
                    <div className='flex flex-col text-center'>
                        <h3 className='text-sm font-semibold'>Total Downloads</h3>
                        <h1 className='text-3xl font-bold'>29.6M</h1>
                        <h3 className='text-sm font-semibold'>21% More than Last Month</h3>
                    </div>
                    <div className='flex flex-col text-center'>
                        <h3 className='text-sm font-semibold'>Average Rating</h3>
                        <h1 className='text-3xl font-bold'>906K</h1>
                        <h3 className='text-sm font-semibold'>46% More than Last Month</h3>
                    </div>
                    <div className='flex flex-col text-center'>
                        <h3 className='text-sm font-semibold'>Active Apps</h3>
                        <h1 className='text-3xl font-bold'>132+</h1>
                        <h3 className='text-sm font-semibold'>31 more will Launch</h3>
                    </div>
                </div>
            </section>

            <section id="apps" className="space-y-10 max-w-[1400px] mx-auto px-4 mb-8">
                <div className="flex flex-col items-center gap-4">
                    <h1 className='text-5xl font-bold'>Trending Apps</h1>
                    <p className="text-sm text-slate-500">Explore All Trending Apps on the Market developed by us</p>
                </div>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-60 rounded-3xl border border-slate-200 bg-white/60 shadow-sm"
                            >
                                <div className="h-full animate-pulse rounded-3xl bg-slate-200/70" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {topApps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <Link to="/apps" className="btn border-none bg-linear-to-r from-purple-500 via-violet-500 to-indigo-500 text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                        Show all apps
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
