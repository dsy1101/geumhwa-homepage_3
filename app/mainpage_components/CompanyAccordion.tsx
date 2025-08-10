'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

type Stat = { label: string; value: string };
type Item = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats?: Stat[];
  features?: string[];
  certification?: { title: string; desc: string };
  cta?: { label: string; href: string }; // ✅ 추가
};

const accordionItems: Item[] = [
  {
    title: '회사 개요',
    subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
    description:
      '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
    image:
      'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
    stats: [
      { label: '년간 기술력', value: '20+' },
      { label: '협력사', value: '500+' },
      { label: '품질 만족도', value: '99.9%' },
    ],
    cta: { label: '회사소개', href: '/company' }, // ✅ 추가
  },
  {
    title: '사업 분야',
    subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
    description:
      '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
    image:
      'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
    features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
    cta: { label: '사업분야', href: '/business' }, // ✅ 추가
  },
  {
    title: '인증 및 수상',
    subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
    description:
      '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
    image:
      'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
    certification: {
      title: '뿌리기업 확인서',
      desc: '산업통상자원부 인정기업',
    },
    cta: { label: '인증 및 수상', href: '/business/certification' }, // ✅ 추가
  },
];

/* ---- 왼쪽 이미지: 덮는 느낌 없는 2단계 크로스페이드 ---- */
function CrossfadeImage({ src }: { src: string }) {
  const DURATION = 400; // ms
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
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [src, baseSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={baseSrc}
        alt=""
        className={[
          "absolute inset-0 w-full h-full object-cover pointer-events-none",
          "transition-[opacity,filter] ease-out",
          phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
        ].join(" ")}
        style={{ willChange: 'opacity, filter' }}
      />
      {showOverlay && (
        <img
          src={overlaySrc}
          alt=""
          className={[
            "absolute inset-0 w-full h-full object-cover pointer-events-none",
            "transition-[opacity,filter] ease-out",
            phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
          ].join(" ")}
          style={{ willChange: 'opacity, filter' }}
        />
      )}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}

function CompanyAccordion() {
  const [companyAccordion, setCompanyAccordion] = useState<number>(0);

  // pinned wrapper
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // 현재 활성 인덱스를 ref로도 관리(closure 이슈 방지)
  const activeIndexRef = useRef(0);

  // 제목 위치/패널 계산용 refs & 상태
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement | null>(null); // ✅ 패널 높이 측정용
  const [panelY, setPanelY] = useState(0);               // 패널 Y(top)
  const [panelH, setPanelH] = useState(0);               // ✅ 패널 실제 높이
  const DETAIL_OFFSET = 8; // 제목 아래 여백

  // 스크롤→index 동기화 (기존 로직 유지)
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
          setCompanyAccordion(nextIndex);
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

  // 클릭 시 해당 섹션 위치로 스크롤
  const handleClick = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const start = wrapper.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const target = start + index * vh + 8;
    activeIndexRef.current = index;
    setCompanyAccordion(index);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  // ✅ 활성 제목 바로 아래로 패널 위치시키고, 패널 높이도 측정해서 spacer에 반영
  const recalcPanelY = () => {
    const titleEl = titleRefs.current[companyAccordion];
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
  }, [companyAccordion]);

  useEffect(() => {
    recalcPanelY();
    const onResize = () => recalcPanelY();
    window.addEventListener('resize', onResize);
    const t = setTimeout(recalcPanelY, 0); // 폰트/레이아웃 페인트 후 1회 더
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);

  const active = accordionItems[companyAccordion];

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
      <div className="sticky top-0 h-screen z-40">
        <div className="grid grid-cols-5 h-full">
          {/* 왼쪽 이미지 */}
          <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
            <CrossfadeImage src={active.image} />
            <div className="relative p-12 flex flex-col justify-center text-white h-full">
              {/* ... */}
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
            {/* ★ 항상 고정: 섹션 헤더(절대 안 움직임) */}
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
            </div>

            {/* 제목 리스트 컨테이너 (relative) */}
            <div ref={listContainerRef} className="relative">
              {/* 제목들: 레이아웃 고정, 색상만 토글 */}
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div
                      ref={(el: HTMLDivElement | null) => { titleRefs.current[index] = el; }}
                      className="select-none"
                    >
                      <button
                        onClick={() => handleClick(index)}
                        className="block w-full text-left"
                      >
                        <h3
                          className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
                          ${companyAccordion === index ? 'text-blue-600' : 'text-gray-300'}`}
                        >
                          {item.title}
                        </h3>
                      </button>
                    </div>

                    {/* ✅ 활성 제목 뒤 spacer: 패널 높이만큼 아래 제목들을 밀어냄 */}
                    {companyAccordion === index && <div style={{ height: panelH }} />}
                  </React.Fragment>
                ))}
              </div>

              {/* 디테일 패널: 절대 위치(top)로 활성 제목 바로 아래에 배치 */}
              <div
                className="absolute left-0 right-0 transition-[top] duration-200"
                style={{ top: panelY }}
              >
                <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
                  {/* subtitle 제거 */}
                  {active.description && (
                    <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
                  )}

                  {/* ✅ description 아래 CTA 링크만 표시 */}
                  {active.cta && (
                    <a
                      href={active.cta.href}
                      className="inline-flex items-center font-semibold text-gray-900 group"
                    >
                      <span>{active.cta.label}</span>
                      <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  )}

                  {/* stats / features / certification 제거 */}
                </div>
              </div>

              {/* 패널이 마지막 제목 밑으로 나올 때 잘리지 않도록 하단 패딩 확보 */}
              <div className="pb-[280px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyAccordion;




// 20250810_1720
// 'use client';

// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// type Stat = { label: string; value: string };
// // type Item = {
// //   title: string;
// //   subtitle: string;
// //   description: string;
// //   image: string;
// //   stats?: Stat[];
// //   features?: string[];
// //   certification?: { title: string; desc: string };
// // };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /* ---- 왼쪽 이미지: 덮는 느낌 없는 2단계 크로스페이드 ---- */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
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
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           // 오른쪽 이미지 세로로 화면 꽉채우기
//           "absolute inset-0 w-full h-full object-cover pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             // 오른쪽 이미지 세로로 화면 꽉채우기
//             "absolute inset-0 w-full h-full object-cover pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // pinned wrapper
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스를 ref로도 관리(closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   // 제목 위치/패널 계산용 refs & 상태
//   const listContainerRef = useRef<HTMLDivElement | null>(null);
//   const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const detailRef = useRef<HTMLDivElement | null>(null); // ✅ 패널 높이 측정용
//   const [panelY, setPanelY] = useState(0);               // 패널 Y(top)
//   const [panelH, setPanelH] = useState(0);               // ✅ 패널 실제 높이
//   const DETAIL_OFFSET = 8; // 제목 아래 여백

//   // 스크롤→index 동기화 (기존 로직 유지)
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
//           setCompanyAccordion(nextIndex);
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

//   // 클릭 시 해당 섹션 위치로 스크롤
//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const target = start + index * vh + 8;
//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   // ✅ 활성 제목 바로 아래로 패널 위치시키고, 패널 높이도 측정해서 spacer에 반영
//   const recalcPanelY = () => {
//     const titleEl = titleRefs.current[companyAccordion];
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
//   }, [companyAccordion]);

//   useEffect(() => {
//     recalcPanelY();
//     const onResize = () => recalcPanelY();
//     window.addEventListener('resize', onResize);
//     const t = setTimeout(recalcPanelY, 0); // 폰트/레이아웃 페인트 후 1회 더
//     return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
//   }, []);

//   const active = accordionItems[companyAccordion];

//   return (
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               {/* <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a> */}
//             </div>
//           </div>

//           {/* 오른쪽 */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* ★ 항상 고정: 섹션 헤더(절대 안 움직임) */}
//             <div className="mb-16">
//               {/* 섹션헤더와 아코디언 제목 간 간격 */}
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               {/* <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p> */}
//             </div>

//             {/* 제목 리스트 컨테이너 (relative) */}
//             <div ref={listContainerRef} className="relative">
//               {/* 제목들: 레이아웃 고정, 색상만 토글 */}
//               <div className="space-y-4">
//                 {accordionItems.map((item, index) => (
//                   <React.Fragment key={index}>
//                     <div
//                       ref={(el: HTMLDivElement | null) => { titleRefs.current[index] = el; }}
//                       className="select-none"
//                     >
//                       <button
//                         onClick={() => handleClick(index)}
//                         className="block w-full text-left"
//                       >
//                         <h3
//                           className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                           ${companyAccordion === index ? 'text-blue-600' : 'text-gray-300'}`}
//                         >
//                           {item.title}
//                         </h3>
//                       </button>
//                     </div>

//                     {/* ✅ 활성 제목 뒤 spacer: 패널 높이만큼 아래 제목들을 밀어냄 */}
//                     {companyAccordion === index && <div style={{ height: panelH }} />}
//                   </React.Fragment>
//                 ))}
//               </div>

//               {/* 디테일 패널: 절대 위치(top)로 활성 제목 바로 아래에 배치 */}
//               <div
//                 className="absolute left-0 right-0 transition-[top] duration-200"
//                 style={{ top: panelY }}
//               >
//                 <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
//                   {/* {active.subtitle && (
//                     <p className="text-gray-800 text-lg mb-3">{active.subtitle}</p>
//                   )} */}
//                   {active.description && (
//                     <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
//                   )}

//                   {/* {active.stats && (
//                     <div className="grid grid-cols-3 gap-4 text-center mb-6">
//                       {active.stats.map((stat, i) => (
//                         <div key={i} className="p-3 bg-blue-50 rounded">
//                           <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                           <div className="text-sm text-gray-600">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.features && (
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                       {active.features.map((feature, i) => (
//                         <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.certification && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{active.certification.title}</h4>
//                           <p className="text-sm text-gray-600">{active.certification.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )} */}
//                 </div>
//               </div>

//               {/* 패널이 마지막 제목 밑으로 나올 때 잘리지 않도록 하단 패딩 확보 */}
//               <div className="pb-[280px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyAccordion;



// 20250808_1950
// 'use client';

// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /* ---- 왼쪽 이미지: 덮는 느낌 없는 2단계 크로스페이드 ---- */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
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
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // pinned wrapper
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스를 ref로도 관리(closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   // 제목 위치 계산용 refs
//   const listContainerRef = useRef<HTMLDivElement | null>(null);
//   const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [panelY, setPanelY] = useState(0); // 디테일 패널 Y 위치(px)
//   const DETAIL_OFFSET = 8; // 제목 아래 여백

//   // 스크롤→index 동기화 (기존 로직 유지)
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
//           setCompanyAccordion(nextIndex);
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

//   // 클릭 시 해당 섹션 위치로 스크롤
//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const target = start + index * vh + 8;
//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   // ✅ 활성 제목 바로 아래로 패널 위치시키기 (offsetTop 기반 / top 사용)
//   const recalcPanelY = () => {
//     const titleEl = titleRefs.current[companyAccordion];
//     if (!titleEl) return;
//     const y = titleEl.offsetTop + titleEl.offsetHeight + DETAIL_OFFSET;
//     // 다음 페인트 타이밍에 적용하면 더 안정적
//     requestAnimationFrame(() => setPanelY(y));
//   };

//   useLayoutEffect(() => {
//     recalcPanelY();
//   }, [companyAccordion]);

//   useEffect(() => {
//     recalcPanelY();
//     const onResize = () => recalcPanelY();
//     window.addEventListener('resize', onResize);
//     const t = setTimeout(recalcPanelY, 0); // 폰트/레이아웃 페인트 후 1회 더
//     return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
//   }, []);

//   const active = accordionItems[companyAccordion];

//   return (
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* ★ 항상 고정: 섹션 헤더(절대 안 움직임) */}
//             <div className="mb-6">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {/* 제목 리스트 컨테이너 (relative) */}
//             <div ref={listContainerRef} className="relative">
//               {/* 제목들: 레이아웃 고정, 색상만 토글 */}
//               <div className="space-y-4">
//                 {accordionItems.map((item, index) => (
//                   <div
//                     key={index}
//                     ref={(el: HTMLDivElement | null) => { titleRefs.current[index] = el; }}
//                     className="select-none"
//                   >
//                     <button
//                       onClick={() => handleClick(index)}
//                       className="block w-full text-left"
//                     >
//                       <h3
//                         className={`text-[40px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                         ${companyAccordion === index ? 'text-blue-600' : 'text-gray-300'}`}
//                       >
//                         {item.title}
//                       </h3>
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* 디테일 패널: 절대 위치(top)로 활성 제목 바로 아래에 배치 */}
//               <div
//                 className="absolute left-0 right-0 transition-[top] duration-200"
//                 style={{ top: panelY }}
//               >
//                 <div className="pt-3 pb-6 border-b border-gray-200">
//                   {active.subtitle && (
//                     <p className="text-gray-800 text-lg mb-3">{active.subtitle}</p>
//                   )}
//                   {active.description && (
//                     <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
//                   )}

//                   {active.stats && (
//                     <div className="grid grid-cols-3 gap-4 text-center mb-6">
//                       {active.stats.map((stat, i) => (
//                         <div key={i} className="p-3 bg-blue-50 rounded">
//                           <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                           <div className="text-sm text-gray-600">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.features && (
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                       {active.features.map((feature, i) => (
//                         <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.certification && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{active.certification.title}</h4>
//                           <p className="text-sm text-gray-600">{active.certification.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 패널이 마지막 제목 밑으로 나올 때 잘리지 않도록 하단 패딩 확보 */}
//               <div className="pb-[280px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyAccordion;



// 20250808_1945
// 'use client';

// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /* ---- 왼쪽 이미지: 덮는 느낌 없는 2단계 크로스페이드 ---- */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
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
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // pinned wrapper
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스를 ref로도 관리(closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   // 제목 위치 계산용 refs
//   const listContainerRef = useRef<HTMLDivElement | null>(null);
//   const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [panelY, setPanelY] = useState(0); // 디테일 패널 Y 위치(px)
//   const DETAIL_OFFSET = 8; // 제목 아래 여백

//   // 스크롤→index 동기화 (기존 로직 유지)
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
//           setCompanyAccordion(nextIndex);
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

//   // 클릭 시 해당 섹션 위치로 스크롤
//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const target = start + index * vh + 8;
//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   // 활성 제목 바로 아래로 패널 위치시키기 (레이아웃 밀지 않음)
//   const recalcPanelY = () => {
//     const container = listContainerRef.current;
//     const titleEl = titleRefs.current[companyAccordion];
//     if (!container || !titleEl) return;
//     const cy = container.getBoundingClientRect().top + window.scrollY;
//     const ty = titleEl.getBoundingClientRect().top + window.scrollY;
//     setPanelY(ty - cy + titleEl.offsetHeight + DETAIL_OFFSET);
//   };

//   useLayoutEffect(() => {
//     recalcPanelY();
//   }, [companyAccordion]);

//   useEffect(() => {
//     recalcPanelY();
//     const onResize = () => recalcPanelY();
//     window.addEventListener('resize', onResize);
//     // 폰트 로딩 등 페인트 후 재계산
//     const t = setTimeout(recalcPanelY, 0);
//     return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
//   }, []);

//   const active = accordionItems[companyAccordion];

//   return (
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* ★ 항상 고정: 섹션 헤더(절대 안 움직임) */}
//             <div className="mb-6">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {/* 제목 리스트 컨테이너 (relative) */}
//             <div ref={listContainerRef} className="relative">
//               {/* 제목들: 레이아웃 고정, 색상만 토글 */}
//               <div className="space-y-4">
//                 {accordionItems.map((item, index) => (
//                   <div
//                     key={index}
//                     ref={(el: HTMLDivElement | null) => {
//                       titleRefs.current[index] = el;  // 값만 저장하고 아무 것도 반환하지 않음
//                     }}

//                     className="select-none"
//                   >
//                     <button
//                       onClick={() => handleClick(index)}
//                       className="block w-full text-left"
//                     >
//                       <h3
//                         className={`text-[40px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                         ${companyAccordion === index ? 'text-blue-600' : 'text-gray-300'}`}
//                       >
//                         {item.title}
//                       </h3>
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* 디테일 패널: 절대 위치로 활성 제목 아래에 띄워서 렌더 → 레이아웃 안 밀림 */}
//               <div
//                 className="absolute left-0 right-0 transition-transform duration-300"
//                 style={{ transform: `translateY(${panelY}px)` }}
//               >
//                 <div className="pt-3 pb-6 border-b border-gray-200">
//                   {active.subtitle && (
//                     <p className="text-gray-800 text-lg mb-3">{active.subtitle}</p>
//                   )}
//                   {active.description && (
//                     <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
//                   )}

//                   {active.stats && (
//                     <div className="grid grid-cols-3 gap-4 text-center mb-6">
//                       {active.stats.map((stat, i) => (
//                         <div key={i} className="p-3 bg-blue-50 rounded">
//                           <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                           <div className="text-sm text-gray-600">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.features && (
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                       {active.features.map((feature, i) => (
//                         <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.certification && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{active.certification.title}</h4>
//                           <p className="text-sm text-gray-600">{active.certification.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 패널이 마지막 제목 밑으로 나올 때 잘리지 않도록 하단 패딩 확보 */}
//               <div className="pb-[280px]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyAccordion;




// 20250808_1930
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /** ------------------------------
//  *  덮는 느낌 없이: 2단계(기존 사라짐 → 새 이미지 등장) 크로스페이드
//  *  ------------------------------ */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
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
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스 ref (closure 이슈 방지)
//   const activeIndexRef = useRef(0);

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

//         if (local <= TOP_SNAP_PX) {
//           nextIndex = 0;
//         } else {
//           const raw = local / vh;
//           nextIndex = Math.round(raw);
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }

//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setCompanyAccordion(nextIndex);
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

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   const active = accordionItems[companyAccordion];

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽: 제목 리스트 + 선택 항목 바로 아래에 상세가 펼쳐짐 */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* 섹션 헤더 */}
//             <div className="mb-6">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             <div className="space-y-4">
//               {accordionItems.map((item, index) => {
//                 const activeItem = companyAccordion === index;
//                 return (
//                   <div key={index}>
//                     {/* 제목 (회색 → 선택 시 파랑) */}
//                     <button
//                       onClick={() => handleClick(index)}
//                       className="block w-full text-left"
//                     >
//                       <h3
//                         className={`text-[40px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                         ${activeItem ? 'text-blue-600' : 'text-gray-300'}`}
//                       >
//                         {item.title}
//                       </h3>
//                     </button>

//                     {/* 상세: 선택된 항목만 바로 아래에 펼침 (부드러운 높이/투명도 전환) */}
//                     <div
//                       className={`transition-all duration-300 ease-out overflow-hidden
//                       ${activeItem ? 'max-h-[520px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}
//                     >
//                       <div className="pb-6 border-b border-gray-200">
//                         {item.subtitle && (
//                           <p className="text-gray-800 text-lg mb-3">{item.subtitle}</p>
//                         )}
//                         {item.description && (
//                           <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
//                         )}

//                         {item.stats && (
//                           <div className="grid grid-cols-3 gap-4 text-center mb-6">
//                             {item.stats.map((stat, i) => (
//                               <div key={i} className="p-3 bg-blue-50 rounded">
//                                 <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                                 <div className="text-sm text-gray-600">{stat.label}</div>
//                               </div>
//                             ))}
//                           </div>
//                         )}

//                         {item.features && (
//                           <div className="grid grid-cols-2 gap-3 mb-6">
//                             {item.features.map((feature, i) => (
//                               <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                                 {feature}
//                               </div>
//                             ))}
//                           </div>
//                         )}

//                         {item.certification && (
//                           <div className="bg-blue-50 p-4 rounded-lg">
//                             <div className="flex items-center">
//                               <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                               <div>
//                                 <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                                 <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;




// 20250808_1925
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /** ------------------------------
//  *  덮는 느낌 없이: 2단계(기존 사라짐 → 새 이미지 등장) 크로스페이드
//  *  ------------------------------ */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
//   const HALF = DURATION / 2;

//   const [baseSrc, setBaseSrc] = useState(src);
//   const [overlaySrc, setOverlaySrc] = useState(src);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     if (src === baseSrc) return;

//     // 1) 기존 이미지만 먼저 사라짐 (오버레이는 렌더하지 않음)
//     setPhase('baseOut');
//     setShowOverlay(false);

//     // 2) 절반 시점에 오버레이를 '그때' 마운트하고 등장
//     const t1 = window.setTimeout(() => {
//       setOverlaySrc(src);
//       setShowOverlay(true);
//       setPhase('overlayIn');
//     }, HALF);

//     // 3) 완료 후 베이스 교체, 오버레이 숨김
//     const t2 = window.setTimeout(() => {
//       setBaseSrc(src);
//       setShowOverlay(false);
//       setPhase('idle');
//     }, DURATION);

//     timers.current.forEach(clearTimeout);
//     timers.current = [t1, t2];
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {/* 베이스: 0~50% 동안 서서히 사라짐 */}
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />

//       {/* 오버레이: 50% 시점에 마운트되어 페이드인 → 덮임 없음 */}
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}

//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// /** 디테일 패널 내용 페이드 전환용 래퍼 */
// function FadeSwap({ index, children }: { index: number; children: React.ReactNode }) {
//   const [show, setShow] = useState(true);
//   const prevIndex = useRef(index);

//   useEffect(() => {
//     if (prevIndex.current !== index) {
//       setShow(false); // 먼저 사라지고
//       const t = setTimeout(() => {
//         setShow(true); // 다시 나타남
//         prevIndex.current = index;
//       }, 120); // 짧은 페이드아웃 시간
//       return () => clearTimeout(t);
//     }
//   }, [index]);

//   return (
//     <div className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
//       {children}
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스 ref (closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         const TOP_SNAP_PX = 40; // 이 값보다 위면 항상 0번
//         let nextIndex: number;

//         if (local <= TOP_SNAP_PX) {
//           nextIndex = 0;
//         } else {
//           const raw = local / vh;
//           nextIndex = Math.round(raw);
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }

//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setCompanyAccordion(nextIndex);
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

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   const active = accordionItems[companyAccordion];

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (자연스러운 블러 + 페이드 전환) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={active.image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽: 고정 리스트 + 아래 고정 디테일 패널 (레이아웃 점프 없음) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
//             {/* 섹션 헤더 */}
//             <div className="mb-6">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {/* 1) 고정 리스트: 제목만 보임 (회색), 선택 시 파란색 */}
//             <div className="space-y-4 mb-8">
//               {accordionItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleClick(index)}
//                   className="block w-full text-left"
//                 >
//                   <h3
//                     className={`text-[40px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300
//                     ${companyAccordion === index ? 'text-blue-600' : 'text-gray-300'}`}
//                   >
//                     {item.title}
//                   </h3>
//                 </button>
//               ))}
//             </div>

//             {/* 2) 고정 디테일 패널: 내용만 페이드로 교체 (높이 고정/최소높이 지정) */}
//             <div className="border-t border-gray-200 pt-6">
//               <FadeSwap index={companyAccordion}>
//                 <div className="min-h-[220px]">
//                   {/* 선택된 항목의 소제목/설명 등 */}
//                   {active.subtitle && (
//                     <p className="text-gray-800 text-lg mb-3">{active.subtitle}</p>
//                   )}
//                   {active.description && (
//                     <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
//                   )}

//                   {/* 선택 항목별 부가 블록들 */}
//                   {active.stats && (
//                     <div className="grid grid-cols-3 gap-4 text-center mb-6">
//                       {active.stats.map((stat, i) => (
//                         <div key={i} className="p-3 bg-blue-50 rounded">
//                           <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                           <div className="text-sm text-gray-600">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.features && (
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                       {active.features.map((feature, i) => (
//                         <div key={i} className="p-2 bg-blue-50 rounded text-gray-700 text-sm">
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {active.certification && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center">
//                         <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{active.certification.title}</h4>
//                           <p className="text-sm text-gray-600">{active.certification.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </FadeSwap>
//             </div>
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;




// 20250808_1915
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /** ------------------------------
//  *  덮는 느낌 없이: 2단계(기존 사라짐 → 새 이미지 등장) 크로스페이드
//  *  ------------------------------ */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
//   const HALF = DURATION / 2;

//   const [baseSrc, setBaseSrc] = useState(src);
//   const [overlaySrc, setOverlaySrc] = useState(src);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     if (src === baseSrc) return;

//     // 1) 기존 이미지만 먼저 사라짐 (오버레이는 렌더하지 않음)
//     setPhase('baseOut');
//     setShowOverlay(false);

//     // 2) 절반 시점에 오버레이를 '그때' 마운트하고 등장
//     const t1 = window.setTimeout(() => {
//       setOverlaySrc(src);
//       setShowOverlay(true);
//       setPhase('overlayIn');
//     }, HALF);

//     // 3) 완료 후 베이스 교체, 오버레이 숨김
//     const t2 = window.setTimeout(() => {
//       setBaseSrc(src);
//       setShowOverlay(false);
//       setPhase('idle');
//     }, DURATION);

//     timers.current.forEach(clearTimeout);
//     timers.current = [t1, t2];
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {/* 베이스: 0~50% 동안 서서히 사라짐 */}
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />

//       {/* 오버레이: 50% 시점에 마운트되어 페이드인 → 덮임 없음 */}
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}

//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스 ref (closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         const TOP_SNAP_PX = 40; // 이 값보다 위면 항상 0번
//         let nextIndex: number;

//         if (local <= TOP_SNAP_PX) {
//           nextIndex = 0;
//         } else {
//           const raw = local / vh;
//           nextIndex = Math.round(raw);
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }

//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setCompanyAccordion(nextIndex);
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

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (자연스러운 블러 + 페이드 전환) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={accordionItems[companyAccordion].image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 아코디언 (UI 동일, 체크표시 제거) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//             <div className="mb-4">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {accordionItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//               >
//                 {/* 체크 원형 배지 제거: 아이콘 div 삭제, 간격도 깔끔하게 */}
//                 <button onClick={() => handleClick(index)} className="flex items-start w-full text-left">
//                   <div className="flex-1">
//                     <h3
//                       className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                         companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">{item.subtitle}</p>
//                   </div>
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//                     <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                     {item.stats && (
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         {item.stats.map((stat, i) => (
//                           <div key={i} className="p-3 bg-white rounded">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-sm text-gray-600">{stat.label}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.features && (
//                       <div className="grid grid-cols-2 gap-3">
//                         {item.features.map((feature, i) => (
//                           <div key={i} className="flex items-center p-2 bg-white rounded">
//                             {/* 체크 아이콘 제거 */}
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.certification && (
//                       <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                         <div className="flex items-center">
//                           <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                             <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;


// 20250808_1900
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// /** ------------------------------
//  *  덮는 느낌 없이: 2단계(기존 사라짐 → 새 이미지 등장) 크로스페이드
//  *  ------------------------------ */
// function CrossfadeImage({ src }: { src: string }) {
//   const DURATION = 400; // ms
//   const HALF = DURATION / 2;

//   const [baseSrc, setBaseSrc] = useState(src);
//   const [overlaySrc, setOverlaySrc] = useState(src);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
//   const timers = useRef<number[]>([]);

//   useEffect(() => {
//     if (src === baseSrc) return;

//     // 1) 기존 이미지만 먼저 사라짐 (오버레이는 렌더하지 않음)
//     setPhase('baseOut');
//     setShowOverlay(false);

//     // 2) 절반 시점에 오버레이를 '그때' 마운트하고 등장
//     const t1 = window.setTimeout(() => {
//       setOverlaySrc(src);
//       setShowOverlay(true);
//       setPhase('overlayIn');
//     }, HALF);

//     // 3) 완료 후 베이스 교체, 오버레이 숨김
//     const t2 = window.setTimeout(() => {
//       setBaseSrc(src);
//       setShowOverlay(false);
//       setPhase('idle');
//     }, DURATION);

//     timers.current.forEach(clearTimeout);
//     timers.current = [t1, t2];
//     return () => { timers.current.forEach(clearTimeout); timers.current = []; };
//   }, [src, baseSrc]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {/* 베이스: 0~50% 동안 서서히 사라짐 */}
//       <img
//         src={baseSrc}
//         alt=""
//         className={[
//           "absolute inset-0 w-full h-full object-contain pointer-events-none",
//           "transition-[opacity,filter] ease-out",
//           phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : "duration-150 opacity-100 blur-0"
//         ].join(" ")}
//         style={{ willChange: 'opacity, filter' }}
//       />

//       {/* 오버레이: 50% 시점에 마운트되어 페이드인 → 덮임 없음 */}
//       {showOverlay && (
//         <img
//           src={overlaySrc}
//           alt=""
//           className={[
//             "absolute inset-0 w-full h-full object-contain pointer-events-none",
//             "transition-[opacity,filter] ease-out",
//             phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : "duration-150 opacity-0 blur-sm"
//           ].join(" ")}
//           style={{ willChange: 'opacity, filter' }}
//         />
//       )}

//       <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//     </div>
//   );
// }

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // 현재 활성 인덱스 ref (closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         const TOP_SNAP_PX = 40; // 이 값보다 위면 항상 0번
//         let nextIndex: number;

//         if (local <= TOP_SNAP_PX) {
//           nextIndex = 0;
//         } else {
//           const raw = local / vh;
//           nextIndex = Math.round(raw);
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }

//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setCompanyAccordion(nextIndex);
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

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     activeIndexRef.current = index;
//     setCompanyAccordion(index);
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen z-40">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (자연스러운 블러 + 페이드 전환) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
//             <CrossfadeImage src={accordionItems[companyAccordion].image} />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 아코디언 (UI 동일) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//             <div className="mb-4">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {accordionItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//               >
//                 <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                       companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                   <div className="flex-1">
//                     <h3
//                       className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                         companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">{item.subtitle}</p>
//                   </div>
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                     <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                     {item.stats && (
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         {item.stats.map((stat, i) => (
//                           <div key={i} className="p-3 bg-white rounded">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-sm text-gray-600">{stat.label}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.features && (
//                       <div className="grid grid-cols-2 gap-3">
//                         {item.features.map((feature, i) => (
//                           <div key={i} className="flex items-center p-2 bg-white rounded">
//                             <span className="mr-2">✓</span>
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.certification && (
//                       <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                         <div className="flex items-center">
//                           <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                             <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;




// 20250808_1836
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   // ✅ 현재 활성 인덱스를 ref로도 보관(closure 이슈 방지)
//   const activeIndexRef = useRef(0);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         // 현재 문서 스크롤에서 wrapper 내부로 얼마나 들어왔는지
//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         // 안정 스냅: 초입은 픽셀 단위로 0에 스냅, 그 외는 중앙 기준 반올림
//         const TOP_SNAP_PX = 40; // 이 값보다 위면 항상 0번
//         let nextIndex: number;

//         if (local <= TOP_SNAP_PX) {
//           nextIndex = 0;
//         } else {
//           const raw = local / vh;      // 0 → 1 → 2 ...
//           nextIndex = Math.round(raw); // 중앙(0.5vh) 기준 스냅
//           nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
//         }

//         // ✅ ref와 비교해서 바뀐 경우에만 업데이트 (state의 오래된 캡처값과 비교하지 않음)
//         if (nextIndex !== activeIndexRef.current) {
//           activeIndexRef.current = nextIndex;
//           setCompanyAccordion(nextIndex);
//         }
//       });
//     };

//     // 초기 1회 계산 + 스크롤 리스너
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;

//     // 초입에서 1로 튀지 않게 아주 작은 여유를 두고 이동
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     // ✅ 클릭 즉시 state/ref 동기화 (스크롤 이벤트 기다리지 않음)
//     activeIndexRef.current = index;
//     setCompanyAccordion(index);

//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (안 잘리게, 꽉 차게 배치: 레터박스 허용) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b]">
//             <img
//               src={accordionItems[companyAccordion].image}
//               alt=""
//               className="absolute inset-0 w-full h-full object-contain"
//             />
//             <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 아코디언 (UI 동일) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//             <div className="mb-4">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {accordionItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//               >
//                 <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                       companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                   <div className="flex-1">
//                     <h3
//                       className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                         companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">{item.subtitle}</p>
//                   </div>
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                     <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                     {item.stats && (
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         {item.stats.map((stat, i) => (
//                           <div key={i} className="p-3 bg-white rounded">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-sm text-gray-600">{stat.label}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.features && (
//                       <div className="grid grid-cols-2 gap-3">
//                         {item.features.map((feature, i) => (
//                           <div key={i} className="flex items-center p-2 bg-white rounded">
//                             <span className="mr-2">✓</span>
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.certification && (
//                       <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                         <div className="flex items-center">
//                           <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                             <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;





// 20250808_1830
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         // 현재 문서 스크롤에서 wrapper 내부로 얼마나 들어왔는지
//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         // ✅ 각 아이템을 1뷰포트 단위로 매핑 + 안정 스냅
//         const raw = local / vh;                // 0 → 1 → 2 ...
//         const snapped = raw < 0.3 ? 0 : Math.round(raw); // 초입 강제 0, 이후 반올림
//         const nextIndex = Math.min(accordionItems.length - 1, Math.max(0, snapped));

//         if (nextIndex !== companyAccordion) {
//           setCompanyAccordion(nextIndex);
//         }
//       });
//     };

//     // 초기 1회 계산 + 스크롤 리스너
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // companyAccordion에 의존하지 않음 (스크롤마다 set만)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;

//     // ✅ 초입에서 1로 튀지 않게 아주 작은 여유를 두고 이동
//     const offset = 8; // px
//     const target = start + index * vh + offset;

//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (안 잘리게, 꽉 차게 배치: 레터박스 허용) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b]">
//             <img
//               src={accordionItems[companyAccordion].image}
//               alt=""
//               className="absolute inset-0 w-full h-full object-contain"
//             />
//             <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 아코디언 (UI 동일) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//             <div className="mb-4">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {accordionItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//               >
//                 <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                       companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                   <div className="flex-1">
//                     <h3
//                       className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                         companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">{item.subtitle}</p>
//                   </div>
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                     <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                     {item.stats && (
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         {item.stats.map((stat, i) => (
//                           <div key={i} className="p-3 bg-white rounded">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-sm text-gray-600">{stat.label}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.features && (
//                       <div className="grid grid-cols-2 gap-3">
//                         {item.features.map((feature, i) => (
//                           <div key={i} className="flex items-center p-2 bg-white rounded">
//                             <span className="mr-2">✓</span>
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.certification && (
//                       <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                         <div className="flex items-center">
//                           <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                             <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;




// 20250808_1820
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   // 섹션을 고정하고 내부 스크롤 진행을 계산할 래퍼
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     const onScroll = () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => {
//         const wrapper = wrapperRef.current;
//         if (!wrapper) return;

//         const start = wrapper.getBoundingClientRect().top + window.scrollY; // wrapper 시작 지점(문서 기준)
//         const vh = window.innerHeight;
//         const totalHeight = accordionItems.length * vh; // wrapper 총 높이
//         const totalScrollable = totalHeight - vh; // pinned 상태로 소비할 높이

//         // 현재 문서 스크롤에서 wrapper 내부로 얼마나 들어왔는지
//         const y = window.scrollY;
//         const local = Math.min(Math.max(y - start, 0), totalScrollable);

//         // 각 아이템을 1뷰포트 단위로 매핑
//         const nextIndex = Math.min(
//           accordionItems.length - 1,
//           Math.floor(local / vh + 0.00001)
//         );

//         if (nextIndex !== companyAccordion) {
//           setCompanyAccordion(nextIndex);
//         }
//       });
//     };

//     // 초기 1회 계산 + 스크롤 리스너
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // companyAccordion에 의존하지 않음 (스크롤마다 set만)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClick = (index: number) => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;
//     const start = wrapper.getBoundingClientRect().top + window.scrollY;
//     const vh = window.innerHeight;
//     const target = start + index * vh;
//     window.scrollTo({ top: target, behavior: 'smooth' });
//   };

//   return (
//     // wrapper: 아이템 수 * 100vh → 이 범위 동안 섹션이 화면에 고정됨
//     <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
//       {/* sticky: 실제로 보이는 영역은 고정 */}
//       <div className="sticky top-0 h-screen">
//         <div className="grid grid-cols-5 h-full">
//           {/* 왼쪽 이미지 (안 잘리게, 꽉 차게 배치: 레터박스 허용) */}
//           <div className="col-span-2 relative h-full bg-[#0b0b0b]">
//             <img
//               src={accordionItems[companyAccordion].image}
//               alt=""
//               className="absolute inset-0 w-full h-full object-contain"
//             />
//             <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//             <div className="relative p-12 flex flex-col justify-center text-white h-full">
//               <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//               <p className="text-base leading-relaxed max-w-sm mb-6">
//                 고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//               </p>
//               <a
//                 href="/technology"
//                 className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//               >
//                 <span>기술 정보</span>
//               </a>
//             </div>
//           </div>

//           {/* 오른쪽 아코디언 (UI 동일) */}
//           <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//             <div className="mb-4">
//               <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//               <p className="text-lg text-gray-600">
//                 20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//                 아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//               </p>
//             </div>

//             {accordionItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//               >
//                 <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                       companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                     }`}
//                   >
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                   <div className="flex-1">
//                     <h3
//                       className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                         companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">{item.subtitle}</p>
//                   </div>
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                   }`}
//                 >
//                   <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                     <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                     {item.stats && (
//                       <div className="grid grid-cols-3 gap-4 text-center">
//                         {item.stats.map((stat, i) => (
//                           <div key={i} className="p-3 bg-white rounded">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-sm text-gray-600">{stat.label}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.features && (
//                       <div className="grid grid-cols-2 gap-3">
//                         {item.features.map((feature, i) => (
//                           <div key={i} className="flex items-center p-2 bg-white rounded">
//                             <span className="mr-2">✓</span>
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {item.certification && (
//                       <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                         <div className="flex items-center">
//                           <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                             <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>{/* grid */}
//       </div>{/* sticky */}
//     </div>/* wrapper */
//   );
// }

// export default CompanyAccordion;



// 20250808_1800
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// type Stat = { label: string; value: string };
// type Item = {
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   stats?: Stat[];
//   features?: string[];
//   certification?: { title: string; desc: string };
// };

// const accordionItems: Item[] = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);
//   const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

//   useEffect(() => {
//     const io = new IntersectionObserver(
//       (entries) => {
//         const hit = entries
//           .filter((e) => e.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

//         if (hit) {
//           const idx = itemRefs.current.findIndex((el) => el === hit.target);
//           if (idx !== -1) setCompanyAccordion(idx);
//         }
//       },
//       {
//         root: null,
//         rootMargin: '-30% 0px -50% 0px',
//         threshold: [0.1, 0.25, 0.5],
//       }
//     );

//     itemRefs.current.forEach((el) => el && io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   const handleClick = (index: number) => {
//     setCompanyAccordion(index);
//     const node = itemRefs.current[index];
//     if (node) {
//       const top = node.getBoundingClientRect().top + window.scrollY - 120;
//       window.scrollTo({ top, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="grid grid-cols-5 h-screen">
//       {/* 왼쪽 이미지 (안 잘리게, 최대한 꽉 차게) */}
//       <div className="col-span-2 relative h-full bg-[#0b0b0b]">
//         {/* 이미지 자체는 크롭 없이 영역을 최대한 채움 */}
//         <img
//           src={accordionItems[companyAccordion].image}
//           alt=""
//           className="absolute inset-0 w-full h-full object-contain"
//         />
//         {/* 동일한 어둡기 유지용 오버레이 */}
//         <div className="absolute inset-0 bg-black/30 pointer-events-none" />
//         <div className="relative p-12 flex flex-col justify-center text-white h-full">
//           <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//           <p className="text-base leading-relaxed max-w-sm mb-6">
//             고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//           </p>
//           <a
//             href="/technology"
//             className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//           >
//             <span>기술 정보</span>
//           </a>
//         </div>
//       </div>

//       {/* 오른쪽 아코디언 */}
//       <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-4">
//         <div className="mb-4">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//           <p className="text-lg text-gray-600">
//             20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//             아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//           </p>
//         </div>

//         {accordionItems.map((item, index) => (
//           <div
//             key={index}
//             ref={(el: HTMLDivElement | null) => { itemRefs.current[index] = el; }}
//             className="border-b border-gray-200 pb-2 py-8 flex flex-col justify-center scroll-mt-[120px]"
//           >
//             <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
//               <div
//                 className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                   companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//               >
//                 <span className="text-white text-xs">✓</span>
//               </div>
//               <div className="flex-1">
//                 <h3
//                   className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                     companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                   }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 text-lg">{item.subtitle}</p>
//               </div>
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                 <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                 {item.stats && (
//                   <div className="grid grid-cols-3 gap-4 text-center">
//                     {item.stats.map((stat, i) => (
//                       <div key={i} className="p-3 bg-white rounded">
//                         <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                         <div className="text-sm text-gray-600">{stat.label}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {item.features && (
//                   <div className="grid grid-cols-2 gap-3">
//                     {item.features.map((feature, i) => (
//                       <div key={i} className="flex items-center p-2 bg-white rounded">
//                         <span className="mr-2">✓</span>
//                         <span className="text-sm text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {item.certification && (
//                   <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                     <div className="flex items-center">
//                       <div className="text-blue-600 text-2xl mr-3">🏅</div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                         <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                       </div>
//                     </div>
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

// export default CompanyAccordion;



// 20250808_1700
// 'use client';

// import React, { useState } from 'react';

// const accordionItems = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     description:
//       '금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업입니다. 20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를 고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
//     stats: [
//       { label: '년간 기술력', value: '20+' },
//       { label: '협력사', value: '500+' },
//       { label: '품질 만족도', value: '99.9%' },
//     ],
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
//     description:
//       '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
//     description:
//       '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
//     image:
//       'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
//     certification: {
//       title: '뿌리기업 확인서',
//       desc: '산업통상자원부 인정기업',
//     },
//   },
// ];

// export default function CompanyAccordion() {
//   const [companyAccordion, setCompanyAccordion] = useState<number>(0);

//   return (
//     <div className="grid grid-cols-5 h-screen">
//       {/* 왼쪽 배경 이미지 + 텍스트 */}
//       <div
//         className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${accordionItems[companyAccordion].image})`,
//         }}
//       >
//         <div className="p-12 flex flex-col justify-center text-white h-full">
//           <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
//           <p className="text-base leading-relaxed max-w-sm mb-6">
//             고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
//           </p>
//           <a
//             href="/technology"
//             className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
//           >
//             <span>기술 정보</span>
//             <i className="ri-arrow-right-line"></i>
//           </a>
//         </div>
//       </div>

//       {/* 오른쪽 텍스트 영역 */}
//       <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-6 overflow-y-auto">
//         <div className="mb-4">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
//           <p className="text-lg text-gray-600">
//             20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
//             아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
//           </p>
//         </div>

//         {/* 아코디언 항목 반복 */}
//         {accordionItems.map((item, index) => (
//           <div key={index} className="border-b border-gray-200 pb-2">
//             <button
//               onClick={() => setCompanyAccordion(index)}
//               className="flex items-start space-x-6 w-full text-left"
//             >
//               <div
//                 className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
//                   companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//               >
//                 <i className="ri-check-line text-white text-xs"></i>
//               </div>
//               <div className="flex-1">
//                 <h3
//                   className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
//                     companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                   }`}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 text-lg">{item.subtitle}</p>
//               </div>
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//               }`}
//             >
//               <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
//                 <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

//                 {/* 통계/기능/인증 출력 */}
//                 {item.stats && (
//                   <div className="grid grid-cols-3 gap-4 text-center">
//                     {item.stats.map((stat, i) => (
//                       <div key={i} className="p-3 bg-white rounded">
//                         <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                         <div className="text-sm text-gray-600">{stat.label}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

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

//                 {item.certification && (
//                   <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
//                     <div className="flex items-center">
//                       <i className="ri-award-line text-blue-600 text-2xl mr-3"></i>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
//                         <p className="text-sm text-gray-600">{item.certification.desc}</p>
//                       </div>
//                     </div>
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




// 202508071608
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// function cn(...classes: (string | boolean | undefined | null)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const accordionItems = [
//   {
//     title: '회사 개요',
//     subtitle: '정밀 레이저 가공의 선도企業',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20metal%20fabrication%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology&width=1920&height=800&seq=hero1&orientation=landscape',
//   },
//   {
//     title: '사업 분야',
//     subtitle: '혁신적인 기술력',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         자동차, 전자, 반도체, 건축 등 다양한 산업에 특화된 맞춤형 솔루션을 제공합니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=advanced%20fiber%20laser%20cutting%20system%20in%20operation%20with%20sparks%20flying%20from%20metal%20cutting%20process%2C%20industrial%20automation%20equipment%20in%20clean%20manufacturing%20facility%2C%20high-precision%20metal%20fabrication%20with%20modern%20laser%20technology%2C%20professional%20manufacturing%20environment&width=1920&height=800&seq=hero2&orientation=landscape',
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 정밀도',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         ISO 9001, 벤처기업 인증, 기술혁신형 중소기업 인증 등을 보유하고 있습니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=precision%20metal%20parts%20and%20components%20manufactured%20by%20laser%20cutting%20technology%2C%20various%20stainless%20steel%20and%20aluminum%20products%20displayed%20on%20clean%20industrial%20surface%2C%20high-quality%20finished%20metal%20parts%20with%20perfect%20edges%2C%20professional%20product%20showcase&width=1920&height=800&seq=hero3&orientation=landscape',
//   },
// ];

// export default function CompanyAccordion() {
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       contentRefs.current.forEach((ref, index) => {
//         if (ref) {
//           const rect = ref.getBoundingClientRect();
//           if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
//             setActiveIndex(index);
//           }
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="flex h-screen bg-white">
//       {/* 왼쪽 이미지 영역 */}
//       <div className="w-1/2 flex items-center justify-center p-10">
//         {accordionItems[activeIndex]?.image && (
//           <img
//             src={accordionItems[activeIndex].image}
//             alt={accordionItems[activeIndex].title}
//             className="max-h-[80%] object-contain rounded shadow-lg"
//           />
//         )}
//       </div>

//       {/* 오른쪽 아코디언 영역 */}
//       <div className="w-1/2 flex flex-col justify-center p-10 space-y-8">
//         {accordionItems.map((item, index) => (
//           <div
//             key={index}
//             // ref={(el) => (contentRefs.current[index] = el)}
//             ref={(el: HTMLDivElement | null) => {
//               contentRefs.current[index] = el;
//             }}
//             className={cn(
//               activeIndex === index ? 'block' : 'hidden',
//               'transition-opacity duration-700 ease-in-out'
//             )}
//           >
//             <button
//               onClick={() => setActiveIndex(index)}
//               className={cn(
//                 'flex items-center justify-between w-full py-4 text-left transition-all',
//                 activeIndex === index ? 'text-primary font-semibold' : 'text-muted-foreground'
//               )}
//             >
//               <div className="w-full">
//                 <div className="text-3xl font-bold text-blue-800">{item.title}</div>
//                 <div className="text-md text-gray-600 mt-2">{item.subtitle}</div>
//               </div>
//               <ChevronDown
//                 className={cn(
//                   'ml-2 h-5 w-5 transition-transform duration-300',
//                   activeIndex === index ? 'rotate-180' : 'rotate-0'
//                 )}
//               />
//             </button>
//             <div className="mt-4 text-base text-gray-700">{item.content}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// 202508071555
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// function cn(...classes: (string | boolean | undefined | null)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const accordionItems = [
//   {
//     title: '회사 개요',
//     subtitle: '정밀 레이저 가공의 선도企業',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20metal%20fabrication%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology&width=1920&height=800&seq=hero1&orientation=landscape',
//   },
//   {
//     title: '사업 분야',
//     subtitle: '혁신적인 기술력',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         자동차, 전자, 반도체, 건축 등 다양한 산업에 특화된 맞춤형 솔루션을 제공합니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=advanced%20fiber%20laser%20cutting%20system%20in%20operation%20with%20sparks%20flying%20from%20metal%20cutting%20process%2C%20industrial%20automation%20equipment%20in%20clean%20manufacturing%20facility%2C%20high-precision%20metal%20fabrication%20with%20modern%20laser%20technology%2C%20professional%20manufacturing%20environment&width=1920&height=800&seq=hero2&orientation=landscape',
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 정밀도',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         ISO 9001, 벤처기업 인증, 기술혁신형 중소기업 인증 등을 보유하고 있습니다.
//       </p>
//     ),
//     image:
//       'https://readdy.ai/api/search-image?query=precision%20metal%20parts%20and%20components%20manufactured%20by%20laser%20cutting%20technology%2C%20various%20stainless%20steel%20and%20aluminum%20products%20displayed%20on%20clean%20industrial%20surface%2C%20high-quality%20finished%20metal%20parts%20with%20perfect%20edges%2C%20professional%20product%20showcase&width=1920&height=800&seq=hero3&orientation=landscape',
//   },
// ];

// export default function CompanyAccordion() {
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       contentRefs.current.forEach((ref, index) => {
//         if (ref) {
//           const rect = ref.getBoundingClientRect();
//           if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
//             setActiveIndex(index);
//           }
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="flex h-screen bg-white">
//       {/* ✅ 왼쪽 이미지 영역 */}
//       <div className="w-1/2 flex items-center justify-center p-10">
//         {accordionItems[activeIndex]?.image && (
//           <img
//             src={accordionItems[activeIndex].image}
//             alt={accordionItems[activeIndex].title}
//             className="max-h-[80%] object-contain rounded shadow-lg"
//           />
//         )}
//       </div>

//       {/* ✅ 오른쪽 아코디언 영역 */}
//       <div className="w-1/2 overflow-y-auto h-full pt-20 pr-10">
//         {accordionItems.map((item, index) => (
//           <div
//             key={index}
//             // ref={(el) => (contentRefs.current[index] = el)}
//             ref={(el: HTMLDivElement | null) => {
//               contentRefs.current[index] = el;
//             }}
//             className={cn(
//               'transition-opacity duration-700 ease-in-out',
//               activeIndex === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'
//             )}
//           >
//             <button
//               onClick={() => setActiveIndex(index)}
//               className={cn(
//                 'flex items-center justify-between w-full py-4 text-left transition-all',
//                 activeIndex === index ? 'text-primary font-semibold' : 'text-muted-foreground'
//               )}
//             >
//               <div className="w-full">
//                 <div className="text-xl">{item.title}</div>
//                 <div className="text-sm">{item.subtitle}</div>
//               </div>
//               <ChevronDown
//                 className={cn(
//                   'ml-2 h-4 w-4 transition-transform duration-300',
//                   activeIndex === index ? 'rotate-180' : 'rotate-0'
//                 )}
//               />
//             </button>
//             <div className="px-4 pt-4">{item.content}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// 202508071540
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// // import { cn } from '@/lib/utils';
// import { ChevronDown } from 'lucide-react';

// function cn(...classes: (string | boolean | undefined | null)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const accordionItems = [
//   {
//     title: '회사 개요1',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 산업에 최적화된 맞춤형 레이저 솔루션',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         자동차, 전자, 반도체, 건축 등 다양한 산업에 특화된 맞춤형 솔루션을 제공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 기술력을 입증하는 각종 인증과 수상',
//     content: (
//       <p className="leading-relaxed text-muted-foreground">
//         ISO 9001, 벤처기업 인증, 기술혁신형 중소기업 인증 등을 보유하고 있습니다.
//       </p>
//     ),
//   },
// ];

// export default function CompanyAccordion() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       contentRefs.current.forEach((ref, index) => {
//         if (ref) {
//           const rect = ref.getBoundingClientRect();
//           if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
//             setActiveIndex(index);
//           }
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="flex h-screen bg-white">
//       {/* 왼쪽 제목 영역 */}
//       <div className="w-1/3 flex flex-col items-end pr-8 pt-20">
//         {accordionItems.map((item, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveIndex(index)}
//             className={cn(
//               'flex items-center justify-between w-full py-4 text-left transition-all',
//               activeIndex === index ? 'text-primary font-semibold' : 'text-muted-foreground'
//             )}
//           >
//             <div className="text-right w-full">
//               <div className="text-xl">{item.title}</div>
//               <div className="text-sm">{item.subtitle}</div>
//             </div>
//             <ChevronDown
//               className={cn(
//                 'ml-2 h-4 w-4 transition-transform duration-300',
//                 activeIndex === index ? 'rotate-180' : 'rotate-0'
//               )}
//             />
//           </button>
//         ))}
//       </div>

//       {/* 오른쪽 컨텐츠 영역 */}
//       <div className="w-2/3 relative overflow-y-auto h-full">
//         {accordionItems.map((item, index) => (
//           <div
//             key={index}
//             // ref={(el) => (contentRefs.current[index] = el)}
//             ref={(el: HTMLDivElement | null) => {
//               contentRefs.current[index] = el;
//             }}

//             className={cn(
//               'transition-opacity duration-700 ease-in-out px-10 pt-32',
//               activeIndex === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'
//             )}
//           >
//             <div className="text-xl font-semibold mb-4">{item.title}</div>
//             {item.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useRef } from 'react';

// type Props = {
//   companyAccordion: number;
//   setCompanyAccordion: (index: number) => void;
// };

// export default function CompanyAccordion({ companyAccordion, setCompanyAccordion }: Props) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // ✅ 아코디언 내용 스크롤이 끝까지 내려가면 다음 항목으로 자동 전환
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const timeout = setTimeout(() => {
//       if (container.scrollHeight > container.clientHeight) {
//         const handleScroll = () => {
//           const { scrollTop, scrollHeight, clientHeight } = container;
//           const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

//           if (isAtBottom && companyAccordion < accordionItems.length - 1) {
//             setCompanyAccordion(companyAccordion + 1);
//             container.scrollTo({ top: 0 });
//           }
//         };

//         container.addEventListener('scroll', handleScroll);
//         return () => container.removeEventListener('scroll', handleScroll);
//       }
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [companyAccordion, setCompanyAccordion]);

//   return (
//     <div className="space-y-6">
//       {accordionItems.map((item, index) => (
//         <div key={index} className="border-b border-gray-200 pb-2">
//           {/* 아코디언 제목 버튼 */}
//           <button
//             onClick={() => setCompanyAccordion(index)}
//             className="flex items-start space-x-6 w-full text-left"
//           >
//             <div
//               className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-colors ${
//                 companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//               }`}
//             >
//               <i className="ri-check-line text-white text-xs"></i>
//             </div>
//             <div className="flex-1">
//               <h3
//                 className={`text-3xl font-bold mb-2 ${
//                   companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-gray-700 text-lg">{item.subtitle}</p>
//             </div>
//           </button>

//           {/* 아코디언 내용 */}
//           <div
//             className={`overflow-hidden transition-all duration-500 ${
//               companyAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div
//               ref={companyAccordion === index ? scrollContainerRef : null}
//               className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg overflow-y-auto max-h-96"
//             >
//               {item.content}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // 아코디언 항목 정의 (회사 개요, 사업 분야, 인증 등)
// const accordionItems = [
//   {
//     title: '회사 개요',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 산업에 최적화된 맞춤형 레이저 솔루션',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         자동차, 조선, 전자, 항공 산업에 맞춘 절단 기술을 제공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 기술력을 입증하는 각종 인증과 수상',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         ISO 인증과 국내외 수상 이력으로 고객에게 신뢰를 제공합니다.
//       </p>
//     ),
//   },
// ];



// // React 및 필요한 훅들 import
// import React, { useEffect, useRef } from 'react';

// // 아코디언 항목 목록 (타이틀, 서브타이틀, 내용 포함)
// const accordionItems = [
//   {
//     title: '기업개요2', // 아코디언 제목
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조기업', // 부제목
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 산업에 최적화된 맞춤형 레이저 솔루션',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         자동차, 조선, 전자, 항공 산업에 맞춘 절단 기술을 제공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 기술력을 입증하는 각종 인증과 수상',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         ISO 인증과 국내외 수상 이력으로 고객에게 신뢰를 제공합니다.
//       </p>
//     ),
//   },
// ];

// // 컴포넌트 정의: 아코디언 UI 렌더링
// export default function CompanyAccordion({
//   companyAccordion, // 현재 펼쳐진 아코디언 인덱스
//   setCompanyAccordion, // 아코디언 변경을 위한 setter 함수
// }: {
//   companyAccordion: number;
//   setCompanyAccordion: (index: number) => void;
// }) {
//   // 현재 열려 있는 아코디언의 내부 스크롤 영역 DOM을 참조
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // 🔁 아코디언 내용이 스크롤 끝까지 내려가면 자동으로 다음 아코디언으로 이동
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;

//       // 스크롤이 거의 맨 아래에 도달했는지 확인 (10px 오차 허용)
//       const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

//       if (isAtBottom && companyAccordion < accordionItems.length - 1) {
//         setCompanyAccordion(companyAccordion + 1); // 다음 아코디언 열기
//         container.scrollTo({ top: 0 }); // 스크롤 위치 초기화
//       }
//     };

//     // scroll 이벤트 리스너 등록
//     container.addEventListener('scroll', handleScroll);

//     // 컴포넌트 언마운트 시 이벤트 제거 (메모리 누수 방지)
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, [companyAccordion, setCompanyAccordion]);

//   return (
//     <div className="space-y-6">
//       {/* 아코디언 항목들 반복 렌더링 */}
//       {accordionItems.map((item, index) => (
//         <div key={index} className="border-b border-gray-200 pb-2">
//           {/* 아코디언 제목 버튼 */}
//           <button
//             onClick={() => setCompanyAccordion(index)} // 클릭 시 해당 항목으로 전환
//             className="flex items-start space-x-6 w-full text-left"
//           >
//             {/* 인디케이터 동그라미 */}
//             <div
//               className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-colors ${
//                 companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//               }`}
//             >
//               <i className="ri-check-line text-white text-xs"></i>
//             </div>

//             {/* 제목 & 서브텍스트 */}
//             <div className="flex-1">
//               <h3
//                 className={`text-3xl font-bold mb-2 ${
//                   companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-gray-700 text-lg">{item.subtitle}</p>
//             </div>
//           </button>

//           {/* 아코디언 내용 영역 */}
//           <div
//             className={`overflow-hidden transition-all duration-500 ${
//               companyAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div
//               // 현재 열려 있는 항목에만 ref 연결 (스크롤 감지를 위해)
//               ref={companyAccordion === index ? scrollContainerRef : null}
//               className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg overflow-y-auto max-h-96"
//             >
//               {item.content}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }





// import React, { useEffect, useRef } from 'react';

// const accordionItems = [
//   {
//     title: '기업개요1',
//     subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조기업',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
//         고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '사업 분야',
//     subtitle: '다양한 산업에 최적화된 맞춤형 레이저 솔루션',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         자동차, 조선, 전자, 항공 산업에 맞춘 절단 기술을 제공합니다.
//       </p>
//     ),
//   },
//   {
//     title: '인증 및 수상',
//     subtitle: '품질과 기술력을 입증하는 각종 인증과 수상',
//     content: (
//       <p className="text-gray-700 leading-relaxed">
//         ISO 인증과 국내외 수상 이력으로 고객에게 신뢰를 제공합니다.
//       </p>
//     ),
//   },
// ];

// export default function CompanyAccordion({
//   companyAccordion,
//   setCompanyAccordion,
// }: {
//   companyAccordion: number;
//   setCompanyAccordion: (index: number) => void;
// }) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     // ⏱️ 약간의 지연 후 이벤트 등록 (렌더 이후 DOM 업데이트 기다림)
//     const timeout = setTimeout(() => {
//       // 스크롤이 가능한 영역일 때만
//       if (container.scrollHeight > container.clientHeight) {
//         const handleScroll = () => {
//           const { scrollTop, scrollHeight, clientHeight } = container;
//           const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

//           if (isAtBottom && companyAccordion < accordionItems.length - 1) {
//             setCompanyAccordion(companyAccordion + 1);
//             container.scrollTo({ top: 0 });
//           }
//         };

//         container.addEventListener('scroll', handleScroll);
//         // 클린업
//         return () => container.removeEventListener('scroll', handleScroll);
//       }
//     }, 100); // 100ms 지연

//     return () => clearTimeout(timeout);
//   }, [companyAccordion, setCompanyAccordion]);

//   return (
//     <div className="space-y-6">
//       {accordionItems.map((item, index) => (
//         <div key={index} className="border-b border-gray-200 pb-2">
//           <button
//             onClick={() => setCompanyAccordion(index)}
//             className="flex items-start space-x-6 w-full text-left"
//           >
//             <div
//               className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-colors ${
//                 companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
//               }`}
//             >
//               <i className="ri-check-line text-white text-xs"></i>
//             </div>
//             <div className="flex-1">
//               <h3
//                 className={`text-3xl font-bold mb-2 ${
//                   companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-gray-700 text-lg">{item.subtitle}</p>
//             </div>
//           </button>

//           <div
//             className={`overflow-hidden transition-all duration-500 ${
//               companyAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//             }`}
//           >
//             <div
//               ref={companyAccordion === index ? scrollContainerRef : null}
//               className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg overflow-y-auto max-h-96"
//             >
//               {item.content}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
