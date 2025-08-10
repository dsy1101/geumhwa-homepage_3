'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Item = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features?: string[];
  cta?: { label: string; href: string }; // ✅ 추가
};

/* ▼ 콘텐츠 */
const accordionItems: Item[] = [
  {
    title: '정밀 절단 서비스',
    subtitle: '다양한 금속',
    description:
      '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
    image: '/certifications/Services/Services_1.jpg',
    features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
    cta: { label: '정밀 절단', href: '/technology/process' }, // ✅ 추가
  },
  {
    title: '맞춤형 설계 지원',
    subtitle: '고객 맞춤 설계',
    description: '설계에서부터 시제품 제작까지 고객 맞춤형 서비스를 제공합니다.',
    image: '/certifications/Services/Services_2.jpg',
    features: ['시제품 설계', '3D 모델링', '설계 검증', '기술 컨설팅'],
    cta: { label: '설계 지원', href: '/technology/product' }, // ✅ 추가
  },
  {
    title: '대량 생산 대응',
    subtitle: '스마트 자동화',
    description: '자동화 시스템을 통해 대량 주문도 일관된 품질로 신속하게 대응합니다.',
    image: '/certifications/Services/Services_3.jpg',
    features: ['자동화 생산', '품질 관리', '납기 단축', '생산 라인 최적화'],
    cta: { label: '대량 생산', href: '/business' }, // ✅ 추가
  },
];

/* ---- 왼쪽 이미지: 2단계 크로스페이드 ---- */
function CrossfadeImage({ src }: { src: string }) {
  const DURATION = 400;
  const HALF = DURATION / 2;

  const [baseSrc, setBaseSrc] = useState(src);
  const [overlaySrc, setOverlaySrc] = useState(src);
  const [showOverlay, setShowOverlay] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (src === baseSrc) return;
    setPhase('baseOut');
    setShowOverlay(false);
    const t1 = window.setTimeout(() => {
      setOverlaySrc(src);
      setShowOverlay(true);
      setPhase('overlayIn');
    }, HALF);
    const t2 = window.setTimeout(() => {
      setBaseSrc(src);
      setShowOverlay(false);
      setPhase('idle');
    }, DURATION);
    timers.current.forEach(clearTimeout);
    timers.current = [t1, t2];
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [src, baseSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={baseSrc}
        alt=""
        className={[
          'absolute inset-0 w-full h-full object-cover pointer-events-none',
          'transition-[opacity,filter] ease-out',
          phase === 'baseOut'
            ? `duration-[${HALF}ms] opacity-0 blur-sm`
            : 'duration-150 opacity-100 blur-0',
        ].join(' ')}
        style={{ willChange: 'opacity, filter' }}
      />
      {showOverlay && (
        <img
          src={overlaySrc}
          alt=""
          className={[
            'absolute inset-0 w-full h-full object-cover pointer-events-none',
            'transition-[opacity,filter] ease-out',
            phase === 'overlayIn'
              ? `duration-[${HALF}ms] opacity-100 blur-0`
              : 'duration-150 opacity-0 blur-sm',
          ].join(' ')}
          style={{ willChange: 'opacity, filter' }}
        />
      )}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}

/* ---- 스크롤형 아코디언 (서비스용) ---- */
export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);

  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [panelY, setPanelY] = useState(0);
  const [panelH, setPanelH] = useState(0);
  const DETAIL_OFFSET = 12; // 제목 아래 여백

  /* 스크롤 위치 → 섹션 인덱스 계산 */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const start = wrapper.getBoundingClientRect().top + window.scrollY;
        const vh = window.innerHeight;
        const totalHeight = accordionItems.length * vh;
        const totalScrollable = totalHeight - vh;
        const y = window.scrollY;
        const local = Math.min(Math.max(y - start, 0), totalScrollable);

        const TOP_SNAP_PX = 40;
        let nextIndex: number;
        if (local <= TOP_SNAP_PX) nextIndex = 0;
        else {
          const raw = local / vh;
          nextIndex = Math.round(raw);
          nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
        }
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* 클릭 시 해당 섹션 위치로 스크롤 */
  const handleClick = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const start = wrapper.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const target = start + index * vh + 8;
    activeIndexRef.current = index;
    setActiveIndex(index);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  /* 활성 제목 바로 아래에 패널 배치 + 높이 측정 */
  const recalcPanelY = () => {
    const titleEl = titleRefs.current[activeIndex];
    if (!titleEl) return;
    const y = titleEl.offsetTop + titleEl.offsetHeight + DETAIL_OFFSET;
    const h = detailRef.current?.offsetHeight ?? 0;
    requestAnimationFrame(() => {
      setPanelY(y);
      setPanelH(h);
    });
  };

  useLayoutEffect(() => {
    recalcPanelY();
  }, [activeIndex]);

  useEffect(() => {
    recalcPanelY();
    const onResize = () => recalcPanelY();
    window.addEventListener('resize', onResize);
    const t = setTimeout(recalcPanelY, 0);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);

  const active = accordionItems[activeIndex];

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${accordionItems.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen z-40">
        <div className="grid grid-cols-5 h-full">
          {/* 왼쪽: 배경 이미지 (크로스페이드) */}
          <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
            <CrossfadeImage src={active.image} />
            <div className="relative p-12 flex flex-col justify-center text-white h-full">
              <p className="text-sm mb-2 tracking-wider">서비스 영역</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">고객 중심의 맞춤 서비스</h2>
              <p className="text-base leading-relaxed max-w-sm">
                최고의 기술력으로 고객 요구에 대응합니다.
              </p>
            </div>
          </div>

          {/* 오른쪽: 제목 리스트 + 디테일 패널 */}
          <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
            {/* 섹션 헤더 */}
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">서비스 소개</h2>
              <p className="text-lg text-gray-600">
                다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
              </p>
            </div>

            <div className="relative">
              {/* 큰 제목들 */}
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className="select-none"
                    >
                      <button
                        onClick={() => handleClick(index)}
                        className="block w-full text-left"
                      >
                        <h3
                          className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
                          ${activeIndex === index ? 'text-blue-600' : 'text-gray-300'}`}
                        >
                          {item.title}
                        </h3>
                      </button>
                    </div>

                    {/* 활성 제목 뒤 spacer */}
                    {activeIndex === index && <div style={{ height: panelH }} />}
                  </React.Fragment>
                ))}
              </div>

              {/* 디테일 패널 */}
              <div
                className="absolute left-0 right-0 transition-[top] duration-200"
                style={{ top: panelY }}
              >
                <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
                  {/* ✅ subtitle 렌더 제거 */}

                  {active.description && (
                    <p className="text-gray-600 text-[15px] md:text-base leading-7 md:leading-8 tracking-[-0.005em] max-w-[520px] whitespace-pre-line mb-6">
                      {active.description}
                    </p>
                  )}

                  {/* ✅ description 아래 CTA 링크 */}
                  {active.cta && (
                    <a
                      href={active.cta.href}
                      className="inline-flex items-center font-semibold text-gray-900 group"
                    >
                      <span>{active.cta.label}</span>
                      <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  )}

                  {/* ✅ features/stat/certification 렌더 제거 */}
                </div>
              </div>

              {/* 하단 여유 패딩 (잘림 방지) */}
              <div className="pb-[240px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// 20250810_1750
// 'use client';

// import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   features?: string[];
// };

// /* ▼ 너가 준 콘텐츠 */
// const accordionItems: Item[] = [
//   {
//     title: '정밀 절단 서비스',
//     subtitle: '다양한 금속',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image: '/certifications/Services/Services_1.jpg',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '맞춤형 설계 지원',
//     subtitle: '고객 맞춤 설계',
//     description: '설계에서부터 시제품 제작까지 고객 맞춤형 서비스를 제공합니다.',
//     image: '/certifications/Services/Services_2.jpg',
//     features: ['시제품 설계', '3D 모델링', '설계 검증', '기술 컨설팅'],
//   },
//   {
//     title: '대량 생산 대응',
//     subtitle: '스마트 자동화',
//     description: '자동화 시스템을 통해 대량 주문도 일관된 품질로 신속하게 대응합니다.',
//     image: '/certifications/Services/Services_3.jpg',
//     features: ['자동화 생산', '품질 관리', '납기 단축', '생산 라인 최적화'],
//   },
// ];

// /* ---- 왼쪽 이미지: 2단계 크로스페이드 ---- */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400;
//   const HALF = DURATION / 2;

//   const [baseSrc, setBaseSrc] = useState(src);
//   const [overlaySrc, setOverlaySrc] = useState(src);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     if (src === baseSrc) return;
//     setPhase('baseOut');
//     setShowOverlay(false);
//     const t1 = window.setTimeout(() => {
//       setOverlaySrc(src);
//       setShowOverlay(true);
//       setPhase('overlayIn');
//     }, HALF);
//     const t2 = window.setTimeout(() => {
//       setBaseSrc(src);
//       setShowOverlay(false);
//       setPhase('idle');
//     }, DURATION);
//     timers.current.forEach(clearTimeout);
//     timers.current = [t1, t2];
//     return () => {
//       timers.current.forEach(clearTimeout);
//       timers.current = [];
//     };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           // 'absolute inset-0 w-full h-full object-contain pointer-events-none',
//           // 오른쪽 이미지 세로로 화면 꽉채우기
//           'absolute inset-0 w-full h-full object-cover pointer-events-none',
//           'transition-[opacity,filter] ease-out',
//           phase === 'baseOut'
//             ? `duration-[${HALF}ms] opacity-0 blur-sm`
//             : 'duration-150 opacity-100 blur-0',
//         ].join(' ')}
//         style={{ willChange: 'opacity, filter' }}
//       />
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             // 'absolute inset-0 w-full h-full object-contain pointer-events-none',
//             // 오른쪽 이미지 세로로 화면 꽉채우기
//             'absolute inset-0 w-full h-full object-cover pointer-events-none',
//             'transition-[opacity,filter] ease-out',
//             phase === 'overlayIn'
//               ? `duration-[${HALF}ms] opacity-100 blur-0`
//               : 'duration-150 opacity-0 blur-sm',
//           ].join(' ')}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// /* ---- 스크롤형 아코디언 (서비스용) ---- */
// export default function ServicesAccordion() {
//   const [activeIndex, setActiveIndex] = useState<number>(0);

//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);
//   const activeIndexRef = useRef(0);

//   const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const detailRef = useRef<HTMLDivElement | null>(null);
//   const [panelY, setPanelY] = useState(0);
//   const [panelH, setPanelH] = useState(0);
//   const DETAIL_OFFSET = 12; // 제목 아래 여백

//   /* 스크롤 위치 → 섹션 인덱스 계산 */
//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;
//         const start = wrapper.getBoundingClientRect().top + window.scrollY;
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh;
//         const totalScrollable = totalHeight - vh;
//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         const TOP_SNAP_PX = 40;
//         let nextIndex: number;
//         if (local <= TOP_SNAP_PX) nextIndex = 0;
//         else {
//           const raw = local / vh;
//           nextIndex = Math.round(raw);
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }
//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setActiveIndex(nextIndex);
//         }
//       });
//     };
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   /* 클릭 시 해당 섹션 위치로 스크롤 */
//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const target = start + index * vh + 8;
//     activeIndexRef.current = index;
//     setActiveIndex(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   /* 활성 제목 바로 아래에 패널 배치 + 높이 측정 */
//   const recalcPanelY = () => {
//     const titleEl = titleRefs.current[activeIndex];
//     if (!titleEl) return;
//     const y = titleEl.offsetTop + titleEl.offsetHeight + DETAIL_OFFSET;
//     const h = detailRef.current?.offsetHeight ?? 0;
//     requestAnimationFrame(() => {
//       setPanelY(y);
//       setPanelH(h);
//     });
//   };

//   useLayoutEffect(() => {
//     recalcPanelY();
//   }, [activeIndex]);

//   useEffect(() => {
//     recalcPanelY();
//     const onResize = () => recalcPanelY();
//     window.addEventListener('resize', onResize);
//     const t = setTimeout(recalcPanelY, 0);
//     return () => {
//       window.removeEventListener('resize', onResize);
//       clearTimeout(t);
//     };
//   }, []);

//   const active = accordionItems[activeIndex];

//   return (
//     <div
//       ref={wrapperRef}
//       className="relative"
//       style={{ height: `${accordionItems.length * 100}vh` }}
//     >
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽: 배경 이미지 (크로스페이드) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-2 tracking-wider">서비스 영역</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-3">고객 중심의 맞춤 서비스</h2>
//               <p className="text-base leading-relaxed max-w-sm">
//                 최고의 기술력으로 고객 요구에 대응합니다.
//               </p>
//             </div>
//           </div>

//           {/* 오른쪽: 제목 리스트 + 디테일 패널 */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* 섹션 헤더 */}
//             <div className="mb-16">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">서비스 소개</h2>
//               <p className="text-lg text-gray-600">
//                 다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
//               </p>
//             </div>

//             <div className="relative">
//               {/* 큰 제목들 */}
//               <div className="space-y-4">
//                 {accordionItems.map((item, index) => (
//                   <React.Fragment key={index}>
//                     <div
//                       ref={(el) => {
//                         titleRefs.current[index] = el;
//                       }}
//                       className="select-none"
//                     >
//                       <button
//                         onClick={() => handleClick(index)}
//                         className="block w-full text-left"
//                       >
//                         <h3
//                           className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                           ${activeIndex === index ? 'text-blue-600' : 'text-gray-300'}`}
//                         >
//                           {item.title}
//                         </h3>
//                       </button>
//                     </div>

//                     {/* 활성 제목 뒤 spacer */}
//                     {activeIndex === index && <div style={{ height: panelH }} />}
//                   </React.Fragment>
//                 ))}
//               </div>

//               {/* 디테일 패널 */}
//               <div
//                 className="absolute left-0 right-0 transition-[top] duration-200"
//                 style={{ top: panelY }}
//               >
//                 <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
//                   {active.subtitle && (
//                     <p className="text-gray-800 text-lg mb-3">{active.subtitle}</p>
//                   )}
//                   {active.description && (
//                     <p className="text-gray-600 leading-relaxed mb-6">
//                       {active.description}
//                     </p>
//                   )}

//                   {active.features && (
//                     <div className="grid grid-cols-2 gap-3 mb-2">
//                       {active.features.map((feature, i) => (
//                         <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 하단 여유 패딩 (잘림 방지) */}
//               <div className="pb-[240px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// 20250809
// 'use client';

// import React, { useState } from 'react';

// const accordionItems = [
//   {
//     title: '정밀 절단 서비스',
//     subtitle: '다양한 금속',
//     description: '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image: '/certifications/Services/Services_1.jpg',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '맞춤형 설계 지원',
//     subtitle: '고객 맞춤 설계',
//     description: '설계에서부터 시제품 제작까지 고객 맞춤형 서비스를 제공합니다.',
//     image: '/certifications/Services/Services_2.jpg',
//     features: ['시제품 설계', '3D 모델링', '설계 검증', '기술 컨설팅'],
//   },
//   {
//     title: '대량 생산 대응',
//     subtitle: '스마트 자동화',
//     description: '자동화 시스템을 통해 대량 주문도 일관된 품질로 신속하게 대응합니다.',
//     image: '/certifications/Services/Services_3.jpg',
//     features: ['자동화 생산', '품질 관리', '납기 단축', '생산 라인 최적화'],
//   },
// ];

// export default function ServicesAccordion() {
//   const [servicesAccordion, setServicesAccordion] = useState<number>(0);

//   return (
//     <div className="grid grid-cols-5 h-screen">
//       {/* 왼쪽 배경 이미지 */}
//       <div
//         className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${accordionItems[servicesAccordion].image})`,
//         }}
//       >
//         <div className="p-12 text-white h-full flex flex-col justify-center">
//           <p className="text-sm mb-2">서비스 영역</p>
//           <h2 className="text-3xl font-bold mb-4">고객 중심의 맞춤 서비스</h2>
//           <p className="text-base">최고의 기술력으로 고객 요구에 대응합니다.</p>
//         </div>
//       </div>

//       {/* 오른쪽 텍스트 영역 */}
//       <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-6 overflow-y-auto">
//         <div className="mb-4">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-2">서비스 소개</h2>
//           <p className="text-lg text-gray-600">
//             다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
//           </p>
//         </div>

//         {accordionItems.map((item, index) => (
//           <div key={index} className="border-b border-gray-200 pb-2">
//             <button
//               onClick={() => setServicesAccordion(index)}
//               className="flex items-start space-x-6 w-full text-left"
//             >
//               <div
//                 className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                   servicesAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//               >
//                 <i className="ri-check-line text-white text-xs"></i>
//               </div>
//               <div className="flex-1">
//                 <h3
//                   className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                     servicesAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                   }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 text-lg">{item.subtitle}</p>
//               </div>
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 servicesAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                 <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                 {item.features && (
//                   <div className="grid grid-cols-2 gap-3">
//                     {item.features.map((feature, i) => (
//                       <div key={i} className="flex items-center p-2 bg-white rounded">
//                         <i className="ri-check-line text-blue-600 mr-2" />
//                         <span className="text-sm text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }