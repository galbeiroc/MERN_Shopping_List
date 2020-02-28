import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  FormGroup,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = ({ target: { name, value } }) => {
    console.log('value', value);
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };
    console.log('onSubmit');

    this.props.addItem(newItem);

    //Close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {/* {this.props.isAuthenticated ? ( */}
          <Button
            color={'dark'}
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        {/* ) : (
          <h4 className="mb-3">Please log in to manage Items</h4>
        )} */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Add Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for={'item'}>Item</Label>
                <Input
                  type="text"
                  name={'name'}
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color={'dark'} style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);
