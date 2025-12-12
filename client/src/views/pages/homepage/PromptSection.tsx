import React, { useState } from "react";
import { Card } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";

export const PromptSection: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
        if (!prompt.trim()) return;

        setIsLoading(true);

        // TODO: 나중에 실제 AI API (n8n or Python Server) 연결할 곳
        setTimeout(() => {
            setIsLoading(false);
            alert(
                `[Mock] 전략 생성 요청: "${prompt}"\n\n잠시 후 파라미터가 자동으로 채워집니다!`
            );
        }, 1500);
    };

    return (
        <Card className="h-full flex flex-col p-0 overflow-hidden border-blue-200 shadow-md">
            {/* 헤더: 다른 섹션들과 디자인 통일 (배경색 등) */}
            <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3 className="font-bold text-blue-800">
                    AI Strategy Prompt (핵심 기능)
                </h3>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="p-4 flex-1 flex flex-col gap-4">
                <div className="flex-1 bg-white">
                    <textarea
                        className="w-full h-full min-h-[120px] p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-700 leading-relaxed placeholder-slate-400 bg-slate-50 focus:bg-white transition-colors"
                        placeholder="원하는 투자 전략을 자유롭게 설명해주세요.&#13;&#10;예시:&#13;&#10;- 골든크로스 발생 시 매수하고 5% 수익 나면 팔아줘.&#13;&#10;- RSI가 30 이하일 때 분할 매수하는 전략 만들어줘."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-medium">
                        * 구체적으로 적을수록 정확도가 올라갑니다.
                    </span>
                    <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="px-6"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                {/* 로딩 스피너 (SVG) */}
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Analyzing...
                            </span>
                        ) : (
                            "Generate Strategy ✨"
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
