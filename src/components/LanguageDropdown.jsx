import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';

export default function LanguageDropdown({ language = 'en', onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const options = [
    { code: 'en', label: 'English', sub: 'English' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', sub: 'Punjabi' }
  ];

  const currentOption = options.find(o => o.code === language) || options[0];

  return (
    <div className="lang-dropdown-wrap" ref={dropdownRef}>
      <button
        type="button"
        className={`btn-lang-dropdown ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch Dashboard Language"
        title={`Dashboard Language: ${currentOption.label}`}
      >
        <Languages size={15} className="lang-icon" />
        <span className="lang-text-desktop">{currentOption.label}</span>
        <span className="lang-text-mobile">{language === 'pa' ? 'ਪੰ' : 'EN'}</span>
        <ChevronDown size={12} className={`lang-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="listbox" aria-label="Select Language">
          <div className="lang-menu-header">SELECT LANGUAGE / ਭਾਸ਼ਾ ਚੁਣੋ</div>
          {options.map(opt => {
            const isSelected = opt.code === language;
            return (
              <div
                key={opt.code}
                className={`lang-dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onLanguageChange(opt.code);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={isSelected}
              >
                <div className="lang-item-content">
                  <span className="lang-item-title">{opt.label}</span>
                  <span className="lang-item-sub">({opt.sub})</span>
                </div>
                {isSelected && <Check size={14} className="lang-item-check" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
