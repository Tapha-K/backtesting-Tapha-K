import React from "react";

export const MainPage: React.FC = () => {
    return (
        <div className="h-full flex gap-8">
            {/* 왼쪽: 설정 패널 (고정 너비 400px or 1/3) */}
            <div className="w-[420px] flex flex-col gap-6 overflow-y-auto pr-2">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">
                        ⚙️ Strategy Settings
                    </h2>
                    {/* 여기에 Period, Market, Sector 등 컴포넌트 배치 */}
                    <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-slate-400 mb-4">
                        (Period UI)
                    </div>
                    <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                        (Market/Sector UI)
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">
                        🤖 AI Prompt
                    </h2>
                    {/* Prompt UI */}
                    <div className="h-40 bg-blue-50 border border-blue-100 rounded flex items-center justify-center text-blue-400">
                        (Prompt Input UI)
                    </div>
                </div>
            </div>

            {/* 오른쪽: 결과 대시보드 (나머지 영역 꽉 채우기) */}
            <div className="flex-1 flex flex-col gap-6">
                {/* 상단 통계 카드들 */}
                <div className="grid grid-cols-3 gap-6">
                    {["Total Return", "Win Rate", "MDD"].map((stat) => (
                        <div
                            key={stat}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-sm font-medium text-slate-500 uppercase">
                                {stat}
                            </h3>
                            <p className="text-3xl font-bold text-slate-800 mt-2">
                                -
                            </p>
                        </div>
                    ))}
                </div>

                {/* 메인 차트 영역 */}
                <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">
                        📊 Backtest Results
                    </h2>
                    <div className="flex-1 bg-slate-50 rounded flex items-center justify-center text-slate-400">
                        (Chart Area)
                    </div>
                </div>
            </div>
        </div>
    );
};
