'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Globe, X, Search, Check } from 'lucide-react';
import styles from './LanguageSwitcher.module.scss';
import { LANGUAGES, LanguageOption } from '@/constants/languages';
import { FlagIcon } from './FlagIcon';

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean; includedLanguages: string },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const switcherText: Record<
  string,
  {
    title: string;
    subtitle: string;
    search: string;
    close: string;
    footer: string;
  }
> = {
  en: {
    title: 'Select Language',
    subtitle: 'Choose a language for the portfolio',
    search: 'Search languages...',
    close: 'Close',
    footer: 'Powered by instant multilingual translation',
  },
  id: {
    title: 'Pilih Bahasa',
    subtitle: 'Pilih bahasa untuk portofolio',
    search: 'Cari bahasa...',
    close: 'Tutup',
    footer: 'Didukung penerjemahan instan multibahasa',
  },
  de: {
    title: 'Sprache auswählen',
    subtitle: 'Wähle eine Sprache für das Portfolio',
    search: 'Sprachen suchen...',
    close: 'Schließen',
    footer: 'Unterstützt durch sofortige mehrsprachige Übersetzung',
  },
  'zh-CN': {
    title: '选择语言',
    subtitle: '为作品集选择语言',
    search: '搜索语言...',
    close: '关闭',
    footer: '支持即时多语言翻译',
  },
  ja: {
    title: '言語を選択',
    subtitle: 'ポートフォリオの言語を選択してください',
    search: '言語を検索...',
    close: '閉じる',
    footer: '即時多言語翻訳に対応',
  },
  ko: {
    title: '언어 선택',
    subtitle: '포트폴리오에 사용할 언어를 선택하세요',
    search: '언어 검색...',
    close: '닫기',
    footer: '즉시 다국어 번역 지원',
  },
  ar: {
    title: 'اختر اللغة',
    subtitle: 'اختر لغة ملف الأعمال',
    search: 'ابحث عن لغة...',
    close: 'إغلاق',
    footer: 'مدعوم بالترجمة الفورية متعددة اللغات',
  },
  th: {
    title: 'เลือกภาษา',
    subtitle: 'เลือกภาษาสำหรับพอร์ตโฟลิโอ',
    search: 'ค้นหาภาษา...',
    close: 'ปิด',
    footer: 'รองรับการแปลหลายภาษาแบบทันที',
  },
  vi: {
    title: 'Chọn ngôn ngữ',
    subtitle: 'Chọn ngôn ngữ cho hồ sơ năng lực',
    search: 'Tìm kiếm ngôn ngữ...',
    close: 'Đóng',
    footer: 'Hỗ trợ dịch đa ngôn ngữ tức thì',
  },
  ms: {
    title: 'Pilih Bahasa',
    subtitle: 'Pilih bahasa untuk portfolio',
    search: 'Cari bahasa...',
    close: 'Tutup',
    footer: 'Disokong oleh terjemahan berbilang bahasa segera',
  },
  hi: {
    title: 'भाषा चुनें',
    subtitle: 'पोर्टफोलियो के लिए भाषा चुनें',
    search: 'भाषा खोजें...',
    close: 'बंद करें',
    footer: 'तत्काल बहुभाषी अनुवाद द्वारा समर्थित',
  },
  tl: {
    title: 'Pumili ng Wika',
    subtitle: 'Pumili ng wika para sa portfolio',
    search: 'Maghanap ng wika...',
    close: 'Isara',
    footer: 'Pinapagana ng agarang pagsasaling multilingguwal',
  },
};

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dragInfo = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    hasMoved: false,
  });

  const getInitialPosition = useCallback(() => {
    if (typeof window === 'undefined') return { x: 28, y: 500 };
    const isMobile = window.innerWidth <= 768;
    const btnW = 48;
    const defaultX = isMobile ? window.innerWidth - btnW - 16 : window.innerWidth - btnW - 28;
    const defaultY = isMobile ? window.innerHeight - 84 : window.innerHeight - 84;
    return { x: defaultX, y: Math.max(20, defaultY) };
  }, []);

  useEffect(() => {
    setPosition(getInitialPosition());
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return getInitialPosition();
        const btnW = buttonRef.current?.offsetWidth || 48;
        const btnH = buttonRef.current?.offsetHeight || 48;
        const clampedX = Math.max(10, Math.min(window.innerWidth - btnW - 10, prev.x));
        const clampedY = Math.max(10, Math.min(window.innerHeight - btnH - 10, prev.y));
        return { x: clampedX, y: clampedY };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getInitialPosition]);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    if (match && match[1] && match[1] !== 'en') {
      setSelectedLang(match[1]);
      localStorage.setItem('portfolio_language', match[1]);
      return;
    }

    const saved = localStorage.getItem('portfolio_language');
    if (saved && saved !== 'en') {
      setSelectedLang(saved);
      return;
    }

    setSelectedLang('en');
    localStorage.removeItem('portfolio_language');
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'id,en,de,zh-CN,ja,ko,ar,th,vi,ms,hi,tl',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const sanitizeBody = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      const frames = document.querySelectorAll(
        'iframe.skiptranslate, iframe[id*=":1.container"], .VIpgJd-ZVi9od-ORHb-OEVmcd, body > .skiptranslate'
      );
      frames.forEach((el) => {
        const h = el as HTMLElement;
        h.style.setProperty('display', 'none', 'important');
        h.style.setProperty('visibility', 'hidden', 'important');
      });
    };

    sanitizeBody();
    const observer = new MutationObserver(sanitizeBody);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentOption = useMemo(() => {
    return LANGUAGES.find((lang) => lang.code === selectedLang) ?? LANGUAGES[0];
  }, [selectedLang]);

  const copy = switcherText[selectedLang] ?? switcherText.en;

  const languageNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([selectedLang], { type: 'language' });
    } catch {
      return new Intl.DisplayNames(['en'], { type: 'language' });
    }
  }, [selectedLang]);

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        languageNames.of(lang.code)?.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q)
    );
  }, [languageNames, searchQuery]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    const currentX = position?.x ?? (buttonRef.current?.getBoundingClientRect().left || 28);
    const currentY = position?.y ?? (buttonRef.current?.getBoundingClientRect().top || 500);

    dragInfo.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initX: currentX,
      initY: currentY,
      hasMoved: false,
    };

    setIsSnapping(false);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!dragInfo.current.isDragging) return;
      const dx = moveEvent.clientX - dragInfo.current.startX;
      const dy = moveEvent.clientY - dragInfo.current.startY;

      if (!dragInfo.current.hasMoved && Math.hypot(dx, dy) > 5) {
        dragInfo.current.hasMoved = true;
      }

      if (dragInfo.current.hasMoved) {
        const btnW = buttonRef.current?.offsetWidth || 48;
        const btnH = buttonRef.current?.offsetHeight || 48;
        const isMobile = window.innerWidth <= 768;
        const bottomInset = isMobile ? 80 : 16;

        const nextX = Math.max(10, Math.min(window.innerWidth - btnW - 10, dragInfo.current.initX + dx));
        const nextY = Math.max(10, Math.min(window.innerHeight - btnH - bottomInset, dragInfo.current.initY + dy));
        setPosition({ x: nextX, y: nextY });
      }
    };

    const onPointerUp = () => {
      if (!dragInfo.current.isDragging) return;
      dragInfo.current.isDragging = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (!dragInfo.current.hasMoved) {
        return;
      }

      const btnW = buttonRef.current?.offsetWidth || 48;
      const isMobile = window.innerWidth <= 768;
      const margin = isMobile ? 16 : 28;

      setPosition((prev) => {
        if (!prev) return null;
        const snapLeft = margin;
        const snapRight = window.innerWidth - btnW - margin;
        const midPoint = window.innerWidth / 2;
        const targetX = prev.x + btnW / 2 < midPoint ? snapLeft : snapRight;

        setIsSnapping(true);
        setTimeout(() => setIsSnapping(false), 360);

        return { x: targetX, y: prev.y };
      });
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const clearGoogtransCookies = () => {
    const host = window.location.hostname;
    const domainParts = host.split('.');
    const names = ['googtrans'];

    names.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;

      if (domainParts.length >= 2) {
        const rootDomain = domainParts.slice(-2).join('.');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
      }
    });

    localStorage.removeItem('portfolio_language');
  };

  const setGoogtransCookie = (langCode: string) => {
    const host = window.location.hostname;
    const domainParts = host.split('.');
    const val = `/en/${langCode}`;

    document.cookie = `googtrans=${val}; path=/;`;
    document.cookie = `googtrans=${val}; path=/; domain=${host};`;
    document.cookie = `googtrans=${val}; path=/; domain=.${host};`;

    if (domainParts.length >= 2) {
      const rootDomain = domainParts.slice(-2).join('.');
      document.cookie = `googtrans=${val}; path=/; domain=.${rootDomain};`;
    }

    localStorage.setItem('portfolio_language', langCode);
  };

  const handleSelectLanguage = (lang: LanguageOption) => {
    setIsOpen(false);

    if (lang.code === 'en') {
      clearGoogtransCookies();
      setSelectedLang('en');
      window.location.reload();
      return;
    }

    if (lang.code === selectedLang) {
      return;
    }

    setSelectedLang(lang.code);
    setGoogtransCookie(lang.code);
    window.location.reload();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragInfo.current.hasMoved) {
      dragInfo.current.hasMoved = false;
      return;
    }
    setIsOpen((prev) => !prev);
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const buttonStyle: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        right: 'auto',
      }
    : {};

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <button
        ref={buttonRef}
        type="button"
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        style={buttonStyle}
        className={`${styles.floatingBtn} ${isSnapping ? styles.snapping : ''}`}
        aria-label={copy.title}
      >
        <span className={styles.langText}>{currentOption.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={styles.modalHeader}>
              <div className={styles.headerTextGroup}>
                <div className={styles.headerTitleRow}>
                  <Globe size={22} className={styles.globeIcon} />
                  <h3 className={styles.modalTitle}>{copy.title}</h3>
                </div>
                <p className={styles.modalSubtitle}>{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
                aria-label={copy.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder={copy.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.langList}>
              {filteredLanguages.map((lang) => {
                const isActive = lang.code === selectedLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`${styles.langCard} ${isActive ? styles.active : ''}`}
                  >
                    <div className={styles.langCardLeft}>
                      <FlagIcon code={lang.code} className={styles.cardFlagSvg} />
                      <div className={styles.cardNames}>
                        <span className={styles.nativeName}>{lang.nativeName}</span>
                        <span className={styles.subName}>
                          {languageNames.of(lang.code) ?? lang.name}
                        </span>
                      </div>
                    </div>
                    {isActive && <Check size={18} className={styles.checkIcon} />}
                  </button>
                );
              })}
            </div>

            <div className={styles.modalFooter}>
              <p className={styles.footerNote}>{copy.footer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
