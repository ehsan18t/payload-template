import Approach from "./components/home/Approach";
import Expertise from "./components/home/Expertise";
import Hero from "./components/home/Hero";
import ProjectShowcase from "./components/home/ProjectShowcase";
import TechTicker from "./components/home/TechTicker";
import Testimonials from "./components/home/Testimonials";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <TechTicker />
      <Expertise />
      <ProjectShowcase />
      <Testimonials />
      <Approach />
      <Footer />
    </div>
  );
}
