import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Contact", "Contribute", "Login"];

type FloatingNavbarProps = {
  showLoginState?: {
    setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ showLoginState }) => {
  const [hovered, setHovered] = useState<string | null>("Login");
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (hovered && itemRefs.current[hovered] && containerRef.current) {
      const item = itemRefs.current[hovered]!;
      const container = containerRef.current;
      const { left: itemLeft, width } = item.getBoundingClientRect();
      const containerLeft = container.getBoundingClientRect().left;
      setHoverStyle({
        left: itemLeft - containerLeft,
        width,
      });
    }
  }, [hovered]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={containerRef}
        className="relative bg-black border border-white/10 px-4 py-2 rounded-full flex gap-4 backdrop-blur-md"
      >
        <AnimatePresence>
          <motion.div
            layout
            className={`absolute top-1 bottom-1 rounded-full ${
              hovered === "Contribute" ? "bg-pink-500/20" : "bg-white/10"
            }`}
            initial={false}
            animate={{
              left: hoverStyle.left,
              width: hoverStyle.width,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </AnimatePresence>

        {navItems.map((item) =>
          item === "Login" ? (
            <div
              key={item}
              ref={(el) => {
                itemRefs.current[item] = el;
              }}
              onMouseEnter={() => setHovered(item)}
              onFocus={() => setHovered(item)}
              onClick={() => showLoginState?.setShowLoginPopup(true)}
              className={`relative z-10 px-4 py-2 text-sm cursor-pointer text-white`}
            >
              {item}
            </div>
          ) : (
            <div
              key={item}
              ref={(el) => {
                itemRefs.current[item] = el;
              }}
              onMouseEnter={() => setHovered(item)}
              onFocus={() => setHovered(item)}
              className={`relative z-10 px-4 py-2 text-sm cursor-pointer ${
                item === "Contribute"
                  ? "text-pink-400 font-semibold"
                  : "text-white"
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FloatingNavbar;
