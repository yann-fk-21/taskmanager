package com.taskmanager.backend.entities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

class TaskJsonSerializationTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void taskJsonDoesNotRepeatUserTasks() throws Exception {
        User user = new User();
        user.setUsername("alice");

        Task task = new Task();
        task.setTitle("Première tâche");
        task.setUser(user);
        user.getTasks().add(task);

        JsonNode json = objectMapper.readTree(objectMapper.writeValueAsString(task));

        assertFalse(json.path("user").has("tasks"));
    }
}