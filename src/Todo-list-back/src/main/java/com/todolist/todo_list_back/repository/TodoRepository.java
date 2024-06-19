package com.todolist.todo_list_back.repository;

import com.todolist.todo_list_back.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
