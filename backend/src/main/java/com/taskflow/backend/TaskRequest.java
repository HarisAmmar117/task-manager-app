package com.taskflow.backend;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private String status;

}
