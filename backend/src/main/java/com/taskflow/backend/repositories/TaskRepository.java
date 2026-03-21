package com.taskflow.backend.repositories;

import org.springframework.stereotype.Repository;

import com.taskflow.backend.models.Task;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
