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




import React, { useEffect, useRef } from 'react';

type Props = {
  companyAccordion: number;
  setCompanyAccordion: (index: number) => void;
};

export default function CompanyAccordion({ companyAccordion, setCompanyAccordion }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ✅ 아코디언 내용 스크롤이 끝까지 내려가면 다음 항목으로 자동 전환
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timeout = setTimeout(() => {
      if (container.scrollHeight > container.clientHeight) {
        const handleScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = container;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

          if (isAtBottom && companyAccordion < accordionItems.length - 1) {
            setCompanyAccordion(companyAccordion + 1);
            container.scrollTo({ top: 0 });
          }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [companyAccordion, setCompanyAccordion]);

  return (
    <div className="space-y-6">
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-2">
          {/* 아코디언 제목 버튼 */}
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
            <div
              ref={companyAccordion === index ? scrollContainerRef : null}
              className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg overflow-y-auto max-h-96"
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 아코디언 항목 정의 (회사 개요, 사업 분야, 인증 등)
const accordionItems = [
  {
    title: '회사 개요',
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
