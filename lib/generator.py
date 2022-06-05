"""
Grid generator
"""

import numpy as np
import random as rd
import json
from lib.solver import SudokuSolver
from tqdm import tqdm
from typing import List, Optional


class SudokuGenerator:
    """
    Sudoku generator
    """

    __slots__ = "_grid", "_solver", "_solution"

    def __init__(self):
        self._grid = np.zeros((9, 9))
        self._solution = np.zeros((9, 9))
        self._solver: Optional[SudokuSolver] = None

    @property
    def grid(self) -> np.ndarray:
        """
        Return the grid
        """
        return self._grid.copy()

    @property
    def solution(self) -> np.ndarray:
        """
        Return the solution
        """
        return self._solution.copy()

    ##### GENERATION #####
    def generate(self, nb_cells: int = 50, nb_generation: int = 1, save: bool = False ) -> dict:
        """
        Generate a new grid with n filled
        Main steps:
         * Generate framework (structure)
         * Solve with solver
         * Remove cells randomly until n are filled

        :param nb_cells:
        :type nb_cells: int
        :param nb_generation:
        :type nb_generation: int
        :param save:
        :type save: bool
        :return:
        """
        data = dict()

        ### Generation ###
        print("\nGeneration")
        for k in tqdm(range(nb_generation)):
            data[f"{k}"] = dict()
            data[f"{k}"]["Grid"] = dict()
            data[f"{k}"]["Solution"] = dict()

            # Generate full grid
            self._generate_framework(nb_cells = 10)
            self._solver = SudokuSolver(self._grid)
            self._grid = np.array(self._solver.solve())

            # If there is no solution
            while self._grid.__str__() == "None":
                self._generate_framework(nb_cells = 10)
                self._solver = SudokuSolver(self._grid)
                self._grid = np.array(self._solver.solve())
            self._solution = self._grid.copy()




            # Remove cells
            cell_filled = 81
            while cell_filled > nb_cells:
                row = rd.randint(0, 8)
                col = rd.randint(0, 8)

                if self._grid[row, col] != 0:
                    self._grid[row, col] = 0
                    cell_filled -= 1



            # Reload if check fails
            if not self._check_grid():
                self.generate(nb_cells, nb_generation = 1)
            else:
                data[f"{k}"]["Grid"] = self.convert_structure(self._grid.copy())
                data[f"{k}"]["Solution"] = self.convert_structure(self._solution.copy())

        ### Save ###
        if save:
            with open(f"{nb_cells}-cells_{nb_generation}-generation.json", "w") as f:
                json.dump(data, f)
        return data

    def _possibilities(self, row, col) -> List[int]:
        """
        Return the possible values for a cell
        """
        # If the cell is already filled, return an empty list
        if self._grid[row, col] != 0:
            return []

        # Set of bloc
        set_block = set(self._grid[row // 3 * 3:row // 3 * 3 + 3, col // 3 * 3:col // 3 * 3 + 3].flatten())

        # List of possible values
        return list(set(range(1, 10)) - set(self._grid[row, :]) - set(self._grid[:, col]) - set_block)

    def _generate_framework(self, nb_cells: int = 10) -> None:
        """
        Generate a new random structure for the solver
        :param nb_cells:
        :return:
        """
        if nb_cells > 81 or nb_cells < 0:
            raise ValueError("Number of cells must be between 0 and 81")

        # Generate an empty grid
        self._grid = np.zeros((9, 9))

        # Grid of possibilities
        grid_possibilities = np.zeros((9, 9))

        cells = 0
        while cells < nb_cells:
            # Update the grid of possibilities
            for row in range(9):
                for col in range(9):
                    grid_possibilities[row, col] = len(self._possibilities(row, col))

            # block selection
            row = rd.randint(0, 8)
            col = rd.randint(0, 8)
            block = grid_possibilities[row // 3 * 3:row // 3 * 3 + 3, col // 3 * 3:col // 3 * 3 + 3].copy().flatten()

            while np.sum(block) == 0:
                row = rd.randint(0, 8)
                col = rd.randint(0, 8)
                block = grid_possibilities[row // 3 * 3:row // 3 * 3 + 3,
                        col // 3 * 3:col // 3 * 3 + 3].copy().flatten()

            # Reach minimum number of possibilities
            choice = rd.choice(range(9))
            row = row // 3 * 3 + choice // 3
            col = col // 3 * 3 + choice % 3

            try:
                self._grid[row, col] = rd.choice(self._possibilities(row, col))
            except IndexError:
                continue
            else:
                cells += 1

    def _check_grid(self) -> bool:
        """
        Check if the grid is valid
        :return:
        """
        # Check each cells
        for row in range(9):
            for col in range(9):
                if self._grid[row, col] == 0:
                    continue

                # sets
                list_row = list(self._grid[row, :])
                list_col = list(self._grid[:, col])
                list_block = list(self._grid[row // 3 * 3:row // 3 * 3 + 3, col // 3 * 3:col // 3 * 3 + 3].flatten())
                if self._grid[row, col] in list_row[:col] + list_row[col + 1:]:
                    return False
                if self._grid[row, col] in list_col[:row] + list_col[row + 1:]:
                    return False
                if np.sum(self._grid[row // 3 * 3:row // 3 * 3 + 3, col // 3 * 3:col // 3 * 3 + 3].flatten() ==
                          self._grid[row, col]) != 1:
                    return False

        for s in range(9):
            if s not in self._grid:
                # print(f"Check failled: {s} not in grid")
                return False
        return True

    ##### ---------- #####
    @staticmethod
    def convert_structure(grid: np.ndarray) -> List[List[List[int]]]:
        """
        Convert the grid into a structure on block for JavaScript
        :return: np.ndarray
        """
        res = []

        for row in range(3):
            for col in range(3):
                res.append(grid[row * 3:row * 3 + 3, col * 3:col * 3 + 3].tolist())

        return res

    def print_grid_and_solution(self) -> None:

        print("\nGRID " + '~'*50)
        print(self._grid)
        print("\nSOLUTION " + '~'*50)
        print(np.array(self._solver.solve()))


if __name__ == "__main__":
    sdk = SudokuGenerator()
    sdk.generate(50, 500, True)
    # print(sdk.convert_structure(sdk.grid))
    # print(sdk.convert_structure(sdk.solution))
    # sdk.print_grid_and_solution()
