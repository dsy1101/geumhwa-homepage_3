'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const [selectedCategory, setSelectedCategory] = useState('all');

  // const menuItems = [
  //   {
  //     title: "금화레이저",
  //     href: '/',
  //     dropdown: null
  //   },
  //   {
  //     title: '회사소개',
  //     href: '/company',
  //     dropdown: [
  //       { title: '회사개요', href: '/company' },
  //       { title: '사업영역', href: '/company/business' },
  //       { title: '인증', href: '/company/certification' }
  //     ]
  //   },
  //   {
  //     title: '기술 및 서비스',
  //     href: '/technology',
  //     dropdown: [
  //       { title: '레이저 가공', href: '/technology/laser' },
  //       { title: '제품', href: '/products/main' },
  //       { title: '공정', href: '/technology/process' },
  //       { title: '기술력', href: '/technology/capability' }
  //     ]
  //   },
  //   {
  //     title: '고객 지원',
  //     href: '/support',
  //     dropdown: [
  //       { title: '문의하기', href: '/support/contact' }
  //     ]
  //   }
  // ];

  const productCategories = [
    { id: 'all', name: '전체', icon: 'ri-grid-line' },
    { id: 'industrial', name: '산업용 부품', icon: 'ri-tools-line' },
    { id: 'automotive', name: '자동차·방산', icon: 'ri-car-line' },
    { id: 'battery', name: '2차전지 장비', icon: 'ri-battery-charge-line' },
    { id: 'welding', name: '절곡·용접 완성품', icon: 'ri-hammer-line' },
    { id: 'custom', name: '주문제작', icon: 'ri-settings-3-line' }
  ];

  const products = [
    {
      category: 'industrial',
      title: '산업기계용 커버',
      material: 'SS41, 두께 6T',
      industry: '산업기계 지지대',
      description: '고객 도면 기반 정밀 가공',
      image: 'https://readdy.ai/api/search-image?query=industrial%20machinery%20metal%20cover%20and%20support%20frame%20parts%20manufactured%20by%20laser%20cutting%2C%20precision%20steel%20components%20for%20industrial%20equipment%20with%20clean%20edges%20and%20professional%20finish%2C%20modern%20manufacturing%20environment&width=400&height=300&seq=ind1&orientation=landscape'
    },
    {
      category: 'industrial',
      title: '산업용 프레임 부품',
      material: 'STS304, 두께 8T',
      industry: '산업기계 프레임',
      description: '다양한 치수 및 형상 대응',
      image: 'https://readdy.ai/api/search-image?query=stainless%20steel%20industrial%20frame%20components%20and%20structural%20parts%20made%20by%20laser%20cutting%20technology%2C%20precision%20metal%20framework%20for%20industrial%20machinery%20with%20clean%20professional%20finish&width=400&height=300&seq=ind2&orientation=landscape'
    },
    {
      category: 'automotive',
      title: '자동차 차체 부품',
      material: 'AL5052, 두께 3T',
      industry: '자동차 제조',
      description: '정밀도와 내구성 요구 분야',
      image: 'https://readdy.ai/api/search-image?query=automotive%20aluminum%20body%20parts%20and%20components%20manufactured%20by%20laser%20cutting%2C%20precision%20car%20parts%20with%20clean%20edges%20for%20automotive%20industry%2C%20professional%20automotive%20manufacturing%20setting&width=400&height=300&seq=auto1&orientation=landscape'
    },
    {
      category: 'automotive',
      title: '방산 장비 커버',
      material: 'SS41, 두께 10T',
      industry: '방산 장비',
      description: '고강도 내구성 부품',
      image: 'https://readdy.ai/api/search-image?query=military%20defense%20equipment%20metal%20covers%20and%20protective%20components%20made%20by%20laser%20cutting%2C%20heavy%20duty%20steel%20parts%20for%20defense%20industry%20applications%2C%20professional%20military%20grade%20manufacturing&width=400&height=300&seq=def1&orientation=landscape'
    },
    {
      category: 'battery',
      title: '전극 코터 부품',
      material: '알루미늄, 두께 5T',
      industry: '2차전지 장비',
      description: '고반사 소재 가공 전문',
      image: 'https://readdy.ai/api/search-image?query=battery%20electrode%20coater%20aluminum%20components%20and%20parts%20for%20secondary%20battery%20manufacturing%20equipment%2C%20precision%20aluminum%20parts%20for%20energy%20storage%20systems%2C%20clean%20battery%20manufacturing%20environment&width=400&height=300&seq=bat1&orientation=landscape'
    },
    {
      category: 'battery',
      title: '코팅장치용 부품',
      material: '구리, 두께 4T',
      industry: '2차전지 제조',
      description: '알루미늄/구리 고반사 소재',
      image: 'https://readdy.ai/api/search-image?query=copper%20coating%20equipment%20components%20for%20battery%20manufacturing%2C%20precision%20copper%20parts%20for%20secondary%20battery%20production%20systems%2C%20advanced%20battery%20manufacturing%20technology&width=400&height=300&seq=bat2&orientation=landscape'
    },
    {
      category: 'welding',
      title: '절곡 용접 모듈',
      material: 'SS41, 절곡+용접',
      industry: '산업용 모듈',
      description: '절곡 및 용접 포함 완성품',
      image: 'https://readdy.ai/api/search-image?query=welded%20and%20bent%20steel%20module%20components%20with%20complete%20fabrication%20including%20cutting%20bending%20and%20welding%2C%20finished%20industrial%20modules%20ready%20for%20assembly%2C%20professional%20metalworking%20facility&width=400&height=300&seq=weld1&orientation=landscape'
    },
    {
      category: 'welding',
      title: '파이프 용접 구조물',
      material: 'STS304, 파이프 절단+용접',
      industry: '구조물 제작',
      description: '파이프 절단→용접→조립 일괄',
      image: 'https://readdy.ai/api/search-image?query=stainless%20steel%20pipe%20welding%20structures%20with%20complete%20fabrication%20from%20cutting%20to%20welding%20to%20assembly%2C%20industrial%20pipe%20framework%20and%20structural%20components%2C%20professional%20welding%20facility&width=400&height=300&seq=weld2&orientation=landscape'
    },
    {
      category: 'custom',
      title: '캠핑용 화롯대',
      material: 'SS41, 두께 6T',
      industry: '캠핑 용품',
      description: 'B2C 커스터마이징 가공',
      image: 'https://readdy.ai/api/search-image?query=custom%20camping%20fire%20pit%20and%20brazier%20made%20by%20laser%20cutting%20steel%2C%20outdoor%20camping%20equipment%20with%20clean%20professional%20finish%2C%20camping%20gear%20manufacturing%20with%20precision%20metalwork&width=400&height=300&seq=camp1&orientation=landscape'
    },
    {
      category: 'custom',
      title: '보관대/파렛트 대차',
      material: 'AL5052, 절곡+용접',
      industry: '보관 시설',
      description: '맞춤형 보관 솔루션',
      image: 'https://readdy.ai/api/search-image?query=custom%20aluminum%20storage%20racks%20and%20pallet%20carts%20manufactured%20by%20laser%20cutting%20and%20welding%2C%20industrial%20storage%20solutions%20with%20professional%20finish%2C%20warehouse%20equipment%20manufacturing&width=400&height=300&seq=stor1&orientation=landscape'
    }
  ];

  const clients = [
    { name: '천일공조', logo: 'https://readdy.ai/api/search-image?query=professional%20company%20logo%20design%20for%20HVAC%20company%20with%20clean%20corporate%20branding%2C%20modern%20business%20logo%20with%20blue%20and%20gray%20colors%2C%20professional%20service%20company%20identity&width=200&height=100&seq=client1&orientation=landscape' },
    { name: '부강플랜트', logo: 'https://readdy.ai/api/search-image?query=industrial%20plant%20company%20logo%20with%20strong%20corporate%20design%2C%20engineering%20and%20construction%20company%20branding%2C%20professional%20industrial%20services%20logo%20design&width=200&height=100&seq=client2&orientation=landscape' },
    { name: '구영테크', logo: 'https://readdy.ai/api/search-image?query=technology%20company%20logo%20with%20modern%20tech%20branding%2C%20clean%20corporate%20logo%20design%20for%20manufacturing%20technology%20company%2C%20professional%20business%20identity&width=200&height=100&seq=client3&orientation=landscape' },
    { name: '한국산업기계', logo: 'https://readdy.ai/api/search-image?query=Korean%20industrial%20machinery%20company%20logo%20with%20professional%20corporate%20design%2C%20manufacturing%20industry%20branding%2C%20industrial%20equipment%20company%20identity&width=200&height=100&seq=client4&orientation=landscape' },
    { name: '대한정밀', logo: 'https://readdy.ai/api/search-image?query=precision%20manufacturing%20company%20logo%20with%20clean%20professional%20design%2C%20Korean%20precision%20engineering%20company%20branding%2C%20industrial%20precision%20company%20identity&width=200&height=100&seq=client5&orientation=landscape' },
    { name: '신한금속', logo: 'https://readdy.ai/api/search-image?query=metal%20processing%20company%20logo%20with%20industrial%20design%2C%20Korean%20metal%20fabrication%20company%20branding%2C%20professional%20metalworking%20company%20identity&width=200&height=100&seq=client6&orientation=landscape' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
            <h1 className="text-5xl font-bold mb-6">제품 소개</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              정밀 레이저 가공 기술로 제작된 다양한 제품군을 통해 
              고객의 요구사항에 최적화된 솔루션을 제공합니다
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

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              대표 제품군
            </h2>
            <p className="text-xl text-gray-600">
              다양한 산업 분야에 맞춤형 제품을 공급합니다
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${category.icon} text-lg`}></i>
                </div>
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-tools-line mr-2"></i>
                      <span>{product.material}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-building-line mr-2"></i>
                      <span>{product.industry}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              주요 납품 고객사
            </h2>
            <p className="text-xl text-gray-600">
              다양한 산업 분야의 고객사와 함께 성장해왔습니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow">
                <img
                  src={client.logo}
                  alt={`${client.name} 로고`}
                  className="max-w-full h-12 object-contain"
                />
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">신뢰받는 파트너</h3>
                <p className="text-gray-600 mb-6">
                  천일공조, 부강플랜트, 구영테크 등 다양한 산업 분야의 선도 기업들과 
                  장기간 협력하며 안정적인 품질의 제품을 공급하고 있습니다.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    산업기계 분야 다년간 납품 실적
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    자동차·방산 부품 공급 경험
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-blue-600 mr-3"></i>
                    2차전지 장비 부품 전문 공급
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20partnership%20and%20collaboration%20in%20manufacturing%20industry%2C%20handshake%20between%20business%20partners%20in%20modern%20industrial%20facility%2C%20trust%20and%20reliability%20in%20B2B%20manufacturing&width=500&height=400&seq=partner1&orientation=landscape"
                  alt="파트너십"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Manufacturing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              주문제작 서비스
            </h2>
            <p className="text-xl text-gray-600">
              고객의 특별한 요구사항에 맞춘 맞춤형 제작 서비스
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-file-text-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">단품·소량 주문</h3>
              <p className="text-gray-600 mb-4">
                단품부터 소량 주문까지 유연하게 대응하여 고객의 다양한 요구사항을 충족합니다.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  최소 주문 수량 없음
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  빠른 납기 대응
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-draft-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">도면 기반 가공</h3>
              <p className="text-gray-600 mb-4">
                고객이 제공하는 도면을 기반으로 정밀한 커스터마이징 가공을 진행합니다.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  CAD 도면 분석
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  치수 및 형상 정밀 구현
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-tools-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">일괄 가공 서비스</h3>
              <p className="text-gray-600 mb-4">
                절단부터 절곡, 용접까지 모든 공정을 일괄 처리하여 완성품으로 납품합니다.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  절단 + 절곡 + 용접
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-blue-600 mr-2"></i>
                  완성품 납품
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Before & After 가공 과정
                </h3>
                <p className="text-gray-600 mb-6">
                  고객의 도면을 바탕으로 정밀한 가공을 통해 완성품을 제작하는 과정을 보여드립니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <div>
                      <h4 className="font-semibold">도면 분석</h4>
                      <p className="text-sm text-gray-600">고객 도면 검토 및 가공 조건 설정</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <div>
                      <h4 className="font-semibold">정밀 가공</h4>
                      <p className="text-sm text-gray-600">레이저 절단 및 후가공 진행</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <div>
                      <h4 className="font-semibold">품질 검사</h4>
                      <p className="text-sm text-gray-600">치수 검사 및 품질 확인</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=before%20and%20after%20comparison%20of%20metal%20fabrication%20process%20showing%20CAD%20drawing%20to%20finished%20product%2C%20technical%20drawing%20beside%20completed%20precision%20metal%20part%2C%20professional%20manufacturing%20quality%20control&width=500&height=400&seq=process1&orientation=landscape"
                  alt="가공 과정"
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            맞춤형 제품 제작 문의
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            고객의 요구사항에 최적화된 제품을 정밀하게 제작해드립니다
          </p>
          <Link
            href="/support/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            제품 문의하기
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