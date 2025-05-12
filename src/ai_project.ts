// ai_project.ts

import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import readline from "readline";
import { printHeader } from "./header";

// Load environment variables
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from .env
});
const openai = new OpenAIApi(configuration);

type Board = string[][];

function printBoard(board: Board): void {
  console.log("\n");
  board.forEach((row) => console.log(row.join(" | ")));
  console.log("\n");
}

function checkWinner(board: Board): string | null {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line.every((cell) => cell === "X")) return "Player";
    if (line.every((cell) => cell === "O")) return "Computer";
  }

  return board.flat().includes(" ") ? null : "Draw";
}

async function computerMove(board: Board): Promise<[number, number]> {
  const prompt = `
You are playing Tic Tac Toe as "O". The current board is:
${board.map((row) => row.join(" ")).join("\n")}
Respond with the row and column (0-indexed) of your next move in the format "row,column".
    `;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 10,
    temperature: 0.7,
  });

  const move = response.data.choices[0].text?.trim();
  if (move) {
    const [row, col] = move.split(",").map(Number);
    if (!isNaN(row) && !isNaN(col) && board[row][col] === " ") {
      return [row, col];
    }
  }
  throw new Error("Invalid move from AI");
}

async function main() {
  printHeader();
  console.log("Welcome to Tic Tac Toe!");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (query: string): Promise<string> =>
    new Promise((resolve) => rl.question(query, resolve));

  const board: Board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  let currentPlayer = "Player";

  try {
    while (true) {
      printBoard(board);
      const winner = checkWinner(board);
      if (winner) {
        console.log(winner === "Draw" ? "It's a draw!" : `${winner} wins!`);
        break;
      }

      if (currentPlayer === "Player") {
        const move = await askQuestion("Enter your move (row,column): ");
        const [row, col] = move.split(",").map(Number);
        if (
          !isNaN(row) &&
          !isNaN(col) &&
          row >= 0 &&
          row < 3 &&
          col >= 0 &&
          col < 3 &&
          board[row][col] === " "
        ) {
          board[row][col] = "X";
          currentPlayer = "Computer";
        } else {
          console.log("Invalid move. Try again.");
        }
      } else {
        try {
          const [row, col] = await computerMove(board);
          board[row][col] = "O";
          currentPlayer = "Player";
        } catch (error) {
          console.log("Error with AI move:", error.message);
          break;
        }
      }
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    rl.close();
  }
}

main();
