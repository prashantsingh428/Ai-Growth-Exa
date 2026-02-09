import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    // ScrollSmoother is DISABLED to prevent DOM manipulation conflicts with React.
    // The ScrollSmoother plugin manipulates the DOM structure, which causes
    // "NotFoundError: Failed to execute 'removeChild'" errors when React
    // tries to unmount components during navigation or re-renders.
    //
    // Native browser scrolling is smooth enough for most use cases.
    // If smooth scrolling is required in the future, consider:
    // 1. CSS scroll-behavior: smooth;
    // 2. Lenis scroll library (better React compatibility)
    // 3. Locomotive Scroll

    useEffect(() => {
        // Just refresh ScrollTrigger on mount to ensure proper positioning
        ScrollTrigger.refresh();

        return () => {
            // Clean up any ScrollTriggers when unmounting
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Render children directly without any wrapper
    return <>{children}</>;
};

export default SmoothScroll;
