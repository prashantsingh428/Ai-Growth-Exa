import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const location = useLocation();
    const previousPath = useRef(location.pathname);

    // This useLayoutEffect runs synchronously when the location changes
    // BEFORE React starts rendering the new route
    useLayoutEffect(() => {
        // Only run cleanup when the path actually changes (not on initial mount)
        if (previousPath.current !== location.pathname) {
            // First, revert all ScrollTriggers to restore original DOM structure
            // This is crucial for pinned elements that GSAP has moved
            ScrollTrigger.getAll().forEach(trigger => {
                // Revert the ScrollTrigger's DOM changes first
                if (trigger.pin) {
                    trigger.kill(true);
                } else {
                    trigger.kill();
                }
            });

            // Kill all active tweens
            gsap.killTweensOf("*");

            // Give GSAP a moment to finish its DOM restoration
            ScrollTrigger.clearScrollMemory();

            // Scroll to top for the new page
            window.scrollTo(0, 0);
        }

        previousPath.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        // Small delay to ensure DOM is ready before refreshing ScrollTrigger
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            // Additional cleanup on full unmount
            ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
            gsap.killTweensOf("*");
        };
    }, [location.pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
