import HeroSection from "@/components/website/HeroSection";
import AboutStats from "@/components/website/AboutStats";
import AboutMission from "@/components/website/AboutMission";
import AboutFeatures from "@/components/website/AboutFeatures";
import MissionVision from "@/components/website/MissionVision";
import CompanyTimeline from "@/components/website/CompanyTimeline";
import Leaderships from "@/components/website/Leaderships";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <HeroSection />
        <AboutStats />
        <AboutMission />
        <AboutFeatures />
         <MissionVision />
        <CompanyTimeline />
        <Leaderships />
      </div>
    </main>
  );
}
