package com.travelkit.backend.service;

import com.travelkit.backend.domain.Destination;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
public class OpenAIServiceTest {

    @Autowired
    private OpenAIService travelPreparationService;

    @Test
    public void requestPreparationList() {
        // Destination 객체 생성`
        String country = "Japan";
        String city = "Osaka";
        Destination destination = new Destination(country, city);
        // 서비스 호출
        Map<String, Object> result = travelPreparationService.getPreparationList(destination);

        // 결과 출력
        System.out.println(city + country + "가는데 필요한 준비물 10개 : ");
        System.out.println(result.get("preparationList"));
    }
}
