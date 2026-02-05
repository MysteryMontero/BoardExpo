import React from 'react';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';

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

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 60px;
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
  
  &:hover {
    background-color: #0056b3;
  }
`;

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      newTitle: '',
      newBody: '',
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

    const newTicket = {
      id: Date.now(),
      title: this.state.newTitle,
      body: this.state.newBody,
      lane: 1, // Default to first lane (Research)
      status: 'todo'
    };

    this.setState({
      tickets: [...this.state.tickets, newTicket],
      newTitle: '',
      newBody: ''
    });
  };

  render() {
    const { lanes, loading, error } = this.props;

    return (
      <>
        <AddTaskSection>
          <h3>Add New Task</h3>
          <div>
            <Input
              type="text"
              placeholder="Task Title"
              value={this.state.newTitle}
              onChange={(e) => this.setState({ newTitle: e.target.value })}
            />
            <TextArea
              placeholder="Task Description"
              value={this.state.newBody}
              onChange={(e) => this.setState({ newBody: e.target.value })}
            />
            <AddButton onClick={this.handleAddTask}>
              Add Task
            </AddButton>
          </div>
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
              tickets={this.state.tickets.filter(
                ticket => ticket.lane === lane.id,
              )}
            />
          ))}
        </BoardWrapper>
      </>
    );
  }
}

export default withDataFetching(Board);