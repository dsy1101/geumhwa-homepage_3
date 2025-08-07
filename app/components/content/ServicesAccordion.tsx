'use client';

import React, { useState } from 'react';

const accordionItems = [
  {
    title: '정밀 절단 서비스',
    subtitle: '다양한 금속',
    description: '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
    image: '/certifications/Services/Services_1.jpg',
    features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
  },
  {
    title: '맞춤형 설계 지원',
    subtitle: '고객 맞춤 설계',
    description: '설계에서부터 시제품 제작까지 고객 맞춤형 서비스를 제공합니다.',
    image: '/certifications/Services/Services_2.jpg',
    features: ['시제품 설계', '3D 모델링', '설계 검증', '기술 컨설팅'],
  },
  {
    title: '대량 생산 대응',
    subtitle: '스마트 자동화',
    description: '자동화 시스템을 통해 대량 주문도 일관된 품질로 신속하게 대응합니다.',
    image: '/certifications/Services/Services_3.jpg',
    features: ['자동화 생산', '품질 관리', '납기 단축', '생산 라인 최적화'],
  },
];

export default function ServicesAccordion() {
  const [servicesAccordion, setServicesAccordion] = useState<number>(0);

  return (
    <div className="grid grid-cols-5 h-screen">
      {/* 왼쪽 배경 이미지 */}
      <div
        className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${accordionItems[servicesAccordion].image})`,
        }}
      >
        <div className="p-12 text-white h-full flex flex-col justify-center">
          <p className="text-sm mb-2">서비스 영역</p>
          <h2 className="text-3xl font-bold mb-4">고객 중심의 맞춤 서비스</h2>
          <p className="text-base">최고의 기술력으로 고객 요구에 대응합니다.</p>
        </div>
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-6 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">서비스 소개</h2>
          <p className="text-lg text-gray-600">
            다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
          </p>
        </div>

        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <button
              onClick={() => setServicesAccordion(index)}
              className="flex items-start space-x-6 w-full text-left"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                  servicesAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <i className="ri-check-line text-white text-xs"></i>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    servicesAccordion === index ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg">{item.subtitle}</p>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                servicesAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

                {item.features && (
                  <div className="grid grid-cols-2 gap-3">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center p-2 bg-white rounded">
                        <i className="ri-check-line text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




// 202508080300
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
//     subtitle: '다양한 금속',
//     description: '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image: '/certifications/Services/Services_2.jpg',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
//   },
//   {
//     title: '대량 생산 대응',
//     subtitle: '다양한 금속',
//     description: '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
//     image: '/certifications/Services/Services_3.jpg',
//     features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
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

//         {/* 아코디언 항목 반복 */}
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






//       {/* 오른쪽 아코디언 영역 */}
//       <div className="col-span-3 p-12 space-y-6 overflow-y-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">서비스 소개</h2>
//         <p className="text-gray-600 mb-6">
//           다양한 산업 분야에 최적화된 레이저 가공 솔루션을 제공합니다.
//         </p>

//         {accordionItems.map((item, index) => (
//           <div key={index}>
//             <button
//               onClick={() => setActiveIndex(index)}
//               className={`w-full text-left flex items-center gap-4 p-4 border rounded-lg shadow-sm transition-colors duration-300 ${
//                 activeIndex === index
//                   ? 'bg-blue-100 border-blue-500'
//                   : 'bg-white border-gray-300'
//               }`}
//             >
//               <div
//                 className={`w-4 h-4 rounded-full border-2 ${
//                   activeIndex === index ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
//                 }`}
//               ></div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
//               </div>
//             </button>

//             {activeIndex === index && (
//               <div className="mt-3 ml-8 text-gray-700 leading-relaxed">
//                 <p>{item.content}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




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
