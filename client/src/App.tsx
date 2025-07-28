import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ExpertApp from "./components/ExpertApp.jsx";
import ChatPage from "./pages/chat.jsx";
import PythonExpertPage from "./pages/python-expert.jsx";
import EcommerceExpertPage from "./pages/ecommerce-expert.jsx";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ExpertApp} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/python-expert" component={PythonExpertPage} />
      <Route path="/ecommerce-expert" component={EcommerceExpertPage} />
      <Route component={NotFound} />
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
