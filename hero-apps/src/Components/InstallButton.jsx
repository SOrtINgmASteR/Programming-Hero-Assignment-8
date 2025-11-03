import React from 'react';

const InstallButton = ({ installed, onInstall, disabled, label, className = '' }) => {
    const handleClick = () => {
        if (!installed && onInstall) {
            onInstall();
        }
    };

    const buttonLabel = installed ? 'Installed' : label ?? 'Install';

    const nonInstalledClasses = className || 'btn-primary';

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={installed || disabled}
            className={`btn w-full sm:w-auto ${
                installed
                    ? 'btn-disabled border-slate-200 bg-slate-100 text-slate-500'
                    : nonInstalledClasses
            }`}
            aria-live="polite"
        >
            {buttonLabel}
        </button>
    );
};

export default InstallButton;
