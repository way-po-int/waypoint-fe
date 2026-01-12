"use client";

import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface NavigationBarProps {
  items: NavItem[];
  className?: string;
}

// 다이아몬드 아이콘 컴포넌트
const DiamondIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(16, 16) rotate(45) translate(-12, -12)">
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        rx="2"
        fill={isActive ? "#1a1a1a" : "#9CA3AF"}
      />
      <rect
        x="4"
        y="14"
        width="8"
        height="8"
        rx="2"
        fill={isActive ? "#1a1a1a" : "#C7CDD4"}
      />
      <rect
        x="14"
        y="4"
        width="8"
        height="8"
        rx="2"
        fill={isActive ? "#1a1a1a" : "#C7CDD4"}
      />
      <rect
        x="14"
        y="14"
        width="8"
        height="8"
        rx="2"
        fill={isActive ? "#1a1a1a" : "#E5E7EB"}
      />
    </g>
  </svg>
);

const NavigationBar = ({ items, className = "" }: NavigationBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav
      className={`flex h-20 w-full items-center justify-around border-t bg-white ${className}`}
    >
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className="flex flex-col items-center gap-1 transition-colors"
          >
            {/* 커스텀 아이콘 또는 기본 다이아몬드 아이콘 */}
            {item.icon || <DiamondIcon isActive={isActive} />}
            
            <span
              className={`text-sm ${
                isActive
                  ? "font-bold text-black"
                  : "font-normal text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
export { DiamondIcon };
