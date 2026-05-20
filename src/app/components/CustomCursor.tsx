import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getCursorStyles = () => {
    if (isClicking) {
      return {
        bg: 'bg-[#007aff]/30',
        border: 'border-[#007aff]',
        scale: 'scale-90',
        shadow: '0 0 20px rgba(0, 122, 255, 0.4)',
        dotBg: 'bg-[#007aff]',
        dotScale: 'scale-125'
      };
    } else if (isHovering) {
      return {
        bg: 'bg-white/40',
        border: 'border-white/80',
        scale: 'scale-100',
        shadow: '0 0 16px rgba(0, 0, 0, 0.2)',
        dotBg: 'bg-white',
        dotScale: 'scale-100'
      };
    } else {
      return {
        bg: 'bg-white/20',
        border: 'border-white/60',
        scale: 'scale-100',
        shadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        dotBg: 'bg-white/80',
        dotScale: 'scale-100'
      };
    }
  };

  const styles = getCursorStyles();

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-12 h-12 rounded-full border-2 transition-all duration-150 ${styles.bg} ${styles.border} ${styles.scale}`}
          style={{
            boxShadow: styles.shadow
          }}
        />
        {/* Inner dot */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-150 ${styles.dotBg} ${styles.dotScale}`}
        />
      </div>
    </>
  );
}
