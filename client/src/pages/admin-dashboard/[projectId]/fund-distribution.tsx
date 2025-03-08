import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface ProjectData {
  id: number;
  title: string;
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

export default function AdminFundDistribution() {
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

  const allMilestonesComplete = projectData.milestones.every(
    milestone => milestone.status === "unlocked"
  );

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-[#111111] border-r border-white/10">
        <nav className="p-4 space-y-2">
          <Link href="/admin-dashboard">
            <a className="block text-sm text-white/60 mb-6 hover:text-white">
              ← Back to Admin Dashboard
            </a>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
            asChild
          >
            <Link href={`/admin-dashboard/${projectId}`}>Project Overview</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
            asChild
          >
            <Link href={`/admin-dashboard/${projectId}/milestones`}>Milestones</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white bg-[#C10000]"
            asChild
          >
            <Link href={`/admin-dashboard/${projectId}/fund-distribution`}>Fund Distribution</Link>
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
          <h1 className="text-3xl font-bold text-white mb-8">
            {projectData.title} - Fund Distribution
          </h1>

          <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold text-white">Fund Distribution Status</h2>
              
              <div className="bg-black/20 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Total Funds Raised</span>
                  <span className="text-white font-semibold">${projectData.amountRaised.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Funding Goal</span>
                  <span className="text-white font-semibold">${projectData.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Completion Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    allMilestonesComplete ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {allMilestonesComplete ? "Ready for Distribution" : "Pending Completion"}
                  </span>
                </div>
              </div>

              {allMilestonesComplete ? (
                <Button
                  size="lg"
                  className="bg-[#C10000] hover:bg-[#A00000] text-white px-8"
                >
                  Release Funds
                </Button>
              ) : (
                <div className="bg-yellow-500/10 text-yellow-400 px-6 py-4 rounded-lg">
                  All milestones must be completed before funds can be released.
                </div>
              )}
            </div>
          </div>

          {/* Milestone Payment Status */}
          <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Milestone Payment Status
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
                        {milestone.status === "unlocked" ? "Paid" : "Pending"}
                      </span>
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
