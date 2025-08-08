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