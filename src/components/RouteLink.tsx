export default function RouteLink({ route }: { route: string }) {
  return <a
    href={`https://mostlyfocused.com${route}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={route}
  >Link</a>
}