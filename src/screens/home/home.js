import React, { useState, useEffect } from "react";
import TopBar from "../../components/topBar";
// import banner from "../../server/banners/index.get.json"
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
// import image from "../../static/images/offers/offer1.jpg"
// import { GET } from "../helper";
import axios from "axios";

const Home = () => {
  // const banners  =  GET("banners");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/banners`)
      .then((response) => {
        console.log("allah", response?.data);
        setData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <TopBar />
      <Carousel>
        {data?.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <img src={data[0]?.bannerImageUrl.toString()} alt="allah" />
    </div>
  );
};

function Item(props) {
  return (
    <Paper>
      <img src={props?.item?.bannerImageUrl} alt="logo" />
      <p>{props.item.bannerImageAlt}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default Home;
