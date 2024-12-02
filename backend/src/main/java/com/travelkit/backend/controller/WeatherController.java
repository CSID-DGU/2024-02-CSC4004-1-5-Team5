package com.travelkit.backend.controller;

import com.travelkit.backend.domain.Checklist;
<<<<<<< HEAD
import com.travelkit.backend.service.ChecklistService;
import com.travelkit.backend.service.CityService;
import com.travelkit.backend.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weather")
public class WeatherController {
    private final ChecklistService checklistService;
    private final WeatherService weatherService;
    private final CityService cityService;

    @GetMapping("/{checklistId}")
    public ResponseEntity<?> getChecklistWeather(@PathVariable Long checklistId) {
        Optional<Checklist> optionalChecklist = checklistService.getChecklistById(checklistId);
        if (optionalChecklist.isPresent()) {
            Checklist checklist = optionalChecklist.get();
            String cityName = checklist.getDestination().getCity();    // 도시 이름 정보

            // 도시 이름으로 좌표 변환
            Optional<Map<String, Double>> coordinatesOptional = cityService.getCoordinatesByCity(cityName);

            if (coordinatesOptional.isPresent()) {
                Map<String, Double> coordinates = coordinatesOptional.get();
                double latitude = coordinates.get("latitude");
                double longitude = coordinates.get("longitude");

                // 좌표로 날씨 정보를 가져오기
                Map<String, Object> forecastData = weatherService.getForecastByCoordinates(latitude, longitude);

                // 날씨 정보 반환
                return ResponseEntity.ok(forecastData);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("City not found in database.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Checklist not found.");
        }
    }
}
=======
import com.travelkit.backend.domain.Weather;
import com.travelkit.backend.service.ChecklistService;
import com.travelkit.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private ChecklistService checklistService;

    @GetMapping("/{checklistId}")
    public ResponseEntity<List<Weather>> fetchWeatherData(@PathVariable("checklistId") Long checklistId) throws IOException {
        List<Weather> weatherlist = weatherService.getWeatherByChecklistId(checklistId);
            return new ResponseEntity<>(weatherlist, HttpStatus.CREATED);
    }
}
>>>>>>> 78b4cb00fac566f804501463cb86a57ea8b9ffee
