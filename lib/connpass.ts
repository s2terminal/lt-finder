export const getEvents = async () => {
  const allEvents = await fetchEvents();
  const events = allEvents["events"]
    .filter(a => a.limit == null || a.limit - a.accepted > 0) // 参加可能
    .sort((a,b) => b.accepted - a.accepted) // 参加者が多い順
  return { events };
}

const fetchEvents = async () => {
  if (process.env.NODE_ENV == 'production') {
    const url = new URL('https://connpass.com/api/v1/event/');
    url.searchParams.append('keyword', 'LT枠');
    url.searchParams.append('count', '100');

    const res = await fetch(url.toString());
    const events = await res.json();

    return events;
  } else if (process.env.NODE_ENV == 'development') {
    // テスト用のデータ
    return {"events": [
      { "title": "てすと用の勉強会１", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": null, "accepted": 1, "waiting": 0 },
      { "title": "てすと用の勉強会２", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": 100, "accepted": 300, "waiting": 0 },
      { "title": "てすと用の勉強会３", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": 10000, "accepted": 20, "waiting": 0 },
    ]}
  }
}
