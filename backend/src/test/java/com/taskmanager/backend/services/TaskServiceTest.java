package com.taskmanager.backend.services;

import com.taskmanager.backend.entities.Task;
import com.taskmanager.backend.entities.User;
import com.taskmanager.backend.repositories.TaskRepository;
import com.taskmanager.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    private TaskService taskService;
    private User user;

    @BeforeEach
    void setUp() {
        taskService = new TaskService(taskRepository, userRepository);
        user = new User();
        user.setUsername("alice");
        when(userRepository.findByUsername("alice")).thenReturn(user);
    }

    @Test
    void getTasksReturnsOnlyTasksOfAuthenticatedUser() {
        Task task = new Task();
        when(taskRepository.findAllByUser(user)).thenReturn(List.of(task));

        assertEquals(List.of(task), taskService.getTasks("alice"));
        verify(taskRepository).findAllByUser(user);
        verify(taskRepository, never()).findAll();
    }

    @Test
    void createTaskAssignsAuthenticatedUserAndDiscardsClientId() {
        Task task = new Task();
        task.setId(42L);
        when(taskRepository.save(task)).thenReturn(task);

        taskService.createTask(task, "alice");

        assertEquals(user, task.getUser());
        assertEquals(null, task.getId());
        verify(taskRepository).save(task);
    }

    @Test
    void updateTaskCannotUpdateTaskOwnedByAnotherUser() {
        when(taskRepository.findByIdAndUser(1L, user)).thenReturn(Optional.empty());

        assertFalse(taskService.updateTask(1L, new Task(), "alice").isPresent());
        verify(taskRepository, never()).save(any());
    }

    @Test
    void deleteTaskDeletesOnlyOwnedTask() {
        Task task = new Task();
        when(taskRepository.findByIdAndUser(1L, user)).thenReturn(Optional.of(task));

        assertEquals(true, taskService.deleteTask(1L, "alice"));
        verify(taskRepository).delete(task);
    }
}