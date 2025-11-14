import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-triggered animations
 * Provides intersection observer functionality with customizable options
 */
const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "50px",
    triggerOnce = true,
    delay = 0,
    stagger = 0,
    animationClass = "in-view",
    disabled = false,
  } = options;

  const elementsRef = useRef([]);
  const observerRef = useRef(null);

  // Add element to observation list
  const addElement = useCallback((element) => {
    if (!element || elementsRef.current.includes(element)) return;
    elementsRef.current.push(element);

    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  // Remove element from observation list
  const removeElement = useCallback((element) => {
    if (!element) return;
    const index = elementsRef.current.indexOf(element);
    if (index > -1) {
      elementsRef.current.splice(index, 1);
    }

    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  // Animation trigger function
  const animateElement = useCallback(
    (entry, index = 0) => {
      const element = entry.target;
      const animationDelay = delay + stagger * index;

      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add(animationClass);

          // Add custom CSS properties for advanced animations
          element.style.setProperty("--animation-order", index);

          // Trigger custom event
          element.dispatchEvent(
            new CustomEvent("scrollAnimationStart", {
              detail: { element, entry, index },
            }),
          );
        }, animationDelay);

        if (triggerOnce) {
          observerRef.current?.unobserve(element);
        }
      } else if (!triggerOnce) {
        element.classList.remove(animationClass);
        element.dispatchEvent(
          new CustomEvent("scrollAnimationEnd", {
            detail: { element, entry, index },
          }),
        );
      }
    },
    [animationClass, delay, stagger, triggerOnce],
  );

  // Initialize intersection observer
  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          animateElement(entry, index);
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    // Observe existing elements
    elementsRef.current.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, animateElement, disabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { addElement, removeElement };
};

/**
 * Enhanced hook for scroll animations with more features
 */
export const useAdvancedScrollAnimation = (options = {}) => {
  const {
    animations = ["fade-in"],
    parallax = false,
    parallaxSpeed = 0.5,
    ...restOptions
  } = options;

  const { addElement, removeElement } = useScrollAnimation({
    ...restOptions,
    animationClass: animations[0] || "in-view",
  });

  const parallaxRef = useRef([]);

  // Parallax scroll handler
  const handleParallaxScroll = useCallback(() => {
    if (!parallax) return;

    const scrollY = window.scrollY;

    parallaxRef.current.forEach((element) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset
      const scrollProgress =
        (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
      const parallaxOffset = scrollProgress * parallaxSpeed * 100;

      element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    });
  }, [parallax, parallaxSpeed]);

  // Add parallax scroll listener
  useEffect(() => {
    if (!parallax) return;

    const throttledHandler = throttle(handleParallaxScroll, 16); // ~60fps
    window.addEventListener("scroll", throttledHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandler);
    };
  }, [handleParallaxScroll, parallax]);

  const addParallaxElement = useCallback(
    (element) => {
      if (parallax && element && !parallaxRef.current.includes(element)) {
        parallaxRef.current.push(element);
      }
      addElement(element);
    },
    [addElement, parallax],
  );

  const removeParallaxElement = useCallback(
    (element) => {
      if (parallax) {
        const index = parallaxRef.current.indexOf(element);
        if (index > -1) {
          parallaxRef.current.splice(index, 1);
        }
      }
      removeElement(element);
    },
    [removeElement, parallax],
  );

  return {
    addElement: parallax ? addParallaxElement : addElement,
    removeElement: parallax ? removeParallaxElement : removeElement,
  };
};

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = (element = null) => {
  const progressRef = useRef(0);
  const callbacksRef = useRef([]);

  const addProgressCallback = useCallback((callback) => {
    callbacksRef.current.push(callback);
  }, []);

  const removeProgressCallback = useCallback((callback) => {
    const index = callbacksRef.current.indexOf(callback);
    if (index > -1) {
      callbacksRef.current.splice(index, 1);
    }
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const targetElement = element || document.documentElement;
      const scrollHeight = targetElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / scrollHeight, 1);

      progressRef.current = progress;

      callbacksRef.current.forEach((callback) => {
        callback(progress, scrolled, scrollHeight);
      });
    }, 16);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [element]);

  return {
    progress: progressRef.current,
    addProgressCallback,
    removeProgressCallback,
  };
};

/**
 * Hook for scroll direction detection
 */
export const useScrollDirection = (threshold = 0) => {
  const directionRef = useRef("up");
  const lastScrollYRef = useRef(0);
  const callbacksRef = useRef([]);

  const addDirectionCallback = useCallback((callback) => {
    callbacksRef.current.push(callback);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollYRef.current;

      if (Math.abs(difference) < threshold) return;

      const newDirection = difference > 0 ? "down" : "up";

      if (newDirection !== directionRef.current) {
        directionRef.current = newDirection;
        callbacksRef.current.forEach((callback) => {
          callback(newDirection, currentScrollY);
        });
      }

      lastScrollYRef.current = currentScrollY;
    }, 16);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return {
    direction: directionRef.current,
    addDirectionCallback,
  };
};

/**
 * Ref hook for easy scroll animation setup
 */
export const useAnimatedRef = (animationOptions = {}) => {
  const ref = useRef(null);
  const { addElement, removeElement } = useScrollAnimation(animationOptions);

  const setRef = useCallback(
    (element) => {
      if (ref.current) {
        removeElement(ref.current);
      }

      ref.current = element;

      if (element) {
        addElement(element);
      }
    },
    [addElement, removeElement],
  );

  return [setRef, ref];
};

// Utility functions
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Animation presets
export const ANIMATION_PRESETS = {
  fadeIn: {
    animationClass: "animate-fade-in-up",
    threshold: 0.1,
    delay: 0,
  },
  slideInLeft: {
    animationClass: "animate-slide-in-left",
    threshold: 0.2,
    delay: 100,
  },
  slideInRight: {
    animationClass: "animate-slide-in-right",
    threshold: 0.2,
    delay: 100,
  },
  scaleUp: {
    animationClass: "animate-scale-in",
    threshold: 0.3,
    delay: 200,
  },
  staggered: {
    animationClass: "animate-fade-in-up",
    threshold: 0.1,
    stagger: 100,
    delay: 0,
  },
  parallax: {
    animationClass: "in-view",
    parallax: true,
    parallaxSpeed: 0.3,
    threshold: 0,
  },
};

export default useScrollAnimation;
