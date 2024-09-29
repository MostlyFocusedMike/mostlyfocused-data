export default async function fetchHandler(route) {
  const host = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://traffic.mostlyfocused.com'

  try {
    const response = await fetch(host + route);
    const { ok, status, statusText, headers } = response;
    if (!ok) throw new Error(`Fetch failed with status - ${status}, ${statusText}`);

    const isJson = (headers.get('content-type') || '').includes('application/json');
    const responseData = await (isJson ? response.json() : response.text());

    return [null, responseData];
  } catch (error) {
    console.error(error)
    return [error, null];
  }
};
