import React from 'react';
import MetricCard, { type MetricCardProps } from './MetricsCard';

interface MetricsSectionProps {
  metrics: MetricCardProps[];
}

export default function MetricsSection({ metrics }: MetricsSectionProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          change={metric.change}
        />
      ))}
    </div>
  );
};
