import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/about";
import SteelRiverSaintsRelease from "@/pages/releases/srs";
import Dashboard from "@/pages/Dashboard";
import ArtistDashboard from "@/pages/artist-dashboard";
import ProjectDashboard from "@/pages/artist-dashboard/[projectId]";
import ProjectMilestones from "@/pages/artist-dashboard/[projectId]/milestones";
import FinalizeRelease from "@/pages/artist-dashboard/[projectId]/finalize";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminProjectDashboard from "@/pages/admin-dashboard/[projectId]";
import AdminMilestones from "@/pages/admin-dashboard/[projectId]/milestones";
import AdminFundDistribution from "@/pages/admin-dashboard/[projectId]/fund-distribution";
import CreateProject from "@/pages/admin-dashboard/create-project";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { Providers } from './providers';
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/releases/srs" component={SteelRiverSaintsRelease} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/artist-dashboard" component={ArtistDashboard} />
      <Route path="/artist-dashboard/:projectId" component={ProjectDashboard} />
      <Route path="/artist-dashboard/:projectId/milestones" component={ProjectMilestones} />
      <Route path="/artist-dashboard/:projectId/finalize" component={FinalizeRelease} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin-dashboard/create-project" component={CreateProject} />
      <Route path="/admin-dashboard/:projectId" component={AdminProjectDashboard} />
      <Route path="/admin-dashboard/:projectId/milestones" component={AdminMilestones} />
      <Route path="/admin-dashboard/:projectId/fund-distribution" component={AdminFundDistribution} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
        <Header />
        {/* Add pt-16 to account for fixed header height */}
        <div className="pt-16 flex-grow">
          <Router />
        </div>
        <Footer />
        <Toaster />
      </div>
    </Providers>
  );
}

export default App;