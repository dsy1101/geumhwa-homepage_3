
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CertificationPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); //

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
        { title: '事業영역', href: '/company/business' },
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

          {/* Section 1: 뿌리기업 확인서 취득 */}
          <div className="mb-20 bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-government-line text-2xl text-blue-600"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  뿌리기업 확인서 취득
                </h2>
              </div>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저(주)는 산업통상자원부가 지정하는 "뿌리산업" 중 금속가공 기술 분야의 핵심 제조 기업으로 공식 확인받았습니다. 
                이는 금화レイ저가 대한민국 제조업 발전에 필수적인 기초 공정 기술력을 보유하고 있음을 국가적으로 인정받은 결과입니다.
              </p>
            </div>

            <div className="text-center mb-12">
              <img
                src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/9c136d6504724aafc2e453a82c6c0fe9.png"
                alt="뿌리기업 확인서"
                className="max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">뿌리산업이란?</h3>
              <p className="text-gray-700 leading-relaxed">
                뿌리산업은 주조, 금형, 소성가공, 용접, 열처리, 표면처리 등 제품 생산의 기반이 되는 6대 기초 공정 기술을 의미합니다. 
                이는 자동차, 조선, IT 등 모든 제조업의 최종 제품에 내재되어 品質 경쟁력을 좌우하는 '뿌리'와 같은 필수 공정입니다.
              </p>
            </div>
          </div>

          {/* Section 2: 벤처기업 인증 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <i className="ri-award-line text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">벤처기업 인증 (혁신성장유형)</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* 주요 기술 요약 */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">주요 기술 요약</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700 font-semibold">고품질 레이저 가공 및 자동 수거 시스템 개발</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 레이저 절단 중 발생하는 금속조각과 스패터를 레이저 헤드의 이동과 연동하여 자동으로 수거</li>
                      <li>• 회전 블레이드, 망 트레이, 슬라이딩 수거함 등 모듈화 구성</li>
                      <li>• 수거율 90% 이상, 생산성 30% 향상</li>
                      <li>• 국내 최초 특허기반 연동형 시스템</li>
                    </ul>
                  </div>
                </div>

                {/* 기술 적용 분야 */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">기술 적용 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">전자부품</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">자동차</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">디스플레이</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">방산</span>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">정밀가공</span>
                  </div>
                </div>
              </div>

              {/* 벤처기업 확인서 이미지 */}
              <div className="flex justify-center items-center">
                <img
                  src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/7f99d9490d84963100acf385675356a7.png"
                  alt="벤처기업 확인서"
                  className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Section 3: 기업부설 연구전담부서 인증 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-l-4 border-purple-500 p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mr-6">
                  <i className="ri-microscope-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">기업부설 연구전담부서 인증</h3>
                  <p className="text-lg text-gray-600">금화레이저 기업부설 연구전담부서</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/7f99d9490d84963100acf385675356a7.png" 
                    alt="기업부설 연구전담부서 인증서" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">부서 정보</h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="font-semibold text-gray-700 w-20">부서명:</span>
                      <span className="text-gray-600">금화레이저 기업부설 연구전담부서</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">조직 구성</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-user-star-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">연구소장</h4>
                    <p className="text-sm text-gray-600">기획/특허/프로젝트 총괄</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-drafting-compass-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">설계팀</h4>
                    <p className="text-sm text-gray-600">자동 수거장치 구조 설계</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-microscope-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">소재팀</h4>
                    <p className="text-sm text-gray-600">필터링 기술 연구</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-settings-3-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">장비팀</h4>
                    <p className="text-sm text-gray-600">자동화 механизмов</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-flask-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">테스트팀</h4>
                    <p className="text-sm text-gray-600">эксперименты, надёжность, оценка производительности</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-file-shield-line text-xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">특허팀</h4>
                    <p className="text-sm text-gray-600">подача и поддержание патентов</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">연구 목표</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span> 자동화된 레이저 가공</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>생산성과 성능 향상</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>경쟁력 있는 기술 보유</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: 벤처기업 인증 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                벤처기업 인증
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                기술력을 바탕으로 한 혁신적인 벤처기업으로 인정받아 지속적인 성장을 추진하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">주요 기술 요약</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <i className="ri-settings-4-line text-green-600 mr-2 mt-1"></i>
                    <span className="text-gray-600">고정밀 파이버 레이저 절단 기술</span>
                  </div>
                  <div className="flex items-start">
                    <i className="ri-computer-line text-green-600 mr-2 mt-1"></i>
                    <span className="text-gray-600">CAD/CAM 기반 자동화 시스템</span>
                  </div>
                  <div className="flex items-start">
                    <i className="ri-shield-check-line text-green-600 mr-2 mt-1"></i>
                    <span className="text-gray-600">품질관리 및 검사 시스템</span>
                  </div>
                  <div className="flex items-start">
                    <i className="ri-hammer-line text-green-600 mr-2 mt-1"></i>
                    <span className="text-gray-600">다양한 소재 가공 기술</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-green-800 mb-3">기술 적용 분야</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• 자동차 부품</div>
                    <div>• 산업 기계</div>
                    <div>• 방산 산업</div>
                    <div>• 전자 부품</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Korean%20venture%20business%20certification%20document%20with%20official%20government%20seal%20and%20registration%20details%2C%20professional%20certificate%20layout%20with%20Korean%20text%20and%20official%20stamps%2C%20clean%20document%20design%20with%20enterprise%20information%20and%20approval%20details&width=400&height=500&seq=venture-cert&orientation=portrait"
                  alt="벤처기업 확인서"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Section 4: 기업부설 연구전담부서 인증 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                기업부설 연구전담부서 인증
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                기업부설 연구전담부서 인정을 받아 기술 혁신 활동을 수행하고 있습니다.
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
                  src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/7f99d9490d84963100acf385675356a7.png"
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

      {/* Footer */}
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
                <li><Link href="/company/business" className="hover:text-white">事業영역</Link></li>
                <li><Link href="/company/certification" className="hover:text-white">인증</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">技術 및 서비스</h4>
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
