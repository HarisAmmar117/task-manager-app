package com.taskflow.backend;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public boolean createTask(TaskRequest taskRequest) {
        try {
            Task task = new Task();
            updateTaskFromRequest(task, taskRequest);
            taskRepository.save(task);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    public void updateTaskFromRequest(Task task, TaskRequest request){

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());


    }
    
}
