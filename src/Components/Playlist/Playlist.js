import "./Playlist.css";
import React from "react";
import { TrackList } from "../TrackList/TrackList";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // Handle new Playlist name input event
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
          onAddSelected={this.props.onAddSelected}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
        <LoadingIndicator />
        <p className="Playlist-status"> {this.props.httpStatus} </p>
      </div>
    );
  }
}
