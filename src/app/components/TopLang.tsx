import React from 'react';

interface TopStatsBlockProps {
  topLanguages: string[];
  estimatedTime: string;
  contributorRank: number | null;
  nextFetchTime: string;
}

const TopStatsBlock: React.FC<TopStatsBlockProps> = ({
  topLanguages,
  estimatedTime,
  contributorRank,
  nextFetchTime,
}) => {
  return (
    <div className="bg-[#1E1E3F] p-4 rounded-xl flex flex-col items-center justify-center mb-6">
      <p className="text-sm mb-2 text-gray-300">Profile Insights</p>
      <div className="text-center">
        <p className="text-xs text-gray-400">Top Languages:</p>
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {topLanguages.map((lang) => (
            <span
              key={lang}
              className="bg-[#2a2f4a] text-xs px-3 py-1 rounded-full text-white"
            >
              {lang}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          ⏱️ Estimated Time: <span className="text-white font-medium">{estimatedTime}</span>
        </p>
        
        
      </div>
    </div>
  );
};

export default TopStatsBlock;
