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
    const [img3, setImg3] = useState();
    const [title2, setTitle2] = useState([]);
    const [releaseDate2, setReleaseDate2] = useState([]);
    const [img4, setImg4] = useState();
    const [title3, setTitle3] = useState([]);
    const [releaseDate3, setReleaseDate3] = useState([]);
    const [img5, setImg5] = useState();
    const [title4, setTitle4] = useState([]);
    const [releaseDate4, setReleaseDate4] = useState([]);
    const [toggle, settoggle] = useState(14);
    const [id, setId] = useState([]);

    function setIds1() {
        document.getElementById('card-group').hidden = true;
        // document.getElementById('App').style.backdropFilter = `blur(0px)`;
        document.getElementById('card').style.opacity = 1;
        let ids = JSON.parse(sessionStorage.getItem('ids'));
        const url = `https://api.themoviedb.org/3/movie/${ids[0]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url).then(res => {
            setGenres(res.data.genres);
            fetchImage(res.data.poster_path);
            setOverview(res.data.overview);
            setTitle(res.data.original_title);
            setReleaseDate(res.data.release_date);
            setHomepage(res.data.homepage);
            fetchImage2(res.data.backdrop_path);
        })
    }

    function setIds2() {
        document.getElementById('card-group').hidden = true;
        // document.getElementById('App').style.backdropFilter = `blur(0px)`;
        document.getElementById('card').style.opacity = 1;
        let ids = JSON.parse(sessionStorage.getItem('ids'));
        const url = `https://api.themoviedb.org/3/movie/${ids[1]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url).then(res => {
            setGenres(res.data.genres);
            fetchImage(res.data.poster_path);
            setOverview(res.data.overview);
            setTitle(res.data.original_title);
            setReleaseDate(res.data.release_date);
            setHomepage(res.data.homepage);
            fetchImage2(res.data.backdrop_path);
        })
    }

    function setIds3() {
        document.getElementById('card-group').hidden = true;
        // document.getElementById('App').style.backdropFilter = `blur(0px)`;
        document.getElementById('card').style.opacity = 1;
        let ids = JSON.parse(sessionStorage.getItem('ids'));
        const url = `https://api.themoviedb.org/3/movie/${ids[2]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url).then(res => {
            setGenres(res.data.genres);
            fetchImage(res.data.poster_path);
            setOverview(res.data.overview);
            setTitle(res.data.original_title);
            setReleaseDate(res.data.release_date);
            setHomepage(res.data.homepage);
            fetchImage2(res.data.backdrop_path);
        })
    }

    function makeBlur1() {
        // if(toggle == 14){
        //   settoggle(0)
        // }else{
        //   settoggle(14)
        // }
        document.getElementById('card-group').hidden = false;
        document.getElementById('App').style.backdropFilter = `blur(${toggle}px)`;
        document.getElementById('card').style.opacity = 0;
    }

    // const buttonSubmit = document.getElementById('input-submit');
    // buttonSubmit.addEventListener("keyup", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         document.getElementById("submit-button").click();
    //     }
    // });

    const onFormSubmit = e => {
        e.preventDefault();
        document.getElementById("submit-button").click();
    }

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

    const fetchImage3 = async (imageUrl) => {
        const res = await fetch(`https://image.tmdb.org/t/p/w500${imageUrl}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg3(imageObjectURL);
    };

    const fetchImage4 = async (imageUrl) => {
        const res = await fetch(`https://image.tmdb.org/t/p/w500${imageUrl}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg4(imageObjectURL);
    };

    const fetchImage5 = async (imageUrl) => {
        const res = await fetch(`https://image.tmdb.org/t/p/w500${imageUrl}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg5(imageObjectURL);
    };

    function defaultFunc() {
        document.getElementById('card-group').hidden = true;
        // document.getElementById('App').style.backdropFilter = `blur(0px)`;
        document.getElementById('card').style.opacity = 1;
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
        inputRef.current.value = '';
    }

    useEffect(() => {
        document.getElementById('card-group').hidden = true;
        document.getElementById('App').style.backdropFilter = `blur(14px)`;
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
        makeBlur1();
        e.preventDefault();

        const movieName = inputRef.current.value;
        if (movieName !== '') {
            const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&language=en-US&query=${movieName}`;

            axios.get(url2).then(res => {
                // const movieId = res.data.results[0].id;
                getMatchingResults(res);
                // getMatchingResults(res);
                // const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`;
                // axios.get(url).then(res => {
                //     setGenres(res.data.genres);
                //     fetchImage(res.data.poster_path);
                //     setOverview(res.data.overview);
                //     setTitle(res.data.original_title);
                //     setReleaseDate(res.data.release_date);
                //     setHomepage(res.data.homepage);
                //     fetchImage2(res.data.backdrop_path);
                // })
            })
        } else {
            handleClick2();
        }
        sessionStorage.setItem('ids', '');
    }

    function getMatchingResults(res) {
        const movieSearchCount = 3;
        let movieIds = [];
        for (let index = 0; index < movieSearchCount; index++) {
            movieIds.push(res.data.results[index].id);
        }
        sessionStorage.setItem('ids', JSON.stringify(movieIds));

        const url = `https://api.themoviedb.org/3/movie/${movieIds[0]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url).then(res => {
            fetchImage3(res.data.poster_path);
            setTitle2(res.data.original_title);
            if (res.data.release_date !== "") {
                setReleaseDate2(res.data.release_date.split("-")[0]);
            } else {
                setReleaseDate2("TBA");
            }
        })

        const url2 = `https://api.themoviedb.org/3/movie/${movieIds[1]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url2).then(res => {
            fetchImage4(res.data.poster_path);
            setTitle3(res.data.original_title);
            if (res.data.release_date !== "") {
                setReleaseDate3(res.data.release_date.split("-")[0]);
            } else {
                setReleaseDate3("TBA");
            }
        })

        const url3 = `https://api.themoviedb.org/3/movie/${movieIds[2]}?api_key=${process.env.REACT_APP_API}&language=en-US`;
        axios.get(url3).then(res => {
            fetchImage5(res.data.poster_path);
            setTitle4(res.data.original_title);
            if (res.data.release_date !== "") {
                setReleaseDate4(res.data.release_date.split("-")[0]);
            } else {
                setReleaseDate4("TBA");
            }
        })

        // let id = sessionStorage.getItem('id');
        // if (id === 1) {
        //     return movieIds[0];
        // } else if (id === 2) {
        //     return movieIds[1];
        // } else if (id === 3) {
        //     return movieIds[2];
        // }
    }

    return <div className="App" style={{
        backgroundImage: `url(${img2})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }}>
        <div id="App">
            <div className="text-center fs-1 fw-bold font-monospace text-light bg-dark" onClick={defaultFunc} style={{
                cursor: 'pointer'
            }}>Movie DB</div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-4 pt-4 d-flex justify-content-md-center" controlId="formBasic">
                    <Form.Control className="form-control mx-2 w-75" type="text" placeholder="Enter Movie Name" id="input-submit" ref={inputRef} autoComplete="off" aria-describedby="submit-button" />
                    <div id="submit-button" className="btn btn-dark" type="submit" onClick={handleClick}>
                        Submit
                    </div>
                </Form.Group>
            </Form>
            <Card className="w-75 mb-5" id="card" style={{
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
        <div className="card-group w-75" id="card-group" style={{
            top: '15%',
            left: '12.5%',
            position: 'absolute'
        }}>
            <div className="card mx-4 text-center" style={{
                boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer'
            }} onClick={setIds1}>
                <Card.Img variant="top" src={img3} style={{
                    boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                    borderRadius: '10px'
                }} />
                <div className="card-body">
                    <h5 className="card-title">{title2} ({releaseDate2})</h5>
                    {/* <p className="card-text">{releaseDate2}</p> */}
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
            </div>
            <div className="card mx-4 text-center" style={{
                boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer'
            }} onClick={setIds2}>
                <Card.Img variant="top" src={img4} style={{
                    boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                    borderRadius: '10px'
                }} />
                <div className="card-body">
                    <h5 className="card-title">{title3} ({releaseDate3})</h5>
                    {/* <p className="card-text">{releaseDate3}</p> */}
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
            </div>
            <div className="card mx-4 text-center" style={{
                boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer'
            }} onClick={setIds3}>
                <Card.Img variant="top" src={img5} style={{
                    boxShadow: '0 15px 25px rgba(129, 124, 124, 0.2)',
                    borderRadius: '10px'
                }} />
                <div className="card-body">
                    <h5 className="card-title">{title4} ({releaseDate4})</h5>
                    {/* <p className="card-text">{releaseDate4}</p> */}
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
            </div>
        </div>
    </div>
};

export default Movies;