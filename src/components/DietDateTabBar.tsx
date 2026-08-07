import heroBanner from "@/assets/diet/diet-hero-banner.webp";

export interface DietDateTab {
  dateKey: string;
  label: string; // "Today" | "Tomorrow" | weekday abbreviation
  dayOfMonth: string; // "03"
  /** True once this date has no curated data yet — rendered blurred and unclickable. */
  disabled?: boolean;
}

interface DietDateTabBarProps {
  tabs: DietDateTab[];
  activeIdx: number;
  onChange: (idx: number) => void;
  disabled?: boolean;
}

/**
 * Bespoke 5-pill date strip for the diet page — kept separate from ui/tabs.tsx and from
 * FourteenDaysV2TabBar/CompletedBatchTabs (this app's convention is one small per-feature
 * tab component rather than a shared abstraction, and this pill visual — a white card only
 * behind the active tab, plain muted text otherwise, over an illustrated banner — doesn't
 * match either existing option). Background is the actual Figma banner artwork (leaves,
 * wavy hills, food icons baked into the image) rather than a CSS gradient recreation.
 */
export const DietDateTabBar: React.FC<DietDateTabBarProps> = ({ tabs, activeIdx, onChange, disabled = false }) => (
  <div className="bg-cover bg-center bg-no-repeat px-4 pb-3 pt-4" style={{ backgroundImage: `url(${heroBanner})` }}>
    <p className="mb-4 text-center text-[17px] font-bold text-[#0D468B]">Your Daily Diet Routine</p>
    <div className="flex justify-between gap-[2px]">
      {tabs.map((tab, idx) => {
        const active = idx === activeIdx;
        const isDisabled = disabled || tab.disabled;
        return (
          <button
            key={tab.dateKey}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(idx)}
            className={`flex flex-col items-center gap-[3px] rounded-xl border-none ${
              active ? "flex-[1.15] px-[6px] pb-[9px] pt-2 bg-white shadow-[0_2px_6px_0_rgba(0,0,0,0.18)]" : "flex-1 px-1 py-2 bg-transparent shadow-none"
            } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${tab.disabled ? "pointer-events-none" : ""}`}
          >
            <span className={`text-xs font-semibold ${tab.disabled ? "text-[#BFBFBF]" : active ? "text-[#202020]" : "text-[#8B8B8B]"}`}>{tab.label}</span>
            <span className={`text-[15px] font-bold ${tab.disabled ? "text-[#BFBFBF]" : active ? "text-[#202020]" : "text-[#8B8B8B]"}`}>{tab.dayOfMonth}</span>
            {active && <span className="h-[3px] w-[22px] rounded-sm bg-[#FEAB27]" />}
          </button>
        );
      })}
    </div>
  </div>
);
