import { Link } from "react-router-dom";
import { Marker,Popup } from "react-leaflet";
import "./pin.scss";

function Pin ({item}) {
    //console.log(`consoled ${item.id} ${item.price} ${item.title} ${item.bedroom} ${item.img} ${item.latitude} ${item.longitude}`);
    return (
       // <div className="pin">
            <Marker position={[item.latitude, item.longitude]}>
              <Popup>
                <div className="popUpContainer">
                    <img src={item.img} alt="img" />
                    <div className="textContainer">
                        <Link to={`/${item.id}`} className="link">{item.title}</Link>
                        <span>{item.bedroom} bedroom</span>
                        <b>$ {item.price}</b>
                    </div>
                </div>
              </Popup>
            </Marker>
        //</div>
    )
}

export default Pin;