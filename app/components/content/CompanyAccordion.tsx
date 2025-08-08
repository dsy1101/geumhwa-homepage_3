'use client';

import React, { useState, useEffect, useRef } from 'react';

type Stat = { label: string; value: string };
type Item = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats?: Stat[];
  features?: string[];
  certification?: { title: string; desc: string };
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
  },
  {
    title: '사업 분야',
    subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
    description:
      '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
    image:
      'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
    features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
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
  },
];

function CompanyAccordion() {
  const [companyAccordion, setCompanyAccordion] = useState<number>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const idx = contentRefs.current.findIndex((el) => el === visible.target);
          if (idx !== -1) setCompanyAccordion(idx);
        }
      },
      { root: null, threshold: [0.35, 0.6] }
    );

    contentRefs.current.forEach((el) => {
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const handleClick = (index: number) => {
    setCompanyAccordion(index);
    const node = contentRefs.current[index];
    if (node) {
      const top = node.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen">
      {/* 왼쪽 이미지 */}
      <div
        className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${accordionItems[companyAccordion].image})`,
        }}
      >
        <div className="p-12 flex flex-col justify-center text-white h-full">
          <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">최첨단 레이저 기술</h2>
          <p className="text-base leading-relaxed max-w-sm mb-6">
            고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
          </p>
          <a
            href="/technology"
            className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
          >
            <span>기술 정보</span>
          </a>
        </div>
      </div>

      {/* 오른쪽 아코디언 */}
      <div className="col-span-3 p-12 flex flex-col justify-center bg-white space-y-6">
        <div className="mb-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
          <p className="text-lg text-gray-600">
            20년 이상의 노하우와 첨단 기술력을 바탕으로 금화레이저는 금속 가공 산업의 선도 기업으로 자리매김하고 있습니다.
            아래 항목을 통해 금화레이저의 핵심 역량을 확인해보세요.
          </p>
        </div>

        {accordionItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <button onClick={() => handleClick(index)} className="flex items-start space-x-6 w-full text-left">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                  companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {/* 아이콘은 선택 */}
                <span className="text-white text-xs">✓</span>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                    companyAccordion === index ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg">{item.subtitle}</p>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                companyAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div
                ref={(el: HTMLDivElement | null) => {
                  contentRefs.current[index] = el; // ← void 반환 (OK)
                }}
                className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

                {item.stats && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {item.stats.map((stat, i) => (
                      <div key={i} className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {item.features && (
                  <div className="grid grid-cols-2 gap-3">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center p-2 bg-white rounded">
                        <span className="mr-2">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {item.certification && (
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                    <div className="flex items-center">
                      <div className="text-blue-600 text-2xl mr-3">🏅</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.certification.title}</h4>
                        <p className="text-sm text-gray-600">{item.certification.desc}</p>
                      </div>
                    </div>
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


export default CompanyAccordion;



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
