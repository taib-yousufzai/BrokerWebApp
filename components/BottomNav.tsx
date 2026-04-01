"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, ArrowLeftRight, GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home",      label: "Home",    icon: Home          },
  { href: "/watchlist", label: "Markets", icon: BarChart2     },
  { href: "/orders",    label: "Trade",   icon: ArrowLeftRight },
  { href: "/activity",  label: "Learn",   icon: GraduationCap },
  { href: "/profile",   label: "Profile", icon: User          },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8ECF0] max-w-md mx-auto"
      style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href === "/watchlist" && pathname === "/watchlist");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 transition-colors",
                active ? "text-[#C62828]" : "text-[#9CA3AF]"
              )}
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn("text-[10px] leading-tight font-semibold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
