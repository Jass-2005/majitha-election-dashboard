import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import electionData from './data/majitha_comparison_data.json';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PartyHub from './components/PartyHub';
import BoothGrid from './components/BoothGrid';
import BoothModal from './components/BoothModal';
import CustomDropdown from './components/CustomDropdown';
import { 
  Search, 
  RotateCcw, 
  Printer, 
  MapPin, 
  Users, 
  FileSpreadsheet, 
  Compass, 
  Layers, 
  Activity, 
  CheckCircle2, 
  BarChart3,
  ExternalLink,
  ShieldAlert,
  Database,
  ClipboardList,
  X
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedParty, setSelectedParty] = useState('ALL'); // 'ALL', 'SAD', 'AAP', 'INC', 'BJP'
  const [partyFilter, setPartyFilter] = useState('ALL'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('BOOTH_ASC');
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'DASHBOARD') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'PARTY_HUB') {
      const el = document.querySelector('.dsidein-registry-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'BOOTHS') {
      const el = document.querySelector('.booth-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { summary, booths } = electionData;

  // Dynamic stats calculation for all parties directly from verified data
  const partyStats = useMemo(() => {
    const sortedSad = [...booths].sort((a, b) => (b.data_2024?.sad || b.sad_24 || 0) - (a.data_2024?.sad || a.sad_24 || 0));
    const sortedAap = [...booths].sort((a, b) => (b.data_2024?.aap || b.aap_24 || 0) - (a.data_2024?.aap || a.aap_24 || 0));
    const sortedInc = [...booths].sort((a, b) => (b.data_2024?.inc || b.inc_24 || 0) - (a.data_2024?.inc || a.inc_24 || 0));
    const sortedBjp = [...booths].sort((a, b) => (b.data_2024?.bjp || b.bjp_24 || 0) - (a.data_2024?.bjp || a.bjp_24 || 0));

    const calcParty = (pCode, cand22, cand24, sortedList) => {
      const pKey = pCode.toLowerCase();
      const v22 = summary?.party_votes_2022?.[pCode] || 0;
      const s22 = summary?.party_shares_2022?.[pCode] || 0.0;
      const v24 = summary?.party_votes_2024?.[pCode] || 0;
      const s24 = summary?.party_shares_2024?.[pCode] || 0.0;
      const diff = v24 - v22;
      const swing = Number((s24 - s22).toFixed(2));

      return {
        code: pCode,
        candidate_2022: cand22,
        candidate_2024: cand24,
        votes_2022: v22,
        share_2022: s22,
        votes_2024: v24,
        share_2024: s24,
        vote_diff: diff,
        swing: swing,
        booths_won_2022: summary?.booths_won_2022?.[pCode] || 0,
        booths_won_2024: summary?.booths_won_2024?.[pCode] || 0,
        won_both_count: booths.filter(b => b.categories?.[pCode] === 'WON_BOTH').length,
        gained_count: booths.filter(b => b.categories?.[pCode] === 'GAINED').length,
        lost_24_count: booths.filter(b => b.categories?.[pCode] === 'LOST_24').length,
        weak_count: booths.filter(b => b.categories?.[pCode] === 'WEAK').length,
        lost_both_count: booths.filter(b => b.categories?.[pCode] === 'LOST_BOTH').length,
        top_booth: {
          no: sortedList[0]?.booth_no || 0,
          name: sortedList[0]?.village_english || sortedList[0]?.village_en || '',
          votes: sortedList[0]?.data_2024?.[pKey] || sortedList[0]?.[`${pKey}_24`] || 0
        }
      };
    };

    return {
      SAD: calcParty('SAD', 'Ganieve Kaur Majithia', 'Anil Joshi', sortedSad),
      AAP: calcParty('AAP', 'Sukhjinder Raj Singh (Lalli)', 'Kuldeep Singh Dhaliwal', sortedAap),
      INC: calcParty('INC', 'Jagwinder Pal Singh Jagga', 'Gurjeet Singh Aujla', sortedInc),
      BJP: calcParty('BJP', 'Pardeep Singh', 'Taranjit Singh Sandhu Samundri', sortedBjp)
    };
  }, [booths, summary]);

  // Filtering & Sorting
  const filteredBooths = useMemo(() => {
    let result = [...booths];

    // 1. Search Query
    if (searchQuery.trim()) {
      const rawQ = searchQuery.toLowerCase().trim();
      const cleanNum = rawQ.replace(/^(booth|b|#)\s*[-:]?\s*/i, '').trim();
      result = result.filter(b => {
        const bNo = b.booth_no.toString().toLowerCase();
        const vEn = (b.village_english || b.village_en || '').toLowerCase();
        const vPa = (b.village_punjabi || b.village_pa || '');
        
        return (
          bNo === rawQ ||
          bNo === cleanNum ||
          (cleanNum.length > 0 && bNo.startsWith(cleanNum)) ||
          vEn.includes(rawQ) ||
          vPa.includes(rawQ)
        );
      });
    }

    // 2. Party Selector & Sub-Filter Pills
    if (selectedParty !== 'ALL') {
      if (partyFilter !== 'ALL') {
        result = result.filter(b => b.categories?.[selectedParty] === partyFilter);
      }
    } else {
      if (partyFilter === 'SAD_WINS') {
        result = result.filter(b => (b.winner_24 === 'SAD' || b.data_2024?.winner === 'SAD'));
      } else if (partyFilter === 'AAP_WINS') {
        result = result.filter(b => (b.winner_24 === 'AAP' || b.data_2024?.winner === 'AAP'));
      } else if (partyFilter === 'BJP_WINS') {
        result = result.filter(b => (b.winner_24 === 'BJP' || b.data_2024?.winner === 'BJP'));
      } else if (partyFilter === 'INC_WINS') {
        result = result.filter(b => (b.winner_24 === 'INC' || b.data_2024?.winner === 'INC'));
      } else if (partyFilter === 'FLIPPED_ONLY' || partyFilter === 'FLIPPED') {
        result = result.filter(b => b.is_flipped);
      } else if (partyFilter === 'RETAINED_ONLY' || partyFilter === 'RETAINED') {
        result = result.filter(b => !b.is_flipped);
      } else if (partyFilter === 'SWING_HIGH') {
        result = result.filter(b => Math.abs(b.swings?.aap_swing || b.aap_swing || 0) >= 10.0);
      }
    }

    // 3. Sorting
    result.sort((a, b) => {
      const bNoA = parseInt(a.booth_no) || 0;
      const bNoB = parseInt(b.booth_no) || 0;
      
      switch (sortBy) {
        case 'BOOTH_ASC':
          return bNoA - bNoB;
        case 'BOOTH_DESC':
          return bNoB - bNoA;
        case 'SAD_VOTES_DESC':
          return (b.data_2024?.sad || b.sad_24 || 0) - (a.data_2024?.sad || a.sad_24 || 0);
        case 'AAP_VOTES_DESC':
          return (b.data_2024?.aap || b.aap_24 || 0) - (a.data_2024?.aap || a.aap_24 || 0);
        case 'INC_VOTES_DESC':
          return (b.data_2024?.inc || b.inc_24 || 0) - (a.data_2024?.inc || a.inc_24 || 0);
        case 'BJP_VOTES_DESC':
          return (b.data_2024?.bjp || b.bjp_24 || 0) - (a.data_2024?.bjp || a.bjp_24 || 0);
        case 'MARGIN_DESC':
          return (b.margin_24 || 0) - (a.margin_24 || 0);
        case 'SWING_DESC':
          return (b.swings?.aap_swing || b.aap_swing || 0) - (a.swings?.aap_swing || a.aap_swing || 0);
        case 'TURNOUT_DESC':
          return (b.data_2024?.total || b.turnout_24 || 0) - (a.data_2024?.total || a.turnout_24 || 0);
        default:
          return bNoA - bNoB;
      }
    });

    return result;
  }, [booths, searchQuery, selectedParty, partyFilter, sortBy]);

  const handleResetToCompleteList = () => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
  };

  const handlePrintMasterReport = () => {
    window.print();
  };

  const handleExportBoothPdf = (booth) => {
    setSelectedBooth(booth);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const sortOptions = [
    { value: 'BOOTH_ASC', label: 'Booth Number (1 → 187)' },
    { value: 'BOOTH_DESC', label: 'Booth Number (187 → 1)' },
    { value: 'SAD_VOTES_DESC', label: 'SAD Votes 2024 (Highest First)' },
    { value: 'AAP_VOTES_DESC', label: 'AAP Votes 2024 (Highest First)' },
    { value: 'INC_VOTES_DESC', label: 'INC Votes 2024 (Highest First)' },
    { value: 'BJP_VOTES_DESC', label: 'BJP Votes 2024 (Highest First)' },
    { value: 'MARGIN_DESC', label: 'Victory Margin 2024 (Highest First)' },
    { value: 'SWING_DESC', label: 'AAP Swing % (Highest Gain)' },
    { value: 'TURNOUT_DESC', label: '2024 Total Polled Votes (Highest First)' },
  ];

  return (
    <div className="dsidein-app-root">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="dsidein-content-canvas">
        {/* Top Header Bar */}
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onMenuClick={() => setMobileMenuOpen(prev => !prev)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCount={filteredBooths.length}
        />

        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">FIELD INTELLIGENCE & TELEMETRY</div>
          <div className="watermark-url">https://dsidein.com/majitha-2022-2024</div>
        </div>

        {/* Print Master Report Header */}
        <div className="print-report-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '15pt', fontWeight: 800, color: '#002b49' }}>
                13-MAJITHA ASSEMBLY SEGMENT (AMRITSAR PC)
              </div>
              <div style={{ fontSize: '10pt', color: '#475569', marginTop: '2px' }}>
                Comparative Booth Intelligence: 2022 Vidhan Sabha vs 2024 Lok Sabha Polling
              </div>
              <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '4px' }}>
                Active Filter: {selectedParty === 'ALL' ? 'Complete Master List' : `${selectedParty} Segment`} | Total Booths: {filteredBooths.length} of 187
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/majitha-2022-2024</span>
            </div>
          </div>
        </div>

        {/* Scrollable Main Dashboard Area */}
        <main className="dsidein-main-body">
          {/* Refined Page Title Bar */}
          <section className="dashboard-title-bar">
            <div className="title-text-group">
              <div className="constituency-tag">13-MAJITHA ASSEMBLY SEGMENT</div>
              <h1 className="main-title">Comparative Booth Intelligence</h1>
              <p className="main-subtitle">
                2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all 187 Polling Stations (Amritsar PC)
              </p>
            </div>

            <div className="title-action-buttons">
              <a 
                href="./Majitha_Master_Booth_Analysis_AAP_INC.xlsx" 
                download="Majitha_Master_Booth_Analysis_AAP_INC.xlsx"
                className="pill-action-btn green"
                title="Download Master Analysis Spreadsheet (Excel .xlsx with SAD/AAP/INC/BJP Sheets)"
              >
                <span className="pill-btn-icon"><FileSpreadsheet size={14} /></span>
                <span className="pill-btn-label">Master Excel</span>
              </a>

              <a 
                href="./Majitha_Detailed_Boothwise_Masterplan.pdf" 
                download="Majitha_Detailed_Boothwise_Masterplan.pdf"
                className="pill-action-btn purple"
                title="Download Complete 187-Booth Master Plan in English (PDF with Watermark)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">Master Plan (English PDF)</span>
              </a>

              <a 
                href="./Majitha_Detailed_Boothwise_Masterplan_Punjabi.pdf" 
                download="Majitha_Detailed_Boothwise_Masterplan_Punjabi.pdf"
                className="pill-action-btn amber"
                title="Download 187 Boothwise Detailed Field Operations Plan in Punjabi (PDF with Watermark)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">187 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ (ਪੰਜਾਬੀ PDF)</span>
              </a>

              <button 
                onClick={handlePrintMasterReport}
                className="pill-action-btn outline"
                title="Export Current View as PDF with Dsidein Watermark"
              >
                <span className="pill-btn-icon"><Printer size={14} /></span>
                <span className="pill-btn-label">Export PDF</span>
              </button>
            </div>
          </section>

          {/* Dsidein 4 Minimal KPI Metric Cards */}
          <section className="dsidein-kpi-grid">
            {/* KPI 1: Total Polling Stations */}
            <div className="dsidein-kpi-card">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-blue">
                  <Compass size={18} />
                </div>
              </div>
              <div className="kpi-label">POLLING STATIONS</div>
              <div className="kpi-value text-blue">187 Booths</div>
              <div className="kpi-sub-pill text-blue">
                ● 100% Monitored & Verified
              </div>
            </div>

            {/* KPI 2: Total EVM Votes */}
            <div className="dsidein-kpi-card">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-orange">
                  <Activity size={18} />
                </div>
              </div>
              <div className="kpi-label">2024 EVM POLLED</div>
              <div className="kpi-value">103,790</div>
              <div className="kpi-sub-pill text-orange">
                ● 100% Form-20 EVM Match
              </div>
            </div>

            {/* KPI 3: SAD - Segment Leader */}
            <div className="dsidein-kpi-card sad-kpi">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-blue">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="kpi-label">SAD (ANIL JOSHI)</div>
              <div className="kpi-value text-blue">40,981</div>
              <div className="kpi-sub-pill text-blue">
                ● 129 Wins (39.5% Share | +12,451 Lead)
              </div>
            </div>

            {/* KPI 4: AAP - Rural Surge */}
            <div className="dsidein-kpi-card aap-kpi">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-orange">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="kpi-label">AAP (KULDEEP DHALIWAL)</div>
              <div className="kpi-value text-orange">28,530</div>
              <div className="kpi-sub-pill text-orange">
                ● 39 Wins (27.5% Share | +22 Booth Gain)
              </div>
            </div>
          </section>

          {/* Unified Registry Card */}
          <section className="dsidein-registry-card">
            {/* Card Top Title Row */}
            <div className="registry-card-header">
              <div className="registry-title-group">
                <div className="registry-title-row">
                  <h2 className="registry-title">Booth Performance Registry</h2>
                  <span className="registry-booth-count">{filteredBooths.length} Booths</span>
                </div>
                <p className="registry-subtitle">
                  Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across 13-Majitha
                </p>
              </div>

              <div className="registry-header-actions">
                <button 
                  className="btn-registry-reset"
                  onClick={handleResetToCompleteList}
                  title="Reset all filters to complete view"
                >
                  <RotateCcw size={14} />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Party Selector & Category Filter Pills */}
            <PartyHub 
              selectedParty={selectedParty}
              setSelectedParty={setSelectedParty}
              partyFilter={partyFilter}
              setPartyFilter={setPartyFilter}
              partyStats={partyStats}
              summary={summary}
            />

            {/* Search & Sort Sub-Toolbar */}
            <div className="registry-toolbar">
              <div className="toolbar-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder={
                    selectedParty === 'ALL'
                      ? 'Search all 187 booths by number or locality (e.g. 104, Kathu Nangal, ਕੱਥੂਨੰਗਲ)...'
                      : `Search ${selectedParty} performance by booth no. or locality (e.g. 25, Chawinda Devi)...`
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Filter booths"
                />
                {searchQuery && (
                  <button 
                    className="btn-clear-search toolbar-clear" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="toolbar-controls">
                <button
                  onClick={handlePrintMasterReport}
                  className="btn-toolbar-pdf"
                  title="Export Current Table View as PDF with Dsidein Watermark"
                >
                  <Printer size={14} />
                  <span>Export PDF</span>
                </button>

                <CustomDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  label="Sort order"
                />
              </div>
            </div>

            {/* Booth Table / Grid */}
            <BoothGrid 
              booths={filteredBooths}
              selectedParty={selectedParty}
              partyFilter={partyFilter}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onSelectBooth={(b) => setSelectedBooth(b)}
              onExportBoothPdf={handleExportBoothPdf}
            />
          </section>
        </main>
      </div>

      {/* Booth Inspector Modal */}
      {selectedBooth && (
        <BoothModal 
          booth={selectedBooth}
          onClose={() => setSelectedBooth(null)}
        />
      )}
    </div>
  );
}
