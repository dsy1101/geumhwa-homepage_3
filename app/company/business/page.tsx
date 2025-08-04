'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BusinessPage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Advanced%20industrial%20manufacturing%20facility%20with%20multiple%20laser%20cutting%20machines%20in%20operation%2C%20high-tech%20production%20floor%20with%20precision%20metal%20fabrication%20equipment%2C%20clean%20modern%20factory%20environment%20with%20blue%20industrial%20lighting%20and%20organized%20workflow%2C%20professional%20manufacturing%20atmosphere%20showcasing%20cutting-edge%20technology&width=1200&height=400&seq=business-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              사업영역
            </h1>
            <p className="text-xl md:text-2xl">
              정밀 가공 기술로 다양한 산업 분야를 선도합니다
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section 1: 레이저 정밀 가공의 핵심 기술 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                레이저 정밀 가공의 핵심 기술
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저(주)는 고출력 파이버 레이저 절단 기술을 기반으로 최상의 정밀 가공 솔루션을 제공합니다. 
                수년간 축적된 노하우와 데이터를 통해 소재 특성, 두께, 형상에 최적화된 가공 조건을 적용하여 
                오차 없는 정밀도와 뛰어난 가공 품질을 보장합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=High-precision%20laser%20cutting%20machine%20in%20action%20with%20sparks%20flying%2C%20ultra-fast%20cutting%20speed%20demonstrated%20on%20thick%20metal%20plate%2C%20advanced%20fiber%20laser%20technology%20creating%20perfect%20cuts%20with%20microscopic%20accuracy%2C%20industrial%20setting%20with%20blue%20laser%20light%20and%20metallic%20surfaces&width=500&height=300&seq=precision-cutting&orientation=landscape"
                    alt="고정밀 고속 절단"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">고정밀/고속 절단</h3>
                <p className="text-gray-600">
                  미세하고 복잡한 형상부터 대형 부품까지, 빠른 속도와 완벽한 정밀도로 가공합니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=CAD%20CAM%20software%20interface%20showing%20complex%20metal%20part%20design%20with%20precise%20measurements%20and%20cutting%20paths%2C%20engineering%20workstation%20with%20multiple%20monitors%20displaying%20technical%20drawings%20and%20optimization%20algorithms%2C%20professional%20design%20environment%20with%20blueprint%20layouts&width=500&height=300&seq=cad-cam-design&orientation=landscape"
                    alt="형상 가공 최적화"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">형상 가공 최적화</h3>
                <p className="text-gray-600">
                  CAD/CAM 기반의 정밀 설계를 통해 고객 도면의 모든 요구사항을 완벽하게 구현합니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Thermal%20management%20system%20in%20laser%20cutting%20process%2C%20controlled%20heat%20zone%20with%20minimal%20material%20distortion%2C%20temperature%20monitoring%20equipment%20and%20cooling%20systems%20preventing%20thermal%20deformation%2C%20precision%20manufacturing%20with%20heat%20control%20technology&width=500&height=300&seq=thermal-control&orientation=landscape"
                    alt="열변형 억제"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">열변형 억제</h3>
                <p className="text-gray-600">
                  최적화된 레이저 출력 및 가공 조건으로 소재의 열변형을 최소화하여 제품의 완성도를 높입니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Automated%20material%20handling%20and%20collection%20system%20in%20modern%20manufacturing%20facility%2C%20robotic%20arms%20collecting%20cut%20metal%20parts%20and%20waste%20materials%2C%20efficient%20workflow%20automation%20with%20conveyor%20systems%20and%20sorting%20equipment%2C%20clean%20industrial%20environment&width=500&height=300&seq=auto-collection&orientation=landscape"
                    alt="자동 수거 시스템"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">자동 수거 시스템</h3>
                <p className="text-gray-600">
                  가공 부산물을 효율적으로 자동 수거하여 작업 효율성 및 안전성을 극대화합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: 다양한 소재와 산업 분야 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                다양한 소재와 산업 분야에 적용
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저는 폭넓은 소재 대응력과 기술 융합 역량으로 다양한 산업 분야에 기여하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 주요 가공 소재 */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">주요 가공 소재</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-hammer-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">철강 (Steel)</h4>
                      <p className="text-gray-600 text-sm">일반 구조용 강재, 고장력 강판 등</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-shield-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">스테인리스 (Stainless Steel)</h4>
                      <p className="text-gray-600 text-sm">내부식성 및 내열성이 요구되는 부품</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-lightbulb-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">알루미늄 (Aluminum)</h4>
                      <p className="text-gray-600 text-sm">경량화 및 정밀 가공이 필요한 부품</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-star-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">특수 금속</h4>
                      <p className="text-gray-600 text-sm">구리, 티타늄 등 고난도 절단 및 가공이 필요한 소재</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주요 적용 산업 */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">주요 적용 산업</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-car-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">자동차 부품</h4>
                      <p className="text-gray-600 text-sm">차체, 프레임, 엔진 및 구동계 부품 등</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-settings-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">산업 기계</h4>
                      <p className="text-gray-600 text-sm">설비 부품, 구조물, 정밀 기계 부품 등</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-shield-star-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">방산</h4>
                      <p className="text-gray-600 text-sm">특수 장비의 외장 및 내부 부품</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-computer-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">전장 및 전자 부품</h4>
                      <p className="text-gray-600 text-sm">정밀 외곽 절단, 소형 부품 가공</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                      <i className="ri-heart-pulse-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">기타 고부가가치 산업</h4>
                      <p className="text-gray-600 text-sm">의료기기, 항공 부품 등</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 차별화된 공정 시스템 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                금화레이저(주)만의 차별화된 공정 시스템
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                고객의 요구를 정확히 이해하고 최고의 품질을 제공하기 위해 설계부터 출하까지 일괄적이고 체계적인 공정을 운영합니다.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                          <span className="font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold">설계 및 가공 준비</h3>
                      </div>
                      <p className="text-gray-600">
                        고객 도면 해석 및 CAD/CAM 기반의 절단 경로 최적화 설계
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <img
                      src="https://readdy.ai/api/search-image?query=Engineering%20design%20phase%20with%20CAD%20software%20showing%20technical%20drawings%20and%20cutting%20path%20optimization%2C%20professional%20engineer%20analyzing%20customer%20blueprints%20on%20multiple%20computer%20screens%2C%20detailed%20metal%20part%20specifications%20and%20measurements%20displayed%20on%20monitors&width=500&height=300&seq=design-prep&orientation=landscape"
                      alt="설계 및 가공 준비"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                          <span className="font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold">소재 준비 및 수입 검사</h3>
                      </div>
                      <p className="text-gray-600">
                        엄격한 品质 기준에 따른 소재 입고 검사 및 전처리
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pr-8">
                    <img
                      src="https://readdy.ai/api/search-image?query=Quality%20inspection%20of%20raw%20metal%20materials%20with%20measuring%20instruments%20and%20testing%20equipment%2C%20quality%20control%20specialist%20examining%20steel%20plates%20and%20aluminum%20sheets%2C%20organized%20material%20storage%20warehouse%20with%20inspection%20certificates%20and%20quality%20tags&width=500&height=300&seq=material-inspection&orientation=landscape"
                      alt="소재 준비 및 수입 검사"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                          <span className="font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold">고정밀 레이저 절단</h3>
                      </div>
                      <p className="text-gray-600">
                        숙련된 기술자의 최적 조건 설정과 최첨단 장비를 통한 정밀 가공
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <img
                      src="https://readdy.ai/api/search-image?query=Skilled%20technician%20operating%20high-precision%20laser%20cutting%20machine%20with%20advanced%20control%20panel%2C%20expert%20craftsperson%20adjusting%20cutting%20parameters%20on%20industrial%20laser%20equipment%2C%20professional%20manufacturing%20environment%20with%20precision%20cutting%20in%20progress&width=500&height=300&seq=laser-cutting-operation&orientation=landscape"
                      alt="고정밀 레이저 절단"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                          <span className="font-bold">4</span>
                        </div>
                        <h3 className="text-xl font-semibold">가공품 회수 및 품질 검사</h3>
                      </div>
                      <p className="text-gray-600">
                        버(Burr) 및 변형 최소화, 치수 정밀도 측정, 필요시 후처리까지 완벽한 검수
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pr-8">
                    <img
                      src="https://readdy.ai/api/search-image?query=Final%20quality%20inspection%20and%20measurement%20of%20laser-cut%20metal%20parts%20with%20precision%20measuring%20tools%2C%20quality%20control%20specialist%20checking%20dimensional%20accuracy%20and%20surface%20finish%2C%20clean%20inspection%20area%20with%20finished%20metal%20components%20and%20measurement%20certificates&width=500&height=300&seq=quality-inspection&orientation=landscape"
                      alt="가공품 회수 및 품질 검사"
                      className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 유연한 생산 대응 */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">유연한 생산 대응</h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                다품종 소량 생산부터 고정밀 대량 생산까지, 고객 맞춤형 생산 시스템을 갖추고 있습니다.
              </p>
            </div>
          </div>

          {/* Section 4: 다양한 산업 분야에 최적화된 솔루션 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                다양한 산업 분야에 최적화된 솔루션
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                금화레이저는 폭넓은 소재 대응력과 기술 융합 역량으로 다양한 산업 분야에 기여하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div
                  className="h-32 bg-cover bg-center rounded mb-4"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=precision%20automotive%20metal%20parts%20manufactured%20by%20laser%20cutting%20technology%2C%20car%20engine%20components%20and%20chassis%20parts%20made%20from%20steel%20and%20aluminum%2C%20high-quality%20automotive%20manufacturing%20with%20clean%20industrial%20background&width=300&height=200&seq=auto-mini&orientation=landscape')`
                  }}
                ></div>
                <h3 className="text-xl font-semibold mb-2">자동차 부품</h3>
                <p className="text-gray-600">차체, 프레임, 엔진 및 구동계 부품 등 정밀한 자동차 부품 가공</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div
                  className="h-32 bg-cover bg-center rounded mb-4"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=industrial%20machinery%20components%20and%20precision%20metal%20parts%20for%20manufacturing%20equipment%2C%20heavy-duty%20machine%20parts%20made%20from%20steel%20and%20stainless%20steel%2C%20professional%20industrial%20manufacturing%20background&width=300&height=200&seq=machine-mini&orientation=landscape')`
                  }}
                ></div>
                <h3 className="text-xl font-semibold mb-2">산업 기계</h3>
                <p className="text-gray-600">설비 부품, 구조물, 정밀 기계 부품 등 산업용 기계 부품 제작</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div
                  className="h-32 bg-cover bg-center rounded mb-4"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=precision%20military%20defense%20metal%20components%20and%20parts%20manufactured%20with%20laser%20cutting%20technology%2C%20high-quality%20steel%20and%20aluminum%20defense%20industry%20parts%2C%20professional%20manufacturing%20environment&width=300&height=200&seq=defense-mini&orientation=landscape')`
                  }}
                ></div>
                <h3 className="text-xl font-semibold mb-2">방산 산업</h3>
                <p className="text-gray-600">특수 장비의 외장 및 내부 부품 등 방산 분야 정밀 부품</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div
                  className="h-32 bg-cover bg-center rounded mb-4"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=electronic%20components%20and%20precision%20metal%20parts%20for%20electronics%20industry%20manufactured%20by%20laser%20cutting%2C%20small%20intricate%20metal%20parts%20for%20electronic%20devices%2C%20clean%20high-tech%20manufacturing%20environment&width=300&height=200&seq=electronic-mini&orientation=landscape')`
                  }}
                ></div>
                <h3 className="text-xl font-semibold mb-2">전자 부품</h3>
                <p className="text-gray-600">정밀 외곽 절단, 소형 부품 가공 등 전자 산업 부품 가공</p>
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
