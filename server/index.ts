// server/index.ts

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ANALYSIS_SYSTEM_PROMPT, generateAnalysisPrompt } from "./data/prompts";
import { MOCK_DATA } from "./data/mockData";

dotenv.config();

const app = express();
const PORT = 3000;

// Gemini 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.use(cors());
app.use(express.json());

// 0. 전략 저장소 (기존 유지)
let savedStrategies: any[] = [];

// ---------------------------------------------------------

// ✅ 1. AI 파라미터 파싱 API (스마트 매칭 적용)
app.post("/api/ai/parse", (req, res) => {
    const { prompt } = req.body;
    console.log(`[Server] AI 요청 받음: "${prompt}"`);

    // 1) 프롬프트에 키워드가 포함된 시나리오 찾기
    const matchedScenario = MOCK_DATA.find((scenario) =>
        scenario.keywords.some((keyword) => prompt.includes(keyword))
    );

    // 2) 매칭된 게 없으면 기본값(골든크로스) 반환
    const responseData = matchedScenario
        ? matchedScenario.config
        : MOCK_DATA[0].config;

    setTimeout(() => {
        res.json(responseData);
    }, 1000); // 반응 속도 좀 빠르게 1초로 단축
});

// ✅ 2. 백테스팅 실행 API (파라미터 기반 매칭)
app.post("/api/backtest/run", (req, res) => {
    const config = req.body; // 프론트에서 보낸 설정값

    // 설정값 안에 있는 파라미터 ID를 보고 어떤 전략인지 역추적
    // (실제로는 계산하겠지만, Mock에서는 이렇게 매칭합니다)
    const paramIds = config.parameters.map((p: any) => p.id);

    const matchedScenario = MOCK_DATA.find((scenario) =>
        // 시나리오의 파라미터 ID 중 하나라도 포함되어 있으면 해당 결과 반환
        scenario.config.parameters.some((p: any) => paramIds.includes(p.id))
    );

    const resultData = matchedScenario
        ? matchedScenario.result
        : MOCK_DATA[0].result;

    console.log(
        `[Server] 백테스팅 실행 (매칭된 전략: ${
            matchedScenario?.id || "default"
        })`
    );

    setTimeout(() => {
        res.json(resultData);
    }, 1500);
});

// ✅ 3. AI 분석 API (New! 프론트 모달에서 호출용)
app.post("/api/ai/analyze", async (req, res) => {
    try {
        // 클라이언트가 전략 설정(config)과 결과(result)를 모두 보내줘야 함
        const { config, result } = req.body;

        console.log(
            `[Server] Gemini 분석 요청 시작... (${config.period.startDate} ~ ${config.period.endDate})`
        );

        // 1. 시스템 프롬프트 + 사용자 데이터 결합
        const userPrompt = generateAnalysisPrompt(config, result);
        const finalPrompt = `${ANALYSIS_SYSTEM_PROMPT}\n\n${userPrompt}`;

        // 2. Gemini 호출
        const aiResult = await model.generateContent(finalPrompt);
        const response = await aiResult.response;
        const text = response.text();

        console.log(`[Server] 분석 완료!`);

        // 3. 결과 반환
        res.json({ analysis: text });
    } catch (error) {
        console.error("Gemini API Error:", error);

        // 에러 발생 시 Fallback (기존 Mock 데이터 활용)
        console.log("[Server] API 호출 실패로 Mock 데이터 반환");
        res.json({
            analysis:
                "⚠️ **AI 분석 서버 연결 지연**\n\n현재 사용량이 많아 실시간 분석이 어렵습니다. 잠시 후 다시 시도해주세요.\n(API Key 설정을 확인해주세요.)",
        });
    }
});

// 전략 저장
app.post("/api/strategies", (req, res) => {
    const { name, description, config, result } = req.body;
    const newStrategy = {
        id: Date.now().toString(),
        name,
        description,
        config,
        result,
        createdAt: new Date().toISOString(),
    };
    savedStrategies.push(newStrategy);
    res.json({ success: true, strategy: newStrategy });
});

// 전략 목록 조회
app.get("/api/strategies", (req, res) => {
    res.json(savedStrategies);
});

// 전략 삭제
app.delete("/api/strategies/:id", (req, res) => {
    const { id } = req.params;
    savedStrategies = savedStrategies.filter((s) => s.id !== id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
