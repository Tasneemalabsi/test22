import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export class modal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.selectadded.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>{this.props.selectadded.overview}</p>
        <Button onClick={this.props.addMovies}>ADD</Button>
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

export default modal
