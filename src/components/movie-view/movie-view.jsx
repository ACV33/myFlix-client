import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Row className='movie-view'>
                <Col lg={8}>
                    <div className='movie-view__title-line'>
                        <Button
                            className='movie-view-button'
                            onClick={() => {
                                onBackClick(null);
                            }}
                        >
                            &lt;
                        </Button>
                        <span className='movie-view__title'> {movie.Title} </span>
                        <Button className='movie-view-button'>&#10032;</Button>
                    </div>

                    <div className='movie-info'>
                        <div className='movie-view__line'>
                            <span className='movie-view__line__label'>Genre: </span>
                            <span className='movie-view__line__value'>
                                {movie.Genre.Name}
                            </span>
                        </div>

                        <div className='movie-view__line'>
                            <span className='movie-view__line__label'>Director: </span>
                            <span className='movie-view__line__value'>
                                {movie.Director.Name}
                            </span>
                        </div>

                        <div className='movie-view__line description'>
                            <span className='movie-view__line__label'>Description: </span>
                            <span className='movie-view__line__value'>
                                {movie.Description}
                            </span>
                        </div>
                    </div>
                </Col>

                <Col lg={4}>
                    <div className='movie-poster'>
                        <img src={movie.ImagePath} />
                    </div>
                </Col>
            </Row>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired,
        ImagePath: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            BirthYear: PropTypes.number.isRequired,
            DeathYear: PropTypes.number,
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};