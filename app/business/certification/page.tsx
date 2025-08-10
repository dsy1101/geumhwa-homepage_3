'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CertificationPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); //

  return (
    <div className="min-h-screen bg-white">
 
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20in%20modern%20office%20setting%2C%20industrial%20excellence%20recognition%20with%20Korean%20flag%20and%20manufacturing%20facility%20background%2C%20trust%20and%20reliability%20symbols&width=1200&height=400&seq=certification-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              인증
            </h1>
            <p className="text-xl md:text-2xl">
              국가가 인정한 기술력과 신뢰성을 바탕으로 혁신을 선도합니다
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              금화레이저(주)의 공식 인증 현황
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              금화레이저는 뿌리기업, 벤처기업, 기업부설 연구전담부서 인증을 통해 
              技術力과 혁신성을 공식적으로 인정받은 신뢰할 수 있는 기업입니다.
            </p>
          </div>

          {/* Section 1: 뿌리기업 확인서 인증 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                뿌리기업 확인서 인증
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                산업통상자원부가 지정하는 "뿌리산업" 중 금속가공 기술 분야의 핵심 제조 기업으로 공식 확인받았습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4">인증 개요</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정기관:</span>
                    <span className="text-gray-600">한국산업기술진흥협회 (KOITA)</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정번호:</span>
                    <span className="text-gray-600">제20240011호</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정일자:</span>
                    <span className="text-gray-600">2024.01.15</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">유효기간:</span>
                    <span className="text-gray-600">2027.01.14</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-purple-800 mb-3">주요 연구 분야</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 레이저 절단 기술 고도화 연구</li>
                    <li>• 정밀 가공 공정 최적화 연구</li>
                    <li>• 소재별 가공 조건 표준화 연구</li>
                    <li>• 자동화 시스템 개발 연구</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/9c136d6504724aafc2e453a82c6c0fe9.png"
                  alt="뿌리기업 확인서"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 2: 벤처기업 인증 (🛠 레이아웃 통일) */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                벤처기업 인증
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                벤처기업 인증을 받아 기술 혁신 활동을 수행하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ⬅ 왼쪽: 단일 카드로 합침 (다른 섹션과 동일한 패턴) */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">주요 기술 요약</h3>
                <p className="text-gray-700 font-semibold">
                  고품질 레이저 가공 및 자동 수거 시스템 개발
                </p>
                <ul className="space-y-2 text-gray-600 mt-3">
                  <li>• 레이저 절단 중 발생하는 금속조각과 스패터를 레이저 헤드 이동과 연동하여 자동 수거</li>
                  <li>• 회전 블레이드, 망 트레이, 슬라이딩 수거함 등 모듈화 구성</li>
                  <li>• 수거율 90% 이상, 생산성 30% 향상</li>
                  <li>• 국내 최초 특허기반 연동형 시스템</li>
                </ul>

                <div className="mt-8">
                  <h4 className="font-semibold text-green-800 mb-3">기술 적용 분야</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">전자부품</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">자동차</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">디스플레이</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">방산</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">정밀가공</span>
                  </div>
                </div>
              </div>

              {/* ➡ 오른쪽: 이미지 클래스 통일 */}
              <div className="flex justify-center items-center">
                <img
                  src="/certifications/벤처기업확인서.jpg"
                  alt="벤처기업 확인서"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 기업부설 연구전담부서 인증 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                기업부설 연구전담부서 인증
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                기업부설 연구전담부서 인증을 받아 레이저 절단 기술 고도화 활동을 수행하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-4">인증 개요</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정기관:</span>
                    <span className="text-gray-600">한국산업기술진흥협회 (KOITA)</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정번호:</span>
                    <span className="text-gray-600">제20240011호</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">인정일자:</span>
                    <span className="text-gray-600">2024.01.15</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">유효기간:</span>
                    <span className="text-gray-600">2027.01.14</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-purple-800 mb-3">주요 연구 분야</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 레이저 절단 기술 고도화 연구</li>
                    <li>• 정밀 가공 공정 최적화 연구</li>
                    <li>• 소재별 가공 조건 표준화 연구</li>
                    <li>• 자동화 시스템 개발 연구</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src="/certifications/연구개발전담부서인정서.jpg"
                  alt="기업부설 연구전담부서 인증서"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* 종합 성과 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-6">금화레이저의 인증 성과</h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-8">
              뿌리기업, 벤처기업, 기업부설 연구전담부서 인증을 통해 입증된 금화레이저의 기술력과 혁신성은 
              대한민국 제조업 발전에 기여하며, 지속적인 연구개발을 통해 미래 산업을 선도해 나가겠습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-2">국가 인증</div>
                <div className="text-sm">뿌리기업 공식 확인</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-2">혁신 기술</div>
                <div className="text-sm">벤처기업 인증 보유</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-2">체계적 연구</div>
                <div className="text-sm">전담 연구부서 운영</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}




// 20250810_2020
// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function CertificationPage() {
//   // const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState<number | null>(null); //

//   return (
//     <div className="min-h-screen bg-white">
 
//       {/* Hero Section */}
//       <section
//         className="relative h-96 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20in%20modern%20office%20setting%2C%20industrial%20excellence%20recognition%20with%20Korean%20flag%20and%20manufacturing%20facility%20background%2C%20trust%20and%20reliability%20symbols&width=1200&height=400&seq=certification-hero&orientation=landscape')`
//         }}
//       >
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white max-w-4xl px-4">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               인증
//             </h1>
//             <p className="text-xl md:text-2xl">
//               국가가 인정한 기술력과 신뢰성을 바탕으로 혁신을 선도합니다
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-16 px-4">
//         <div className="max-w-6xl mx-auto">

//           {/* Overview */}
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//               금화레이저(주)의 공식 인증 현황
//             </h2>
//             <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
//               금화레이저는 뿌리기업, 벤처기업, 기업부설 연구전담부서 인증을 통해 
//               技術力과 혁신성을 공식적으로 인정받은 신뢰할 수 있는 기업입니다.
//             </p>
//           </div>

//           {/* Section 1: 뿌리기업 확인서 인증 */}
//           <div className="mb-20">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 뿌리기업 확인서 인증
//               </h2>
//               <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
//                 산업통상자원부가 지정하는 "뿌리산업" 중 금속가공 기술 분야의 핵심 제조 기업으로 공식 확인받았습니다.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-blue-50 p-6 rounded-lg">
//                 <h3 className="text-xl font-bold text-purple-800 mb-4">인증 개요</h3>
//                 <div className="space-y-3">
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정기관:</span>
//                     <span className="text-gray-600">한국산업기술진흥협회 (KOITA)</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정번호:</span>
//                     <span className="text-gray-600">제20240011호</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정일자:</span>
//                     <span className="text-gray-600">2024.01.15</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">유효기간:</span>
//                     <span className="text-gray-600">2027.01.14</span>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <h4 className="font-semibold text-purple-800 mb-3">주요 연구 분야</h4>
//                   <ul className="space-y-2 text-gray-600">
//                     <li>• 레이저 절단 기술 고도화 연구</li>
//                     <li>• 정밀 가공 공정 최적화 연구</li>
//                     <li>• 소재별 가공 조건 표준화 연구</li>
//                     <li>• 자동화 시스템 개발 연구</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="flex justify-center items-center">
//                 <img
//                   src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/9c136d6504724aafc2e453a82c6c0fe9.png"
//                   alt="뿌리기업 확인서"
//                   className="max-w-full h-auto rounded-lg shadow-lg"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Section 2: 벤처기업 인증 */}
//           <div className="mb-20">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 벤처기업 인증
//               </h2>
//               <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
//                 벤처기업 인증을 받아 기술 혁신 활동을 수행하고 있습니다.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 {/* 주요 기술 요약 */}
//                 <div className="bg-green-50 p-6 rounded-lg">
//                   <h3 className="text-xl font-bold text-green-800 mb-4">주요 기술 요약</h3>
//                   <div className="space-y-3">
//                     <p className="text-gray-700 font-semibold">고품질 레이저 가공 및 자동 수거 시스템 개발</p>
//                     <ul className="space-y-2 text-gray-600">
//                       <li>• 레이저 절단 중 발생하는 금속조각과 스패터를 레이저 헤드의 이동과 연동하여 자동으로 수거</li>
//                       <li>• 회전 블레이드, 망 트레이, 슬라이딩 수거함 등 모듈화 구성</li>
//                       <li>• 수거율 90% 이상, 생산성 30% 향상</li>
//                       <li>• 국내 최초 특허기반 연동형 시스템</li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* 기술 적용 분야 */}
//                 <div className="bg-green-50 p-6 rounded-lg">
//                   <h3 className="text-xl font-bold text-green-800 mb-4">기술 적용 분야</h3>
//                   <div className="flex flex-wrap gap-2">
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">전자부품</span>
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">자동차</span>
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">디스플레이</span>
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">방산</span>
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">정밀가공</span>
//                   </div>
//                 </div>
//               </div>

//               {/* 벤처기업 확인서 이미지 */}
//               <div className="flex justify-center items-center">
//                 <img
//                   // src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/7f99d9490d84963100acf385675356a7.png"
//                   src="/certifications/벤처기업확인서.jpg"
//                   alt="벤처기업 확인서"
//                   className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Section 3: 기업부설 연구전담부서 인증 */}
//           <div className="mb-20">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 기업부설 연구전담부서 인증
//               </h2>
//               <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
//                 기업부설 연구전담부서 인증을 받아 레이저 절단 기술 고도화 활동을 수행하고 있습니다.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-purple-50 p-6 rounded-lg">
//                 <h3 className="text-xl font-bold text-purple-800 mb-4">인증 개요</h3>
//                 <div className="space-y-3">
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정기관:</span>
//                     <span className="text-gray-600">한국산업기술진흥협회 (KOITA)</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정번호:</span>
//                     <span className="text-gray-600">제20240011호</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">인정일자:</span>
//                     <span className="text-gray-600">2024.01.15</span>
//                   </div>
//                   <div className="flex">
//                     <span className="font-semibold text-gray-700 w-24">유효기간:</span>
//                     <span className="text-gray-600">2027.01.14</span>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <h4 className="font-semibold text-purple-800 mb-3">주요 연구 분야</h4>
//                   <ul className="space-y-2 text-gray-600">
//                     <li>• 레이저 절단 기술 고도화 연구</li>
//                     <li>• 정밀 가공 공정 최적화 연구</li>
//                     <li>• 소재별 가공 조건 표준화 연구</li>
//                     <li>• 자동화 시스템 개발 연구</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="flex justify-center items-center">
//                 <img
//                   src="/certifications/연구개발전담부서인정서.jpg"
//                   alt="기업부설 연구전담부서 인증서"
//                   className="max-w-full h-auto rounded-lg shadow-lg"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 종합 성과 */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
//             <h3 className="text-3xl font-bold mb-6">금화레이저의 인증 성과</h3>
//             <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-8">
//               뿌리기업, 벤처기업, 기업부설 연구전담부서 인증을 통해 입증된 금화레이저의 기술력과 혁신성은 
//               대한민국 제조업 발전에 기여하며, 지속적인 연구개발을 통해 미래 산업을 선도해 나가겠습니다.
//             </p>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="bg-white bg-opacity-20 p-4 rounded-lg">
//                 <div className="text-2xl font-bold mb-2">국가 인증</div>
//                 <div className="text-sm">뿌리기업 공식 확인</div>
//               </div>
//               <div className="bg-white bg-opacity-20 p-4 rounded-lg">
//                 <div className="text-2xl font-bold mb-2">혁신 기술</div>
//                 <div className="text-sm">벤처기업 인증 보유</div>
//               </div>
//               <div className="bg-white bg-opacity-20 p-4 rounded-lg">
//                 <div className="text-2xl font-bold mb-2">체계적 연구</div>
//                 <div className="text-sm">전담 연구부서 운영</div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// }
