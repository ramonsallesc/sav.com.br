import { motion } from "framer-motion";
import type { CustomizationTab } from "@/data/productVariants";

interface CustomizationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: CustomizationTab[];
}

const CustomizationTabs = ({ activeTab, onTabChange, tabs }: CustomizationTabsProps) => {
  return (
    <div className="relative flex w-full border-b border-border">
      {tabs.map((tab: CustomizationTab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative flex-1 pb-3 pt-1 text-xs font-body-regular tracking-wider transition-colors duration-200 ${
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CustomizationTabs;
