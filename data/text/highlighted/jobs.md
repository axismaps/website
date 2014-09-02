# Geography of Jobs

## Overview
The Geography of Jobs map is a dynamic visualization of job gains and losses over the last 15+ years for every metro area in the U.S. The red and blue bubbles represent a rolling 12-month net change in total employment for each metro area. It is a redesign of an existing map—now built in D3 instead of Flash—that focuses on speed and a polished user experience.

## Data
This map runs off of a single CSV file loaded at run-time. This allows TIP Strategies staff to easily update the map using spreadsheet software as well as run it offline during conference presentations. Since the source data was already based on US Census geographies, it was very easy to move from implicit geography in the spreadsheet to explicit longitude / latitude coordinates used by the map.

## Design
As this map was a redesign, it allowed us to focus on the details of the user experience. We focused on the timeline, making sure it met user expectations through dragging and clicking. A small data-probe appears when mousing over the timeline that allows users to jump to a precise month. We even used a fixed-width font for the date display to avoid the distraction of slight resizing to the date text.

## Code
This map was rewritten from scratch using D3. It handles everything from parsing the TopoJSON geography and the CSV attribute data to building the slider control using the D3.slider plugin, to handling the animated symbol transitions.