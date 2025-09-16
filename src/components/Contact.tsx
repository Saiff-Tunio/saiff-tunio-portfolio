import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    timeline
      .fromTo(
        formRef.current?.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      )
      .fromTo(
        socialsRef.current?.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        "service_dx11s1b", // replace with EmailJS service ID
        "template_c29ccdh", // replace with EmailJS template ID
        formRef.current,
        "kcKG59oBHq6_K4TC_" // replace with EmailJS public key
      );

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-background" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full floating-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
              Let's <span className="text-gradient">Collaborate</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
              Ready to bring innovative ideas to life? Let's discuss your
              project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-medium mb-6">Send a Message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass-effect border-glass-border focus:border-primary/50 bg-glass/50"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass-effect border-glass-border focus:border-primary/50 bg-glass/50"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project ideas..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="glass-effect border-glass-border focus:border-primary/50 bg-glass/50 resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  disabled={loading}
                  className="w-full group min-h-[50px] sm:min-h-[54px] text-sm sm:text-base"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {status === "success" && (
                  <p className="text-green-400 mt-2">
                    ✅ Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 mt-2">❌ Failed to send message.</p>
                )}
              </form>
            </div>

            {/* Contact Info & Socials */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-medium mb-6">Get In Touch</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    I'm always interested in discussing new opportunities,
                    innovative projects, and collaborative research initiatives.
                  </p>
                  <p className="leading-relaxed">
                    Whether you're looking to integrate AI into your product,
                    need a modern web application, or want to explore creative
                    technology solutions, I'd love to hear from you.
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>saiff_01@hotmail.com</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                <div
                  ref={socialsRef}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <a href="https://github.com/Saiff-Tunio" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" >
                  <Button
                    variant="glass"
                    size="lg"
                    className="group hover:border-primary/50 min-h-[50px] sm:min-h-[54px] justify-start sm:justify-center text-sm sm:text-base"
                  >
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-primary transition-colors" />
                    <span className="ml-2">GitHub</span>
                  </Button>
                  </a>

                  <a href="https://www.linkedin.com/in/saifftunio/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" >
                  <Button
                    variant="glass"
                    size="lg"
                    className="group hover:border-primary/50 min-h-[50px] sm:min-h-[54px] justify-start sm:justify-center text-sm sm:text-base"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-primary transition-colors" />
                    <span className="ml-2">LinkedIn</span>
                  </Button>
                  </a>

                  

                </div>
              </div>

              {/* Research Note */}
              <div className="glass-effect rounded-xl p-6 mt-8">
                <h4 className="text-lg font-medium mb-2 text-gradient">
                  Research Collaboration
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Interested in academic research partnerships, open-source
                  contributions, or discussing the latest developments in AI/ML?
                  I'm always excited to connect with fellow researchers and
                  innovators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
