
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CompanyPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)


  const menuItems = [
    {
      title: "금화레이저",
      href: '/',
      dropdown: null
    },
    {
      title: '회사소개',
      href: '/company',
      dropdown: [
        { title: '회사개요', href: '/company' },
        { title: '사업영역', href: '/company/business' },
        { title: '인증', href: '/company/certification' }
      ]
    },
    {
      title: '기술 및 서비스',
      href: '/technology',
      dropdown: [
        { title: '레이저 가공', href: '/technology/laser' },
        { title: '제품', href: '/products/main' },
        { title: '공정', href: '/technology/process' },
        { title: '기술력', href: '/technology/capability' }
      ]
    },
    {
      title: '고객 지원',
      href: '/support',
      dropdown: [
        { title: '견적 문의', href: '/support/quote' },
        { title: '문의하기', href: '/support/contact' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Modern%20industrial%20laser%20cutting%20facility%20with%20precise%20metal%20fabrication%20equipment%2C%20clean%20industrial%20environment%20with%20metallic%20surfaces%20and%20advanced%20manufacturing%20machinery%2C%20professional%20lighting%20highlighting%20precision%20tools%20and%20workstations%2C%20blue%20and%20silver%20color%20scheme%20representing%20technology%20and%20precision&width=1200&height=400&seq=company-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              최고의 정밀함으로, 산업의 혁신을 이끄는 금화레이저(주).
            </h1>
          </div>
        </div>
      </section>

      {/* Company Overview Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              기술력과 신뢰로 일구는 레이저 정밀 가공의 미래
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조企業입니다.
                산업통상자원부가指定하는 '뿌리산업' 금속가공 분야의 핵심 기업으로서, 철강, 알루미늄 등 다양한 금속을
                고출력 레이저로 정밀 가공하여 최고 품질의 부품을 생산합니다.
              </p>
              <p>
                우리는 기계, 자동차, 방산 등 고부가가치 산업 분야에 필수적인 가공 서비스를 제공하며,
                최적화된 기술과 일괄 공정 체계를 통해 고객의 어떤 요구에도 유연하게 대응합니다.
                '신뢰와 혁신'을 바탕으로 고객과 함께 성장하며 미래 산업을 선도해 나갈 것입니다.
              </p>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-700">년간 축적된 기술력</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">협력 파트너사</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-700">품질 만족도</div>
            </div>
          </div>

          {/* Company Values */}
          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              금화레이저의 핵심 가치
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Ultra-precise%20laser%20cutting%20equipment%20in%20action%2C%20cutting%20metal%20with%20microscopic%20accuracy%2C%20high-tech%20manufacturing%20precision%20technology%2C%20clean%20industrial%20environment%20with%20focused%20laser%20beam%20creating%20perfect%20cuts%20on%20metallic%20surfaces%2C%20blue%20and%20silver%20tones%20representing%20precision%20and%20technology&width=400&height=200&seq=precision-value&orientation=landscape"
                    alt="정밀함"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">정밀함</h4>
                <p className="text-gray-600">
                  최첨단 레이저 기술을 통해 미크론 단위의 정밀 가공을 실현합니다.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Quality%20control%20and%20certification%20process%20in%20modern%20manufacturing%20facility%2C%20professional%20engineers%20inspecting%20high-quality%20metal%20components%20with%20advanced%20measuring%20instruments%2C%20clean%20laboratory%20environment%20with%20quality%20assurance%20certificates%20and%20testing%20equipment%2C%20trustworthy%20industrial%20setting&width=400&height=200&seq=reliability-value&orientation=landscape"
                    alt="신뢰성"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">신뢰성</h4>
                <p className="text-gray-600">
                  검증된 품질 관리 시스템을 통해 일관된 고품질을 보장합니다.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Modern%20research%20and%20development%20laboratory%20with%20innovative%20laser%20technology%20equipment%2C%20scientists%20and%20engineers%20working%20on%20cutting-edge%20manufacturing%20solutions%2C%20bright%20futuristic%20workspace%20with%20advanced%20prototyping%20machines%20and%20blue%20lighting%2C%20high-tech%20innovation%20center%20with%20clean%20design%20and%20technological%20atmosphere&width=400&height=200&seq=innovation-lab-2024&orientation=landscape"
                    alt="혁신"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">혁신</h4>
                <p className="text-gray-600">
                  지속적인 연구개발을 통해 업계를 선도하는 기술력을 구축합니다.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20customer%20service%20meeting%20in%20modern%20industrial%20office%2C%20business%20professionals%20discussing%20manufacturing%20solutions%20with%20clients%2C%20collaborative%20workspace%20with%20metal%20samples%20and%20technical%20drawings%2C%20customer-focused%20service%20environment%20with%20handshake%20and%20partnership%20atmosphere&width=400&height=200&seq=customer-value&orientation=landscape"
                    alt="고객 중심"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">고객 중심</h4>
                <p className="text-gray-600">
                  고객의 요구사항을 정확히 파악하여 최적의 솔루션을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-pacifico">금화레이저</h3>
              <p className="text-gray-400 mb-4">
                레이저 기반의 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조企업
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">会社소개</h4>
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
                <li><Link href="/support/quote" className="hover:text-white">견적문의</Link></li>
                <li><Link href="/support/contact" className="hover:text-white">문의하기</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 금화레이저(주). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
