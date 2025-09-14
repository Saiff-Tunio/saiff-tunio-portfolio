import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePlaceholder from '@/assets/profile-placeholder.jpg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Python', level: 95 },
  { name: 'TensorFlow', level: 88 },
  { name: 'PyTorch', level: 85 },
  { name: 'React', level: 92 },
  { name: 'TypeScript', level: 90 },
  { name: 'GSAP', level: 80 },
  { name: 'SQL', level: 85 },
  { name: 'Docker', level: 78 },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section elements on scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    timeline
      .fromTo(imageRef.current, {
        opacity: 0,
        x: -50,
        rotation: -5
      }, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "power3.out"
      })
      .fromTo(contentRef.current?.children, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5")
      .fromTo(skillsRef.current?.children, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="glass-effect rounded-3xl p-8 max-w-md mx-auto lg:mx-0">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-violet/20 rounded-2xl overflow-hidden">
                <img 
                  src={profilePlaceholder} 
                  alt="Saiff - AI/ML Developer & Creative Technologist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full floating-animation" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-violet/20 rounded-full floating-animation" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Computer Science student passionate about the intersection of artificial intelligence 
                and creative technology. I specialize in developing intelligent systems that solve 
                real-world problems while creating engaging user experiences.
              </p>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With expertise in machine learning, web development, and interactive design, 
                I bridge the gap between cutting-edge AI research and practical applications. 
                My work spans from neural network architectures to responsive web interfaces, 
                always with a focus on innovation and user-centric design.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing advanced studies in AI/ML while contributing to open-source 
                projects and collaborating on research initiatives that push the boundaries 
                of what's possible with technology.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass-effect p-4 rounded-xl text-center hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="text-sm font-medium text-foreground mb-2">
                    {skill.name}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-violet h-2 rounded-full transition-all duration-1000 group-hover:from-violet group-hover:to-primary"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;