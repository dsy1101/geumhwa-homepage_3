// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    title: "회사소개",
    href: "/kumhwa",
  },
  {
    title: "사업현황",
    href: "/company",
    dropdown: [
      { title: "사업분야", href: "/company/business" },
      { title: "인증현황", href: "/company/certification" },
    ],
  },
  {
    title: "기술 및 서비스",
    href: "/products",
        dropdown: [
      { title: "레이저가공", href: "/products/laser" },
      { title: "제품", href: "/products/product" },
      { title: "공정", href: "/products/process" },
      { title: "기술력", href: "/products/technology" },
    ],
  },
  {
    title: "고객지원",
    href: "/support/contact",
    dropdown: [
      { title: "문의하기", href: "/support/contact" },
    ],
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="https://static.readdy.ai/image/1ff0918651835526a3a0d66786fe9132/f961bea3ffc98767631d59484c4ff812.png"
                alt="금화레이저 로고"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* PC 메뉴 */}
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

          {/* 모바일 메뉴 아이콘 (추후 개발용) */}
          <button className="md:hidden">
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
