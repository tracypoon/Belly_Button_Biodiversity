// Fetch the JSON data and console log it
// d3.json("samples.json").then(function(data1) {
//     console.log(data1);
//   });

//Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

//Create dropdown menu
function optionChanged(sampleid){
  console.log(sampleid)
}
function dropdown() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then(function(data) {
      var id_names = data.names;
      id_names.forEach((id) => {
          dropdownMenu.append("option").text(id).property("value",id)
      });
      //bar_chart ();
      //bubble_chart ();
      //demo_table ();
    });
}
dropdown()

//Create the Demographic Table
function demo_table (filter_id) {
  var tablemenu = d3.select("#sample-metadata");
  d3.json("samples.json").then(function(data) {
      var metadatapull = data.metadata;
      var filter_data = metadatapull.filter(elem => elem.id==filter_id)
      id_names.forEach((id) => {
        dropdownMenu.append("option").text(id).property("value",id)


        
    });

//{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0},

      metadatapull.filter((id) => {
          tablemenu.append("option").text(id).property("value",id)
      });
      //bar_chart ();
      //bubble_chart ();
      //demo_table ();
    });
}




//Create bar chart


// var data = [{
//   type: 'bar',
//   x: [20, 14, 23],
//   y: ['giraffes', 'orangutans', 'monkeys'],
//   orientation: 'h'
// }];

// Plotly.newPlot('myDiv', data);













// let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"]

// let timesRead = [100, 50, 25]

// let trace1 = {
//   x: timesReads,
//   y: books,
//   type: 'bar',
//   orientation: 'h'
// };

// let data = [trace1];

// let layout = {
//   title: title
// };

// Plotly.newPlot("plot", data, layout);