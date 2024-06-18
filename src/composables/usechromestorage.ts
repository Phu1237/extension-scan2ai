export default function useChromeStorage() {
  const get = (get, callback) => {
    return chrome.storage.local.get(get, callback);
  }

  return {
    get,
  }
}
