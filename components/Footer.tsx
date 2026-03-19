import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto p-10 bg-stone-100 border-t border-stone-200">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-stone-400 text-sm italic">
          "Kirtaniyah sada harih" - Chant the holy names always.
        </p>
        {/* <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Documentation</a>
          <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Our Gurus</a>
          <a href="#" className="text-stone-400 hover:text-stone-600 transition-colors">Community</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
