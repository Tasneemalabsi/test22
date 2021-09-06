import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export class form extends Component {
    render() {
        return (
            <div>
        <Modal show={this.props.show} onHide={this.props.handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={this.props.updateMovies2}>
                   <input type="text" name="title"  defaultValue={this.props.selectedMovie.title}/>
                   <input type="text" name="overview" defaultValue={this.props.selectedMovie.overview}/>
                   <Button type="submit">Submit</Button>
                </Form>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
               
            </div>
        )
    }
}

export default form
