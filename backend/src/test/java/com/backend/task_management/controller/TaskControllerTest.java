package com.backend.task_management.controller;

import com.backend.task_management.model.Status;
import com.backend.task_management.model.Task;
import com.backend.task_management.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    @Test
    void saveTask() throws Exception {
        LocalDateTime dateTime = LocalDateTime.now();
        Task taskToSave = new Task();
        taskToSave.setTitle("New Task");
        taskToSave.setDescription("New Description");

        Task savedTask = new Task(1, "New Task", "New Description", Status.INCOMPLETE, dateTime);

        when(taskService.saveTask(any(Task.class))).thenReturn(savedTask);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskToSave)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("New Task"))
                .andExpect(jsonPath("$.description").value("New Description"))
                .andExpect(jsonPath("$.status").value("INCOMPLETE"));

        verify(taskService, times(1)).saveTask(any(Task.class));
    }

    @Test
    void getLastFiveIncompleteTasks() throws Exception {
        LocalDateTime dateTime = LocalDateTime.now();
        List<Task> tasks = Arrays.asList(
                new Task(1, "Task 1", "Description 1", Status.INCOMPLETE, dateTime),
                new Task(2, "Task 2", "Description 2", Status.INCOMPLETE, dateTime),
                new Task(3, "Task 3", "Description 3", Status.INCOMPLETE, dateTime),
                new Task(4, "Task 4", "Description 4", Status.INCOMPLETE, dateTime),
                new Task(5, "Task 5", "Description 5", Status.INCOMPLETE, dateTime)
        );

        when(taskService.findLastFiveIncompleteTasks()).thenReturn(tasks);

        mockMvc.perform(get("/api/tasks/lastFiveIncompleteTasks")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Task 1"))
                .andExpect(jsonPath("$[0].status").value("INCOMPLETE"))
                .andExpect(jsonPath("$[4].id").value(5))
                .andExpect(jsonPath("$[4].title").value("Task 5"));

        verify(taskService, times(1)).findLastFiveIncompleteTasks();
    }

    @Test
    void completeTask() throws Exception {
        LocalDateTime dateTime = LocalDateTime.now();
        Task completedTask = new Task(1, "Task to complete", "Description", Status.COMPLETE, dateTime);

        when(taskService.completeTask(1)).thenReturn(completedTask);

        mockMvc.perform(put("/api/tasks/completeTask/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Task to complete"))
                .andExpect(jsonPath("$.status").value("COMPLETE"));

        verify(taskService, times(1)).completeTask(1);
    }

}
