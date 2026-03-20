import React, { useState } from 'react';

const DemoBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center py-2 px-4 text-sm font-medium relative z-50">
      <span>
        This is a <strong>static demo</strong> of AudioScholar — a full-stack lecture-to-notes platform.
        All data is mock data for portfolio display purposes.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-3 text-white/80 hover:text-white font-bold text-lg leading-none"
        aria-label="Dismiss banner"
      >
        &times;
      </button>
    </div>
  );
};

export default DemoBanner;
