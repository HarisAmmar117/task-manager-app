package com.taskflow.backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    TaskService taskService;


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
   
    

    

}
