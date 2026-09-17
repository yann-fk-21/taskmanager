package com.taskmanager.backend.controllers;


import com.taskmanager.backend.entities.Task;
import com.taskmanager.backend.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication) {
        return ResponseEntity.ok(taskService.getTasks(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        if (task == null) {
            return ResponseEntity.badRequest().build();
        }

        Task taskCreated = taskService.createTask(task, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(taskCreated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, Authentication authentication) {
        return taskService.getTaskById(id, authentication.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task,
                                           Authentication authentication) {
        if (task == null) {
            return ResponseEntity.badRequest().build();
        }

        return taskService.updateTask(id, task, authentication.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Authentication authentication) {
        if (taskService.deleteTask(id, authentication.getName())) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
