import appsDataset from '../data/apps.json';

const DEFAULT_DELAY = 320;

const sleep = (duration = DEFAULT_DELAY) =>
    new Promise((resolve) => setTimeout(resolve, duration));

const cloneApps = () => JSON.parse(JSON.stringify(appsDataset));

export const fetchApps = async (delay = DEFAULT_DELAY) => {
    await sleep(delay);
    return cloneApps();
};

export const fetchAppById = async (id, delay = DEFAULT_DELAY) => {
    const apps = await fetchApps(delay);
    return apps.find((app) => app.id === Number(id)) ?? null;
};

export const selectTopApps = (apps, limit = 8) =>
    apps
        .slice()
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, limit);

export const searchApps = (apps, query) => {
    const text = query.trim().toLowerCase();
    if (!text) {
        return apps;
    }
    return apps.filter((app) => app.title.toLowerCase().includes(text));
};

export const sortByDownloads = (apps, order = 'default') => {
    if (order === 'high-low') {
        return apps.slice().sort((a, b) => b.downloads - a.downloads);
    }
    if (order === 'low-high') {
        return apps.slice().sort((a, b) => a.downloads - b.downloads);
    }
    return apps;
};

export const buildAggregateStats = (apps) => {
    const totalDownloads = apps.reduce((sum, app) => sum + app.downloads, 0);
    const totalReviews = apps.reduce((sum, app) => sum + app.reviews, 0);
    const ratingAverage =
        apps.reduce((sum, app) => sum + app.ratingAvg, 0) / Math.max(apps.length, 1);

    return {
        totalDownloads,
        totalReviews,
        ratingAverage: Number(ratingAverage.toFixed(2)),
    };
};

export const ratingsToChartData = (ratings) =>
    ratings.map((rating) => ({
        name: rating.name,
        value: rating.count,
        star: rating.name.replace(/[^0-9]/g, '') || rating.name,
    }));

export { sleep };
