import React, { useState } from "react";
import { CollapsibleCard } from "../../../components/CollapsibleCard";
import { Button } from "../../../components/Button";
import { type Parameter } from "../../../commons/types";
import { ParameterLibraryModal } from "./ParameterLibraryModal";

interface Props {
    data: Parameter[];
    onChange: (data: Parameter[]) => void;
}

export const ParameterSection: React.FC<Props> = ({ data, onChange }) => {
    const [isLibraryOpen, setIsLibraryOpen] = useState(false); // 모달 상태

    const handleValueChange = (id: string, newValue: string) => {
        onChange(
            data.map((p) => (p.id === id ? { ...p, value: newValue } : p))
        );
    };

    const handleDelete = (id: string) => {
        onChange(data.filter((p) => p.id !== id));
    };

    // ✅ 라이브러리에서 선택 시 실행됨
    const handleAddFromLibrary = (newParam: Parameter) => {
        onChange([...data, newParam]);
    };

    const getCategoryColor = (category: string) => {
        /* (기존 색상 로직 유지) */
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
        <>
            <CollapsibleCard title="3. Parameters (전략 변수)">
                <div className="flex flex-col gap-4">
                    {data.length === 0 ? (
                        <div
                            onClick={() => setIsLibraryOpen(true)} // 클릭 시 모달 오픈
                            className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300 cursor-pointer hover:bg-slate-100 hover:border-blue-300 transition-all group"
                        >
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                📚
                            </div>
                            <p className="text-sm font-bold text-slate-600">
                                파라미터가 없습니다.
                            </p>
                            <p className="text-xs mt-1 text-blue-500">
                                클릭해서 라이브러리 열기
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[300px] overflow-y-auto pr-2 flex flex-col gap-3 custom-scrollbar">
                            {data.map((param) => (
                                <div
                                    key={param.id}
                                    className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-200 transition-colors"
                                >
                                    {/* ... (기존 개별 아이템 렌더링 코드 유지) ... */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getCategoryColor(
                                                    param.category
                                                )}`}
                                            >
                                                {param.category}
                                            </span>
                                            <span className="text-xs font-bold text-slate-700 w-32 truncate">
                                                {param.label}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleDelete(param.id)
                                            }
                                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2 font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 mt-1">
                                        <span className="text-[10px] text-slate-400 truncate flex-1">
                                            {param.description || "설명 없음"}
                                        </span>
                                        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-2 py-1 w-24 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm">
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
                                                <span className="text-xs text-slate-400 shrink-0 select-none">
                                                    {param.unit}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 하단 버튼: 라이브러리 열기 */}
                    <div className="flex justify-end pt-2 border-t border-slate-100">
                        <Button
                            variant="secondary"
                            className="text-xs py-1.5 px-3 flex items-center gap-1"
                            onClick={() => setIsLibraryOpen(true)}
                        >
                            <span>📚</span> 라이브러리에서 추가
                        </Button>
                    </div>
                </div>
            </CollapsibleCard>

            {/* ✅ 모달 컴포넌트 */}
            <ParameterLibraryModal
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onAdd={handleAddFromLibrary}
            />
        </>
    );
};
