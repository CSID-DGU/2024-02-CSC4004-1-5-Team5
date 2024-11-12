
package com.travelkit.backend.service;

import org.junit.jupiter.api.Test;
import java.util.Map;

public class TravelAdvisoryServiceTest {

    // TravelAdvisoryService 인스턴스 생성
    TravelAdvisoryService travelAdvisoryService = new TravelAdvisoryService();

    @Test
    public void requestAdvisory() {
        // 예시로 'AU' (Australia) 국가 코드에 대한 여행 경고 정보를 요청
        Map<String, Object> result = travelAdvisoryService.getAdvisoryByCountryCode("AU");

        // 결과 출력(여행 위험도 출력)
        System.out.println(result);
    }

}
