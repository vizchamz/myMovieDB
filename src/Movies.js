import { useEffect, useState } from "react";
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
        // console.log(sessionStorage.getItem('movieCount'));
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
                sessionStorage.setItem('movieCount', parseInt(movieCount) + 1)
            })
        })
    }

    // function handleClick3(e) {
    //     console.log(sessionStorage.getItem('movieCount'));
    //     e.preventDefault();
    //     let movieCount = sessionStorage.getItem('movieCount');

    //     // if (!(movieCount <= 1)) {
    //         const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}`;

    //         axios.get(url2).then(res => {
    //             const movieId = res.data.results[parseInt(movieCount) - 1].id;
    //             const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
    //             axios.get(url).then(res => {
    //                 setGenres(res.data.genres);
    //                 fetchImage(res.data.poster_path);
    //                 setOverview(res.data.overview);
    //                 setTitle(res.data.original_title);
    //                 setReleaseDate(res.data.release_date);
    //                 setHomepage(res.data.homepage);
    //                 fetchImage2(res.data.backdrop_path);
    //                 sessionStorage.setItem('movieCount', parseInt(movieCount) - 1)
    //             })
    //         })
    //     // }
    // }

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
        backgroundImage: `url(${img2})`
    }}>
        <div className="text-center fs-1 fw-bold font-monospace text-light bg-dark">Movie DB</div>
        <Form>
            <Form.Group className="mb-4 pt-4 d-flex justify-content-md-center" controlId="formBasicEmail">
                <Form.Control className="form-control mx-2 w-75" type="text" placeholder="Enter Movie Name" name="movieName" ref={ inputRef } autoComplete="off" aria-describedby="submit-button"/>
                <Button id="submit-button" variant="primary" type="submit" onClick={ handleClick }>
                    Submit
                </Button>
            </Form.Group>
        </Form>
        <Card className="w-75 mb-5" style={{
            left: '12.5%'
        }}>
            <div className="row g-4">
                <div className="col-md-4">
                    <Card.Img variant="top" src={img} />
                </div>
                <div className="col-md-8">
                    <Card.Body>
                        <Card.Title className="fs-4">{title}</Card.Title>
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
                            <a role="button" aria-pressed="true" className="text-decoration-none btn btn-outline-success" href={homepage} target="_blank" rel="noreferrer">Official Site</a>
                        </div>
                    </Card.Body>
                    {/* <Button id="submit-button3" variant="primary" type="submit" onClick={ handleClick3 }>
                            Previous
                        </Button> */}
                    <div id="submit-button2" type="submit" onClick={handleClick2} className="btn btn-outline-warning mx-3 mb-3" style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}>
                        Next
                    </div>
                </div>
            </div>
        </Card>
        <div className="text-center fs-3 fw-bold font-monospace text-light bg-dark">&copy; Movie DB by Visal Dharmasiri</div>
    </div>
};

export default Movies;