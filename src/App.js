import React, { useState, useRef } from "react";
import OtherUseEffectExamples from "../OtherUseEffectExamples";
import "./styles.css";

const sampleNames = ["Sandeep", "Gokhale"];
const sampleEmployee = {
  name: "James",
  age: 18,
  work: "Show Off"
};

export default function App() {
  return (
    <div className="App">
      <h1>Welcome To React Hooks - UseState CodeSandbox</h1>
      <hr />
      <OtherUseEffectExamples />
      <hr />
      {/* <NestedObjectsAndReactHooks /> */}
    </div>
  );
}

const SingleStateMultiUpdates = () => {
  const [counter, setCounter] = useState(10);
  return (
    <>
      Counter : {counter}
      <br />
      <ButtonComponent
        buttonName="Reset"
        onClickHandler={() => setCounter(0)}
      />
      <ButtonComponent
        buttonName="Increment"
        // onClickHandler={() =>
        //   setCounter(prevCount => {
        //     return prevCount + 1;
        //   })
        // }
        onClickHandler={() =>
          setCounter(prevCount => {
            alert(prevCount);
            return prevCount + 2;
          })
        }
      />
      <ButtonComponent
        buttonName="Decrement"
        onClickHandler={() => setCounter(counter - 1)}
      />
    </>
  );
};
// Helper Functions
// const updateValues = () => {};

const MultiStateExamples = () => {
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("Unknown");
  const [isLoggedIn, setloggedIn] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState("Login");
  // const [isAdult] = useState(() => {
  //   return age > 18 ? true : false;
  // });
  // const [isAdult, setAdult] = useState(function() {
  //   return age > 18 ? true : false;
  // });
  const [isAdult, setAdult] = useState(seeIfPersonIsAdult(0));

  function seeIfPersonIsAdult(age) {
    return age > 18;
  }

  const updateValues = () => {
    if (isLoggedIn) {
      const userAge = 0;
      setName("Guest");
      setAge(userAge);
      setAdult(seeIfPersonIsAdult(userAge));
      // setAge(0);
      // console.log(name + " -->" + age);
      // setAdult(seeIfPersonIsAdult(age));
      setCountry("Unknown");
      setLoginButtonText("Log In");
    } else {
      const userAge = 45;
      setName("Sachin");
      setAge(userAge);
      console.log(name + " -->" + age);
      setAdult(seeIfPersonIsAdult(userAge));
      setCountry("India");
      setLoginButtonText("Log Out");
    }
    setloggedIn(!isLoggedIn);
  };
  console.log("render called");
  return (
    <>
      <h2> Is Logged In : {isLoggedIn ? "Yes" : "No"}</h2>
      Name : {name} <br />
      Age :{age} <br />
      Is Adult = {isAdult ? "Yes" : "No"}
      <br />
      Country :{country} <br />
      <br />
      <button onClick={() => updateValues()}> {loginButtonText} </button>
    </>
  );
};

const MyFirstUseStateComponent = () => {
  const [name, setName] = useState("Sandeep");
  return (
    <>
      <h1>Welcome {name} </h1> <br />
      Two Way Data Binding :{" "}
      <input value={name} onChange={e => setName(e.target.value)} />
    </>
  );
};

const SampleCounterComponent = ({ incrementCount = 1 }) => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <button onClick={() => setCounter(counter + incrementCount)}>
        {counter}
      </button>
    </>
  );
};

const DisplayExampleTitle = ({ title }) => {
  return <h3>{title}</h3>;
};

const AllExamples = () => {
  return (
    <>
      <DisplayExampleTitle title="LIfe Before Hook" />
      <BeforeHooks />
      <hr />
      <DisplayExampleTitle title="My First Hook Example" />
      <MyFirstUseStateComponent />
      <hr />
      <DisplayExampleTitle title="My First Hook Counter Example" />
      <SampleCounterComponent />
      <hr />
      <DisplayExampleTitle title="My First Hook Counter Example with Props" />
      <SampleCounterComponent incrementCount={2} />
      <hr />
      <DisplayExampleTitle title="My First Hook Counter Example with Props" />
      <SampleCounterComponent incrementCount={2} />
      <hr />
      <DisplayExampleTitle title="Hooks With Multiple States" />
      <MultiStateExamples />
      <hr />
      <DisplayExampleTitle title="Hooks With Singe State, Multiple Updates" />
      <SingleStateMultiUpdates />
      <hr />
      <DisplayExampleTitle title="What Happens when Keys are not used" />
      <ProblemsWithReactWithoutKeys />
      <hr />
      <DisplayExampleTitle title="Resolve the problem with Keys" />
      <WhyKeysAreImportant />
      <hr />
      <DisplayExampleTitle title="Arrays and Hooks" />
      <ArraysAndHooks />
      <hr />
      <DisplayExampleTitle title="Objects and Hooks" />
      <ObjectsAndHooks />
      <hr />
      <DisplayExampleTitle title="Looping Arrays without Keys - Just return a new element when you loop" />
      <ArraysWithoutNeedingAKey />
    </>
  );
};

function ButtonComponent({ buttonName, onClickHandler }) {
  return (
    <button className="AddMargin" onClick={() => onClickHandler()}>
      {buttonName}
    </button>
  );
}

// Before Hooks Example
class BeforeHooks extends React.Component {
  state = {
    count: 1
  };

  incrementCount = () => {
    // this.setState((state, props) => ({
    //   counter: state.counter + props.increment
    // }));

    this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return <button onClick={this.incrementCount}>{this.state.count}</button>;
  }
}

const ArraysAndHooks = () => {
  const inputElement = useRef(null);
  const [name, setName] = useState("");
  const [names, setNames] = useState(sampleNames);
  // useEffect(){

  // }

  // const myNamesWithIds = names.map((value, index) => ({
  //   names,
  //   id: index
  // }));
  // console.log(JSON.stringify(myNamesWithIds));
  return (
    <>
      {names.map(i => {
        return <div key={i}>{i}</div>;
      })}
      <input
        ref={inputElement}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {}
      <span
        onClick={() => {
          setNames(names.concat(name));
          setName("");
          inputElement.current.focus();
        }}
      >
        +
      </span>
    </>
  );
};

const ProblemsWithReactWithoutKeys = () => {
  const [names, setNames] = useState(sampleNames);
  const removeItemFromArray = e => {
    setNames(names.filter(item => item !== e));
  };

  return (
    <>
      {names.map((value, index) => {
        return (
          <div>
            {value}
            <input />
            <button
              value={value}
              onClick={e => removeItemFromArray(e.target.value)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button onClick={() => setNames(sampleNames)}>Reset</button>
    </>
  );
};

const WhyKeysAreImportant = () => {
  const [names, setNames] = useState(sampleNames);
  const removeItemFromArray = e => {
    setNames(names.filter(item => item !== e));
  };

  return (
    <>
      {names.map((value, index) => {
        return (
          <div key={value}>
            {value}
            <input />
            <button
              value={value}
              onClick={e => removeItemFromArray(e.target.value)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button onClick={() => setNames(sampleNames)}>Reset</button>
    </>
  );
};

const ObjectsAndHooks = () => {
  const [employee, setEmployee] = useState(sampleEmployee);
  const makeHimOld = () => {
    setEmployee(previousState => {
      console.log(JSON.stringify(previousState));
    });
    setEmployee({ ...employee, age: employee.age + 1 });
  };
  return (
    <div>
      Hello World <br />
      {Object.keys(employee).map((value, index) => {
        return (
          // <li key={value}> {employee[value]} </li>
          <div key={employee[value]}>
            {value} - {employee[value]}
          </div>
        );
      })}
      <button onClick={makeHimOld}> Make Him Old </button>
      <button onClick={() => setEmployee(sampleEmployee)}> Reset </button>
    </div>
  );
};

const ArraysWithoutNeedingAKey = () => {
  const [names, setNames] = useState(sampleNames);
  const removeItemFromArray = e => {
    setNames(names.filter(item => item !== e));
  };
  return (
    <>
      {/* {listItem} */}
      {names.map((value, index) => {
        return (
          <MyNewComponentWhichDoenstNeedAKey
            key={value} // Remove this to see the bug. Text will not change
            // When you delete an entry. Label will change but
            // maps to the old text.
            // Try it out to find out.
            removeItemFromArray={removeItemFromArray}
            value={value}
          />
        );
      })}
      <button onClick={() => setNames(sampleNames)}>Reset</button>
      <hr />
      {/* <NumberList /> */}
    </>
  );
};

const MyNewComponentWhichDoenstNeedAKey = ({ value, removeItemFromArray }) => {
  //Since there is no surrounding array in the context.
  // A good rule of thumb is that elements inside the map() call need keys.
  return (
    <li>
      {value}
      <input />
      <button value={value} onClick={e => removeItemFromArray(e.target.value)}>
        Delete
      </button>
    </li>
  );
};
const numbers = [1, 2, 3, 4, 5];

function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>{value} </li>
  );
}

function NumberList(props) {
  // const numbers = props.numbers;
  const listItems = numbers.map(number => (
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const NestedObjectsAndReactHooks = () => {
  const myFavFood = {
    food: {
      indian: {
        akkiRoti: true
      },
      italian: {
        pizza: false,
        hasPineapple: {
          pineapple: false
        }
      }
    }
  };
  const [myFavFoodCombination, setMyFavFoodCombination] = useState(myFavFood);

  const updateMyFoodChoiceAndAddPineApple = () => {
    const newObj = Object.assign(
      {},
      { ...myFavFood.food },
      {
        italian: {
          hasPineapple: {
            pineapple: false
          }
        }
      }
    );
    setMyFavFoodCombination({ food: newObj });
  };
  const updateMyFoodChoice = () => {
    const newObj = Object.assign(
      {},
      { ...myFavFood.food },
      { ...myFavFood.food.italian },
      {
        italian: { pizza: true }
      }
    );
    // const newObj = Object.assign({}, myFavFoodCombination , {food.italian:false});
    setMyFavFoodCombination({
      food: newObj
    });
  };
  return (
    <div>
      {JSON.stringify(myFavFoodCombination, null, " ")} <br />
      <button onClick={() => updateMyFoodChoice()}>
        {" "}
        Oh, I like Pizza Now.
      </button>
      <button onClick={() => updateMyFoodChoiceAndAddPineApple()}>
        {" "}
        Oh, Pls Add Pineapple.
      </button>
      <button
        onClick={() => {
          console.log("here");
          setMyFavFoodCombination(myFavFood);
        }}
      >
        {" "}
        Not Really
      </button>
    </div>
  );
};
