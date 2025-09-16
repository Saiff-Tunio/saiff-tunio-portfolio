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
    title: "Brain Tumor Detection",
    description: "A deep learning-based system for accurate brain tumor detection and classification from MRI scans, enhancing medical diagnosis through automated analysis.",
    tech: ["Python", "TensorFlow", "Jupyter", "Google Scholar"],
    image: aiPlatformImg,
    github: "https://github.com/Saiff-Tunio/Brain-Tumor-Detection"
  },
  {
    title: "Depression Detection from Social Media Text", 
    description: "An NLP-driven system for detecting signs of depression from social media text, leveraging LLMs for accurate and interpretable mental health insights.",
    tech: ["TensorFlow", "Python", "Jupyter", "Google Scholar"],
    image: neuralArtImg,
    github: "#",
  },
  {
    title: "Titanic Survival Prediction",
    description: "A machine learning model for predicting passenger survival on the Titanic dataset using logistic regression and feature engineering techniques.",
    tech: ["Python", "Jupyter Notebook", "Scikit-learn"],
    image: analyticsImg, 
    github: "#",
  },
  {
    title: "Age, Gender & Emotion Detection",
    description: "A computer vision model that predicts age, gender, and emotional states from facial images in real time using deep learning.",
    tech: ["Jupyter", "Python", "Scitkit-learn", "TensorFlow"],
    image: voiceImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Car Rental System",
    description: "A Tkinter-based car rental management system with a MySQL backend, featuring booking, inventory management, and billing automation.",
    tech: ["Python", "Tkinter", "MySQL"],
    image: quantumImg,
    github: "#",
    demo: "#"
  },
  {
    title: "Portfolio Website",
    description: "A responsive personal portfolio website showcasing projects and research, built with HTML, CSS, and JavaScript for modern, user-friendly design.",
    tech: ["TypeScript", "ReactJS", "CSS", "HTML", "JavaScript"],
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
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            A showcase of innovative solutions at the intersection of AI, web development, and creative technology.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                <div className="flex gap-2 sm:gap-3">
                  <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px]">
                    <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Code
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px]">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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