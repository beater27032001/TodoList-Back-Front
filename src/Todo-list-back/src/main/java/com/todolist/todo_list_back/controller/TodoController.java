package com.todolist.todo_list_back.controller;

import com.todolist.todo_list_back.model.Todo;
import com.todolist.todo_list_back.model.TodoReadDTO;
import com.todolist.todo_list_back.model.TodoWriteDTO;
import com.todolist.todo_list_back.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<TodoReadDTO>> getAllTodos() {
        List<TodoReadDTO> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoReadDTO> getTodoById(@PathVariable Long id) {
        TodoReadDTO todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }

    @PostMapping
    public ResponseEntity<TodoReadDTO> addTodo(@RequestBody TodoWriteDTO todoDTO) {
        Todo todo = todoService.addTodo(todoDTO);
        TodoReadDTO responseDTO = new TodoReadDTO(todo.getId(), todo.getText());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoReadDTO> updateTodo(@PathVariable Long id, @RequestBody TodoWriteDTO todoWriteDTO){
        Todo todo = todoService.updateTodo(id, todoWriteDTO);
        TodoReadDTO responseDTO = new TodoReadDTO(todo.getId(), todo.getText());
        return ResponseEntity.ok(responseDTO);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }


}
