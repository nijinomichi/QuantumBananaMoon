import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-toggle";
import { Copy, Check, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IYQ2025() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [breathRate, setBreathRate] = useState<string>("neutral");
  const [noiseWord, setNoiseWord] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSocialPost = async () => {
    try {
      const response = await fetch("/api/generate-social-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to generate social post:", errorData.message);
        setGeneratedContent("");
        return;
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Failed to generate social post:", error);
      setGeneratedContent("");
    }
  };

  const generateBreathMapping = async () => {
    try {
      const response = await fetch("/api/generate-breath-mapping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breathRate, language })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to generate breath mapping:", errorData.message);
        setGeneratedContent("");
        return;
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Failed to generate breath mapping:", error);
      setGeneratedContent("");
    }
  };

  const generateNoisePattern = async () => {
    if (!noiseWord) return;
    
    try {
      const response = await fetch("/api/generate-noise-pattern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noiseWord, language })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to generate noise pattern:", errorData.message);
        setGeneratedContent("");
        return;
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Failed to generate noise pattern:", error);
      setGeneratedContent("");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Badge className="mb-4 bg-quantum-cyan/20 border-quantum-cyan text-quantum-cyan">
          {t("International Year of Quantum Science & Technology 2025", "国際量子科学技術年 2025")}
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-quantum font-bold mb-4">
          {t("IYQ2025 Content Generator", "IYQ2025 コンテンツジェネレーター")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Create quantum aesthetic social media content and interactive experiments", "量子美学ソーシャルメディアコンテンツとインタラクティブ実験を作成")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="social" data-testid="tabs-content-type">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="social">{t("Social Post", "ソーシャル投稿")}</TabsTrigger>
              <TabsTrigger value="breath">{t("Breath Map", "呼吸マップ")}</TabsTrigger>
              <TabsTrigger value="noise">{t("Noise-Word", "ノイズワード")}</TabsTrigger>
            </TabsList>

            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-quantum">{t("Social Media Template", "ソーシャルメディアテンプレート")}</CardTitle>
                  <CardDescription>
                    {t("Generate bilingual quantum aesthetic posts for X/Twitter", "X/Twitter 用のバイリンガル量子美学投稿を生成")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm mb-2 font-semibold">{t("Template Structure", "テンプレート構造")}:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>{t("Poetic opening about beauty and causality", "美と因果関係についての詩的なオープニング")}</li>
                      <li>{t("Mathematical equation (Temporal Model)", "数学的方程式（時間モデル）")}</li>
                      <li>{t("Philosophical insight", "哲学的洞察")}</li>
                      <li>{t("Hashtags: #QuantumAesthetics #IYQ2025 #RadicanTrust", "ハッシュタグ")}</li>
                    </ul>
                  </div>
                  
                  <Button onClick={generateSocialPost} className="w-full" data-testid="button-generate-social">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t("Generate Social Post", "ソーシャル投稿を生成")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breath" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-quantum">{t("Breath Mapping Experiment", "呼吸マッピング実験")}</CardTitle>
                  <CardDescription>
                    {t("Map your breath rate to quantum aesthetic parameters (α, D, ρ)", "呼吸速度を量子美学パラメータにマッピング (α, D, ρ)")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={breathRate} onValueChange={setBreathRate} data-testid="radio-breath-rate">
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted">
                      <RadioGroupItem value="slow" id="slow" />
                      <Label htmlFor="slow" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t("Slow", "遅い")}</div>
                        <p className="text-sm text-muted-foreground">{t("Deep inner contraction, meditative", "深い内的収縮、瞑想的")}</p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted">
                      <RadioGroupItem value="neutral" id="neutral" />
                      <Label htmlFor="neutral" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t("Neutral", "中立")}</div>
                        <p className="text-sm text-muted-foreground">{t("Balanced quantum resonance", "バランスの取れた量子共鳴")}</p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-muted">
                      <RadioGroupItem value="fast" id="fast" />
                      <Label htmlFor="fast" className="flex-1 cursor-pointer">
                        <div className="font-medium">{t("Fast", "速い")}</div>
                        <p className="text-sm text-muted-foreground">{t("Rapid outer expansion, energetic", "急速な外部拡張、エネルギッシュ")}</p>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <Button onClick={generateBreathMapping} className="w-full" data-testid="button-generate-breath">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t("Generate Breath Map", "呼吸マップを生成")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="noise" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-quantum">{t("Noise-Word Integration", "ノイズワード統合")}</CardTitle>
                  <CardDescription>
                    {t("Add a deviation word to quantum interference pattern", "量子干渉パターンに逸脱語を追加")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="noise-word">{t("Enter a word (blur, crack, wave, etc.)", "単語を入力 (ぼかし、ひび、波など)")}</Label>
                    <Input
                      id="noise-word"
                      value={noiseWord}
                      onChange={(e) => setNoiseWord(e.target.value)}
                      placeholder={t("blur", "ぼかし")}
                      className="mt-2"
                      data-testid="input-noise-word"
                    />
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm mb-2 font-semibold">{t("Process", "プロセス")}:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>{t("Word converted to quantum noise phase", "単語を量子ノイズ位相に変換")}</li>
                      <li>{t("Integrated into interference pattern", "干渉パターンに統合")}</li>
                      <li>{t("Woven into next visual frame", "次のビジュアルフレームに織り込む")}</li>
                    </ul>
                  </div>
                  
                  <Button onClick={generateNoisePattern} className="w-full" disabled={!noiseWord} data-testid="button-generate-noise">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t("Generate Noise Pattern", "ノイズパターンを生成")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-quantum">{t("Generated Content", "生成されたコンテンツ")}</CardTitle>
                {generatedContent && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopy(generatedContent)}
                    data-testid="button-copy-content"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              <CardDescription>
                {t("Your quantum aesthetic content appears here", "あなたの量子美学コンテンツがここに表示されます")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <Textarea
                  value={generatedContent}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="textarea-generated-content"
                />
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                  {t("Select a generation method and click generate", "生成方法を選択してクリックしてください")}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-quantum">{t("Response Templates", "応答テンプレート")}</CardTitle>
              <CardDescription>
                {t("Engage with researchers and artists", "研究者やアーティストと交流")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm font-semibold mb-2">{t("For Scientists:", "科学者向け:")}</p>
                <p className="text-sm text-foreground">
                  {language === "jp" 
                    ? '「あらゆる正しい理論は、密かな美を持つ。今回はその美を"時間密度"として測る。」'
                    : '"Every valid theory is secretly beautiful; here we measure that beauty as density of time."'
                  }
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm font-semibold mb-2">{t("For Artists:", "アーティスト向け:")}</p>
                <p className="text-sm text-foreground">
                  {language === "jp"
                    ? '「詩的表現が科学的基盤と出会う場所。あなたの好きな色や美学的好みを教えてください。」'
                    : '"Where poetic expression meets scientific foundation. Share your color preferences and aesthetic sensibilities."'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-quantum">{t("Success Metrics (KPIs)", "成功指標 (KPI)")}</CardTitle>
          <CardDescription>
            {t("Target engagement for IYQ2025 participation", "IYQ2025参加の目標エンゲージメント")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-quantum-gold/10 rounded-md">
              <div className="text-3xl font-bold text-quantum-gold">≥30</div>
              <p className="text-sm text-muted-foreground mt-1">{t("Scientist Reactions", "科学者の反応")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-cyan/10 rounded-md">
              <div className="text-3xl font-bold text-quantum-cyan">≥12</div>
              <p className="text-sm text-muted-foreground mt-1">{t("Co-Creation Submissions", "共創投稿")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-pink/10 rounded-md">
              <div className="text-3xl font-bold text-quantum-pink">≥10%</div>
              <p className="text-sm text-muted-foreground mt-1">{t("Repost Rate", "リポスト率")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-state-resonance/10 rounded-md">
              <div className="text-3xl font-bold text-quantum-state-resonance">0.90</div>
              <p className="text-sm text-muted-foreground mt-1">{t("Civility Index", "礼儀指数")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
