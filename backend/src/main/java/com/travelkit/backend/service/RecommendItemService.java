package com.travelkit.backend.service;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class RecommendItemService {

    private static final String OPENAI_API_KEY= "";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private final RestTemplate restTemplate = new RestTemplate();

    public String getPreparationRecommendation(String location, String description, double temperature) {
        String prompt = String.format(
                "%s으로 여행을 갑니다. 날씨는 %s이고 기온은 %.1f°C입니다." +
                        "해당 나라의 문화를 고려하여 사람들이 놓칠만한 준비물을 7개 추천해 주세요. 쉼표로 구분해주세요",
                location, description, temperature
        );

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + OPENAI_API_KEY);
        headers.set("Content-Type", "application/json");

        // 요청 본문 설정 (gpt-4-turbo)
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4-turbo");
        requestBody.put("messages", List.of(message));
        requestBody.put("max_tokens", 100);
        requestBody.put("temperature", 0.8);    // 다양성 증가를 위한 temperature 설정
        requestBody.put("top_p", 0.9);      // 상위 90% 확률의 선택지에서만 샘플링
        requestBody.put("frequency_penalty", 0.5);  // 반복 방지
        requestBody.put("presence_penalty", 0.6);       // 새로운 내용 유도

        // 요청 본문을 JSON 형식으로 변환
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // OpenAI API로 요청
        ResponseEntity<String> response = restTemplate.exchange(
                OPENAI_API_URL, HttpMethod.POST, request, String.class
        );

        // 응답 파싱
        JSONObject jsonResponse = new JSONObject(response.getBody());
        String recommendedItems = jsonResponse
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content")
                .trim();

        return recommendedItems;
    }
}
