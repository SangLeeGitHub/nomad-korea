// 도시별 비용 비교 데이터 (막대 차트용)
export const cityCostData = [
  { name: '서울', cost: 280, fill: '#8884d8' },
  { name: '부산', cost: 180, fill: '#82ca9d' },
  { name: '제주', cost: 220, fill: '#ffc658' },
  { name: '대구', cost: 160, fill: '#ff7300' },
  { name: '강릉', cost: 170, fill: '#00C49F' },
  { name: '판교', cost: 250, fill: '#FFBB28' },
  { name: '전주', cost: 140, fill: '#FF8042' },
  { name: '인천', cost: 190, fill: '#0088FE' },
  { name: '속초', cost: 175, fill: '#00C49F' },
  { name: '광주', cost: 150, fill: '#FF8042' },
];

// 인터넷 속도 순위 데이터 (막대 차트용)
export const internetSpeedData = [
  { name: '서울', speed: 1000 },
  { name: '판교', speed: 950 },
  { name: '인천', speed: 800 },
  { name: '부산', speed: 750 },
  { name: '대구', speed: 700 },
  { name: '광주', speed: 650 },
  { name: '제주', speed: 500 },
  { name: '전주', speed: 450 },
  { name: '강릉', speed: 400 },
  { name: '속초', speed: 350 },
];

// 월별 노마드 유입 추이 데이터 (라인 차트용)
export const monthlyTrendData = [
  { month: '1월', visitors: 8500, newUsers: 420 },
  { month: '2월', visitors: 9200, newUsers: 480 },
  { month: '3월', visitors: 11000, newUsers: 620 },
  { month: '4월', visitors: 12500, newUsers: 750 },
  { month: '5월', visitors: 14200, newUsers: 890 },
  { month: '6월', visitors: 13800, newUsers: 820 },
  { month: '7월', visitors: 15500, newUsers: 980 },
  { month: '8월', visitors: 16200, newUsers: 1050 },
  { month: '9월', visitors: 14800, newUsers: 920 },
  { month: '10월', visitors: 13500, newUsers: 850 },
  { month: '11월', visitors: 12000, newUsers: 720 },
  { month: '12월', visitors: 10500, newUsers: 580 },
];

// 인기 도시 Top 5 데이터 (도넛 차트용)
export const popularCitiesData = [
  { name: '서울', value: 35, fill: '#8884d8' },
  { name: '부산', value: 22, fill: '#82ca9d' },
  { name: '제주', value: 20, fill: '#ffc658' },
  { name: '강릉', value: 13, fill: '#ff7300' },
  { name: '기타', value: 10, fill: '#00C49F' },
];

// 활동 지표 데이터
export const activityStats = {
  totalCities: 50,
  activeUsers: 12450,
  reviewCount: 2847,
  meetupCount: 355,
  monthlyMessages: 45200,
  monthlyVisitors: 124000,
  growthRate: 35,
};
