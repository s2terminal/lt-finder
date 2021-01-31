import React from 'react';
import Head from 'next/head';
import { getEvents } from '../lib/connpass';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc'; // dependent on utc plugin
import timezone from 'dayjs/plugin/timezone';
dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export async function getStaticProps(_context) {
  const updatedAt = dayjs().tz('Asia/Tokyo').format('YYYY年MM月DD日(ddd)HH時mm分ss秒ごろ');
  const events = await getEvents()
  return {
    props: { events, updatedAt: updatedAt.toString() }
  }
}

const Event = ({ event }) => {
  const date = dayjs(event.started_at);
  return <div>
    <h3>
      <a href={event.event_url} target="blank">{event.title}</a>
    </h3>
    <div>{date.format('YYYY年MM月DD日(ddd)')}</div>
    <div>聴講者含む参加者数: {event.accepted}/{event.limit ? event.limit : "-"}人</div>
  </div>
}

export default function Home(props) {
  const title = `わくわくLT枠`;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{title}</h1>
      </header>

      <main>
        <div>
          <ul>
            <li>LT枠のありそうなイベントを探しています。</li>
            <li><a href="https://connpass.com/about/api/" target="blank">connpass API</a>を使っています。</li>
            <li>ときどき更新されます。</li>
            <li>最終更新: {props.updatedAt}</li>
            <li>リポジトリ: <a href="https://github.com/s2terminal/lt-finder" target="blank">https://github.com/s2terminal/lt-finder</a></li>
          </ul>
          {props.events.events.map(event => <Event event={event} />)}
        </div>
      </main>
    </div>
  )
}
