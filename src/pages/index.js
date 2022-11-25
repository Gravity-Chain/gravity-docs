import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(' hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.title)}>{siteConfig.title}</h1>
        <p className={clsx('hero__subtitle', styles.subtitle)}>{siteConfig.tagline}</p>
        <div className={clsx(styles.pt20, styles.buttons)}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started with Gravity!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={clsx(styles.bg)}>
    <Layout 
      style="background-image: url(img/header-bg.png)"
      title={`${siteConfig.title} Documentation`}
      description="The official GravityChain documentation">
      <HomepageHeader />
      <main> 
        <HomepageFeatures />
      </main>
    </Layout>
    </div>
  );
}
