
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TechnologyCapabilityPage() {
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
        { title: '문의하기', href: '/support/contact' }
      ]
    }
  ];

  const coreCapabilities = [
    {
      title: '고출력 파이버 레이저 기반 정밀 절단',
      description: '0.1~25mm 이상 금속 절단',
      icon: 'ri-focus-3-line',
      details: [
        '고출력 파이버 레이저 시스템',
        '±0.1mm 이하 정밀 제어',
        '다양한 두께 범위 대응'
      ]
    },
    {
      title: '고반사 금속 정밀 가공',
      description: '구리, 알루미늄 등 고난도 소재 대응',
      icon: 'ri-shield-star-line',
      details: [
        '고반사 소재 전용 절단 조건',
        '열변형 최소화 기술',
        '표면 품질 최적화'
      ]
    },
    {
      title: '자동 수거장치 기술',
      description: '레이저 가공 부산물 실시간 회수',
      icon: 'ri-robot-line',
      details: [
        '특허 보유 자동 수거 시스템',
        '실시간 부산물 처리',
        '작업 효율성 극대화'
      ]
    },
    {
      title: '복잡 형상 정밀 절단',
      description: '부품 조립 대응 기술',
      icon: 'ri-settings-3-line',
      details: [
        '복잡 형상 절단 최적화',
        '조립 정합성 보장',
        '일괄 가공 솔루션'
      ]
    }
  ];

  const comparisonData = [
    {
      category: '절단 정밀도',
      general: '±0.3mm 수준',
      geumhwa: '±0.1mm 이하 정밀 제어'
    },
    {
      category: '대응 소재',
      general: '주로 铁, 스테인리스',
      geumhwa: '고반사 소재 포함 다양한 金속 대응'
    },
    {
      category: '수거 시스템',
      general: '수작업 또는 없음',
      geumhwa: '자동 수거장치 특허 보유'
    },
    {
      category: '생산 방식',
      general: '절단 중심',
      geumhwa: '설계 → 절단 → 조립 → 검사까지 일괄 대응'
    },
    {
      category: '연구개발',
      general: '없음 또는 外주',
      geumhwa: '사내 전담 연구소 + 실증 기반 개발'
    }
  ];

  const rdTeams = [
    {
      name: '설계팀',
      description: '자동 수거장치 구조 설계, 형상 최적화',
      icon: 'ri-edit-line'
    },
    {
      name: '장비개발팀',
      description: '이동 메커니즘, 연동 시스템 개발',
      icon: 'ri-tools-line'
    },
    {
      name: '제어팀',
      description: '센서 기반 제어, 예지보전 UI 개발',
      icon: 'ri-code-line'
    },
    {
      name: '테스트팀',
      description: '내구성 실험 및 검증',
      icon: 'ri-test-tube-line'
    },
    {
      name: '특허팀',
      description: '국내외 특허 출원/유지 관리',
      icon: 'ri-award-line'
    }
  ];

  const certifications = [
    {
      title: '벤처기업 인증',
      description: '기술력 기반 창업 기업 인증',
      icon: 'ri-rocket-line'
    },
    {
      title: '기업부설 연구소 인증',
      description: '전담 연구개발 조직 운영',
      icon: 'ri-microscope-line'
    },
    {
      title: '뿌리기업 지정',
      description: '산업부 金속가공 분야 핵심 기업',
      icon: 'ri-building-line'
    }
  ];

  const roadmapItems = [
    {
      phase: '2024-2025',
      title: 'AI 기반 예지보전 시스템',
      description: '센서+UI 연동 시스템 적용',
      status: '개발 중'
    },
    {
      phase: '2025-2026',
      title: '스마트팩토리 연계 장비',
      description: '풀패키지 개발 및 상용화',
      status: '계획 중'
    },
    {
      phase: '2026-2027',
      title: '산업별 맞춤형 레이저 장비',
      description: '시리즈 출시 및 시장 확대',
      status: '구상 중'
    },
    {
      phase: '2027-2028',
      title: '해외 ODM 공동개발',
      description: '유럽/일본향 기술 협력',
      status: '추진 예정'
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
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=advanced%20laser%20technology%20research%20and%20development%20laboratory%20with%20precision%20manufacturing%20equipment%2C%20high-tech%20facility%20with%20engineers%20working%20on%20cutting-edge%20laser%20systems%2C%20modern%20industrial%20research%20environment%20with%20sophisticated%20technical%20equipment%20and%20innovation%20atmosphere&width=1200&height=600&seq=tech-capability-hero&orientation=landscape"
            alt="기술력 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">기술력</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              고출력 파이버레이저 절단 기술과 정밀 자동 수거 시스템을 기반으로 
              고난도 금속 가공 문제를 해결하는 기술 중심 기업입니다
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 inline-block">
              <h3 className="text-2xl font-bold mb-2">기술로 고객과 미래를 연결합니다</h3>
              <p className="text-lg">Technology Connects Customers and Future</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              핵심 기술 역량
            </h2>
            <p className="text-xl text-gray-600">
              단순 하청이 아닌, 기술 중심 제조 파트너로서의 핵심 역량
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreCapabilities.map((capability, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <i className={`${capability.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{capability.title}</h3>
                <p className="text-gray-600 text-center mb-6">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <i className="ri-check-line text-blue-600 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  기술 중심 제조 파트너
                </h3>
                <p className="text-gray-600 mb-6">
                  금화레이저는 단순한 가공 업체가 아닌, 고객의 기술적 과제를 해결하는 
                  전문 기술 파트너입니다. 독자적인 기술 개발과 지속적인 연구개발을 통해 
                  고객에게 최적화된 솔루션을 제공합니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-lightbulb-line text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">독자적 기술 개발</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-team-line text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">전문 연구개발팀 운영</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-shield-check-line text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">품질 보증 시스템</span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=advanced research and development laboratory with laser cutting technology equipment, professional engineers working on precision manufacturing innovation, modern R&D facility with high-tech equipment and technical documentation, clean industrial research environment&width=500&height=400&seq=tech-partner&orientation=landscape"
                  alt="기술 중심 제조 파트너"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              기술 차별성
            </h2>
            <p className="text-xl text-gray-600">
              일반 제조사와 차별화된 금화레이저만의 기술적 우위
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-800">구분</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-800">일반 제조사</th>
                      <th className="text-left py-4 px-6 font-semibold text-blue-600">금화레이저</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-6 text-gray-700 font-medium">{item.category}</td>
                        <td className="py-4 px-6 text-gray-600">{item.general}</td>
                        <td className="py-4 px-6 text-blue-600 font-medium">{item.geumhwa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=precision%20laser%20cutting%20technology%20comparison%20demonstration%20showing%20high%20accuracy%20metal%20processing%20with%20measurement%20tools%2C%20professional%20manufacturing%20facility%20with%20quality%20control%20equipment%2C%20advanced%20laser%20system%20with%20precision%20monitoring%20devices%20and%20technical%20specifications&width=500&height=600&seq=tech-comparison&orientation=portrait"
                alt="기술 차별성"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-focus-3-line text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">정밀도의 차별화</h3>
              <p className="text-gray-600">
                ±0.1mm 이하의 정밀 제어로 고품질 가공 실현
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-robot-line text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">자동화 기술</h3>
              <p className="text-gray-600">
                특허 보유 자동 수거 시스템으로 효율성 극대화
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <i className="ri-settings-3-line text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">일괄 가공 시스템</h3>
              <p className="text-gray-600">
                설계부터 검사까지 통합 솔루션 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Organization */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              R&D 조직 및 인력 구성
            </h2>
            <p className="text-xl text-gray-600">
              기업부설연구소 인증 보유, 전담 연구개발 조직 운영
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {rdTeams.map((team, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className={`${team.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-3">{team.name}</h3>
                <p className="text-gray-600 text-sm">{team.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  기업부설연구소 운영
                </h3>
                <p className="text-gray-600 mb-6">
                  체계적인 연구개발 조직을 통해 지속적인 기술 혁신을 추진하고 있습니다. 
                  각 팀별 전문성을 바탕으로 고객 요구사항에 최적화된 기술 솔루션을 개발합니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    <span className="text-gray-700">5개 전문팀 운영</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    <span className="text-gray-700">실증 기반 개발</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    <span className="text-gray-700">지속적 기술 혁신</span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=corporate research institute with professional engineers and scientists working on advanced manufacturing technology, modern R&D laboratory with precision equipment and technical documentation, collaborative research environment with team members analyzing data and developing solutions&width=500&height=400&seq=rd-org&orientation=landscape"
                  alt="R&D 조직"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patents and Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              특허 및 인증 현황
            </h2>
            <p className="text-xl text-gray-600">
              기술력을 인정받은 특허 보유 및 공인 인증 현황
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* 특허 보유 현황 */}
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                <i className="ri-patent-line text-blue-600 mr-3"></i>
                특허 보유 현황
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">
                  레이저 절단 부산물 자동 수거 장치
                </h4>
                <p className="text-sm text-gray-600 mb-4">출원년도: 2025</p>
                <p className="text-gray-700">
                  회전 블레이드 + 슬라이딩 수거함 연동 구조를 통한 
                  레이저 가공 부산물 실시간 자동 수거 시스템
                </p>
              </div>
              <div className="mt-6 bg-blue-600 text-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">향후 특허 계획</h4>
                <ul className="text-sm space-y-1">
                  <li>• AI 기반 예지보전 시스템</li>
                  <li>• 스마트팩토리 연계 기술</li>
                  <li>• 고반사 소재 전용 가공 기술</li>
                </ul>
              </div>
            </div>

            {/* 특허 이미지 */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                특허 기술 시연
              </h3>
              <img
                src="https://readdy.ai/api/search-image?query=laser%20cutting%20waste%20automatic%20collection%20system%20demonstration%20with%20rotating%20blade%20and%20sliding%20collection%20mechanism%2C%20industrial%20patent%20technology%20showcase%20with%20technical%20diagrams%20and%20operational%20demonstration%2C%20advanced%20manufacturing%20automation%20equipment&width=400&height=300&seq=patent-demo&orientation=landscape"
                alt="특허 기술 시연"
                className="w-full rounded-lg shadow-md mb-4"
              />
              <p className="text-gray-600 text-sm text-center">
                자동 수거 시스템 실제 작동 모습
              </p>
            </div>

            {/* 인증 보유 현황 */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                <i className="ri-award-line text-blue-600 mr-3"></i>
                인증 보유 현황
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className={`${cert.icon} text-blue-600 text-sm`}></i>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">{cert.title}</h4>
                    </div>
                    <p className="text-gray-600 text-xs">{cert.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <img
                  src="https://readdy.ai/api/search-image?query=Korean%20government%20certification%20documents%20for%20venture%20company%20and%20corporate%20research%20institute%2C%20official%20business%20certificates%20with%20seals%20and%20stamps%2C%20professional%20certification%20awards%20display&width=300&height=200&seq=cert-docs&orientation=landscape"
                  alt="인증서"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              향후 기술 로드맵
            </h2>
            <p className="text-xl text-gray-600">
              지속적인 기술 혁신을 통한 미래 성장 전략
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === '개발 중' ? 'bg-green-100 text-green-800' :
                          item.status === '계획 중' ? 'bg-blue-100 text-blue-800' :
                          item.status === '구상 중' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{item.phase}</p>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://readdy.ai/api/search-image?query=technology%20roadmap%20visualization%20with%20futuristic%20manufacturing%20innovation%20timeline%2C%20AI-powered%20predictive%20maintenance%20systems%20and%20smart%20factory%20integration%2C%20advanced%20laser%20technology%20development%20phases%20with%20digital%20transformation%20elements&width=500&height=600&seq=tech-roadmap&orientation=portrait"
                alt="기술 로드맵"
                className="w-full rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              기술 혁신을 통한 미래 가치 창출
            </h3>
            <p className="text-blue-100 mb-6">
              금화레이저는 지속적인 연구개발과 기술 혁신을 통해 고객과 함께 성장하는 
              미래 지향적 기술 파트너가 되겠습니다.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">AI</div>
                <p className="text-blue-100 text-sm">인공지능 기반 예지보전</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">IoT</div>
                <p className="text-blue-100 text-sm">스마트팩토리 연계</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">ODM</div>
                <p className="text-blue-100 text-sm">해외 공동개발</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">글로벌</div>
                <p className="text-blue-100 text-sm">해외 시장 진출</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            기술 파트너십 문의
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            고난도 기술 요구사항을 해결하는 신뢰할 수 있는 기술 파트너가 되어드리겠습니다
          </p>
          <Link
            href="/support/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            기술 문의하기
          </Link>
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
