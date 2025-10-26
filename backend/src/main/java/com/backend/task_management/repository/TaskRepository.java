package com.backend.task_management.repository;

import com.backend.task_management.model.Status;
import com.backend.task_management.model.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query("select t from Task t where t.status= :status order by t.dateCreated DESC")
    List<Task> findLatestTasks(@Param("status")Status status, Pageable pageable);
}
