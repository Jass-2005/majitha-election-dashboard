import React, { useState } from 'react';
import { X, Printer, Target, Download, FileText } from 'lucide-react';
import { formatStatus } from '../translations';

export default function BoothModal({ booth, onClose, language = 'en', t }) {
  const [mpLang, setMpLang] = useState(() => (language === 'pa' ? 'PA' : 'EN'));
  if (!booth) return null;

  const isPa = language === 'pa';
  const d22 = booth.data_2022 || {};
  const d24 = booth.data_2024 || {};
  const comp = booth.comparison || {};
  const mp = booth.masterplan || {};

  // Safe percentage helper
  const getWidth = (votes, total) => {
    if (!total || total === 0) return '0%';
    return `${Math.min(100, Math.round((votes / total) * 100))}%`;
  };

  const handlePrintBooth = (e) => {
    e.stopPropagation();
    document.body.classList.add('printing-single-booth');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-single-booth');
    }, 1000);
  };

  const primaryVillage = isPa ? (booth.village_punjabi || booth.village_pa) : (booth.village_english || booth.village_en);
  const secondaryVillage = isPa ? (booth.village_english || booth.village_en) : (booth.village_punjabi || booth.village_pa);
  const rawStatus = comp.status_label || booth.status_label || (booth.is_flipped ? 'Flipped' : 'Retained');
  const statusLabel = formatStatus(rawStatus, language);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">{isPa ? '13-ਮਜੀਠਾ ਬੂਥ ਖੁਫੀਆ ਰਿਪੋਰਟ' : '13-MAJITHA BOOTH INTELLIGENCE'}</div>
          <div className="watermark-url">https://dsidein.com/majitha-2022-2024</div>
        </div>

        {/* Printable Official Banner */}
        <div className="print-dossier-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="print-dossier-title">{t?.modal_title || '13-MAJITHA ASSEMBLY SEGMENT — BOOTH DOSSIER'}</div>
              <div className="print-dossier-sub">
                {t?.modal_sub || 'Election Commission Data: 2022 Vidhan Sabha vs 2024 Lok Sabha Polling (Amritsar PC)'}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/majitha-2022-2024</span>
            </div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-badges-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-badge">{t?.modal_booth_prefix || 'Booth #'}{booth.booth_no}</span>
              <span className={`status-badge ${comp.is_flip ? 'flipped' : 'retained'}`}>
                {statusLabel}
              </span>
            </div>
            <h2 className={`modal-village-title ${isPa ? 'punjabi-font' : ''}`}>{primaryVillage}</h2>
            <p className={`modal-village-sub ${!isPa ? 'punjabi-text' : ''}`}>
              {secondaryVillage}
            </p>
          </div>
          <div className="modal-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn-print-modal no-print" 
              onClick={handlePrintBooth}
              title={t?.action_export_pdf_title || 'Export / Print this Booth Dossier as PDF'}
            >
              <Printer size={15} />
              <span>{t?.action_export_pdf || 'Export PDF'}</span>
            </button>
            <button className="modal-close no-print" onClick={onClose} aria-label="Close Modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Side-by-side Comparative Cards */}
        <div className="compare-grid">
          {/* 2022 Vidhan Sabha Column */}
          <div className="year-card">
            <div className="year-title">{isPa ? '2022 ਵਿਧਾਨ ਸਭਾ ਚੋਣ' : '2022 Vidhan Sabha Election'}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`badge-winner ${d22.winner_party}`}>
                {d22.winner_party} Won
              </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d22.margin} lead
              </span>
            </div>

            {/* SAD Bar (Ganieve Kaur Majithia) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>SAD (Ganieve Kaur Majithia)</span>
                <span><strong>{d22.sad}</strong> ({d22.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.sad, d22.total), background: 'var(--color-sad, #002D62)' }} />
              </div>
            </div>

            {/* AAP Bar (Sukhjinder Raj Singh Lalli) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>AAP (Sukhjinder Lalli)</span>
                <span><strong>{d22.aap}</strong> ({d22.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.aap, d22.total), background: 'var(--color-aap, #0047AB)' }} />
              </div>
            </div>

            {/* INC Bar (Jagwinder Pal Singh Jagga) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>INC (Jagga Majithia)</span>
                <span><strong>{d22.inc}</strong> ({d22.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.inc, d22.total), background: 'var(--color-inc, #166534)' }} />
              </div>
            </div>

            {/* BJP Bar (Pardeep Singh) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>BJP (Pardeep Singh)</span>
                <span><strong>{d22.bjp || 0}</strong> ({d22.bjp_pct || 0}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.bjp, d22.total), background: 'var(--color-bjp, #D97706)' }} />
              </div>
            </div>

            {/* Total 2022 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '12px', fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{isPa ? 'ਕੁੱਲ ਪੋਲਿੰਗ:' : 'Total Polled:'}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d22.total} {isPa ? 'ਵੋਟਾਂ' : 'votes'}</strong>
            </div>
          </div>

          {/* 2024 Lok Sabha Column */}
          <div className="year-card">
            <div className="year-title">{isPa ? '2024 ਲੋਕ ਸਭਾ ਚੋਣ' : '2024 Lok Sabha Election'}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`badge-winner ${d24.winner_party}`}>
                {d24.winner_party} {isPa ? 'ਜਿੱਤ' : 'Won'}
              </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d24.margin} {isPa ? 'ਲੀਡ' : 'lead'}
              </span>
            </div>

            {/* SAD Bar (Anil Joshi) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{isPa ? 'ਸ਼੍ਰੋ.ਅ.ਦ (ਅਨਿਲ ਜੋਸ਼ੀ)' : 'SAD (Anil Joshi)'}</span>
                <span><strong>{d24.sad}</strong> ({d24.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.sad, d24.total), background: 'var(--color-sad, #002D62)' }} />
              </div>
            </div>

            {/* AAP Bar (Kuldeep Singh Dhaliwal) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{isPa ? 'ਆਪ (ਕੁਲਦੀਪ ਧਾਲੀਵਾਲ)' : 'AAP (Kuldeep Dhaliwal)'}</span>
                <span><strong>{d24.aap}</strong> ({d24.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.aap, d24.total), background: 'var(--color-aap, #0047AB)' }} />
              </div>
            </div>

            {/* INC Bar (Gurjeet Singh Aujla) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{isPa ? 'ਕਾਂਗਰਸ (ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ)' : 'INC (Gurjeet Singh Aujla)'}</span>
                <span><strong>{d24.inc}</strong> ({d24.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.inc, d24.total), background: 'var(--color-inc, #166534)' }} />
              </div>
            </div>

            {/* BJP Bar (Taranjit Singh Sandhu) */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{isPa ? 'ਭਾਜਪਾ (ਤਰਨਜੀਤ ਸਿੰਘ ਸੰਧੂ)' : 'BJP (Taranjit Sandhu)'}</span>
                <span><strong>{d24.bjp}</strong> ({d24.bjp_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.bjp, d24.total), background: 'var(--color-bjp, #D97706)' }} />
              </div>
            </div>

            {/* Total 2024 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{isPa ? 'ਕੁੱਲ ਪੋਲਿੰਗ:' : 'Total Polled:'}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d24.total} {isPa ? 'ਵੋਟਾਂ' : 'votes'}</strong>
            </div>
          </div>
        </div>

        {/* Turnout & Swing Summary Card */}
        <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
            {isPa ? 'ਵੋਟਰ ਪੋਲਿੰਗ ਅਤੇ ਵੋਟ ਤਬਦੀਲੀ ਵਿਸ਼ਲੇਸ਼ਣ' : 'Turnout & Vote Shift Analysis'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', fontSize: '0.8125rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{isPa ? 'ਪੋਲਿੰਗ ਫ਼ਰਕ:' : 'Turnout Shift:'}</span>
              <div style={{ fontWeight: 700, color: (comp.turnout_diff || booth.turnout_diff || 0) >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {(comp.turnout_diff || booth.turnout_diff || 0) > 0 ? '+' : ''}{(comp.turnout_diff || booth.turnout_diff || 0)} {isPa ? 'ਵੋਟਾਂ' : 'votes'} ({(comp.turnout_pct || booth.turnout_pct || 0)}%)
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{isPa ? 'ਸ਼੍ਰੋ.ਅ.ਦ ਸਵਿੰਗ:' : 'SAD Swing:'}</span>
              <div style={{ fontWeight: 700, color: (comp.sad_swing || booth.sad_swing || 0) >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {(comp.sad_swing || booth.sad_swing || 0) > 0 ? '+' : ''}{(comp.sad_swing || booth.sad_swing || 0)}%
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{isPa ? 'ਆਪ ਸਵਿੰਗ:' : 'AAP Swing:'}</span>
              <div style={{ fontWeight: 700, color: (comp.aap_swing || booth.aap_swing || 0) >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {(comp.aap_swing || booth.aap_swing || 0) > 0 ? '+' : ''}{(comp.aap_swing || booth.aap_swing || 0)}%
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{isPa ? 'ਕਾਂਗਰਸ ਸਵਿੰਗ:' : 'INC Swing:'}</span>
              <div style={{ fontWeight: 700, color: (comp.inc_swing || booth.inc_swing || 0) >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {(comp.inc_swing || booth.inc_swing || 0) > 0 ? '+' : ''}{(comp.inc_swing || booth.inc_swing || 0)}%
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{isPa ? 'ਭਾਜਪਾ ਸਵਿੰਗ:' : 'BJP Swing:'}</span>
              <div style={{ fontWeight: 700, color: (comp.bjp_swing || booth.bjp_swing || 0) >= 0 ? 'var(--color-gain)' : 'var(--color-loss)' }}>
                {(comp.bjp_swing || booth.bjp_swing || 0) > 0 ? '+' : ''}{(comp.bjp_swing || booth.bjp_swing || 0)}%
              </div>
            </div>
          </div>
        </div>

        {/* 90-Day Tactical Masterplan Section */}
        {mp && (
          <div className="modal-masterplan-section">
            <div className="modal-mp-header">
              <div className="mp-title-wrap">
                <Target size={18} className="mp-icon" />
                <h3 className="mp-heading">90-Day Field Operations Masterplan</h3>
              </div>

              {/* Language Switcher */}
              <div className="mp-lang-tabs no-print">
                <button
                  className={`mp-lang-btn ${mpLang === 'PA' ? 'active' : ''}`}
                  onClick={() => setMpLang('PA')}
                  title="ਪੰਜਾਬੀ ਵਿੱਚ ਪੜ੍ਹੋ"
                >
                  ਪੰਜਾਬੀ
                </button>
                <button
                  className={`mp-lang-btn ${mpLang === 'EN' ? 'active' : ''}`}
                  onClick={() => setMpLang('EN')}
                  title="Read in English"
                >
                  English
                </button>
              </div>
            </div>

            {/* Zone Classification */}
            <div className="mp-zone-badge-wrap">
              <span className="mp-zone-label">Strategic Zone:</span>
              <span className="mp-zone-value">
                {mpLang === 'PA' ? (mp.zone_pa || booth.zone_pa) : (mp.zone_en || booth.zone_en)}
              </span>
            </div>

            {/* Strategic Overview */}
            <div className="mp-action-box">
              <div className="mp-action-title">
                {mpLang === 'PA' ? 'ਜ਼ਮੀਨੀ ਰਣਨੀਤੀ ਸੰਖੇਪ' : 'Tactical Ground Strategy'}
              </div>
              <p className={`mp-action-text ${mpLang === 'PA' ? 'punjabi-font' : ''}`}>
                {mpLang === 'PA' ? (mp.action_pa || booth.action_pa) : (mp.action_en || booth.action_en)}
              </p>
            </div>

            {/* 90-Day Steps */}
            <div className="mp-steps-container">
              <div className="mp-steps-title">
                <FileText size={15} />
                <span>{mpLang === 'PA' ? '90-ਦਿਨਾ ਕਾਰਵਾਈ ਯੋਜਨਾ (ਕਦਮ ਦਰ ਕਦਮ)' : '90-Day Tactical Ground Steps'}</span>
              </div>
              <div className="mp-steps-list">
                {((mpLang === 'PA' ? mp.action_steps_pa : mp.action_steps_en) || mp.action_steps || [])?.map((step, idx) => (
                  <div key={idx} className="mp-step-item">
                    <span className="mp-step-num">{idx + 1}</span>
                    <span className={`mp-step-text ${mpLang === 'PA' ? 'punjabi-font' : ''}`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Complete Master Plan PDF */}
            <div className="masterplan-download-row no-print">
              <a 
                href="./Majitha_Detailed_Boothwise_Masterplan_Punjabi.pdf" 
                download="Majitha_Detailed_Boothwise_Masterplan_Punjabi.pdf"
                className="btn-download-masterplan pa"
                title="Download 187-Booth Detailed Field Operations Plan in Punjabi (PDF with Watermark)"
              >
                <Download size={14} />
                <span>187 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ (ਪੰਜਾਬੀ PDF)</span>
              </a>

              <a 
                href="./Majitha_Detailed_Boothwise_Masterplan.pdf" 
                download="Majitha_Detailed_Boothwise_Masterplan.pdf"
                className="btn-download-masterplan en"
                title="Download 187-Booth Master Plan Document in English (PDF with Watermark)"
              >
                <Download size={14} />
                <span>Master Plan (English PDF)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
