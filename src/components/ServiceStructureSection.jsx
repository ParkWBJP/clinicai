import React, { useEffect, useRef, useState } from 'react';
import {
    CheckCircle2,
    Code,
    Cpu,
    FileCheck,
    FileText,
    Globe,
    LayoutGrid,
    MessageCircleQuestion,
    Search,
} from 'lucide-react';

const blocks = [
    {
        title: '전략/설계',
        text: 'AI 검색(질문) 환경에서우리 병원이 어떤 기준으로 이해되고, 어떤 상황에서 추천되는지부터 진단합니다.',
        orientation: 'left',
    },
    {
        title: '구현/운영',
        text: 'AI가 읽기 쉬운 구조로 핵심 정보와 페이지를 정리합니다. 필요 시 다국어 확장까지 고려해 AI 답변에 유리한 형태로 운영합니다.',
        orientation: 'right',
        visual: 'pipeline',
    },
    {
        title: '모니터링/인사이트',
        content: (
            <>
                <p>AI 검색(질문) 환경에서 우리 병원이 어떤 질문에, 어떤 형태로 언급·노출되는지를 지속 추적합니다.</p>
                <p>
                    Clinic.ai는<br />
                    GPT·Perplexity·Google AI 등에서의 병원 언급/노출 현황을 모니터링하고,<br />
                    경쟁 병원의 AIO 수준을 <strong>비교·분석(벤치마크)</strong>합니다.<br />
                    또한 핵심 지표와 개선사항을 주 1회 이상 리포트로 제공하며,<br />
                    AIO 점수·콘텐츠·노출 추이를 대시보드에서 한눈에 확인할 수 있게 운영합니다.
                </p>
            </>
        ),
        orientation: 'left',
    },
];

const pipelineKeywords = [
    { text: 'Schema Org', icon: Code },
    { text: 'SEO Keywords', icon: Search },
    { text: 'Core Contents', icon: FileCheck },
    { text: 'FAQ Logic', icon: MessageCircleQuestion },
    { text: 'JP Localization', icon: Globe },
];

const PipelineAnimation = () => {
    const [inputChips, setInputChips] = useState([]);
    const [outputChips, setOutputChips] = useState([]);
    const [progress, setProgress] = useState(0);
    const timersRef = useRef([]);

    useEffect(() => {
        let currentIndex = 0;
        const moveX = 320;

        const clearTimers = () => {
            timersRef.current.forEach((id) => clearTimeout(id));
            timersRef.current = [];
        };

        const spawnChip = (index) => {
            const keyword = pipelineKeywords[index];
            const id = `${keyword.text}-${Date.now()}`;
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 80;

            setInputChips((prev) => [...prev, { id, keyword, offsetX, offsetY, stage: 'spawn' }]);

            timersRef.current.push(
                setTimeout(() => {
                    setInputChips((prev) =>
                        prev.map((chip) => (chip.id === id ? { ...chip, stage: 'scatter' } : chip))
                    );
                }, 80)
            );

            timersRef.current.push(
                setTimeout(() => {
                    setInputChips((prev) =>
                        prev.map((chip) => (chip.id === id ? { ...chip, stage: 'move' } : chip))
                    );
                }, 950)
            );

            timersRef.current.push(
                setTimeout(() => {
                    setInputChips((prev) =>
                        prev.map((chip) => (chip.id === id ? { ...chip, stage: 'fade' } : chip))
                    );
                }, 1700)
            );

            timersRef.current.push(
                setTimeout(() => {
                    setInputChips((prev) => prev.filter((chip) => chip.id !== id));
                    setOutputChips((prev) => [...prev, { id: `out-${id}`, keyword }]);
                    const progressPct = ((index + 1) / pipelineKeywords.length) * 80 + 10;
                    setProgress(progressPct);
                }, 1900)
            );
        };

        const loop = () => {
            if (currentIndex < pipelineKeywords.length) {
                spawnChip(currentIndex);
                currentIndex += 1;
                timersRef.current.push(setTimeout(loop, 1200));
            } else {
                timersRef.current.push(
                    setTimeout(() => {
                        setInputChips([]);
                        setOutputChips([]);
                        setProgress(0);
                        currentIndex = 0;
                        loop();
                    }, 4200)
                );
            }
        };

        timersRef.current.push(setTimeout(loop, 500));

        return clearTimers;
    }, []);

    const getTransform = (chip) => {
        const base = `translate(-50%, -50%) scale(0.8)`;
        const scatter = `translate(calc(-50% + ${chip.offsetX}px), calc(-50% + ${chip.offsetY}px)) scale(1)`;
        const move = `translate(calc(-50% + ${chip.offsetX + 320}px), calc(-50% + ${chip.offsetY}px)) scale(0.55)`;

        if (chip.stage === 'fade') return `${move} scale(0.5)`;
        if (chip.stage === 'move') return move;
        if (chip.stage === 'scatter') return scatter;
        return base;
    };

    const getOpacity = (stage) => {
        if (stage === 'spawn') return 0;
        if (stage === 'fade') return 0;
        if (stage === 'move') return 0.6;
        return 1;
    };

    return (
        <div className="pipeline-shell">
            <div className="pipeline-bg-pattern" />
            <div className="pipeline-bleed" />

            <div className="pipeline-progress-line">
                <div className="pipeline-progress-active" style={{ width: `${progress}%` }} />
            </div>

            <div className="pipeline-grid">
                <div className="pipeline-card input">
                    <div className="pipeline-icon">
                        <FileText size={20} />
                    </div>
                    <div className="pipeline-label-group">
                        <p className="pipeline-label-eyebrow">STEP 01</p>
                        <p className="pipeline-label-title">Raw Inputs</p>
                    </div>
                    <div className="pipeline-input-zone">
                        {inputChips.map((chip) => {
                            const Icon = chip.keyword.icon;
                            return (
                                <div
                                    key={chip.id}
                                    className="pipeline-chip"
                                    style={{
                                        transform: getTransform(chip),
                                        opacity: getOpacity(chip.stage),
                                    }}
                                >
                                    <Icon size={12} />
                                    <span>{chip.keyword.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pipeline-hub">
                    <div className="pipeline-ripple" />
                    <div className="pipeline-hub-core">
                        <div className="pipeline-hub-ring" />
                        <div className="pipeline-hub-icon">
                            <Cpu size={32} />
                        </div>
                    </div>
                    <div className="pipeline-team">
                        <span className="pipeline-team-name">Clinic.ai team</span>
                        <span className="pipeline-team-sub">(Human + AI)</span>
                    </div>
                </div>

                <div className="pipeline-card output">
                    <div className="pipeline-icon accent">
                        <LayoutGrid size={20} />
                    </div>
                    <div className="pipeline-label-group">
                        <p className="pipeline-label-eyebrow">STEP 03</p>
                        <p className="pipeline-label-title">Optimized Data</p>
                    </div>
                    <div className="pipeline-output-list">
                        {outputChips.map((chip) => {
                            const Icon = chip.keyword.icon;
                            return (
                                <div key={chip.id} className="pipeline-output-chip">
                                    <div className="pipeline-output-meta">
                                        <Icon size={14} />
                                        <span>{chip.keyword.text}</span>
                                    </div>
                                    <CheckCircle2 size={16} className="pipeline-output-check" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServiceStructureSection = () => {
    return (
        <section className="service-structure-section">
            <div className="container">
                <div className="structure-header">
                    <p className="structure-eyebrow">Clinic.ai Service</p>
                    <h2 className="structure-title">
                        병원의 AIO/GEO를 전략부터<br />
                        실행, 인사이트까지 전담합니다.
                    </h2>
                    <p className="structure-desc">
                        Clinic.ai는 병원이 AI 답변에서 어떤 맥락으로 이해되고 추천되는지부터 진단합니다. 진단 결과를 바탕으로 AI가 읽기 쉬운 구조로
                        구현·운영하고, 언급·노출·유입 신호를 추적해 다음 액션까지 제시합니다.
                    </p>
                </div>

                <div className="structure-list">
                    {blocks.map((block, idx) => {
                        const textFirst = block.orientation === 'left';
                        return (
                            <article
                                key={block.title}
                                className={`structure-card reveal-on-scroll ${textFirst ? 'layout-left' : 'layout-right'}`}
                            >
                                <div className="structure-text">
                                    <p className="structure-step">STEP 0{idx + 1}</p>
                                    <h3>{block.title}</h3>
                                    {block.content ? (
                                        <div className="structure-copy">{block.content}</div>
                                    ) : (
                                        <p className="structure-copy">{block.text}</p>
                                    )}
                                </div>
                                <div className="structure-visual">
                                    {block.visual === 'pipeline' ? (
                                        <PipelineAnimation />
                                    ) : (
                                        <div className="structure-mock">
                                            <div className="mock-top">
                                                <span className="mock-pill">Overview</span>
                                                <span className="mock-dot">•</span>
                                            </div>
                                            <div className="mock-body">
                                                <div className="mock-metric-block">
                                                    <p className="mock-label">AI Visibility</p>
                                                    <p className="mock-value">92</p>
                                                    <p className="mock-sub">Mentions · Trend · Context</p>
                                                </div>
                                                <div className="mock-chart">
                                                    <div className="mock-line">
                                                        <span style={{ height: '40%' }} />
                                                        <span style={{ height: '55%' }} />
                                                        <span style={{ height: '50%' }} />
                                                        <span style={{ height: '70%' }} />
                                                        <span style={{ height: '65%' }} />
                                                    </div>
                                                    <div className="mock-tags">
                                                        <span>AI Visibility</span>
                                                        <span>Overview</span>
                                                        <span>Actions</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mock-footer">
                                                <span>Trend</span>
                                                <span>Insights</span>
                                                <span>Next Steps</span>
                                                <span className="mock-watermark">Clinic.ai</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServiceStructureSection;
