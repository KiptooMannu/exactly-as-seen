import { mockStaffMetrics } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StaffPerformance() {
  const clerks = mockStaffMetrics.filter(s => s.role === 'clerk');
  const officers = mockStaffMetrics.filter(s => s.role === 'extension_officer');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff Performance</h1>
          <p className="text-sm text-muted-foreground">Monitor team performance metrics</p>
        </div>
      </div>

      {/* Clerks */}
      <h2 className="text-lg font-semibold mb-3">Clerks</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {clerks.map(c => (
          <Card key={c.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {c.name}
                <Badge variant="secondary">Clerk</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold">{(c.volumeHandled / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Kg Handled</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{c.complaintResolutionDays}</p>
                  <p className="text-xs text-muted-foreground">Avg Days to Resolve</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{c.farmerRetention}%</p>
                  <p className="text-xs text-muted-foreground">Retention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Extension Officers */}
      <h2 className="text-lg font-semibold mb-3">Extension Officers</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {officers.map(o => (
          <Card key={o.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {o.name}
                <Badge variant="default">Extension Officer</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold">{o.visitFrequency}</p>
                  <p className="text-xs text-muted-foreground">Visits / Month</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{o.adviceFollowUp}%</p>
                  <p className="text-xs text-muted-foreground">Follow-up Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
