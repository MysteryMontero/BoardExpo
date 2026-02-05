import React from 'react';
import styled from 'styled-components';

const TicketWrapper = styled.div`
  background: ${props => props.status === 'done' ? '#d4edda' : 'lightblue'};
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
  margin: 0px 0px 8px 0px;
  text-decoration: ${props => props.status === 'done' ? 'line-through' : 'none'};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
`;

const InfoItem = styled.span`
  background: rgba(255, 255, 255, 0.3);
  padding: 4px 8px;
  border-radius: 4px;
`;

const Body = styled.p`
  width: 100%;
  margin-top: 8px;
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

const TaskCard = ({ marginRight, onDragStart, ticket, onToggleStatus, onRemoveTask, onEditTask }) => (
  <TicketWrapper
    draggable
    onDragStart={e => onDragStart && onDragStart(e, ticket.id)}
    onClick={() => onEditTask && onEditTask(ticket)}
    marginRight={marginRight}
    status={ticket.status}
    style={{ cursor: 'pointer' }}
  >
    <Title status={ticket.status}>{ticket.title}</Title>
    <MetaInfo>
      <InfoItem>ID: {ticket.id}</InfoItem>
      <InfoItem>Status: {ticket.status || 'todo'}</InfoItem>
    </MetaInfo>
    <Body>{ticket.body}</Body>
    <ButtonGroup>
      <Button variant="complete" onClick={(e) => { e.stopPropagation(); onToggleStatus(ticket.id); }}>
        {ticket.status === 'done' ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Button variant="remove" onClick={(e) => { e.stopPropagation(); onRemoveTask(ticket.id); }}>
        Remove
      </Button>
    </ButtonGroup>
  </TicketWrapper>
);

export default TaskCard;