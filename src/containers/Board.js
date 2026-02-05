import React from 'react';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';
import Tickets from './Tickets';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddTaskSection = styled.div`
  margin: 20px 5%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  align-self: flex-start;
  
  &:hover {
    background-color: #0056b3;
  }
`;
const ClearButton = styled.button`
  padding: 12px 24px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  align-self: flex-start;
  margin-left: 8px;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      newTitle: '',
      newBody: '',
      newId: '',
      newStatus: '',
      editingId: null, 
    };
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData('id');

    const tickets = this.state.tickets.filter(ticket => {
      if (ticket.id === parseInt(id)) {
        ticket.lane = laneId;
      }
      return ticket;
    });    

    this.setState({
      ...this.state,
      tickets,
    });
  };

  handleToggleStatus = (ticketId) => {
    const tickets = this.state.tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: ticket.status === 'done' ? 'todo' : 'done' }
        : ticket
    );
    this.setState({ tickets });
  };

  handleRemoveTask = (ticketId) => {
    const tickets = this.state.tickets.filter(ticket => ticket.id !== ticketId);
    this.setState({ tickets });
  };

  handleAddTask = () => {
  if (this.state.newTitle.trim() === '' || this.state.newBody.trim() === '') {
    alert('Please enter both title and description');
    return;
  }

  if (this.state.editingId) {
    const tickets = this.state.tickets.map(ticket =>
      ticket.id === this.state.editingId
        ? { ...ticket, title: this.state.newTitle, body: this.state.newBody, status: this.state.newStatus }
        : ticket
    );
    this.setState({
      tickets,
      newTitle: '',
      newBody: '',
      newId: '',
      newStatus: '',
      editingId: null
    });
  } else {
    const newTicket = {
      id: Date.now(),
      title: this.state.newTitle,
      body: this.state.newBody,
      lane: 1,
      status: this.state.newStatus
    };

    this.setState({
      tickets: [...this.state.tickets, newTicket],
      newTitle: '',
      newBody: '',
      newId: '',
      newStatus: ''
    });
  }
}
    
  handleEditTask = (ticket) => {
    this.setState({
      newTitle: ticket.title,
      newBody: ticket.body,
      newId: ticket.id.toString(),
      newStatus: ticket.status || '',
      editingId: ticket.id
  });
};
  handleClearForm = () => {
    this.setState({
      newTitle: '',
      newBody: '',
      newId: '',
      newStatus: '',
      editingId: null
  });
};

  render() {
    const { lanes, loading, error } = this.props;

    return (
      <>
        <AddTaskSection>
  <FormTitle>{this.state.editingId ? 'Edit Task' : 'Add New Member'}</FormTitle>
  <InputGroup>
    <Input
      type="text"
      placeholder="Name"
      value={this.state.newTitle}
      onChange={(e) => this.setState({ newTitle: e.target.value })}
    />
    <TextArea
      placeholder="Description"
      value={this.state.newBody}
      onChange={(e) => this.setState({ newBody: e.target.value })}
    />
    <Input
      type="text"
      placeholder="ID"
      value={this.state.newId}
      onChange={(e) => this.setState({ newId: e.target.value })}
    />
    <Input
      type="text"
      placeholder="Status"
      value={this.state.newStatus}
      onChange={(e) => this.setState({ newStatus: e.target.value })}
    />
    <ButtonRow>
      <AddButton onClick={this.handleAddTask}>
        {this.state.editingId ? 'Update Task' : 'Add Task'}
      </AddButton>
      {this.state.editingId && (
        <ClearButton onClick={this.handleClearForm}>
          New Task
        </ClearButton>
      )}
    </ButtonRow>
  </InputGroup>
</AddTaskSection>

<BoardWrapper>
  {lanes.map(lane => (
    <Lane
      key={lane.id}
      laneId={lane.id}
      title={lane.title}
      loading={loading}
      error={error}
      onDragStart={this.onDragStart}
      onDragOver={this.onDragOver}
      onDrop={this.onDrop}
      onToggleStatus={this.handleToggleStatus}
      onRemoveTask={this.handleRemoveTask}
      onEditTask={this.handleEditTask}
      tickets={this.state.tickets.filter(
        ticket => ticket.lane === lane.id,
      )}
    />
  ))}
</BoardWrapper>
<Tickets 
        data={this.state.tickets} 
        loading={false} 
        error="" 
      />
      </>
    );
  }
}

export default withDataFetching(Board);