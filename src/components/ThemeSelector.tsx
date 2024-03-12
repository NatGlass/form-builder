"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="light" onClick={() => setTheme("light")}>
                <SunIcon className="h-5 w-5" />
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Light mode</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                <MoonIcon className="h-5 w-5" />
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Dark Theme</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="system" onClick={() => setTheme("system")}>
                <DesktopIcon className="h-5 w-5" />
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>System Theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSelector;
