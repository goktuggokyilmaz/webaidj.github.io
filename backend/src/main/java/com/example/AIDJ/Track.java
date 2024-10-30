package com.example.AIDJ;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Track {

    @JsonProperty("track_id")
    private String trackId;

    private List<Feature> features;

    // Getters and setters
    public String getTrackId() {
        return trackId;
    }

    public void setTrackId(String trackId) {
        this.trackId = trackId;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }
}
