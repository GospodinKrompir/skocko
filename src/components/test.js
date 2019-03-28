import React, { Component } from 'react';
import Squares from './square';
import Circles from './circles';
import './test.css';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = { x: 0, y: 0, znakovi: ["znak1", "znak2", "znak3", "znak4", "znak5", "znak6"], }
        this.inputX = React.createRef();
        this.inputY = React.createRef();
    }
    getInitialState = () => {
        this.setState({ x: 0, y: 0 });
        this.genNiz = [];
        this.guesses=0;
    }
    matrica = () => {
        if (this.state.x === 0) {
            let matricaX = parseInt(this.inputX.current.value);
            let matricaY = parseInt(this.inputY.current.value);
            this.setState({ x: matricaX, y: matricaY });
        }
    }
    drawSquare = () => {
        let rows = this.state.x;
        let columns = this.state.y;
        let squaresColumns = [];
        for (let i = 0; i < columns; i++) {
            squaresColumns.push(<li className="active"><Squares function={this.removeZnak} x={rows} /></li>)
        }
        return squaresColumns
    }
    drawCircle = () => {
        let rows = this.state.x;
        let columns = this.state.y;
        let circlesColumns = [];
        for (let i = 0; i < columns; i++) {
            circlesColumns.push(<li className="check"><Circles x={rows} /></li>)
        }
        return circlesColumns;
    }
    genNiz = []
    genNizCopy = []
    drawUpit() {
        let x = this.state.x;
        let upit = [];
        for (let i = 0; i < x; i++) {
            this.genNiz.push(Math.floor(Math.random() * 6) + 1)
            let znak = 'emptySlot znak' + this.genNiz[i];
            upit.push(<div className={znak}></div>)
        }
        this.genNizCopy = this.genNiz.slice(0);
        return upit
    }
    guesses = 0;
    znak = ''
    removeZnak = (e) => {
        if (e.target.parentNode.classList.contains('active')) {
            let regex = new RegExp('znak[1-6]')
            if (e.target.className.split(' ').some(c => regex.test(c))) {
                e.target.classList.add('slot');
                e.target.className.split(' ').map((e) => { if (regex.test(e)) this.znak = e; return this.znak })
                e.target.classList.remove(this.znak)
                this.guesses -= 1;
            }
        }
    }
    addZnak = (e) => {
        let redKockica = document.getElementsByClassName('active');
        if (redKockica[0] !== undefined) {
            let nizKockica = redKockica[0].getElementsByClassName('slot');
            if (this.guesses < this.state.x) {
                nizKockica[0].classList.add(e.target.id);
                nizKockica[0].classList.remove('slot');
                this.guesses += 1;
            }
        }
    }
    guessNiz = []
    rightGuesses = 0;
    flag = 0;
    pot = () => {
        if (this.guesses === this.state.x) {
            let activeGuessRow = document.getElementsByClassName('active');
            if (activeGuessRow[0] !== undefined) {
                let acttiveGuessElements = activeGuessRow[0].getElementsByTagName('div');
                let activeAnswerRow = document.getElementsByClassName('check');
                let activeAnswerElements = activeAnswerRow[0].getElementsByClassName('checkdiv');

                for (let elements of acttiveGuessElements) {
                    let wordsClass = elements.className;
                    this.guessNiz.push(parseInt(wordsClass.slice(14)))
                }
                for (let i = 0; i < this.state.x; i++) {
                    if (this.genNiz[i] === this.guessNiz[i]) {
                        activeAnswerElements[0].classList.add('best')
                        activeAnswerElements[0].classList.remove('checkdiv')
                        this.genNiz[i] = 0;
                        this.guessNiz[i] = -1;
                        this.rightGuesses += 1;
                        if (this.rightGuesses === this.state.x) {
                            for (let j = 1; j < (this.state.y - this.flag); j++) {
                                activeGuessRow[0].classList.remove('active')
                            }
                            alert("YOU WON");
                        }
                    }
                }
                for (let i = 0; i < this.state.x; i++) {
                    if (this.genNiz.includes(this.guessNiz[i])) {
                        activeAnswerElements[0].classList.add('good');
                        activeAnswerElements[0].classList.remove('checkdiv')
                        let index = this.genNiz.indexOf(this.guessNiz[i]);
                        this.genNiz[index] = 0;
                    }
                }
                activeGuessRow[0].classList.remove('active');
                activeAnswerRow[0].classList.remove('check');
                this.guesses = 0;
                this.rightGuesses = 0;
                this.guessNiz = [];
                this.genNiz = this.genNizCopy.slice(0);
                this.flag += 1;
            }
        }
    }
    render() {
        let divTimer = { height: 58 * this.state.y }
        let contWidth = { width: 200 + this.state.x * 111 }
        let squares = this.drawSquare();
        let circles = this.drawCircle();
        let upit = this.drawUpit();
        let znak = this.state.znakovi.map((e) => <li><div onClick={this.addZnak} id={e} className="emptySlot"></div></li>)
        return (
            <div id="container" style={contWidth}>
                <div className="iblock">
                    <ul type="none">
                        {squares}
                    </ul>
                </div>
                <div className="iblock">
                    <div id="timer" style={divTimer}></div>
                </div>
                <div className="iblock">
                    <ul type="none">
                        {circles}
                    </ul>
                </div>
                <div className="iblock">
                    <ul type="none">
                        {znak}
                    </ul>
                </div>
                <div className="iblock">
                    <ul type="none">
                        <li>
                            {upit}
                        </li>
                    </ul>
                    <input id="ng" onClick={this.getInitialState.bind(this)} type="button" value="New Game" />
                    <input id="start" onClick={this.matrica.bind(this)} type="button" value="Start" />
                    <input id="pot" onClick={this.pot.bind(this)} type="button" value="Potvrda" />
                    <label>X:<input id="x" ref={this.inputX} type="text" /></label>
                    <label>Y:<input id="y" ref={this.inputY} type="text" /></label>
                </div>
            </div>
        )
    }
}

export default Test;

