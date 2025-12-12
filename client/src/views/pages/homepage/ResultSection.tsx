import React from "react";

export const ResultSection: React.FC = () => {
    // 결과 데이터가 있는지 여부 (나중엔 Props로 받음)
    const hasResult = false;

    if (!hasResult) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-300 min-h-[400px]">
                <div className="text-4xl mb-4">📈</div>
                <p className="text-slate-500 font-medium">
                    아직 백테스팅 결과가 없습니다.
                </p>
                <p className="text-slate-400 text-sm mt-1">
                    왼쪽 패널에서 전략을 생성하고 실행해보세요.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-[400px] relative">
            {/* 차트가 들어갈 자리 */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-4 space-x-2 opacity-50">
                {/* 더미 막대 그래프 효과 */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full bg-blue-200 rounded-t"
                        style={{ height: `${Math.random() * 80 + 10}%` }}
                    />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/80 px-4 py-2 rounded-full text-blue-600 font-bold shadow-sm backdrop-blur-sm">
                    Chart Area (Recharts)
                </span>
            </div>
        </div>
    );
};
