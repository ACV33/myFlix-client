import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';


import './movie-view.scss';


export class MovieView extends React.Component {


    render() {
        const { movie, onBackClick, isFav, handleDeleteFavorite, handleAddFavorite } = this.props;

        return (
            <>
                <Row className="mt-3 mb-2">
                    <Col xs={12} md={4}>
                        <div className="movie-image">
                            <Image src={movie.ImagePath} alt={`Poster: ${movie.Title}`} title={movie.Title} className="image-movie float-md-right w-100" rounded fluid />
                        </div>
                    </Col>
                    <Col xs={12} md={8}>
                        <Row >
                            <Col xs={10}>
                                <h1 className="h-movie d-inline mr-3">{movie.Title}</h1>
                            </Col>
                            <Col xs={2}>

                            </Col>
                        </Row>
                        <Row>
                            <Button
                                className="mr-3"
                                type="button"
                                onClick={() => handleAddFavorite(movie._id)} >
                                Add Favorites
                            </Button>
                        </Row>

                        <Row>
                            <Col>
                                <div className="movie-genre">
                                    <span className="label font-weight-bold">Genre: </span>
                                    {/* <Button variant="link">Genre</Button> */}
                                    <Link to={`/genres/${movie.Genre.Name}`}>
                                        <span className="movie-link">{movie.Genre.Name}</span>
                                    </Link>
                                </div>

                                <div className="movie-director">
                                    <span className="label font-weight-bold">Director: </span>
                                    {/* <Button variant="link" className="label font-weight-bold">Director</Button> */}
                                    <Link to={`/directors/${movie.Director.Name}`} >
                                        <span className="movie-link">{movie.Director.Name}</span>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        <div className="movie-description mb-4 mt-4">
                            <span className="value">{movie.Description}</span>
                        </div>
                    </Col>
                </Row >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleDeleteFavorite: (event) =>
        dispatch(deleteFavorite(event)),
    handleAddFavorite: (event) =>
        dispatch(setFavorite(event)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieView);