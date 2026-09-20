import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  Award, 
  Filter,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function PartyHub({ 
  selectedParty, 
  setSelectedParty, 
  partyFilter, 
  setPartyFilter,
  partyStats,
  summary,
  language = 'en',
  t
}) {
  const currentStats = partyStats[selectedParty] || partyStats.SAD || partyStats.AAP;
  const totalBooths = summary?.total_booths || 187;
  const sadWins = summary?.booths_won_2024?.SAD || 129;
  const aapWins = summary?.booths_won_2024?.AAP || 39;
  const bjpWins = summary?.booths_won_2024?.BJP || 10;
  const incWins = summary?.booths_won_2024?.INC || 9;

  // Retained & Flipped counts (SAD retained 115, AAP retained 1 = 116; 71 flipped)
  const retainedCount = summary?.retained_booths_count || 116;
  const flippedCount = summary?.flipped_booths_count || 71;

  const isPa = language === 'pa';

  return (
    <div className="registry-sub-controls" aria-label="Party Analytics and Filters">
      {/* 1. Main Segment Switcher Tabs */}
      <div className="party-pills-row">
        <div className="party-pill-tabs">
          {/* Complete List Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'ALL' ? 'active all' : ''}`}
            onClick={() => { setSelectedParty('ALL'); setPartyFilter('ALL'); }}
            title={`View complete constituency list of all ${totalBooths} booths`}
          >
            <Layers size={14} />
            <span className="party-tab-text">{t?.tab_all_booths || 'All Booths'}</span>
            <span className="tab-pill-count">{totalBooths}</span>
          </button>

          {/* SAD Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'SAD' ? 'active sad' : ''}`}
            onClick={() => { setSelectedParty('SAD'); setPartyFilter('ALL'); }}
            title="Shiromani Akali Dal: Ganieve Kaur Majithia ('22) -> Anil Joshi ('24)"
          >
            <span className="party-color-indicator sad-indicator"></span>
            <span className="party-tab-text">{t?.tab_sad_analytics || 'SAD Analytics'}</span>
            <span className="tab-pill-count sad-badge">{sadWins} {t?.wins_label || 'Wins'}</span>
          </button>

          {/* AAP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'AAP' ? 'active aap' : ''}`}
            onClick={() => { setSelectedParty('AAP'); setPartyFilter('ALL'); }}
            title="Aam Aadmi Party: Sukhjinder Raj Singh Lalli ('22) -> Kuldeep Singh Dhaliwal ('24)"
          >
            <span className="party-color-indicator aap-indicator"></span>
            <span className="party-tab-text">{t?.tab_aap_analytics || 'AAP Analytics'}</span>
            <span className="tab-pill-count aap-badge">{aapWins} {t?.wins_label || 'Wins'}</span>
          </button>

          {/* BJP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'BJP' ? 'active bjp' : ''}`}
            onClick={() => { setSelectedParty('BJP'); setPartyFilter('ALL'); }}
            title="Bharatiya Janata Party: Pardeep Singh ('22) -> Taranjit Singh Sandhu Samundri ('24)"
          >
            <span className="party-color-indicator bjp-indicator"></span>
            <span className="party-tab-text">{t?.tab_bjp_analytics || 'BJP Analytics'}</span>
            <span className="tab-pill-count bjp-badge">{bjpWins} {t?.wins_label || 'Wins'}</span>
          </button>

          {/* INC Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'INC' ? 'active inc' : ''}`}
            onClick={() => { setSelectedParty('INC'); setPartyFilter('ALL'); }}
            title="Indian National Congress: Jagwinder Pal Singh Jagga ('22) -> Gurjeet Singh Aujla ('24)"
          >
            <span className="party-color-indicator inc-indicator"></span>
            <span className="party-tab-text">{t?.tab_inc_analytics || 'INC Analytics'}</span>
            <span className="tab-pill-count inc-badge">{incWins} {t?.wins_label || 'Wins'}</span>
          </button>
        </div>

        {/* Compact Vitals Badge Strip */}
        <div className="compact-vitals-line" title="Aggregated Constituency & Party Vitals">
          {selectedParty === 'ALL' ? (
            <>
              <div className="vital-item">
                <span className="vital-lbl">{t?.summary_turnout_label || 'Turnout'}</span>
                <span className="vital-val">{summary?.total_votes_2024?.toLocaleString() || '103,790'}</span>
                <span className="vital-sub">{t?.summary_evm_verified || 'Form-20 EVM Verified'}</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item lead-sad">
                <span className="vital-lbl">{t?.summary_sad_lead || 'SAD Lead'}</span>
                <span className="vital-val">+12,451</span>
                <span className="vital-sub">{t?.summary_over_aap || 'over AAP'}</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{t?.summary_seats_24 || "Seats '24"}</span>
                <span className="vital-val">{isPa ? `ਸ਼੍ਰੋ.ਅ.ਦ: ${sadWins} · ਆਪ: ${aapWins} · ਭਾਜਪਾ: ${bjpWins} · ਕਾਂਗਰਸ: ${incWins}` : `SAD: ${sadWins} · AAP: ${aapWins} · BJP: ${bjpWins} · INC: ${incWins}`}</span>
              </div>
            </>
          ) : (
            <>
              <div className="vital-item">
                <span className="vital-lbl">{isPa ? '’22 ਵੋਟਾਂ' : '’22 Votes'}</span>
                <span className="vital-val">{currentStats.votes_2022.toLocaleString()}</span>
                <span className="vital-sub">({currentStats.share_2022}%)</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{isPa ? '’24 ਵੋਟਾਂ' : '’24 Votes'}</span>
                <span className="vital-val">{currentStats.votes_2024.toLocaleString()}</span>
                <span className="vital-sub">({currentStats.share_2024}%)</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{isPa ? 'ਸਵਿੰਗ' : 'Swing'}</span>
                <span className={`vital-val ${currentStats.swing >= 0 ? 'shift-gain' : 'shift-loss'}`}>
                  {currentStats.swing >= 0 ? `+${currentStats.swing}%` : `${currentStats.swing}%`}
                </span>
                <span className="vital-sub">
                  ({currentStats.vote_diff >= 0 ? `+${currentStats.vote_diff.toLocaleString()}` : currentStats.vote_diff.toLocaleString()} {t?.votes_word || 'votes'})
                </span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{isPa ? 'ਬੂਥ ਜਿੱਤ' : 'Booths'}</span>
                <span className="vital-val">{currentStats.booths_won_2022} → {currentStats.booths_won_2024}</span>
                <span className="vital-sub">
                  ({currentStats.booths_won_2024 - currentStats.booths_won_2022 >= 0 ? `+${currentStats.booths_won_2024 - currentStats.booths_won_2022}` : currentStats.booths_won_2024 - currentStats.booths_won_2022})
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Candidate Attribution Strip when a Party is Selected */}
      {selectedParty !== 'ALL' && (
        <div className="party-candidate-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--bg-surface-elevated, #f8fafc)',
          borderRadius: '8px',
          margin: '8px 0',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          fontSize: '0.8125rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedParty} {isPa ? 'ਆਗੂ:' : 'Leadership:'}
            </span>
            <span>
              <strong>{isPa ? '2022 ਉਮੀਦਵਾਰ:' : '2022 Candidate:'}</strong> {currentStats.candidate_2022} ({currentStats.votes_2022.toLocaleString()} {t?.votes_word || 'votes'})
            </span>
            <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span>
              <strong>{isPa ? '2024 ਉਮੀਦਵਾਰ:' : '2024 Candidate:'}</strong> {currentStats.candidate_2024} ({currentStats.votes_2024.toLocaleString()} {t?.votes_word || 'votes'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-highlight" style={{
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              background: currentStats.swing >= 0 ? '#dcfce7' : '#fee2e2',
              color: currentStats.swing >= 0 ? '#166534' : '#991b1b'
            }}>
              {currentStats.swing >= 0 
                ? (isPa ? `+${currentStats.swing}% ਵੋਟ ਹਿੱਸੇਦਾਰੀ ਵਾਧਾ` : `+${currentStats.swing}% Vote Share Gain`) 
                : (isPa ? `${currentStats.swing}% ਵੋਟ ਹਿੱਸੇਦਾਰੀ ਗਿਰਾਵਟ` : `${currentStats.swing}% Vote Share Drop`)}
            </span>
          </div>
        </div>
      )}

      {/* 2. Category Filter Pills */}
      <div className={`category-filter-pills ${selectedParty.toLowerCase()}-mode`}>
        <div className="filter-pill-header">
          <Filter size={12} className="filter-header-icon" />
          <span className="filter-group-label">{t?.filter_prefix || 'FILTER:'}</span>
        </div>

        {selectedParty === 'ALL' ? (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? 'active default-active' : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>{t?.filter_all_booths || 'All Booths'}</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            <button
              className={`cat-pill-btn sad-filter ${partyFilter === 'SAD_WINS' ? 'active sad-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'SAD_WINS' ? 'ALL' : 'SAD_WINS')}
            >
              <Award size={13} className="pill-icon sad-text" />
              <span>{t?.filter_sad_won || 'SAD Won'}</span>
              <span className="cat-pill-num">{sadWins}</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_WINS' ? 'ALL' : 'AAP_WINS')}
            >
              <Award size={13} className="pill-icon aap-text" />
              <span>{t?.filter_aap_won || 'AAP Won'}</span>
              <span className="cat-pill-num">{aapWins}</span>
            </button>
            <button
              className={`cat-pill-btn bjp-filter ${partyFilter === 'BJP_WINS' ? 'active bjp-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'BJP_WINS' ? 'ALL' : 'BJP_WINS')}
            >
              <Award size={13} className="pill-icon bjp-text" />
              <span>{t?.filter_bjp_won || 'BJP Won'}</span>
              <span className="cat-pill-num">{bjpWins}</span>
            </button>
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_WINS' ? 'ALL' : 'INC_WINS')}
            >
              <Award size={13} className="pill-icon inc-text" />
              <span>{t?.filter_inc_won || 'INC Won'}</span>
              <span className="cat-pill-num">{incWins}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'FLIPPED_ONLY' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'FLIPPED_ONLY' ? 'ALL' : 'FLIPPED_ONLY')}
              title={isPa ? "ਕੇਵਲ ਉਹ ਬੂਥ ਜਿੱਥੇ 2022 ਤੋਂ 2024 ਵਿਚਕਾਰ ਜੇਤੂ ਪਾਰਟੀ ਬਦਲੀ" : "Only show booths that changed party between 2022 and 2024"}
            >
              <Flame size={13} />
              <span>{t?.filter_flipped || 'Flipped Booths'}</span>
              <span className="cat-pill-num">{flippedCount}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'RETAINED_ONLY' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'RETAINED_ONLY' ? 'ALL' : 'RETAINED_ONLY')}
              title={isPa ? "ਕੇਵਲ ਉਹ ਬੂਥ ਜਿੱਥੇ ਉਸੇ ਪਾਰਟੀ ਨੇ ਜਿੱਤ ਬਰਕਰਾਰ ਰੱਖੀ" : "Only show booths retained by the same party"}
            >
              <ShieldCheck size={13} />
              <span>{t?.filter_retained || 'Retained'}</span>
              <span className="cat-pill-num">{retainedCount}</span>
            </button>
          </div>
        ) : (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>{t?.filter_all_booths || 'All Booths'}</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            <button
              className={`cat-pill-btn won ${partyFilter === 'WON_BOTH' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_BOTH' ? 'ALL' : 'WON_BOTH')}
              title={isPa ? `${selectedParty} ਵੱਲੋਂ 2022 ਅਤੇ 2024 ਦੋਵੇਂ ਵਾਰ ਜਿੱਤੇ` : `Won in both 2022 & 2024 by ${selectedParty}`}
            >
              <ShieldCheck size={13} />
              <span>{t?.filter_won_both || 'Won Both'}</span>
              <span className="cat-pill-num">{currentStats.won_both_count}</span>
            </button>
            <button
              className={`cat-pill-btn gained ${partyFilter === 'GAINED' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'GAINED' ? 'ALL' : 'GAINED')}
              title={isPa ? `${selectedParty} ਵੱਲੋਂ 2024 ਵਿੱਚ ਨਵੇਂ ਜਿੱਤੇ ਬੂਥ` : `Gained by ${selectedParty} in 2024 (Flip In)`}
            >
              <TrendingUp size={13} />
              <span>{t?.filter_gained || 'Gained in ’24'}</span>
              <span className="cat-pill-num">{currentStats.gained_count}</span>
            </button>
            <button
              className={`cat-pill-btn lost ${partyFilter === 'LOST_24' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'LOST_24' ? 'ALL' : 'LOST_24')}
              title={isPa ? `2022 ਵਿੱਚ ਜਿੱਤੇ ਪਰ 2024 ਵਿੱਚ ਹਾਰੇ` : `Won in 2022, lost in 2024 by ${selectedParty} (Flip Out)`}
            >
              <TrendingDown size={13} />
              <span>{t?.filter_lost_24 || 'Lost in ’24'}</span>
              <span className="cat-pill-num">{currentStats.lost_24_count}</span>
            </button>
            <button
              className={`cat-pill-btn weak ${partyFilter === 'WEAK' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WEAK' ? 'ALL' : 'WEAK')}
              title={isPa ? `ਕਮਜ਼ੋਰ ਬੂਥ: 20% ਤੋਂ ਘੱਟ ਵੋਟ ਹਿੱਸਾ` : `Weak booth: less than 20% vote share for ${selectedParty}`}
            >
              <AlertTriangle size={13} />
              <span>{t?.filter_weak || 'Weak (<20%)'}</span>
              <span className="cat-pill-num">{currentStats.weak_count}</span>
            </button>
            <button
              className={`cat-pill-btn deficit ${partyFilter === 'LOST_BOTH' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'LOST_BOTH' ? 'ALL' : 'LOST_BOTH')}
              title={isPa ? `ਦੋਵੇਂ ਵਾਰ ਵਿਰੋਧੀ ਧਿਰ ਦੇ ਗੜ੍ਹ` : `Opponent bastions in both 2022 & 2024`}
            >
              <ShieldAlert size={13} />
              <span>{t?.filter_lost_both || 'Lost Both'}</span>
              <span className="cat-pill-num">{currentStats.lost_both_count}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
