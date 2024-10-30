package com.example.AIDJ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class TrackAnalysisController {

    @Autowired
    private TrackAnalysisService trackAnalysisService;

    @GetMapping("/track-analysis")
    public TrackAnalysis getTrackAnalysis() throws IOException {
        return trackAnalysisService.getTrackAnalysis();
    }
}
