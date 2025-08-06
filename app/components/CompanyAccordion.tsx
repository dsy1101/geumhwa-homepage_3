// import React, { useEffect, useRef } from 'react';

// const accordionItems = [
//   {
//     title: '公司개요1',
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

// export default function CompanyAccordion({
//   companyAccordion,
//   setCompanyAccordion,
// }: {
//   companyAccordion: number;
//   setCompanyAccordion: (index: number) => void;
// }) {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const scrollCountRef = useRef(0);

// useEffect(() => {
//   const container = scrollContainerRef.current;
//   if (!container) return;

//   const onWheel = (e: WheelEvent) => {
//     if (e.deltaY > 0 && companyAccordion < accordionItems.length - 1) {
//       scrollCountRef.current += 1;

//       if (scrollCountRef.current >= 7) {
//         setCompanyAccordion(companyAccordion + 1);
//         // 여기선 초기화 X
//         container.scrollTo({ top: 0 });
//       }
//     }
//   };

//   container.addEventListener('wheel', onWheel);
//   return () => container.removeEventListener('wheel', onWheel);
// }, [companyAccordion, setCompanyAccordion]);

// // ✅ 여기서 초기화
// useEffect(() => {
//   scrollCountRef.current = 0;
// }, [companyAccordion]);

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

import React, { useEffect, useRef } from 'react';

// 아코디언 항목 데이터
const accordionItems = [
  {
    title: '公司개요2',
    subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
    content: (
      <p className="text-gray-700 leading-relaxed">
        금화레이저는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하며,
        고출력 파이버 레이저로 다양한 금속을 정밀 가공합니다.
      </p>
    ),
  },
  {
    title: '사업 분야',
    subtitle: '다양한 산업에 최적화된 맞춤형 레이저 솔루션',
    content: (
      <p className="text-gray-700 leading-relaxed">
        자동차, 조선, 전자, 항공 산업에 맞춘 절단 기술을 제공합니다.
      </p>
    ),
  },
  {
    title: '인증 및 수상',
    subtitle: '품질과 기술력을 입증하는 각종 인증과 수상',
    content: (
      <p className="text-gray-700 leading-relaxed">
        ISO 인증과 국내외 수상 이력으로 고객에게 신뢰를 제공합니다.
      </p>
    ),
  },
];

export default function CompanyAccordion({
  companyAccordion,
  setCompanyAccordion,
}: {
  companyAccordion: number;
  setCompanyAccordion: (index: number) => void;
}) {
  // 아코디언 전체 컨테이너에 ref 연결
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 휠 카운트를 누적하는 ref
  const scrollCountRef = useRef(0);

  // 휠 이벤트 등록: scrollCount가 7 이상일 때 다음 항목으로 이동
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // 아래 방향 스크롤 + 마지막 항목 이전일 때만 실행
      if (e.deltaY > 0 && companyAccordion < accordionItems.length - 1) {
        scrollCountRef.current += 1;

        // 휠 7번 이상 시 다음 항목으로 이동
        if (scrollCountRef.current >= 7) {
          setCompanyAccordion(companyAccordion + 1);
          scrollCountRef.current = 0; // 카운트 초기화
          container.scrollTop = 0; // 내부 스크롤 맨 위로
        }
      }
    };

    container.addEventListener('wheel', onWheel);
    return () => container.removeEventListener('wheel', onWheel);
  }, [companyAccordion]);

  // 아코디언이 바뀔 때마다 count 초기화 (예방용)
  useEffect(() => {
    scrollCountRef.current = 0;
  }, [companyAccordion]);

  return (
    <div
      ref={scrollContainerRef}
      className="space-y-6 overflow-y-auto max-h-[500px] pr-2"
    >
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-2">
          {/* 아코디언 헤더 */}
          <button
            onClick={() => setCompanyAccordion(index)}
            className="flex items-start space-x-6 w-full text-left"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-colors ${
                companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <i className="ri-check-line text-white text-xs"></i>
            </div>
            <div className="flex-1">
              <h3
                className={`text-3xl font-bold mb-2 ${
                  companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-lg">{item.subtitle}</p>
            </div>
          </button>

          {/* 아코디언 내용 */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              companyAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// 이 컴포넌트는 회사 소개 아코디언을 구현합니다.