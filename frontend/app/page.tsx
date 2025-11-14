import { getHomePage } from "@/lib/strapi";
import { HeroSection } from './components/hero-section';
import { Suspense } from 'react';

export async function generateMetadata() {
  const strapiData = await getHomePage();
  const { title, description } = strapiData;
  return {
    title: title || "Default Title",
    description: description || "Default description for the homepage.",
  };
}

// Component that fetches data
async function HomeContent() {
  const strapiData = await getHomePage();
  const [heroSection] = strapiData?.sections || [];

  return <HeroSection data={heroSection} />;
}

// Loading skeleton component
function HomeContentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto py-6">
      <Suspense fallback={<HomeContentSkeleton />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
