import Person from '@mui/icons-material/Person';
import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import axios from './axios';

function TinderCards() {

    // const [people, setPeople] = useState([
    //     {
    //         name: "Elon Musk",
    //         url: "https://cdn1.ntv.com.tr/gorsel/xHXNObWGNkGm6rPNBn5yLQ.jpg?width=1000&mode=crop&scale=both"
    //     },
    //     {
    //         name: "Jeff Bezos",
    //         url: "https://www.alastyr.com/blog/wp-content/uploads/2020/10/jeff-bezoss-kimdir.jpg"
    //     },
    // ]);

    const [people, setPeople] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
            const  req = await axios.get("/tinder/cards");
            setPeople(req.data);
        }
        fetchData();
    }, [])


    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen");
    };


    return (
        <div className='tinderCards'>
            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div
                            style={{ backgroundImage: `url(${person.url})` }}
                            className="card"
                        >

                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards;