import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import EvolutionUtilities from "./EvolutionUtilities";

// test('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test("generated population size the same", () => {
  let population = EvolutionUtilities.generatePopulation(10, 10);
  expect(population.length).toEqual(10);
  expect(population[0].length).toEqual(10);
});

test("generated individual correct size", () => {
  let size = 5;
  let genome = EvolutionUtilities.generateIndividual(size);
  expect(genome.length).toEqual(size);
});

test("generated individual 0 size errors", () => {
  let size = 0;
  expect(() => {
    EvolutionUtilities.generateIndividual(size)
  }).toThrow();
});

test("generated individual -1 size errors", () => {
  let size = -1;
  expect(() => {
    EvolutionUtilities.generateIndividual(size)
  }).toThrow();
});

test("generated individual 1000 size errors", () => {
  let size = 1000;
  expect(() => {
    EvolutionUtilities.generateIndividual(size)
  }).toThrow();
});


