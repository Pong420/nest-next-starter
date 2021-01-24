import React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { CommonMeta } from '@/components/Meta';
import { GoBackProvider } from '@/hooks/useGoBack';
import { UserRole } from '@/typings';
import '@/styles/globals.scss';

interface LayoutProps {
  children?: React.ReactNode;
  disableScrollRestoration?: boolean;
}

interface ExtendAppProps extends AppProps {
  Component: AppProps['Component'] & {
    access?: UserRole[];
    redirect?: string;
    layoutProps?: Omit<LayoutProps, 'children'>;
    layout?: React.ComponentType<LayoutProps>;
  };
}

function AppContent(props: ExtendAppProps) {
  const { Component, pageProps } = props;
  const Layout = Component.layout || React.Fragment;
  return (
    <Layout {...Component.layoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

function App(props: ExtendAppProps) {
  return (
    <GoBackProvider>
      <CommonMeta />
      <AppContent {...props} />
    </GoBackProvider>
  );
}

export default App;
