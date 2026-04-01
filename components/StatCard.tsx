import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: "green" | "red" | "default";
  className?: string;
}

export default function StatCard({ label, value, sub, highlight = "default", className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-[20px] p-4 border border-[#E5E7EB]", className)}>
      <p className="text-[0.7rem] text-[#8C94A8] font-medium mb-1">{label}</p>
      <p className={cn(
        "text-[1.1rem] font-bold",
        highlight === "green" && "text-[#2C8E5A]",
        highlight === "red"   && "text-[#C62828]",
        highlight === "default" && "text-gray-900"
      )}>
        {value}
      </p>
      {sub && <p className="text-[0.65rem] text-[#9AA4BF] mt-0.5">{sub}</p>}
    </div>
  );
}
