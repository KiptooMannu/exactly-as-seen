import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { routes, teaVarieties } from '@/lib/mockData';
import { ArrowLeft } from 'lucide-react';

export default function FarmerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', nationalId: '', phone: '', route: '', village: '',
    totalFarmArea: '', teaHectarage: '', teaVariety: '', yearOfPlanting: '',
  });

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, POST to backend API
    navigate('/farmers');
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/farmers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="page-title">New Farmer</h1>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="text-base">Farmer Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-grid">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={e => set('name', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>National ID *</Label>
                <Input value={form.nationalId} onChange={e => set('nationalId', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="0712345678" />
              </div>
              <div className="space-y-2">
                <Label>Route / Region *</Label>
                <Select value={form.route} onValueChange={v => set('route', v)}>
                  <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                  <SelectContent>
                    {routes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Village / Location</Label>
                <Input value={form.village} onChange={e => set('village', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Total Farm Area (hectares)</Label>
                <Input type="number" step="0.1" value={form.totalFarmArea} onChange={e => set('totalFarmArea', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tea Hectarage</Label>
                <Input type="number" step="0.1" value={form.teaHectarage} onChange={e => set('teaHectarage', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tea Variety</Label>
                <Select value={form.teaVariety} onValueChange={v => set('teaVariety', v)}>
                  <SelectTrigger><SelectValue placeholder="Select variety" /></SelectTrigger>
                  <SelectContent>
                    {teaVarieties.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year of Planting</Label>
                <Input type="number" value={form.yearOfPlanting} onChange={e => set('yearOfPlanting', e.target.value)} placeholder="2020" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit">Save Farmer</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/farmers')}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
