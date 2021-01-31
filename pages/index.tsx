import React from 'react';
import Head from 'next/head';
import { getEvents } from '../lib/connpass';

export async function getStaticProps(_context) {
  const updatedAt = new Date();
  return {
    props: { "events": getEvents(), updatedAt: updatedAt.toString() }
  }
}

const Event = ({ event }) => {
  const date = new Date(event.started_at);
  return <div>
    <h3>{event.title}</h3>
    <a href={event.event_url} target="blank">{event.event_url}</a>
    <div>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日</div>
    <div>聴講者含む参加者数: {event.accepted}/{event.limit}人</div>
  </div>
}

export default function Home(props) {
  const title = `LT Finder`;
  return (
    <div>
      <Head>
        <title>title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{title}</h1>
        <p>
          <a href="https://connpass.com/about/api/" target="blank">connpass API</a>を使っています。
          不定期に実行しています。怒られたら止まります。
        </p>
        <p>最終更新: {props.updatedAt}</p>
        {props.events.events.map(event => <Event event={event} />)}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img height="16" src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer>
    </div>
  )
}
