export const getEvents = () => {
  return fetchEvents();
}

const fetchEvents = () => {
  if (process.env.NODE_ENV == 'production') {
    // FIXME: 実装する
    return null;
  } else if (process.env.NODE_ENV == 'development') {
    // テスト用のデータ
    return {"events": [
      { "title": "てすと用の勉強会１", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": null, "accepted": 2, "waiting": 0 },
      { "title": "てすと用の勉強会２", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": 100, "accepted": 2, "waiting": 0 },
      { "title": "てすと用の勉強会３", "event_url": "https://example.com",
      "started_at": "2021-01-31T16:00:00+09:00", "limit": 10000, "accepted": 2, "waiting": 0 },
    ]}
  }
}
