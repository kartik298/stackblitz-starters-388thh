import React from 'react';
import './style.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
const width = 8;
const candyColours = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];
const App = () => {
  const [currentColour, setCurrentColour] = useState([]);
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < width * width; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];
      board.push(randomColour);
    }
    console.log(board);
    setCurrentColour(board);
    console.log(currentColour);
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColour[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColours.length);
        currentColour[i] = candyColours[randomNumber];
      }

      if (currentColour[i + width] === '') {
        currentColour[i + width] = currentColour[i];
        currentColour[i] = '';
      }
    }
  };
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColour[i];

      if (
        columnOfFour.every((square) => currentColour[square] === decidedColor)
      ) {
        columnOfFour.forEach((square) => (currentColour[square] = ''));
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColour[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (rowOfFour.every((square) => currentColour[square] === decidedColor)) {
        rowOfFour.forEach((square) => (currentColour[square] = ''));
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColour[i];

      if (
        columnOfThree.every((square) => currentColour[square] === decidedColor)
      ) {
        columnOfThree.forEach((square) => (currentColour[square] = ''));
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColour[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every((square) => currentColour[square] === decidedColor)
      ) {
        rowOfThree.forEach((square) => (currentColour[square] = ''));
      }
    }
  };
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColour([...currentColour]);
    }, 1000);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColour,
  ]);

  return (
    <motion.div className="app">
      <motion.div className="game">
        {currentColour.map((candycolour, index) => (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
              scale: 1.3,
              rotate: 180,
              transition: { duration: 1 },
            }}
            key={index}
            style={{ backgroundColor: candycolour }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default App;
