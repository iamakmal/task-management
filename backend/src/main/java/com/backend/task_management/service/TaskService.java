package com.backend.task_management.service;

import com.backend.task_management.model.Status;
import com.backend.task_management.model.Task;
import com.backend.task_management.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Task saveTask(Task task){
        try{
            task.setStatus(Status.INCOMPLETE);
            Task savedTask = taskRepository.save(task);
            return savedTask;
        }catch(Exception e){
            throw new RuntimeException("Unexpected error occurred while creating task", e);
        }
    }

    public List<Task> findLastFiveIncompleteTasks(){
        try{
            List<Task> topFiveIncompleteTasks = taskRepository.findLatestTasks(Status.INCOMPLETE, PageRequest.of(0,5));
            return topFiveIncompleteTasks;
        }catch (Exception e){
            throw new RuntimeException("Unexpected error occurred while getting the top five incomplete tasks ",e);
        }
    }

    public Task completeTask(int id){
        try{
            Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
            task.setStatus(Status.COMPLETE);
            return taskRepository.save(task);
        }catch (Exception e){
            throw new RuntimeException("Unexpected error when completing task ",e);
        }
    }
}
