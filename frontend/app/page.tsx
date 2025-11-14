import { getHomePage } from "@/lib/strapi";
import { HeroSection } from './components/hero-section';

export async function generateMetadata() { 
  const strapiData = await getHomePage();
  const { title, description } = strapiData;
  return {
    title: title || "Default Title",
    description: description || "Default description for the homepage.",
  };
}

export default async function Home() {
  const strapiData = await getHomePage();
  const [heroSection] = strapiData?.sections || [];
  console.log(strapiData);
  
  return (
    <main className="container mx-auto py-6">
      <HeroSection data={heroSection} />
    </main>
  );
}
