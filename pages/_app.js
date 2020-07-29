import React, { useMemo } from 'react';
import App from 'next/app';
import './css/tailwind.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  const menus = useMemo(
    () => [
      {
        label: '首页',
        link: '/',
      },
      {
        label: '疫情',
        link: '/ncov',
      },
      {
        label: '热搜',
        link: '/weibo',
      },
      // {
      //   label: '拼图',
      //   link: '/jigsaw',
      // },
    ],
    []
  );
  return (
    <div className="layout">
      <Nav menu={menus} />
      <div className="pt-12">{children}</div>
      <Footer />
    </div>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
