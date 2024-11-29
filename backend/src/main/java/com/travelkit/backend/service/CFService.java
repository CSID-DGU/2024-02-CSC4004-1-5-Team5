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
                            if (calculateWordMeanSimilarity(item, otherItem) <= 0.8
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
        LevenshteinDistance levenshtein = new LevenshteinDistance();
        int distance = levenshtein.apply(item, otherUserItems);
        return distance;
    }


}
