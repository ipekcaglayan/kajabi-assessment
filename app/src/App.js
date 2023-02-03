import './App.css';
import { Button, Table, Container, Icon, Menu, Form, Modal, Card, Image } from 'semantic-ui-react'
import React, { useState } from 'react';
import axios from 'axios'


function App() {
  
  function getEmployees(page){
    axios.get(`http://localhost:3000/employee-list/${page}`)
        .then(function (response) {
            const data = response.data
            setEmployees(data.data)
            setPageNumbers( [...Array(data.total_pages).keys()])
            setSelectedEmployee(null)
        })
        .catch(function (error) {
            console.log("error occured")
        });
  }

  function findEmployee(){
    if(!email){
      setEmployees([])
      setPageNumbers([])
      setOpen(false)
      return;
    }
    axios.get(`http://localhost:3000/employee/${email}`)
        .then(function (response) {
            const data = response.data
            setOpen(false)
            setEmail('')
            setEmployees(data)
            setPageNumbers([0])
            setSelectedEmployee(null)
        })
        .catch(function (error) {
            console.log("error occured")
        });
  }
  
  const [employees, setEmployees] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)


 
  return (
    <div className="App">
      <Container className='my-container'>  
        <Button  onClick={()=>{getEmployees(1)}} content='Employee List' />
        <Button onClick={() => setOpen(true)} content='Find By Email' />
    {
      selectedEmployee ? 
      <Card>
    <Image src={selectedEmployee.avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{selectedEmployee.first_name} {selectedEmployee.last_name}</Card.Header>
      <Card.Meta>
        <span className='date'>{selectedEmployee.id}</span>
      </Card.Meta>
      <Card.Description>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='mail' />
        {selectedEmployee.email}
      </a>
    </Card.Content>
      </Card>
      :
      employees ?
      <Table celled className='my-table' style={{float: "right"}} >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {employees.map((e)=>
         <Table.Row>
        <Table.Cell>
          <Icon onClick={() => setSelectedEmployee(e)} name={'zoom'}/>
        </Table.Cell>
        <Table.Cell>
        <img src={e.avatar} />
        </Table.Cell>
        <Table.Cell>{e.first_name}</Table.Cell>
        <Table.Cell>{e.last_name}</Table.Cell>
        <Table.Cell>{e.email}</Table.Cell>
      </Table.Row>
      )}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='5'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            {pageNumbers.map(p=>
            <Menu.Item onClick={()=>{getEmployees(p+1)}} as='a'>{p+1}</Menu.Item>
            )}
            
         
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
      : 
      null

    }
    
    
      </Container>

      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'tiny'}
    >
      <Modal.Header>Find Employee By Email</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            Enter the email of employee you are looking for:
          </p>
   
          <Form.Input id={'email'}
            onChange={(event)=>setEmail(event.target.value)}
            placeholder='Search'
            value={email}
          />         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Search"
          labelPosition='right'
          icon='search'
          onClick={() => findEmployee()}
          primary
        />
      </Modal.Actions>
    </Modal>
    </div>
  );
}

export default App;
