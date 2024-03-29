import Logo from "@/components/Logo";
import ThemeSelector from "@/components/ThemeSelector";
import { UserButton } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSelector />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default DashboardLayout;
