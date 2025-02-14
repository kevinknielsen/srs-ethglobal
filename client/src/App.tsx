import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import SteelRiverSaintsRelease from "@/pages/releases/srs";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { Providers } from './providers';
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/releases/srs" component={SteelRiverSaintsRelease} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-black text-white">
        <Router />
        <Toaster />
      </div>
    </Providers>
  );
}

export default App;