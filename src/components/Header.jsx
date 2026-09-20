import React from 'react';
import { Sun, Moon, Menu, ChevronDown, Search, X } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';

export default function Header({ 
  theme, 
  toggleTheme, 
  onMenuClick,
  searchQuery,
  setSearchQuery,
  filteredCount,
  language = 'en',
  onLanguageChange,
  t
}) {
  return (
    <header className="app-header no-print">
      <div className="header-container">
        {/* Left: Hamburger & Dashboard Label */}
        <div className="header-left">
          <button 
            className="btn-icon header-hamburger" 
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="header-section-label">
            <span className="section-title-text">{t?.header_section || 'DASHBOARD'}</span>
            <span className="header-separator">/</span>
            <span className="header-crumb">{t?.header_crumb || '13-MAJITHA'}</span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="header-center-search">
          <div className="header-search-box">
            <Search size={15} className="header-search-icon" />
            <input 
              type="text" 
              className="header-search-input"
              placeholder={t?.search_placeholder_desktop || 'Search 187 booths, localities, numbers...'}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search booths or villages"
            />
            {searchQuery && (
              <span className="search-results-pill">{filteredCount ?? 0}</span>
            )}
            {searchQuery && (
              <button 
                className="btn-clear-search" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Language, Theme & Dsidein User Profile */}
        <div className="header-right">
          {/* Language Switcher Dropdown */}
          <LanguageDropdown 
            language={language} 
            onLanguageChange={onLanguageChange} 
          />

          {/* Theme Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            title={theme === 'dark' ? (t?.theme_switch_light || 'Switch to Light Mode') : (t?.theme_switch_dark || 'Switch to Dark Mode')}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Dsidein User Profile Dropdown */}
          <div className="dsidein-user-profile" title="Dsidein Command Center User">
            <div className="user-avatar-circle">
              <img 
                src="./dsidein_logo_transparent.png" 
                alt="Dsidein" 
                className="user-avatar-img" 
              />
            </div>
            <span className="user-profile-name">Dsidein</span>
            <ChevronDown size={14} className="user-chevron" />
          </div>
        </div>
      </div>

      {/* Mobile Dedicated Search Bar (Visible only on mobile screen) */}
      <div className="header-mobile-search-bar hide-desktop">
        <div className="header-search-box mobile">
          <Search size={15} className="header-search-icon" />
          <input 
            type="text" 
            className="header-search-input mobile-input"
            placeholder={t?.search_placeholder_mobile || 'Search booth number, village, or locality...'}
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search 187 booths"
          />
          {searchQuery && (
            <span className="search-results-pill">{filteredCount ?? 0}</span>
          )}
          {searchQuery && (
            <button 
              className="btn-clear-search" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
