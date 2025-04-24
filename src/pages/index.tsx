import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from './_oldLayout';
import Sierpinski from '@site/src/components/triangle';

import styles from './index.module.css';
import "./index.css"

const IntroductoryHeader = () => (
  <header>
    <h1>hello, I'm Alex Birdsall</h1>
    <p>I make music, cook food, and build websites and computer programs</p>
    <aside>
      (<a href="/resume">Here is my resumé</a>, if you're a software engineer
      hiring sort)
    </aside>
  </header>
)

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`}>
      <IntroductoryHeader />
      <main>
        <Sierpinski />
      </main>
    </Layout>
  );
}
