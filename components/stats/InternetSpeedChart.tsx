'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { internetSpeedData } from '@/lib/data/stats';

export function InternetSpeedChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📶</span>
          도시별 인터넷 속도 순위
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={internetSpeedData} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tickFormatter={(value) => `${value}Mbps`} />
            <YAxis type="category" dataKey="name" width={50} />
            <Tooltip
              formatter={(value) => [`${value}Mbps`, '평균 속도']}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Bar dataKey="speed" fill="#82ca9d" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          * 주요 카페/코워킹 스페이스 평균 속도
        </p>
      </CardContent>
    </Card>
  );
}
