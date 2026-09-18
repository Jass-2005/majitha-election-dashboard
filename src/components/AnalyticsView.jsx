import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AnalyticsView({ booths, summary }) {
  // Key calculations
  const topAapBooths = [...booths]
    .sort((a, b) => (b.data_2024?.aap || b.aap_24 || 0) - (a.data_2024?.aap || a.aap_24 || 0))
    .slice(0, 5);

  const topTurnoutDrops = [...booths]
    .sort((a, b) => ((a.comparison?.turnout_diff || a.turnout_diff || 0) - (b.comparison?.turnout_diff || b.turnout_diff || 0)))
    .slice(0, 5);

  const closest2024Booths = [...booths]
    .filter(b => (b.data_2024?.total || b.turnout_24 || 0) > 0)
    .sort((a, b) => ((a.data_2024?.margin ?? a.margin_24 ?? 999) - (b.data_2024?.margin ?? b.margin_24 ?? 999)))
    .slice(0, 5);

  return (
    <div className="insights-grid">
      {/* Card 1: Party Vote Share Shift */}
      <div className="insight-card">
        <h3>1. Vote Share Dynamics (2022 vs 2024)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Comparing the popular vote percentages in 13-Majitha:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* SAD */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-sad, #002D62)' }}>SAD (Shiromani Akali Dal)</span>
              <span>46.77% (2022 Ganieve Kaur) → <strong>39.48% (2024 Joshi)</strong> (-7.29% Swing)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '39.48%', background: 'var(--color-sad, #002D62)' }} />
            </div>
          </div>

          {/* AAP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-aap, #0047AB)' }}>AAP (Aam Aadmi Party)</span>
              <span>25.25% (2022 Lalli) → <strong>27.49% (2024 Dhaliwal)</strong> (+2.24% Swing)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '27.49%', background: 'var(--color-aap, #0047AB)' }} />
            </div>
          </div>

          {/* INC */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-inc, #166534)' }}>INC (Congress)</span>
              <span>21.32% (2022 Jagga) → <strong>15.90% (2024 Aujla)</strong> (-5.42% Drop)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '15.90%', background: 'var(--color-inc, #166534)' }} />
            </div>
          </div>

          {/* BJP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-bjp, #D97706)' }}>BJP (Bharatiya Janata Party)</span>
              <span>1.34% (2022 Pardeep) → <strong>7.76% (2024 Sandhu)</strong> (+6.42% Gain)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '7.76%', background: 'var(--color-bjp, #D97706)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: AAP Rural Surge */}
      <div className="insight-card">
        <h3>2. AAP Breakthrough: 39 Booth Wins</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          AAP expanded from 17 booth wins in 2022 to 39 in 2024 (+22 booth gain), breaking Akali strongholds:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topAapBooths.map((b) => (
            <div 
              key={b.booth_no} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
            >
              <div>
                <strong>#{b.booth_no}</strong> {b.village_english || b.village_en}
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-aap, #0047AB)' }}>
                {b.data_2024?.aap || b.aap_24} votes ({b.data_2024?.aap_pct || b.aap_share_24}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Razor-Thin 2024 Contests */}
      <div className="insight-card">
        <h3>3. Closest 2024 Booth Contests</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Booths decided by narrow margins in 2024:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {closest2024Booths.map((b) => {
            const wParty = b.data_2024?.winner_party || b.winner_24;
            const margin = b.data_2024?.margin ?? b.margin_24 ?? 0;
            return (
              <div 
                key={b.booth_no} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
              >
                <div>
                  <strong>#{b.booth_no}</strong> {b.village_english || b.village_en}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`badge-winner ${wParty}`}>
                    {wParty}
                  </span>
                  <span style={{ fontWeight: 700 }}>+{margin} votes</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 4: Turnout Movement */}
      <div className="insight-card">
        <h3>4. Sharpest Turnout Drops</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Total EVM votes shifted from 121,532 to 103,790 (-14.60%). Booths with maximum contraction:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topTurnoutDrops.map((b) => {
            const tDiff = b.comparison?.turnout_diff ?? b.turnout_diff ?? 0;
            const tPct = b.comparison?.turnout_pct ?? b.turnout_pct ?? 0;
            return (
              <div 
                key={b.booth_no} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
              >
                <div>
                  <strong>#{b.booth_no}</strong> {b.village_english || b.village_en}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--color-loss)' }}>
                  {tDiff} votes ({tPct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
