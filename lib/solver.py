"""
Solver du sudoku
"""

from docplex.cp.model import CpoModel
import numpy as np
from typing import List, Union, Optional
import random as rd
from time import sleep, time


class SudokuSolver:
    """
    Sudoku solver
    """

    def __init__(self, instance: np.ndarray):
        """
        Constructor
        """

        # Model
        self._model: Optional[CpoModel] = None
        self.n = 9
        self.grid = np.array([])
        self.solution: Optional[List[List[int]]] = None

        # Instance
        self.instance = instance

    def create_model(self) -> None:
        """
        Model creation
        """
        # Definition
        self._model = CpoModel()

        ### Variables
        self.grid = np.array([[self._model.integer_var(1, self.n, f"x_{i}{j}") for j in range(self.n)]
                              for i in range(self.n)])

        ### Constraints
        # On lines & columns
        for i in range(self.n):
            self._model.add(self._model.all_diff(self.grid[i, j] for j in range(self.n)))
            self._model.add(self._model.all_diff(self.grid[j, i] for j in range(self.n)))

        # On squares
        for square_row in range(0, self.n, 3):
            for square_column in range(0, self.n, 3):
                self._model.add(self._model.all_diff(
                    self.grid[square_row + i, square_column + j] for j in range(3) for i in range(3)))

        # On instance
        for i in range(self.n):
            for j in range(self.n):
                if self.instance[i, j] != 0:
                    self._model.add(self.grid[i, j] == self.instance[i, j])

    ###### SOLVERS ################################################################################
    def solve(self) -> List[List[int]]:
        """
        Structure le solve
        """
        self.create_model()
        model_solutions = self._model.solve(SearchType = 'Auto', TimeLimit = 60, LogVerbosity = 'Quiet')
        if model_solutions:
            self.solution = [[model_solutions.get_value(f"x_{i}{j}") for j in range(self.n)] for i
                             in range(self.n)]
            return self.solution




if __name__ == "__main__":
    # solver = SudokuSolver()
    # solver.create_model()
    # solution = solver.solve()

    pass