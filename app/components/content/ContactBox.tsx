// components/content/ContactBox.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactBox() {
  return (
    <div className="max-w-2xl">
      {/* 제목 */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        지금 바로 견적을 요청하세요
      </h2>

      {/* 설명 */}
      <p className="text-xl text-gray-600 mb-8">
        전문적인 레이저 가공 서비스로 고객의 요구사항을 완벽하게 충족시켜드립니다.
      </p>

      {/* 버튼 그룹 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/support/quote"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap text-center"
        >
          견적 문의하기
        </Link>
        <Link
          href="/technology"
          className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors whitespace-nowrap text-center"
        >
          기술 정보 보기
        </Link>
      </div>
    </div>
  );
}
