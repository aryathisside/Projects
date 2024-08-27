``
use std::collections::LinkedList;
use piston_window::types::Color;
use piston_window::{Context, G2d};
use crate::draw::draw_block;
``

- _use std::collections::LinkedList;_ : Imports the LinkedList data structure from the standard library.
- _use piston_window::types::Color;_ : Imports the Color type from the piston_window crate, which is used for defining colors.
- _use piston_window::{Context, G2d};_ : Imports Context and G2d from piston_window. These are used for drawing graphics.
- _use crate::draw::draw_block;_ : Imports a draw_block function from a module named draw in your project. This function is presumably used to draw blocks on the screen.

`` const SNAKE_COLOR: Color = [0.00, 0.80, 0.00, 1.0]; ``

- _const SNAKE_COLOR:_ Color: Defines a constant color for the snake using RGBA values. This color will be used for rendering the snake.

```
#[derive(Clone, Debug)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

- _#[derive(Clone, Debug)]:_ Automatically implements the Clone and Debug traits for the Direction enum.
- _pub enum Direction:_ Defines an enumeration Direction with four possible values: Up, Down, Left, and Right.


```
impl Direction {
    pub fn opposite(&self) -> Direction {
        match *self {
            Direction::Up => Direction::Down,
            Direction::Down => Direction::Up,
            Direction::Left => Direction::Right,
            Direction::Right => Direction::Left,
        }
    }
}
```

- _impl Direction:_ Implements methods for the Direction enum.
- _pub fn opposite(&self) -> Direction:_ Defines a method that returns the opposite direction.
     > _match *self:_ Matches the current direction and returns its opposite.

```
#[derive(Clone, Debug)]
struct Block {
    x: i32,
    y: i32,
}

pub struct Snake {
    direction: Direction,
    body: LinkedList<Block>,
    tail: Option<Block>,
}

```
- _#[derive(Clone, Debug)]:_ Automatically implements Clone and Debug traits for the Block struct.
- _struct Block:_ Defines a struct Block that represents a position with x and y coordinates.

- _pub struct Snake:_ Defines a struct Snake to represent the snake in the game.
    > _direction: Direction:_ The current direction of the snake.
    > _body: LinkedList<Block>:_ The list of blocks making up the snake’s body.
    > _tail: Option<Block>:_ The last block of the snake, stored in case it needs to be restored.

```
impl Snake {
    pub fn new(x: i32, y: i32) -> Snake {
        let mut body: LinkedList<Block> = LinkedList::new();
        
        body.push_back(Block { x: x + 2, y });
        body.push_back(Block { x: x + 1, y });
        body.push_back(Block { x, y });

        Snake {
            direction: Direction::Right,
            body,
            tail: None,
        }
    }
```

- i_mpl Snake:_ Implements methods for the Snake struct.
- _pub fn new(x: i32, y: i32) -> Snake:_ Constructor to create a new Snake instance.
    > _let mut body:_ LinkedList<Block> = LinkedList::new();: Initializes an empty LinkedList for the snake's body.
    > _body.push_back(...):_ Adds initial blocks to the snake’s body.
    > _Snake { ... }:_ Creates and returns a new Snake instance with the initial direction and body.

```
    pub fn draw(&self, con: &Context, g: &mut G2d) {
        for block in &self.body {
            draw_block(SNAKE_COLOR, block.x, block.y, con, g);
        }
    }

    pub fn head_position(&self) -> (i32, i32) {
        let head_block = self.body.front().unwrap();
        (head_block.x, head_block.y)
    }

    pub fn move_forward(&mut self, dir: Option<Direction>) {
        match dir {
            Some(d) => self.direction = d,
            None => (),
        }
```

- _pub fn draw(&self, con: &Context, g: &mut G2d):_ Draws the snake on the screen.
    > _for block in &self.body:_ Iterates through each block in the snake’s body.
    > _draw_block(SNAKE_COLOR, block.x, block.y, con, g);:_ Uses draw_block to render each block.

- _pub fn head_position(&self) -> (i32, i32):_ Returns the coordinates of the snake's head.
    > _let head_block = self.body.front().unwrap();:_ Gets the front (head) block of the snake’s body.
    > _(head_block.x, head_block.y):_ Returns the position of the head block.

- _pub fn move_forward(&mut self, dir: Option<Direction>):_ Moves the snake forward in the current or specified direction.
    > _match dir { Some(d) => self.direction = d, None => (), }:_ Updates the snake’s direction if a new direction is provided.

```
let (last_x, last_y) = self.head_position();

let new_block = match self.direction {
    Direction::Up => Block {
        x: last_x,
        y: last_y - 1,
    },
    Direction::Down => Block {
        x: last_x,
        y: last_y + 1,
    },
    Direction::Left => Block {
        x: last_x - 1,
        y: last_y,
    },
    Direction::Right => Block {
        x: last_x + 1,
        y: last_y,
    },
};

    self.body.push_front(new_block);
    let removed_block = self.body.pop_back().unwrap();
    self.tail = Some(removed_block);
}


```

- _let (last_x, last_y) = self.head_position();:_ Gets the current head position.
- _let new_block = match self.direction { ... }:_ Determines the new position of the head block based on the current direction.
- _self.body.push_front(new_block);:_ Adds the new block to the front of the body (new head position).
- _let removed_block = self.body.pop_back().unwrap();:_ Removes the last block from the body (the tail).
- _self.tail = Some(removed_block);:_ Saves the removed block as the new tail.


```
    pub fn head_direction(&self) -> Direction {
        self.direction.clone()
    }

    pub fn next_head(&self, dir: Option<Direction>) -> (i32, i32) {
        let (head_x, head_y) = self.head_position();
    
        let moving_dir = match dir {
            Some(d) => d,
            None => self.direction.clone(),
        };
    
        match moving_dir {
            Direction::Up => (head_x, head_y - 1),
            Direction::Down => (head_x, head_y + 1),
            Direction::Left => (head_x - 1, head_y),
            Direction::Right => (head_x + 1, head_y),
        }
    }
    pub fn restore_tail(&mut self) {
        if let Some(blk) = self.tail.clone() {
            self.body.push_back(blk);
        }
    }

```

- _pub fn head_direction(&self) -> Direction:_ Returns a clone of the current direction of the snake.
- _pub fn next_head(&self, dir: Option<Direction>) -> (i32, i32):_ Calculates the position of the snake's head if it moves in a given direction.
    > _let moving_dir = match dir { ... }:_ Uses the provided direction if available; otherwise, uses the current direction.
    > _match moving_dir { ... }:_ Calculates the new head position based on the direction.


- _pub fn restore_tail(&mut self):_ Restores the last block of the snake to the body.
    > _if let Some(blk) = self.tail.clone():_ Clones the tail block if it exists.
    > _self.body.push_back(blk);:_ Adds the cloned block to the end of the body.

```
    pub fn overlap_tail(&self, x: i32, y: i32) -> bool {
        let mut ch = 0;
        for block in &self.body {
            if x == block.x && y == block.y {
                return true;
            }

            ch += 1;
            if ch == self.body.len() - 1 {
                break;
            }
        }
        false
    }
}
```

- _pub fn overlap_tail(&self, x: i32, y: i32) -> bool:_ Checks if a given coordinate overlaps with any part of the snake’s body.
    > let mut ch = 0;: Initializes a counter to keep track of the number of blocks checked.
    > for block in &self.body { ... }: Iterates through each block in the snake’s body.
    > if x == block.x && y == block.y: Checks if the given coordinates match the coordinates of a block.
    > ch += 1; if ch == self.body.len() - 1 { break; }: Stops checking if the end of the body is reached, excluding the head.
    > false: Returns false if no overlap is found.
