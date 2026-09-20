import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Printer } from 'lucide-react';
import { formatStatus, formatCategory } from '../translations';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth,
  onExportBoothPdf,
  partyFilter,
  searchQuery,
  onClearSearch,
  language = 'en',
  t
}) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'GRID';
    }
    return 'LIST';
  });

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'sad', 'aap', 'inc', 'bjp'
  const isPa = language === 'pa';

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
          {isPa 
            ? (searchQuery ? `"${searchQuery}" ਨਾਲ ਕੋਈ ਬੂਥ ਨਹੀਂ ਮਿਲਿਆ।` : 'ਕੋਈ ਬੂਥ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।')
            : (searchQuery ? `No booths match "${searchQuery}".` : 'No booths match the selected criteria.')}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {t?.no_match_sub || 'Try searching for a different booth number, village name (e.g. 104, Sohian, ਮਜੀਠਾ) or clear the filter.'}
        </p>
        {searchQuery && onClearSearch && (
          <button 
            className="btn-registry-reset"
            style={{ marginTop: '14px', display: 'inline-flex' }}
            onClick={onClearSearch}
          >
            {t?.btn_clear_search || 'Clear Search'}
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
          <span className="list-count-badge">{booths.length} {t?.booths_count || 'Booths'}</span>
          <span className="list-filter-label">
            {isAllMode && (
              partyFilter === 'ALL' ? (isPa ? 'ਸੰਪੂਰਨ ਮਾਸਟਰ ਸੂਚੀ (ਕੁੱਲ 187 ਬੂਥ)' : 'Complete Master List (All 187 Booths)') :
              partyFilter === 'SAD_WINS' ? (isPa ? '2024 ਵਿੱਚ ਸ਼੍ਰੋ.ਅ.ਦ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (129 ਬੂਥ)' : 'Booths Won by SAD in 2024 (129 Booths)') :
              partyFilter === 'AAP_WINS' ? (isPa ? '2024 ਵਿੱਚ ਆਪ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (39 ਬੂਥ)' : 'Booths Won by AAP in 2024 (39 Booths)') :
              partyFilter === 'BJP_WINS' ? (isPa ? '2024 ਵਿੱਚ ਭਾਜਪਾ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (10 ਬੂਥ)' : 'Booths Won by BJP in 2024 (10 Booths)') :
              partyFilter === 'INC_WINS' ? (isPa ? '2024 ਵਿੱਚ ਕਾਂਗਰਸ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (9 ਬੂਥ)' : 'Booths Won by INC in 2024 (9 Booths)') :
              partyFilter === 'FLIPPED_ONLY' ? (isPa ? 'ਤਬਦੀਲ ਬੂਥ (71 ਬੂਥ - ਪਾਰਟੀ ਬਦਲੀ)' : 'Flipped Booths (71 Booths - Changed Party)') :
              partyFilter === 'RETAINED_ONLY' ? (isPa ? 'ਬਰਕਰਾਰ ਬੂਥ (116 ਬੂਥ - ਉਹੀ ਪਾਰਟੀ)' : 'Retained Booths (116 Booths - Same Party)') : (t?.booths_count || 'Booths')
            )}
            {!isAllMode && (
              partyFilter === 'ALL' ? (isPa ? `${selectedParty} ਲਈ ਸਾਰੇ 187 ਬੂਥ` : `All 187 Booths for ${selectedParty}`) :
              partyFilter === 'WON_BOTH' ? (isPa ? `${selectedParty} ਪੱਕੇ ਗੜ੍ਹ (2022 ਅਤੇ 2024 ਦੋਵੇਂ ਜਿੱਤੇ)` : `${selectedParty} Strongholds (Won Both 2022 & 2024)`) :
              partyFilter === 'GAINED' ? (isPa ? `${selectedParty} ਨਵੇਂ ਜਿੱਤੇ ਬੂਥ (2024 ਜਿੱਤ, 2022 ਹਾਰ)` : `${selectedParty} Gains (Won in 2024, Lost in 2022)`) :
              partyFilter === 'LOST_24' ? (isPa ? `${selectedParty} ਗਵਾਏ ਬੂਥ (2022 ਜਿੱਤ, 2024 ਹਾਰ)` : `${selectedParty} Losses (Won in 2022, Lost in 2024)`) :
              partyFilter === 'WEAK' ? (isPa ? `${selectedParty} ਕਮਜ਼ੋਰ ਬੂਥ (<20% ਵੋਟ ਹਿੱਸਾ)` : `Weak Booths for ${selectedParty} (< 20% Vote Share)`) :
              partyFilter === 'LOST_BOTH' ? (isPa ? `${selectedParty} ਦੋਵੇਂ ਵਾਰ ਹਾਰੇ ਬੂਥ` : `Booths Lost Both Times by ${selectedParty}`) : (t?.booths_count || 'Booths')
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
            <span>{t?.btn_list || 'List'}</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span>{t?.btn_grid || 'Grid'}</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: CLEAN LIST TABLE */}
      {viewMode === 'LIST' && (
        <div className="clean-table-wrap">
          <div className="mobile-table-swipe-hint hide-desktop">
            <span>{t?.swipe_hint || '⇄ Swipe horizontally to view all results'}</span>
          </div>
          <table className="clean-table">
            <thead>
              {isAllMode ? (
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>{t?.th_no || 'No.'}</th>
                  <th>{t?.th_locality || 'Locality / Polling Station'}</th>
                  <th>{t?.th_winner_22 || '2022 Winner'}</th>
                  <th>{t?.th_winner_24 || '2024 Winner'}</th>
                  <th>{t?.th_status || 'Shift / Status'}</th>
                  <th style={{ textAlign: 'right' }}>{t?.th_turnout_24 || '2024 Turnout'}</th>
                  <th style={{ textAlign: 'right' }}>{t?.th_turnout_shift || 'Turnout Shift'}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t?.th_action || 'Action'}</th>
                </tr>
              ) : (
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>{t?.th_no || 'No.'}</th>
                  <th>{t?.th_locality || 'Locality / Polling Station'}</th>
                  <th style={{ textAlign: 'right' }}>2022 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>2024 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>{t?.th_shift || 'Shift'}</th>
                  <th>{t?.th_winner_22 || '2022 Winner'}</th>
                  <th>{t?.th_winner_24 || '2024 Winner'}</th>
                  <th>{t?.th_category || 'Category'}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t?.th_action || 'Action'}</th>
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
                const rawStatus = b.comparison?.status_label || b.status_label || (isFlip ? `${w22} → ${w24}` : `${w24} Retained`);
                const statusLabel = formatStatus(rawStatus, language);

                // Village display: if Punjabi mode, Gurmukhi is primary bold
                const primaryVillage = isPa ? (b.village_punjabi || b.village_pa) : (b.village_english || b.village_en);
                const secondaryVillage = isPa ? (b.village_english || b.village_en) : (b.village_punjabi || b.village_pa);

                if (isAllMode) {
                  return (
                    <tr 
                      key={b.booth_no}
                      onClick={() => onSelectBooth(b)}
                      title={`Click to inspect Booth #${b.booth_no}`}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <div className="table-booth-badge-wrap">
                          <span className="booth-avatar-badge">#{b.booth_no_2024 || b.booth_no}</span>
                          {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                            <span className="table-booth-2022-tag" title={isPa ? `2022 ਵਿੱਚ ਬੂਥ #${b.booth_no_2022} ਸੀ` : `In 2022: Booth #${b.booth_no_2022}`}>
                              '22: #{b.booth_no_2022}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className={`village-en ${isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontWeight: 700 } : {}}>
                          {primaryVillage}
                        </div>
                        <div className={`village-pa ${!isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontSize: '0.8rem', color: 'var(--text-muted)' } : {}}>
                          {secondaryVillage}
                        </div>
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
                          {diff >= 0 ? `+${diff}` : diff} {isPa ? 'ਵੋਟਾਂ' : 'votes'} ({pct}%)
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <button
                            className="btn-table-pdf"
                            title={`Export Booth #${b.booth_no} as PDF`}
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
                            <span>{t?.btn_view || 'View'}</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                // Party-Specific Table Row
                const v22 = b.data_2022?.[pKey] ?? b[`${pKey}_22`] ?? 0;
                const pct22 = b.data_2022?.[`${pKey}_pct`] ?? b[`${pKey}_share_22`] ?? 0.0;
                const v24 = b.data_2024?.[pKey] ?? b[`${pKey}_24`] ?? 0;
                const pct24 = b.data_2024?.[`${pKey}_pct`] ?? b[`${pKey}_share_24`] ?? 0.0;
                const partyDiff = v24 - v22;
                const swing = Number((pct24 - pct22).toFixed(2));

                let rawCat = 'LOST_BOTH';
                let catClass = 'neutral';
                if (w22 === selectedParty && w24 === selectedParty) {
                  rawCat = 'WON_BOTH';
                  catClass = 'won';
                } else if (w22 !== selectedParty && w24 === selectedParty) {
                  rawCat = 'GAINED';
                  catClass = 'gained';
                } else if (w22 === selectedParty && w24 !== selectedParty) {
                  rawCat = 'LOST_24';
                  catClass = 'lost';
                }

                if (pct24 < 20.0 && tot24 > 0) {
                  rawCat = 'WEAK';
                  catClass = 'weak';
                }

                const catLabel = formatCategory(rawCat, language);

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth(b)}
                    title={`Click to inspect Booth #${b.booth_no}`}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <div className="table-booth-badge-wrap">
                        <span className="booth-avatar-badge">#{b.booth_no_2024 || b.booth_no}</span>
                        {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                          <span className="table-booth-2022-tag" title={isPa ? `2022 ਵਿੱਚ ਬੂਥ #${b.booth_no_2022} ਸੀ` : `In 2022: Booth #${b.booth_no_2022}`}>
                            '22: #{b.booth_no_2022}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className={`village-en ${isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontWeight: 700 } : {}}>
                        {primaryVillage}
                      </div>
                      <div className={`village-pa ${!isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontSize: '0.8rem', color: 'var(--text-muted)' } : {}}>
                        {secondaryVillage}
                      </div>
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
                        {partyDiff >= 0 ? `+${partyDiff}` : partyDiff} {isPa ? 'ਵੋਟਾਂ' : 'votes'} ({swing > 0 ? `+${swing}%` : `${swing}%`})
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
                          title={`Export Booth #${b.booth_no} as PDF`}
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
                          <span>{t?.btn_view || 'View'}</span>
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
            const rawStatus = b.comparison?.status_label || b.status_label || (isFlip ? `${w22} → ${w24}` : `${w24} Retained`);
            const statusLabel = formatStatus(rawStatus, language);

            const primaryVillage = isPa ? (b.village_punjabi || b.village_pa) : (b.village_english || b.village_en);
            const secondaryVillage = isPa ? (b.village_english || b.village_en) : (b.village_punjabi || b.village_pa);

            if (isAllMode) {
              return (
                <div 
                  key={b.booth_no} 
                  className="booth-card"
                  onClick={() => onSelectBooth(b)}
                >
                  <div className="card-top-row">
                    <div className="card-booth-badge-group">
                      <span className={`card-booth-badge ${(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) ? 'renumbered' : ''}`}>
                        {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) ? (
                          <>
                            <span className="booth-primary-tag">2024: #{b.booth_no_2024 || b.booth_no}</span>
                            <span className="booth-renumbered-divider">|</span>
                            <span className="booth-secondary-tag">2022: #{b.booth_no_2022}</span>
                          </>
                        ) : (
                          `#${b.booth_no_2024 || b.booth_no}`
                        )}
                      </span>
                      {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                        <span className="pill-renumbered-badge" title={isPa ? `2022 ਵਿੱਚ ਇਹ ਬੂਥ #${b.booth_no_2022} ਸੀ` : `In 2022 this station was Booth #${b.booth_no_2022}`}>
                          ⚡ {isPa ? 'ਰੀਨੰਬਰ' : 'Renumbered'}
                        </span>
                      )}
                    </div>
                    <span className={`cat-pill ${isFlip ? 'lost' : 'won'}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div className={`card-village-name ${isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontWeight: 700 } : {}}>
                    {primaryVillage}
                  </div>
                  <div className={`card-village-punjabi ${!isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontSize: '0.8125rem', color: 'var(--text-muted)' } : {}}>
                    {secondaryVillage}
                  </div>
                  {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                    <div className="card-renumbered-note">
                      {isPa
                        ? `(2022 ਵਿੱਚ: ਬੂਥ #${b.booth_no_2022} ${b.village_2022_pa || ''})`
                        : `(In 2022: Booth #${b.booth_no_2022} ${b.village_2022_en || ''})`}
                    </div>
                  )}

                  <div className="card-stats-box">
                    <div className="card-stat-col">
                      <span className="card-stat-label">{isPa ? '2022 ਜੇਤੂ' : '2022 Winner'}</span>
                      <span className={`mini-winner ${w22}`} style={{ marginTop: '3px' }}>
                        {w22} (+{m22})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{tot22} {isPa ? 'ਵੋਟਾਂ' : 'votes'}</span>
                    </div>

                    <div className="card-stat-col">
                      <span className="card-stat-label">{isPa ? '2024 ਜੇਤੂ' : '2024 Winner'}</span>
                      <span className={`mini-winner ${w24}`} style={{ marginTop: '3px' }}>
                        {w24} (+{m24})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{tot24} {isPa ? 'ਵੋਟਾਂ' : 'votes'}</span>
                    </div>
                  </div>

                  <div className="card-footer-row">
                    <div>
                      <span className="footer-label">{isPa ? 'ਪੋਲਿੰਗ: ' : 'Turnout: '}</span>
                      <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                        {diff >= 0 ? `+${diff}` : diff} {isPa ? 'ਵੋਟਾਂ' : 'votes'}
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

            let rawCat = 'LOST_BOTH';
            let catClass = 'neutral';
            if (w22 === selectedParty && w24 === selectedParty) {
              rawCat = 'WON_BOTH';
              catClass = 'won';
            } else if (w22 !== selectedParty && w24 === selectedParty) {
              rawCat = 'GAINED';
              catClass = 'gained';
            } else if (w22 === selectedParty && w24 !== selectedParty) {
              rawCat = 'LOST_24';
              catClass = 'lost';
            }

            if (pct24 < 20.0 && tot24 > 0) {
              rawCat = 'WEAK';
              catClass = 'weak';
            }

            const catLabel = formatCategory(rawCat, language);

            return (
              <div 
                key={b.booth_no} 
                className="booth-card"
                onClick={() => onSelectBooth(b)}
              >
                <div className="card-top-row">
                  <div className="card-booth-badge-group">
                    <span className={`card-booth-badge ${(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) ? 'renumbered' : ''}`}>
                      {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) ? (
                        <>
                          <span className="booth-primary-tag">2024: #{b.booth_no_2024 || b.booth_no}</span>
                          <span className="booth-renumbered-divider">|</span>
                          <span className="booth-secondary-tag">2022: #{b.booth_no_2022}</span>
                        </>
                      ) : (
                        `#${b.booth_no_2024 || b.booth_no}`
                      )}
                    </span>
                    {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                      <span className="pill-renumbered-badge" title={isPa ? `2022 ਵਿੱਚ ਇਹ ਬੂਥ #${b.booth_no_2022} ਸੀ` : `In 2022 this station was Booth #${b.booth_no_2022}`}>
                        ⚡ {isPa ? 'ਰੀਨੰਬਰ' : 'Renumbered'}
                      </span>
                    )}
                  </div>
                  <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                </div>

                <div className={`card-village-name ${isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontWeight: 700 } : {}}>
                  {primaryVillage}
                </div>
                <div className={`card-village-punjabi ${!isPa ? 'punjabi-font' : ''}`} style={isPa ? { fontSize: '0.8125rem', color: 'var(--text-muted)' } : {}}>
                  {secondaryVillage}
                </div>
                {(b.is_renumbered || (b.booth_no_2022 && b.booth_no_2022 !== (b.booth_no_2024 || b.booth_no))) && (
                  <div className="card-renumbered-note">
                    {isPa
                      ? `(2022 ਵਿੱਚ: ਬੂਥ #${b.booth_no_2022} ${b.village_2022_pa || ''})`
                      : `(In 2022: Booth #${b.booth_no_2022} ${b.village_2022_en || ''})`}
                  </div>
                )}

                <div className="card-stats-box">
                  <div className="card-stat-col">
                    <span className="card-stat-label">{isPa ? '2022 ਵੋਟਾਂ' : '2022 Votes'}</span>
                    <strong>{v22}</strong> <span className="pct-sub">({pct22}%)</span>
                    <span className={`mini-winner ${w22}`} style={{ marginTop: '4px' }}>{w22} {isPa ? 'ਜਿੱਤ' : 'Won'}</span>
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label">{isPa ? '2024 ਵੋਟਾਂ' : '2024 Votes'}</span>
                    <strong>{v24}</strong> <span className="pct-sub">({pct24}%)</span>
                    <span className={`mini-winner ${w24}`} style={{ marginTop: '4px' }}>{w24} {isPa ? 'ਜਿੱਤ' : 'Won'}</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <div>
                    <span className="footer-label">{isPa ? 'ਫ਼ਰਕ: ' : 'Shift: '}</span>
                    <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                      {partyDiff >= 0 ? `+${partyDiff}` : partyDiff} {isPa ? 'ਵੋਟਾਂ' : 'votes'}
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
