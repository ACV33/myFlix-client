import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: true,
        };
    }

    componentDidMount() {
        axios
            .get('https://ashlis-movie-api.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    // passed to LoginView
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    getMovies(token) {
        axios.get('https://ashlis-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // passed to RegistrationView
    onRegister(registered, user) {
        this.setState({
            registered,
            user,
        });
    }

    // passed to LogoutButton
    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
    }

    toRegistrationView(asdf) {
        this.setState({
            registered: false,
        });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        // RegistrationView if user not registered
        if (!registered)
            return (
                <RegistrationView
                    onRegister={(registered, username) =>
                        this.onRegister(registered, username)
                    }
                />
            );

        // LoginView if user is registered, but not logged in
        if (!user)
            return (
                <LoginView
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                    toRegistrationView={(asdf) => this.toRegistrationView(asdf)}
                />
            );

        // Empty MainView if there are no movies (or still loading)
        if (movies.length === 0)
            return <div className='main-view'>The list is empty!</div>;

        // if we get here then user is registered and logged in
        // Render list of MovieCard if no movie is selected
        // Go to MovieView if a movie is selected
        return (
            <div className='main-view'>
                <Row>
                    <Col>
                        <LogoutButton
                            logoutUser={(uselessParam) => this.logoutUser(uselessParam)}
                        />
                    </Col>
                </Row>
                {selectedMovie ? (
                    <Row>
                        <Col>
                            <MovieView
                                movie={selectedMovie}
                                onBackClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    </Row>
                ) : (
                    <div>
                        <Row className='justify-content-md-center'>
                            <Col md={4}>
                                <h1 className='display-2'>Movies</h1>
                            </Col>
                        </Row>

                        <Row className='justify-content-md-center'>
                            {movies.map((movie) => (
                                <Col>
                                    <MovieCard
                                        key={movie._id}
                                        movie={movie}
                                        onMovieClick={(movie) => {
                                            this.setSelectedMovie(movie);
                                        }}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>
        );
    }
}

MainView.propTypes = {};

export default MainView;