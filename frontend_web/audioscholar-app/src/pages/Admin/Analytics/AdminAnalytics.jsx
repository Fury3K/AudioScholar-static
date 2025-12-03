import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/adminService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const SimpleBarChart = ({ data, title, colorClass }) => {
  if (!data || Object.keys(data).length === 0) return <div className="text-gray-500 italic">No data available</div>;

  // Sort keys (dates)
  const sortedKeys = Object.keys(data).sort();
  const maxVal = Math.max(...Object.values(data));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-2">
        {sortedKeys.map(key => {
          const val = data[key];
          const percentage = maxVal > 0 ? (val / maxVal) * 100 : 0;
          return (
            <div key={key} className="flex items-center text-sm">
              <span className="w-24 text-gray-500 truncate">{key}</span>
              <div className="flex-1 mx-3 h-4 bg-gray-100 rounded overflow-hidden">
                <div 
                  className={`h-full rounded ${colorClass}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-right font-medium text-gray-700">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PieChart = ({ data, title }) => {
  if (!data || Object.keys(data).length === 0) return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="text-gray-500 italic">No data available</div>
    </div>
  );

  const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);
  let currentAngle = 0;
  
  const slices = Object.entries(data).map(([label, value], index) => {
    const percentage = value / total;
    const angle = percentage * 360;
    
    const x1 = 50 + 40 * Math.cos(Math.PI * currentAngle / 180);
    const y1 = 50 + 40 * Math.sin(Math.PI * currentAngle / 180);
    
    const endAngle = currentAngle + angle;
    
    const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
    const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    const slice = {
      path: pathData,
      color: COLORS[index % COLORS.length],
      label,
      value,
      percentage: (percentage * 100).toFixed(1)
    };
    
    currentAngle += angle;
    return slice;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-grow">
        <div className="w-48 h-48 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {total === 0 && (
               <circle cx="50" cy="50" r="40" fill="#f3f4f6" />
            )}
            {slices.map((slice, i) => (
              <path 
                key={i} 
                d={slice.path} 
                fill={slice.color} 
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
              </path>
            ))}
             {slices.length === 1 && (
                 <circle cx="50" cy="50" r="40" fill={slices[0].color} />
             )}
          </svg>
        </div>
        
        <ul className="space-y-2 w-full max-w-xs">
          {slices.map((slice, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: slice.color }}
                ></span>
                <span className="text-gray-600 truncate max-w-[120px]" title={slice.label}>
                  {slice.label.replace('ROLE_', '').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <span className="font-bold text-gray-800">{slice.value} ({slice.percentage}%)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  const [activity, setActivity] = useState(null);
  const [distribution, setDistribution] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activityData, distData, engData] = await Promise.all([
          adminService.getActivityStats(),
          adminService.getUserDistribution(),
          adminService.getContentEngagement()
        ]);
        
        setActivity(activityData);
        setDistribution(distData);
        setEngagement(engData);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading analytics...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Platform Analytics</h1>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart 
          title="New Users (Last 30 Days)" 
          data={activity?.newUsersLast30Days} 
          colorClass="bg-blue-500" 
        />
        <SimpleBarChart 
          title="New Recordings (Last 30 Days)" 
          data={activity?.newRecordingsLast30Days} 
          colorClass="bg-teal-500" 
        />
      </div>

      {/* Distribution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChart 
          title="User Roles" 
          data={distribution?.usersByRole} 
        />
        <PieChart 
          title="Login Providers" 
          data={distribution?.usersByProvider} 
        />
      </div>

      {/* Engagement Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Top Content (By Favorites)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 text-right">Favorites</th>
              </tr>
            </thead>
            <tbody>
              {engagement && engagement.length > 0 ? (
                engagement.map((item) => (
                  <tr key={item.recordingId} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.title || 'Untitled Recording'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.favoriteCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center">No engagement data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
