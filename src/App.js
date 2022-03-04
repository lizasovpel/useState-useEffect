import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log('counting')
    return num + 10
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0)
    const [autoPlay, setAutoPlay] = useState(false)

    const getSomeImages = useCallback(() => {
        console.log('getting images')
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
        ]
    }, [slide])

    function changeSlide (i) {
        setSlide(slide => slide + i)
    }

    function toggleAutoPlay() {
        setAutoPlay(autoplay => !autoPlay)
    }

    const total = useMemo(() => {
        return countTotal(slide)
    }, [slide])

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect (() => {
        console.log('style changed')
    }, [style])
    
    return (
        <Container>
            <div className="slider w-50 m-auto">
                
                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/>{autoPlay ? 'auto' : null}</div>
                <div style = {style} className="text-center mt-5">Total slides: {total}</div>

                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoPlay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key = {i} className="d-block w-100" src={url} alt="slide"/>)}
        </>
    )
}



function App() {
    const [slider, showSlider] = useState(true)
  return (
        <>
        <button className="btn btn-primary" onClick ={() => showSlider(false)}>click here to delete slider</button>
        {slider? <Slider/> : null}
        </>
  );
}

export default App;
