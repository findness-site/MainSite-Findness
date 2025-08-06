
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Finder from "./pages/Finder";
import Camera from "./pages/Camera";
import Post from "./pages/Post";
import Thanks from "./pages/Thanks";
import Join from "./pages/Join";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Seeker from "./pages/Seeker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/seeker" element={<Seeker />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/post" element={<Post />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/join" element={<Join />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
