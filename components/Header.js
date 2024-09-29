import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiSearch, FiFileText, FiInfo, FiMail } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
        <div className="flex flex-col h-full">
          <div className="p-5">
            <h1 className="text-2xl font-bold">ISE</h1>
          </div>
          <ul className="flex-grow">
            <NavItem href="/" icon={<FiHome />} text="Home" />
            <NavItem href="/research" icon={<FiSearch />} text="Research" />
            <NavItem href="/news" icon={<FiFileText />} text="News" />
            <NavItem href="/about" icon={<FiInfo />} text="Who is ISE?" />
            <NavItem href="/contact" icon={<FiMail />} text="Contact" />
          </ul>
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ href, icon, text }) => (
  <li>
    <Link href={href}>
      <span className="flex items-center px-5 py-3 hover:bg-gray-800 cursor-pointer">
        {icon}
        <span className="ml-2">{text}</span>
      </span>
    </Link>
  </li>
);

export default Header;