import { useState } from 'react';
import { mockDeliveries, mockFarmers, buyingCenters } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { Delivery } from '@/types/farmer';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ farmerId: '', kg: '', qualityGrade: 'A' as Delivery['qualityGrade'], buyingCenter: '' });

  const handleAdd = () => {
    const farmer = mockFarmers.find(f => f.id === form.farmerId);
    if (!farmer) return;
    const newDelivery: Delivery = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      farmerId: form.farmerId,
      farmerName: farmer.name,
      kg: Number(form.kg),
      qualityGrade: form.qualityGrade as Delivery['qualityGrade'],
      buyingCenter: form.buyingCenter,
      clerkId: '1',
    };
    setDeliveries([newDelivery, ...deliveries]);
    setOpen(false);
    setForm({ farmerId: '', kg: '', qualityGrade: 'A', buyingCenter: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Deliveries</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Record Delivery</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Record Delivery</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Farmer</Label>
                <Select value={form.farmerId} onValueChange={v => setForm(p => ({ ...p, farmerId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select farmer" /></SelectTrigger>
                  <SelectContent>
                    {mockFarmers.map(f => <SelectItem key={f.id} value={f.id}>{f.name} ({f.farmerId})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="form-grid">
                <div className="space-y-2">
                  <Label>Kilograms</Label>
                  <Input type="number" value={form.kg} onChange={e => setForm(p => ({ ...p, kg: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Quality Grade</Label>
                  <Select value={form.qualityGrade} onValueChange={v => setForm(p => ({ ...p, qualityGrade: v as Delivery['qualityGrade'] }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C', 'D'].map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Buying Center</Label>
                <Select value={form.buyingCenter} onValueChange={v => setForm(p => ({ ...p, buyingCenter: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select center" /></SelectTrigger>
                  <SelectContent>
                    {buyingCenters.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} className="w-full">Save Delivery</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Farmer</th><th>Kg</th><th>Grade</th><th>Center</th></tr></thead>
            <tbody>
              {deliveries.map(d => (
                <tr key={d.id}>
                  <td className="text-muted-foreground">{d.date}</td>
                  <td className="font-medium">{d.farmerName}</td>
                  <td>{d.kg}</td>
                  <td><Badge variant={d.qualityGrade === 'A' ? 'default' : 'secondary'}>{d.qualityGrade}</Badge></td>
                  <td className="text-muted-foreground">{d.buyingCenter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
