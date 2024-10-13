import { ReactNode, useState } from "react";

interface SwipeableProps {
  children: ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

interface TouchPosition {
  x: number;
  y: number;
}

export const Swipeable = ({
  onSwipeLeft,
  onSwipeRight,
  children,
}: SwipeableProps) => {
  const MIN_SWIPE_DISTANCE = 10;

  // states
  const [startTouch, setStartTouch] = useState<TouchPosition | null>(null);
  const [endTouch, setEndTouch] = useState<TouchPosition | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setEndTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!startTouch || !endTouch) {
      return;
    }

    const deltaX = endTouch.x - startTouch.x;
    const deltaY = endTouch.y - startTouch.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
        if (deltaX > 0) {
          onSwipeLeft && onSwipeLeft();
        } else {
          onSwipeRight && onSwipeRight();
        }
      }
    }

    setStartTouch(null);
    setEndTouch(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{touchAction: "none" }}
    >
      {children}
    </div>
  );
};
