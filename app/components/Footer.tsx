'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-pacifico">금화레이저</h3>
            <p className="text-gray-400 mb-4">
              레이저 기반의 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조企業
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">회사소개</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/company" className="hover:text-white">회사개요</Link></li>
              <li><Link href="/company/business" className="hover:text-white">사업영역</Link></li>
              <li><Link href="/company/certification" className="hover:text-white">인증</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">기술 및 서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/technology/laser" className="hover:text-white">레이저 가공</Link></li>
              <li><Link href="/products/main" className="hover:text-white">제품</Link></li>
              <li><Link href="/technology/process" className="hover:text-white">공정</Link></li>
              <li><Link href="/technology/capability" className="hover:text-white">기술력</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-gray-400">
              {/* <li><Link href="/support/quote" className="hover:text-white">견적문의</Link></li> */}
              <li><Link href="/support/contact" className="hover:text-white">문의하기</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 금화레이저(주). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
