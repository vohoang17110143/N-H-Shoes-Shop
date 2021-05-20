import React, { useState, useEffect } from "react";
import "./ratingStyle.css";
import ratingApi from "../../../../api/ratingApi";
import { useLocation } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Row, Col } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

const TotalRating = (props) => {
  const [star, setStar] = useState({});
  // calculator rating
  const calRate = (rates) => {
    let star = {
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
      average: 0,
      totalStar: 0,
    };
    rates.forEach((rate) => {
      switch (rate.star) {
        case 1:
          star.oneStar++;
          break;
        case 2:
          star.twoStar++;
          break;
        case 3:
          star.threeStar++;
          break;
        case 4:
          star.fourStar++;
          break;
        default:
          star.fiveStar++;
          break;
      }
      star.average = parseFloat(
        (
          (star.oneStar +
            star.twoStar * 2 +
            star.threeStar * 3 +
            star.fourStar * 4 +
            star.fiveStar * 5) /
          rates.length
        ).toFixed(1)
      );
      star.totalStar = rates.length;
    });
    return star;
  };

  const loadRate = () => {
    ratingApi
      .getRating(props.productId)
      .then((res) => {
        setStar(calRate(res));
      })
      .catch((err) => alert(err));
  };
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    loadRate();
    connection
      .start()
      .then((res) => {
        connection.on("Update_Rating", () => {
          loadRate();
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  return (
    <div className="rating-container">
      <Row>
        <Col lg="5">
          <p className="heading">Tổng đánh giá</p>
        </Col>
        <Col lg="7" >
          <div className="star-rating">
            <div className="star-inactive">
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
            </div>
            <div
              className="star-active"
              style={{ width: `${2 * star.average}em` }}
            >
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
              <span className="fa fa-star size"></span>
            </div>
          </div>
        </Col>
      </Row>
      <p style={{ marginBottom: "0px" }}>
        {star.average} sao trung bình dựa trên {star.totalStar} đánh giá.
      </p>

      <hr style={{ border: "2px solid #f1f1f1" }} className="my-0" />
      <div className="row" style={{ marginLeft: "1px" }}>
        <div className="side">
          <div>5 sao</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div
              className="bar-5"
              style={{ width: `${(star.fiveStar / star.totalStar) * 100}%` }}
            />
          </div>
        </div>
        <div className="side right">
          <div>{star.fiveStar}</div>
        </div>
        <div className="side">
          <div>4 sao</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div
              className="bar-4"
              style={{ width: `${(star.fourStar / star.totalStar) * 100}%` }}
            />
          </div>
        </div>
        <div className="side right">
          <div>{star.fourStar}</div>
        </div>
        <div className="side">
          <div>3 sao</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div
              className="bar-3"
              style={{ width: `${(star.threeStar / star.totalStar) * 100}%` }}
            />
          </div>
        </div>
        <div className="side right">
          <div>{star.threeStar}</div>
        </div>
        <div className="side">
          <div>2 sao</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div
              className="bar-2"
              style={{ width: `${(star.twoStar / star.totalStar) * 100}%` }}
            />
          </div>
        </div>
        <div className="side right">
          <div>{star.twoStar}</div>
        </div>
        <div className="side">
          <div>1 sao</div>
        </div>
        <div className="middle">
          <div className="bar-container">
            <div
              className="bar-1"
              style={{ width: `${(star.oneStar / star.totalStar) * 100}%` }}
            />
          </div>
        </div>
        <div className="side right">
          <div>{star.oneStar}</div>
        </div>
      </div>
    </div>
  );
};

export default TotalRating;
