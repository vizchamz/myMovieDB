import { useState } from "react";
import { useRef } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const Movies = () => {
    const [genres, setGenres] = useState([]);
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [overview, setOverview] = useState([]);
    const [title, setTitle] = useState([]);
    const [releaseDate, setReleaseDate] = useState([]);
    const [homepage, setHomepage] = useState([]);

    const inputRef = useRef(null);

    const fetchImage = async (imageUrl) => {
        const res = await fetch(`https://image.tmdb.org/t/p/w500${imageUrl}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    const fetchImage2 = async (imageUrl) => {
        const res = await fetch(`https://image.tmdb.org/t/p/original${imageUrl}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg2(imageObjectURL);
    };

    function handleClick(e) {
        e.preventDefault();

        const movieName = inputRef.current.value;
        const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&language=en-US&query=${movieName}`;
        
        axios.get(url2).then(res => {
            const movieId = res.data.results[0].id
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
            axios.get(url).then(res => {
                setGenres(res.data.genres);
                fetchImage(res.data.poster_path);
                setOverview(res.data.overview);
                setTitle(res.data.original_title);
                setReleaseDate(res.data.release_date);
                setHomepage(res.data.homepage);
                fetchImage2(res.data.backdrop_path);
            })
        })
    }

    return <div className="App" style={{
        backgroundImage: `url(${img2})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <h1 style={{
            position: 'absolute',
            left: '45%',
            top: '5%'
        }}>Movie DB</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{
                width: '40rem',
                position: 'absolute',
                left: '50%',
                top: '15%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Form.Control type="text" placeholder="Enter Movie Name" name="movieName" ref={ inputRef } autoComplete="off"/>
                <Button variant="primary" type="submit" onClick={ handleClick } style={{
                    position: 'absolute',
                    left: '110%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    Submit
                </Button>
            </Form.Group>
        </Form>
        <Card style={{
            width: '70rem',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div class="row no-gutters">
                <div class="col-md-4">
                    <Card.Img variant="top" src={img} />
                </div>
                <div class="col-md-8">
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {overview}
                        </Card.Text>
                        <div>
                            {genres.map(c => <span key={c.id}><b> {c.name} </b></span>)}
                        </div>
                        <div>
                            <span>{releaseDate}</span>
                        </div>
                        <div>
                            <a href={homepage}>{homepage}</a>
                        </div>
                    </Card.Body>
                </div>
            </div>
        </Card>
    </div>
};

export default Movies;