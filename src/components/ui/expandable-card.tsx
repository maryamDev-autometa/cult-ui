import React, { useState } from 'react';

interface ExpandableCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  expandedContent?: React.ReactNode;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  category,
  description,
  image,
  expandedContent
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-lg transition-all duration-500 cursor-pointer ${
        isExpanded ? 'col-span-full row-span-2' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Container */}
      <div className={`relative ${isExpanded ? 'h-[600px]' : 'h-full'}`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isExpanded ? 'scale-110' : 'group-hover:scale-105'
            }`}
          />
          <div className={`absolute inset-0 transition-colors duration-500 ${
            isExpanded ? 'bg-black/70' : 'bg-black/40 hover:bg-black/50'
          }`}></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          {!isExpanded ? (
            // Collapsed View
            <>
              <span className="text-xs font-sans tracking-widest mb-2 uppercase">
                {category}
              </span>
              <h3 className="font-display text-3xl font-bold mb-2">
                {title}
              </h3>
              <p className="font-sans text-sm text-gray-200">
                {description}
              </p>
            </>
          ) : (
            // Expanded View
            <div className="h-full flex flex-col">
              <button
                className="self-end text-white text-2xl mb-4 hover:opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                ✕
              </button>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-sm font-sans tracking-widest mb-3 uppercase">
                  {category}
                </span>
                <h3 className="font-display text-5xl font-bold mb-6">
                  {title}
                </h3>
                <p className="font-sans text-lg text-gray-200 mb-6 max-w-2xl">
                  {description}
                </p>
                {expandedContent && (
                  <div className="font-sans text-base text-gray-300 max-w-3xl">
                    {expandedContent}
                  </div>
                )}
                <button
                  className="mt-6 bg-white text-black px-8 py-3 font-sans text-sm tracking-widest hover:bg-gray-200 transition-colors rounded-sm w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  READ MORE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpandableCard;
