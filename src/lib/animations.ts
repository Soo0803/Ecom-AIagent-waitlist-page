"use client";
import type { Variants } from 'framer-motion';

// Fade up animation for scroll reveals
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Stagger container for children animations
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger item for use within stagger container
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  }
};

// Slide from left
export const slideFromLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Slide from right
export const slideFromRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Hero load animation sequence
export const heroLoad: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const heroItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

// Card hover animation
export const cardHover = {
  rest: { 
    y: 0, 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
  },
  hover: { 
    y: -4, 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  }
};

// Button hover animation
export const buttonHover = {
  rest: { 
    y: 0,
    scale: 1
  },
  hover: { 
    y: -2,
    scale: 1.02,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  tap: { 
    scale: 0.98,
    y: 0
  }
};
