import { useState } from "react";
import "./slider.scss";

function Slider({images}) {

    const [imageIndex, setImageIndex]  = useState(null);
    const n = images.length;
    console.log(imageIndex);
    return (
        <div className="slider">
            { 
            imageIndex != null &&  <div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" alt="arrow" onClick={()=>{
                      let nI = imageIndex-1;
                      if(nI < 0) nI = n-1;
                      setImageIndex(nI);  
                    }}/>
                </div>
                    <div className="imageContainer">
                        <img src={images[imageIndex]} alt="home" />
                    </div>
                <div className="arrow">
                <img src="/arrow.png" alt="arrow" className="right" onClick={()=>{
                      setImageIndex((imageIndex+1)%n);  
                    }}/>
                </div>
                <div className="close" onClick={()=>{
                    setImageIndex(null);
                }}>X</div>
            </div>
            }
          <div className="bigImage">
            <img src={images[0]} alt="image" onClick={()=>{
                setImageIndex(0);
            }}/>
          </div>
          <div className="smallImage">
            {
                images.slice(1).map((image,index)=>{
                   return <img src={image} alt="image" key={index} onClick={()=>{ setImageIndex(index+1)}}/>
                })
            }
          </div>
        </div>
    )
}

export default Slider;