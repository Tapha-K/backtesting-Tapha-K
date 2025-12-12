import React, { useState } from "react";
import { CollapsibleCard } from "../../../components/common/CollapsibleCard";
import { Button } from "../../../components/common/Button";

interface Parameter {
    id: string;
    category: "Trend" | "Oscillator" | "Volatility" | "Volume" | "Risk"; // 카테고리 추가
    label: string;
    value: string | number;
    unit?: string;
    description?: string; // 설명 추가
}

export const ParameterSection: React.FC = () => {
    // 실전에서 자주 쓰는 보조지표들을 미리 세팅
    const [parameters, setParameters] = useState<Parameter[]>([
        // 1. 추세 지표 (Trend)
        {
            id: "ma_short",
            category: "Trend",
            label: "단기 이동평균(MA)",
            value: 5,
            unit: "일",
            description: "골든크로스 진입용",
        },
        {
            id: "ma_long",
            category: "Trend",
            label: "장기 이동평균(MA)",
            value: 20,
            unit: "일",
            description: "추세 판단용",
        },

        // 2. 오실레이터 (Oscillator) - 과매수/과매도
        {
            id: "rsi_period",
            category: "Oscillator",
            label: "RSI 기간",
            value: 14,
            unit: "일",
            description: "상대강도지수 계산 기간",
        },
        {
            id: "rsi_buy",
            category: "Oscillator",
            label: "RSI 매수 기준",
            value: 30,
            unit: "이하",
            description: "과매도 구간 진입 시",
        },
        {
            id: "rsi_sell",
            category: "Oscillator",
            label: "RSI 매도 기준",
            value: 70,
            unit: "이상",
            description: "과매수 구간 진입 시",
        },

        // 3. 변동성 (Volatility) - 볼린저 밴드
        {
            id: "bb_period",
            category: "Volatility",
            label: "볼린저밴드 기간",
            value: 20,
            unit: "일",
            description: "중심선 기준",
        },
        {
            id: "bb_std",
            category: "Volatility",
            label: "표준편차 승수",
            value: 2,
            unit: "배",
            description: "상단/하단 밴드 폭",
        },

        // 4. 리스크 관리 (Risk Management) - 가장 중요!
        {
            id: "take_profit",
            category: "Risk",
            label: "익절(Take Profit)",
            value: 5,
            unit: "%",
            description: "목표 수익률 달성 시 매도",
        },
        {
            id: "stop_loss",
            category: "Risk",
            label: "손절(Stop Loss)",
            value: 3,
            unit: "%",
            description: "최대 허용 손실률",
        },
    ]);

    const handleValueChange = (id: string, newValue: string) => {
        setParameters((prev) =>
            prev.map((p) => (p.id === id ? { ...p, value: newValue } : p))
        );
    };

    const handleDelete = (id: string) => {
        setParameters((prev) => prev.filter((p) => p.id !== id));
    };

    const handleAdd = () => {
        const newId = Date.now().toString();
        setParameters([
            ...parameters,
            {
                id: newId,
                category: "Trend",
                label: "새 조건",
                value: 0,
            },
        ]);
    };

    // 카테고리별로 색상을 다르게 보여주기 위한 헬퍼 함수
    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Trend":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "Oscillator":
                return "bg-purple-100 text-purple-700 border-purple-200";
            case "Volatility":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "Risk":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <CollapsibleCard title="3. Parameters (전략 변수)">
            <div className="flex flex-col gap-4">
                {/* 스크롤 가능한 영역으로 설정 (항목이 많아졌으므로) */}
                <div className="max-h-[300px] overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
                    {parameters.map((param) => (
                        <div
                            key={param.id}
                            className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-200 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    {/* 카테고리 뱃지 */}
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getCategoryColor(
                                            param.category
                                        )}`}
                                    >
                                        {param.category}
                                    </span>
                                    {/* 라벨 수정 가능 */}
                                    <input
                                        type="text"
                                        value={param.label}
                                        className="text-xs font-bold text-slate-700 bg-transparent border-b border-transparent focus:border-blue-400 outline-none w-32"
                                        readOnly
                                    />
                                </div>

                                {/* 삭제 버튼 */}
                                <button
                                    onClick={() => handleDelete(param.id)}
                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-4 mt-1">
                                {/* 설명 텍스트 (작게) */}
                                <span className="text-[10px] text-slate-400 truncate flex-1">
                                    {param.description || "추가 설명 없음"}
                                </span>

                                {/* 값 입력창 */}
                                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-2 py-1 w-24 focus-within:ring-1 focus-within:ring-blue-500">
                                    <input
                                        type="text"
                                        value={param.value}
                                        onChange={(e) =>
                                            handleValueChange(
                                                param.id,
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-right text-sm font-bold text-slate-800 outline-none bg-transparent"
                                    />
                                    {param.unit && (
                                        <span className="text-xs text-slate-400 shrink-0">
                                            {param.unit}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 하단 컨트롤 */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                    <Button
                        variant="secondary"
                        className="text-xs py-1.5 px-3"
                        onClick={handleAdd}
                    >
                        + 파라미터 추가
                    </Button>
                </div>
            </div>
        </CollapsibleCard>
    );
};
