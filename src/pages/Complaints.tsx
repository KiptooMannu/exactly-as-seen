import { useState } from 'react';
import { mockComplaints, mockFarmers, complaintTypes } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { Complaint } from '@/types/farmer';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ farmerId: '', issueType: 'payment_delay' as Complaint['issueType'], description: '' });

  const handleAdd = () => {
    const farmer = mockFarmers.find(f => f.id === form.farmerId);
    if (!farmer) return;
    setComplaints([{
      id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0],
      farmerId: form.farmerId, farmerName: farmer.name,
      issueType: form.issueType, description: form.description,
      status: 'open', resolution: '',
    }, ...complaints]);
    setOpen(false);
    setForm({ farmerId: '', issueType: 'payment_delay', description: '' });
  };

  const updateStatus = (id: string, status: Complaint['status']) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Complaints</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Log Complaint</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Log Complaint</DialogTitle></DialogHeader>
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
                <Label>Issue Type</Label>
                <Select value={form.issueType} onValueChange={v => setForm(p => ({ ...p, issueType: v as Complaint['issueType'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {complaintTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
              </div>
              <Button onClick={handleAdd} className="w-full">Submit Complaint</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {complaints.map(c => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{c.farmerName}</span>
                  <Badge variant="secondary">{c.issueType.replace(/_/g, ' ')}</Badge>
                </div>
                <span className={`status-badge ${c.status === 'open' ? 'status-open' : c.status === 'in_progress' ? 'status-progress' : 'status-resolved'}`}>
                  {c.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
              {c.resolution && <p className="text-xs text-primary mb-2">✓ {c.resolution}</p>}
              {c.status !== 'resolved' && (
                <div className="flex gap-2">
                  {c.status === 'open' && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, 'in_progress')}>Mark In Progress</Button>
                  )}
                  <Button size="sm" onClick={() => updateStatus(c.id, 'resolved')}>Resolve</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
