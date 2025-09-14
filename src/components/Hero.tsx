import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.5 });
    
    // Animate hero elements
    timeline
      .fromTo(titleRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(8px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      })
      .fromTo(subtitleRef.current, {
        opacity: 0,
        y: 30,
        filter: "blur(4px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .fromTo(ctaRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6");

    // Animate floating particles
    gsap.set(".particle", { opacity: 0 });
    gsap.to(".particle", {
      opacity: 0.6,
      duration: 2,
      stagger: 0.2,
      ease: "power2.out"
    });

    return () => {
      timeline.kill();
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-primary/20 rounded-full floating-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 3D-style Background with Hero Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-blue-50/40" />
      
      {/* Glass Effect Background */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />

      <div className="container mx-auto px-6 text-center z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 leading-tight px-4 sm:px-0"
          >
            Hi, I'm{' '}
            <span className="text-gradient font-medium">Saiff</span>
            <br />
            <span className="text-xl sm:text-2xl md:text-4xl text-muted-foreground font-light">
              AI/ML Developer &<br className="sm:hidden" /> Creative Technologist
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 font-light leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
          >
            I create intelligent systems, modern web applications,
            <br className="hidden md:block" />
            and interactive experiences that push technological boundaries.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
            <Button variant="hero" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto min-h-[48px]">
              Let's Collaborate
              <Mail className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <div className="flex gap-3 sm:gap-4">
              <Button variant="glass" size="sm" className="min-h-[48px] min-w-[48px]">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="sm" className="min-h-[48px] min-w-[48px]">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <button
            onClick={scrollToAbout}
            className="group flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm font-light mb-2">Explore My Work</span>
            <ArrowDown className="h-5 w-5 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;