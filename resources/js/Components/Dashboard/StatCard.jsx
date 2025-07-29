import React from 'react';

const StatCard = ({ title, value, icon, color = 'blue', trend = null }) => {
    const colorClasses = {
        blue: 'text-blue-600',
        green: 'text-emerald-600',
        purple: 'text-violet-600',
        orange: 'text-orange-600',
        red: 'text-red-600'
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200/60 p-6 hover:border-gray-300/60 transition-all duration-200 hover:shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
                    <p className="text-3xl font-semibold text-gray-900 tracking-tight">{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-3 text-sm font-medium ${trend.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                            <span className="mr-1">
                                {trend.positive ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                            {trend.value}
                        </div>
                    )}
                </div>
                <div className={`p-2.5 rounded-md bg-gray-50 ${colorClasses[color]}`}>
                    <div className="w-5 h-5">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;