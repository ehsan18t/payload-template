"use client";

import { ListIcon, MoonIcon, SunIcon, X } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";
import { useTheme } from "../../providers/useTheme";
import BrandWordmark from "../ui/BrandWordmark";

const NAV_LINKS = [
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" }
] as const;

type ThemeToggleButtonProps = {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
  iconClassName?: string;
};

function ThemeToggleButton({
  isDark,
  onToggle,
  className = "",
  iconClassName = "w-4 h-4"
}: ThemeToggleButtonProps) {
  return (
    <button onClick={onToggle} className={className} aria-label="Toggle theme">
      {isDark ? <SunIcon className={iconClassName} /> : <MoonIcon className={iconClassName} />}
    </button>
  );
}

type NavLinkListProps = {
  onNavigate?: () => void;
  className?: string;
};

function NavLinkList({ onNavigate, className = "" }: NavLinkListProps) {
  return (
    <div className={className}>
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} onClick={onNavigate}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

type MobileMenuProps = {
  open: boolean;
  isDark: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
};

function MobileMenu({ open, isDark, onClose, onToggleTheme }: MobileMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="border-border border-t bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex flex-col gap-4 px-6 py-4 font-medium text-muted-foreground text-sm [&_a]:transition-colors [&_a]:hover:text-foreground">
        <NavLinkList onNavigate={onClose} className="flex flex-col gap-3" />

        <div className="flex items-center justify-between gap-3 border-border border-t pt-4">
          <ThemeToggleButton
            isDark={isDark}
            onToggle={onToggleTheme}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            iconClassName="w-5 h-5"
          />
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90">
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-border bg-background/80 py-3 backdrop-blur-md"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center">
            <img src={`/logo-${isDark ? "dark" : "light"}.svg`} alt="logo" />
          </div>
          <a href="/" className="group shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <BrandWordmark className="font-bold text-3xl" />
            <span className="block pl-1 text-foreground/60 text-xs uppercase tracking-wider">
              Since 2024
            </span>
          </a>
        </div>

        <div className="hidden items-center gap-8 font-medium text-muted-foreground text-sm md:flex [&_a]:transition-colors [&_a]:hover:text-foreground">
          <NavLinkList className="flex items-center gap-8" />

          <div className="ml-4 flex items-center gap-4 border-border border-l pl-4">
            <ThemeToggleButton
              isDark={isDark}
              onToggle={toggleTheme}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90">
              Book a Consultation
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden [&>button]:p-2">
          <ThemeToggleButton
            isDark={isDark}
            onToggle={toggleTheme}
            className="text-muted-foreground transition-colors hover:text-foreground"
            iconClassName="w-5 h-5"
          />
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-foreground"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <ListIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        isDark={isDark}
        onClose={() => setMobileMenuOpen(false)}
        onToggleTheme={toggleTheme}
      />
    </nav>
  );
}
