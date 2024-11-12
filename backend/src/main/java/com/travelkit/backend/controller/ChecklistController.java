package com.travelkit.backend.controller;

import com.travelkit.backend.domain.Checklist;
import com.travelkit.backend.domain.Item;
import com.travelkit.backend.service.ChecklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/checklists")
public class ChecklistController {
    private final ChecklistService checklistService;

    // 체크리스트 생성
    @PostMapping("/create")
    public ResponseEntity<Checklist> createChecklist(@RequestBody Checklist checklist) {
        Checklist createdChecklist = checklistService.createChecklist(checklist);
        return new ResponseEntity<>(createdChecklist, HttpStatus.CREATED);
    }

    // 특정 체크리스트 조회
    @GetMapping("/{id}")
    public ResponseEntity<Checklist> getChecklistById(@PathVariable("id") Long id) {
        return checklistService.getChecklistById(id)
                .map(checklist -> new ResponseEntity<>(checklist, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    // 모든 체크리스트 조회
    @GetMapping
    public List<Checklist> getAllChecklists() {
        return checklistService.getAllChecklists();
    }

    // 체크리스트 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChecklist(@PathVariable("id") Long id) {
        checklistService.deleteChecklist(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 체크리스트에 아이템 추가
    @PostMapping("/{checklistId}/items/add")
    public ResponseEntity<Item> addItemToChecklist(@PathVariable("checklistId") Long checklistId, @RequestBody Item item) {
        Item createdItem = checklistService.addItemToChecklist(checklistId, item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    // 특정 체크리스트의 아이템 조회
    @GetMapping("/{checklistId}/items")
    public List<Item> getItemsByChecklistId(@PathVariable("checklistId") Long checklistId) {
        return checklistService.getItemsByChecklistId(checklistId);
    }
}
