import React, { Component } from 'react';
import axios from 'axios';
import './series_items_style.css';
import ReactCountryFlag from 'react-country-flag';
import CarouselSlider from "react-carousel-slider";


function onSeriesClick(id, props){
  props.pickShow(id)
}

const SeriesItemDetails = (props) =>{
  let countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  var show = props.pickedShow;
  var similarSeries = props.similarSeries !== null ? props.similarSeries.results : null;

  var year = show.first_air_date !== null ? show.first_air_date.substring(0,4) : "";
  var genres = show.genres.map(e=><p key={e.id}>{e.name}</p>);
  var productionCountries = show.origin_country.map(e=>
                            <div key={e}>
                              <ReactCountryFlag style={{display:'inline'}} code={e} svg/>
                              <p style={{display:'inline', marginLeft:'5px', marginRight:'5px'}}>{countries.getName(e, "en")}</p>
                            </div>);

  const seriesDetails = (<div>
                              <div id="seriesName">{show['name']}</div>
                              <div id="yearOfSeries">Year: {year}</div>
                              <div id="seriesOverview">Overview: {show['overview']}</div>
                              <div id="seasonsAmount">Seasons: {show['seasons'].length}</div>
                              <img src={`http://image.tmdb.org/t/p/w185/${show['poster_path']}`} alt="" />
                              <div id="seriesGenres">Genres: {genres}</div>
                              <div id="seriesProductionCountries">Country: {productionCountries} </div>
                              <div id="voteCount">Number of votes: {show['vote_count']}</div>
                              <div id="voteAverage">Average vote: {show['vote_average']}</div>
                          </div>)

  if(similarSeries !== null && similarSeries['0'] !== undefined){
    // w tym divie similarSeries slider dla wszystkich z vara similarseries wyswietlane jakos po 4/5 czy cos


      let buttonSetting = {
          placeOn: "middle-outside",
          style: {
            left: {
                  color: "red",
                  background: "transparent",
                  border: "1px solid red",
                  borderRadius: "50%",
                  },
            right: {
                  color: "red",
                  background: "transparent",
                  border: "1px solid red",
                  borderRadius: "50%"
                  }
          }
      };
      let sliderBoxStyle = {
        height: "30%",
        width: "90%",
        background: "transparent",
        border: "1px solid #e1e4e8"
      };
      let customSlideCpnts = similarSeries.map(e => (
        <div>
          <img src={`http://image.tmdb.org/t/p/w185/${e.poster_path}`}
              style={{cursor: 'pointer'}}
              alt="" onClick={()=>onSeriesClick(e.id, props)}/>
        </div>
      ));

    return <div className="seriesItemDetails">
            {seriesDetails}

            <br/>
            <p id="similarSeriesLabel">Similar series:</p>
            <div id="similarSeries">
              <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
                <CarouselSlider
                  sliderBoxStyle = {{background: "transparent"}}
                  accEle = {{dots: false}}
                  manner={{ circular: true }}
                  slideCpnts = {customSlideCpnts}
                  sliderBoxStyle={sliderBoxStyle}
                  buttonSetting={buttonSetting}
                />
             </div>
           </div>
           </div>
  }else{
    return <div className="seriesItemDetails">
            {seriesDetails}
           </div>
    }

}

export default SeriesItemDetails;
