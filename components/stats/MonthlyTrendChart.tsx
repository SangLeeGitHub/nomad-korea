'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { monthlyTrendData } from '@/lib/data/stats';

export function MonthlyTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📈</span>
          월별 방문자 및 신규 가입 추이
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrendData}>
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => [
                name === 'visitors' ? `${Number(value).toLocaleString()}명` : `${value}명`,
                name === 'visitors' ? '방문자' : '신규 가입',
              ]}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Legend
              formatter={(value) => (value === 'visitors' ? '방문자' : '신규 가입')}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="visitors"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="newUsers"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          * 2024년 월별 통계
        </p>
      </CardContent>
    </Card>
  );
}
