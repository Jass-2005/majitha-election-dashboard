// 13-Majitha Bilingual Localization Dictionary (English & Gurmukhi Punjabi)

export const translations = {
  en: {
    // Header
    header_section: 'DASHBOARD',
    header_crumb: '13-MAJITHA',
    search_placeholder_desktop: 'Search 187 booths, localities, numbers...',
    search_placeholder_mobile: 'Search booth number, village, or locality...',
    theme_switch_light: 'Switch to Light Mode',
    theme_switch_dark: 'Switch to Dark Mode',
    lang_name: 'English',
    lang_code: 'EN',

    // Sidebar
    nav_dashboard: 'Dashboard',
    nav_party_hub: 'Party Hub',
    nav_booths: '187 Booths',
    nav_master_excel: 'Master Excel',
    nav_exec_report: 'Executive Report (Word)',
    nav_portal: 'Dsidein Portal',

    // Title Bar & Actions
    segment_tag: '13-MAJITHA ASSEMBLY SEGMENT',
    main_title: 'Comparative Booth Intelligence',
    main_subtitle: '2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all 187 Polling Stations (Amritsar PC)',
    action_excel: 'Master Excel',
    action_excel_title: 'Download Master Analysis Spreadsheet (Excel .xlsx with SAD/AAP/INC/BJP Sheets)',
    action_plan_en: 'Master Plan (English PDF)',
    action_plan_en_title: 'Download Complete 187-Booth Master Plan in English (PDF with Watermark)',
    action_plan_pa: '187 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ (ਪੰਜਾਬੀ PDF)',
    action_plan_pa_title: 'Download 187 Boothwise Detailed Field Operations Plan in Punjabi (PDF with Watermark)',
    action_export_pdf: 'Export PDF',
    action_export_pdf_title: 'Export Current View as PDF with Dsidein Watermark',

    // KPI Cards
    kpi_booths_label: 'POLLING STATIONS',
    kpi_booths_val: '187 Booths',
    kpi_booths_sub: '● 100% Monitored & Verified',
    kpi_evm_label: '2024 EVM POLLED',
    kpi_evm_val: '103,790',
    kpi_evm_sub: '● 100% Form-20 EVM Match',
    kpi_sad_label: 'SAD (ANIL JOSHI)',
    kpi_sad_val: '40,981',
    kpi_sad_sub: '● 129 Wins (39.5% Share | +12,451 Lead)',
    kpi_aap_label: 'AAP (KULDEEP DHALIWAL)',
    kpi_aap_val: '28,530',
    kpi_aap_sub: '● 39 Wins (27.5% Share | +22 Booth Gain)',

    // Registry Header & Toolbar
    registry_title: 'Booth Performance Registry',
    registry_subtitle: 'Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across 13-Majitha',
    booths_count: 'Booths',
    reset_all: 'Reset All',
    search_registry_all: 'Search all 187 booths by number or locality (e.g. 104, Kathu Nangal, ਕੱਥੂਨੰਗਲ)...',
    search_registry_party: 'Search {party} performance by booth no. or locality (e.g. 25, Chawinda Devi)...',
    sort_order_label: 'Sort order',
    label_booth_2024: '2024 Booth',
    label_booth_2022: '2022 Booth',
    pill_renumbered: 'Renumbered',
    renumbered_desc: 'Renumbered from 2022 Booth #{b22}',
    renumbered_badge: 'Renumbered Station',

    // Party Hub Tabs
    tab_all_booths: 'All Booths',
    tab_sad_analytics: 'SAD Analytics',
    tab_aap_analytics: 'AAP Analytics',
    tab_bjp_analytics: 'BJP Analytics',
    tab_inc_analytics: 'INC Analytics',
    wins_label: 'Wins',

    // Telemetry Summary Row
    summary_turnout_label: 'Turnout',
    summary_evm_verified: 'Form-20 EVM Verified',
    summary_sad_lead: 'SAD Lead',
    summary_over_aap: 'over AAP',
    summary_seats_24: "Seats '24",

    // Party Sub-Filters
    filter_prefix: 'FILTER:',
    filter_all_booths: 'All Booths',
    filter_sad_won: 'SAD Won',
    filter_aap_won: 'AAP Won',
    filter_bjp_won: 'BJP Won',
    filter_inc_won: 'INC Won',
    filter_flipped: 'Flipped Booths',
    filter_retained: 'Retained',
    filter_swing_high: 'High Swing (±10%)',
    filter_won_both: 'Strongholds (Won Both)',
    filter_gained: 'Gained in 2024',
    filter_lost_24: 'Lost in 2024',
    filter_weak: 'Weak Booths (<20%)',
    filter_lost_both: 'Lost Both Elections',

    // Party Summary Stat Box
    stat_cand_22: '2022 Candidate',
    stat_cand_24: '2024 Candidate',
    stat_votes_22: '2022 Total Votes',
    stat_votes_24: '2024 Total Votes',
    stat_vote_diff: 'Net Vote Shift',
    stat_swing: 'Vote Share Swing',
    stat_booths_22: "Booths Won '22",
    stat_booths_24: "Booths Won '24",
    stat_top_booth: 'Top Booth',

    // Table & Grid View
    th_no: 'No.',
    th_locality: 'Locality / Polling Station',
    th_winner_22: '2022 Winner',
    th_winner_24: '2024 Winner',
    th_status: 'Shift / Status',
    th_turnout_24: '2024 Turnout',
    th_turnout_shift: 'Turnout Shift',
    th_category: 'Category',
    th_shift: 'Shift',
    th_action: 'Action',
    btn_list: 'List',
    btn_grid: 'Grid',
    btn_view: 'View',
    btn_pdf: 'PDF',
    votes_word: 'votes',
    swipe_hint: '⇄ Swipe horizontally to view all results',
    no_match_title: 'No booths match {query}.',
    no_match_sub: 'Try searching for a different booth number, village name (e.g. 104, Sohian, ਮਜੀਠਾ) or clear the filter.',
    btn_clear_search: 'Clear Search',

    // Modal
    modal_title: '13-MAJITHA ASSEMBLY SEGMENT — BOOTH DOSSIER',
    modal_sub: 'Election Commission Data: 2022 Vidhan Sabha vs 2024 Lok Sabha Polling (Amritsar PC)',
    modal_booth_prefix: 'Booth #',
    modal_turnout_title: 'Voter Turnout & Participation Comparison',
    modal_polled_votes: 'Polled Votes',
    modal_net_shift: 'Net Turnout Shift',
    modal_party_breakdown: '2022 vs 2024 Party Polling Breakdown',
    modal_masterplan_title: 'Targeted Field Operational Master Plan',
    modal_target_label: 'Strategic Target & Priority',
    modal_ground_label: 'Ground Action Directives',
    modal_campaign_label: 'Voter Outreach & Campaign Message',
    modal_cadre_label: 'Booth Cadre & Telemetry Deployment',
    modal_print_btn: 'Print Official Dossier',
    modal_mp_lang_en: 'English Plan',
    modal_mp_lang_pa: 'ਪੰਜਾਬੀ ਪਲਾਨ',

    // Sort Dropdown Labels
    sort_booth_asc: 'Booth Number (1 → 187)',
    sort_booth_desc: 'Booth Number (187 → 1)',
    sort_sad_desc: 'SAD Votes 2024 (Highest First)',
    sort_aap_desc: 'AAP Votes 2024 (Highest First)',
    sort_inc_desc: 'INC Votes 2024 (Highest First)',
    sort_bjp_desc: 'BJP Votes 2024 (Highest First)',
    sort_margin_desc: 'Victory Margin 2024 (Highest First)',
    sort_swing_desc: 'AAP Swing % (Highest Gain)',
    sort_turnout_desc: '2024 Total Polled Votes (Highest First)'
  },

  pa: {
    // Header
    header_section: 'ਡੈਸ਼ਬੋਰਡ',
    header_crumb: '13-ਮਜੀਠਾ',
    search_placeholder_desktop: '187 ਬੂਥ, ਪਿੰਡ ਜਾਂ ਨੰਬਰ ਖੋਜੋ...',
    search_placeholder_mobile: 'ਬੂਥ ਨੰਬਰ, ਪਿੰਡ ਜਾਂ ਇਲਾਕਾ ਖੋਜੋ...',
    theme_switch_light: 'ਲਾਈਟ ਮੋਡ ਵਿੱਚ ਬਦਲੋ',
    theme_switch_dark: 'ਡਾਰਕ ਮੋਡ ਵਿੱਚ ਬਦਲੋ',
    lang_name: 'ਪੰਜਾਬੀ',
    lang_code: 'ਪੰ',

    // Sidebar
    nav_dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    nav_party_hub: 'ਪਾਰਟੀ ਹੱਬ',
    nav_booths: '187 ਬੂਥ',
    nav_master_excel: 'ਮਾਸਟਰ ਐਕਸਲ',
    nav_exec_report: 'ਕਾਰਜਕਾਰੀ ਰਿਪੋਰਟ (ਵਰਡ)',
    nav_portal: 'ਡੀਸਾਈਡਇਨ ਪੋਰਟਲ',

    // Title Bar & Actions
    segment_tag: '13-ਮਜੀਠਾ ਵਿਧਾਨ ਸਭਾ ਹਲਕਾ',
    main_title: 'ਤੁਲਨਾਤਮਕ ਬੂਥ ਖੁਫੀਆ ਵਿਸ਼ਲੇਸ਼ਣ',
    main_subtitle: 'ਸਾਰੇ 187 ਪੋਲਿੰਗ ਸਟੇਸ਼ਨਾਂ ਦਾ 2022 ਵਿਧਾਨ ਸਭਾ ਬਨਾਮ 2024 ਲੋਕ ਸਭਾ ਚੋਣ ਵੋਟਿੰਗ ਡਾਟਾ (ਅੰਮ੍ਰਿਤਸਰ ਲੋਕ ਸਭਾ)',
    action_excel: 'ਮਾਸਟਰ ਐਕਸਲ',
    action_excel_title: 'ਮਾਸਟਰ ਐਕਸਲ ਡਾਊਨਲੋਡ ਕਰੋ (ਸ਼੍ਰੋ.ਅ.ਦ/ਆਪ/ਕਾਂਗਰਸ/ਭਾਜਪਾ ਸ਼ੀਟਾਂ)',
    action_plan_en: 'ਮਾਸਟਰ ਪਲਾਨ (English PDF)',
    action_plan_en_title: '187 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਡਾਊਨਲੋਡ ਕਰੋ (ਵਾਟਰਮਾਰਕ ਸਹਿਤ PDF)',
    action_plan_pa: '187 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ (ਪੰਜਾਬੀ PDF)',
    action_plan_pa_title: '187 ਬੂਥਾਂ ਦਾ ਵਿਸਥਾਰਪੂਰਵਕ ਮੈਦਾਨੀ ਪਲਾਨ ਪੰਜਾਬੀ ਵਿੱਚ ਡਾਊਨਲੋਡ ਕਰੋ',
    action_export_pdf: 'PDF ਐਕਸਪੋਰਟ',
    action_export_pdf_title: 'ਮੌਜੂਦਾ ਸਕ੍ਰੀਨ ਨੂੰ ਅਧਿਕਾਰਤ PDF ਵਿੱਚ ਐਕਸਪੋਰਟ ਕਰੋ',

    // KPI Cards
    kpi_booths_label: 'ਕੁੱਲ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ',
    kpi_booths_val: '187 ਬੂਥ',
    kpi_booths_sub: '● 100% ਤਸਦੀਕਸ਼ੁਦਾ ਤੇ ਨਿਗਰਾਨੀ ਹੇਠ',
    kpi_evm_label: '2024 ਈ.ਵੀ.ਐਮ ਪੋਲਿੰਗ',
    kpi_evm_val: '103,790',
    kpi_evm_sub: '● 100% ਫਾਰਮ-20 ਈ.ਵੀ.ਐਮ ਮੇਲ',
    kpi_sad_label: 'ਸ਼੍ਰੋ.ਅ.ਦ (ਅਨਿਲ ਜੋਸ਼ੀ)',
    kpi_sad_val: '40,981',
    kpi_sad_sub: '● 129 ਜਿੱਤਾਂ (39.5% ਹਿੱਸਾ | +12,451 ਲੀਡ)',
    kpi_aap_label: 'ਆਪ (ਕੁਲਦੀਪ ਧਾਲੀਵਾਲ)',
    kpi_aap_val: '28,530',
    kpi_aap_sub: '● 39 ਜਿੱਤਾਂ (27.5% ਹਿੱਸਾ | +22 ਬੂਥ ਵਾਧਾ)',

    // Registry Header & Toolbar
    registry_title: 'ਬੂਥ ਕਾਰਗੁਜ਼ਾਰੀ ਰਜਿਸਟਰੀ',
    registry_subtitle: '13-ਮਜੀਠਾ ਦੇ ਸਮੂਹ 187 ਬੂਥਾਂ ਦਾ ਵੋਟ ਵੇਰਵਾ, ਪੋਲਿੰਗ, ਜੇਤੂ ਅਤੇ ਜਿੱਤ-ਹਾਰ ਦੇ ਫ਼ਰਕ',
    booths_count: 'ਬੂਥ',
    reset_all: 'ਸਭ ਰੀਸੈਟ',
    search_registry_all: 'ਸਾਰੇ 187 ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਨਾਲ ਖੋਜੋ (ਜਿਵੇਂ 104, ਕੱਥੂਨੰਗਲ, ਸੋਹੀਆਂ)...',
    search_registry_party: '{party} ਕਾਰਗੁਜ਼ਾਰੀ ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਨਾਲ ਖੋਜੋ (ਜਿਵੇਂ 25, ਚਵਿੰਡਾ ਦੇਵੀ)...',
    sort_order_label: 'ਤਰਤੀਬ ਚੁਣੋ',
    label_booth_2024: '2024 ਬੂਥ',
    label_booth_2022: '2022 ਬੂਥ',
    pill_renumbered: 'ਰੀਨੰਬਰ ਕੀਤਾ',
    renumbered_desc: '2022 ਬੂਥ #{b22} ਤੋਂ ਬਦਲਿਆ',
    renumbered_badge: 'ਰੀਨੰਬਰ ਕੀਤਾ ਬੂਥ',

    // Party Hub Tabs
    tab_all_booths: 'ਸਾਰੇ ਬੂਥ',
    tab_sad_analytics: 'ਸ਼੍ਰੋ.ਅ.ਦ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_aap_analytics: 'ਆਪ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_bjp_analytics: 'ਭਾਜਪਾ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_inc_analytics: 'ਕਾਂਗਰਸ ਵਿਸ਼ਲੇਸ਼ਣ',
    wins_label: 'ਜਿੱਤਾਂ',

    // Telemetry Summary Row
    summary_turnout_label: 'ਕੁੱਲ ਪੋਲਿੰਗ',
    summary_evm_verified: 'ਫਾਰਮ-20 ਈ.ਵੀ.ਐਮ ਤਸਦੀਕਸ਼ੁਦਾ',
    summary_sad_lead: 'ਸ਼੍ਰੋ.ਅ.ਦ ਲੀਡ',
    summary_over_aap: 'ਆਪ ਉੱਤੇ',
    summary_seats_24: "2024 ਸੀਟਾਂ",

    // Party Sub-Filters
    filter_prefix: 'ਫਿਲਟਰ:',
    filter_all_booths: 'ਸਾਰੇ ਬੂਥ',
    filter_sad_won: 'ਸ਼੍ਰੋ.ਅ.ਦ ਜਿੱਤ',
    filter_aap_won: 'ਆਪ ਜਿੱਤ',
    filter_bjp_won: 'ਭਾਜਪਾ ਜਿੱਤ',
    filter_inc_won: 'ਕਾਂਗਰਸ ਜਿੱਤ',
    filter_flipped: 'ਤਬਦੀਲ ਬੂਥ',
    filter_retained: 'ਬਰਕਰਾਰ ਬੂਥ',
    filter_swing_high: 'ਵੱਡਾ ਉਲਟਫੇਰ (±10%)',
    filter_won_both: 'ਪੱਕੇ ਗੜ੍ਹ (ਦੋਵੇਂ ਜਿੱਤੇ)',
    filter_gained: '2024 ਵਿੱਚ ਨਵੇਂ ਜਿੱਤੇ',
    filter_lost_24: '2024 ਵਿੱਚ ਗਵਾਏ',
    filter_weak: 'ਕਮਜ਼ੋਰ ਬੂਥ (<20%)',
    filter_lost_both: 'ਦੋਵੇਂ ਚੋਣਾਂ ਵਿੱਚ ਹਾਰੇ',

    // Party Summary Stat Box
    stat_cand_22: '2022 ਉਮੀਦਵਾਰ',
    stat_cand_24: '2024 ਉਮੀਦਵਾਰ',
    stat_votes_22: '2022 ਕੁੱਲ ਵੋਟਾਂ',
    stat_votes_24: '2024 ਕੁੱਲ ਵੋਟਾਂ',
    stat_vote_diff: 'ਵੋਟਾਂ ਦਾ ਵਾਧਾ/ਘਾਟਾ',
    stat_swing: 'ਵੋਟ ਹਿੱਸੇਦਾਰੀ ਸਵਿੰਗ',
    stat_booths_22: "2022 ਜਿੱਤੇ ਬੂਥ",
    stat_booths_24: "2024 ਜਿੱਤੇ ਬੂਥ",
    stat_top_booth: 'ਸਿਖਰਲਾ ਬੂਥ',

    // Table & Grid View
    th_no: 'ਨੰ.',
    th_locality: 'ਪਿੰਡ / ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ',
    th_winner_22: '2022 ਜੇਤੂ',
    th_winner_24: '2024 ਜੇਤੂ',
    th_status: 'ਸਥਿਤੀ / ਤਬਦੀਲੀ',
    th_turnout_24: '2024 ਪੋਲਿੰਗ',
    th_turnout_shift: 'ਪੋਲਿੰਗ ਫ਼ਰਕ',
    th_category: 'ਸ਼੍ਰੇਣੀ',
    th_shift: 'ਫ਼ਰਕ',
    th_action: 'ਕਾਰਵਾਈ',
    btn_list: 'ਸੂਚੀ',
    btn_grid: 'ਗਰਿੱਡ',
    btn_view: 'ਵੇਰਵਾ',
    btn_pdf: 'PDF',
    votes_word: 'ਵੋਟਾਂ',
    swipe_hint: '⇄ ਸਾਰੇ ਨਤੀਜੇ ਵੇਖਣ ਲਈ ਖੱਬੇ-ਸੱਜੇ ਸਵਾਈਪ ਕਰੋ',
    no_match_title: '{query} ਨਾਲ ਕੋਈ ਬੂਥ ਨਹੀਂ ਮਿਲਿਆ।',
    no_match_sub: 'ਕੋਈ ਹੋਰ ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਦਾ ਨਾਂ (ਜਿਵੇਂ 104, ਸੋਹੀਆਂ, ਮਜੀਠਾ) ਖੋਜੋ ਜਾਂ ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ।',
    btn_clear_search: 'ਖੋਜ ਸਾਫ਼ ਕਰੋ',

    // Modal
    modal_title: '13-ਮਜੀਠਾ ਵਿਧਾਨ ਸਭਾ ਹਲਕਾ — ਅਧਿਕਾਰਤ ਬੂਥ ਦਸਤਾਵੇਜ਼',
    modal_sub: 'ਭਾਰਤੀ ਚੋਣ ਕਮਿਸ਼ਨ ਡਾਟਾ: 2022 ਵਿਧਾਨ ਸਭਾ ਬਨਾਮ 2024 ਲੋਕ ਸਭਾ ਚੋਣਾਂ (ਅੰਮ੍ਰਿਤਸਰ ਹਲਕਾ)',
    modal_booth_prefix: 'ਬੂਥ #',
    modal_turnout_title: 'ਵੋਟਰ ਪੋਲਿੰਗ ਅਤੇ ਹਿੱਸੇਦਾਰੀ ਤੁਲਨਾ',
    modal_polled_votes: 'ਕੁੱਲ ਪੋਲਿੰਗ',
    modal_net_shift: 'ਪੋਲਿੰਗ ਦਾ ਕੁੱਲ ਫ਼ਰਕ',
    modal_party_breakdown: '2022 ਬਨਾਮ 2024 ਪਾਰਟੀ ਵੋਟ ਵੇਰਵਾ',
    modal_masterplan_title: 'ਮੈਦਾਨੀ ਰਣਨੀਤਕ ਮਾਸਟਰ ਪਲਾਨ',
    modal_target_label: 'ਰਣਨੀਤਕ ਟੀਚਾ ਅਤੇ ਤਰਜੀਹ',
    modal_ground_label: 'ਜ਼ਮੀਨੀ ਕਾਰਵਾਈ ਨਿਰਦੇਸ਼',
    modal_campaign_label: 'ਵੋਟਰ ਸੰਪਰਕ ਅਤੇ ਪ੍ਰਚਾਰ ਸੁਨੇਹਾ',
    modal_cadre_label: 'ਬੂਥ ਵਰਕਰ ਅਤੇ ਨਿਗਰਾਨੀ ਤਾਇਨਾਤੀ',
    modal_print_btn: 'ਅਧਿਕਾਰਤ ਦਸਤਾਵੇਜ਼ ਪ੍ਰਿੰਟ ਕਰੋ',
    modal_mp_lang_en: 'English Plan',
    modal_mp_lang_pa: 'ਪੰਜਾਬੀ ਪਲਾਨ',

    // Sort Dropdown Labels
    sort_booth_asc: 'ਬੂਥ ਨੰਬਰ (1 → 187)',
    sort_booth_desc: 'ਬੂਥ ਨੰਬਰ (187 → 1)',
    sort_sad_desc: 'ਸ਼੍ਰੋ.ਅ.ਦ ਵੋਟਾਂ 2024 (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_aap_desc: 'ਆਪ ਵੋਟਾਂ 2024 (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_inc_desc: 'ਕਾਂਗਰਸ ਵੋਟਾਂ 2024 (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_bjp_desc: 'ਭਾਜਪਾ ਵੋਟਾਂ 2024 (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_margin_desc: 'ਜਿੱਤ ਦਾ ਫ਼ਰਕ 2024 (ਸਭ ਤੋਂ ਵੱਧ)',
    sort_swing_desc: 'ਆਪ ਸਵਿੰਗ % (ਵੱਧ ਲਾਭ)',
    sort_turnout_desc: '2024 ਕੁੱਲ ਪੋਲਿੰਗ (ਵੱਧ ਤੋਂ ਘੱਟ)'
  }
};

// Helper function to translate status chips
export function formatStatus(statusStr, lang) {
  if (!statusStr) return '';
  if (lang !== 'pa') return statusStr;

  const s = statusStr.trim();
  if (s === 'SAD Retained') return 'ਸ਼੍ਰੋ.ਅ.ਦ ਬਰਕਰਾਰ';
  if (s === 'AAP Retained') return 'ਆਪ ਬਰਕਰਾਰ';
  if (s === 'INC Retained') return 'ਕਾਂਗਰਸ ਬਰਕਰਾਰ';
  if (s === 'BJP Retained') return 'ਭਾਜਪਾ ਬਰਕਰਾਰ';
  if (s === 'Flipped to AAP' || s === 'SAD → AAP') return 'ਆਪ ਵੱਲ ਤਬਦੀਲ';
  if (s === 'Flipped to BJP' || s === 'SAD → BJP') return 'ਭਾਜਪਾ ਵੱਲ ਤਬਦੀਲ';
  if (s === 'Flipped to INC' || s === 'SAD → INC') return 'ਕਾਂਗਰਸ ਵੱਲ ਤਬਦੀਲ';
  if (s === 'Flipped to SAD' || s === 'AAP → SAD' || s === 'INC → SAD') return 'ਸ਼੍ਰੋ.ਅ.ਦ ਵੱਲ ਤਬਦੀਲ';
  if (s === 'Retained') return 'ਬਰਕਰਾਰ';
  if (s === 'Flipped') return 'ਤਬਦੀਲ';

  // Fallback for arrows
  return s
    .replace('SAD', 'ਸ਼੍ਰੋ.ਅ.ਦ')
    .replace('AAP', 'ਆਪ')
    .replace('INC', 'ਕਾਂਗਰਸ')
    .replace('BJP', 'ਭਾਜਪਾ')
    .replace('Retained', 'ਬਰਕਰਾਰ')
    .replace('Flipped', 'ਤਬਦੀਲ');
}

// Helper to translate category pills
export function formatCategory(catCode, lang) {
  if (lang !== 'pa') {
    if (catCode === 'WON_BOTH') return 'Stronghold';
    if (catCode === 'GAINED') return 'Gained';
    if (catCode === 'LOST_24') return 'Lost in 2024';
    if (catCode === 'WEAK') return 'Weak Booth';
    if (catCode === 'LOST_BOTH') return 'Lost Both';
    return catCode || '';
  }

  if (catCode === 'WON_BOTH') return 'ਪੱਕਾ ਗੜ੍ਹ';
  if (catCode === 'GAINED') return 'ਨਵੀਂ ਜਿੱਤ';
  if (catCode === 'LOST_24') return '2024 ਵਿੱਚ ਹਾਰੇ';
  if (catCode === 'WEAK') return 'ਕਮਜ਼ੋਰ ਬੂਥ';
  if (catCode === 'LOST_BOTH') return 'ਦੋਵੇਂ ਵਾਰ ਹਾਰੇ';
  return catCode || '';
}
