import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-toggle";
import { Sparkles } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", labelEn: "Home", labelJp: "ホーム" },
    { path: "/gallery", labelEn: "NFT Gallery", labelJp: "NFTギャラリー" },
    { path: "/dashboard", labelEn: "Quantum Dashboard", labelJp: "量子ダッシュボード" },
    { path: "/iyq2025", labelEn: "IYQ2025", labelJp: "IYQ2025" },
    { path: "/partnerships", labelEn: "Partnerships", labelJp: "パートナーシップ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-md px-2 py-1">
            <Sparkles className="h-6 w-6 text-quantum-gold" />
            <span className="font-quantum text-xl font-bold bg-gradient-to-r from-quantum-gold to-quantum-cyan bg-clip-text text-transparent">
              BananaSpace
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  data-testid={`link-nav-${item.path.replace("/", "") || "home"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors hover-elevate ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {t(item.labelEn, item.labelJp)}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
