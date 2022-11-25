import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Gravity Runs on Mobile',
    // Svg: require('@site/static/img/phone_img.svg').default,
    description: (
      <>
        Your mobile device acts a miner which powers the block mining with low cost and energy usage
      </>
    ),
  },
  {
    title: 'Gravity blockchain has zero gas fees',
    // Svg: require('@site/static/img/chain.svg').default,
    description: (
      <>
        Transactions on Gravity blockchain are always free without any gas fee. Since you as a user is also a miner that means the chain does not need any additional tokens as fees.
      </>
    ),
  },
  {
    title: 'Easiest blockchain to develop dApps',
    // Svg: require('@site/static/img/code_img.svg').default,
    description: (
      <>
        Develop Gravity blockchain powered apps using native Kotlin (Android) and Swift (iOS) using simple SDK
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
