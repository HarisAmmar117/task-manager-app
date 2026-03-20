package com.taskflow.backend;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;


    //creating new task
    public boolean createTask(TaskRequest taskRequest) {
       
        if (taskRequest.getTitle() == null || taskRequest.getTitle().trim().isEmpty()) {
            return false;
        }
        
        if (taskRequest.getTitle().length() < 3 || taskRequest.getTitle().length() > 100) {
            return false;
        }

      
        if (taskRequest.getStatus() == null || taskRequest.getStatus().trim().isEmpty()) {
            return false;
        }


        if (taskRequest.getDescription() != null && taskRequest.getDescription().length() > 500) {
            return false;
        }

        try {
            Task task = new Task();
            updateTaskFromRequest(task, taskRequest);
            taskRepository.save(task);
            return true;
        } catch (Exception e) {
            return false;
        }
    }




    //get all task
    public List<TaskResponse> fetchAllTasks() {
       
        return taskRepository.findAll().stream()
            .map(this::mapTasktoTaskResponse)
            .collect(Collectors.toList());
    }


    //get a task by id
    public TaskResponse fetchTask(Long id) {
        
        return taskRepository.findById(id)
                    .map(this::mapTasktoTaskResponse)
                    .orElse(null);
    }


    //converting task request to task
    public void updateTaskFromRequest(Task task, TaskRequest request){

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());


    }


    //converting task to task response
    public TaskResponse mapTasktoTaskResponse(Task task){

        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setId(String.valueOf(task.getId()));
        taskResponse.setTitle(task.getTitle());
        taskResponse.setDescription(task.getDescription());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setCreatedAt(task.getCreatedAt());

        return taskResponse;

    }





 
    
}
