package com.backend.task_management.controller;

import com.backend.task_management.model.Task;
import com.backend.task_management.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody Task task){
        return new ResponseEntity<Task>(taskService.saveTask(task), HttpStatus.CREATED);
    }

    @GetMapping("/lastFiveIncompleteTasks")
    public ResponseEntity<List<Task>> getLastFiveIncompleteTasks(){
        return new ResponseEntity<List<Task>>(taskService.findLastFiveIncompleteTasks(), HttpStatus.OK);
    }

    @PutMapping("/completeTask/{id}")
    public ResponseEntity<Task> completeTask(@PathVariable int id){
        return new ResponseEntity<Task>(taskService.completeTask(id),HttpStatus.OK);
    }
}
