import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaDownload } from 'react-icons/fa';

const formatNumber = (value) =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const AppCard = ({ app, variant = 'default', className = '' }) => {
    if (!app) {
        return null;
    }

    const cardStyles =
        variant === 'compact'
            ? 'group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg'
            : 'group flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl';

    return (
        <Link to={`/apps/${app.id}`} className={`${cardStyles} ${className}`}>
            <div className="relative overflow-hidden rounded-2xl">
                <img
                    src={app.image}
                    alt={app.title}
                    loading="lazy"
                    className="h-70 w-full rounded-2xl object-cover transition-transform duration-200 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="truncate text-lg font-semibold text-slate-900">{app.title}</h3>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center gap-2 text-sm text-green-800 bg-green-100 p-2 rounded-lg">
                        <FaDownload className="text-green-800 h-3 w-3" />
                        {formatNumber(app.downloads)}
                    </span>
                    <span className="flex items-center gap-2 font-semibold text-yellow-700 bg-yellow-100 p-2 rounded-lg">
                        <FaStar className="text-yellow-700 h-3 w-3" />
                        {app.ratingAvg.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-2 text-blue-600 group-hover:gap-3">
                        View details
                        <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default AppCard;
