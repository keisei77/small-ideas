import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts-stat/dist/ecStat.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/dataTool.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts/map/js/china.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts/map/js/world.js"
    ></script>
    <script
      type="text/javascript"
      src="https://api.map.baidu.com/api?v=2.0&ak=CLFbmHB0P9lEc50Nsr2FvSpttxpRBorY"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js"
    ></script>
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
