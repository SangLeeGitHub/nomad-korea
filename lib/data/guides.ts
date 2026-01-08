import type { Guide, GuideCategory } from '@/lib/types';

export const guides: Guide[] = [
  // 비자 카테고리
  {
    id: 'guide-1',
    slug: 'korea-digital-nomad-visa',
    category: 'visa',
    title: '한국 디지털노마드 비자 완벽 가이드',
    summary: '2024년 새롭게 도입된 한국 디지털노마드 비자(워케이션 비자)의 신청 자격, 필요 서류, 절차를 상세히 알아봅니다.',
    content: `
## 디지털노마드 비자란?

한국 정부는 2024년부터 디지털노마드를 위한 특별 비자를 도입했습니다. 이 비자를 통해 해외 원격 근무자들이 한국에서 합법적으로 장기 체류하며 일할 수 있게 되었습니다.

## 신청 자격

- 해외 기업 또는 자영업자로서 원격 근무가 가능한 자
- 연간 소득 USD 65,000 이상 증명 가능한 자
- 유효한 건강보험 가입자
- 범죄 경력이 없는 자

## 필요 서류

1. 비자 신청서
2. 여권 사본
3. 증명사진 (3.5cm x 4.5cm)
4. 고용 증명서 또는 사업자 등록증
5. 소득 증명 서류 (최근 1년)
6. 건강보험 증서
7. 범죄경력증명서

## 신청 절차

1. 온라인 예약 시스템에서 방문 예약
2. 관할 대사관/영사관 방문
3. 서류 제출 및 수수료 납부
4. 비자 심사 (약 2-4주 소요)
5. 비자 발급

## 체류 기간

- 최초 발급: 1년
- 연장 가능: 최대 2년까지

## 주의사항

- 한국 내 취업 활동은 금지됩니다
- 해외 클라이언트/고용주와의 원격 근무만 허용됩니다
- 매년 소득 증명 갱신이 필요합니다
    `.trim(),
    thumbnailUrl: '/images/guides/visa.jpg',
    readTime: 8,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'guide-2',
    slug: 'korea-visa-types',
    category: 'visa',
    title: '노마드를 위한 한국 비자 종류 총정리',
    summary: '관광비자, 워킹홀리데이, 취업비자 등 한국 체류를 위한 다양한 비자 옵션을 비교해봅니다.',
    content: `
## 한국 비자 종류

한국에서 체류할 수 있는 다양한 비자 옵션을 알아봅니다.

## 1. 무비자 입국 (B-1/B-2)

- 대상: 대부분의 선진국 국민
- 체류 기간: 30-90일
- 장점: 별도 신청 불필요
- 단점: 취업 활동 불가

## 2. 관광 비자 연장

- 체류 기간: 최대 90일 추가
- 신청 장소: 출입국관리사무소
- 비용: 약 60,000원

## 3. 워킹홀리데이 비자 (H-1)

- 대상: 협정국 18-30세 청년
- 체류 기간: 1년
- 취업 가능 (제한적)

## 4. 디지털노마드 비자

- 최신 도입된 비자
- 원격 근무자 대상
- 1-2년 체류 가능

## 비자 선택 가이드

| 비자 종류 | 체류 기간 | 취업 가능 | 추천 대상 |
|---------|---------|---------|---------|
| 무비자 | 30-90일 | X | 단기 여행자 |
| 워킹홀리데이 | 1년 | O (제한적) | 청년 |
| 디지털노마드 | 1-2년 | X (원격만) | 노마드 |
    `.trim(),
    thumbnailUrl: '/images/guides/visa-types.jpg',
    readTime: 6,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },

  // 숙소 카테고리
  {
    id: 'guide-3',
    slug: 'korea-accommodation-guide',
    category: 'accommodation',
    title: '한국 장기 숙소 가이드: 월세부터 에어비앤비까지',
    summary: '노마드를 위한 한국 숙소 옵션을 비교하고, 지역별 평균 비용과 계약 시 주의사항을 알아봅니다.',
    content: `
## 숙소 유형별 비교

### 1. 에어비앤비 / 단기 렌탈

**장점:**
- 계약 자유도 높음
- 가구/인터넷 완비
- 즉시 입주 가능

**단점:**
- 장기 시 비용 높음
- 청소비 추가

**월 평균 비용:**
- 서울: 150-250만원
- 부산: 80-150만원
- 제주: 100-180만원

### 2. 원룸/오피스텔 월세

**장점:**
- 장기 시 비용 저렴
- 안정적인 주거

**단점:**
- 보증금 필요 (보통 500만원~)
- 최소 6개월 계약
- 외국인 계약 어려움

### 3. 쉐어하우스

**장점:**
- 보증금 적음
- 커뮤니티 형성
- 월세에 관리비 포함

**단점:**
- 개인 공간 제한
- 규칙 준수 필요

## 지역별 추천

### 서울
- 강남/역삼: 스타트업 분위기, 비용 높음
- 홍대/합정: 젊은 분위기, 카페 많음
- 성수: 힙한 분위기, 코워킹 많음

### 제주
- 제주시: 편의시설 좋음
- 서귀포: 자연환경 좋음
- 애월: 카페 거리, 노마드 인기

## 계약 시 체크리스트

- [ ] 인터넷 속도 확인
- [ ] 관리비 포함 항목 확인
- [ ] 계약 기간 및 해지 조건
- [ ] 보증금 반환 조건
- [ ] 냉난방비 별도 여부
    `.trim(),
    thumbnailUrl: '/images/guides/accommodation.jpg',
    readTime: 10,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },

  // 작업공간 카테고리
  {
    id: 'guide-4',
    slug: 'korea-coworking-spaces',
    category: 'workspace',
    title: '한국 코워킹 스페이스 완벽 가이드',
    summary: '서울, 부산, 제주 등 주요 도시의 인기 코워킹 스페이스와 이용 팁을 소개합니다.',
    content: `
## 한국의 코워킹 문화

한국은 아시아에서 가장 발달한 코워킹 인프라를 갖추고 있습니다.

## 주요 코워킹 체인

### 1. 위워크 (WeWork)
- 위치: 서울 전역, 부산
- 특징: 글로벌 스탠다드, 영어 지원
- 가격: 핫데스크 월 35만원~

### 2. 패스트파이브 (FastFive)
- 위치: 서울, 판교, 부산
- 특징: 한국 최대 규모
- 가격: 핫데스크 월 25만원~

### 3. 스파크플러스 (SparkPlus)
- 위치: 서울 주요 지역
- 특징: 프리미엄 시설
- 가격: 핫데스크 월 30만원~

## 카페 작업 가이드

### 작업하기 좋은 카페 특징
- 콘센트 많음
- 와이파이 빠름 (100Mbps+)
- 음료 리필 가능
- 테이블 넓음

### 추천 카페 체인
- 스타벅스 리저브
- 블루보틀
- 투썸플레이스
- 할리스커피

## 무료 작업 공간

- 공공도서관 (신분증 필요)
- 대학교 도서관 (일부 개방)
- 창업지원센터

## 이용 팁

1. 피크 시간(12-14시) 피하기
2. 오전 일찍 자리 확보
3. 노이즈 캔슬링 이어폰 필수
4. 멤버십 활용으로 비용 절감
    `.trim(),
    thumbnailUrl: '/images/guides/coworking.jpg',
    readTime: 7,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: 'guide-5',
    slug: 'best-cafes-for-remote-work',
    category: 'workspace',
    title: '노마드를 위한 서울 베스트 카페 Top 10',
    summary: '와이파이 속도, 콘센트, 분위기를 기준으로 선정한 서울 최고의 작업 카페를 소개합니다.',
    content: `
## 선정 기준

- 와이파이 속도: 100Mbps 이상
- 콘센트: 테이블당 1개 이상
- 좌석: 장시간 작업 가능
- 분위기: 조용하고 집중 가능

## Top 10 카페

### 1. 스타벅스 리저브 더북한산점
- 위치: 은평구
- 와이파이: 200Mbps
- 특징: 뷰 최고, 넓은 공간

### 2. 언더스탠드에비뉴
- 위치: 성수동
- 와이파이: 150Mbps
- 특징: 힙한 분위기, 복합문화공간

### 3. 카페 온도
- 위치: 연남동
- 와이파이: 100Mbps
- 특징: 조용함, 1인 테이블 많음

### 4. 할리스 강남역점
- 위치: 강남역
- 와이파이: 120Mbps
- 특징: 24시간, 넓은 공간

### 5. 폴바셋 삼성점
- 위치: 삼성역
- 와이파이: 150Mbps
- 특징: 퀄리티 좋은 커피

### 6. 어쿠스틱하우스
- 위치: 홍대
- 와이파이: 100Mbps
- 특징: 음악 좋음, 야간 인기

### 7. 커피리브레 삼청점
- 위치: 삼청동
- 와이파이: 80Mbps
- 특징: 스페셜티 커피

### 8. 앤트러사이트
- 위치: 한남동
- 와이파이: 130Mbps
- 특징: 공장 개조, 독특한 분위기

### 9. 센터커피
- 위치: 이태원
- 와이파이: 100Mbps
- 특징: 로스터리, 외국인 많음

### 10. 테라로사 성수점
- 위치: 성수동
- 와이파이: 150Mbps
- 특징: 넓은 공간, 베이커리

## 카페 에티켓

- 최소 음료 1잔/2시간 주문
- 통화는 밖에서
- 피크 시간 자리 양보
    `.trim(),
    thumbnailUrl: '/images/guides/cafes.jpg',
    readTime: 5,
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-13'),
  },

  // 생활팁 카테고리
  {
    id: 'guide-6',
    slug: 'korea-lifestyle-tips',
    category: 'lifestyle',
    title: '한국 생활 필수 팁: 은행, 통신, 교통 총정리',
    summary: '한국에서 노마드 생활을 시작할 때 알아야 할 은행 계좌, 유심, 교통카드 정보를 정리했습니다.',
    content: `
## 1. 은행 계좌 개설

### 외국인 계좌 개설 가능 은행
- 하나은행 (추천)
- 우리은행
- 신한은행
- KB국민은행

### 필요 서류
- 여권
- 외국인등록증 (있는 경우)
- 한국 주소 증명
- 휴대폰 번호

### 계좌 개설 팁
- 영어 가능 지점 방문
- 카카오뱅크/토스뱅크는 외국인 불가

## 2. 통신 (유심/eSIM)

### 단기 (1개월 미만)
- 공항 로밍 유심: 일 3,000원~
- eSIM 서비스: Airalo, Holafly

### 장기 (1개월 이상)
- 선불 유심: KT, SKT, LGU+
- 후불 요금제: 외국인등록증 필요

### 추천 요금제
- 알뜰폰 (MVNO): 월 15,000원~
- 무제한 데이터: 월 40,000원~

## 3. 교통

### 교통카드
- 티머니 (T-money): 편의점 구매
- 카카오페이 교통: 앱 결제
- 애플페이/삼성페이: NFC 결제

### 교통 앱
- 카카오맵: 필수
- 네이버지도: 대안
- 카카오T: 택시 호출

### 교통비 절약 팁
- 환승 30분 내 무료
- 정기권 활용
- 따릉이 (서울 공유자전거)

## 4. 필수 앱

- 카카오톡: 소통 필수
- 네이버: 검색, 지도, 번역
- 배달의민족/요기요: 배달
- 쿠팡: 쇼핑
- 토스: 송금, 결제

## 5. 생활 팁

### 식비 절약
- 편의점 도시락: 4,000원~
- 김밥천국: 5,000원~
- 백반집: 7,000원~

### 인터넷
- 카페 무료 와이파이
- KT 공공 와이파이
- 숙소 인터넷 속도 확인 필수
    `.trim(),
    thumbnailUrl: '/images/guides/lifestyle.jpg',
    readTime: 12,
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-14'),
  },
];

// 카테고리 라벨 매핑
export const categoryLabels: Record<GuideCategory, string> = {
  visa: '비자',
  accommodation: '숙소',
  workspace: '작업공간',
  lifestyle: '생활팁',
};

// 카테고리 색상 매핑
export const categoryColors: Record<GuideCategory, string> = {
  visa: 'bg-blue-100 text-blue-800',
  accommodation: 'bg-green-100 text-green-800',
  workspace: 'bg-purple-100 text-purple-800',
  lifestyle: 'bg-orange-100 text-orange-800',
};

// 헬퍼 함수들
export function getAllGuides(): Guide[] {
  return [...guides].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return getAllGuides().filter((guide) => guide.category === category);
}

export function getRelatedGuides(currentSlug: string, limit: number = 3): Guide[] {
  const currentGuide = getGuideBySlug(currentSlug);
  if (!currentGuide) return [];

  return guides
    .filter((guide) => guide.slug !== currentSlug && guide.category === currentGuide.category)
    .slice(0, limit);
}
