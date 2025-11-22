
import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import EditModal from './EditModal';
import { Edit2 } from 'lucide-react';

interface EditableProps {
  value: string;
  onSave: (value: string) => void;
  type?: 'text' | 'textarea' | 'image';
  className?: string;
  children?: React.ReactNode; // For wrapping images or custom layouts
  label?: string; // Title for the modal
}

const Editable: React.FC<EditableProps> = ({ value, onSave, type = 'text', className = '', children, label }) => {
  const { isEditMode } = useContent();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isEditMode) {
    if (children) return <>{children}</>;
    return <span className={className}>{value}</span>;
  }

  return (
    <>
      <div 
        className={`relative cursor-pointer transition-all duration-200 ${className} ${
          isEditMode ? 'hover:ring-2 hover:ring-blue-500 hover:ring-offset-4 hover:ring-offset-transparent rounded-sm' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        {children ? children : value}
        
        {isHovered && isEditMode && (
          <div className="absolute -top-3 -right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg z-10 pointer-events-none animate-in zoom-in duration-150">
            <Edit2 size={12} />
          </div>
        )}
      </div>

      <EditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
        initialValue={value}
        type={type}
        label={label}
      />
    </>
  );
};

export default Editable;
