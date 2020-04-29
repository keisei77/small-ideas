import React, { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';
import Head from '../components/Head';

import { initGA, logPageView } from '../components/googleAnalytics';
import { Quotes } from '../components/Quotes';

const Home = (props) => {
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA();
      (window as any).GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  return (
    <div>
      <Head title="每日数据汇总" />
      <Quotes />
      <video controls>
        <source
          src="http://f.video.weibocdn.com/002DOBTfgx07CR66qUic01041200u1Ev0E010.mp4?label=mp4_ld&amp;template=360x636.24.0&amp;trans_finger=81b11b8c5ffb62d33ceb3244bdd17e7b&amp;Expires=1588090519&amp;ssig=6%2B4Y6Te4MB&amp;KID=unistore,video"
          type="video/mp4"
        ></source>
      </video>
      <style jsx>{`
        * {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
