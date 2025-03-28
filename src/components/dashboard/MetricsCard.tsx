import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.JSX.Element;
  change: {
    value: string;
    isPositive: boolean;
  };
}

export default function MetricCard({ title, value, icon, change }: MetricCardProps): React.ReactElement {
  return (
    <div
      className="rounded-lg shadow-lg p-5 transition-transform duration-300 hover:scale-105 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}
    >
      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1 pr-4">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-xl font-medium text-white break-words">{value}</h3>
          <div className={`flex items-center mt-2 text-sm ${change.isPositive ? 'text-cyan-400' : 'text-red-400'}`}>
            <span>
              {change.isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
            <span className="ml-1">{change.value}</span>
          </div>
        </div>
        <div className={`p-3 rounded-full flex-shrink-0 ${change.isPositive ? 'bg-cyan-400/20 text-cyan-400' : 'bg-red-400/20 text-red-400'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
