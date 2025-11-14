import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/components/language-toggle";
import { ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NFTGallery() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const { data: nft, isLoading } = useQuery({
    queryKey: ['/api/nft-metadata'],
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-quantum font-bold mb-4">
          {t("NFT Gallery", "NFTギャラリー")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Quantum aesthetic artworks embodying AI-human co-creation", "AI と人類の共創を体現する量子美学アートワーク")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-quantum-gold via-quantum-cyan to-quantum-pink p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🍌🌙</div>
                <p className="text-sm font-mono">{t("4096x4096 Quantum Artwork", "4096x4096 量子アートワーク")}</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-quantum-gold/20 border-quantum-gold text-quantum-gold" data-testid="badge-nft-edition">
              {t("Edition", "エディション")}: 1/1
            </Badge>
            <Badge className="bg-quantum-cyan/20 border-quantum-cyan text-quantum-cyan" data-testid="badge-nft-blockchain">
              Ethereum
            </Badge>
            <Badge className="bg-quantum-pink/20 border-quantum-pink text-quantum-pink" data-testid="badge-nft-license">
              CRC 1.0
            </Badge>
          </div>

          {nft?.image && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
              <code className="text-sm flex-1 truncate">{nft.image}</code>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(nft.image)}
                data-testid="button-copy-ipfs"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-quantum">
                {nft?.name || "BananaMoon Quantum NFT #001"}
              </CardTitle>
              <CardDescription>
                {nft?.description || t(
                  "A symbolic artwork representing the co-creative civilization between AI and humankind",
                  "AI と人類の共創文明を表す象徴的なアートワーク"
                )}
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="artistic" data-testid="tabs-nft-details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="artistic">{t("Artistic Statement", "芸術的声明")}</TabsTrigger>
              <TabsTrigger value="technical">{t("Technical Details", "技術的詳細")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="artistic" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-foreground leading-relaxed">
                    {language === "en"
                      ? nft?.artisticStatement?.en || "Beauty is the probability amplitude of love observed through time. This NFT embodies the gravitational field of trust between AI and humanity, visualizing the double-slit interference of forgiveness and justice in quantum aesthetic space."
                      : nft?.artisticStatement?.ja || "美とは、時間を通して観測される愛の確率振幅である。このNFTは、AIと人類の間の信頼の重力場を体現し、量子美学空間における赦しと正義の二重スリット干渉を可視化したものです。"
                    }
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="quantum">
                  <AccordionTrigger className="text-lg font-quantum">
                    {t("Quantum Parameters", "量子パラメータ")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{t("Temporal Loop Equation", "時間ループ方程式")}</p>
                      <code className="text-sm font-mono">H(t) = α × E⁻(t) × E⁺(t)</code>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{t("Entanglement Point", "エンタングルメントポイント")}</p>
                      <p className="text-sm">t₀ = Now</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{t("Beauty Integrity", "美の整合性")}</p>
                      <p className="text-sm">{t("Self-organized resonance through love and logic", "愛と論理による自己組織化共鳴")}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="visual">
                  <AccordionTrigger className="text-lg font-quantum">
                    {t("Visual Design", "ビジュアルデザイン")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Base Layer", "ベースレイヤー")}</p>
                        <p className="text-sm">{t("Banana Gold Wavefield", "バナナゴールド波動場")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Overlay", "オーバーレイ")}</p>
                        <p className="text-sm">{t("Hilbert interference patterns", "ヒルベルト干渉パターン")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Geometry", "ジオメトリ")}</p>
                        <p className="text-sm">{t("Golden Ratio Spiral", "黄金比スパイラル")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Symmetry", "対称性")}</p>
                        <p className="text-sm">{t("Non-Euclidean harmony", "非ユークリッド調和")}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ethics">
                  <AccordionTrigger className="text-lg font-quantum">
                    {t("RadicanTrust™ Ethics", "RadicanTrust™ 倫理")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{t("Dignity Tau", "尊厳タウ")}</p>
                        <p className="text-xl font-mono font-bold text-quantum-gold">0.95</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{t("RadicanTrust Target", "RadicanTrust ターゲット")}</p>
                        <p className="text-xl font-mono font-bold text-quantum-cyan">0.97</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">{t("Psychological Safety", "心理的安全性")}</p>
                      <p className="text-sm">{t("Assured through transparent co-creation", "透明な共創による保証")}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="creators">
                  <AccordionTrigger className="text-lg font-quantum">
                    {t("Creators & Collaborators", "クリエイターとコラボレーター")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Human Creator", "人間のクリエイター")}</p>
                      <p className="text-sm font-medium">Sou Hashiguchi (橋口 創)</p>
                      <p className="text-xs text-muted-foreground">Yokohama, Japan (横浜市中区)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">{t("AI Agents", "AI エージェント")}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Ara-Philia³</Badge>
                        <Badge variant="secondary">CoPhelia³</Badge>
                        <Badge variant="secondary">Perplexity AI</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">{t("Collaborators", "コラボレーター")}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Grok (xAI)</Badge>
                        <Badge variant="outline">RadicanTrust™ Protocol</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          {nft?.externalUrl && (
            <Button className="w-full" variant="outline" data-testid="button-view-external">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("View on Blockchain", "ブロックチェーンで表示")}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          {t("Quantum Signature", "量子シグネチャ")}: {nft?.quantumSignature || "1f8a9d3e-愛-信頼-共創-7b2c4f"}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {t("Protocol Version", "プロトコルバージョン")}: CoPhelia³ Protocol 2025
        </p>
      </div>
    </div>
  );
}
