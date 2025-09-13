import React from 'react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiDollarSign,
  FiTarget,
  FiBarChart2,
} from 'react-icons/fi';

const KpiCard = ({ title, value, icon, trend }) => {
  const getIconComponent = iconType => {
    switch (iconType) {
      case '💰':
        return <FiDollarSign className="h-8 w-8 text-green-600" />;
      case '🎯':
        return <FiTarget className="h-8 w-8 text-blue-600" />;
      case '📈':
        return <FiBarChart2 className="h-8 w-8 text-purple-600" />;
      default:
        return <FiBarChart2 className="h-8 w-8 text-gray-600" />;
    }
  };

  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <FiTrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <FiTrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <FiMinus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendColor = trend => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        
        <div className="flex-shrink-0">{getIconComponent(icon)}</div>

        
        <div className="flex-1 ml-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>

        
        <div className="flex-shrink-0 ml-4">
          <div className={`flex items-center ${getTrendColor(trend)}`}>{getTrendIcon(trend)}</div>
        </div>
      </div>

     
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Performance</span>
          <span className={`font-medium ${getTrendColor(trend)}`}>
            {trend === 'up' ? 'Positive' : trend === 'down' ? 'Negative' : 'Neutral'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
