import React, { useState } from "react";
import { Button } from "../../../components/common/Button";
import { CollapsibleCard } from "../../../components/common/CollapsibleCard"; // 추가

export const PeriodSection: React.FC = () => {
    // isOpen 상태 제거 (CollapsibleCard가 알아서 함)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handlePreset = (months: number) => {
        // ... (기존 로직 동일)
        const end = new Date();
        const start = new Date();
        start.setMonth(end.getMonth() - months);
        setEndDate(end.toISOString().split("T")[0]);
        setStartDate(start.toISOString().split("T")[0]);
    };

    return (
        <CollapsibleCard title="1. Period (기간)">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-slate-300 rounded px-3 py-2 w-full text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <span className="text-slate-400">~</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-slate-300 rounded px-3 py-2 w-full text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {[1, 3, 6, 12, 36].map((m) => (
                        <Button
                            key={m}
                            variant="secondary"
                            className="text-xs py-1.5"
                            onClick={() => handlePreset(m)}
                        >
                            {m >= 12 ? `${m / 12}년` : `${m}개월`}
                        </Button>
                    ))}
                </div>
            </div>
        </CollapsibleCard>
    );
};
