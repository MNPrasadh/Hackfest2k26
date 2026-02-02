import { useEffect } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import Timeline from "../components/Timeline";

function TimelinePage() {
    useEffect(() => {
        // Initialize Lenis smooth scroll for this page
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {/* Simple Navigation Back to Home */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1000
            }}>
                <Link 
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    ← Back to HACKFEST2K26
                </Link>
            </div>
            
            <Timeline />
        </>
    );
}

export default TimelinePage;