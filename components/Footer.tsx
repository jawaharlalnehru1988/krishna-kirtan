import React from 'react';
import { getTranslation } from '../lib/translations';

interface FooterProps {
  selectedLanguage?: string;
}

const Footer: React.FC<FooterProps> = ({ selectedLanguage = 'en' }) => {
  const t = getTranslation(selectedLanguage);

  return (
    <footer className="mt-auto p-10 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-stone-400 dark:text-stone-500 text-sm italic">
          {t.nav.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
