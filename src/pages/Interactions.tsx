import { useState } from 'react';
import { mockInteractions, mockFarmers, interactionTypes } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { Interaction } from '@/types/farmer';

export default function Interactions() {
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ farmerId: '', type: 'farm_visit' as Interaction['type'], notes: '' });

  const handleAdd = () => {
    const farmer = mockFarmers.find(f => f.id === form.farmerId);
    if (!farmer) return;
    setInteractions([{
      id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0],
      farmerId: form.farmerId, farmerName: farmer.name,
      type: form.type, notes: form.notes, officerId: '1',
    }, ...interactions]);
    setOpen(false);
    setForm({ farmerId: '', type: 'farm_visit', notes: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Interactions</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Log Interaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Interaction</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
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
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as Interaction['type'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {interactionTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} />
              </div>
              <Button onClick={handleAdd} className="w-full">Save Interaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {interactions.map(i => (
          <Card key={i.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{i.farmerName}</span>
                  <Badge variant="secondary">{i.type.replace(/_/g, ' ')}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{i.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{i.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
