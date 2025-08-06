// React 및 필요한 훅들 import
import React, { useEffect, useRef } from 'react';

// 아코디언 항목 목록 (타이틀, 서브타이틀, 내용 포함)
const accordionItems = [
  {
    title: '기업개요2', // 아코디언 제목
    subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조기업', // 부제목
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

// 컴포넌트 정의: 아코디언 UI 렌더링
export default function CompanyAccordion({
  companyAccordion, // 현재 펼쳐진 아코디언 인덱스
  setCompanyAccordion, // 아코디언 변경을 위한 setter 함수
}: {
  companyAccordion: number;
  setCompanyAccordion: (index: number) => void;
}) {
  // 현재 열려 있는 아코디언의 내부 스크롤 영역 DOM을 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 🔁 아코디언 내용이 스크롤 끝까지 내려가면 자동으로 다음 아코디언으로 이동
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // 스크롤이 거의 맨 아래에 도달했는지 확인 (10px 오차 허용)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom && companyAccordion < accordionItems.length - 1) {
        setCompanyAccordion(companyAccordion + 1); // 다음 아코디언 열기
        container.scrollTo({ top: 0 }); // 스크롤 위치 초기화
      }
    };

    // scroll 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거 (메모리 누수 방지)
    return () => container.removeEventListener('scroll', handleScroll);
  }, [companyAccordion, setCompanyAccordion]);

  return (
    <div className="space-y-6">
      {/* 아코디언 항목들 반복 렌더링 */}
      {accordionItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-2">
          {/* 아코디언 제목 버튼 */}
          <button
            onClick={() => setCompanyAccordion(index)} // 클릭 시 해당 항목으로 전환
            className="flex items-start space-x-6 w-full text-left"
          >
            {/* 인디케이터 동그라미 */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 transition-colors ${
                companyAccordion === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <i className="ri-check-line text-white text-xs"></i>
            </div>

            {/* 제목 & 서브텍스트 */}
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

          {/* 아코디언 내용 영역 */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              companyAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              // 현재 열려 있는 항목에만 ref 연결 (스크롤 감지를 위해)
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
