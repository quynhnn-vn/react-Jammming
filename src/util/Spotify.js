const clientId = "fcf0ede0a25d4df6a656dfca2ddac0a1";
const redirectUri = "http://jammming-qnn.surge.sh";
let accessToken;

export const Spotify = {
  // Obtain a Spotify access token
  // using Implicit Grant Flow of Spotify API
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      // Returns URL of the current page
      const currentUrl = window.location.href;
      // Retrieve the access token and expiration time from the URL
      const hasAccessToken = currentUrl.match(/access_token=([^&]*)/);
      const hasExpiresIn = currentUrl.match(/expires_in=([^&]*)/);
      if (hasAccessToken && hasExpiresIn) {
        accessToken = hasAccessToken[1];
        const expiresIn = hasExpiresIn[1];
        // Set the access token to expire after expiration time
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // Clear the access token from URL
        window.history.pushState("Access Token", null, "/");
      } else {
        const accessUrl =
          "https://accounts.spotify.com/authorize?" +
          "client_id=" +
          clientId +
          "&response_type=token" +
          "&redirect_uri=" +
          redirectUri +
          "&scope=playlist-modify-public";
        // Redirect to URL for getting new access token
        window.location.assign(accessUrl);
      }
    }
  },

  // Return list of songs as search results by a keyword
  async search(term) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    // Get Spotify Catalog information that match a keyword
    try {
      const response = await fetch(urlToFetch, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Obtain URL of preview mp3 file for a song
  async getPreview(trackId) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const urlToFetch = `https://api.spotify.com/v1/tracks/${trackId}`;

    const response = await fetch(urlToFetch, {
      method: "GET",
      headers: headers,
    });
    const jsonResponse = await response.json();
    const preview = JSON.stringify(jsonResponse.preview_url);
    return preview;
  },

  // Save a custom Playlist to Spotify account of user
  async savePlaylist(playlistName, trackUris) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userId, playlistId;
    if (!playlistName || !trackUris.length) {
      return;
    }
    try {
      // Request1: GET ID of current user
      const getUserIdUrl = `https://api.spotify.com/v1/me`;
      const response1 = await fetch(getUserIdUrl, {
        headers: headers,
      });
      if (response1.ok) {
        const jsonResponse1 = await response1.json();
        userId = jsonResponse1.id;
        try {
          // Request2: POST a new playlist with input name to Spotify account
          const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
          const response2 = await fetch(createPlaylistUrl, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ name: playlistName }),
          });
          if (response2.ok) {
            const jsonResponse2 = await response2.json();
            playlistId = jsonResponse2.id;
            try {
              // Request3: POST track URIs to newly-created playlist
              const postTrackUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
              const response3 = await fetch(postTrackUrl, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              });
              if (response3.ok) {
                return "Request successful";
              } else {
                return "Request failed";
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
