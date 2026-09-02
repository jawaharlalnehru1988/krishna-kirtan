export interface TranslationSchema {
  hero: {
    title: string;
    subtitle: string;
    startBtn: string;
    exploreBtn: string;
  };
  about: {
    badge: string;
    heading: string;
    quote: string;
    description: string;
    author: string;
    authorTitle: string;
  };
  categories: {
    heading: string;
    subtitle: string;
    startLink: string;
  };
  categoryFallback: {
    kirtan: string;
    bhajan: string;
    prayer: string;
    raga: string;
    default: string;
  };
  nav: {
    backToLibrary: string;
    previousLesson: string;
    nextLesson: string;
    share: string;
    copied: string;
    downloadPdf: string;
    searchPlaceholder: string;
    noLessonsFound: string;
    clearFilter: string;
    lyrics: string;
    meaning: string;
    translations: string;
    category: string;
    author: string;
    listenAudio: string;
    watchVideo: string;
    wordByWord: string;
    copyright: string;
    language: string;
    exploreSongs: string;
    musicLibrary: string;
    installApp: string;
    signOut: string;
    login: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  en: {
    hero: {
      title: 'Sri Krishna Kirtan',
      subtitle: '"Kirtan is the call of the soul for the Supreme Soul."',
      startBtn: 'Start Listening',
      exploreBtn: 'Explore Library',
    },
    about: {
      badge: 'Divine Inspiration',
      heading: 'Teachings and Kirtans of His Divine Grace',
      quote: '"Simply by chanting this holy name of Hari, one can become free from all the reactions of sinful life. This kirtan movement is the only way to realize God in this age."',
      description: 'Our library is dedicated to preserving the divine kirtans, bhajans, and prayers shared by A.C. Bhaktivedanta Swami Prabhupada and His Sincere followers. Immerse yourself in the transcendental sound vibration and discover the peace of devotional service through hearing.',
      author: 'Srila Prabhupada',
      authorTitle: 'Founder-Acharya of ISKCON',
    },
    categories: {
      heading: 'Immersion in Sound',
      subtitle: 'Select a category to explore our extensive collection of kirtans, bhajans, and spiritual discourses.',
      startLink: 'Start Listening ➔',
    },
    categoryFallback: {
      kirtan: 'Congregational chanting of the Holy Names. Experience the ecstasy of Sankirtana.',
      bhajan: 'Devotional songs and prayers that touch the heart and awaken the soul.',
      prayer: 'Sacred mantras and appeals for divine grace and guidance.',
      raga: 'Traditional melodies that set the mood for deep meditation and worship.',
      default: 'Explore our collection of devotional kirtans, bhajans, and prayers.'
    },
    nav: {
      backToLibrary: 'Back to Library',
      previousLesson: 'Previous',
      nextLesson: 'Next',
      share: 'Share',
      copied: 'Copied!',
      downloadPdf: 'Download PDF',
      searchPlaceholder: 'Search Kirtan, Bhajan, or Lyrics...',
      noLessonsFound: 'No lessons found in this category.',
      clearFilter: 'Clear search filter',
      lyrics: 'Lyrics',
      meaning: 'Meaning',
      translations: 'Translations',
      category: 'Category',
      author: 'Author',
      listenAudio: 'Listen Audio',
      watchVideo: 'Watch Video',
      wordByWord: 'Word by Word Meaning',
      copyright: '"Kirtaniyah sada harih" - Chant the holy names always.',
      language: 'Language',
      exploreSongs: 'Explore Songs',
      musicLibrary: 'Music Library',
      installApp: 'Install App',
      signOut: 'Sign out',
      login: 'Login',
    }
  },
  ta: {
    hero: {
      title: 'ஸ்ரீ கிருஷ்ண கீர்த்தனம்',
      subtitle: '"கீர்த்தனை என்பது பரமாத்மாவை நோக்கிய ஆத்மாவின் அழைப்பு."',
      startBtn: 'கேட்கத் தொடங்குங்கள்',
      exploreBtn: 'நூலகத்தை ஆராயுங்கள்',
    },
    about: {
      badge: 'தெய்வீக பொன்மொழிகள்',
      heading: 'ஸ்ரீல பிரபுபாதரின் போதனைகள் மற்றும் கீர்த்தனைகள்',
      quote: '"ஹரியின் இந்த திருநாமத்தை உச்சரிப்பதன் மூலம், பாவ வாழ்வின் அனைத்து விளைவுகளிலிருந்தும் விடுபடலாம். இந்த யுகத்தில் கடவுளை உணர்வதற்கு இந்த கீர்த்தனை இயக்கம் மட்டுமே வழி."',
      description: 'தெய்வத்திரு ஏ.சி. பக்திவேதாந்த சுவாமி பிரபுபாதர் மற்றும் அவரது சீடர்களால் பகிரப்பட்ட தெய்வீக கீர்த்தனைகள், பஜனைகள் மற்றும் பிரார்த்தனைகளைப் பாதுகாப்பதில் அர்ப்பணிக்கப்பட்டுள்ளது. ஆன்மீக ஒலி அதிர்வுகளில் மூழ்கி, இதனை கேட்பதன் மூலம் பக்தி சேவையின் அமைதியைக் கண்டறியுங்கள்.',
      author: 'ஸ்ரீல பிரபுபாதா',
      authorTitle: 'இஸ்கான் நிறுவனர்-ஆச்சார்யா',
    },
    categories: {
      heading: 'ஆன்மீக ஒலியில் மூழ்குதல்',
      subtitle: 'கீர்த்தனைகள், பஜனைகள் மற்றும் ஆன்மீக உரைகளின் விரிவான தொகுப்பை ஆராய ஒரு வகையைத் தேர்ந்தெடுக்கவும்.',
      startLink: 'கேட்கத் தொடங்குங்கள் ➔',
    },
    categoryFallback: {
      kirtan: 'திருநாமங்களின் சங்கீர்த்தனம். சங்கீர்த்தனத்தின் பேரின்பத்தை அனுபவியுங்கள்.',
      bhajan: 'இதயத்தைத் தொடும் மற்றும் ஆத்மாவை விழிப்படையச் செய்யும் பக்தி பாடல்கள் மற்றும் பிரார்த்தனைகள்.',
      prayer: 'தெய்வீக அருள் மற்றும் வழிகாட்டுதலுக்கான புனித மந்திரங்கள் மற்றும் விண்ணப்பங்கள்.',
      raga: 'ஆழ்ந்த தியானம் மற்றும் வழிபாட்டிற்கான மனநிலையை அமைக்கும் பாரம்பரிய ராகங்கள்.',
      default: 'எங்கள் கீர்த்தனைகள், பஜனைகள் மற்றும் பிரார்த்தனைகளின் தொகுப்பை ஆராயுங்கள்.'
    },
    nav: {
      backToLibrary: 'நூலகத்திற்கு திரும்பு',
      previousLesson: 'முந்தையது',
      nextLesson: 'அடுத்தது',
      share: 'பகிர்',
      copied: 'நகலெடுக்கப்பட்டது!',
      downloadPdf: 'PDF பதிவிறக்கவும்',
      searchPlaceholder: 'கீர்த்தனை, பஜனை அல்லது வரிகளைத் தேடுங்கள்...',
      noLessonsFound: 'இந்த பிரிவில் பாடல்கள் எதுவும் இல்லை.',
      clearFilter: 'தேடல் வடிகட்டியை நீக்கு',
      lyrics: 'வரிகள்',
      meaning: 'பொருள்',
      translations: 'மொழிபெயர்ப்புகள்',
      category: 'பிரிவு',
      author: 'இயற்றியவர்',
      listenAudio: 'ஆடியோ கேளுங்கள்',
      watchVideo: 'வீடியோ பாருங்கள்',
      wordByWord: 'சொல் பொருள்',
      copyright: '"கீர்த்தனீயஃ சதா ஹரிஃ" - எப்போதும் ஹரியின் திருநாமங்களை ஜபிக்கவும்.',
      language: 'மொழி',
      exploreSongs: 'பாடல்களை ஆராயுங்கள்',
      musicLibrary: 'இசை நூலகம்',
      installApp: 'செயலியை நிறுவுக',
      signOut: 'வெளியேறு',
      login: 'உள்நுழைவு',
    }
  },
  hi: {
    hero: {
      title: 'श्री कृष्ण कीर्तन',
      subtitle: '"कीर्तन परमात्मा के लिए आत्मा की पुकार है।"',
      startBtn: 'सुनना शुरू करें',
      exploreBtn: 'संग्रह देखें',
    },
    about: {
      badge: 'दिव्य प्रेरणा',
      heading: 'श्रील प्रभुपाद की शिक्षाएं और कीर्तन',
      quote: '"केवल हरि के इस पवित्र नाम का जाप करने से, मनुष्य पापमय जीवन की सभी प्रतिक्रियाओं से मुक्त हो सकता है। इस युग में भगवान को जानने का एकमात्र तरीका यह कीर्तन आंदोलन है।"',
      description: 'हमारा संग्रह ए.सी. भक्तिवेदांत स्वामी प्रभुपाद और उनके निष्ठावान अनुयायियों द्वारा साझा किए गए दिव्य कीर्तनों, भजनों और प्रार्थनाओं को संरक्षित करने के लिए समर्पित है। दिव्य ध्वनि कंपन में खुद को विसर्जित करें और सुनकर भक्ति सेवा की शांति का अनुभव करें।',
      author: 'श्रील प्रभुपाद',
      authorTitle: 'इस्कॉन के संस्थापक-आचार्य',
    },
    categories: {
      heading: 'ध्वनि में निमज्जन',
      subtitle: 'कीर्तनों, भजनों और आध्यात्मिक प्रवचनों के हमारे व्यापक संग्रह का पता लगाने के लिए एक श्रेणी चुनें।',
      startLink: 'सुनना शुरू करें ➔',
    },
    categoryFallback: {
      kirtan: 'पवित्र नामों का सामूहिक संकीर्तन। संकीर्तन के परमानंद का अनुभव करें।',
      bhajan: 'भक्ति गीत और प्रार्थनाएँ जो हृदय को छूती हैं और आत्मा को जगाती हैं।',
      prayer: 'दिव्य कृपा और मार्गदर्शन के लिए पवित्र मंत्र और प्रार्थनाएँ।',
      raga: 'पारंपरिक धुनें जो गहन ध्यान और पूजा के लिए वातावरण बनाती हैं।',
      default: 'भक्ति कीर्तनों, भजनों और प्रार्थनाओं के हमारे संग्रह का अन्वेषण करें।'
    },
    nav: {
      backToLibrary: 'लाइब्रेरी पर वापस जाएं',
      previousLesson: 'पिछला',
      nextLesson: 'अगला',
      share: 'शेयर करें',
      copied: 'कॉपी किया गया!',
      downloadPdf: 'PDF डाउनलोड करें',
      searchPlaceholder: 'कीर्तन, भजन या बोल खोजें...',
      noLessonsFound: 'इस श्रेणी में कोई गीत नहीं मिला।',
      clearFilter: 'खोज फ़िल्टर साफ़ करें',
      lyrics: 'बोल',
      meaning: 'अर्थ',
      translations: 'अनुवाद',
      category: 'श्रेणी',
      author: 'रचयिता',
      listenAudio: 'ऑडियो सुनें',
      watchVideo: 'वीडियो देखें',
      wordByWord: 'शब्दार्थ',
      copyright: '"कीर्तनीयः सदा हरिः" - सदैव हरि के पवित्र नाम का संकीर्तन करें।',
      language: 'भाषा',
      exploreSongs: 'गीत देखें',
      musicLibrary: 'संगीत संग्रह',
      installApp: 'ऐप इंस्टॉल करें',
      signOut: 'साइन आउट',
      login: 'लॉग इन',
    }
  },
  kn: {
    hero: {
      title: 'ಶ್ರೀ ಕೃಷ್ಣ ಕೀರ್ತನೆ',
      subtitle: '"ಕೀರ್ತನೆಯು ಪರಮಾತ್ಮನಿಗಾಗಿ ಆತ್ಮದ ಕರೆಯಾಗಿದೆ."',
      startBtn: 'ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ',
      exploreBtn: 'ಗ್ರಂಥಾಲಯ ಅನ್ವೇಷಿಸಿ',
    },
    about: {
      badge: 'ದಿವ್ಯ ಪ್ರೇರಣೆ',
      heading: 'ಶ್ರೀಲ ಪ್ರಭುಪಾದರ ಬೋಧನೆಗಳು ಮತ್ತು ಕೀರ್ತನೆಗಳು',
      quote: '"ಹರಿಯ ಈ ಪವಿತ್ರ ನಾಮವನ್ನು ಜಪಿಸುವುದರಿಂದ ಮನುಷ್ಯನು ಪಾಪದ ಫಲಗಳಿಂದ ಮುಕ್ತನಾಗಬಹುದು. ಈ ಯುಗದಲ್ಲಿ ಭಗವಂತನನ್ನು ಸಾಕ್ಷಾತ್ಕರಿಸಿಕೊಳ್ಳಲು ಕೀರ್ತನ ಚಳವಳಿಯೇ ಏಕೈಕ ಮಾರ್ಗ."',
      description: 'ಎ.ಸಿ. ಭಕ್ತಿವೇದಾಂತ ಸ್ವಾಮಿ ಪ್ರಭುಪಾದರು ಮತ್ತು ಅವರ ಶಿಷ್ಯರು ಹಂಚಿಕೊಂಡ ದಿವ್ಯ ಕೀರ್ತನೆಗಳು, ಭಜನೆಗಳು ಮತ್ತು ಪ್ರಾರ್ಥನೆಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ನಮ್ಮ ಗ್ರಂಥಾಲಯ ಮುಡಿಪಾಗಿದೆ. ದಿವ್ಯ ಧ್ವನಿ ಕಂಪನದಲ್ಲಿ ಮುಳುಗಿ ಬಕ್ತಿ ಸೇವೆಯ ಶಾಂತಿಯನ್ನು ಅನುಭವಿಸಿ.',
      author: 'ಶ್ರೀಲ ಪ್ರಭುಪಾದ',
      authorTitle: 'ಇಸ್ಕಾನ್ ಸಂಸ್ಥಾಪಕ-ಆಚಾರ್ಯ',
    },
    categories: {
      heading: 'ದಿವ್ಯ ಧ್ವನಿಯಲ್ಲಿ ಲೀನ',
      subtitle: 'ಕೀರ್ತನೆಗಳು, ಭಜನೆಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರವಚನಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      startLink: 'ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ ➔',
    },
    categoryFallback: {
      kirtan: 'ಪವಿತ್ರ ನಾಮಗಳ ಸಂಕೀರ್ತನೆ. ಸಂಕೀರ್ತನೆಯ ಪರಮಾನಂದವನ್ನು ಅನುಭವಿಸಿ.',
      bhajan: 'ಹೃದಯವನ್ನು ಸ್ಪರ್ಶಿಸುವ ಮತ್ತು ಆತ್ಮವನ್ನು ಎಚ್ಚರಿಸುವ ಭಕ್ತಿ ಗೀತೆಗಳು.',
      prayer: 'ದಿವ್ಯ ಕೃಪೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಪವಿತ್ರ ಮಂತ್ರಗಳು.',
      raga: 'ಆಳವಾದ ಧ್ಯಾನ ಮತ್ತು ಪೂಜೆಗೆ ವಾತಾವರಣ ಸೃಷ್ಟಿಸುವ ರಾಗಗಳು.',
      default: 'ನಮ್ಮ ಭಕ್ತಿ ಕೀರ್ತನೆಗಳು ಮತ್ತು ಭಜನೆಗಳ ಸಂಗ್ರಹವನ್ನು ಅನ್ವೇಷಿಸಿ.'
    },
    nav: {
      backToLibrary: 'ಗ್ರಂಥಾಲಯಕ್ಕೆ ಹಿಂತಿರುಗಿ',
      previousLesson: 'ಹಿಂದಿನ',
      nextLesson: 'ಮುಂದಿನ',
      share: 'ಹಂಚಿಕೊಳ್ಳಿ',
      copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
      downloadPdf: 'PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      searchPlaceholder: 'ಕೀರ್ತನೆ, ಭಜನೆ ಅಥವಾ ಸಾಹಿತ್ಯ ಹುಡುಕಿ...',
      noLessonsFound: 'ಈ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಹಾಡುಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      clearFilter: 'ಹುಡುಕಾಟ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
      lyrics: 'ಸಾಹಿತ್ಯ',
      meaning: 'ಅರ್ಥ',
      translations: 'ಅನುವಾದಗಳು',
      category: 'ವರ್ಗ',
      author: 'ರಚನೆಕಾರ',
      listenAudio: 'ಆಡಿಯೋ ಕೇಳಿ',
      watchVideo: 'ವೀಡಿಯೊ ವೀಕ್ಷಿಸಿ',
      wordByWord: 'ಪದಶಃ ಅರ್ಥ',
      copyright: '"ಕೀರ್ತನೀಯಃ ಸದಾ ಹರಿಃ" - ಯಾವಾಗಲೂ ಹರಿಯ ಪವಿತ್ರ ನಾಮಗಳನ್ನು ಜಪಿಸಿ.',
      language: 'ಭಾಷೆ',
      exploreSongs: 'ಹಾಡುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      musicLibrary: 'ಸಂಗೀತ ಗ್ರಂಥಾಲಯ',
      installApp: 'ಆ್ಯಪ್‌ ಸ್ಥಾಪಿಸಿ',
      signOut: 'ಸೈನ್ ಔಟ್',
      login: 'ಲಾಗಿನ್',
    }
  },
  ml: {
    hero: {
      title: 'ശ്രീ കൃഷ്ണ കീർത്തനം',
      subtitle: '"പരമാത്മാവിനായുള്ള ആത്മാവിന്റെ വിളിയാണ് കീർത്തനം."',
      startBtn: 'കേൾക്കാൻ തുടങ്ങുക',
      exploreBtn: 'ലൈബ്രറി കാണുക',
    },
    about: {
      badge: 'ദിവ്യ പ്രചോദനം',
      heading: 'ശ്രീല പ്രഭുപാദരുടെ ഉപദേശങ്ങളും കീർത്തനങ്ങളും',
      quote: '"ഹരിയുടെ ഈ നാമം ജപിക്കുന്നതിലൂടെ എല്ലാ പാപങ്ങളിൽ നിന്നും മുക്തി നേടാം. ഈ യുഗത്തിൽ ഭഗവാനെ സാക്ഷാത്കരിക്കാനുള്ള ഒരേയൊരു വഴി ഈ കീർത്തന പ്രസ്ഥാനമാണ്."',
      description: 'എ.സി. ഭക്തിവേദാന്ത സ്വാമി പ്രഭുപാദരും അദ്ദേഹത്തിന്റെ ശിഷ്യന്മാരും പങ്കുവെച്ച ദിവ്യ കീർത്തനങ്ങളും ഭജനകളും പ്രാർത്ഥനകളും സംരക്ഷിക്കുന്നതിനായി ഈ ലൈബ്രറി സമർപ്പിച്ചിരിക്കുന്നു. ദിവ്യ ശബ്ദ തരംഗങ്ങളിൽ മുഴുകി ഭക്തിസേവനത്തിന്റെ സമാധാനം അനുഭവിച്ചറിയൂ.',
      author: 'ശ്രീല പ്രഭുപാദർ',
      authorTitle: 'ഇസ്കോൺ സ്ഥാപക-ആചാര്യൻ',
    },
    categories: {
      heading: 'ദിവ്യ ശബ്ദത്തിൽ ലയിക്കുക',
      subtitle: 'കീർത്തനങ്ങളും ഭജനകളും കാണാൻ ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക.',
      startLink: 'കേൾക്കാൻ തുടങ്ങുക ➔',
    },
    categoryFallback: {
      kirtan: 'നാമസങ്കീർത്തനത്തിന്റെ ആനന്ദം അനുഭവിച്ചറിയൂ.',
      bhajan: 'ഹൃദയത്തെ സ്പർശിക്കുന്ന ഭക്തിഗാനങ്ങളും പ്രാർത്ഥനകളും.',
      prayer: 'ദിവ്യ കൃപയ്ക്കായുള്ള വിശുദ്ധ മന്ത്രങ്ങൾ.',
      raga: 'ആഴത്തിലുള്ള ധ്യാനത്തിനായുള്ള പരമ്പരാഗത രാഗങ്ങൾ.',
      default: 'ഞങ്ങളുടെ ഭക്തിഗാനങ്ങളുടെ ശേഖരം കാണുക.'
    },
    nav: {
      backToLibrary: 'ലൈബ്രറിയിലേക്ക് മടങ്ങുക',
      previousLesson: 'മുമ്പത്തേത്',
      nextLesson: 'അടുത്തത്',
      share: 'പങ്കുവെക്കുക',
      copied: 'കോപ്പി ചെയ്തു!',
      downloadPdf: 'PDF ഡൗൺലോഡ് ചെയ്യുക',
      searchPlaceholder: 'കീർത്തനം, ഭജനം അല്ലെങ്കിൽ വരികൾ തിരയുക...',
      noLessonsFound: 'ഈ വിഭാഗത്തിൽ ഗാനങ്ങളൊന്നും കണ്ടെത്തിയില്ല.',
      clearFilter: 'ഫിൽട്ടർ ഒഴിവാക്കുക',
      lyrics: 'വരികൾ',
      meaning: 'അർത്ഥം',
      translations: 'തർജ്ജമകൾ',
      category: 'വിഭാഗം',
      author: 'രചയിതാവ്',
      listenAudio: 'ഓഡിയോ കേൾക്കുക',
      watchVideo: 'വീഡിയോ കാണുക',
      wordByWord: 'പദാനുപദ അർത്ഥം',
      copyright: '"കീർത്തനീയഃ സദാ ഹരിഃ" - എപ്പോഴും ഹരിനാമം ജപിക്കുക.',
      language: 'ഭാഷ',
      exploreSongs: 'ഗാനങ്ങൾ കാണുക',
      musicLibrary: 'സംഗീത ശേഖരം',
      installApp: 'ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക',
      signOut: 'സൈൻ ഔട്ട്',
      login: 'ലോഗിൻ',
    }
  },
  bn: {
    hero: {
      title: 'শ্রী কৃষ্ণ কীর্তন',
      subtitle: '"কীর্তন হলো পরমাত্মার জন্য আত্মার আহ্বান।"',
      startBtn: 'শোনা শুরু করুন',
      exploreBtn: 'লাইব্রেরি দেখুন',
    },
    about: {
      badge: 'ঐশ্বরিক অনুপ্রেরণা',
      heading: 'শ্রীল প্রভুপাদের শিক্ষা ও কীর্তন',
      quote: '"শুধুমাত্র হরির এই পবিত্র নাম জপ করার মাধ্যমে মানুষ সমস্ত পাপকর্মের ফল থেকে মুক্ত হতে পারে। এই কলিযুগে ঈশ্বরকে অনুভূতির একমাত্র উপায় হলো এই কীর্তন আন্দোলন।"- শ্রীল প্রভুপাদ',
      description: 'আমাদের লাইব্রেরি এ.সি. ভক্তিবেদান্ত স্বামী প্রভুপাদ ও তাঁর অনুগামীদের ঐশ্বরিক কীর্তন, ভজন ও প্রার্থনা সংরক্ষণের জন্য নিবেদিত। ঐশ্বরিক শব্দ তরঙ্গে নিমজ্জিত হন এবং শ্রবণের মাধ্যমে ভক্তি সেবার শান্তি অনুভব করুন।',
      author: 'শ্রীল প্রভুপাদ',
      authorTitle: 'ইসকনের প্রতিষ্ঠাতা-আচার্য',
    },
    categories: {
      heading: 'ঐশ্বরিক শব্দে নিমজ্জন',
      subtitle: 'কীর্তন, ভজন ও আধ্যাত্মিক আলোচনার বিশাল সংগ্রহ অন্বেষণ করতে একটি বিভাগ নির্বাচন করুন।',
      startLink: 'শোনা শুরু করুন ➔',
    },
    categoryFallback: {
      kirtan: 'পবিত্র নামের সংকীর্তন। সংকীর্তনের পরম আনন্দ অনুভব করুন।',
      bhajan: 'ভক্তিমূলক গান ও প্রার্থনা যা হৃদয় স্পর্শ করে।',
      prayer: 'ঐশ্বরিক কৃপার জন্য পবিত্র মন্ত্র ও প্রার্থনা।',
      raga: 'গভীর ধ্যানের আবহ তৈরি করে এমন ঐতিহ্যবাহী সুর।',
      default: 'আমাদের ভক্তিমূলক গান ও ভজনের সংগ্রহ অন্বেষণ করুন।'
    },
    nav: {
      backToLibrary: 'লাইব্রেরিতে ফিরে যান',
      previousLesson: 'পূর্ববর্তী',
      nextLesson: 'পরবর্তী',
      share: 'শেয়ার করুন',
      copied: 'কপি করা হয়েছে!',
      downloadPdf: 'PDF ডাউনলোড করুন',
      searchPlaceholder: 'কীর্তন, ভজন বা গান খুঁজুন...',
      noLessonsFound: 'এই বিভাগে কোনো গান পাওয়া যায়নি।',
      clearFilter: 'ফিল্টার সাফ করুন',
      lyrics: 'লিরিক্স',
      meaning: 'অর্থ',
      translations: 'অনুবাদ',
      category: 'বিভাগ',
      author: 'রচয়িতা',
      listenAudio: 'অডিও শুনুন',
      watchVideo: 'ভিডিও দেখুন',
      wordByWord: 'শব্দার্থ',
      copyright: '"কীর্তনীয়ঃ সদা হরিঃ" - সর্বদা শ্রীহরির নাম সংকীর্তন করুন।',
      language: 'ভাষা',
      exploreSongs: 'গান অনুসন্ধান করুন',
      musicLibrary: 'সঙ্গীত সংগ্রাহক',
      installApp: 'অ্যাপ ইনস্টল করুন',
      signOut: 'সাইন আউট',
      login: 'লগ ইন',
    }
  },
  te: {
    hero: {
      title: 'శ్రీ కృష్ణ కీర్తన',
      subtitle: '"కీర్తన అనేది పరమాత్మ కోసం ఆత్మ యొక్క పిలుపు."',
      startBtn: 'వినడం ప్రారంభించండి',
      exploreBtn: 'లైబ్రరీ చూడండి',
    },
    about: {
      badge: 'దివ్య ప్రేరణ',
      heading: 'శ్రీల ప్రభుపాదుల బోధనలు మరియు కీర్తనలు',
      quote: '"హరి నామాన్ని జపించడం ద్వారా మానవుడు పాపాల నుండి విముక్తి పొందవచ్చు. ఈ యుగంలో భగవంతుడిని తెలుసుకోవడానికి కీర్తన ఉద్యమమే ఏకైక మార్గం."',
      description: 'ఎ.సి. భక్తివేదాంత స్వామి ప్రభుపాద్ మరియు వారి అనుచరులు అందించిన దివ్య కీర్తనలు, భజనలు మరియు ప్రార్థనలను పరిరక్షించడానికి ఈ లైబ్రరీ అంకితం చేయబడింది. దివ్య శబ్ద తరంగాలలో మునిగి భక్తి సేవ యొక్క శాంతిని అనుభవించండి.',
      author: 'శ్రీల ప్రభుపాద్',
      authorTitle: 'ఇస్కాన్ వ్యవస్థాపక-ఆచార్యులు',
    },
    categories: {
      heading: 'దివ్య శబ్దంలో లీనం',
      subtitle: 'కీర్తనలు, భజనలు మరియు ఆధ్యాత్మిక ప్రవచనాలను చూడటానికి ఒక వర్గాన్ని ఎంచుకోండి.',
      startLink: 'వినడం ప్రారంభించండి ➔',
    },
    categoryFallback: {
      kirtan: 'నామ సంకీర్తన యొక్క పరమానందాన్ని అనుభవించండి.',
      bhajan: 'హృదయాన్ని తాకే భక్తి పాటలు మరియు ప్రార్థనలు.',
      prayer: 'దివ్య కృప కోసం పవిత్ర మంత్రాలు.',
      raga: 'లోతైన ధ్యానం కోసం సంప్రదాయ రాగాలు.',
      default: 'మా భక్తి పాటలు మరియు కీర్తనల సేకరణను అన్వేషించండి.'
    },
    nav: {
      backToLibrary: 'లైబ్రరీకి తిరిగి వెళ్లండి',
      previousLesson: 'మునుపటి',
      nextLesson: 'తరువాత',
      share: 'షేర్ చేయండి',
      copied: 'కాపీ చేయబడింది!',
      downloadPdf: 'PDF డౌన్‌లోడ్ చేయండి',
      searchPlaceholder: 'కీర్తన, భజన లేదా సాహిత్యం శోధించండి...',
      noLessonsFound: 'ఈ వర్గంలో ఏ పాటలు లభించలేదు.',
      clearFilter: 'ఫిల్టర్ క్లియర్ చేయండి',
      lyrics: 'సాహిత్యం',
      meaning: 'అర్థం',
      translations: 'అనువాదాలు',
      category: 'వర్గం',
      author: 'రచయిత',
      listenAudio: 'ఆడియో వినండి',
      watchVideo: 'వీడియో చూడండి',
      wordByWord: 'పదాల అర్థం',
      copyright: '"కీర్తనీయః సదా హరిః" - ఎల్లప్పుడూ హరి నామాలను జపించండి.',
      language: 'భాష',
      exploreSongs: 'పాటలను చూడండి',
      musicLibrary: 'సంగీత సేకరణ',
      installApp: 'యాప్ ఇన్స్టాల్ చేయండి',
      signOut: 'సైన్ అవుట్',
      login: 'లాగిన్',
    }
  }
};

export const getTranslation = (lang: string): TranslationSchema => {
  return TRANSLATIONS[lang] || TRANSLATIONS['en'];
};
