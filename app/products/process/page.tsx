'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProcessPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const processSteps = [
    {
      step: 1,
      title: '설계 및 자재 구매',
      description: '고객 도면 접수 후 CAD/CAM 프로그램으로 가공 경로 최적화',
      details: [
        '고객 도면 해석 및 검토',
        '소재 종류 및 두께 고려한 NC 코드 생성',
        '필요 자재 구매 및 작업지시 발행'
      ],
      icon: 'ri-edit-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20engineer%20working%20with%20CAD%2FCAM%20software%20for%20laser%20cutting%20path%20optimization%2C%20technical%20drawing%20analysis%20on%20multiple%20computer%20screens%2C%20engineering%20workstation%20with%20metal%20part%20blueprints%20and%20NC%20code%20programming%2C%20modern%20design%20office%20with%20precise%20measurement%20tools&width=500&height=300&seq=design1&orientation=landscape'
    },
    {
      step: 2,
      title: '수입 검사',
      description: '재질 인증서, 두께, 평탄도 등 입고 자재 검수',
      details: [
        '재질 인증서(Mill Sheet) 확인',
        '두께 및 평탄도 정밀 측정',
        '산화 유무, 휨 여부 등 정밀 기준 적용'
      ],
      icon: 'ri-search-line',
      image: 'https://readdy.ai/api/search-image?query=Quality%20control%20specialist%20inspecting%20incoming%20raw%20metal%20materials%20with%20precision%20measuring%20instruments%2C%20mill%20sheet%20certificates%20and%20material%20testing%20equipment%2C%20organized%20material%20warehouse%20with%20quality%20inspection%20station%20and%20measurement%20tools&width=500&height=300&seq=inspect1&orientation=landscape'
    },
    {
      step: 3,
      title: '정밀 레이저 가공',
      description: '고출력 파이버/CO₂ 레이저로 절단',
      details: [
        '자동 위치 보정 및 경로 추적 기능',
        '소재별 가스(O₂/N₂/Air) 조건 설정',
        '실시간 품질 모니터링 시스템 운영'
      ],
      icon: 'ri-scissors-cut-line',
      image: 'https://readdy.ai/api/search-image?query=High-precision%20laser%20cutting%20machine%20in%20operation%20with%20automatic%20positioning%20and%20path%20tracking%2C%20advanced%20fiber%20laser%20system%20cutting%20thick%20metal%20with%20sparks%2C%20automated%20gas%20control%20system%20and%20real-time%20quality%20monitoring%2C%20modern%20industrial%20manufacturing%20environment&width=500&height=300&seq=laser2&orientation=landscape'
    },
    {
      step: 4,
      title: '레디얼 가공 및 1차 조립',
      description: '드릴, 탭, 홈 등 후가공 수행',
      details: [
        '정밀 홀 가공 시 가이드 툴 사용',
        '드릴, 탭, 홈 등 후가공 작업',
        '일부 조립물은 1차 조립까지 병행'
      ],
      icon: 'ri-tools-line',
      image: 'https://readdy.ai/api/search-image?query=Precision%20secondary%20machining%20operations%20including%20drilling%2C%20tapping%20and%20grooving%20with%20guide%20tools%2C%20skilled%20technician%20performing%20detailed%20metalworking%20with%20specialized%20equipment%2C%20organized%20workshop%20with%20precision%20tools%20and%20partially%20assembled%20components&width=500&height=300&seq=machining1&orientation=landscape'
    },
    {
      step: 5,
      title: '사상 및 표면 처리',
      description: '버(Burr), 가공 흔적 제거, 날카로운 모서리 처리',
      details: [
        '버(Burr) 및 가공 흔적 완전 제거',
        '날카로운 모서리 안전 처리',
        '도장·피막 전 필수 사상 가공 대응'
      ],
      icon: 'ri-hammer-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20surface%20finishing%20and%20deburring%20process%2C%20skilled%20worker%20removing%20burrs%20and%20sharp%20edges%20from%20laser-cut%20metal%20parts%2C%20clean%20finishing%20station%20with%20specialized%20deburring%20tools%20and%20smooth%20metal%20components%20ready%20for%20coating&width=500&height=300&seq=finishing1&orientation=landscape'
    },
    {
      step: 6,
      title: 'T/O 검사 및 최종 검사',
      description: '찢김, 구멍 편심, 스크래치 등 정밀 외관 검사',
      details: [
        '외관 품질 정밀 검사',
        '조립 정합성 및 치수 공차 검수',
        '품질 기준 100% 준수 확인'
      ],
      icon: 'ri-focus-3-line',
      image: 'https://readdy.ai/api/search-image?query=Final%20quality%20inspection%20process%20with%20precision%20measuring%20instruments%2C%20quality%20control%20specialist%20examining%20finished%20metal%20parts%20for%20defects%20and%20dimensional%20accuracy%2C%20clean%20inspection%20area%20with%20measuring%20tools%20and%20quality%20certificates&width=500&height=300&seq=finalcheck1&orientation=landscape'
    },
    {
      step: 7,
      title: '제품 출하',
      description: '제품 식별표 부착 후 안전 포장',
      details: [
        '제품 식별표 부착',
        '안전 포장 및 운송 준비',
        '검사 이력 관리 → 품질 이슈 추적 가능'
      ],
      icon: 'ri-truck-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20packaging%20and%20shipping%20area%20with%20finished%20metal%20products%20being%20carefully%20packaged%2C%20product%20identification%20tags%20and%20quality%20documentation%2C%20organized%20shipping%20department%20with%20safe%20packaging%20materials%20and%20delivery%20preparation&width=500&height=300&seq=shipping1&orientation=landscape'
    }
  ];

  const processStrengths = [
    {
      title: '검사 시스템',
      description: '이중 검사 체계 + 정밀 측정 장비 활용',
      icon: 'ri-shield-check-line'
    },
    {
      title: '유연 생산',
      description: '단품, 소량, 대량 모두 대응 가능',
      icon: 'ri-settings-3-line'
    },
    {
      title: '품질 이력 관리',
      description: '출하 이력 및 공정별 품질 기록 관리',
      icon: 'ri-file-list-3-line'
    },
    {
      title: '자동화',
      description: '일부 공정 자동화 + 자동 수거 시스템 개발 적용',
      icon: 'ri-robot-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">제조 공정</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              체계적이고 정밀한 생산 프로세스를 통해 
              고객이 신뢰할 수 있는 최고 품질의 제품을 제공합니다
            </p>
            <div className="flex justify-center">
              <Link
                href="/support/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              전체 공정 개요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              설계부터 납품까지 완벽한 품질 관리 시스템
            </p>
          </div>

          {/* Process Flow Diagram */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-edit-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">설계</h3>
              </div>
              <div className="hidden md:block">
                <i className="ri-arrow-right-line text-2xl text-gray-400"></i>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-search-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">검사</h3>
              </div>
              <div className="hidden md:block">
                <i className="ri-arrow-right-line text-2xl text-gray-400"></i>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-scissors-cut-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">가공</h3>
              </div>
              <div className="hidden md:block">
                <i className="ri-arrow-right-line text-2xl text-gray-400"></i>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-focus-3-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">최종검사</h3>
              </div>
              <div className="hidden md:block">
                <i className="ri-arrow-right-line text-2xl text-gray-400"></i>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-truck-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-800">출하</h3>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              이중 검사 기반 폐쇄 루프형 품질 관리
            </h3>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
              각 단계마다 정밀 측정 및 피드백이 적용되어 재현성 높은 생산 품질을 유지합니다. 
              문제 발생 시 즉시 원인을 추적하고 개선할 수 있는 체계적인 품질 관리 시스템을 운영합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              주요 공정 단계
            </h2>
            <p className="text-xl text-gray-600">
              각 단계별 세부 과정과 품질 관리 포인트
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="lg:w-1/2">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <i className="ri-check-line text-blue-600 mt-1 mr-3"></i>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full rounded-lg shadow-lg object-cover h-80"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Strengths */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              금화레이저 공정의 강점
            </h2>
            <p className="text-xl text-gray-600">
              체계적인 품질 관리와 유연한 생산 시스템
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processStrengths.map((strength, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <i className={`${strength.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-4">{strength.title}</h3>
                <p className="text-gray-600">{strength.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              공정별 품질 관리 포인트
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">공정</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">관리 포인트</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">측정 항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">설계</td>
                    <td className="py-4 px-6 text-gray-700">도면 해석 정확성</td>
                    <td className="py-4 px-6 text-gray-700">치수, 공차, 형상</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">수입검사</td>
                    <td className="py-4 px-6 text-gray-700">소재 품질 확인</td>
                    <td className="py-4 px-6 text-gray-700">재질, 두께, 평탄도</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">레이저 가공</td>
                    <td className="py-4 px-6 text-gray-700">절단 품질 최적화</td>
                    <td className="py-4 px-6 text-gray-700">절단면 품질, 정밀도</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">후가공</td>
                    <td className="py-4 px-6 text-gray-700">정밀도 유지</td>
                    <td className="py-4 px-6 text-gray-700">홀 위치, 표면 거칠기</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">표면처리</td>
                    <td className="py-4 px-6 text-gray-700">마감 품질</td>
                    <td className="py-4 px-6 text-gray-700">버 제거, 모서리 처리</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">최종검사</td>
                    <td className="py-4 px-6 text-gray-700">종합 품질 검증</td>
                    <td className="py-4 px-6 text-gray-700">외관, 치수, 조립성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              품질 보증 시스템
            </h2>
            <p className="text-xl mb-12 max-w-4xl mx-auto">
              모든 공정에서 철저한 품질 관리를 통해 고객 만족을 보장합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-check-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">100% 전수 검사</h3>
              <p className="text-blue-100">
                모든 제품에 대해 100% 전수 검사를 실시하여 불량품 유출을 원천 차단합니다.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-list-3-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">이력 관리</h3>
              <p className="text-blue-100">
                공정별 품질 데이터를 체계적으로 관리하여 품질 이슈 발생 시 즉시 추적 가능합니다.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-refresh-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">지속적 개선</h3>
              <p className="text-blue-100">
                고객 피드백과 품질 데이터를 바탕으로 공정을 지속적으로 개선합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            신뢰할 수 있는 제조 파트너
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            체계적인 공정 관리와 철저한 품질 검사를 통해 고객의 기대를 뛰어넘는 제품을 제공합니다
          </p>
          <Link
            href="/support/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            공정 문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}