package com.example.AIDJ;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
public class TrackAnalysisService {

    public TrackAnalysis getTrackAnalysis() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = getClass().getResourceAsStream("/track_analysis.json");

        if (inputStream == null) {
            throw new IOException("File not found: track_analysis.json");
        }

        return objectMapper.readValue(inputStream, TrackAnalysis.class);
    }
}

