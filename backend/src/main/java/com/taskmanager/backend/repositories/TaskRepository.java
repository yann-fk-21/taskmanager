package com.taskmanager.backend.repositories;

import com.taskmanager.backend.entities.Task;
import com.taskmanager.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser(User user);

    Optional<Task> findByIdAndUser(Long id, User user);
}
