import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function HorizontalScroll({ children }) {
    const containerRef = useRef(null);
    const [currentSection, setCurrentSection] = useState(0);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Snap to sections when scroll passes threshold
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Determine which section we should be on
        const threshold = 0.5;
        const newSection = latest >= threshold ? 1 : 0;
        
        if (newSection !== currentSection) {
            setCurrentSection(newSection);
        }
    });

    // Snap scroll to section when user stops scrolling
    useEffect(() => {
        let scrollTimeout;
        
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (!containerRef.current) return;
                
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                const containerTop = window.scrollY + rect.top;
                const containerHeight = container.offsetHeight;
                const scrollPosition = window.scrollY - containerTop;
                const progress = scrollPosition / (containerHeight - window.innerHeight);
                
                // If we're in the horizontal scroll zone
                if (progress > 0 && progress < 1) {
                    let targetProgress;
                    
                    // Snap to nearest section
                    if (progress < 0.5) {
                        targetProgress = 0;
                    } else {
                        targetProgress = 1;
                    }
                    
                    const targetScroll = containerTop + targetProgress * (containerHeight - window.innerHeight);
                    
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }
            }, 150); // Wait 150ms after scroll stops
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div 
            ref={containerRef} 
            className="relative"
            style={{ height: '200vh' }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div 
                    className="flex h-full"
                    style={{ 
                        x,
                        width: '200vw'
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
