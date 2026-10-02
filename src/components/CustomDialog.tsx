import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  isPrompt?: boolean;
  promptPlaceholder?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (val?: string) => void;
  onCancel: () => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title,
  description,
  isPrompt = false,
  promptPlaceholder = '',
  defaultValue = '',
  confirmText = 'Tamam',
  cancelText = 'Vazgeç',
  onConfirm,
  onCancel
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 space-y-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

        {isPrompt && (
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={promptPlaceholder}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onConfirm(inputValue);
                } else if (e.key === 'Escape') {
                  onCancel();
                }
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2">
          {isPrompt && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => onConfirm(inputValue)}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
