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




@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
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


    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        return ResponseEntity.ok(taskService.fetchAllTasks());

    }
    
    
   
    

    

}
