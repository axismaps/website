# Global Commodities Prices Visualization

## Overview
For Adam Matthew Digital's Global Commodities collection, we created this interactive visualization of commodity prices across the world through history. Users can compare prices of hundreds of different commodities in hundreds of markets and different time periods. Want to know how the price of ginger in the USA in 1817 compares to the price of copper in France in 1640? Now you can find out!

## Data
The visualization represents over 127,000 price values for 414 commodities across 245 markets over a span of about one thousand years. The price data, along with some information about each market and commodity, are stored in a database on the server. We wrote a simple API to allow us to retrieve data for specific combinations of commodity, market, and time span.

## Design
We fashioned this as a classic geovisualization, with coordinated displays that each reflect selections made in the others. To make sense of the thousands of data points, we designed a system with three primary modes: comparison of commodities, comparison of markets, and comparison of time periods. In each mode several selections can be made, which then update the map and charts. A desaturated interface helps the brightly colored selections show up clearly.

## Code
Most of this visualization was built around D3.js. D3's core data binding functions, along with its graphical capabilities, were ideal for these charts, which are constantly updated with new data values. Its support for geographic data furthermore was useful for the map component, allowing us to avoid yet another Mercator tiled map and instead use a more appropriately projected and simplified map for global and continental scales.