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
    image: ""
  },
  onthetrain: {
    content:
      "Welcome aboard the choo-choo train! Please make your way to your seat. What's the number?",
    label1: "12E",
    label2: "97C",
    page1: "death",
    page2: "life",
    image: "https://dqbasmyouzti2.cloudfront.net/assets/content/cache/made/content/images/articles/Coradia_iLint_Hydrogen_Train_XL_721_420_80_s_c1.jpg"
    
  },
  ontheship: {
    content:
      "Welcome aboard the ship! Please make your way to your seat. What's the number?",
    label1: "14B",
    label2: "977A",
    page1: "death",
    page2: "life"
  },
  death: {
    content:
      "do you choose to live or die",
    label1: "die",
    label2: "live",
    page1: "die",
    page2: "live"
  },
  life: {
    content:
      "do you choose to live or die",
    label1: "die",
    label2: "live",
    page1: "die",
    page2: "live"
  },
  die: {
    content:
      "how would you like to die",
    label1: "by fire",
    label2: "by ice",
    page1: "fire",
    page2: "ice"
  },
  live: {
    content:
      "how would you like to live",
    label1: "gloriously",
    label2: "witheringly",
    page1: "glory",
    page2: "wither"
  },
  ice: {
    content:
      "The Ice Man Aproachith!!! what do you do",
    label1: "run away!",
    label2: "jump ship!",
    page1: "run",
    page2: "jump"
  },
  fire: {
    content:
      "are you sure? that sounds painful!",
    label1: "definately",
    label2: "uh maybe not",
    page1: "fireman",
    page2: "ice"
  },
   glory: {
    content:
      "how will you get there?",
    label1: "Conquest!",
    label2: "Slight of hand",
    page1: "fight",
    page2: "trick"
  },
  wither: {
    content:
      "a man aproaches, and asks if you want salt in your water",
    label1: "oh yes salt please",
    label2: "god no what wrong with you",
    page1: "salt",
    page2: "nosalt"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    var goFunction = this.props.goToPage;

    function goToPage1() {
      goFunction(pageData.page1);
    }

    function goToPage2() {
      goFunction(pageData.page2);
    }

    var button1 = "";
    if (pageData.page1){
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>
    }
    var button2 = "";
    if (pageData.page2) {
       button2 = <button onClick={goToPage2}>{pageData.label2}</button>
    }
    return (
      <div>
        <p>{pageData.content}</p>
        {button1}
        {button2}
        <img source= {pageData.image}>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start"
    };

    this.goToPage = this.goToPage.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  render() {
    return (
      <div className="App">
        <Page pageName={this.state.page} goToPage={this.goToPage} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
