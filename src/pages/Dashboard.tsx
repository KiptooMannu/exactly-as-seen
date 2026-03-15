import { useAuth } from '@/contexts/AuthContext';
import { mockFarmers, mockDeliveries, mockComplaints, mockVisits } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Truck, AlertTriangle, MapPin, TrendingUp, TrendingDown } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const activeFarmers = mockFarmers.filter(f => f.supplyStatus === 'active').length;
  const decliningFarmers = mockFarmers.filter(f => f.supplyStatus === 'declining').length;
  const todayKg = mockDeliveries.filter(d => d.date === '2026-03-14').reduce((s, d) => s + d.kg, 0);
  const openComplaints = mockComplaints.filter(c => c.status !== 'resolved').length;
  const pendingFollowups = mockVisits.filter(v => !v.followUpOutcome).length;

  const stats = [
    { label: 'Active Farmers', value: activeFarmers, total: mockFarmers.length, icon: Users, color: 'text-primary', roles: ['admin', 'clerk', 'extension_officer'] },
    { label: "Today's Deliveries", value: `${todayKg} kg`, sub: `${mockDeliveries.filter(d => d.date === '2026-03-14').length} records`, icon: Truck, color: 'text-success', roles: ['admin', 'clerk'] },
    { label: 'Open Complaints', value: openComplaints, sub: 'need attention', icon: AlertTriangle, color: 'text-destructive', roles: ['admin', 'clerk'] },
    { label: 'Pending Follow-ups', value: pendingFollowups, sub: 'extension visits', icon: MapPin, color: 'text-accent', roles: ['admin', 'extension_officer'] },
  ].filter(s => s.roles.includes(user?.role || 'clerk'));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                  {s.sub && <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>}
                  {s.total && <p className="text-xs text-muted-foreground mt-1">of {s.total} total</p>}
                </div>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Deliveries - Admin and Clerk Only */}
        {(user?.role === 'admin' || user?.role === 'clerk') && (
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Deliveries</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="data-table">
                <thead><tr><th>Farmer</th><th>Kg</th><th>Grade</th><th>Center</th></tr></thead>
                <tbody>
                  {mockDeliveries.slice(0, 5).map(d => (
                    <tr key={d.id}>
                      <td className="font-medium">{d.farmerName}</td>
                      <td>{d.kg}</td>
                      <td><Badge variant={d.qualityGrade === 'A' ? 'default' : 'secondary'}>{d.qualityGrade}</Badge></td>
                      <td className="text-muted-foreground">{d.buyingCenter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Supply Alerts */}
        <Card>
          <CardHeader><CardTitle className="text-base">Supply Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockFarmers.filter(f => f.supplyStatus === 'declining' || f.supplyStatus === 'seasonal').map(f => (
              <div key={f.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.route} · {f.avgMonthlySupply} kg/mo</p>
                </div>
                <div className="flex items-center gap-2">
                  {f.qualityGradeTrend === 'declining' ? (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                  <Badge variant={f.supplyStatus === 'declining' ? 'destructive' : 'secondary'} className="text-xs">
                    {f.supplyStatus}
                  </Badge>
                </div>
              </div>
            ))}

            {(user?.role === 'admin' || user?.role === 'clerk') && mockComplaints.filter(c => c.status === 'open').map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <div>
                  <p className="font-medium text-sm">{c.farmerName}</p>
                  <p className="text-xs text-muted-foreground">{c.issueType.replace('_', ' ')} · {c.date}</p>
                </div>
                <Badge variant="destructive" className="text-xs">Open</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
