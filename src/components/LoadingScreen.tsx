import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeline = gsap.timeline();
    
    // Animate progress bar
    timeline
      .to({}, {
        duration: 2,
        onUpdate: function() {
          const progressValue = Math.round(this.progress() * 100);
          setProgress(progressValue);
        }
      })
      .to(".loader-container", {
        duration: 0.5,
        opacity: 0,
        scale: 1.1,
        ease: "power2.inOut",
        onComplete: onComplete
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-wider text-gradient mb-4">
            Saiff
          </h1>
          <p className="text-muted-foreground font-light">
            AI/ML Researcher & Developer
          </p>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              transform: `translateX(-${100 - progress}%)`
            }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;