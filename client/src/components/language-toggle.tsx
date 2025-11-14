import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";

type Language = "en" | "jp";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (enText: string, jpText: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (enText: string, jpText: string) =>
    language === "en" ? enText : jpText;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "jp" : "en")}
      className="font-medium"
      data-testid="button-language-toggle"
    >
      {language === "en" ? "JP" : "EN"}
    </Button>
  );
}
