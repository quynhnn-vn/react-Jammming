import "./App.css";
import React from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import { trackPromise } from "react-promise-tracker";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      httpStatus: "",
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    this.search = this.search.bind(this);

    this.addSelectedTrack = this.addSelectedTrack.bind(this);
    this.removeSelectedTrack = this.removeSelectedTrack.bind(this);
  }

  // Get access token as soon as the page loads
  componentDidMount() {
    Spotify.getAccessToken();
  }

  // Return search result by a keyword
  search(term) {
    Spotify.search(term).then((searchResults) =>
      this.setState({ searchResults: searchResults })
    );
  }

  // Add songs from Search Results to Playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((currentTrack) => currentTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  // Remove songs in Playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  // Re-Add songs from Playlist to Search Results
  addSelectedTrack(track) {
    let tracks = this.state.searchResults;
    if (tracks.find((currentTrack) => currentTrack.id === track.id)) {
      return;
    }
    tracks.unshift(track);
    this.setState({ searchResults: tracks });
  }

  // Remove songs in Search Results
  removeSelectedTrack(track) {
    let tracks = this.state.searchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ searchResults: tracks });
  }

  // Update Playlist Name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // Save a new Playlist to Spotify account while tracking HTTP requests
  savePlaylist() {
    let tracks = this.state.playlistTracks;
    const trackUris = tracks.map((track) => track.uri);
    trackPromise(
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(
        (httpStatus) => {
          if (httpStatus === "Request successful") {
            this.setState({
              playlistName: "New Playlist",
              playlistTracks: [],
              httpStatus: "Success! Your playlist has been saved.",
            });
          } else {
            this.setState({ httpStatus: "Failed to save your playlist!" });
          }
          setTimeout(() => {
            this.setState({ httpStatus: "" });
          }, 5000);
        }
      )
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="hightlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemoveSelected={this.removeSelectedTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onAddSelected={this.addSelectedTrack}
              httpStatus={this.state.httpStatus}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
