package com.taskmanager.backend.services;

import com.taskmanager.backend.entities.Task;
import com.taskmanager.backend.entities.User;
import com.taskmanager.backend.repositories.TaskRepository;
import com.taskmanager.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<Task> getTasks(String username) {
        return taskRepository.findAllByUser(getUser(username));
    }

    public Optional<Task> getTaskById(Long id, String username) {
        return taskRepository.findByIdAndUser(id, getUser(username));
    }

    public Task createTask(Task task, String username) {
        User user = getUser(username);
        task.setId(null);
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Optional<Task> updateTask(Long id, Task task, String username) {
        return taskRepository.findByIdAndUser(id, getUser(username))
                .map(taskToUpdate -> {
                    taskToUpdate.setTitle(task.getTitle());
                    taskToUpdate.setDescription(task.getDescription());
                    taskToUpdate.setStatus(task.getStatus());
                    return taskRepository.save(taskToUpdate);
                });
    }

    public boolean deleteTask(Long id, String username) {
        Optional<Task> task = taskRepository.findByIdAndUser(id, getUser(username));
        if (task.isEmpty()) {
            return false;
        }

        taskRepository.delete(task.get());
        return true;
    }

    private User getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }
}