'use client';

import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-2 text-left text-black font-medium"
      >
        {title}
        <span className={`transform transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
