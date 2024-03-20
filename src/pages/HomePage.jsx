import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { Button, Modal, ProgressBar } from "react-bootstrap";

const HomePage = () => {
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterArray = letter.split("");
  const firstLine = letterArray.slice(0, 9);
  const secondLine = letterArray.slice(9, 18);
  const thirdLine = letterArray.slice(18);

  const [selecetBtns, setSelecetBtns] = useState([]);
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState("");
  const [remainingScore, setRemainingScore] = useState(8);
  const [gameState, setGameState] = useState("In Progress");
  const [matchedWord, setmatchedWord] = useState([]);

  useEffect(() => {
    getCountryData();
  }, []);
  const getCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countriesList = await response.json();

      // Extract country names
      const countryNames = countriesList.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Logging inside useEffect to ensure it runs after state update
    if (countries.length > 0) {
      // console.log(countries);
      const randomIndex = Math.floor(Math.random() * countries.length);
      const c = countries[randomIndex].split(" ");
      console.log(c[0]);
      setRandomCountry(c[0].toUpperCase());
    }
  }, [countries]);

  const handleClick = async (item, index) => {
    if (randomCountry.includes(item)) {
      setmatchedWord([...matchedWord, item]);
      const a = [...matchedWord, item].sort().join("");

      const b = randomCountry.split("").sort();
      const uniqueArray = [...new Set(b)];

      if (a === uniqueArray.join("")) {
        setGameState("You Win!");
        handleShow();
      }
    }
    setSelecetBtns([...selecetBtns, item]);

    if (!randomCountry.includes(item)) {
      setRemainingScore(remainingScore - 1);
    }
  };

  //for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (remainingScore === 0) {
      setGameState("You Loose!");
      handleShow();
    }
  }, [remainingScore]);

  const handlePlayAgain = () => {
    setSelecetBtns([]);
    setRemainingScore(8);
    getCountryData();
    handleClose();
  };
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="circle">
            <i className="bi bi-list fs-2"></i>
          </div>
          <h2 className="fw-bold m-0  ">Countries</h2>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="bar ">
            <ProgressBar
              now={remainingScore}
              min={1}
              max={8}
              style={{ height: "100%" }}
              variant="info"
            />
          </div>
          <i className="bi bi-heart-fill fs-3" ></i>
        </div>
      </div>
      <div className="question">
        <div className="d-flex h-100 justify-content-center align-items-center gap-2 flex-wrap">
          {randomCountry.split("").map((item, index) => {
            return (
              <Button
                // style={{background:selecetBtns.includes(item) ? "red !important":'inherit'}}
                key={index}
                style={{
                  background: selecetBtns.includes(item) && "#0e13fe",
                  border: "none",
                  borderRadius: "10px",
                  minHeight: "45px",
                  minWidth: "40px",
                  fontWeight: "bold",
                }}
              >
                {selecetBtns.includes(item) && item}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="  ">
        <div className="d-flex btngrp pt-3  gap-2 ">
          {firstLine.map((item, index) => {
            return selecetBtns.includes(item) ? (
              <Button
                disabled
                key={index}
                className="letter disabled flex-grow-1"
              >
                {item}
              </Button>
            ) : (
              <Button
                key={index}
                className="letter flex-grow-1"
                onClick={() => handleClick(item, index)}
              >
                {item}
              </Button>
            );
          })}
        </div>
        <div className="d-flex btngrp pt-3  gap-2 ">
          {secondLine.map((item, index) => {
            return selecetBtns.includes(item) ? (
              <Button
                disabled
                key={index}
                className="letter disabled flex-grow-1"
              >
                {item}
              </Button>
            ) : (
              <Button
                key={index}
                className="letter flex-grow-1"
                onClick={() => handleClick(item, index)}
              >
                {item}
              </Button>
            );
          })}
        </div>
        <div className="d-flex btngrp pt-3  gap-2 ">
          {thirdLine.map((item, index) => {
            return selecetBtns.includes(item) ? (
              <Button
                disabled
                key={index}
                className="letter disabled flex-grow-1"
              >
                {item}
              </Button>
            ) : (
              <Button
                key={index}
                className="letter flex-grow-1"
                onClick={() => handleClick(item, index)}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>

      <Modal show={show} centered>
        <div className="p-3  modal-content">
          <h1 className="text-center">{gameState}</h1>
          <div className="d-flex flex-column">
            <Button className=" mx-5 my-2" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Button className="quit mx-5 my-2" onClick={handlePlayAgain}>
              Quit Game
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default HomePage;
