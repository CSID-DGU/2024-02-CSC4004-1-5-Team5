package com.travelkit.backend.service;

import com.travelkit.backend.Repository.ChecklistRepository;
import com.travelkit.backend.domain.Checklist;
import com.travelkit.backend.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import org.apache.commons.text.similarity.LevenshteinDistance;
import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.embeddings.wordvectors.WordVectors;

import java.io.File;

@Service
public class CFService {
    String modelPath = "C:\\Users\\minwo\\Documents\\word2vec\\word2vec_model_korean.txt";  // 실제 경로로 변경
    // 모델 로드
    File modelFile = new File(modelPath);
    WordVectors wordVectors = WordVectorSerializer.loadStaticModel(modelFile);
    private final ChecklistRepository checklistRepository;

    @Autowired
    public CFService(ChecklistRepository checklistRepository) {
        this.checklistRepository = checklistRepository;
    }

    public Map<String, Double> recommendItems(Long checklistId) {
        // 사용자별 준비물 매트릭스 생성
        Map<Long, Set<String>> userItemsMap = new HashMap<>();
        Checklist target = checklistRepository.findById(checklistId).orElse(null);
        if (target == null) {
            return null;
        }
        List<Checklist> checklists = checklistRepository.findByDestinationCountry(target.getDestination().getCountry());
        for (Checklist checklist : checklists) {
            Set<String> items = Optional.ofNullable(checklist.getChecklistItems())
                    .orElse(Collections.emptyList())
                    .stream()
                    .map(Item::getName)
                    .collect(Collectors.toSet());
            userItemsMap.put(checklist.getId(), items);
        }
        // 현재 사용자의 준비물 가져오기
        Set<String> currentUserItems = userItemsMap.getOrDefault(checklistId, new HashSet<>());

        // 사용자 간 유사도 계산
        Map<Long, Double> similarityMap = new HashMap<>();
        for (Map.Entry<Long, Set<String>> entry : userItemsMap.entrySet()) {
            Long otherChecklistId = entry.getKey();
            if (!otherChecklistId.equals(checklistId)) {
                double similarity = calculateCosineSimilarity(currentUserItems, entry.getValue());
                similarityMap.put(otherChecklistId, similarity);
            }
        }

        // 유사도 기반 추천 준비물 계산
        Map<String, Double> recommendationScores = new HashMap<>();
        for (Map.Entry<Long, Double> entry : similarityMap.entrySet()) {
            Long otherChecklistId = entry.getKey();
            Double similarity = entry.getValue();

            // 유사 사용자가 추가한 준비물 중 현재 사용자가 추가하지 않은 것만 추천
            Set<String> otherUserItems = userItemsMap.get(otherChecklistId);
            for (String item : otherUserItems) {
                if (!currentUserItems.contains(item)) { // 추천 하지 않은 품목들
                    for (String otherItem : otherUserItems) {
                        // 'item'과 다른 'otherItem'이 다르면 유사도 계산
                        if (!item.equals(otherItem)) {
                            if (calculateWordMeanSimilarity(item, otherItem) <= 0.8 // 형태 유사도, 의미 유사도
                                    && calculateWordFormSimilarity(item, otherItem) >= 2) {
                                // 기존 추천 점수가 존재하면 현재 유사도와 비교하여 더 높은 값을 저장
                                double existingScore = recommendationScores.getOrDefault(item, 0.0);
                                if (similarity > existingScore) {
                                    recommendationScores.put(item, similarity);
                                }
                            }
                        }
                    }
                }
            }

        }
        // 추천 준비물 리스트 정렬
        Map<String, Double> sortedItemsDesc = recommendationScores.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue,
                        LinkedHashMap::new // 정렬된 순서를 유지
                ));

        return sortedItemsDesc;
    }

    private double calculateCosineSimilarity(Set<String> itemsA, Set<String> itemsB) {
        // 교집합 크기 계산
        long intersectionSize = itemsA.stream().filter(itemsB::contains).count();
        // 코사인 유사도 계산
        return (double) intersectionSize / Math.sqrt(itemsA.size() * itemsB.size());
    }

    private double calculateWordMeanSimilarity(String item, String otherUserItems) {
        double similarity = wordVectors.similarity(item, otherUserItems);
        return similarity;
    }

    private int calculateWordFormSimilarity(String item, String otherUserItems) {
        // 초성, 중성, 종성 문자열로 분리
        String decomposedItem = decomposeToJamo(item);
        String decomposedOtherUserItems = decomposeToJamo(otherUserItems);

        // LevenshteinDistance 객체 생성
        LevenshteinDistance levenshtein = new LevenshteinDistance();

        // 편집 거리 계산
        return levenshtein.apply(decomposedItem, decomposedOtherUserItems);
    }

    private String decomposeToJamo(String word) {
        StringBuilder result = new StringBuilder();
        for (char c : word.toCharArray()) {
            if (c >= 0xAC00 && c <= 0xD7A3) { // 한글 유니코드 범위
                int base = c - 0xAC00;
                char chosung = CHOSUNG[base / (21 * 28)];
                char jungsung = JUNGSUNG[(base / 28) % 21];
                char jongsung = JONGSUNG[base % 28];

                // 결과에 초성, 중성, 종성 추가
                result.append(chosung).append(jungsung);
                if (jongsung != ' ') { // 종성이 있을 경우만 추가
                    result.append(jongsung);
                }
            } else {
                // 한글이 아닌 경우 그대로 추가
                result.append(c);
            }
        }
        return result.toString();
    }

    // 초성, 중성, 종성 배열 정의
    private static final char[] CHOSUNG = {'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};
    private static final char[] JUNGSUNG = {'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'};
    private static final char[] JONGSUNG = {' ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};


}
