import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import aiPlatformImg from '@/assets/project-ai-platform.jpg';
import neuralArtImg from '@/assets/project-neural-art.jpg';
import analyticsImg from '@/assets/project-analytics.jpg';
import voiceImg from '@/assets/project-voice.jpg';
import quantumImg from '@/assets/project-quantum.jpg';
import codeAiImg from '@/assets/project-code-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Research Platform",
    description: "A comprehensive platform for machine learning research with collaborative features and real-time model training visualization.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    image: aiPlatformImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Neural Art Generator", 
    description: "Creative AI tool that generates unique digital artwork using advanced neural style transfer algorithms.",
    tech: ["PyTorch", "GSAP", "TypeScript", "WebGL"],
    image: neuralArtImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Smart Analytics Dashboard",
    description: "Real-time data visualization dashboard with predictive analytics powered by machine learning models.",
    tech: ["React", "D3.js", "Python", "Docker"],
    image: analyticsImg, 
    github: "#",
    demo: "#"
  },
  {
    title: "Voice Command Interface",
    description: "Natural language processing system for voice-controlled smart home automation with gesture recognition.",
    tech: ["NLP", "Computer Vision", "IoT", "Node.js"],
    image: voiceImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Quantum Algorithm Simulator",
    description: "Interactive quantum computing simulator for educational purposes with visual quantum circuit builder.",
    tech: ["Quantum Computing", "Web Assembly", "Three.js"],
    image: quantumImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Collaborative Code AI",
    description: "AI-powered code review and collaboration platform that provides intelligent suggestions and bug detection.",
    tech: ["Machine Learning", "VSCode Extension", "GitHub API"],
    image: codeAiImg,
    github: "#", 
    demo: "#"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate title
    gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%"
      }
    });

    // Animate project cards
    gsap.fromTo(cardsRef.current?.children, {
      opacity: 0,
      y: 60,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      
      <div className="container mx-auto px-6 relative">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions at the intersection of AI, web development, and creative technology.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-violet/10 relative overflow-hidden rounded-t-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-muted/50 text-xs rounded-full text-muted-foreground border border-border hover:border-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Github className="h-3 w-3 mr-2" />
                    Code
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1 text-xs">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;