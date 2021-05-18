import "./Audio.css";
import React from "react";

export class Audio extends React.Component {
  // Render an audio if its URL is not null
  render() {
    if (this.props.previewUrl !== "null") {
      return (
        <audio
          className="Audio"
          controls
          src={this.props.previewUrl.slice(1, -1)}
        ></audio>
      );
    } else {
      return <p className="Non-Audio">--Preview is not available--</p>;
    }
  }
}
