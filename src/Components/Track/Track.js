import "./Track.css";
import React from "react";
import { Spotify } from "../../util/Spotify";
import { Audio } from "../Audio/Audio";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Get URL for Audio as soon as calling the component
  componentDidMount() {
    Spotify.getPreview(this.props.track.id).then((previewUrl) => {
      this.setState({ preview: previewUrl });
    });
  }

  // Add a song from Search Results to Playlist
  // and remove this song in Search Result
  addTrack() {
    this.props.onAdd(this.props.track);
    this.props.onRemoveSelected(this.props.track);
  }

  // Re-Add a song from Playlist to Search Results
  // and remove this song in Playlist
  removeTrack() {
    this.props.onAddSelected(this.props.track);
    this.props.onRemove(this.props.track);
  }

  // Display + in Search Results, - button in Playlist
  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}{" "}
          </p>
          <Audio previewUrl={this.state.preview} />
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
