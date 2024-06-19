package com.todolist.todo_list_back.service;

import com.todolist.todo_list_back.model.Todo;
import com.todolist.todo_list_back.model.TodoReadDTO;
import com.todolist.todo_list_back.model.TodoWriteDTO;
import com.todolist.todo_list_back.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public Todo addTodo(TodoWriteDTO todoWriteDTO){
        Todo todo = new Todo();
        todo.setText(todoWriteDTO.text());
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, TodoWriteDTO todoWriteDTO){
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todo.setText(todoWriteDTO.text());
        return todoRepository.save(todo);
    }

    public List<TodoReadDTO> getAllTodos(){
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map(todo -> new TodoReadDTO(todo.getId(), todo.getText())).collect(Collectors.toList());
    }

    public TodoReadDTO getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        return new TodoReadDTO(todo.getId(), todo.getText());
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
}
