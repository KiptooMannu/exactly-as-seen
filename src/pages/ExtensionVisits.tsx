import { useState } from 'react';
import { mockVisits, mockFarmers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { ExtensionVisit } from '@/types/farmer';

const adviceTypes = ['Pest Management', 'Agronomic', 'Certification', 'Soil Health', 'Harvesting', 'Financial'];

export default function ExtensionVisits() {
  const [visits, setVisits] = useState<ExtensionVisit[]>(mockVisits);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    farmerId: '', purpose: '', observations: '', adviceType: '',
    recommendedAction: '', followUpDate: '',
  });

  const handleAdd = () => {
    const farmer = mockFarmers.find(f => f.id === form.farmerId);
    if (!farmer) return;
    setVisits([{
      id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0],
      farmerId: form.farmerId, farmerName: farmer.name,
      purpose: form.purpose, observations: form.observations,
      adviceType: form.adviceType, recommendedAction: form.recommendedAction,
      followUpDate: form.followUpDate, followUpOutcome: '', officerId: '1',
    }, ...visits]);
    setOpen(false);
    setForm({ farmerId: '', purpose: '', observations: '', adviceType: '', recommendedAction: '', followUpDate: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Extension Visits</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Log Visit</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Log Extension Visit</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label>Farmer</Label>
                <Select value={form.farmerId} onValueChange={v => setForm(p => ({ ...p, farmerId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select farmer" /></SelectTrigger>
                  <SelectContent>
                    {mockFarmers.map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Input value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Observations</Label>
                <Textarea value={form.observations} onChange={e => setForm(p => ({ ...p, observations: e.target.value }))} rows={2} />
              </div>
              <div className="form-grid">
                <div className="space-y-2">
                  <Label>Advice Type</Label>
                  <Select value={form.adviceType} onValueChange={v => setForm(p => ({ ...p, adviceType: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {adviceTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Follow-up Date</Label>
                  <Input type="date" value={form.followUpDate} onChange={e => setForm(p => ({ ...p, followUpDate: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recommended Action</Label>
                <Textarea value={form.recommendedAction} onChange={e => setForm(p => ({ ...p, recommendedAction: e.target.value }))} rows={2} />
              </div>
              <Button onClick={handleAdd} className="w-full">Save Visit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {visits.map(v => (
          <Card key={v.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{v.farmerName}</span>
                  <Badge variant="default">{v.adviceType}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{v.date}</span>
              </div>
              <p className="text-sm font-medium mb-1">{v.purpose}</p>
              <p className="text-sm text-muted-foreground">{v.observations}</p>
              <p className="text-sm mt-2"><strong>Action:</strong> {v.recommendedAction}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Follow-up: {v.followUpDate}</span>
                {v.followUpOutcome ? (
                  <Badge variant="secondary" className="text-xs">{v.followUpOutcome}</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Pending</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
