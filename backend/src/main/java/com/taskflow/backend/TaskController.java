package com.taskflow.backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;







@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;


    //creating new task
    @PostMapping
    public ResponseEntity<String> addTask(@RequestBody TaskRequest taskRequest) {
        
        boolean isSuccessful = taskService.createTask(taskRequest);
        
        if (isSuccessful) {
            return ResponseEntity.status(HttpStatus.CREATED)
                            .body("Task Successfully Created");
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Task Creation Failed");
    }


    //get all task
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        return ResponseEntity.ok(taskService.fetchAllTasks());

    }


    //get a task by id
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTask(@PathVariable Long id){

        return ResponseEntity.ok(taskService.fetchTask(id));
    }


    //update a task by id
    @PutMapping("/{id}")
    public ResponseEntity<String> editTask(@PathVariable Long id, @RequestBody TaskRequest taskRequest) {
        boolean updated = taskService.updateTask(id, taskRequest);
        
        if (updated) {
            return ResponseEntity.ok("Task updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task failed to update");
        }
    }

    
    
   
    

    

}
