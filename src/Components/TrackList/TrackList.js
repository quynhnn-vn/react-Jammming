import "./TrackList.css";
import React from "react";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <div>
              <Track
                key={track.id}
                track={track}
                isRemoval={this.props.isRemoval}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                onAddSelected={this.props.onAddSelected}
                onRemoveSelected={this.props.onRemoveSelected}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
