import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Users, ArrowUpRight, Activity, DollarSign } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status: string;
  coverImage: string;
}

interface Stats {
  totalInvestors: number;
  totalInvested: number;
  averageReturn: number;
  projectCount: number;
}

export default function AdminDashboard() {
  const { data: projects, isLoading: projectsLoading } = useQuery<ProjectData[]>({
    queryKey: ['/api/admin/projects'],
    queryFn: async () => {
      const response = await fetch('/api/admin/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    }
  });

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ['/api/admin/stats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return response.json();
    }
  });

  if (projectsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <Button
            asChild
            className="bg-[#C10000] hover:bg-[#A00000]"
          >
            <Link href="/admin-dashboard/create-project">
              Create New Project
            </Link>
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#111111] border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Investors</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats?.totalInvestors.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#C10000]/20 p-2 rounded-lg">
                <Users className="h-5 w-5 text-[#C10000]" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#111111] border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Invested</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ${stats?.totalInvested.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#C10000]/20 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-[#C10000]" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#111111] border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Average Return</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats?.averageReturn}%
                </p>
              </div>
              <div className="bg-[#C10000]/20 p-2 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-[#C10000]" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#111111] border-white/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Active Projects</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats?.projectCount}
                </p>
              </div>
              <div className="bg-[#C10000]/20 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-[#C10000]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Project List */}
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
                    <Link href={`/admin-dashboard/${project.id}`}>
                      Manage Project
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}