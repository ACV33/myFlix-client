import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(true, username);
    };

    let labelSize = 4;
    let fieldSize = 5;
    let emptySize = 1;

    return (
        <div className='registration-view'>
            <Row>
                <Col>
                    <h2 className='display-4'>Sign up for a free MyFlix account</h2>
                </Col>
            </Row>

            <Form className='registration-form'>
                <Form.Group className='registration-form__line'>
                    <Col md={emptySize}></Col>
                    <Col md={labelSize}>
                        <Form.Label className='registration-form__line-label'>
                            Username:{' '}
                            <span className='registration-form__label-tips'>
                                (5+ characters, no spaces)
                            </span>
                        </Form.Label>
                    </Col>
                    <Col md={fieldSize}>
                        <Form.Control
                            className='registration-form__line__input-field'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className='registration-form__line'>
                    <Row>
                        <Col md={emptySize}></Col>
                        <Col md={labelSize}>
                            <Form.Label className='registration-form__line-label'>
                                Enter desired password{' '}
                                <span className='registration-form__label-tips'>
                                    (must not be blank)
                                </span>
                            </Form.Label>
                        </Col>
                        <Col md={labelSize}>
                            <Form.Control
                                className='registration-form__line__input-field'
                                type='text'
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className='registration-form__line'>
                    <Row>
                        <Col md={emptySize}></Col>
                        <Col md={labelSize}>
                            <Form.Label className='registration-form__line-label'>
                                Re-enter password:{' '}
                                <span className='registration-form__label-tips'>
                                    passwords must match
                                </span>
                            </Form.Label>
                        </Col>
                        <Col md={fieldSize}>
                            <Form.Control
                                className='registration-form__line__input-field'
                                type='text'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className='registration-form__line'>
                    <Row>
                        <Col md={emptySize}></Col>
                        <Col md={labelSize}>
                            <Form.Label className='registration-form__line-label'>
                                Email:{' '}
                                <span className='registration-form__label-tips'>
                                    (required)
                                </span>
                            </Form.Label>
                        </Col>
                        <Col md={fieldSize}>
                            <Form.Control
                                className='registration-form__line__input-field'
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className='registration-form__line'>
                    <Row>
                        <Col md={emptySize}></Col>
                        <Col md={labelSize}>
                            <Form.Label className='registration-form__line-label'>
                                Birthday:{' '}
                                <span className='registration-form__label-tips'>
                                    (optional)
                                </span>
                            </Form.Label>
                        </Col>
                        <Col md={fieldSize}>
                            <Form.Control
                                className='registration-form__line__input-field'
                                type='text'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Row>
                    <Col md={labelSize + fieldSize + emptySize - 2}></Col>
                    <Col md={1}>
                        <Button
                            className='register-button'
                            variant='primary'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired,
};