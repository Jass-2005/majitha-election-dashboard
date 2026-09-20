import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Printer } from 'lucide-react';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth,
  onExportBoothPdf,
  partyFilter,
  searchQuery,
  onClearSearch
}) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'GRID';
    }
    return 'LIST';
  });

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'sad', 'aap', 'inc', 'bjp'

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>No booths match {searchQuery ? `"${searchQuery}"` : 'the selected criteria'}.</p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Try searching for a different booth number, village name (e.g. 104, Sohian, ਮਜੀਠਾ) or clear the filter.
        </p>
        {searchQuery && onClearSearch && (
          <button 
            className="btn-registry-reset"
            style={{ marginTop: '14px', display: 'inline-flex' }}
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="booth-container">
      {/* List Header Bar */}
      <div className="booth-list-header">
        <div className="list-title-wrap">
          <span className="list-count-badge">{booths.length} Booths</span>
          <span className="list-filter-label">
            {isAllMode && (
              partyFilter === 'ALL' ? 'Complete Master List (All 187 Booths)' :
              partyFilter === 'SAD_WINS' ? 'Booths Won by SAD in 2024 (129 Booths)' :
              partyFilter === 'AAP_WINS' ? 'Booths Won by AAP in 2024 (39 Booths)' :
              partyFilter === 'BJP_WINS' ? 'Booths Won by BJP in 2024 (10 Booths)' :
              partyFilter === 'INC_WINS' ? 'Booths Won by INC in 2024 (9 Booths)' :
              partyFilter === 'FLIPPED_ONLY' ? 'Flipped Booths (71 Booths - Changed Party)' :
              partyFilter === 'RETAINED_ONLY' ? 'Retained Booths (116 Booths - Same Party)' : 'Booths'
            )}
            {!isAllMode && (
              partyFilter === 'ALL' ? `All 187 Booths for ${selectedParty}` :
              partyFilter === 'WON_BOTH' ? `${selectedParty} Strongholds (Won Both 2022 & 2024)` :
              partyFilter === 'GAINED' ? `${selectedParty} Gains (Won in 2024, Lost in 2022)` :
              partyFilter === 'LOST_24' ? `${selectedParty} Losses (Won in 2022, Lost in 2024)` :
              partyFilter === 'WEAK' ? `Weak Booths for ${selectedParty} (< 20% Vote Share)` :
              partyFilter === 'LOST_BOTH' ? `Booths Lost Both Times by ${selectedParty}` : 'Booths'
            )}
          </span>
        </div>

        <div className="view-toggle-btns">
          <button 
            className={`toggle-btn ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            title="List View"
            aria-label="List View"
          >
            <List size={16} />
            <span>List</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: CLEAN LIST TABLE */}
      {viewMode === 'LIST' && (
        <div className="clean-table-wrap">
          <div className="mobile-table-swipe-hint hide-desktop">
            <span>⇄ Swipe horizontally to view all results</span>
          </div>
          <table className="clean-table">
            <thead>
              {isAllMode ? (
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>No.</th>
                  <th>Locality / Polling Station</th>
                  <th>2022 Winner</th>
                  <th>2024 Winner</th>
                  <th>Shift / Status</th>
                  <th style={{ textAlign: 'right' }}>2024 Turnout</th>
                  <th style={{ textAlign: 'right' }}>Turnout Shift</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>Action</th>
                </tr>
              ) : (
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>No.</th>
                  <th>Locality / Polling Station</th>
                  <th style={{ textAlign: 'right' }}>2022 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>2024 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>Shift</th>
                  <th>2022 Winner</th>
                  <th>2024 Winner</th>
                  <th>Category</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {booths.map((b) => {
                const w22 = b.data_2022?.winner_party || b.winner_22;
                const w24 = b.data_2024?.winner_party || b.winner_24;
                const m22 = b.data_2022?.margin ?? b.margin_22 ?? 0;
                const m24 = b.data_2024?.margin ?? b.margin_24 ?? 0;
                const tot24 = b.data_2024?.total || b.turnout_24 || 0;
                const diff = b.comparison?.turnout_diff ?? b.turnout_diff ?? 0;
                const pct = b.comparison?.turnout_pct ?? b.turnout_pct ?? 0;
                const isFlip = b.comparison?.is_flip ?? b.is_flipped;
                const statusLabel = b.comparison?.status_label || b.status_label || (isFlip ? `${w22} → ${w24}` : `${w24} Retained`);

                if (isAllMode) {
                  return (
                    <tr 
                      key={b.booth_no}
                      onClick={() => onSelectBooth(b)}
                      title={`Click to inspect Booth #${b.booth_no}`}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <span className="booth-avatar-badge">{b.booth_no}</span>
                      </td>

                      <td>
                        <div className="village-en">{b.village_english || b.village_en}</div>
                        <div className="village-pa punjabi-font">{b.village_punjabi || b.village_pa}</div>
                      </td>

                      <td>
                        <span className={`mini-winner ${w22}`}>{w22}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                          +{m22}
                        </span>
                      </td>

                      <td>
                        <span className={`mini-winner ${w24}`}>{w24}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                          +{m24}
                        </span>
                      </td>

                      <td>
                        <span className={`cat-pill ${isFlip ? 'lost' : 'won'}`}>
                          {statusLabel}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {tot24.toLocaleString()}
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                          {diff >= 0 ? `+${diff}` : diff} votes ({pct}%)
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <button
                            className="btn-table-pdf"
                            title={`Export Booth #${b.booth_no} as PDF with Dsidein Watermark`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onExportBoothPdf(b);
                            }}
                          >
                            <Printer size={12} />
                            <span>PDF</span>
                          </button>
                          <button
                            className="btn-table-view"
                            title={`Inspect Booth #${b.booth_no}`}
                            onClick={() => onSelectBooth(b)}
                          >
                            <span>View</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                // Party-Specific Row
                const v22 = b.data_2022?.[pKey] ?? b[`${pKey}_22`] ?? 0;
                const pct22 = b.data_2022?.[`${pKey}_pct`] ?? b[`${pKey}_share_22`] ?? 0.0;
                const v24 = b.data_2024?.[pKey] ?? b[`${pKey}_24`] ?? 0;
                const pct24 = b.data_2024?.[`${pKey}_pct`] ?? b[`${pKey}_share_24`] ?? 0.0;
                const partyDiff = v24 - v22;
                const swing = (pct24 - pct22).toFixed(1);

                let catLabel = 'Lost Both';
                let catClass = 'neutral';
                if (w22 === selectedParty && w24 === selectedParty) {
                  catLabel = 'Won Both';
                  catClass = 'won';
                } else if (w22 !== selectedParty && w24 === selectedParty) {
                  catLabel = 'Gained in ’24';
                  catClass = 'gained';
                } else if (w22 === selectedParty && w24 !== selectedParty) {
                  catLabel = `Lost to ${w24}`;
                  catClass = 'lost';
                }

                if (pct24 < 20.0 && tot24 > 0) {
                  catLabel = 'Weak (<20%)';
                  catClass = 'weak';
                }

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth(b)}
                    title={`Click to inspect Booth #${b.booth_no}`}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <span className="booth-avatar-badge">{b.booth_no}</span>
                    </td>

                    <td>
                      <div className="village-en">{b.village_english || b.village_en}</div>
                      <div className="village-pa punjabi-font">{b.village_punjabi || b.village_pa}</div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v22}</strong>
                      <span className="pct-sub">({pct22}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v24}</strong>
                      <span className="pct-sub">({pct24}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                        {partyDiff >= 0 ? `+${partyDiff}` : partyDiff} votes ({swing > 0 ? `+${swing}%` : `${swing}%`})
                      </span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w22}`}>{w22}</span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w24}`}>{w24}</span>
                    </td>

                    <td>
                      <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          className="btn-table-pdf"
                          title={`Export Booth #${b.booth_no} as PDF with Dsidein Watermark`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExportBoothPdf(b);
                          }}
                        >
                          <Printer size={12} />
                          <span>PDF</span>
                        </button>
                        <button
                          className="btn-table-view"
                          title={`Inspect Booth #${b.booth_no}`}
                          onClick={() => onSelectBooth(b)}
                        >
                          <span>View</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW MODE 2: MINIMAL GRID CARDS */}
      {viewMode === 'GRID' && (
        <div className="grid-cards-layout">
          {booths.map((b) => {
            const w22 = b.data_2022?.winner_party || b.winner_22;
            const w24 = b.data_2024?.winner_party || b.winner_24;
            const m22 = b.data_2022?.margin ?? b.margin_22 ?? 0;
            const m24 = b.data_2024?.margin ?? b.margin_24 ?? 0;
            const tot22 = b.data_2022?.total || b.turnout_22 || 0;
            const tot24 = b.data_2024?.total || b.turnout_24 || 0;
            const diff = b.comparison?.turnout_diff ?? b.turnout_diff ?? 0;
            const isFlip = b.comparison?.is_flip ?? b.is_flipped;
            const statusLabel = b.comparison?.status_label || b.status_label || (isFlip ? `${w22} → ${w24}` : `${w24} Retained`);

            if (isAllMode) {
              return (
                <div 
                  key={b.booth_no} 
                  className="booth-card"
                  onClick={() => onSelectBooth(b)}
                >
                  <div className="card-top-row">
                    <span className="card-booth-badge">#{b.booth_no}</span>
                    <span className={`cat-pill ${isFlip ? 'lost' : 'won'}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div className="card-village-name">{b.village_english || b.village_en}</div>
                  <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.village_pa}</div>

                  <div className="card-stats-box">
                    <div className="card-stat-col">
                      <span className="card-stat-label">2022 Winner</span>
                      <span className={`mini-winner ${w22}`} style={{ marginTop: '3px' }}>
                        {w22} (+{m22})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{tot22} votes</span>
                    </div>

                    <div className="card-stat-col">
                      <span className="card-stat-label">2024 Winner</span>
                      <span className={`mini-winner ${w24}`} style={{ marginTop: '3px' }}>
                        {w24} (+{m24})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{tot24} votes</span>
                    </div>
                  </div>

                  <div className="card-footer-row">
                    <div>
                      <span className="footer-label">Turnout: </span>
                      <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                        {diff >= 0 ? `+${diff}` : diff} votes
                      </span>
                    </div>
                    <button
                      className="btn-card-pdf"
                      title={`Export Booth #${b.booth_no} as PDF`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportBoothPdf(b);
                      }}
                    >
                      <Printer size={12} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            }

            // Party-Specific Card
            const v22 = b.data_2022?.[pKey] ?? b[`${pKey}_22`] ?? 0;
            const pct22 = b.data_2022?.[`${pKey}_pct`] ?? b[`${pKey}_share_22`] ?? 0.0;
            const v24 = b.data_2024?.[pKey] ?? b[`${pKey}_24`] ?? 0;
            const pct24 = b.data_2024?.[`${pKey}_pct`] ?? b[`${pKey}_share_24`] ?? 0.0;
            const partyDiff = v24 - v22;

            let catLabel = 'Lost Both';
            let catClass = 'neutral';
            if (w22 === selectedParty && w24 === selectedParty) {
              catLabel = 'Won Both';
              catClass = 'won';
            } else if (w22 !== selectedParty && w24 === selectedParty) {
              catLabel = 'Gained in ’24';
              catClass = 'gained';
            } else if (w22 === selectedParty && w24 !== selectedParty) {
              catLabel = `Lost to ${w24}`;
              catClass = 'lost';
            }

            if (pct24 < 20.0 && tot24 > 0) {
              catLabel = 'Weak (<20%)';
              catClass = 'weak';
            }

            return (
              <div 
                key={b.booth_no} 
                className="booth-card"
                onClick={() => onSelectBooth(b)}
              >
                <div className="card-top-row">
                  <span className="card-booth-badge">#{b.booth_no}</span>
                  <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                </div>

                <div className="card-village-name">{b.village_english || b.village_en}</div>
                <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.village_pa}</div>

                <div className="card-stats-box">
                  <div className="card-stat-col">
                    <span className="card-stat-label">2022 Votes</span>
                    <strong>{v22}</strong> <span className="pct-sub">({pct22}%)</span>
                    <span className={`mini-winner ${w22}`} style={{ marginTop: '4px' }}>{w22} Won</span>
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label">2024 Votes</span>
                    <strong>{v24}</strong> <span className="pct-sub">({pct24}%)</span>
                    <span className={`mini-winner ${w24}`} style={{ marginTop: '4px' }}>{w24} Won</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <div>
                    <span className="footer-label">Shift: </span>
                    <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                      {partyDiff >= 0 ? `+${partyDiff}` : partyDiff} votes
                    </span>
                  </div>
                  <button
                    className="btn-card-pdf"
                    title={`Export Booth #${b.booth_no} as PDF`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportBoothPdf(b);
                    }}
                  >
                    <Printer size={12} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
