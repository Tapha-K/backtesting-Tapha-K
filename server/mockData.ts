// server/data/mockData.ts

export interface MockScenario {
    id: string;
    keywords: string[]; // 이 키워드가 프롬프트에 있으면 이 전략 선택
    config: {
        period: { startDate: string; endDate: string };
        market: { type: string; sectors: string[] };
        parameters: any[];
    };
    result: {
        stats: { totalReturn: number; winRate: number; mdd: number };
        chartData: { date: string; value: number }[];
    };
    analysis: string; // AI 분석 텍스트
}

export const MOCK_DATA: MockScenario[] = [
    // 1. 골든크로스 (추세 추종)
    {
        id: "golden_cross",
        keywords: ["골든", "크로스", "이평선", "이동평균"],
        config: {
            period: { startDate: "2023-01-01", endDate: "2023-12-31" },
            market: { type: "KOSPI", sectors: ["반도체", "자동차"] },
            parameters: [
                {
                    id: "ma_short",
                    category: "Trend",
                    label: "단기 이동평균",
                    value: 5,
                    unit: "일",
                    description: "골든크로스 진입용",
                },
                {
                    id: "ma_long",
                    category: "Trend",
                    label: "장기 이동평균",
                    value: 20,
                    unit: "일",
                    description: "추세 판단용",
                },
                {
                    id: "stop_loss",
                    category: "Risk",
                    label: "손절",
                    value: 3,
                    unit: "%",
                    description: "리스크 관리",
                },
            ],
        },
        result: {
            stats: { totalReturn: 15.4, winRate: 65.2, mdd: -12.5 },
            chartData: [
                { date: "2023-01", value: 100 },
                { date: "2023-02", value: 102 },
                { date: "2023-03", value: 98 },
                { date: "2023-04", value: 105 },
                { date: "2023-05", value: 108 },
                { date: "2023-06", value: 115 },
                { date: "2023-07", value: 112 },
                { date: "2023-08", value: 120 },
                { date: "2023-09", value: 125 },
                { date: "2023-10", value: 115 },
            ],
        },
        analysis: `🤖 **AI 전략 분석 리포트 (골든크로스)**\n\n이 전략은 전형적인 **추세 추종 전략**으로, 상승장에서 안정적인 수익을 보여주었습니다.\n특히 5월~8월 상승 구간에서 5일선이 20일선을 지지하며 수익을 극대화했습니다.\n\n⚠️ **주의**: 횡보장에서는 잦은 매매 신호로 수수료 손실이 발생할 수 있습니다.`,
    },

    // 2. RSI 역추세 (과매도 매수)
    {
        id: "rsi_reversal",
        keywords: ["RSI", "역추세", "과매도"],
        config: {
            period: { startDate: "2023-06-01", endDate: "2023-12-31" },
            market: { type: "NASDAQ", sectors: ["Tech", "Bio"] },
            parameters: [
                {
                    id: "rsi_period",
                    category: "Oscillator",
                    label: "RSI 기간",
                    value: 14,
                    unit: "일",
                    description: "RSI 계산 기준",
                },
                {
                    id: "rsi_buy",
                    category: "Oscillator",
                    label: "매수 기준",
                    value: 30,
                    unit: "이하",
                    description: "과매도 구간 진입",
                },
                {
                    id: "rsi_sell",
                    category: "Oscillator",
                    label: "매도 기준",
                    value: 70,
                    unit: "이상",
                    description: "과매수 구간 청산",
                },
            ],
        },
        result: {
            stats: { totalReturn: 8.2, winRate: 78.5, mdd: -5.4 },
            chartData: [
                { date: "2023-06", value: 100 },
                { date: "2023-07", value: 101 },
                { date: "2023-08", value: 99 },
                { date: "2023-09", value: 103 },
                { date: "2023-10", value: 104 },
                { date: "2023-11", value: 102 },
                { date: "2023-12", value: 108 },
            ],
        },
        analysis: `🤖 **AI 전략 분석 리포트 (RSI 역추세)**\n\n높은 승률(78.5%)이 돋보이는 **안정 지향적 전략**입니다.\n나스닥 기술주의 단기 낙폭 과대 구간을 정확히 포착하여 반등 수익을 챙겼습니다.\n\n💡 **Tip**: 추세가 강한 하락장에서는 물타기가 될 수 있으니 손절 라인을 꼭 설정하세요.`,
    },

    // 3. 볼린저 밴드 (변동성)
    {
        id: "bollinger",
        keywords: ["볼린저", "밴드", "표준편차"],
        config: {
            period: { startDate: "2022-01-01", endDate: "2023-12-31" },
            market: { type: "Crypto", sectors: ["Bitcoin", "Altcoin"] },
            parameters: [
                {
                    id: "bb_period",
                    category: "Volatility",
                    label: "기간",
                    value: 20,
                    unit: "일",
                    description: "중심선 기준",
                },
                {
                    id: "bb_std",
                    category: "Volatility",
                    label: "승수",
                    value: 2,
                    unit: "배",
                    description: "상단/하단 밴드 폭",
                },
            ],
        },
        result: {
            stats: { totalReturn: 45.3, winRate: 42.1, mdd: -25.8 },
            chartData: [
                { date: "22-01", value: 100 },
                { date: "22-06", value: 80 },
                { date: "22-12", value: 70 },
                { date: "23-03", value: 90 },
                { date: "23-06", value: 110 },
                { date: "23-09", value: 100 },
                { date: "23-12", value: 145 },
            ],
        },
        analysis: `🤖 **AI 전략 분석 리포트 (볼린저 밴드)**\n\n코인 시장 특유의 **높은 변동성**을 이용하여 큰 수익(45%)을 냈지만, MDD(-25%) 또한 매우 높습니다.\n밴드 상단을 돌파할 때 강한 매수세가 붙는 것을 활용했습니다.\n\n⚠️ **주의**: 멘탈 관리가 필수적인 하이리스크 하이리턴 전략입니다.`,
    },

    // 4. MACD (모멘텀)
    {
        id: "macd",
        keywords: ["MACD", "맥디", "신호"],
        config: {
            period: { startDate: "2023-01-01", endDate: "2023-12-31" },
            market: { type: "KOSDAQ", sectors: ["2차전지", "로봇"] },
            parameters: [
                {
                    id: "macd_fast",
                    category: "Trend",
                    label: "Fast",
                    value: 12,
                    unit: "일",
                    description: "단기 지수이평",
                },
                {
                    id: "macd_slow",
                    category: "Trend",
                    label: "Slow",
                    value: 26,
                    unit: "일",
                    description: "장기 지수이평",
                },
                {
                    id: "macd_signal",
                    category: "Trend",
                    label: "Signal",
                    value: 9,
                    unit: "일",
                    description: "시그널 기간",
                },
            ],
        },
        result: {
            stats: { totalReturn: 22.1, winRate: 55.0, mdd: -15.2 },
            chartData: [
                { date: "23-01", value: 100 },
                { date: "23-03", value: 110 },
                { date: "23-05", value: 105 },
                { date: "23-07", value: 130 },
                { date: "23-09", value: 120 },
                { date: "23-11", value: 125 },
            ],
        },
        analysis: `🤖 **AI 전략 분석 리포트 (MACD)**\n\n추세의 전환점을 파악하는 데 유용한 전략입니다.\nKOSDAQ의 2차전지 섹터 상승 초입을 잘 포착했으나, 횡보 구간에서는 거짓 신호(Whipsaw)가 발생했습니다.`,
    },

    // 5. 변동성 돌파 (단기 트레이딩)
    {
        id: "volatility_breakout",
        keywords: ["변동성", "돌파", "래리", "윌리엄스"],
        config: {
            period: { startDate: "2023-10-01", endDate: "2023-12-31" },
            market: { type: "KOSPI", sectors: ["전체"] },
            parameters: [
                {
                    id: "k_value",
                    category: "Volatility",
                    label: "K값",
                    value: 0.5,
                    unit: "배",
                    description: "변동폭 계수",
                },
                {
                    id: "target_vol",
                    category: "Risk",
                    label: "타겟 변동성",
                    value: 2,
                    unit: "%",
                    description: "자금 관리",
                },
            ],
        },
        result: {
            stats: { totalReturn: 5.4, winRate: 51.0, mdd: -3.2 },
            chartData: [
                { date: "10-01", value: 100 },
                { date: "10-15", value: 101 },
                { date: "10-30", value: 103 },
                { date: "11-15", value: 102 },
                { date: "11-30", value: 104 },
                { date: "12-15", value: 105 },
            ],
        },
        analysis: `🤖 **AI 전략 분석 리포트 (변동성 돌파)**\n\n짧은 기간 동안 안정적인 우상향을 보여주는 **단기 트레이딩 전략**입니다.\nMDD가 -3.2%로 매우 낮아 방어력이 뛰어납니다.\n큰 수익보다는 꾸준한 현금 흐름을 만드는 데 적합합니다.`,
    },
];
