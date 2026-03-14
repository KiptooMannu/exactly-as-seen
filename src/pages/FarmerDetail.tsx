import { useParams, useNavigate } from 'react-router-dom';
import { mockFarmers, mockDeliveries, mockInteractions, mockComplaints, mockVisits } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

export default function FarmerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const farmer = mockFarmers.find(f => f.id === id);

  if (!farmer) return <div className="p-8 text-center text-muted-foreground">Farmer not found</div>;

  const deliveries = mockDeliveries.filter(d => d.farmerId === id);
  const interactions = mockInteractions.filter(i => i.farmerId === id);
  const complaints = mockComplaints.filter(c => c.farmerId === id);
  const visits = mockVisits.filter(v => v.farmerId === id);

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/farmers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="page-title">{farmer.name}</h1>
            <p className="text-sm text-muted-foreground">{farmer.farmerId} · {farmer.route} · {farmer.village}</p>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: 'Tea Hectarage', value: `${farmer.teaHectarage} ha` },
          { label: 'Monthly Supply', value: `${farmer.avgMonthlySupply} kg` },
          { label: 'GAP Score', value: `${farmer.gapScore}%` },
          { label: 'Loyalty Tier', value: farmer.loyaltyTier },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-lg font-bold capitalize">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="deliveries">
        <TabsList>
          <TabsTrigger value="deliveries">Deliveries ({deliveries.length})</TabsTrigger>
          <TabsTrigger value="interactions">Interactions ({interactions.length})</TabsTrigger>
          <TabsTrigger value="complaints">Complaints ({complaints.length})</TabsTrigger>
          <TabsTrigger value="visits">Visits ({visits.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="deliveries">
          <Card>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead><tr><th>Date</th><th>Kg</th><th>Grade</th><th>Center</th></tr></thead>
                <tbody>
                  {deliveries.map(d => (
                    <tr key={d.id}>
                      <td>{d.date}</td><td>{d.kg}</td>
                      <td><Badge variant="default">{d.qualityGrade}</Badge></td>
                      <td className="text-muted-foreground">{d.buyingCenter}</td>
                    </tr>
                  ))}
                  {deliveries.length === 0 && <tr><td colSpan={4} className="text-center text-muted-foreground py-8">No deliveries recorded</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="interactions">
          <Card>
            <CardContent className="p-4 space-y-3">
              {interactions.map(i => (
                <div key={i.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{i.type.replace('_', ' ')}</Badge>
                    <span className="text-xs text-muted-foreground">{i.date}</span>
                  </div>
                  <p className="text-sm">{i.notes}</p>
                </div>
              ))}
              {interactions.length === 0 && <p className="text-center text-muted-foreground py-8">No interactions recorded</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardContent className="p-4 space-y-3">
              {complaints.map(c => (
                <div key={c.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary">{c.issueType.replace('_', ' ')}</Badge>
                    <span className={`status-badge ${c.status === 'open' ? 'status-open' : c.status === 'in_progress' ? 'status-progress' : 'status-resolved'}`}>{c.status}</span>
                  </div>
                  <p className="text-sm">{c.description}</p>
                  {c.resolution && <p className="text-xs text-muted-foreground mt-1">Resolution: {c.resolution}</p>}
                </div>
              ))}
              {complaints.length === 0 && <p className="text-center text-muted-foreground py-8">No complaints recorded</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits">
          <Card>
            <CardContent className="p-4 space-y-3">
              {visits.map(v => (
                <div key={v.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">{v.adviceType}</Badge>
                    <span className="text-xs text-muted-foreground">{v.date}</span>
                  </div>
                  <p className="text-sm font-medium">{v.purpose}</p>
                  <p className="text-sm text-muted-foreground mt-1">{v.observations}</p>
                  <p className="text-sm mt-1"><strong>Action:</strong> {v.recommendedAction}</p>
                  <p className="text-xs text-muted-foreground mt-1">Follow-up: {v.followUpDate} {v.followUpOutcome ? `· ${v.followUpOutcome}` : '· Pending'}</p>
                </div>
              ))}
              {visits.length === 0 && <p className="text-center text-muted-foreground py-8">No visits recorded</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
