import React from "react";
import { PeriodSection } from "./PeriodSection";
import { MarketSection } from "./MarketSection";
import { ParameterSection } from "./ParameterSection";
import { PromptSection } from "./PromptSection";
import { ResultSection } from "./ResultSection";

export const MainPage: React.FC = () => {
    return (
        <div className="h-full flex gap-8">
            {/* 🟢 왼쪽: 설정 패널 (고정 너비 420px) */}
            {/* overflow-y-auto를 줘서 화면이 작아도 스크롤 가능하게 함 */}

            {/* 왼쪽 패널 */}
            <div className="w-[420px] flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
                {/* 상단 설정 그룹 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-2">
                        <span className="text-xl">⚙️</span>
                        <h2 className="text-xl font-bold text-slate-800">
                            Settings
                        </h2>
                    </div>

                    <PeriodSection />
                    <MarketSection />

                    {/* 👇 여기에 추가했습니다! */}
                    <ParameterSection />
                </div>

                {/* AI 프롬프트 입력 그룹 */}
                <div className="flex-1 min-h-[300px]">
                    <PromptSection />
                </div>
            </div>

            {/* 🔵 오른쪽: 결과 대시보드 (나머지 영역 채움) */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
                {/* 상단 통계 카드들 (요약 정보) */}
                <div className="grid grid-cols-3 gap-6">
                    {["Total Return", "Win Rate", "MDD"].map((stat) => (
                        <div
                            key={stat}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-32 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                                {stat}
                            </h3>
                            <p className="text-3xl font-extrabold text-slate-800">
                                - %
                            </p>
                        </div>
                    ))}
                </div>

                {/* 메인 결과 차트 및 상세 */}
                <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            <h2 className="text-xl font-bold text-slate-800">
                                Backtest Results
                            </h2>
                        </div>
                        <span className="text-sm text-slate-400">
                            Result updates automatically
                        </span>
                    </div>

                    {/* 결과 섹션 (차트 들어갈 자리) */}
                    <ResultSection />
                </div>
            </div>
        </div>
    );
};
