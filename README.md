<<<<<<< HEAD
# aiProject
playing with ai
=======
# Tic Tac Toe Game

This project is a simple implementation of the classic Tic Tac Toe game using TypeScript and the OpenAI API. The game allows a player to compete against a computer opponent.

## Files

- **src/ai_project.ts**: Contains the main logic for the Tic Tac Toe game, including game setup, checking for a winner, and handling player and computer moves.
- **src/header.ts**: Exports a function to print a header for the game, providing title and instructions for players.
- **tsconfig.json**: TypeScript configuration file that specifies compiler options and files to include in the compilation.
- **package.json**: npm configuration file that lists dependencies and scripts for the project.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd aiProject
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set your OpenAI API key in `src/ai_project.ts`:
   ```typescript
   const configuration = new Configuration({
       apiKey: "your-api-key-here",
   });
   ```

5. Run the game:
   ```
   npm start
   ```

## Game Rules

- The game is played on a 3x3 grid.
- Players take turns placing their marks (X for the player and O for the computer) in empty squares.
- The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins the game.
- If all squares are filled and no player has three in a row, the game is a draw.
>>>>>>> 061074c (Initial commit for Tic Tac Toe AI project)
