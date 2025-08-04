
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  // const [rightMenuActiveSection, setRightMenuActiveSection] = useState(0);
  const [rightMenuActiveSection, setRightMenuActiveSection] = useState<number | null>(0);
  const [technologyScrollStep, setTechnologyScrollStep] = useState(0);
  const [servicesScrollStep, setServicesScrollStep] = useState(0);
  // const [companyAccordion, setCompanyAccordion] = useState(null);
  // const [servicesAccordion, setServicesAccordion] = useState(null);
  const [companyAccordion, setCompanyAccordion] = useState<number | null>(0); // 또는 null
  const [servicesAccordion, setServicesAccordion] = useState<number | null>(0); // 또는 null

  const slides = [
    {
      image: "https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20metal%20fabrication%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology&width=1920&height=800&seq=hero1&orientation=landscape",
      title: "정밀 레이저 가공의 선도企業",
      subtitle: "신뢰할 수 있는 기술력으로 고품질 金속 가공 서비스를 제공합니다"
    },
    {
      image: "https://readdy.ai/api/search-image?query=advanced%20fiber%20laser%20cutting%20system%20in%20operation%20with%20sparks%20flying%20from%20metal%20cutting%20process%2C%20industrial%20automation%20equipment%20in%20clean%20manufacturing%20facility%2C%20high-precision%20metal%20fabrication%20with%20modern%20laser%20technology%2C%20professional%20manufacturing%20environment&width=1920&height=800&seq=hero2&orientation=landscape",
      title: "혁신적인 기술력",
      subtitle: "다양한 金속 소재의 복잡한 형상 가공이 가능합니다"
    },
    {
      image: "https://readdy.ai/api/search-image?query=precision%20metal%20parts%20and%20components%20manufactured%20by%20laser%20cutting%20technology%2C%20various%20stainless%20steel%20and%20aluminum%20products%20displayed%20on%20clean%20industrial%20surface%2C%20high-quality%20finished%20metal%20parts%20with%20perfect%20edges%2C%20professional%20product%20showcase&width=1920&height=800&seq=hero3&orientation=landscape",
      title: "품질과 정밀도",
      subtitle: "0.1mm~25mm 두께까지 변형 없는 고품질 가공 실현"
    }
  ];

  const sections = [
    {
      id: 'hero',
      component: 'HeroSection'
    },
    {
      id: 'company',
      component: 'CompanySection'
    },
    {
      id: 'services',
      component: 'ServicesSection'
    },
    {
      id: 'contact',
      component: 'ContactSection'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionIndex = Math.round(scrollY / window.innerHeight);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    // const handleWheel = (e) => {
    const handleWheel = (e: WheelEvent) => {

      e.preventDefault();
      const delta = e.deltaY;

      if (currentSection === 1) {
        // company 섹션에서의 특별한 처리
        if (delta > 0) {
          // 스크롤 다운
          if (technologyScrollStep < 2) {
            setTechnologyScrollStep(prev => prev + 1);
            setRightMenuActiveSection(technologyScrollStep + 1);
            setCompanyAccordion(technologyScrollStep + 1);
          } else {
            // 認證까지 完了 후 次のセクション으로 移動
            setCurrentSection(2);
            setTechnologyScrollStep(0);
            setRightMenuActiveSection(0);
            setServicesScrollStep(0);
            setCompanyAccordion(null);
            setServicesAccordion(0);
            window.scrollTo({
              top: 2 * window.innerHeight,
              behavior: 'smooth'
            });
          }
        } else {
          // 스크롤 업
          if (technologyScrollStep > 0) {
            setTechnologyScrollStep(prev => prev - 1);
            setRightMenuActiveSection(technologyScrollStep - 1);
            setCompanyAccordion(technologyScrollStep - 1);
          } else {
            // 이전 섹션으로 이동
            setCurrentSection(0);
            setCompanyAccordion(null);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
      } else if (currentSection === 2) {
        // services 섹션에서의 특별한 처리
        if (delta > 0) {
          // 스크롤 다운
          if (servicesScrollStep < 3) {
            setServicesScrollStep(prev => prev + 1);
            setServicesAccordion(servicesScrollStep + 1);
          } else {
            // 技术力까지 完了 후 次のセクション으로 移動
            setCurrentSection(3);
            setServicesScrollStep(0);
            setServicesAccordion(null);
            window.scrollTo({
              top: 3 * window.innerHeight,
              behavior: 'smooth'
            });
          }
        } else {
          // 스크롤 업
          if (servicesScrollStep > 0) {
            setServicesScrollStep(prev => prev - 1);
            setServicesAccordion(servicesScrollStep - 1);
          } else {
            // 이전 섹션으로 이동
            setCurrentSection(1);
            setTechnologyScrollStep(0);
            setRightMenuActiveSection(0);
            setCompanyAccordion(0);
            setServicesAccordion(null);
            window.scrollTo({
              top: 1 * window.innerHeight,
              behavior: 'smooth'
            });
          }
        }
      } else {
        // 다른 섹션에서의 일반적인 처리
        const nextSection = delta > 0 ? Math.min(currentSection + 1, sections.length - 1) : Math.max(currentSection - 1, 0);

        if (nextSection !== currentSection) {
          setCurrentSection(nextSection);
          if (nextSection === 1) {
            setTechnologyScrollStep(0);
            setRightMenuActiveSection(0);
            setCompanyAccordion(0);
          }
          if (nextSection === 2) {
            setServicesScrollStep(0);
            setServicesAccordion(0);
            setCompanyAccordion(null);
          }
          window.scrollTo({
            top: nextSection * window.innerHeight,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, sections.length, technologyScrollStep, servicesScrollStep]);

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    if (sectionIndex === 1) {
      setTechnologyScrollStep(0);
      setRightMenuActiveSection(0);
      setCompanyAccordion(0);
    }
    if (sectionIndex === 2) {
      setServicesScrollStep(0);
      setServicesAccordion(0);
      setCompanyAccordion(null);
    }
    window.scrollTo({
      top: sectionIndex * window.innerHeight,
      behavior: 'smooth'
    });
  };

  const toggleCompanyAccordion = (index: number) => {
    setCompanyAccordion(companyAccordion === index ? null : index);
  };

  const toggleServicesAccordion = (index: number) => {
    setServicesAccordion(servicesAccordion === index ? null : index);
  };

  // 헤더 드롭다운 메뉴 관련 함수들
  const handleHeaderMouseEnter = () => {
    // 헤더 영역에 마우스가 들어올 때는 특별한 처리가 필요하지 않음
  };

  const handleHeaderMouseLeave = () => {
    // 헤더 영역을 완전히 벗어났을 때 드롭다운 메뉴 닫기
    setActiveDropdown(null);
  };

  const handleMenuItemMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMenuItemMouseLeave = () => {
    // 메뉴 아이템에서 마우스가 벗어나도 바로 닫지 않음
    // 헤더 영역 전체를 벗어날 때만 닫힘
  };

  const handleDropdownMouseEnter = () => {
    // 드롭다운 메뉴에 마우스가 들어올 때는 메뉴 유지
  };

  const handleDropdownMouseLeave = () => {
    // 드롭다운 메뉴에서 마우스가 벗어나도 바로 닫지 않음
    // 헤더 영역 전체를 벗어날 때만 닫힘
  };

  return (
    <div className="h-screen bg-white">
      <main className="mt-20">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="relative h-full flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Company Section */}
      <section id="company" className="h-screen bg-gray-50 pt-20">
        <div className="w-full h-full">
          <div className="grid grid-cols-3 gap-0 items-stretch h-full">
            <div
              className="relative bg-cover bg-center bg-no-repeat h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
                  rightMenuActiveSection === 0
                    ? "https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape"
                    : rightMenuActiveSection === 1
                    ? "https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape"
                    : "https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape"
                })}`
              }}
            >
              <div className="p-12 flex flex-col justify-center text-white h-full">
                <div>
                  <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">최첨단 레이저 기술</h2>
                  <p className="text-base leading-relaxed max-w-sm mb-6">
                    고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
                  </p>
                  <Link
                    href="/technology"
                    className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
                  >
                    <span>기술 정보</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-2 p-12 flex flex-col justify-center bg-white h-full overflow-y-auto">
              {/*회사개요*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(0)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 0 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 0 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      公司개요
                    </h3>
                    <p className="text-gray-700 text-lg">최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조企業입니다.
                      20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를
                      고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">20+</div>
                        <div className="text-sm text-gray-600">년간 기술력</div>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">협력사</div>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-sm text-gray-600">품질 만족도</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*사업영역*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(1)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 1 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 1 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      사업영역
                    </h3>
                    <p className="text-gray-700 text-lg">다양한 금속 소재의 레이저 정밀 가공 전문 서비스</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서
                      정밀 레이저 가공 서비스를 제공하고 있습니다.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-car-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">자동차 부품</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-settings-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">산업 기계</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-shield-star-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">방산 산업</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-computer-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">전자 부품</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*인증*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(2)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 2 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 2 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      인증
                    </h3>
                    <p className="text-gray-700 text-lg">산업통상자원부 인정 뿌리企業으로서의 검증된 기술력</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조企業으로
                      공식 확인받았습니다.
                    </p>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                      <div className="flex items-center">
                        <i className="ri-award-line text-blue-600 text-2xl mr-3"></i>
                        <div>
                          <h4 className="font-semibold text-gray-900">뿌리企業 확인서</h4>
                          <p className="text-sm text-gray-600">산업통상자원부 인정企業</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Section
        <section id="company" className="min-h-screen bg-white">
        <div className="w-full h-full">
          <div className="grid grid-cols-5 gap-0 items-stretch h-full">
            <div
              className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${
                  rightMenuActiveSection === 0
                    ? "https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape"
                    : rightMenuActiveSection === 1
                    ? "https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape"
                    : rightMenuActiveSection === 2
                    ? "https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape"
                    : "https://readdy.ai/api/search-image?query=default%20image%20for%20company%20section%20with%20modern%20laser%20technology&width=600&height=500&seq=default-company&orientation=landscape"
                }')`,
                transition: 'background-image 0.3s ease-in-out',
              }}
            >
              <div className="p-12 flex flex-col justify-center text-white h-full">
                <div>
                  <p className="text-sm mb-3 font-medium tracking-wider">핵심 기술</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">최첨단 레이저 기술</h2>
                  <p className="text-base leading-relaxed max-w-sm mb-6">
                    고출력 파이버 레이저와 자동화 시스템을 통해 정밀하고 효율적인 금속 가공 서비스를 제공합니다.
                  </p>
                  <Link
                    href="/technology"
                    className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
                  >
                    <span>기술 정보</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="col-span-2 p-12 flex flex-col justify-center bg-white h-full overflow-y-auto"> */}
            {/* <div className="col-span-2 p-12 flex flex-col justify-center bg-white overflow-y-auto"> */}
            {/* <div className="col-span-2 p-12 flex flex-col justify-center bg-white h-screen"> */}
            {/* <div className="col-span-2 p-12 flex flex-col justify-center bg-white h-full">

              {/*회사개요*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(0)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 0 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 0 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      기업개요
                    </h3>
                    <p className="text-gray-700 text-lg">최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조기업</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      금화레이저(주)는 레이저 기반 금속 절단 및 정밀 가공 기술을 핵심 역량으로 하는 기술 중심 제조企業입니다.
                      20년 이상의 축적된 노하우와 최첨단 장비를 바탕으로 철강, 알루미늄, 스테인리스 등 다양한 금속 소재를
                      고출력 파이버 레이저로 정밀 가공하여 최고 품질의 부품을 생산하고 있습니다.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">20+</div>
                        <div className="text-sm text-gray-600">년간 기술력</div>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">협력사</div>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-sm text-gray-600">품질 만족도</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* 사업영역
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(1)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 1 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 1 ? 'text-blue-600' : 'text-gray-400'
                      }`} */}
                    >
                      {/* 사업영역
                    </h3>
                    <p className="text-gray-700 text-lg">다양한 금속 소재의 레이저 정밀 가공 전문 서비스</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서
                      정밀 레이저 가공 서비스를 제공하고 있습니다.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-car-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">자동차 부품</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-settings-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">산업 기계</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-shield-star-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">방산 산업</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-computer-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">전자 부품</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* 인증
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleCompanyAccordion(2)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      companyAccordion === 2 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        companyAccordion === 2 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      인증
                    </h3>
                    <p className="text-gray-700 text-lg">산업통상자원부 인정 뿌리기업으로서의 검증된 기술력</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    companyAccordion === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`} */}
                >
                  {/* <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조企業으로
                      공식 확인받았습니다.
                    </p>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                      <div className="flex items-center">
                        <i className="ri-award-line text-blue-600 text-2xl mr-3"></i>
                        <div>
                          <h4 className="font-semibold text-gray-900">뿌리기업 확인서</h4>
                          <p className="text-sm text-gray-600">산업통상자원부 인증기업</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */} */}

      {/* Services Section */}
      <section id="services" className="h-screen bg-white">
        <div className="w-full h-full">
          <div className="grid grid-cols-5 gap-0 items-stretch h-full">
            <div
              className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
                  servicesAccordion === 0
                    ? "https://readdy.ai/api/search-image?query=advanced%20high-power%20fiber%20laser%20cutting%20system%20in%20operation%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20modern%20industrial%20manufacturing%20facility%20with%20automated%20equipment%20and%20sparks%20flying%2C%20clean%20professional%20laser%20technology%20environment%20with%20metallic%20surfaces%20and%20precise%20cutting%20demonstration&width=600&height=500&seq=laser-processing-main&orientation=landscape"
                    : servicesAccordion === 1
                    ? "https://readdy.ai/api/search-image?query=diverse%20precision%20metal%20products%20and%20finished%20components%20for%20automotive%20aerospace%20electronics%20and%20industrial%20applications%2C%20professional%20display%20of%20high-quality%20manufactured%20metal%20parts%20with%20clean%20industrial%20background%2C%20variety%20of%20precision%20laser-cut%20products%20and%20custom%20manufacturing%20solutions&width=600&height=500&seq=products-main&orientation=landscape"
                    : servicesAccordion === 2
                    ? "https://readdy.ai/api/search-image?query=systematic%20quality%20control%20and%20manufacturing%20process%20with%20professional%20quality%20inspection%20equipment%2C%20precision%20measurement%20tools%20and%20quality%20assurance%20procedures%20in%20clean%20organized%20facility%2C%20manufacturing%20process%20control%20with%20testing%20equipment%20and%20documentation%20systems&width=600&height=500&seq=process-main&orientation=landscape"
                    : "https://readdy.ai/api/search-image?query=precision%20laser%20cutting%20technology%20comparison%20demonstration%20showing%20high%20accuracy%20metal%20processing%20with%20measurement%20tools%2C%20professional%20manufacturing%20facility%20with%20quality%20control%20equipment%2C%20advanced%20laser%20system%20with%20precision%20monitoring%20devices%20and%20technical%20specifications&width=500&height=600&seq=tech-comparison&orientation=portrait"
                })`
              }}
            >
              <div className="p-12 flex flex-col justify-center text-white h-full">
                <div>
                  <p className="text-sm mb-3 font-medium tracking-wider">전문 서비스</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">기술 및 서비스</h2>
                  <p className="text-base leading-relaxed max-w-sm mb-6">
                    레이저 가공부터 품질 관리까지 고객 요구사항에 최적화된 종합 기술 서비스를 제공합니다.
                  </p>
                  <Link
                    href="/technology"
                    className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
                  >
                    <span>전체 서비스</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-3 p-12 flex flex-col justify-center bg-white h-full overflow-y-auto">
              {/*레이저 가공*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleServicesAccordion(0)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      servicesAccordion === 0 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        servicesAccordion === 0 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      레이저 가공
                    </h3>
                    <p className="text-gray-700 text-lg">고출력 파이버 레이저 기반 정밀 절단 및 가공 기술</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    servicesAccordion === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      최신 파이버 레이저 시스템을 활용하여 철강, 스테인리스, 알루미늄 등 다양한 금속 소재를
                      0.1mm~25mm 두께까지 정밀하게 절단 가공합니다.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-scissors-cut-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">정밀 절단</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-focus-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">복잡 형상</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-speed-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">고속 가공</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-settings-4-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">무변형 가공</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*제품*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleServicesAccordion(1)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      servicesAccordion === 1 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        servicesAccordion === 1 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      제품
                    </h3>
                    <p className="text-gray-700 text-lg">다양한 산업 분야 맞춤형 정밀 가공 제품 공급</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    servicesAccordion === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      자동차, 항공우주, 방산, 전자 등 다양한 산업 분야에 필요한
                      고정밀 금속 부품과 제품을 맞춤형으로 제작합니다.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">1000+</div>
                        <div className="text-sm text-gray-600">제품 종류</div>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <div className="text-2xl font-bold text-blue-600">±0.1mm</div>
                        <div className="text-sm text-gray-600">가공 정밀도</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*공정*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleServicesAccordion(2)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      servicesAccordion === 2 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        servicesAccordion === 2 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      공정
                    </h3>
                    <p className="text-gray-700 text-lg">체계적 品質 관리와 정밀 측정 시스템</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    servicesAccordion === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      철저한 品質 관리 시스템과 정밀 측정 장비를 통해
                      고객이 요구하는 품질 기준을 완벽하게 충족시킵니다.
                    </p>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                      <div className="flex items-center">
                        <i className="ri-check-double-line text-blue-600 text-2xl mr-3"></i>
                        <div>
                          <h4 className="font-semibold text-gray-900">ISO 9001 品質 시스템</h4>
                          <p className="text-sm text-gray-600">국제 표준 品質 관리 시스템 운영</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*기술력*/}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => toggleServicesAccordion(3)}
                  className="flex items-start space-x-6 w-full text-left"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                      servicesAccordion === 3 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                        servicesAccordion === 3 ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      기술력
                    </h3>
                    <p className="text-gray-700 text-lg">企業부설연구소 운영을 통한 지속적 기술 개발</p>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    servicesAccordion === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      企業부설연구소를 통해 지속적인 R&D 투자와 신기술 개발로
                      업계 최고 수준의 기술 경쟁력을 확보하고 있습니다.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-lightbulb-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">특허 기술</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-research-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">R&D 투자</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-team-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">전문 인력</span>
                      </div>
                      <div className="flex items-center p-2 bg-white rounded">
                        <i className="ri-trophy-line text-blue-600 mr-2"></i>
                        <span className="text-sm text-gray-700">технолог 인증</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen bg-white">
        <div className="w-full h-full">
          <div className="grid grid-cols-5 gap-0 items-stretch h-full">
            
            {/* Left Image (col-span-2) */}
            <div
              className="col-span-2 relative bg-cover bg-center bg-no-repeat h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://readdy.ai/api/search-image?query=professional%20business%20consultation%20and%20customer%20support%20in%20modern%20industrial%20facility%2C%20business%20meeting%20with%20laser%20cutting%20equipment%20in%20background%2C%20customer%20service%20and%20technical%20support%20environment&width=600&height=500&seq=contact-section&orientation=landscape')`
              }}
            >
              <div className="p-12 flex flex-col justify-center text-white h-full">
                <div>
                  <p className="text-sm mb-3 font-medium tracking-wider">고객 지원</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">전문 상담 서비스</h2>
                  <p className="text-base leading-relaxed max-w-sm mb-6">
                    숙련된 전문가들이 고객의 요구사항을 정확히 파악하여 최적의 솔루션을 제안해드립니다.
                  </p>
                  <Link
                    href="/support/contact"
                    className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
                  >
                    <span>문의하기</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-3 p-12 flex flex-col justify-center bg-white h-full">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  지금 바로 견적을 요청하세요
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  전문적인 레이저 가공 서비스로 고객의 요구사항을 완벽하게 충족시켜드립니다.
                </p>
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
            </div>
          </div>
        </div>
      </section>

      </main>
    </div>
  );
}
