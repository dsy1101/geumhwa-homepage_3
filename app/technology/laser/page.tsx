'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LaserProcessingPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);


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

  const materials = [
    { name: '철 (SS41, SPHC 등)', description: '일반 구조용 강판, 열간압연강판', icon: 'ri-hammer-line' },
    { name: '스테인리스 (STS304, 316 등)', description: '내식성 스테인리스강', icon: 'ri-shield-line' },
    { name: '알루미늄 (AL5052, AL6061 등)', description: '경량 알루미늄 합금', icon: 'ri-drop-line' },
    { name: '구리, 티타늄, 아연 등', description: '특수 금속 소재', icon: 'ri-star-line' }
  ];

  const features = [
    { title: '정밀도 우선 가공', description: '±0.1mm 이내의 정밀 치수 대응', icon: 'ri-focus-3-line' },
    { title: '버(Burr) 최소화', description: '후처리 대응 가능한 깨끗한 절단면', icon: 'ri-scissors-line' },
    { title: '자동 위치 보정', description: '경로 추적을 통한 고속·고정밀 절단', icon: 'ri-navigation-line' },
    { title: 'CAD/CAM 최적화', description: '고객 도면 기반 NC 경로 최적화', icon: 'ri-settings-3-line' }
  ];

  const applications = [
    { title: '전자부품/정밀기기', description: '외곽 절단 및 정밀 가공', image: 'https://readdy.ai/api/search-image?query=precision%20electronic%20components%20and%20circuit%20boards%20manufactured%20by%20laser%20cutting%20technology%2C%20small%20intricate%20metal%20parts%20for%20electronic%20devices%20with%20clean%20edges%2C%20high-tech%20manufacturing%20environment%20with%20modern%20equipment&width=400&height=300&seq=elec1&orientation=landscape' },
    { title: '자동차·방산 부품', description: '정밀 절단 및 형상 가공', image: 'https://readdy.ai/api/search-image?query=automotive%20and%20military%20defense%20metal%20components%20manufactured%20by%20laser%20cutting%2C%20precision%20car%20engine%20parts%20and%20defense%20industry%20components%20made%20from%20steel%20and%20aluminum%2C%20professional%20manufacturing%20setting&width=400&height=300&seq=auto2&orientation=landscape' },
    { title: '2차전지 부품', description: '산업기계 구조물 절단', image: 'https://readdy.ai/api/search-image?query=battery%20components%20and%20industrial%20machinery%20structural%20parts%20made%20by%20laser%20cutting%20technology%2C%20precision%20metal%20parts%20for%20energy%20storage%20systems%20and%20industrial%20equipment%2C%20clean%20manufacturing%20environment&width=400&height=300&seq=battery1&orientation=landscape' },
    { title: '커스터마이징 제작', description: '캠핑용 화로, 파렛트 보관대 등', image: 'https://readdy.ai/api/search-image?query=custom%20metal%20products%20like%20camping%20fire%20pits%20and%20pallet%20storage%20racks%20manufactured%20by%20laser%20cutting%2C%20various%20custom%20metal%20fabrication%20products%20with%20clean%20industrial%20background%2C%20versatile%20manufacturing%20capabilities&width=400&height=300&seq=custom1&orientation=landscape' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/f961bea3ffc98767631d59484c4ff812.png"
                  alt="금화레이저 로고"
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-bold transition-colors duration-200"
                  >
                    {item.title}
                  </Link>

                  {item.dropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-blue-600 rounded-md shadow-lg overflow-hidden">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-white hover:bg-blue-700 transition-colors duration-200"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <button className="md:hidden">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">레이저 가공 기술</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              고출력 파이버 레이저 및 CO₂ 레이저 기반의 정밀 절단 기술로 
              다양한 금속 소재의 복잡한 형상 가공을 구현합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/quote"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                견적 문의
              </Link>
              <Link
                href="/technology"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                기술 정보
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Technology Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                주요 가공 기술 개요
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-focus-3-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">고출력 파이버 레이저 시스템</h3>
                    <p className="text-gray-600">
                      최신 파이버 레이저 및 CO₂ 레이저 기반의 정밀 절단 시스템으로 
                      다양한 금속 소재의 고정밀 가공이 가능합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-ruler-2-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">다양한 두께 대응</h3>
                    <p className="text-gray-600">
                      0.1mm부터 25mm 이상의 다양한 두께 금속 소재 절단이 가능하며, 
                      복잡한 형상도 정밀하게 가공할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">고반사 재질 대응</h3>
                    <p className="text-gray-600">
                      고반사 재질과 얇은 판재에 대한 고정밀 대응이 가능하며, 
                      고속 절단과 동시에 열변형을 최소화합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-speed-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">고속 절단 기술</h3>
                    <p className="text-gray-600">
                      고속 절단 및 열변형 최소화 절단 조건 기술을 보유하여 
                      빠르고 정확한 가공이 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20high-power%20fiber%20laser%20equipment%20cutting%20thick%20metal%20sheets%2C%20advanced%20laser%20cutting%20technology%20with%20precision%20machinery%20and%20sparks%20flying%20from%20cutting%20process%2C%20clean%20high-tech%20manufacturing%20environment&width=600&height=500&seq=laser1&orientation=landscape"
                alt="레이저 가공 시설"
                className="w-full rounded-lg shadow-lg object-cover"
              />
              <div className="absolute top-6 right-6 bg-white rounded-lg px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">±0.1mm</div>
                <div className="text-sm text-gray-600">정밀도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Materials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              대응 가능한 금속 소재
            </h2>
            <p className="text-xl text-gray-600">
              다양한 금속 소재의 특성을 고려한 최적화된 가공 조건을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <i className={`${material.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-4">{material.name}</h3>
                <p className="text-gray-600 text-sm">{material.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">소재별 특화 가공</h3>
                <p className="text-gray-600 mb-6">
                  각 소재의 물리적 특성을 고려한 최적화된 레이저 출력, 절단 속도, 
                  가스 조건을 적용하여 최상의 절단 품질을 보장합니다.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    재질별 맞춤 절단 조건
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    열변형 최소화 기술
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    산화물 및 버(Burr) 제거
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=various%20metal%20materials%20including%20steel%2C%20stainless%20steel%2C%20aluminum%2C%20copper%2C%20and%20titanium%20sheets%20ready%20for%20laser%20cutting%2C%20organized%20display%20of%20different%20metal%20types%20with%20clean%20industrial%20background%2C%20material%20preparation%20area&width=500&height=400&seq=materials1&orientation=landscape"
                  alt="다양한 금속 소재"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processing Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              주요 가공 특징
            </h2>
            <p className="text-xl text-gray-600">
              고객의 요구사항을 정확히 충족하는 정밀 가공 기술
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              레이저 가공의 차별화 포인트
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">항목</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">금화레이저</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">절단 정밀도</td>
                    <td className="py-4 px-6 text-gray-700">고정밀 CNC + 고출력 레이저 조합</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">절단 품질</td>
                    <td className="py-4 px-6 text-gray-700">버, 산화물 최소화</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">대응 소재</td>
                    <td className="py-4 px-6 text-gray-700">고강도·고반사 소재까지 대응</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">대응 범위</td>
                    <td className="py-4 px-6 text-gray-700">단품, 소량~다품종 유연 대응</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              레이저 가공 응용 분야
            </h2>
            <p className="text-xl text-gray-600">
              다양한 산업 분야에서 활용되는 정밀 레이저 가공 기술
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${app.image})` }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{app.title}</h3>
                  <p className="text-gray-600">{app.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                커스터마이징 제작 서비스
              </h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                고객의 특별한 요구사항에 맞춘 맞춤형 제작 서비스를 제공합니다. 
                캠핑용 화로, 파렛트 보관대 등 다양한 용도의 제품을 정밀하게 가공해드립니다.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">캠핑용 화로</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">파렛트 보관대</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">산업용 구조물</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">맞춤형 부품</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            정밀 레이저 가공 서비스 문의
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            고객의 요구사항에 최적화된 레이저 가공 솔루션을 제공해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/quote"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              견적 문의하기
            </Link>
            <Link
              href="/support/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              문의하기
            </Link>
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
                레이저 기반의 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조기업
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