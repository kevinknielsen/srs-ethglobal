import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import SteelRiverSaintsRelease from "@/pages/releases/srs";
import Dashboard from "@/pages/Dashboard";
import ArtistDashboard from "@/pages/artist-dashboard";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { Providers } from './providers';
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/releases/srs" component={SteelRiverSaintsRelease} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/artist-dashboard" component={ArtistDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-black text-white">
        <Header />
        {/* Add pt-16 to account for fixed header height */}
        <div className="pt-16">
          <Router />
        </div>
        <Toaster />
      </div>
    </Providers>
  );
}

export default App;