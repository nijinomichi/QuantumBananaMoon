import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/components/language-toggle";
import { Play, Pause, Download, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import type { SensorDataPoint, RadicanTrustMetrics } from "@shared/schema";

export default function QuantumDashboard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [dataPoints, setDataPoints] = useState<SensorDataPoint[]>([]);
  const [currentData, setCurrentData] = useState<SensorDataPoint | null>(null);
  const [trustMetrics, setTrustMetrics] = useState<RadicanTrustMetrics>({
    vulnerabilityAuthenticity: 0.923,
    aestheticCoherence: 0.887,
    temporalBridgeIntegrity: 0.891,
    socialResonancePotential: 0.856,
    quantumAestheticEmergence: 0.914,
    compositeScore: 0.894,
  });

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      fetch('/api/quantum-sensor-data')
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch sensor data');
          }
          return res.json();
        })
        .then(data => {
          setCurrentData(data);
          setDataPoints(prev => [...prev.slice(-99), data]);
        })
        .catch(error => {
          console.error('Sensor data fetch failed:', error);
          toast({
            title: t("Sensor connection error", "センサー接続エラー"),
            description: t("Failed to retrieve sensor data", "センサーデータの取得に失敗しました"),
            variant: "destructive"
          });
          setIsActive(false);
        });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, t, toast]);

  const handleExportCSV = async () => {
    if (dataPoints.length === 0) {
      toast({
        title: t("No data to export", "エクスポートするデータがありません"),
        description: t("Start a session to collect data first", "まずセッションを開始してデータを収集してください"),
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/export-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataPoints }),
      });
      
      if (!response.ok) {
        let errorMessage = t("Failed to export session data", "セッションデータのエクスポートに失敗しました");
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Response is not JSON, use default error message
        }
        toast({
          title: t("Export failed", "エクスポート失敗"),
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quantum-session-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: t("Export successful", "エクスポート成功"),
        description: t("Session data exported to CSV", "セッションデータがCSVにエクスポートされました")
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: t("Export failed", "エクスポート失敗"),
        description: t("An error occurred during export", "エクスポート中にエラーが発生しました"),
        variant: "destructive"
      });
    }
  };

  const getQuantumState = () => {
    if (!currentData) return { name: "Idle", color: "bg-muted" };
    
    if (currentData.resonance > 0.7) return { name: "Resonance", color: "bg-quantum-state-resonance", textColor: "text-quantum-state-resonance" };
    if (currentData.observation > 0.6) return { name: "Observation", color: "bg-quantum-state-observation", textColor: "text-quantum-state-observation" };
    if (currentData.entanglement > 0.6) return { name: "Entanglement", color: "bg-quantum-state-entanglement", textColor: "text-quantum-state-entanglement" };
    if (currentData.collapse > 0.5) return { name: "Collapse", color: "bg-quantum-state-collapse", textColor: "text-quantum-state-collapse" };
    
    return { name: "Neutral", color: "bg-muted", textColor: "text-muted-foreground" };
  };

  const state = getQuantumState();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-quantum font-bold mb-2">
            {t("Quantum Empathy Dashboard", "量子共感ダッシュボード")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("Real-time quantum state measurement and Born Rule probability calculations", "リアルタイム量子状態測定とBornルール確率計算")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsActive(!isActive)}
            variant={isActive ? "destructive" : "default"}
            size="lg"
            data-testid="button-session-toggle"
          >
            {isActive ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                {t("Stop Session", "セッション停止")}
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                {t("Start Session", "セッション開始")}
              </>
            )}
          </Button>
          
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="lg"
            disabled={dataPoints.length === 0}
            data-testid="button-export-csv"
          >
            <Download className="h-5 w-5 mr-2" />
            {t("Export CSV", "CSVエクスポート")}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="font-quantum">{t("Quantum State", "量子状態")}</span>
              <Badge className={state.color} data-testid="badge-quantum-state">{state.name}</Badge>
            </CardTitle>
            <CardDescription>
              {t("Current quantum empathy state classification", "現在の量子共感状態の分類")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t("Resonance", "共鳴")} (528Hz)</span>
                  <span className="text-sm font-mono">{(currentData?.resonance || 0).toFixed(3)}</span>
                </div>
                <Progress value={(currentData?.resonance || 0) * 100} className="h-2" data-testid="progress-resonance" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t("Observation", "観測")}</span>
                  <span className="text-sm font-mono">{(currentData?.observation || 0).toFixed(3)}</span>
                </div>
                <Progress value={(currentData?.observation || 0) * 100} className="h-2" data-testid="progress-observation" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t("Entanglement", "エンタングルメント")}</span>
                  <span className="text-sm font-mono">{(currentData?.entanglement || 0).toFixed(3)}</span>
                </div>
                <Progress value={(currentData?.entanglement || 0) * 100} className="h-2" data-testid="progress-entanglement" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t("Collapse", "崩壊")}</span>
                  <span className="text-sm font-mono">{(currentData?.collapse || 0).toFixed(3)}</span>
                </div>
                <Progress value={(currentData?.collapse || 0) * 100} className="h-2" data-testid="progress-collapse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-quantum flex items-center gap-2">
              {t("RadicanTrust™ Score", "RadicanTrust™ スコア")}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t("Composite trust metric based on five dimensions of quantum aesthetic emergence", "量子美学の5次元に基づく複合信頼指標")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              {t("Multi-dimensional trust analysis", "多次元信頼分析")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-6xl font-mono font-bold text-quantum-gold" data-testid="text-trust-score">
                {(currentData?.trustScore || trustMetrics.compositeScore).toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("Target Range: 0.70 - 0.90", "目標範囲: 0.70 - 0.90")}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs">{t("Vulnerability Authenticity", "脆弱性の真正性")}</span>
                  <span className="text-xs font-mono">{trustMetrics.vulnerabilityAuthenticity.toFixed(3)}</span>
                </div>
                <Progress value={trustMetrics.vulnerabilityAuthenticity * 100} className="h-1" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs">{t("Aesthetic Coherence", "美的一貫性")}</span>
                  <span className="text-xs font-mono">{trustMetrics.aestheticCoherence.toFixed(3)}</span>
                </div>
                <Progress value={trustMetrics.aestheticCoherence * 100} className="h-1" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs">{t("Temporal Bridge Integrity", "時間的架け橋の整合性")}</span>
                  <span className="text-xs font-mono">{trustMetrics.temporalBridgeIntegrity.toFixed(3)}</span>
                </div>
                <Progress value={trustMetrics.temporalBridgeIntegrity * 100} className="h-1" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs">{t("Social Resonance Potential", "社会的共鳴の可能性")}</span>
                  <span className="text-xs font-mono">{trustMetrics.socialResonancePotential.toFixed(3)}</span>
                </div>
                <Progress value={trustMetrics.socialResonancePotential * 100} className="h-1" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs">{t("Quantum Aesthetic Emergence", "量子美学の創発")}</span>
                  <span className="text-xs font-mono">{trustMetrics.quantumAestheticEmergence.toFixed(3)}</span>
                </div>
                <Progress value={trustMetrics.quantumAestheticEmergence * 100} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-quantum">{t("Distance Sensor", "距離センサー")}</CardTitle>
            <CardDescription>HC-SR04 Ultrasonic (2-400cm)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold mb-2" data-testid="text-distance">
                {currentData?.distance.toFixed(1) || "0.0"}
              </div>
              <p className="text-sm text-muted-foreground">{t("centimeters", "センチメートル")}</p>
            </div>
            
            <div className="mt-6 h-32 bg-muted rounded-md flex items-end justify-around px-2 pb-2">
              {dataPoints.slice(-20).map((point, i) => (
                <div
                  key={i}
                  className="w-full bg-quantum-cyan rounded-t-sm mx-0.5"
                  style={{ height: `${(point.distance / 400) * 100}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-quantum">{t("Audio Level", "音声レベル")}</CardTitle>
            <CardDescription>Electret Microphone (0-100)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-mono font-bold mb-2" data-testid="text-audio">
                {currentData?.audioLevel.toFixed(1) || "0.0"}
              </div>
              <p className="text-sm text-muted-foreground">{t("amplitude units", "振幅単位")}</p>
            </div>
            
            <div className="mt-6 h-32 bg-muted rounded-md flex items-end justify-around px-2 pb-2">
              {dataPoints.slice(-20).map((point, i) => (
                <div
                  key={i}
                  className="w-full bg-quantum-pink rounded-t-sm mx-0.5"
                  style={{ height: `${point.audioLevel}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-quantum">{t("Born Rule Probability Distribution", "Born ルール確率分布")}</CardTitle>
          <CardDescription>
            {t("Quantum state probability according to Max Born's 1926 rule: p_i = |⟨λ_i|ψ⟩|²", "Max Born の 1926 年のルールに従った量子状態確率: p_i = |⟨λ_i|ψ⟩|²")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-quantum-state-resonance/10 rounded-md border-2 border-quantum-state-resonance/30">
              <div className="text-3xl font-mono font-bold text-quantum-state-resonance">
                {((currentData?.resonance || 0) * 100).toFixed(1)}%
              </div>
              <p className="text-sm mt-2">{t("Resonance", "共鳴")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-state-observation/10 rounded-md border-2 border-quantum-state-observation/30">
              <div className="text-3xl font-mono font-bold text-quantum-state-observation">
                {((currentData?.observation || 0) * 100).toFixed(1)}%
              </div>
              <p className="text-sm mt-2">{t("Observation", "観測")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-state-entanglement/10 rounded-md border-2 border-quantum-state-entanglement/30">
              <div className="text-3xl font-mono font-bold text-quantum-state-entanglement">
                {((currentData?.entanglement || 0) * 100).toFixed(1)}%
              </div>
              <p className="text-sm mt-2">{t("Entanglement", "エンタングルメント")}</p>
            </div>
            
            <div className="text-center p-4 bg-quantum-state-collapse/10 rounded-md border-2 border-quantum-state-collapse/30">
              <div className="text-3xl font-mono font-bold text-quantum-state-collapse">
                {((currentData?.collapse || 0) * 100).toFixed(1)}%
              </div>
              <p className="text-sm mt-2">{t("Collapse", "崩壊")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>{t("Session Data Points", "セッションデータポイント")}: <span className="font-mono font-bold">{dataPoints.length}</span></p>
        <p className="mt-1">{t("Update Rate: 50-100ms | Target Frame Rate: 60fps", "更新レート: 50-100ms | 目標フレームレート: 60fps")}</p>
      </div>
    </div>
  );
}
