import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface ProjectData {
  id: number;
  title: string;
  status: string;
}

export default function FinalizeRelease() {
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
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
            asChild
          >
            <Link href={`/artist-dashboard/${projectId}`}>Project Overview</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
            asChild
          >
            <Link href={`/artist-dashboard/${projectId}/milestones`}>Milestones</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white bg-[#C10000]"
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
          <h1 className="text-3xl font-bold text-white mb-8">
            {projectData.title} - Finalize Release
          </h1>

          <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold text-white">Ready to Release?</h2>
              <p className="text-white/60">
                Before finalizing your release, ensure all milestones are complete and your content is ready for distribution.
              </p>
              
              {projectData.status === "ready" ? (
                <a
                  href="https://www.revelator.com/pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#C10000] text-white px-8 py-3 rounded-lg hover:bg-[#A00000] transition-colors"
                >
                  Distribute via Revelator Pro
                </a>
              ) : (
                <div className="bg-yellow-500/10 text-yellow-400 px-6 py-4 rounded-lg">
                  Complete all milestones before finalizing your release.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
