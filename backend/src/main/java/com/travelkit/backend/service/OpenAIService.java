package com.travelkit.backend.service;

import com.travelkit.backend.domain.Item;
import com.travelkit.backend.domain.Destination;
import com.travelkit.backend.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    private final String OPENAI_API_KEY = "";  // 실제 API 키 설정
    private final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    private final ItemRepository itemRepository;

    @Autowired
    public OpenAIService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Transactional
    public Map<String, Object> getPreparationList(Destination destination) {
        RestTemplate restTemplate = new RestTemplate();

        // Destination 객체에서 city와 country 값을 가져옴
        String country = destination.getCountry();
        String city = destination.getCity();

        // OpenAI 프롬프트 설정
        String userMessage = String.format("%s, %s에 필요한 준비물 10개: 이름만", city, country);

        // 요청 바디 구성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");

        // messages 배열로 대화 형식 설정
        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a helpful assistant.");

        Map<String, Object> userMessageMap = new HashMap<>();
        userMessageMap.put("role", "user");
        userMessageMap.put("content", userMessage);

        requestBody.put("messages", new Object[] { systemMessage, userMessageMap });
        requestBody.put("max_tokens", 500);
        requestBody.put("temperature", 0.7);

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        // 요청 보내기
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, entity, String.class);

        Map<String, Object> preparationList = new HashMap<>();
        try {
            // 응답 처리
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            String items = responseJson.path("choices").get(0).path("message").path("content").asText("");

            // 아이템 리스트 생성 및 저장
            String[] itemList = items.split("\n");
            for (String itemName : itemList) {
                if (!itemName.trim().isEmpty()) {
                    // 번호와 점을 제거
                    String cleanItemName = itemName.replaceAll("^[0-9]+\\.", "").trim();  // 번호 제거
                    if (!cleanItemName.isEmpty()) {
                        Item item = new Item();
                        item.setName(cleanItemName);  // 아이템 이름 설정
                        itemRepository.save(item);  // ItemRepository를 통해 아이템 저장
                    }
                }
            }

            preparationList.put("preparationList", items);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate preparation list", e);
        }

        return preparationList;
    }
}
