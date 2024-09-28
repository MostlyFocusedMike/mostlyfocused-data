export default async function fetchHandler(url) {
  try {
    const response = await fetch(url);
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
