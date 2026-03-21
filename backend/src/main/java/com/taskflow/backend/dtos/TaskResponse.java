package com.taskflow.backend.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TaskResponse {

    private String id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;

}
