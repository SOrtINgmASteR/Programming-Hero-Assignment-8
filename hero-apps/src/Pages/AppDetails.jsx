import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchAppById, installApp, isAppInstalled, ratingsToChartData, uninstallApp } from '../utils/index.js';
import InstallButton from '../Components/InstallButton.jsx';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaDownload, FaStar, FaUsers } from 'react-icons/fa';
import app_not_found_image from '../assets/App-Error.png';


const formatCompactNumber = (value) =>
    new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value ?? 0);

const AppDetails = () => {
    const { appId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [app, setApp] = useState(null);
    const [installed, setInstalled] = useState(false);

    const handleNavigateBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate('/apps');
    };

    useEffect(() => {
        let isMounted = true;

        const loadApp = async () => {
            setLoading(true);
            const result = await fetchAppById(appId);
            if (!isMounted) {
                return;
            }

            if (!result) {
                setApp(null);
                setLoading(false);
                return;
            }

            setApp(result);
            setLoading(false);
            setInstalled(isAppInstalled(result.id));
        };

        loadApp();

        return () => {
            isMounted = false;
        };
    }, [appId]);

    const handleInstall = () => {
        if (!app) {
            return;
        }
        installApp(app);
        setInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    const handleUninstall = () => {
        if (!app) {
            return;
        }
        uninstallApp(app.id);
        setInstalled(false);
        toast.success(`${app.title} removed from My Installation.`);
    };

    if (loading) {
        return (
            <section className="py-20">
                <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-blue-500" aria-label="Loading app details" />
                </div>
            </section>
        );
    }

    if (!app) {
        return (
            <div className=" flex flex-col gap-3 items-center bg-white m-20 p-5">
                <img src={app_not_found_image} alt="404 Error" />
                <h1 className="text-3xl font-bold text-gray-800">OPPS!! APP NOT FOUND</h1>
                <p className='text-gray-600 mb-4'>The App you are requesting is not found on our system.  please try another apps</p>
                <button
                    type="button"
                    className="btn btn-primary mt-6"
                    onClick={handleNavigateBack}>
                    Go Back
                </button>
            </div>
        );
    }

    const chartData = ratingsToChartData(app.ratings ?? []);

    return (
        <section className="space-y-16 py-16 max-w-[1400px] mx-auto px-4">
            {/* 1 */}
            <div className="space-y-8">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-md">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <div className="relative aspect-square w-full overflow-hidden rounded-3xl lg:w-80 lg:shrink-0">
                            <img
                                src={app.image}
                                alt={app.title}
                                className="h-full w-full rounded-3xl object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-semibold text-slate-900">{app.title}</h1>
                                    <p className="text-sm font-medium uppercase tracking-wider text-gray-800">
                                        Developed By: {app.companyName}
                                    </p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                                                <FaDownload className="text-lg" aria-hidden="true" />
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Downloads
                                            </span>
                                            <span className="text-2xl font-semibold text-slate-900">
                                                {formatCompactNumber(app.downloads)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                                                <FaStar className="text-lg" aria-hidden="true" />
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Average rating
                                            </span>
                                            <span className="text-2xl font-semibold text-slate-900">
                                                {app.ratingAvg.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                                <FaUsers className="text-lg" aria-hidden="true" />
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Total reviews
                                            </span>
                                            <span className="text-2xl font-semibold text-slate-900">
                                                {formatCompactNumber(app.reviews)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <InstallButton
                                    installed={installed}
                                    onInstall={handleInstall}
                                    label={`Install Now (${app.size} MB)`}
                                    className="border-none bg-[#00D390] text-slate-900 hover:bg-[#11e2a0]"
                                />
                                {installed ? (
                                    <button
                                        type="button"
                                        className="btn btn-outline w-full border-red-200 text-red-600 hover:bg-red-50 sm:w-auto"
                                        onClick={handleUninstall}
                                    >
                                        Uninstall
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-md">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">Ratings breakdown</h3>
                    <span className="text-sm text-slate-500">Scroll over bars to inspect</span>
                </div>
                <div className="mt-6 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis type="number" stroke="#475569" />
                            <YAxis type="category" dataKey="name" stroke="#475569" />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,136,17,0.08)' }}
                                contentStyle={{
                                    borderRadius: '1rem',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                                }}
                            />
                            <Bar dataKey="value" fill="#FF8811" radius={[12, 12, 12, 12]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-md">
                <h2 className="text-2xl font-semibold text-slate-900">Why heroes love {app.title}</h2>
                <p className="mt-4 text-base text-slate-600">{app.description}</p>
            </div>

        </section>
    );
};

export default AppDetails;
