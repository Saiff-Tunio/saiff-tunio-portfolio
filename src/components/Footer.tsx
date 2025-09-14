import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-glass-border bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-light text-gradient mb-2">Saiff</h3>
            <p className="text-muted-foreground text-sm">
              AI/ML Developer & Creative Technologist
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-8 text-sm">
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © {currentYear} Saiff. Built with 
            <Heart className="h-3 w-3 text-red-400 animate-pulse" /> 
            and cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;