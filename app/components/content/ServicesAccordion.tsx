'use client';

import React, { useState } from 'react';

const accordionItems = [
  {
    title: '정밀 절단 서비스',
    content:
      '레이저 기술을 활용한 고정밀 금속 절단 서비스로, 복잡한 형상도 정밀하게 가공 가능합니다.',
    image: '/certifications/Services/Service_1.jpg',
  },
  {
    title: '맞춤형 설계 지원',
    content:
      '고객 요구에 맞는 설계부터 시제품 제작까지 One-Stop 맞춤형 솔루션을 제공합니다.',
    image: '/certifications/Services/Service_2.jpg',
  },
  {
    title: '대량 생산 대응',
    content:
      '자동화 시스템을 통해 대량 주문에도 신속하고 일관된 품질로 대응합니다.',
    image: '/certifications/Services/Service_3.jpg',
  },
];

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="grid grid-cols-5 h-screen">
      {/* 왼쪽 배경 이미지 */}
      <div
        className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${accordionItems[activeIndex].image})`,
        }}
      >
        <div className="p-12 text-white h-full flex flex-col justify-center">
          <p className="text-sm mb-2">서비스 영역</p>
          <h2 className="text-3xl font-bold mb-4">고객 중심의 맞춤 서비스</h2>
          <p className="text-base">최고의 기술력으로 고객 요구에 대응합니다.</p>
        </div>
      </div>

      {/* 오른쪽 아코디언 영역 */}
      <div className="col-span-3 p-12 space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">서비스 소개</h2>
        <p className="text-gray-600 mb-6">
          다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
        </p>

        {accordionItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setActiveIndex(index)}
              className={`w-full text-left flex items-center gap-4 p-4 border rounded-lg shadow-sm transition-colors duration-300 ${
                activeIndex === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  activeIndex === index ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                }`}
              ></div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
              </div>
            </button>

            {activeIndex === index && (
              <div className="mt-3 ml-8 text-gray-700 leading-relaxed">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



// 202508080221
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// // 서비스 아코디언 항목 데이터
// const accordionItems = [
//   {
//     title: '정밀 절단 서비스',
//     content:
//       '레이저 기술을 활용한 고정밀 금속 절단 서비스로, 복잡한 형상도 정밀하게 가공 가능합니다.',
//   },
//   {
//     title: '맞춤형 설계 지원',
//     content:
//       '고객 요구에 맞는 설계부터 시제품 제작까지 One-Stop 맞춤형 솔루션을 제공합니다.',
//   },
//   {
//     title: '대량 생산 대응',
//     content:
//       '자동화 시스템을 통해 대량 주문에도 신속하고 일관된 품질로 대응합니다.',
//   },
// ];

// export default function ServicesAccordion() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(0);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]) as React.MutableRefObject<(HTMLDivElement | null)[]>;
//   const containerRef = useRef<HTMLDivElement>(null);

//   // 스크롤 시 다음 아코디언으로 자동 전환 (IntersectionObserver 기반)
//   useEffect(() => {
//     const observerOptions = {
//       root: containerRef.current,
//       rootMargin: '0px',
//       threshold: 0.8, // 내용 80% 이상 보이면 active 처리
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const index = contentRefs.current.findIndex(
//             (ref) => ref === entry.target
//           );
//           if (index !== -1) setActiveIndex(index);
//         }
//       });
//     }, observerOptions);

//     contentRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full max-w-5xl mx-auto space-y-4 px-4 overflow-y-auto max-h-[90vh]"
//     >
//       {accordionItems.map((item, index) => (
//         <div
//           key={index}
//           className="border border-gray-300 rounded-lg bg-white shadow"
//         >
//           {/* 아코디언 제목 영역 */}
//           <button
//             onClick={() => setActiveIndex(index)}
//             className="w-full flex justify-between items-center p-4 focus:outline-none"
//           >
//             <span className="text-lg font-semibold text-left">
//               {item.title}
//             </span>
//             <motion.span
//               animate={{ rotate: activeIndex === index ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <svg
//                 className="w-5 h-5 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </motion.span>
//           </button>

//           {/* 아코디언 내용 영역 */}
//           <div
//             ref={(el: HTMLDivElement | null) => {
//                 contentRefs.current[index] = el;
//             }}

//             className={`transition-all duration-500 px-4 overflow-hidden ${
//               activeIndex === index ? 'max-h-40 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'
//             }`}
//           >
//             <p className="text-gray-700 leading-relaxed">{item.content}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
