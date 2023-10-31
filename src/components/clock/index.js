import React, { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment/moment";


const Clock = () => {
  const [pause, setPause] = useState(false);
  const [pauseTime, setPauseTime] = useState(null);
  const [time, setTime] = useState("00:00:00");
  const { countryTime } = useSelector((state) => state.countries);
  const [cTime, setCountryTime] = useState(null);
  const updateTimeFlag = useRef(true);
  let myInterval = "";

  const handleClock = () => {
    updateTimeFlag.current = false;
    setPause(!pause);
  };

  const initialStartTimer = () => {
    if (!cTime) {
      const UpdateTime = () => {
        let updatedTime = moment(countryTime?.datetime).format("HH:mm:ss");
        setTime(updatedTime);
      };
      myInterval = setInterval(UpdateTime);
    } else {
      const UpdateTime = () => {
        let updatedTime = moment(cTime).add(1, "s");
        setTime(updatedTime);
      };
      myInterval = setInterval(UpdateTime);
    }
  };

  const stopTimer = () => {
    clearInterval(myInterval);
  };

  const getUpdatedTime = (pauseTime) => {
    if (countryTime) {
      let date = countryTime?.datetime;
      let newTime = date?.split("T");
      let updatedTime = newTime[1]?.split(".");
      updatedTime[0] = pauseTime;
      let finalTime = [...newTime[0], ...updatedTime];
      return finalTime.join("");
    }
  };

  useEffect(() => {
    if (updateTimeFlag) {
      initialStartTimer();
    }
  }, []);

  useEffect(() => {
    if (pause) {
      setPauseTime(time);
      let updatedTime = getUpdatedTime(time);
      setCountryTime(updatedTime);
      stopTimer();
    }
  }, [pause]);

  return (
    <>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={pause ? pauseTime : time}
        InputProps={{
          classes: {
            input: {
              fontSize : "36px",
              color : "#00f0ff",
              fontWeight : "600"
            },
          },
        }}
        sx={{
          border: "8px dotted black",
          height: "55px",
          backgroundColor: "lightBlue",
          fontFamily: "'Arial', 'sans-serif'",
          color: "#00f0ff",
          fontSize : "36px",
          fontWeight : "600"
        }}
        size="large"
        disabled
      />
      <Button
        sx={{
          background: "lightgreen",
          color: "black",
          height: "60%",
          // marginTop: "1px",
          marginLeft: "50px",
          fontWeight: 600,
          padding: "30px",
        }}
        onClick={() => handleClock()}
      >
        {pause ? "Start" : "Pause"}
      </Button>
    </>
  );
};

export default Clock;
