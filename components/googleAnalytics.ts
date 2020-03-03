import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-106134976-3');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
