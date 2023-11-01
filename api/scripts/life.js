// Get the user input randomization for the game
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const aliveChanceInput = document.getElementById('aliveChance');
const intervalInput = document.getElementById('interval');

// Get the life cycle counter 
const lifeCycleCounter = document.getElementById('lifeCycleCounter');

// Get button elements
const randomizeButton = document.getElementById('randomizeButton');
const clearButton = document.getElementById('clearButton');
const resetButton = document.getElementById('resetButton');

// Define the size of the grid
let rows = parseInt(rowsInput.value);
let cols = parseInt(colsInput.value);

// Create a 2D array for the grid
let grid = createEmptyGrid();

// Create a copy of the grid two cycles ago
let oldGrid1 = createEmptyGrid();
let oldGrid2 = createEmptyGrid();

// Initalize the grid
buildGrid();

// Run the game
// Set the cycle count to 0 for a counter
let lifeCycle = 0;
// set the update delay timeframe of the cycles
let intervalId = setInterval(UpdateandBuildGrid, getIntervalValue());

// Add event listeners for buttons and user entry
randomizeButton.addEventListener('click', randomizeGrid);
clearButton.addEventListener('click', clearGrid);
resetButton.addEventListener('click', resetGame);
rowsInput.addEventListener('input', handleSizeChange);
colsInput.addEventListener('input', handleSizeChange);
aliveChanceInput.addEventListener('input', handleAliveChanceChange);
intervalInput.addEventListener('input', handleIntervalChange);

//used for fetching data
const urlList = "https://pokeapi.co/api/v2/pokemon";

// array to hold the images as pulling from the api was very repetative wasting multiple calls and was too slow for the cycle referesh time
const imageStorage = [];
// array of the cell images as to keep the same image if the cell did not die
let cellImages = createEmptyGrid();

// Load the Pokemon images from the pokeapi
async function loadImages()
{
  // retreive data list from the pokeapi for many pokemon
  const response = await fetch(urlList);
  if (response.ok) 
  {
    const data = await response.json();
    const pokemonList = data.results;
    console.log(pokemonList);
    // run through the pokemon list 
    for (let i = 0; i < pokemonList.length; i++) 
    {
      // get the specific pokemon information
      const response2 = await fetch(pokemonList[i].url);
      if (response2.ok) 
      {
        // get the image information for the specific pokemon
        const pokemonData = await response2.json();
        console.log(pokemonData);
        const image = new Image();
        image.src = pokemonData.sprites.front_default;
        image.alt = `Image of ${pokemonData.name}`;
        // append the image to the array
        imageStorage.push(image);
      }
    }
  }
}

loadImages();
// Select a random pokemon from the array 
function getRandomPokemon() 
{
  const randomIndex = Math.floor(Math.random() * imageStorage.length);
  return imageStorage[randomIndex];
}

// Create an empty grid
function createEmptyGrid()
{
  const grid = new Array(rows);
  for (let i = 0; i < rows; i++) 
  {
    grid[i] = new Array(cols).fill(false);
  }
  return grid;
}

// Set the state of a cell
function setCellState(row, col, alive) 
{
  grid[row][col] = alive;
}

// Update and build the grid
function UpdateandBuildGrid() 
{

  oldGrid2 = [...oldGrid1.map((row) => [...row])]; // Update oldGrid2 with the previous oldGrid1 state
  oldGrid1 = [...grid.map((row) => [...row])]; // Update oldGrid1 with the previous grid state
  updateGrid();
  buildGrid();
  lifeCycleCounter.textContent = `Life Cycle: ${lifeCycle++}`;
  
  // Check if the grid has no changes for 2 cycles to end the game process
  if (!hasGridChanged() && lifeCycle > 2) 
  {
    clearInterval(intervalId);
    console.log('No changes. Game stopped.');
  }
}

// Update the grid
function updateGrid() 
{
  const newGrid = createEmptyGrid();
  const newCellImages = createEmptyGrid(); // store the new cell images
  let hasChanges = false;

  for (let row = 0; row < rows; row++) 
  {
    for (let col = 0; col < cols; col++) 
    {
      const aliveNeighbors = countAliveNeighbors(row, col);
      const isAlive = grid[row][col];
      let newState = isAlive;

      if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) 
      {
        newState = false; // cell dies  because of under or over population
      } else if (!isAlive && aliveNeighbors === 3) 
      {
        newState = true;  // cell is boarn because of perfect reproduction group
      }

      if (newState !== isAlive) 
      {
        hasChanges = true; // state change to see if the game has ended or not
      }

      newGrid[row][col] = newState;

      if(isAlive && newState)
      {
        newCellImages[row][col] = cellImages[row][col];
      }
    }
  }

  grid = newGrid;
  cellImages = newCellImages; // update the cell images array so that we can compare for alive status to keep the same image

  if (!hasChanges)
  {
    clearInterval(intervalId);
    console.log('No changes. Game stopped.');
  }
}

// Count the number of alive neighbors next to a cell
function countAliveNeighbors(row, col) 
{
  let count = 0; // counter for neighbors that are alive
  const offsets = [-1, 0, 1]; // offset for neighbor cell checking
  for (let i of offsets) 
  {
    for (let j of offsets) 
    {
      if (i === 0 && j === 0) continue; // do not proces the current cell 
      const newRow = (row + i + rows) % rows; // grid wrap
      const newCol = (col + j + cols) % cols; // grid wrap
      if (grid[newRow][newCol]) count++; // if alive add to counter
    }
  }
  return count;
}

// Draw the grid
function buildGrid() 
{
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = ''; // Clear previous content
  for (let row = 0; row < rows; row++) 
  {
    for (let col = 0; col < cols; col++) 
    {
      const isAlive = grid[row][col]; // check to see if the cell is alive
      const cellContent = isAlive ? createPokemonImage(row, col) : document.createTextNode(' ');
      gridContainer.appendChild(cellContent);
    }
    const lineBreak = document.createElement('br');
    gridContainer.appendChild(lineBreak);
  }
}
// get the Pokemon image and build an element
function createPokemonImage(row, col) 
{
  if(cellImages[row][col])
  {
    // return the existing cell image if it already exist
    return cellImages[row][col];
  }
  const pokemonImage = getRandomPokemon();
  if (pokemonImage) 
  {
    const imageElement = document.createElement('img');
    imageElement.src = pokemonImage.src;
    imageElement.alt = pokemonImage.alt;
    cellImages[row][col] = imageElement;
    return imageElement; // if image located
  }
  return ''; // if no image fount 
}

// Randomize the grid
function randomizeGrid() 
{
  clearGrid();
  const aliveChance = parseInt(aliveChanceInput.value) / 100;
  for (let row = 0; row < rows; row++) 
  {
    for (let col = 0; col < cols; col++) 
    {
      const alive = Math.random() < aliveChance;
      setCellState(row, col, alive);
      // Reset the cell image to empty if the cell is not alive
      if (!alive) 
      {
        cellImages[row][col] = '';
      }
    }
  }
  buildGrid();
}

// Clear the grid
function clearGrid() 
{
  lifeCycle = 0;
  grid = createEmptyGrid();
  cellImages = createEmptyGrid(); // clear the cell images array
  buildGrid();
}

// Reset the game
function resetGame() 
{
  clearInterval(intervalId);
  intervalId = setInterval(UpdateandBuildGrid, getIntervalValue());
}

// if the size of the grid changes reset the game
function handleSizeChange() 
{
  rows = parseInt(rowsInput.value);
  cols = parseInt(colsInput.value);
  clearGrid();
}

// alive chance change reset the grid
function handleAliveChanceChange()
{
  randomizeGrid();
}

// Handle interval change  by speeding it up or slowing it down
function handleIntervalChange() 
{
  clearInterval(intervalId);
  intervalId = setInterval(UpdateandBuildGrid, getIntervalValue());
}

// Get the interval value for refresh
function getIntervalValue() 
{
  const minInterval = 100;
  const maxInterval = 5000;
  const customInterval = parseInt(intervalInput.value);
  return isNaN(customInterval) || customInterval < minInterval || customInterval > maxInterval
    ? 1000 // Default interval
    : customInterval;
}

// Check to see if the grid has changed to determin if the game should end
function hasGridChanged()
{
  for (let row = 0; row < rows; row++) 
  {
    for (let col = 0; col < cols; col++) 
    {
      if (grid[row][col] !== oldGrid2[row][col]) 
      {
        return true;
      }
    }
  }
  return false;
}
