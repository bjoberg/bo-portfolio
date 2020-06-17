import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { DefaultSeo } from 'next-seo';

import { Theme } from '../src/styles';
import { PersonalData } from '../src/constants';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const { TITLE, APP_ENV } = process.env;

  console.log(TITLE, APP_ENV);

  const dangerouslySetAllPagesToNoIndex = APP_ENV !== 'production' ? true : undefined;
  const dangerouslySetAllPagesToNoFollow = APP_ENV !== 'production' ? true : undefined;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) { jssStyles.parentElement.removeChild(jssStyles); }
  }, []);

  return (
    <Fragment>
      <DefaultSeo
        dangerouslySetAllPagesToNoIndex={dangerouslySetAllPagesToNoIndex}
        dangerouslySetAllPagesToNoFollow={dangerouslySetAllPagesToNoFollow}
        title={TITLE}
        description={PersonalData.bio}
      />
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object,
};

MyApp.defaultProps = {
  pageProps: {},
};

export default MyApp;
