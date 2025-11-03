import React, { useEffect, useMemo, useState } from 'react';
import AppCard from '../Components/AppCard.jsx';
import { fetchApps, searchApps, sortByDownloads } from '../utils/index.js';

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'high-low', label: 'Downloads · High → Low' },
    { value: 'low-high', label: 'Downloads · Low → High' },
];

const Apps = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [searchLoading, setSearchLoading] = useState(false);
    const [visibleApps, setVisibleApps] = useState([]);

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

    useEffect(() => {
        if (!apps.length) {
            setVisibleApps([]);
            return;
        }

        setSearchLoading(true);
        const handle = setTimeout(() => {
            const searched = searchApps(apps, searchTerm);
            const sorted = sortByDownloads(searched, sortOrder);
            setVisibleApps(sorted);
            setSearchLoading(false);
        }, 320);

        return () => clearTimeout(handle);
    }, [apps, searchTerm, sortOrder]);

    const totalCount = useMemo(() => apps.length, [apps]);

    return (
        <section className="space-y-12 py-16 max-w-[1400px] mx-auto px-4">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-semibold text-slate-900">Browse Our All Applications</h1>
                <p className="mx-auto max-w-2xl text-base text-slate-500">Explore All Apps on the Market developed by us. We code for Millions</p>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm lg:flex-row lg:items-center lg:gap-6">
                <span className="shrink-0 text-lg font-semibold text-slate-600 lg:w-40">
                    ({totalCount}) Apps Found
                </span>

                <div className="relative w-full lg:flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        🔍
                    </span>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search apps by title"
                        className="input input-bordered w-full border-slate-200 bg-white pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="w-full sm:w-60 lg:w-48">
                    <select
                        className="select select-bordered w-full border-slate-200 text-sm focus:border-blue-500 focus:outline-none"
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value)}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-64 rounded-3xl border border-slate-200 bg-white/60 shadow-sm"
                        >
                            <div className="h-full animate-pulse rounded-3xl bg-slate-200/70" />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {searchLoading ? (
                        <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white/80 py-16">
                            <span className="loading loading-spinner loading-lg text-blue-500" aria-label="Loading results" />
                        </div>
                    ) : visibleApps.length ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visibleApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center">
                            <h2 className="text-2xl font-semibold text-slate-900">No app found</h2>
                            <p className="mt-3 text-sm text-slate-500">
                                Try adjusting your search or removing filters to see more results.
                            </p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Apps;
