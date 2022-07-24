import { useEffect, useState } from "react";
import { useRef } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
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

    useEffect(() => {
        sessionStorage.setItem('movieCount', 1);
        const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}`;
        
        axios.get(url2).then(res => {
            const movieId = res.data.results[0].id;
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
    }, [])

    function handleClick2(e) {
        e.preventDefault();
        let movieCount = sessionStorage.getItem('movieCount');

        const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}`;
        
        axios.get(url2).then(res => {
            const movieId = res.data.results[movieCount].id;
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
            axios.get(url).then(res => {
                setGenres(res.data.genres);
                fetchImage(res.data.poster_path);
                setOverview(res.data.overview);
                setTitle(res.data.original_title);
                setReleaseDate(res.data.release_date);
                setHomepage(res.data.homepage);
                fetchImage2(res.data.backdrop_path);
                sessionStorage.setItem('movieCount', parseInt(movieCount) + 1);
            })
        })
    }

    function handleClick3(e) {
        e.preventDefault();
        let movieCount = sessionStorage.getItem('movieCount');

        if (!(movieCount <= 1)) {
            const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}`;

            axios.get(url2).then(res => {
                const movieId = res.data.results[parseInt(movieCount) - 2].id;
                const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
                axios.get(url).then(res => {
                    setGenres(res.data.genres);
                    fetchImage(res.data.poster_path);
                    setOverview(res.data.overview);
                    setTitle(res.data.original_title);
                    setReleaseDate(res.data.release_date);
                    setHomepage(res.data.homepage);
                    fetchImage2(res.data.backdrop_path);
                    sessionStorage.setItem('movieCount', parseInt(movieCount) - 1);
                })
            })
        }
    }

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
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }}>
        <div className="text-center fs-1 fw-bold font-monospace text-light bg-dark">Movie DB</div>
        <Form>
            <Form.Group className="mb-4 pt-4 d-flex justify-content-md-center" controlId="formBasicEmail">
                <Form.Control className="form-control mx-2 w-75" type="text" placeholder="Enter Movie Name" ref={ inputRef } autoComplete="off" aria-describedby="submit-button"/>
                <div id="submit-button" className="btn btn-dark" type="submit" onClick={ handleClick }>
                    Submit
                </div>
            </Form.Group>
        </Form>
        <Card className="w-75 mb-5" style={{
            boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
            borderRadius: '10px',
            backdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            left: '12.5%',
            color: 'white'
        }}>
            <div className="row g-4">
                <div className="col-md-4">
                    <Card.Img variant="top" src={img} style={{
                        boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                        borderRadius: '10px'
                    }} />
                </div>
                <div className="col-md-8">
                    <Card.Body>
                        <Card.Title className="fs-4">{title}</Card.Title>
                        <Card.Text>
                            {overview}
                        </Card.Text>
                        <div className="text-dark">
                            {genres.map(c => <span key={c.id}><b> {c.name} </b></span>)}
                        </div>
                        <div>
                            <span>{releaseDate}</span>
                        </div>
                        <div>
                            <a role="button" aria-pressed="true" className="text-decoration-none btn btn-outline-light" href={homepage} target="_blank" rel="noreferrer">Official Site</a>
                        </div>
                    </Card.Body>
                    <div className="mx-3 mb-3" style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}>
                        <div id="submit-button3" type="submit" onClick={handleClick3} className="btn btn-outline-warning mx-3">
                            Back
                        </div>
                        <div id="submit-button2" type="submit" onClick={handleClick2} className="btn btn-outline-warning">
                            Next
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <div className="text-center fs-5 fw-bold text-light bg-dark pt-2 pb-2" style={{
            fontFamily: 'sans-serif'
        }}>&copy; Visal Dharmasiri</div>
    </div>
};

export default Movies;