import React, { useState, useEffect } from "react";
import { useFetch } from "./src/CustomHook";
let someVarWhichIsNotAState = 0;
const OtherUseEffectExamples = () => {
  const [counter, setCounter] = useState(0);
  const [uselessCounter, setUselessCounter] = useState(0);
  let someVarWhichIsNotAState = 0;

  useEffect(() => {
    console.log("Inside UseEffect");
    setCounter(counter + 1);
  }, []);
  // This functionw will be called if any of the items of this Array changes
  const incrementNonStateValue = () => {
    someVarWhichIsNotAState++;
    console.log(someVarWhichIsNotAState);
  };
  return (
    <>
      Name Age
      <h1>Count : {counter}</h1>
      <button
        onClick={() => {
          // setCounter(counter + 1);
          incrementNonStateValue();
        }}
      >
        Increment
      </button>
    </>
  );
};

const HideAndShowExampleWithHooks = () => {
  const [toggleComponent, setToggleComponent] = useState(true);
  return (
    <>
      <h1>Toggle Status : {toggleComponent.toString()}</h1>
      <button
        onClick={() => {
          setToggleComponent(!toggleComponent);
        }}
      >
        Toggle Showing Component
      </button>
      {toggleComponent && <HooksRunningOnlyOnce />}
    </>
  );
};

const HooksRunningOnlyOnce = () => {
  const [loginStatus, setLoginStatus] = useState(true);

  useEffect(() => {
    console.log("inside Use Effect");
    return () => {
      console.log("Un Mounting");
    };
  }, []);

  useEffect(() => {
    console.log("Login Status Changed");
    return () => {
      console.log("Login Status Effect --> Un Mounting");
    };
  }, [loginStatus]);

  return (
    <>
      <h1>Login Status : {loginStatus.toString()}</h1>
      <button
        onClick={() => {
          setLoginStatus(!loginStatus);
        }}
      >
        Toggle Login
      </button>
      <button>Do Some Other UPdate Out </button>
    </>
  );
};

// const UseEffectExamples = () => <HooksRunningOnlyOnce />;
// const UseEffectExamples = () => <HideAndShowExampleWithHooks />;
const UseEffectExamples = () => <FetchStarWarsData />;

const FetchStarWarsData = () => {
  return (
    <>
      {/* <FetchStarWarsPlanets />
      <hr />
      <FetchStarWarsPpl /> */}
      {/* <hr /> */}
      {/* <FetchStarWarsPlanetsAndPpl /> */}
      <hr />
      <h1>Custom Fetch Hook</h1>
      <br />
      <FetchStarWarsPlanetsAndPplViaCustomHook />
    </>
  );
};

const FetchStarWarsPpl = () => {
  const [data, setData] = useState({ name: "" });
  const [url, seturl] = useState("");
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    console.log("inside Use Effect");
    if (url !== "") {
      fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => sethasError(true));
    }
  }, [url]);

  return (
    <>
      Name:
      <h1>{data.name}</h1>
      <button onClick={() => seturl("https://swapi.co/api/people/1")}>
        Fetch Ppl
      </button>
    </>
  );
};

const FetchStarWarsPlanets = () => {
  const [data, setData] = useState({ name: "" });
  const [url, seturl] = useState("");
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    console.log("inside Use Effect");
    if (url !== "") {
      fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => sethasError(true));
    }
  }, [url]);

  return (
    <>
      Name:
      <h1>{data.name}</h1>
      <button onClick={() => seturl("https://swapi.co/api/planets/1/")}>
        Fetch Planets
      </button>
    </>
  );
};

const FetchStarWarsPlanetsAndPpl = () => {
  const [dataPlanet, setDataPlanet] = useState({ name: "" });
  const [dataPpl, setDataPpl] = useState({ name: "" });
  // const [url, seturl] = useState("");
  const [hasError, sethasError] = useState(false);

  const [callPlanetAPI, setCallPlanetAPI] = useState(false);
  const [callPplAPI, setCallPplAPI] = useState(false);

  useEffect(() => {
    // For Planet
    const url = "https://swapi.co/api/planets/1/";
    console.log("Data Planet --> inside Use Effect");
    if (callPlanetAPI) {
      fetch(url)
        .then(response => response.json())
        .then(data => setDataPlanet(data))
        .catch(error => sethasError(true));
    }
  }, [callPlanetAPI]);

  useEffect(() => {
    console.log("Data Ppl --> inside Use Effect");
    // seturl("https://swapi.co/api/people/1");
    const url = "https://swapi.co/api/people/1";
    if (callPplAPI) {
      fetch(url)
        .then(response => response.json())
        .then(data => setDataPpl(data))
        .catch(error => sethasError(true));
    }
  }, [callPplAPI]);

  // // useEffect(() => {
  // //   console.log("inside Use Effect");
  // //   if (url !== "") {
  // //     fetch(url)
  // //       .then(response => response.json())
  // //       .then(data => setDataPlanet(data))
  // //       .catch(error => sethasError(true));
  // //   }
  // // }, [url]);

  return (
    <>
      Ppl Name:
      <h1>{dataPpl.name}</h1>
      Planet Name:
      <h1>{dataPlanet.name}</h1>
      <button
        onClick={() => {
          setCallPplAPI(true);
        }}
      >
        Fetch Ppl
      </button>
      <button
        onClick={() => {
          setCallPlanetAPI(true);
        }}
      >
        Fetch Planets
      </button>
    </>
  );
};

const FetchStarWarsPlanetsAndPplViaCustomHook = () => {
  // useFetch
  const planetAPIURL = "https://swapi.co/api/planets/1/";
  const pplAPIURL = "https://swapi.co/api/people/1";

  // const dataPlanet = useFetch(planetAPIURL);
  const dataPpl = useFetch(pplAPIURL);

  // useEffect(() => {
  // });

  // const [dataPlanet, setDataPlanet] = useState({ name: "" });
  // const [dataPpl, setDataPpl] = useState({ name: "" });

  // // const [dataPlanet, setDataPlanet] = useFetch(planetAPIURL);
  // // const [dataPpl, setDataPpl] = useFetch(pplAPIURL);
  // // const [url, seturl] = useState("");
  // // const [hasError, sethasError] = useState(false);

  // const [callPlanetAPI, setCallPlanetAPI] = useState(false);
  // const [callPplAPI, setCallPplAPI] = useState(false);

  // useEffect(() => {
  //   // For Planet
  //   // const url = "https://swapi.co/api/planets/1/";
  //   // console.log("Data Planet --> inside Use Effect");
  //   // if (callPlanetAPI) {
  //   //   fetch(url)
  //   //     .then(response => response.json())
  //   //     .then(data => setDataPlanet(data))
  //   //     .catch(error => sethasError(true));
  //   // }
  //   setDataPlanet(useFetch(planetAPIURL));
  // }, [callPlanetAPI]);

  // useEffect(() => {
  //   console.log("Data Ppl --> inside Use Effect");
  //   // seturl("https://swapi.co/api/people/1");
  //   const url = "https://swapi.co/api/people/1";
  //   if (callPplAPI) {
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(data => setDataPpl(data))
  //       .catch(error => sethasError(true));
  //   }
  // }, [callPplAPI]);

  return (
    <>
      Ppl Name:
      <h1>{dataPpl.name}</h1>
      Planet Name:
      {/* <h1>{dataPlanet.name}</h1> */}
      {/* <button
        onClick={() => {
          setCallPplAPI(true);
        }}
      >
        Fetch Ppl
      </button>
      <button
        onClick={() => {
          setCallPlanetAPI(true);
        }}
      >
        Fetch Planets
      </button> */}
    </>
  );
};

// export default OtherUseEffectExamples;
export default UseEffectExamples;
