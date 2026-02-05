import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 400px;
`;

const Title = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#999' : '#333'};
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.completed ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.completed ? '#5a6268' : '#0056b3'};
  }
`;

const Status = styled.span`
  display: block;
  margin-top: 12px;
  font-weight: bold;
  color: ${props => props.completed ? '#28a745' : '#ffc107'};
`;

function TaskCard(props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <Card>
      <Title completed={isCompleted}>{props.title}</Title>
      <Description>{props.description}</Description>
      <Button completed={isCompleted} onClick={handleToggleComplete}>
        {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Status completed={isCompleted}>
        Status: {isCompleted ? 'Completed ✓' : 'Pending'}
      </Status>
    </Card>
  );
}

export default TaskCard;