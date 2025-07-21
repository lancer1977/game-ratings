// retroachievements.js

const RA_API_BASE = "https://retroachievements.org/API";

export const RAStorage = {
  setCredentials(username, apiKey) {
    localStorage.setItem("ra_username", username);
    localStorage.setItem("ra_apikey", apiKey);
  },
  getCredentials() {
    return {
      username: localStorage.getItem("ra_username"),
      apiKey: localStorage.getItem("ra_apikey")
    };
  },
  clearCredentials() {
    localStorage.removeItem("ra_username");
    localStorage.removeItem("ra_apikey");
  }
};

export async function getUserProfile(targetUsername) {
  const { username, apiKey } = RAStorage.getCredentials();
  if (!username || !apiKey) {
    throw new Error("RetroAchievements credentials not found in storage.");
  }

  const url = `${RA_API_BASE}/API_GetUserProfile.php?z=${username}&y=${apiKey}&u=${targetUsername}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.statusText}`);
  }

  return res.json();
}
