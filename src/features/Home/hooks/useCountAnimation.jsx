import { useEffect, useRef, useState } from "react";

const useCountAnimation = (target, isActive, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Use easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(target * easeOutQuart));

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [target, isActive, duration]);

    return count;
};
export default useCountAnimation;