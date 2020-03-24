import React, { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';
import Head from '../components/Head';

import { initGA, logPageView } from '../components/googleAnalytics';

const Home = props => {
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
      {/* <div>Homepage</div> */}
      <style jsx>{`
        * {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
