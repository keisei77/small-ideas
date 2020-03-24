import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
interface NavItem {
  label: string;
  link: string;
}

interface NavProps {
  menu: NavItem[];
}

const Nav = (props: NavProps) => {
  const { menu } = props;
  const router = useRouter();
  return (
    <nav>
      <ul className="shadow-md text-lg bg-white fixed flex h-12 top-0 w-full z-10 items-center text-orange-500">
        {menu.map(item => {
          return (
            <li
              className={classNames('ml-8', {
                'text-indigo-600': item.link === router.pathname
              })}
              key={item.label}
            >
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
