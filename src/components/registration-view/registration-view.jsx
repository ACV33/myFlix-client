import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, } from 'react-bootstrap';

import './resgistration-view.scss';


export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.Registration(username);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Username: </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter a  username" />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>
                                    Password: </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minlength="8"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Email: </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    minlength="8"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Birthday: </Form.Label>
                                <Form.Control
                                    type="birthday"
                                    value={birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                />
                            </Form.Group>
                            <button type="submit" onClick={handleSubmit}>Register</button>
                            <button type="button" onClick={() => { props.onBackClick(null); }}>Return to Login Page</button>
                        </Form>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};