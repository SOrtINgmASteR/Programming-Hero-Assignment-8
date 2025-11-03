import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import InstalledAppCard from '../Components/InstalledAppCard.jsx';
import {
    fetchApps,
    syncInstalledWithApps,
    uninstallApp,
} from '../utils/index.js';

const MyInstallation = () => {
    const [loading, setLoading] = useState(true);
    const [installedApps, setInstalledApps] = useState([]);
    const [sortOrder, setSortOrder] = useState('downloads-high-low');

    useEffect(() => {
        let isMounted = true;

        const loadInstalled = async () => {
            setLoading(true);
            const dataset = await fetchApps();
            const synced = syncInstalledWithApps(dataset);
            if (!isMounted) {
                return;
            }
            setInstalledApps(synced);
            setLoading(false);
        };

        loadInstalled();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleUninstall = (id) => {
        uninstallApp(id);
        setInstalledApps((previous) => previous.filter((entry) => entry.id !== id));
        toast.success('App uninstalled successfully.');
    };

    const sortedInstalledApps = useMemo(() => {
        const copy = [...installedApps];

        if (sortOrder === 'downloads-high-low') {
            return copy.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
        }

        if (sortOrder === 'downloads-low-high') {
            return copy.sort((a, b) => (a.downloads ?? 0) - (b.downloads ?? 0));
        }

        return copy;
    }, [installedApps, sortOrder]);

    return (
        <section className="space-y-12 py-16 max-w-[1400px] mx-auto px-4">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold text-slate-900">Your Installed Apps</h1>
                <p className="mx-auto max-w-2xl text-base text-slate-500">
                    Explore All Trending Apps on the Market developed by us.
                </p>
            </div>

            {loading ? (
                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-56 rounded-3xl border border-slate-200 bg-white/70">
                            <div className="h-full animate-pulse rounded-3xl bg-slate-200/70" />
                        </div>
                    ))}
                </div>
            ) : installedApps.length ? (
                <>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-lg font-semibold text-black-600 lg:w-40">
                            ({installedApps.length}) Apps Found
                        </span>
                        <select
                            className="select select-bordered w-full max-w-xs border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        >
                            <option value="downloads-high-low">Sort by · Downloads High → Low</option>
                            <option value="downloads-low-high">Sort by · Downloads Low → High</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        {sortedInstalledApps.map((app) => (
                            <InstalledAppCard key={app.id} app={app} onUninstall={handleUninstall} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/90 p-12 text-center">
                    <h2 className="text-2xl font-semibold text-slate-900">No installations yet</h2>
                    <p className="mt-3 text-sm text-slate-500">
                        Explore the apps catalogue to find new favourite. Once you install an app, it will show up here instantly.
                    </p>
                    <Link to="/apps" className="btn btn-primary mt-6">
                        Browse apps
                    </Link>
                </div>
            )}
        </section>
    );
};

export default MyInstallation;
