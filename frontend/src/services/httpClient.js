export async function httpGetJson(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Accept": "application/json" }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} - ${response.statusText}. ${text}`);
  }

  return response.json();
}

