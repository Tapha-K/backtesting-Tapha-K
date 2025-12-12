import React from "react";

export const ArchivePage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                    📂 저장된 전략
                </h2>
            </div>

            {/* 데이터가 없을 때의 Empty State */}
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-lg text-gray-500 mb-2">
                    아직 저장된 전략이 없습니다.
                </p>
                <p className="text-sm text-gray-400">
                    Workspace에서 멋진 전략을 만들어보세요!
                </p>
            </div>
        </div>
    );
};
