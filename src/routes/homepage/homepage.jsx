import { useContext } from "react";
import Searchbar from "../../components/searchbar/searchbar";
import "./homepage.scss";
import { AuthContext } from "../../components/context/AuthContext";

function Homepage(){
  
  const {currentUser} = useContext(AuthContext);
  //console.log(`cu ${currentUser}`)
    return (
        <div className="homepage">
            <div className="textContainer">
               <div className="wrapper">
                  <h1 className="title">
                    
                    Find Real Estate & Get Your Dream Place
                  </h1>
                  <p>
                    Use the align-items property to align the items vertically.The justify-content property can also be used on a grid 
                    container to align grid items in the inline direction. For pages in English, inline direction is left to right and 
                    block direction is downward.
                  </p>
                  <Searchbar />
                  <div className="boxes">  
                    <div className="boxe">
                        <h1>16+</h1>
                        <h2>Years Of Experience</h2>
                    </div>
                    <div className="boxe">
                        <h1>200</h1>
                        <h2>Awards Gained</h2>
                    </div>
                    <div className="boxe">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                  </div>
               </div>
            </div>
            <div className="imageContainer">
              <img src="/bg.png" alt="background-image" />
            </div>
        </div>
    )

}

export default Homepage;