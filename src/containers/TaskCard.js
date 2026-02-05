import React from 'react';
import styled from 'styled-components';

const TicketWrapper = styled.div`
  background: ${props => props.status === 'done' ? '#d4edda' : 'darkGray'};
  padding: 20px;
  border-radius: 20px;
  border: ${props => props.status === 'done' ? '2px solid #28a745' : 'none'};

  &:not(:last-child) {
    margin-bottom: 5%;
    margin-right: ${props => (!!props.marginRight ? '1%' : '0')};
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0px;
  text-decoration: ${props => props.status === 'done' ? 'line-through' : 'none'};
`;

const Body = styled.p`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  background-color: ${props => props.variant === 'complete' ? '#28a745' : '#dc3545'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  flex: 1;
  
  &:hover {
    opacity: 0.8;
  }
`;

const TaskCard = ({ marginRight, onDragStart, ticket, onToggleStatus, onRemoveTask }) => (
  <TicketWrapper
    draggable
    onDragStart={e => onDragStart && onDragStart(e, ticket.id)}
    marginRight={marginRight}
    status={ticket.status}
  >
    <Title status={ticket.status}>{ticket.title}</Title>
    <Body>{ticket.body}</Body>
    <ButtonGroup>
      <Button variant="complete" onClick={() => onToggleStatus(ticket.id)}>
        {ticket.status === 'done' ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Button variant="remove" onClick={() => onRemoveTask(ticket.id)}>
        Remove
      </Button>
    </ButtonGroup>
  </TicketWrapper>
);

export default TaskCard;