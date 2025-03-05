import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status: string;
  coverImage: string;
}

export default function ArtistDashboard() {
  const [location] = useLocation();
  const { data: projects, isLoading } = useQuery<ProjectData[]>({
    queryKey: ['/api/user/projects'],
    queryFn: async () => {
      const response = await fetch('/api/user/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-[#111111] border-r border-white/10">
        <nav className="p-4 space-y-2">
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white ${
              location === "/artist-dashboard" ? "bg-[#C10000]" : ""
            } hover:bg-[#C10000]`}
            asChild
          >
            <Link href="/artist-dashboard">Project Overview</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white ${
              location === "/artist-dashboard/milestones" ? "bg-[#C10000] text-white" : ""
            }`}
            asChild
          >
            <Link href="/artist-dashboard/milestones">Milestones</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white ${
              location === "/artist-dashboard/finalize" ? "bg-[#C10000] text-white" : ""
            }`}
            asChild
          >
            <Link href="/artist-dashboard/finalize">Finalize Release</Link>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              My Projects
            </h1>
            <Button variant="default" className="bg-[#C10000] hover:bg-[#A00000]">
              Create New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project) => (
              <Card key={project.id} className="bg-[#111111] border-white/10 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-white/60 line-clamp-2">{project.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Funding Progress</span>
                      <span className="text-white">${project.amountRaised.toLocaleString()} / ${project.fundingGoal.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C10000] rounded-full transition-all duration-500"
                        style={{ width: `${(project.amountRaised / project.fundingGoal) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "funding" ? "bg-blue-500/20 text-blue-400" :
                        project.status === "in_progress" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-green-500/20 text-green-400"
                    }`}>
                      {project.status.replace("_", " ").charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                    <Button asChild>
                      <Link href={`/artist-dashboard/${project.id}`}>
                        Manage Project
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}