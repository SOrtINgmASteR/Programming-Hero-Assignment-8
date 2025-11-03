import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaDownload, FaHdd, FaStar } from 'react-icons/fa';

const formatDownloads = (value) =>
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const formatAppSize = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return null;
    }

    if (value >= 1024) {
        return `${(value / 1024).toFixed(1)} GB`;
    }

    return `${value} MB`;
};

const InstalledAppCard = ({ app, onUninstall }) => {
    if (!app) {
        return null;
    }

    const formattedSize = formatAppSize(app.size);

    return (
        <div className="group flex justify-between items-center gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:w-48">
                    <img
                        src={app.image}
                        alt={app.title}
                        loading="lazy"
                        className="h-full w-full rounded-2xl object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-around gap-4">
                    <div className="space-y-2">
                        <Link
                            to={`/apps/${app.id}`}
                            className="flex items-center gap-2 text-3xl font-semibold text-slate-900 transition-colors duration-200 hover:text-blue-600">
                            {app.title}
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-2 text-sm text-green-800 bg-green-100 p-2 rounded-lg">
                            <FaDownload className="text-green-800 h-3 w-3" />
                            {formatDownloads(app.downloads)} downloads
                        </span>
                        <span className="flex items-center gap-2 text-sm text-yellow-800 bg-yellow-100 p-2 rounded-lg">
                            <FaStar className="text-amber-400" />
                            {app.ratingAvg.toFixed(1)} rating
                        </span>
                        {formattedSize ? (
                            <span className="flex items-center gap-2 text-sm text-blue-800 bg-blue-100 p-2 rounded-lg">
                                <FaHdd className="text-blue-700 h-3 w-3" />
                                {formattedSize}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="">
                <button
                    type="button"
                    className="btn btn-primary bg-green-500 hover:scale-105 border-green-600"
                    onClick={() => onUninstall?.(app.id)}>
                    Uninstall
                </button>
            </div>
        </div>
    );
};

export default InstalledAppCard;
