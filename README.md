# Lab 2

## Learning Objectives

- More practice using external data in a Vue application
- Practice using an external charting library
- Practice restructuring data to your requirements
- Practice working with dates in JavaScript

## Brief / MVP

The "energy mix" is the mixture of energy sources that the UK derives its energy from at any given time. For example:

```
Hydro: 25%
Nuclear: 18%
Wind: 40%
```

And so on.

You have been asked to display information relating to the UK's energy mix, using the National Grid's API:

https://carbon-intensity.github.io/api-definitions/#get-generation

https://api.carbonintensity.org.uk/generation


Set up a Vue application that will display this information, and the relevant times in a suitable format.

## Extension

Use the provided startpoint to integrate your data using the [Vue Google Charts](https://www.npmjs.com/package/vue-google-charts) library.

Use something like the following in your template to display a chart:

```
<GChart
  v-if="generationMix"
  type="ColumnChart"
  :data="generationMix"
/>
```

The issue you will face is that your data should look like this:

```
generationMix: [
  ["Fuel", "Percentage"],
  ["Nuclear", 20.4],
  ["Hydro", 18.9],
  ...
]
```

...But the API provides it in a very different format. You will have to re-shape the data to meet your needs.

### Advanced Extensions

Choose some or all of these:

- Allow the user to select the start and finish times using [this endpoint](https://carbon-intensity.github.io/api-definitions/?shell#get-generation-from-to)
- Investigate other types of chart - perhaps a pie chart?
- Graph out any other data you are interested in from the API
