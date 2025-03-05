import { ReleaseCard } from "./ReleaseCard";
import { Button } from "./ui/button";
import { useState } from "react";

const tabs = ["Top Movers", "Top Earning", "What's new"] as const;

export function ReleasesSection() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("What's new");

  const releases = [
    {
      title: "The Bottle",
      artist: "Steel River Saints",
      imageSrc: "/images/artist-banner.png",
      isrc: "OZNB82517697",
      isVerified: true,
      earnings: "$25,000",
      label: "Coda Collective",
      href: "/releases/srs"
    },
    {
      title: "Midnight in Tokyo",
      artist: "Neon Drift",
      imageSrc: "/images/srs-1.jpg",
      isrc: "OZNB82517698",
      earnings: "$18,500",
      label: "Coda Collective",
      isVerified: true
    },
    {
      title: "Desert Storm",
      artist: "The Sandstorm Collective",
      imageSrc: "/images/srs-2.jpg",
      isrc: "OZWDW2456750",
      earnings: "$12,300",
      label: "Coda Collective",
      isVerified: true
    },
    {
      title: "Digital Dreams",
      artist: "Cyber Symphony",
      imageSrc: "/images/srs-3.jpg",
      isrc: "OZWDW2483327",
      earnings: "$9,800",
      label: "Coda Collective",
      isVerified: true
    }
  ];

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">Latest Releases</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="text-sm"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {releases.map((release, i) => (
          <ReleaseCard key={i} {...release} />
        ))}
      </div>
    </section>
  );
}