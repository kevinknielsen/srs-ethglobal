import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status: string;
  milestones: Array<{
    id: number;
    name: string;
    status: "locked" | "pending_approval" | "unlocked";
    date?: string;
  }>;
}

export default function ProjectDashboard() {
  const [location] = useLocation();
  const { projectId } = useParams();

  const { data: projectData, isLoading } = useQuery<ProjectData>({
    queryKey: [`/api/projects/${projectId}`],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading project details...</div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-[#111111] border-r border-white/10">
        <nav className="p-4 space-y-2">
          <Link href="/artist-dashboard">
            <a className="block text-sm text-white/60 mb-6 hover:text-white">
              ← Back to Projects
            </a>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white ${
              location === `/artist-dashboard/${projectId}` ? "bg-[#C10000]" : ""
            } hover:bg-[#C10000]`}
            asChild
          >
            <Link href={`/artist-dashboard/${projectId}`}>Project Overview</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white ${
              location === `/artist-dashboard/${projectId}/milestones` ? "bg-[#C10000] text-white" : ""
            }`}
            asChild
          >
            <Link href={`/artist-dashboard/${projectId}/milestones`}>Milestones</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white ${
              location === `/artist-dashboard/${projectId}/finalize` ? "bg-[#C10000] text-white" : ""
            }`}
            asChild
          >
            <Link href={`/artist-dashboard/${projectId}/finalize`}>Finalize Release</Link>
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
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">
              {projectData.title} - Project Overview
            </h1>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#111111] border-white/10 p-6">
                <div>
                  <p className="text-sm text-white/60">Funding Goal</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${projectData.fundingGoal.toLocaleString()}
                  </p>
                </div>
              </Card>

              <Card className="bg-[#111111] border-white/10 p-6">
                <div>
                  <p className="text-sm text-white/60">Amount Raised</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${projectData.amountRaised.toLocaleString()}
                  </p>
                </div>
              </Card>

              <Card className="bg-[#111111] border-white/10 p-6">
                <div>
                  <p className="text-sm text-white/60">Project Status</p>
                  <p className="text-2xl font-bold text-white mt-1 capitalize">
                    {projectData.status.replace('_', ' ')}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Milestones Overview */}
          <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Milestones Status
              </h2>
              <div className="space-y-4">
                {projectData.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                    <div>
                      <span className="text-white block">{milestone.name}</span>
                      {milestone.date && (
                        <span className="text-sm text-white/60">
                          {new Date(milestone.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        milestone.status === "unlocked" ? "bg-green-500/20 text-green-400" :
                        milestone.status === "pending_approval" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-white/10 text-white/60"
                      }`}>
                        {milestone.status.replace("_", " ").charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </span>
                      {milestone.status === "pending_approval" && (
                        <Button size="sm" variant="destructive">
                          Submit Proof
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
