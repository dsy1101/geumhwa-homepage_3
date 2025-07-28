
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CertificationPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); // ✅


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
              국가가 인정한 뿌리기업의 기술력과 신뢰성
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section 1: 뿌리기업 확인서 취득 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                뿌리기업 확인서 취득: 제조업의 핵심을 증명하다
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저(주)는 산업통상자원부가 지정하는 "뿌리산업" 중 금속가공 기술 분야의 핵심 제조 기업으로 공식 확인받았습니다. 
                이는 금화레이저가 대한민국 제조업 발전에 필수적인 기초 공정 기술력을 보유하고 있음을 국가적으로 인정받은 결과입니다.
              </p>
            </div>

            <div className="text-center mb-12">
              <img
                src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/9c136d6504724aafc2e453a82c6c0fe9.png"
                alt="뿌리기업 확인서"
                className="max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Section 2: 뿌리산업이란? */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                뿌리산업이란? 제조업 성장의 근간
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                뿌리산업은 주조, 금형, 소성가공, 용접, 열처리, 표면처리 등 제품 생산의 기반이 되는 6대 기초 공정 기술을 의미합니다. 
                이는 자동차, 조선, IT 등 모든 제조업의 최종 제품에 내재되어 품질 경쟁력을 좌우하는 '뿌리'와 같은 필수 공정입니다.
              </p>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">뿌리산업의 중요성</h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                뿌리산업의 기술력이 곧 국가 제조업의 경쟁력이라 할 수 있습니다. 
                모든 제조업 제품의 품질과 성능을 결정하는 핵심 기반 기술입니다.
              </p>
            </div>
          </div>

          {/* Section 3: 금화레이저의 뿌리기술 역량 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                금화레이저(주)의 뿌리기술 역량
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저는 정밀 레이저 절단 전문 기업으로서, 뿌리산업 중 금속가공 기술 분야에서 독보적인 역량을 발휘합니다.
              </p>
            </div>

            <div className="space-y-12">

              {/* 다양한 금속 가공 전문성 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">다양한 금속 가공 전문성</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      철, 알루미늄, 스테인리스 등 광범위한 금속을 고출력 레이저를 통해 정밀하게 절단 및 가공합니다.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">철강 (Steel) - 일반 구조용 강재, 고장력 강판</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">스테인리스 (Stainless Steel) - 내부식성 및 내열성 부품</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">알루미늄 (Aluminum) - 경량화 및 정밀 가공 부품</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">특수 금속 - 구리, 티타늄 등 고난도 절단 소재</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://readdy.ai/api/search-image?query=Various%20metal%20materials%20including%20steel%2C%20stainless%20steel%2C%20aluminum%20and%20special%20metals%20arranged%20professionally%20for%20laser%20cutting%20process%2C%20different%20metal%20sheets%20and%20plates%20with%20various%20thicknesses%2C%20clean%20industrial%20material%20preparation%20area&width=500&height=400&seq=metal-materials&orientation=landscape"
                      alt="다양한 금속 소재"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 유연한 생산 대응 */}
              <div className="bg-gray-50 rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src="https://readdy.ai/api/search-image?query=Flexible%20manufacturing%20system%20with%20both%20small%20batch%20and%20mass%20production%20capabilities%2C%20automated%20laser%20cutting%20equipment%20handling%20various%20production%20volumes%2C%20efficient%20production%20line%20with%20quality%20control%20stations%20and%20material%20handling%20systems&width=500&height=400&seq=flexible-production&orientation=landscape"
                      alt="유연한 생산 대응"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">유연한 생산 대응</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      다품종 소량 생산부터 고정밀 대량 생산까지, 고객의 어떠한 요구에도 유연하게 대응할 수 있는 공정 역량을 갖추고 있습니다.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-600 mb-2">다품종 소량 생산</h4>
                        <p className="text-sm text-gray-600">다양한 제품을 소량으로 정밀하게 생산</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-600 mb-2">고정밀 대량 생산</h4>
                        <p className="text-sm text-gray-600">일정한 품질로 대량 생산 시스템 운영</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 일괄 제조 공정 체계 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">일괄 제조 공정 체계</h3>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    설계부터 소재 준비, 정밀 절단, 후가공, 그리고 철저한 품질 검사에 이르기까지 모든 제조 과정을 체계적으로 관리하여, 
                    고정밀 형상 및 복합 구조물 가공에 대한 탁월한 실적과 노하우를 축적해왔습니다.
                  </p>
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-edit-line text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">설계</h4>
                    <p className="text-xs text-gray-600">정밀 설계 및 최적화</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-inbox-line text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">소재 준비</h4>
                    <p className="text-xs text-gray-600">품질 kiểm사 및 전처리</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-scissors-cut-line text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">정밀 절단</h4>
                    <p className="text-xs text-gray-600">레이저 정밀 가공</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-tools-fill text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">후가공</h4>
                    <p className="text-xs text-gray-600">마무리 가공 처리</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-search-line text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">품질 검사</h4>
                    <p className="text-xs text-gray-600">철저한 최종 검수</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=Comprehensive%20manufacturing%20process%20flow%20in%20modern%20laser%20cutting%20facility%2C%20systematic%20workflow%20from%20design%20to%20quality%20inspection%2C%20integrated%20production%20system%20with%20CAD%20design%2C%20material%20preparation%2C%20laser%20cutting%2C%20post-processing%20and%20quality%20control%20stations&width=800&height=300&seq=manufacturing-process&orientation=landscape"
                    alt="일괄 제조 공정"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* 산업 기여도 */}
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">국가 산업 발전 기여</h3>
                  <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                    금화레이저는 이러한 뿌리기술 역량을 바탕으로 자동차 부품, 산업 기계, 방산, 전자 부품 등 다양한 산업에 
                    신뢰할 수 있는 고품질 가공 부품을 공급하며, 지역 산업 생태계와도 긴밀히 연계된 대표적인 뿌리기업으로서 
                    국가 산업 발전에 기여하고 있습니다.
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-car-line text-xl text-white"></i>
                    </div>
                    <h4 className="font-semibold">자동차 부품</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-settings-line text-xl text-white"></i>
                    </div>
                    <h4 className="font-semibold">산업 기계</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-shield-star-line text-xl text-white"></i>
                    </div>
                    <h4 className="font-semibold">방산</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="ri-computer-line text-xl text-white"></i>
                    </div>
                    <h4 className="font-semibold">전자 부품</h4>
                  </div>
                </div>
              </div>
            </div>

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
        </div>
      </section>
    </div>
  );
}
