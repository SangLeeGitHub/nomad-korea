'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cityCostData } from '@/lib/data/stats';

export function CostComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💰</span>
          도시별 월 생활비 비교
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cityCostData} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tickFormatter={(value) => `${value}만원`} />
            <YAxis type="category" dataKey="name" width={50} />
            <Tooltip
              formatter={(value) => [`${value}만원`, '월 생활비']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
              {cityCostData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          * 1인 기준 숙소, 식비, 교통비 포함
        </p>
      </CardContent>
    </Card>
  );
}
