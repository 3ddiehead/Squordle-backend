/*
 * DisplayMan.js
*/

import classes from "./style/DisplayMan.module.css";

import WinLoseDisplay from "./WinLoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";   
import SettingsDisplay from "./SettingsDisplay.js";
import ShopDisplay from "./ShopDisplay.js";

import { ReactComponent as ShopIcon } from "../assets/shopIcon.svg";
import { ReactComponent as InfoIcon } from "../assets/infoIcon.svg";
import { ReactComponent as SettingsIcon } from "../assets/settingsIcon.svg";
import { useState, useEffect } from 'react';

function Backdrop() 
{
    return <div className = {classes.backdrop}/>
}

function DisplayMan(props)
{
	const [displayState, setDisplayState] = 
           useState({"showShop": false,
                     "showSettings": false,
                     "showInfo": false,
                     "showWinLose": false,
                     "showBackdrop": false});

    if (window.localStorage.firstTime === "1") {
        window.localStorage.firstTime = 0;
        infoHandler();
    }

    function winLoseHandler()
    {   
        setDisplayState({...displayState, 
                         "showWinLose": true,
                         "showBackdrop": true});
    }

  	function shopHandler()
    {
  		setDisplayState({...displayState,
                         "showShop": !displayState["showShop"],
                         "showBackdrop": !displayState["showBackdrop"]});
  	}

  	function settingsHandler()
    {
  		setDisplayState({...displayState,
                         "showSettings": !displayState["showSettings"],
                         "showBackdrop": !displayState["showBackdrop"]});
  	}

	function infoHandler()
    {
        setDisplayState({...displayState, 
                         "showInfo": !displayState["showInfo"],
                         "showBackdrop": !displayState["showBackdrop"]});
  	}

	function reload()
    {
		setDisplayState({"showInfo": false,
                         "showWinLose": false,
                         "showBackdrop": false});
        props.setGameOver([false, '']);
    }

    return (
        <div className = {classes.center}>
            <header className = {classes.menuBar}>
                <div className = {classes.pHeader}>
                    <img src = {require("../assets/pokedollarLight.png")}/>
                    {" "}{props.pokeDollars}
                </div>

                <div className = {classes.gameTitle}>
                    <img src = {require("../assets/LogoLight.png")}/>
                </div>

                <div className = {classes.icon}>
                    <button onClick = {shopHandler}>
                        <ShopIcon className = {classes.shopIcon}/>
                    </button>
                    <button onClick = {settingsHandler}>
                        <SettingsIcon className = {classes.settingsIcon}/>
                    </button>
                    <button onClick = {infoHandler}>
                        <InfoIcon className = {classes.infoIcon}/>
                    </button>
                </div>

                {displayState["showBackdrop"] && <Backdrop/>}

                {displayState["showShop"] && 
                    <ShopDisplay dollarHandler = {props.dollarHandler} 
                                 shopHandler = {shopHandler}/>}
                {displayState["showSettings"] && 
                    <SettingsDisplay settingsHandler = {settingsHandler}
                                     userHandler = {props.userHandler} />} 
                {displayState["showInfo"] && 
                    <InfoDisplay infoHandler = {infoHandler}/>}

                {props.isGameOver[0] && 
                    <WinLoseDisplay winLoseHandler = {winLoseHandler}
                                    pokeAnswer = {props.pokemon} 
                                    isGameOver = {props.isGameOver}
                                    reload = {reload} />}
            </header>
        </div>
    )
}

export default DisplayMan;
