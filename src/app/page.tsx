import HomeClient from "@/components/home/HomeClient";
import { getPortfolioData } from "@/lib/supabase/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialData = await getPortfolioData();
  return <HomeClient initialData={initialData} />;
}
