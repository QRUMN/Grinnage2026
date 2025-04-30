import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={cn(
        "flex items-center text-content-700 dark:text-surface-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors",
        className
      )}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
  );
};