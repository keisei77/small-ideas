import React, { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';

import greymon from 'greymon';
import Head from '../components/Greymon/Head';
import Body from '../components/Greymon/Body';
import Arms from '../components/Greymon/Arms';
import Legs from '../components/Greymon/Legs';
import Foots from '../components/Greymon/Foots';

const Jigsaw = (props) => {
  console.log(greymon);

  // greymon.perfect
  // components
  // actions
  return (
    <>
      <Head />
      <Body />
      <Arms />
      <Legs />
      <Foots />
    </>
  );
};

export default Jigsaw;
