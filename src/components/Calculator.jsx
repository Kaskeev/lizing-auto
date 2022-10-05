import React, { useState } from "react";
import "./Calculator.css";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import MuiSlider from "@mui/material/Slider";

const SliderMUI = styled(MuiSlider)({
  color: "#ff9514",
  position: "absolute",
  bottom: -10,
  left: 24,
  right: 24,
  height: 3,
  width: "82%",
  "& .MuiSlider-track": {
    border: "none",
  },
});

const Input = styled(MuiInput)({
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 24,
  width: "100%",
  height: 68,
  background: "#f3f3f4",
  borderRadius: 16,
  fontFamily: "Nekst-Black",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: 30,
  lineHeight: 36,
  color: "#575757",
  "& .MuiInputBase-root-MuiInput": {
    border: "none!important",
  },
  "&:before": {
    border: "none",
  },
  "&:after": {
    border: "none",
  },
  "&::hover": {
    border: "none",
  },
});
const theme = createTheme({
  breakpoints: {
    values: {
      sm: 320, // phone
      md: 480, // small laptop
      lg: 780, // big laptop
      xl: 1024, // desktop
    },
  },
});
const InputSum = styled(MuiInput)({
  paddingTop: 16,
  paddingBottom: 16,
  width: "100%",
  height: 68,
  borderBottom: "none!important",
  background: "#f3f3f4",
  borderRadius: 16,
  fontFamily: "Nekst-Black",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: 30,
  lineHeight: 36,
  color: "#575757",
  "& .MuiInputBase-root-MuiInput": {
    border: "none!important",
  },
  "&:before": {
    border: "none",
  },
  "&:after": {
    border: "none",
  },
  "&::hover": {
    borderBottom: "none",
  },
});

const Calculator = () => {
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  function sendForm(event) {
    event.preventDefault();
    fetch(
      `https://eoj3r7f3r4ef6v4.m.pipedream.net`,
      { monthP, leaseAgr },
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => console.log(res));
  }

  const [value, setValue] = useState(3200000);
  const [percent, setPercent] = useState(20);
  const [month, setMonth] = useState(60);

  const handleInputChange = (event) => {
    setValue(event.target.num === "" ? "" : Number(event.target.num));
  };
  const handleInputChangePercent = (event) => {
    setPercent(event.target.num === "" ? "" : Number(event.target.num));
  };
  const handleInputChangeMonth = (event) => {
    setPercent(event.target.num === "" ? "" : Number(event.target.num));
  };
  const format = String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
  console.log(format);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSliderChangePercent = (event, newValue) => {
    setPercent(newValue);
  };
  const handleSliderChangeMonth = (event, newValue) => {
    setMonth(newValue);
  };
  const handleBlur = () => {
    if (value < 1000000) {
      setValue(1000000);
    } else if (value > 6000000) {
      setValue(6000000);
    }
  };
  const formatPercent = `${percent}%`;
  const handleBlurPercent = () => {
    if (percent < 10) {
      setPercent(1);
    } else if (percent > 60) {
      setPercent(60);
    }
  };
  const handleBlurMonth = () => {
    if (month < 1) {
      setMonth(1);
    } else if (month > 60) {
      setMonth(60);
    }
  };

  const sumContr = (value / 100) * percent;
  const monthPay =
    (value - sumContr) *
    ((0.035 * Math.pow(1 + 0.035, month)) / (Math.pow(1 + 0.035, month) - 1));
  const monthP = Math.round(monthPay);
  const leaseAgr = sumContr + month * monthP;
  const leaseAgrFormat = String(leaseAgr).replace(
    /(\d)(?=(\d{3})+([^\d]|$))/g,
    "$1 "
  );
  const monthPForm = String(monthP).replace(
    /(\d)(?=(\d{3})+([^\d]|$))/g,
    "$1 "
  );

  return (
    <div className="calc__block">
      <h1 className="calc__block-title">
        Рассчитайте стоимость автомобиля в лизинг
      </h1>
      <div className="calc__block-wrapper">
        <div className="block__inner">
          <h3 className="block__inner-title">Стоимость автомобиля</h3>
          <ThemeProvider theme={theme}>
            <Box sx={{ position: "relative" }}>
              <Grid item>
                <div className="block__inner-wrapper">
                  <Input
                    sx={{
                      fontSize: {
                        md: "30px",
                        sm: "22px",
                      },
                    }}
                    value={format}
                    className="block__inner-inp"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 1000,
                      min: 1000000,
                      max: 6000000,
                      type: "string",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                  <p className="block__inner-desc">₽</p>
                </div>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <SliderMUI
                    sx={{
                      width: {
                        md: "85%",
                        sm: "80%",
                      },
                    }}
                    className="slider"
                    size="small"
                    value={value}
                    onBlur={handleBlur}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider slider"
                    step={1000}
                    min={1000000}
                    max={6000000}
                  />
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </div>
        <div className="block__inner">
          <h3 className="block__inner-title">Первоначальный взнос</h3>
          <ThemeProvider theme={theme}>
            <Box sx={{ position: "relative" }}>
              <Grid item>
                <div className="block__inner-wrapper">
                  <InputSum
                    sx={{
                      paddingLeft: {
                        lg: "90%",
                        xl: "80%",
                        md: "80%",
                        sm: "85%",
                      },
                      fontSize: {
                        md: "30px",
                        sm: "22px",
                      },
                    }}
                    value={formatPercent}
                    classNames="block__inner-inp"
                    onChange={handleInputChangePercent}
                    onBlur={handleBlurPercent}
                    inputProps={{
                      step: 1,
                      min: 10,
                      max: 60,
                      type: "string",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                  <p className="block__inner-cost">{sumContr}</p>
                </div>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <SliderMUI
                    sx={{
                      width: {
                        md: "85%",
                        sm: "80%",
                      },
                    }}
                    className="slider"
                    size="small"
                    value={percent}
                    onBlur={handleBlurPercent}
                    onChange={handleSliderChangePercent}
                    aria-labelledby="input-slider slider"
                    step={1}
                    min={10}
                    max={60}
                  />
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </div>
        <div className="block__inner">
          <h3 className="block__inner-title">Срок лизинга</h3>
          <ThemeProvider theme={theme}>
            <Box sx={{ position: "relative" }}>
              <Grid item>
                <div className="block__inner-wrapper">
                  <Input
                    sx={{
                      width: {
                        lg: "100%",
                      },
                      fontSize: {
                        md: "30px",
                        sm: "22px",
                      },
                    }}
                    value={month}
                    classNames={isActive ? "disabled " : "block__inner-inp"}
                    onChange={handleInputChangeMonth}
                    onBlur={handleBlurMonth}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 60,
                      type: "string",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                  <p className="block__inner-desc">мес.</p>
                </div>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <SliderMUI
                    sx={{
                      width: {
                        md: "85%",
                        sm: "80%",
                      },
                    }}
                    className="slider"
                    size="small"
                    value={month}
                    onBlur={handleBlurMonth}
                    onChange={handleSliderChangeMonth}
                    aria-labelledby="input-slider slider"
                    step={1}
                    min={1}
                    max={60}
                  />
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </div>
      </div>
      <div className="calc__block__bottom">
        <div className="calc__bottom-inner">
          <h4 className="calc-bottom-title">Сумма договора лизинга</h4>
          <h4 className="calc-bottom-price">{leaseAgrFormat} ₽</h4>
        </div>
        <div className="calc__bottom-inner">
          <h4 className="calc-bottom-title">Ежемесячный платеж</h4>
          <h4 className="calc-bottom-price">{monthPForm} ₽</h4>
        </div>
        <div className="calc__bottom-inner">
          <button
            className="calc__bottom-button calc__none"
            onClick={(sendForm, handleToggle)}
          >
            {/* <span
              className={
                isActive ? "submit-spinner submit-spinner_hide disabled" : null
              }
            ></span> */}
            <span>Оставить заявку</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
