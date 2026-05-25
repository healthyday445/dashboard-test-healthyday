import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "../pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Preview Free_day7_7.00PM", () => {
  it("should render correct elements for Day 7 at 7:00 PM Telugu", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MemoryRouter initialEntries={["/?preview=Free_day7_7.00PM"]}>
            <Index />
          </MemoryRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );

    // Find the attendance section
    const dayBoxes = container.querySelectorAll("[style*='width: 42px']");
    console.log("Found " + dayBoxes.length + " day boxes.");
    dayBoxes.forEach((box) => {
      const label = box.querySelector("span")?.textContent;
      const statusDiv = box.querySelector("div");
      const bg = statusDiv?.style.background;
      let status = "unknown";
      if (bg?.includes("#0D9400") || bg?.includes("rgb(13, 148, 0)")) status = "green";
      else if (bg?.includes("#FEAB27") || bg?.includes("rgb(254, 171, 39)")) status = "yellow";
      else if (bg?.includes("#0D468B") || bg?.includes("rgb(13, 70, 139)")) status = "future";
      
      console.log(`${label}: ${status} (bg: ${bg})`);
    });

    console.log("Is coming soon shown?", container.innerHTML.includes("English is Coming Soon!"));
    console.log("Entire HTML body:\n", container.innerHTML);
  });
});
