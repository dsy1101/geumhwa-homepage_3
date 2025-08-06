'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// 서비스 아코디언 항목 데이터
const accordionItems = [
  {
    title: '정밀 절단 서비스',
    content:
      '레이저 기술을 활용한 고정밀 금속 절단 서비스로, 복잡한 형상도 정밀하게 가공 가능합니다.',
  },
  {
    title: '맞춤형 설계 지원',
    content:
      '고객 요구에 맞는 설계부터 시제품 제작까지 One-Stop 맞춤형 솔루션을 제공합니다.',
  },
  {
    title: '대량 생산 대응',
    content:
      '자동화 시스템을 통해 대량 주문에도 신속하고 일관된 품질로 대응합니다.',
  },
];

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]) as React.MutableRefObject<(HTMLDivElement | null)[]>;
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크롤 시 다음 아코디언으로 자동 전환 (IntersectionObserver 기반)
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.8, // 내용 80% 이상 보이면 active 처리
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = contentRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) setActiveIndex(index);
        }
      });
    }, observerOptions);

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto space-y-4 px-4 overflow-y-auto max-h-[90vh]"
    >
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg bg-white shadow"
        >
          {/* 아코디언 제목 영역 */}
          <button
            onClick={() => setActiveIndex(index)}
            className="w-full flex justify-between items-center p-4 focus:outline-none"
          >
            <span className="text-lg font-semibold text-left">
              {item.title}
            </span>
            <motion.span
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.span>
          </button>

          {/* 아코디언 내용 영역 */}
          <div
            ref={(el: HTMLDivElement | null) => {
                contentRefs.current[index] = el;
            }}

            className={`transition-all duration-500 px-4 overflow-hidden ${
              activeIndex === index ? 'max-h-40 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'
            }`}
          >
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
