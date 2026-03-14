import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockFarmers } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import type { Farmer } from '@/types/farmer';

const loyaltyColors: Record<string, string> = {
  platinum: 'bg-primary/10 text-primary',
  gold: 'bg-accent/20 text-accent-foreground',
  silver: 'bg-muted text-muted-foreground',
  bronze: 'bg-muted text-muted-foreground',
};

export default function Farmers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [farmers] = useState<Farmer[]>(mockFarmers);

  const filtered = farmers.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.farmerId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || f.supplyStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Farmers</h1>
        <Link to="/farmers/new">
          <Button><Plus className="mr-2 h-4 w-4" />Add Farmer</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="seasonal">Seasonal</SelectItem>
              <SelectItem value="declining">Declining</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Farmer ID</th><th>Name</th><th>Route</th><th>Tea (ha)</th>
                <th>Monthly Avg</th><th>GAP</th><th>Status</th><th>Tier</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="cursor-pointer" onClick={() => {}}>
                  <td className="font-mono text-xs">{f.farmerId}</td>
                  <td className="font-medium">
                    <Link to={`/farmers/${f.id}`} className="hover:text-primary">{f.name}</Link>
                  </td>
                  <td className="text-muted-foreground">{f.route}</td>
                  <td>{f.teaHectarage}</td>
                  <td>{f.avgMonthlySupply} kg</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${f.gapScore}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{f.gapScore}%</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={f.supplyStatus === 'active' ? 'default' : f.supplyStatus === 'declining' ? 'destructive' : 'secondary'}>
                      {f.supplyStatus}
                    </Badge>
                  </td>
                  <td>
                    <span className={`status-badge capitalize ${loyaltyColors[f.loyaltyTier]}`}>{f.loyaltyTier}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
