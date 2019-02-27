import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    content:
      "Welcome, traveler! How would you like to get to your destination?",

    label1: "Train",
    label2: "Ship",
    page1: "onthetrain",
    page2: "ontheship",
    image:
      "http://www.clker.com/cliparts/c/b/e/7/1514224610790235394hobo-cartoon-clipart-free.med.png"
  },
  onthetrain: {
    content:
      "Welcome aboard the Super dupper express! Please make your way to your seat. What's the number?",
    input: {
      type: "select",
      values: ["", "12A", "12B", "12C"],
      saveKey: "seat"
    },
    label1: "Lets Go!",
    page1: "train",
    image:
      "https://dqbasmyouzti2.cloudfront.net/assets/content/cache/made/content/images/articles/Coradia_iLint_Hydrogen_Train_XL_721_420_80_s_c1.jpg"
  },
  ontheship: {
    content: "Spaceship bitches!!!  What planet are you headed to today?",
    input: {
      type: "text",
      saveKey: "destination"
    },
    label1: "Onward!",
    page1: "ship",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71i70eaIn1L._SL1143_.jpg"
  },

  train: {
    content: [
      "did you know, seat SEAT is magical? would you like to end it all here or go on?",
      "SEAT is a good seat",
      "AHHH HELL NOOOO!!! SEAT has coffee spilt on it!!"
    ],

    label1: "die now!",
    label2: "keep living!",
    page1: "die",
    page2: "live",
    key: "seat"
  },

  ship: {
    content: "what are you looking to do on DESTINATION?",
    label1: "die",
    label2: "live",
    page1: "die",
    page2: "live",
    key: "destination",
    image: ""
  },
  die: {
    content: "how would you like to die",
    label1: "by fire",
    label2: "by ice",
    page1: "fire",
    page2: "ice"
  },
  live: {
    content: "how would you like to live",
    label1: "gloriously",
    label2: "witheringly",
    page1: "glory",
    page2: "wither"
  },
  ice: {
    content: "The Ice Man Aproachith!!! what do you do",
    label1: "run away!",
    label2: "jump ship!",
    page1: "run",
    page2: "jump"
  },
  fire: {
    content: "are you sure? that sounds painful!",
    label1: "definately",
    label2: "uh maybe not",
    page1: "fireman",
    page2: "ice"
  },
  glory: {
    content: "how will you get there?",
    label1: "Conquest!",
    label2: "Slight of hand",
    page1: "fight",
    page2: "trick"
  },
  wither: {
    content: "a man aproaches, and asks if you want salt in your water",
    label1: "oh yes salt please",
    label2: "god no what wrong with you",
    page1: "salt",
    page2: "nosalt"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    if (!pageData) {
      throw new Error("Eek! No page here!");
    }

    var goToPage = this.props.goToPage;
    var saveUserData = this.props.saveUserData;

    function goToPage1() {
      goToPage(pageData.page1);
    }
    function goToPage2() {
      goToPage(pageData.page2);
    }
    function handleChange(event) {
      saveUserData(pageData.input.saveKey, event.target.value);
    }

    var button1 = "";
    if (pageData.page1) {
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>;
    }

    var button2 = "";
    if (pageData.page2) {
      button2 = <button onClick={goToPage2}>{pageData.label2}</button>;
    }

    var image = "";
    if (pageData.image) {
      image = (
        <div>
          <img className="main-page-image" src={pageData.image} />
        </div>
      );
    }

    var input = "";
    if (pageData.input) {
      var inputData = pageData.input;
      if (inputData.type == "select") {
        input = (
          <p>
            <select
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            >
              {inputData.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </p>
        );
      }
      if (inputData.type == "text") {
        input = (
          <p>
            <input
              type="text"
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            />
          </p>
        );
      }
    }

    var content = "";
    if (pageData.key) {
      var key = pageData.key;
      if (key === "destination") {
        content = pageData.content.replace(
          "DESTINATION",
          this.props.userData.destination
        );
      }
      if (key === "seat") {
        if (this.props.userData.seat === "12A") {
          content = pageData.content[0].replace(
            "SEAT",
            this.props.userData.seat
          );
        }
        if (this.props.userData.seat === "12B") {
          content = pageData.content[1].replace(
            "SEAT",
            this.props.userData.seat
          );
        }
        if (this.props.userData.seat === "12C") {
          content = pageData.content[2].replace(
            "SEAT",
            this.props.userData.seat
          );
        }
      }
    } else {
      content = pageData.content;
    }

    return (
      <div>
        <p>{content}</p>
        {input}
        {button1}
        {button2}
        {image}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start",
      userData: {}
    };

    this.goToPage = this.goToPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  saveUserData(key, value) {
    function updateState(state) {
      var newState = { userData: { ...state.userData, [key]: value } };
      return newState;
    }
    this.setState(updateState);
  }

  render() {
    return (
      <div className="App">
        <Page
          pageName={this.state.page}
          goToPage={this.goToPage}
          userData={this.state.userData}
          saveUserData={this.saveUserData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
