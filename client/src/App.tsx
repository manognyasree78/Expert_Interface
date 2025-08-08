import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import ExpertPython from "./components/ExpertPython";
import ExpertEcommerce from "./components/ExpertEcommerce";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/expert/python" component={ExpertPython} />
      <Route path="/expert/ecommerce" component={ExpertEcommerce} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
