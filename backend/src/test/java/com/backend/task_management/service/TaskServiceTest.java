package com.backend.task_management.service;

import com.backend.task_management.model.Status;
import com.backend.task_management.model.Task;
import com.backend.task_management.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository mockTaskRepository;

    @InjectMocks
    private TaskService mockTaskService;

    @Test
    void saveTask(){
        Task taskToSave = new Task();
        taskToSave.setTitle("New Task");
        taskToSave.setDescription("New Description");

        Task savedTask = new Task();
        savedTask.setId(1);
        savedTask.setTitle("New Task");
        savedTask.setDescription("New Description");
        savedTask.setStatus(Status.INCOMPLETE);

        when(mockTaskRepository.save(any(Task.class))).thenReturn(savedTask);

        Task result = mockTaskService.saveTask(taskToSave);

        assertNotNull(result);
        assertEquals(Status.INCOMPLETE, result.getStatus());
        assertEquals("New Task", result.getTitle());
        assertEquals(1, result.getId());
    }

    @Test
    void findLastFiveIncompleteTasks() {
        LocalDateTime dateTime = LocalDateTime.now();
        Task task1 = new Task(1, "Task 1","Task 1 Description", Status.INCOMPLETE,dateTime);
        Task task2 = new Task(2, "Task 2", "Task 2 Description", Status.INCOMPLETE,dateTime);
        Task task3 = new Task(3, "Task 3","Task 3 Description",  Status.INCOMPLETE,dateTime);
        Task task4 = new Task(4, "Task 4","Task 4 Description", Status.INCOMPLETE,dateTime);
        Task task5 = new Task(5, "Task 5", "Task 5 Description",Status.INCOMPLETE,dateTime);

        List<Task> expectedTasks = Arrays.asList(task1, task2, task3, task4, task5);

        when(mockTaskRepository.findLatestTasks(eq(Status.INCOMPLETE), any(PageRequest.class)))
                .thenReturn(expectedTasks);

        List<Task> result = mockTaskService.findLastFiveIncompleteTasks();

        assertNotNull(result);
        assertEquals(5, result.size());
        assertEquals(Status.INCOMPLETE, result.get(0).getStatus());
        verify(mockTaskRepository, times(1))
                .findLatestTasks(Status.INCOMPLETE, PageRequest.of(0, 5));
    }

    @Test
    void completeTask() {
        LocalDateTime dateTime = LocalDateTime.now();
        Task incompleteTask = new Task(1, "Task to complete","Task to complete description", Status.INCOMPLETE,dateTime);
        Task completedTask = new Task(1, "Task to complete", "Task to complete description",Status.COMPLETE,dateTime);

        when(mockTaskRepository.findById(1)).thenReturn(Optional.of(incompleteTask));
        when(mockTaskRepository.save(any(Task.class))).thenReturn(completedTask);

        Task result = mockTaskService.completeTask(1);

        assertNotNull(result);
        assertEquals(Status.COMPLETE, result.getStatus());
        assertEquals(1, result.getId());
        assertEquals("Task to complete", result.getTitle());
        verify(mockTaskRepository, times(1)).findById(1);
        verify(mockTaskRepository, times(1)).save(incompleteTask);
    }

}
