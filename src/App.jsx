
import './App.css'
import Board from './Board'
import { useState } from 'react'

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Other diagonal
  ];

  for (let [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // returns "X" or "O"
    }
  }
  return null; // no winner  yet
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext,setXisNext] = useState(true);
   const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(square => square !== "");


  function handleClick(i) {
    if (squares[i] )return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);

    setXisNext(!xIsNext)
  }

   function resetGame() {
    setSquares(Array(9).fill("")); // clear board
    setXisNext(true);              // reset turn to X
  }

  return (
    <>
      <div className="app">
        <h1 className="title">Tic Tac Toe</h1>
        <h2 className="subtitle">Play with your friends</h2>
           {winner ? (
        <p className="subtitle">🎉 Player {winner} Wins!</p>
      ) : isDraw ? (
        <p className="subtitle">🤝 It’s a Draw!</p>
      ) : (
        <p className="subtitle">
          {xIsNext ? "Player X's Turn" : "Player O's Turn"}
        </p>
      )}
        <Board squares={squares} onSquareClick={handleClick} />
         {(winner || isDraw) && (
        <button onClick={resetGame} className="restart-btn">
          Restart Game
        </button>
      )}
      </div>
    </>
  )
}

export default App
