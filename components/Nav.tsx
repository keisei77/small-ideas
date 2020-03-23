import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  link: string;
}

interface NavProps {
  menu: NavItem[];
}

const Nav = (props: NavProps) => {
  const { menu } = props;
  return (
    <nav>
      <ul className="bg-white fixed flex h-12 top-0 w-full z-10 items-center text-orange-500">
        {menu.map(item => {
          return (
            <li className="ml-4" key={item.label}>
              <Link href={item.link}>
                <a>{item.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
