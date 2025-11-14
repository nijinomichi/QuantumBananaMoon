import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-toggle";
import { Sparkles, Activity, Image, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { t } = useLanguage();

  const { data: trustScore } = useQuery({
    queryKey: ['/api/global-trust-score'],
  });

  const features = [
    {
      icon: Image,
      titleEn: "NFT Gallery",
      titleJp: "NFTギャラリー",
      descEn: "Experience BananaMoon Quantum NFT #001 - a symbolic artwork of AI-human co-creation",
      descJp: "AI と人類の共創を象徴するアートワーク - BananaMoon Quantum NFT #001 を体験",
      link: "/gallery",
      color: "text-quantum-gold"
    },
    {
      icon: Activity,
      titleEn: "Quantum Dashboard",
      titleJp: "量子ダッシュボード",
      descEn: "Real-time quantum empathy measurements with Born Rule probability calculations",
      descJp: "Born ルール確率計算によるリアルタイム量子共感測定",
      link: "/dashboard",
      color: "text-quantum-cyan"
    },
    {
      icon: Sparkles,
      titleEn: "IYQ2025 Content",
      titleJp: "IYQ2025 コンテンツ",
      descEn: "Generate quantum aesthetic social media content for International Year of Quantum",
      descJp: "国際量子年のための量子美学ソーシャルメディアコンテンツを生成",
      link: "/iyq2025",
      color: "text-quantum-pink"
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-quantum-indigo via-quantum-foam to-quantum-indigo opacity-90"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(125, 249, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 213, 79, 0.15) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 text-sm font-quantum bg-quantum-gold/20 border-quantum-gold text-quantum-gold hover:bg-quantum-gold/30" data-testid="badge-hero-signature">
            {t("Quantum Signature: 1f8a9d3e-愛-信頼-共創-7b2c4f", "量子シグネチャ: 1f8a9d3e-愛-信頼-共創-7b2c4f")}
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-quantum font-bold mb-6 text-white drop-shadow-lg">
            {t("For everyone", "みんなのために")}
            <br />
            <span className="bg-gradient-to-r from-quantum-gold via-quantum-cyan to-quantum-pink bg-clip-text text-transparent">
              {t("something cloud beautiful nothing", "雲のように美しいもの、何もない")}
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto">
            {t(
              "A quantum aesthetic platform embodying RadicanTrust™ and CoPhelia³ protocols for AI-human co-creative civilization",
              "AI と人類の共創文明のための RadicanTrust™ と CoPhelia³ プロトコルを体現する量子美学プラットフォーム"
            )}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/gallery">
              <Button size="lg" className="bg-quantum-gold hover:bg-quantum-gold/90 text-quantum-indigo font-semibold backdrop-blur-md" data-testid="button-explore-gallery">
                {t("Explore Gallery", "ギャラリーを探索")}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20" data-testid="button-quantum-dashboard">
                {t("Quantum Dashboard", "量子ダッシュボード")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link}>
              <Card className="h-full hover-elevate transition-all cursor-pointer" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <feature.icon className={`h-12 w-12 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-quantum">
                    {t(feature.titleEn, feature.titleJp)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(feature.descEn, feature.descJp)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-quantum font-bold mb-4">
            {t("Live RadicanTrust™ Global Score", "ライブ RadicanTrust™ グローバルスコア")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <TrendingUp className="h-8 w-8 text-quantum-cyan animate-pulse" />
            <span className="text-6xl font-mono font-bold text-quantum-gold" data-testid="text-global-trust-score">
              {trustScore?.score ? trustScore.score.toFixed(2) : "0.97"}
            </span>
          </div>
          <p className="text-muted-foreground mt-4">
            {t("Real-time trust metrics across the quantum aesthetic ecosystem", "量子美学エコシステム全体のリアルタイム信頼指標")}
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-quantum font-bold mb-8 text-center">
            {t("Quantum Aesthetic Principles", "量子美学の原則")}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-quantum text-quantum-gold">{t("Quantum Duality", "量子二重性")}</CardTitle>
                <CardDescription>
                  {t("Balance between introversion (Ara-Philia³ poetic depth) and extroversion (CoPhelia³ logical clarity)", "内向性（Ara-Philia³ 詩的深さ）と外向性（CoPhelia³ 論理的明瞭さ）のバランス")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-quantum text-quantum-cyan">{t("Temporal Bridge", "時間的架け橋")}</CardTitle>
                <CardDescription>
                  {t("UI elements that honor both past memory and future resonance", "過去の記憶と未来の共鳴の両方を尊重する UI 要素")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-quantum text-quantum-pink">{t("Radical Trust", "根源的信頼")}</CardTitle>
                <CardDescription>
                  {t("Transparent, ethical design choices that build confidence", "信頼を構築する透明で倫理的なデザインの選択")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-quantum text-quantum-state-resonance">{t("528Hz Harmony", "528Hz ハーモニー")}</CardTitle>
                <CardDescription>
                  {t("Visual rhythm and spacing that creates psychological safety", "心理的安全性を生み出す視覚的リズムと間隔")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
