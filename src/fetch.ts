/** wrapped fetch api but retries upon failure */
export async function fetchRetry(url: RequestInfo,
    { init, retry = 3 }: { init?: RequestInit, retry?: number } = {})
    : Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (err) {
    if (retry === 1) throw err;
    return await fetchRetry(url, { init, retry: retry - 1 });
  }
}
