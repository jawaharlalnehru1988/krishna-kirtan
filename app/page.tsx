import { Metadata, ResolvingMetadata } from 'next';
import App from '../App';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const sp = await searchParams;
  const lessonId = sp.lesson as string;
  const categoryParam = sp.category as string;
  const lang = sp.lang as string || 'ta';

  try {
    // 1. If sharing a specific lesson (song)
    if (lessonId) {
      const response = await fetch('https://api.askharekrishna.com/api/v1/kirtans/', { cache: 'no-store' });
      const kirtans = await response.json();
      const lesson = kirtans.find((k: any) => k.id.toString() === lessonId);

      if (lesson) {
        const translation = lesson.translations?.find((t: any) => t.language_code === lang) || lesson.translations?.[0];
        const title = translation?.title || `Kirtan ${lesson.id}`;
        const description = translation?.description || 'Listen to this divine kirtan.';
        
        // Find category image as a fallback if lesson doesn't have imagePath
        let categoryImage = '';
        try {
          const catResponse = await fetch('https://api.askharekrishna.com/api/v1/kirtan-categories/?lang=en', { cache: 'no-store' });
          const categories = await catResponse.json();
          const categoryObj = categories.find((c: any) => {
            const engTrans = c.translations?.find((t: any) => t.language_code === 'en');
            const stableId = engTrans?.name || c.name || c.id.toString();
            return stableId.toLowerCase() === lesson.category.toLowerCase();
          });
          if (categoryObj) {
            categoryImage = categoryObj.categoryImage;
          }
        } catch (e) {
          console.error("Failed to fetch categories for fallback image:", e);
        }

        let image = lesson.imagePath || lesson.image || lesson.categoryImage || categoryImage || '/lord caitanya.jpeg';
        
        // Ensure the image URL doesn't contain raw spaces, which breaks WhatsApp crawlers
        image = image.replace(/ /g, '%20');

        if (!image.startsWith('http')) {
          image = `https://kirtan.askharekrishna.com${image}`;
        }

        return {
          title: `${title} | Sri Krishna Kirtan`,
          description,
          openGraph: {
            title,
            description,
            images: [image],
            type: 'website',
            url: `https://kirtan.askharekrishna.com/?category=${encodeURIComponent(lesson.category)}&lesson=${lessonId}${lang !== 'ta' ? `&lang=${lang}` : ''}`,
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
          }
        };
      }
    }

    // 2. If sharing a category page
    if (categoryParam) {
      const catResponse = await fetch(`https://api.askharekrishna.com/api/v1/kirtan-categories/?lang=${lang}`, { cache: 'no-store' });
      const categories = await catResponse.json();
      
      const categoryObj = categories.find((c: any) => {
        const engTrans = c.translations?.find((t: any) => t.language_code === 'en');
        const stableId = engTrans?.name || c.name || c.id.toString();
        return stableId.toLowerCase() === categoryParam.toLowerCase() || c.name.toLowerCase() === categoryParam.toLowerCase();
      });

      if (categoryObj) {
        const title = categoryObj.name;
        const isTa = lang === 'ta';
        const description = isTa 
          ? `ஸ்ரீ கிருஷ்ண கீர்த்தனம் - ${title} பகுப்பில் உள்ள தெய்வீக கீர்த்தனைகள், வரிகள் மற்றும் மொழிபெயர்ப்புகளைக் கண்டறியவும்.`
          : `Sri Krishna Kirtan - Discover divine kirtans, lyrics, and translations in the ${title} category.`;
        let image = categoryObj.categoryImage || '/lord caitanya.jpeg';

        image = image.replace(/ /g, '%20');
        if (!image.startsWith('http')) {
          image = `https://kirtan.askharekrishna.com${image}`;
        }

        return {
          title: `${title} | Sri Krishna Kirtan`,
          description,
          openGraph: {
            title: `${title} | Sri Krishna Kirtan`,
            description,
            images: [image],
            type: 'website',
            url: `https://kirtan.askharekrishna.com/?category=${encodeURIComponent(categoryParam)}${lang !== 'ta' ? `&lang=${lang}` : ''}`,
          },
          twitter: {
            card: 'summary_large_image',
            title: `${title} | Sri Krishna Kirtan`,
            description,
            images: [image],
          }
        };
      }
    }
  } catch (error) {
    console.error("Failed to generate dynamic metadata:", error);
  }

  // Fallback default
  return {
    title: 'Sri Krishna Kirtan',
    description: 'Official Sri Krishna Kirtan Music Library - Discover divine kirtans, lyrics, and translations.',
    openGraph: {
      title: 'Sri Krishna Kirtan - Music Library',
      description: 'Discover divine kirtans, lyrics, and translations in multiple languages.',
      images: ['/lord caitanya.jpeg'],
      type: 'website',
      url: 'https://kirtan.askharekrishna.com',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sri Krishna Kirtan - Music Library',
      description: 'Discover divine kirtans, lyrics, and translations in multiple languages.',
      images: ['/lord caitanya.jpeg'],
    }
  };
}

export default function Page() {
  return <App />;
}
