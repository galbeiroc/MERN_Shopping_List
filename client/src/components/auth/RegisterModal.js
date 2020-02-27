import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if authenticated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        console.log('isAuthenticated', isAuthenticated);
        console.log('this.state.modal', this.state.modal);
        this.toggle()
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();

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

    const { name, email, password } = this.state;

    //create Object
    const newUser = {
      name,
      email,
      password
    };

    //attempt to register
    this.props.register(newUser);

    //Close Modal
    //this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} style={{ color: 'white', cursor: 'pointer' }}>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for={'name'}>Name</Label>
                <Input
                  type="text"
                  name={'name'}
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for={'email'}>Email</Label>
                <Input
                  type="email"
                  name={'email'}
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for={'password'}>Password</Label>
                <Input
                  type="password"
                  name={'password'}
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color={'dark'} style={{ marginTop: '2rem' }} block>
                  Register
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
