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

  if (!lessonId) {
    return {
      title: 'Sri Krishna Kirtan',
      openGraph: {
        images: ['/lord caitanya.jpeg'],
      },
    };
  }

  try {
    const response = await fetch('https://api.askharekrishna.com/api/v1/kirtans/', { next: { revalidate: 3600 } });
    const kirtans = await response.json();
    const lesson = kirtans.find((k: any) => k.id.toString() === lessonId);

    if (lesson) {
      const lang = sp.lang as string || 'ta';
      const translation = lesson.translations?.find((t: any) => t.language_code === lang) || lesson.translations?.[0];
      const title = translation?.title || `Kirtan ${lesson.id}`;
      const description = translation?.description || 'Listen to this divine kirtan.';
      let image = lesson.imagePath || lesson.image || lesson.categoryImage || '/lord caitanya.jpeg';
      
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
          url: `https://kirtan.askharekrishna.com/?lesson=${lessonId}`,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [image],
        }
      };
    }
  } catch (error) {
    console.error("Failed to generate dynamic metadata:", error);
  }

  return {}; // Fallback to layout.tsx defaults
}

export default function Page() {
  return <App />;
}
