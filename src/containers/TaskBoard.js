import React, { useState } from 'react';
import styled from 'styled-components';
import TaskCard from './TaskCard';

const TaskBoardWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TaskBoardTitle = styled.h2`
  color: #333;
  margin-bottom: 24px;
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const AddTaskSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  box-sizing: border-box;
  resize: vertical;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  
  &:hover {
    background-color: #0056b3;
  }
`;

function TaskBoard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete React Assignment',
      description: 'Create TaskCard and TaskBoard components with state management',
      status: 'todo'
    },
    {
      id: 2,
      title: 'Study for Exam',
      description: 'Review chapters 3-5 on React hooks and state',
      status: 'todo'
    },
    {
      id: 3,
      title: 'Grocery Shopping',
      description: 'Buy milk, eggs, bread, and vegetables',
      status: 'done'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleToggleStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'todo' ? 'done' : 'todo' }
        : task
    ));
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTitle.trim() === '' || newDescription.trim() === '') {
      alert('Please enter both title and description');
      return;
    }

    const newTask = {
      id: Date.now(), // Simple way to generate unique ID
      title: newTitle,
      description: newDescription,
      status: 'todo'
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <TaskBoardWrapper>
      <TaskBoardTitle>My Task Board - Assignment Demo</TaskBoardTitle>
      
      <AddTaskSection>
        <h3 style={{ marginTop: 0 }}>Add New Task</h3>
        <Input
          type="text"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextArea
          placeholder="Task Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <AddButton onClick={handleAddTask}>
          Add Task
        </AddButton>
      </AddTaskSection>

      <TaskList>
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onToggleStatus={handleToggleStatus}
            onRemoveTask={handleRemoveTask}
          />
        ))}
      </TaskList>
    </TaskBoardWrapper>
  );
}

export default TaskBoard;