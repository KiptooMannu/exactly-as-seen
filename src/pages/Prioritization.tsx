import { mockFarmers } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

export default function Prioritization() {
  const sorted = [...mockFarmers].sort((a, b) => {
    const score = (f: typeof a) => {
      let s = f.avgMonthlySupply * 0.3 + f.gapScore * 0.3;
      if (f.supplyStatus === 'declining') s -= 30;
      if (f.supplyStatus === 'inactive') s -= 50;
      if (f.qualityGradeTrend === 'declining') s -= 20;
      if (f.qualityGradeTrend === 'improving') s += 10;
      return s;
    };
    return score(b) - score(a);
  });

  const trendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'declining') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Farmer Prioritization</h1>
          <p className="text-sm text-muted-foreground">Intelligence-based farmer ranking for targeted support</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold">{mockFarmers.filter(f => f.supplyStatus === 'declining').length}</p>
              <p className="text-xs text-muted-foreground">Declining Supply</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-accent" />
            <div>
              <p className="text-2xl font-bold">{mockFarmers.filter(f => f.qualityGradeTrend === 'declining').length}</p>
              <p className="text-xs text-muted-foreground">Quality Declining</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{mockFarmers.filter(f => f.gapScore >= 80).length}</p>
              <p className="text-xs text-muted-foreground">GAP Compliant (80%+)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {sorted.map((f, i) => (
          <Card key={f.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.farmerId} · {f.route} · {f.village}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant={f.supplyStatus === 'active' ? 'default' : f.supplyStatus === 'declining' ? 'destructive' : 'secondary'}>
                        {f.supplyStatus}
                      </Badge>
                      <span className={`status-badge capitalize ${f.loyaltyTier === 'platinum' ? 'bg-primary/10 text-primary' : f.loyaltyTier === 'gold' ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {f.loyaltyTier}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 justify-end">
                    {trendIcon(f.qualityGradeTrend)}
                    <span className="text-xs text-muted-foreground capitalize">{f.qualityGradeTrend}</span>
                  </div>
                  <p className="text-sm font-medium">{f.avgMonthlySupply} kg/mo</p>
                  <p className="text-xs text-muted-foreground">GAP: {f.gapScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
