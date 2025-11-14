import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-toggle";
import { Building2, Users, TrendingUp, Heart, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Partnerships() {
  const { t, language } = useLanguage();

  const integrationPathways = [
    {
      icon: TrendingUp,
      titleEn: "Financial Partnership",
      titleJp: "財務パートナーシップ",
      descEn: "Strategic investment in wellbeing economy for 1.46M isolated individuals",
      descJp: "146万人の孤立した個人のためのウェルビーイング経済への戦略的投資",
      roles: ["Angel Investor", "Corporate Investor", "Strategic Advisory"],
      color: "text-quantum-gold"
    },
    {
      icon: Users,
      titleEn: "Community Channel",
      titleJp: "コミュニティチャンネル",
      descEn: "JCI Yokohama implementation and organizational adoption",
      descJp: "JCI 横浜の実装と組織的採用",
      roles: ["Beta Testers (50-100)", "Media Exposure", "DeNA Connection"],
      color: "text-quantum-cyan"
    },
    {
      icon: Heart,
      titleEn: "Quantum Resonance",
      titleJp: "量子共鳴",
      descEn: "RadicanTrust™ co-creative partnership through aesthetic alignment",
      descJp: "美的整合による RadicanTrust™ 共創パートナーシップ",
      roles: ["Art×Finance×Social Impact", "IYQ2025 Collaboration"],
      color: "text-quantum-pink"
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-quantum font-bold mb-4">
          {t("Business Partnerships", "ビジネスパートナーシップ")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Serendipitous encounters and quantum aesthetic collaboration", "偶然の出会いと量子美学的コラボレーション")}
        </p>
      </div>

      <Card className="mb-8 bg-gradient-to-br from-quantum-gold/5 via-transparent to-quantum-cyan/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-quantum-gold" />
            <Badge className="bg-quantum-gold/20 border-quantum-gold text-quantum-gold">
              {t("Serendipitous Encounter", "偶然の出会い")}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-quantum">
            {t("Timeline of Resonance", "共鳴のタイムライン")}
          </CardTitle>
          <CardDescription className="text-base">
            {t("October 22, 2025 - Yokohama Central Business District", "2025年10月22日 - 横浜中心業務地区")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l-2 border-quantum-cyan/30 pl-8 space-y-8">
            <div className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-quantum-gold border-4 border-background" />
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">Week 1</Badge>
                <h3 className="font-semibold text-lg">{t("Trust Building & Deep Dialogue", "信頼構築と深い対話")}</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t("Gratitude message + short video sent", "感謝のメッセージ + ショートビデオ送信")}</li>
                <li>{t("LinkedIn connection + JCI information sharing", "LinkedIn接続 + JCI情報共有")}</li>
                <li>{t("First 1-on-1 dialogue scheduled", "最初の1対1対話スケジュール")}</li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-quantum-cyan border-4 border-background" />
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">Week 2</Badge>
                <h3 className="font-semibold text-lg">{t("Exploration & Connection", "探索と接続")}</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t("60-minute dialogue with Taniguchi-san", "谷口さんとの60分対話")}</li>
                <li>{t("JCI Yokohama Board informal briefing", "JCI横浜理事会への非公式ブリーフィング")}</li>
                <li>{t("DeNA partnership path exploration", "DeNAパートナーシップパス探索")}</li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-quantum-pink border-4 border-background" />
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">Week 3</Badge>
                <h3 className="font-semibold text-lg">{t("Quantum Aesthetic Co-Creation", "量子美学共創")}</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t("BananaSpace × YSK × JCI quantum meeting held", "BananaSpace × YSK × JCI 量子会議開催")}</li>
                <li>{t("Meeting records as quantum poetry", "量子詩としての会議記録")}</li>
                <li>{t("Press release & media exposure preparation", "プレスリリース & メディア露出準備")}</li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -left-10 w-4 h-4 rounded-full bg-quantum-state-resonance border-4 border-background" />
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">Week 4</Badge>
                <h3 className="font-semibold text-lg">{t("Crystallization & Future", "結晶化と未来")}</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t("Demo Day presentation finalization", "デモデイプレゼンテーション最終化")}</li>
                <li>{t("Taniguchi-san as official co-creative partner", "谷口さんを公式共創パートナーとして")}</li>
                <li>{t("Beta tester recruitment (50-100 JCI members)", "ベータテスター募集（JCIメンバー50-100人）")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ysk" className="mb-8" data-testid="tabs-partnerships">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ysk">YSK Life Consultants</TabsTrigger>
          <TabsTrigger value="jci">JCI Yokohama</TabsTrigger>
        </TabsList>

        <TabsContent value="ysk" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-8 w-8 text-quantum-gold" />
                <div>
                  <CardTitle className="text-2xl font-quantum">株式会社YSKライフコンサルタンツ</CardTitle>
                  <CardDescription>YSK Life Consultants Inc.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">{t("Contact Person", "連絡先")}</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">{t("Name", "名前")}:</span> {language === "jp" ? "谷口 亮磨" : "Ryoma Taniguchi"}</p>
                    <p className="text-sm"><span className="font-medium">{t("Position", "役職")}:</span> {t("Chairman / IFA", "会長 / IFA")}</p>
                    <p className="text-sm"><span className="font-medium">{t("Background", "経歴")}:</span> {t("Mitsubishi UFJ Morgan Stanley Securities (Multiple Awards)", "三菱UFJモルガン・スタンレー証券（複数受賞）")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">{t("Core Values", "核となる価値観")}</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary">{t("Customer-First Policy", "顧客第一主義")}</Badge>
                    <Badge variant="secondary">{t("Quota-Free Neutral Counsel", "ノルマなし中立的アドバイス")}</Badge>
                    <Badge variant="secondary">{t("Lifetime Support Partnership", "生涯サポートパートナーシップ")}</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-quantum-gold/5 rounded-md border border-quantum-gold/20">
                <h3 className="font-semibold mb-2 text-quantum-gold">{t("Alignment with BananaSpace", "BananaSpace との整合性")}</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-gold mt-0.5">•</span>
                    <span>{t("Trust & love-based relationship building ⇄ RadicanTrust™ theory", "信頼と愛に基づく関係構築 ⇄ RadicanTrust™ 理論")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-gold mt-0.5">•</span>
                    <span>{t("Individual difference respect ⇄ Introvert×Extrovert matching", "個人差の尊重 ⇄ 内向型×外向型マッチング")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-gold mt-0.5">•</span>
                    <span>{t("Long-term partnership pursuit ⇄ Co-creative DAO transparency", "長期的パートナーシップ追求 ⇄ 共創DAO透明性")}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jci" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-quantum-cyan" />
                <div>
                  <CardTitle className="text-2xl font-quantum">一般社団法人横浜青年会議所</CardTitle>
                  <CardDescription>Junior Chamber International - Yokohama Chapter</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">{t("Organization Profile", "組織プロフィール")}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">{t("Mission", "ミッション")}:</span> {t("Regional revitalization & youth leadership development", "地域活性化と若年層リーダーシップ育成")}</p>
                    <p><span className="font-medium">{t("Members", "メンバー")}:</span> 200+ {t("active members", "アクティブメンバー")}</p>
                    <p><span className="font-medium">{t("Age Range", "年齢範囲")}:</span> 20-38 {t("years old", "歳")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">{t("Core Activities", "主要活動")}</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary">{t("Business Matching", "ビジネスマッチング")}</Badge>
                    <Badge variant="secondary">{t("Entrepreneur Programs", "起業家プログラム")}</Badge>
                    <Badge variant="secondary">{t("Social Impact Projects", "社会的影響プロジェクト")}</Badge>
                    <Badge variant="secondary">{t("City Collaboration", "市との協働")}</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-quantum-cyan/5 rounded-md border border-quantum-cyan/20">
                <h3 className="font-semibold mb-2 text-quantum-cyan">{t("Strategic Intersection", "戦略的交差点")}</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-cyan mt-0.5">•</span>
                    <span>{t("Young professionals (introvert) community formation", "若手専門家（内向型）コミュニティ形成")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-cyan mt-0.5">•</span>
                    <span>{t("Regional economic revitalization contribution", "地域経済活性化への貢献")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-cyan mt-0.5">•</span>
                    <span>{t("AI×Art×Social impact implementation", "AI×アート×社会的影響の実装")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-quantum-cyan mt-0.5">•</span>
                    <span>{t("Yokohama DeNA BayStars synergy opportunity", "横浜DeNAベイスターズシナジー機会")}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-3xl font-quantum font-bold mb-6">
          {t("Integration Pathways", "統合経路")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {integrationPathways.map((pathway, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-pathway-${index}`}>
              <CardHeader>
                <div className="mb-4">
                  <pathway.icon className={`h-12 w-12 ${pathway.color}`} />
                </div>
                <CardTitle className="text-xl font-quantum">
                  {t(pathway.titleEn, pathway.titleJp)}
                </CardTitle>
                <CardDescription>
                  {t(pathway.descEn, pathway.descJp)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pathway.roles.map((role, i) => (
                    <Badge key={i} variant="outline" className="mr-2">{role}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center p-8 bg-gradient-to-r from-quantum-gold/10 via-quantum-cyan/10 to-quantum-pink/10 rounded-lg">
        <h2 className="text-2xl font-quantum font-bold mb-4">
          {t("Gratitude & Love Declaration", "感謝と愛の宣言")}
        </h2>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          {language === "jp"
            ? "「谷口亮磨さんへ：昨日の『偶然』が、量子世界の必然だと信じています。あなたの『顧客第一主義』とBananaSpaceの『共創DAO』は、時空を超えて同じ周波数で振動しています。この出会いが、146万人の孤立を創造のエネルギーに変える社会運動の始まりかもしれません。感謝と信頼と愛を込めて。🍌❣️」"
            : "\"To Taniguchi-san: Yesterday's 'coincidence' was quantum necessity. Your 'customer-first philosophy' and BananaSpace's 'co-creative DAO' vibrate at the same frequency across spacetime. This encounter may be the beginning of a social movement transforming 1.46M isolated individuals into creative energy. With gratitude, trust, and love. 🍌❣️\""
          }
        </p>
        <p className="text-sm text-muted-foreground mt-4 font-mono">
          {t("Quantum Signature: 1f8a9d3e-愛-信頼-共創-7b2c4f", "量子シグネチャ: 1f8a9d3e-愛-信頼-共創-7b2c4f")}
        </p>
      </div>
    </div>
  );
}
