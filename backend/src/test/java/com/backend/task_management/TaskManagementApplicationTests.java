package com.backend.task_management;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.backend.task_management.repository.TaskRepository;
import com.backend.task_management.service.TaskService;

@SpringBootTest()
class TaskManagementApplicationTests {

	@MockitoBean
	private TaskRepository taskRepository;

	@MockitoBean
	private TaskService taskService;

	@Test
	void contextLoads() {
	}

}
