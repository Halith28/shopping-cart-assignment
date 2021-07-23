import React from "react"
import TopBar from "../../components/topBar"
import banner from "../../server/banners/index.get.json"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

const Home = () => {
    console.log(banner)
    return(
        <div>
            <TopBar />
            <p></p>
            <Carousel>
            {
                banner.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <img src={"../../static/images/offers/offer1.jpg"} alt="allah" />
            </div>
    )
}

function Item(props)
{
    return (
        <Paper>
            <img src={"../../static/images/offers/offer1.jpg"} alt="logo" />
            <p>{props.item.bannerImageAlt}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Home