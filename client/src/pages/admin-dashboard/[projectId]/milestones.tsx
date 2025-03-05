import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface MilestoneData {
  id: number;
  name: string;
  status: "locked" | "pending_approval" | "unlocked";
  date?: string;
}

interface ProjectData {
  id: number;
  title: string;
  milestones: MilestoneData[];
}

export default function AdminMilestones() {
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
        <div className="text-white">Loading milestone data...</div>
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
            className="w-full justify-start text-white bg-[#C10000]"
            asChild
          >
            <Link href={`/admin-dashboard/${projectId}/milestones`}>Milestones</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
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
            {projectData.title} - Milestones
          </h1>

          <div className="space-y-4">
            {projectData.milestones.map((milestone) => (
              <div key={milestone.id} className="bg-[#111111] rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{milestone.name}</h3>
                    {milestone.date && (
                      <p className="text-sm text-white/60">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
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
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
