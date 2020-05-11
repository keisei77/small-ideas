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
      <Head title="Small Ideas" />
      <Quotes />
      <style jsx>{`
        * {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
