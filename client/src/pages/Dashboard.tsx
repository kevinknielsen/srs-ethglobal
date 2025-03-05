import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SiEthereum } from "react-icons/si";
import { Link } from "wouter";

// Dummy data for development
const investmentData = {
  totalInvested: 25000,
  expectedReturns: 35000,
  pendingPayouts: 5000,
  activeInvestments: [
    {
      id: 1,
      projectName: "Steel River Saints",
      coverImage: "/images/srs-1.jpg",
      fundingProgress: 75,
      nextMilestone: "2025-04-01",
    },
    {
      id: 2,
      projectName: "Digital Dreamers",
      coverImage: "/images/artist-banner.png",
      fundingProgress: 45,
      nextMilestone: "2025-05-15",
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen bg-[#111111] border-r border-white/10">
        <nav className="p-4 space-y-2">
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white bg-[#C10000] hover:bg-[#C10000]/90"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
          >
            My Investments
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
          >
            Browse Projects
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start text-white/60 hover:bg-[#C10000] hover:text-white"
          >
            Settings
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
              Your Investment Dashboard
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#111111] border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Total Invested</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${investmentData.totalInvested.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#C10000]/10 flex items-center justify-center">
                    <SiEthereum className="h-6 w-6 text-[#C10000]" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[#111111] border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Expected Returns</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${investmentData.expectedReturns.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#C10000]/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-[#C10000]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#111111] border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Pending Payouts</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${investmentData.pendingPayouts.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#C10000]/10 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-[#C10000]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Active Investments Table */}
          <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white">
                Active Investments
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-white/10 bg-white/5">
                    <th className="text-left p-4 text-sm font-medium text-white/60">
                      Project Name
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">
                      Funding Progress
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-white/60">
                      Next Milestone
                    </th>
                    <th className="text-right p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {investmentData.activeInvestments.map((investment) => (
                    <tr
                      key={investment.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={investment.coverImage}
                            alt={investment.projectName}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <span className="font-medium text-white">
                            {investment.projectName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#C10000] rounded-full"
                                style={{
                                  width: `${investment.fundingProgress}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-white/60">
                              {investment.fundingProgress}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-white">
                          {new Date(investment.nextMilestone).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/investments/${investment.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-[#C10000] hover:text-white hover:border-[#C10000]"
                          >
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}