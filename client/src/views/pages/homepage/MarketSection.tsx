import React, { useState } from "react";
import { CollapsibleCard } from "../../../components/common/CollapsibleCard"; // 추가

export const MarketSection: React.FC = () => {
    // isOpen 상태 제거
    const [selectedMarket, setSelectedMarket] = useState("KOSPI");
    const [sectors, setSectors] = useState<string[]>(["반도체", "2차전지"]);

    const markets = ["KOSPI", "KOSDAQ", "NASDAQ", "Crypto"];

    return (
        <CollapsibleCard title="2. Market & Sector">
            <div className="flex flex-col gap-4">
                {/* 시장 선택 */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                    {markets.map((m) => (
                        <button
                            key={m}
                            onClick={() => setSelectedMarket(m)}
                            className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${
                                // font-medium -> font-bold로 변경
                                selectedMarket === m
                                    ? "bg-white text-blue-700 shadow-sm" // 텍스트 색상을 blue-600 -> 700으로 진하게
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/50" // 기본 텍스트를 slate-500 -> 600으로 진하게
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {/* 섹터 태그 */}
                <div>
                    <label className="text-xs font-bold text-slate-500 mb-2 block">
                        Target Sectors
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {sectors.map((sector) => (
                            <span
                                key={sector}
                                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full border border-blue-100 flex items-center gap-1"
                            >
                                {sector}
                                <button className="hover:text-blue-800">
                                    ×
                                </button>
                            </span>
                        ))}
                        <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-400 text-sm rounded-full hover:border-blue-300 hover:text-blue-500">
                            + Add
                        </button>
                    </div>
                </div>
            </div>
        </CollapsibleCard>
    );
};
