import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/api/top-played">Top Played</Link>
      </li>
      <li>
        <Link href="/api/now-playing">Now Playing</Link>
      </li>
    </ul>
  )
}
