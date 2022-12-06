import React, { useState, useEffect} from 'react';
import './Game.css';

function Game() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);

  const [jogadorAtual, setJogadorAtual] = useState("O"); 
  const [ganhador, setGanhador] = useState(null);

  const quandoClicar = (index) => {
    if (ganhador) {
      console.log("Jogo finalizado");
      return null;
    }

    if (board[index] !== "") {
      console.log("Posição ocupado");
      return null;
    }

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item)
    );

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  }

  const verificarGanhador = () => {
    const formasDeGanho = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    formasDeGanho.forEach(cells => {
      if (cells.every(cell => cell === "O")) setGanhador("O");
      if (cells.every(cell => cell === "X")) setGanhador("X");
    });

    
  }

  checarEmpate();
  function checarEmpate(){
    if (board.every(item => item !== "" && ganhador === null)) return setGanhador("E")
  }

  
  useEffect(verificarGanhador, [board]);

  const resetJogo = () => {
    setJogadorAtual("0");
    setBoard(emptyBoard);
    setGanhador(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${ganhador ? "game-over" : ""}`}>
        {board.map((item, index) => ( 
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => quandoClicar(index)}
          >
            {item}
          </div>
        ))}
      </div>


      {ganhador &&
        <footer>
          {ganhador === "E" ?
            <h2 className="mensagem-Ganhador">
              <span className={ganhador}>Empatou!</span>
            </h2>
          :
            <h2 className="mensagem-Ganhador">
              <span className={ganhador}>{ganhador}</span> venceu!
            </h2>
          }
          <button onClick={resetJogo}>Recomeçar jogo!</button>
        </footer>
      }
    </main>
  );
}

export default Game;
