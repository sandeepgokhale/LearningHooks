import React, { useState, useEffect } from "react";
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
const UseEffectExamples = () => <FetchStarWarsPpl />;

const FetchStarWarsData = () => {
  return (
    <>
      <FetchStarWarsPlanets />

      <FetchStarWarsPpl />
    </>
  );
};

const FetchStarWarsPpl = () => {
  const [data, setData] = useState({ name: "Sandeep" });
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
  const [data, setData] = useState({ name: "Sandeep" });
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

// export default OtherUseEffectExamples;
export default UseEffectExamples;
