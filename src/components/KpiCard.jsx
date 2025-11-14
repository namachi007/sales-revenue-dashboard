import React from 'react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiDollarSign,
  FiTarget,
  FiBarChart2,
} from 'react-icons/fi';

const gradientMap = {
  '💰': 'from-emerald-50 via-white to-white',
  '🎯': 'from-blue-50 via-white to-white',
  '📈': 'from-indigo-50 via-white to-white',
};

const iconAccentMap = {
  '💰': 'text-emerald-500',
  '🎯': 'text-sky-500',
  '📈': 'text-indigo-500',
};

const KpiCard = ({ title, value, icon, trend }) => {
  const getIconComponent = iconType => {
    switch (iconType) {
      case '💰':
        return <FiDollarSign className="h-6 w-6" />;
      case '🎯':
        return <FiTarget className="h-6 w-6" />;
      case '📈':
        return <FiBarChart2 className="h-6 w-6" />;
      default:
        return <FiBarChart2 className="h-6 w-6" />;
    }
  };

  const getTrendIcon = trendValue => {
    switch (trendValue) {
      case 'up':
        return <FiTrendingUp className="h-4 w-4" />;
      case 'down':
        return <FiTrendingDown className="h-4 w-4" />;
      default:
        return <FiMinus className="h-4 w-4" />;
    }
  };

  const getTrendColor = trendValue => {
    switch (trendValue) {
      case 'up':
        return 'text-emerald-600';
      case 'down':
        return 'text-rose-600';
      default:
        return 'text-slate-500';
    }
  };

  const getTrendLabel = trendValue => {
    switch (trendValue) {
      case 'up':
        return 'Growing';
      case 'down':
        return 'Declining';
      default:
        return 'Steady';
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${
        gradientMap[icon] || 'from-slate-50 to-white'
      } p-6 shadow-xl ring-1 ring-black/5 transition duration-300 hover:-translate-y-1`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true">
        <div className="h-full w-full bg-gradient-to-br from-white/0 via-white/40 to-white/70" />
      </div>
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-xl font-semibold ${
              iconAccentMap[icon] || 'text-indigo-500'
            }`}
          >
            {getIconComponent(icon)}
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span>{getTrendLabel(trend)}</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          <p className="mt-3 text-xs text-slate-500">vs previous period</p>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
