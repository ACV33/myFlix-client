import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
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

    getMovies(token) {
        axios.get('https://ashlis-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    // passed to LogoutButton
    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
    }



    // passed to RegistrationView
    onRegister(registered, user) {
        this.setState({
            registered,
            user,
        });
    }
    toRegistrationView(asdf) {
        this.setState({
            registered: false,
        });
    }


    render() {
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <div>
                <Router>
                    <Row className='main-view d-flex justify-content-center pb-5 px-3 pt-3'>
                        <Route
                            exact
                            path='/'
                            render={() => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView
                                                movies={movies}
                                                onLoggedIn={(user) => this.onLoggedIn(user)}
                                            />
                                        </Col>
                                    );
                                // Before the movies have been loaded
                                if (movies.length === 0) return <div className='main-view' />;
                                return <MoviesList movies={movies} />;
                            }}
                        />
                        {<Route
                            path='/register'
                            render={() => {
                                if (user) return <Redirect to='/' />;
                                return (
                                    <Col>
                                        <RegistrationView />
                                    </Col>
                                );
                            }}
                        />}
                        {<Route
                            path={`/users/${user}`}
                            render={({ history }) => {
                                if (!user) return <Redirect to='/' />;
                                return (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />}
                        {<Route
                            path='/movies/:movieId'
                            render={({ match }) => {
                                return (
                                    <Col md={8}>
                                        <MovieView
                                            movie={movies.find((m) => m._id === match.params.movieId)}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />}
                        {<Route
                            path='/directors/:name'
                            render={({ match }) => {
                                if (movies.length === 0) return <div className='main-view' />;
                                return (
                                    <Col md={8}>
                                        <DirectorView
                                            director={
                                                movies.find((m) => m.Director.Name === match.params.name)
                                                    .Director
                                            }
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />}
                    </Row>
                </Router>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}


export default connect(mapStateToProps, { setMovies })(MainView);