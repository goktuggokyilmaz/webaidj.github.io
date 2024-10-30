package com.example.AIDJ;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class TrackAnalysis {

    @JsonProperty("total_tracks_analyzed")
    private int totalTracksAnalyzed;

    private List<Track> tracks;

    // Getters and setters
    public int getTotalTracksAnalyzed() {
        return totalTracksAnalyzed;
    }

    public void setTotalTracksAnalyzed(int totalTracksAnalyzed) {
        this.totalTracksAnalyzed = totalTracksAnalyzed;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }
}

