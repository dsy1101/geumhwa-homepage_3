
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TechnologyPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const technologySections = [
    {
      id: 'laser',
      title: '레이저 가공',
      subtitle: '고출력 파이버 레이저 기반 정밀 절단',
      description: '0.1mm부터 25mm 이상의 다양한 두께 금속 소재를 ±0.1mm 정밀도로 절단하는 고출력 파이버 레이저 및 CO₂ 레이저 시스템',
      features: [
        '고출력 파이버 레이저 시스템',
        '±0.1mm 이하 정밀 제어',
        '다양한 두께 범위 대응',
        '고반사 소재 전용 절단 조건'
      ],
      image: 'https://readdy.ai/api/search-image?query=advanced%20high-power%20fiber%20laser%20cutting%20system%20in%20operation%20with%20precision%20metal%20cutting%2C%20modern%20industrial%20laser%20equipment%20with%20automated%20positioning%20and%20sparks%20flying%20from%20cutting%20process%2C%20clean%20high-tech%20manufacturing%20environment%20with%20professional%20laser%20technology&width=600&height=500&seq=laser-tech1&orientation=landscape'
    },
    {
      id: 'products',
      title: '제품',
      subtitle: '다양한 산업 분야 맞춤형 제품 공급',
      description: '산업용 부품부터 자동차·방산, 2차전지 장비, 주문제작까지 고객의 요구사항에 최적화된 정밀 가공 제품을 제공합니다',
      features: [
        '산업기계용 정밀 부품',
        '자동차·방산 부품',
        '2차전지 장비 부품',
        '맞춤형 제작 서비스'
      ],
      image: 'https://readdy.ai/api/search-image?query=diverse%20precision%20metal%20products%20and%20components%20for%20various%20industries%20including%20automotive%2C%20defense%2C%20battery%20equipment%20and%20custom%20manufacturing%2C%20professional%20display%20of%20finished%20metal%20parts%20with%20clean%20industrial%20background%2C%20variety%20of%20precision%20manufactured%20products&width=600&height=500&seq=products-tech1&orientation=landscape'
    },
    {
      id: 'process',
      title: '공정',
      subtitle: '체계적 품질 관리 시스템',
      description: '설계부터 납품까지 완벽한 品質 관리 시스템을 통해 고객이 신뢰할 수 있는 최고 品質의 제품을 제공합니다',
      features: [
        '이중 검사 체계',
        '정밀 측정 장비 활용',
        '품질 이력 관리',
        '지속적 개선 시스템'
      ],
      image: 'https://readdy.ai/api/search-image?query=systematic%20quality%20control%20and%20manufacturing%20process%20with%20professional%20quality%20inspection%2C%20precision%20measurement%20equipment%20and%20quality%20assurance%20procedures%2C%20clean%20organized%20manufacturing%20facility%20with%20quality%20control%20documentation%20and%20testing%20equipment&width=600&height=500&seq=process-tech1&orientation=landscape'
    },
    {
      id: 'capability',
      title: '기술력',
      subtitle: '기술 중심 제조 파트너',
      description: '독자적인 기술 개발과 지속적인 연구개발을 통해 고객에게 최적화된 솔루션을 제공하는 기술 중심企業입니다',
      features: [
        '企業부설연구소 운영',
        '특허 보유 자동 수거 시스템',
        '벤처企業 인증',
        '벤처企業 지정'
      ],
      image: 'https://readdy.ai/api/search-image?query=advanced%20research%20and%20development%20facility%20with%20professional%20engineers%20working%20on%20innovative%20laser%20cutting%20technology%2C%20corporate%20R%26D%20laboratory%20with%20high-tech%20equipment%20and%20patent%20development%2C%20modern%20technology%20center%20with%20research%20team%20and%20technical%20innovation&width=600&height=500&seq=capability-tech1&orientation=landscape'
    }
  ];

  useEffect(() => {
    let isScrolling = false;
    // let scrollTimeout;
    let scrollTimeout: ReturnType<typeof setTimeout>; 

    const handleWheel = (e: WheelEvent) => {
      const technologySection = document.getElementById('technology-section');
      if (!technologySection) return;

      const rect = technologySection.getBoundingClientRect();
      const isInTechnologySection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInTechnologySection) {
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

        const direction = e.deltaY > 0 ? 1 : -1;
        const maxSteps = technologySections.length - 1;

        setScrollStep(prev => {
          const newStep = Math.max(0, Math.min(maxSteps, prev + direction));
          if (newStep === maxSteps && direction > 0) {
            setTimeout(() => {
              window.scrollTo({
                top: technologySection.offsetTop + technologySection.offsetHeight,
                behavior: 'smooth'
              });
            }, 300);
          }
          return newStep;
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getCurrentSection = () => {
    return technologySections[scrollStep];
  };

  const currentSection = getCurrentSection();

  return (
    <div className="min-h-screen bg-white">
      {/* Header
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
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">기술 및 서비스</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              고출력 파이버 레이저 기반의 정밀 절단 기술부터 체계적인 品質 관리까지
              완벽한 기술 솔루션을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black text-center">기술 및 서비스</h1>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology-section" className="h-screen bg-gray-50 overflow-hidden">
        <div className="h-full flex">
          {/* Left Content */}
          <div className="w-1/2 flex flex-col justify-center px-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {currentSection.title}
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {currentSection.subtitle}
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {currentSection.description}
              </p>
              <div className="space-y-4">
                {currentSection.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <i className="ri-check-line text-blue-600 text-xl mr-4"></i>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href={`/technology/${currentSection.id}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>

          {/* Right Navigation & Image */}
          <div className="w-1/2 relative">
            {/* Technology Services Content */}
            <div className="grid grid-cols-5 h-full">
              {/* Image Area */}
              <div className="col-span-2 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out bg-gray-300"
                  style={{ backgroundImage: `url(${currentSection.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>
              </div>

              {/* Content Area */}
              <div className="col-span-3 p-12 flex flex-col bg-white h-full overflow-y-auto">
                {/* Section Title */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-black">기술 및 서비스</h2>
                </div>

                {technologySections.map((section, index) => (
                  <div key={section.id} className="border-b border-gray-200 pb-2">
                    <button className="flex items-start space-x-6 w-full text-left">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                        scrollStep === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}>
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                          scrollStep === index ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {section.title}
                        </h3>
                        <p className="text-gray-700 text-lg">{section.subtitle}</p>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      scrollStep === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {section.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {section.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center p-2 bg-white rounded">
                              <i className="ri-check-line text-blue-600 mr-2"></i>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              통합 기술 서비스
            </h2>
            <p className="text-xl text-gray-600">
              설계부터 납품까지 원스톱 솔루션 제공
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologySections.map((section, index) => (
              <div key={section.id} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <i className={`ri-${section.id === 'laser' ? 'focus-3' : section.id === 'products' ? 'box' : section.id === 'process' ? 'settings-3' : 'lightbulb'}-line text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{section.title}</h3>
                <p className="text-gray-600 text-center mb-6">{section.subtitle}</p>
                <div className="text-center">
                  <Link
                    href={`/technology/${section.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            기술 서비스 문의
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            고객의 요구사항에 최적화된 기술 솔루션을 제공해드립니다
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
  );
}
