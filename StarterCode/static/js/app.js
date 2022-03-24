//Create dropdown menu
function optionChanged(sample_id) {
  demo_table(sample_id);
  console.log(sample_id);
  chart(sample_id);
}

function dropdown() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then(function (data) {
    var id_names = data.names;
    id_names.forEach((id) => {
      dropdownMenu.append("option").text(id).property("value", id);
    });
    demo_table(id_names[0]);
    chart(id_names[0])
  });
}
dropdown();

//Create the Demographic Table
function demo_table(filter_id) {
  var table_menu = d3.select("#sample-metadata");
  table_menu.html("");
  d3.json("samples.json").then(function (data) {
    var metadata_pull = data.metadata;
    var filter_data = metadata_pull.filter((elem) => elem.id == filter_id);
    console.log(filter_data);
    Object.entries(filter_data[0]).forEach(([key, value]) => {
      table_menu.append("h6").text(`${key}: ${value}`);
    });
  });
}

//Create chart function for both the bar and bubble graph
//Filter data like the demo_table data.samples . Filtering for sample id  to match the filter id
function chart(filter_id) {
  d3.json("samples.json").then(function (data) {
    var samples_pull = data.samples;
    var samples_data = samples_pull.filter((elem) => elem.id == filter_id);
    var metadata_pull = data.metadata;
    var filter_data = metadata_pull.filter((elem) => elem.id == filter_id);

    //Extract data for the x & y values of the bar chart
    var result = samples_data[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //Get the top 10 otu_ids = y values
    var top_10 = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var data = [
      {
        type: "bar",
        y: top_10,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        orientation: "h",
      },
    ];

    //Create layout for bar chart
    var barLayout = {
      title: "Top 10 OTUs Found",
      margin: { t: 30, l: 150 }
    };
      

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", data, barLayout);

    //Create bubble chart
    //Extract data for the x & y values of the bar chart
    var result = samples_data[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //Create trace for bubble chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: [40, 60, 80, 100],
      },
    };

    var data = [trace1];

    var layout = {
      title: "Marker Size",
      showlegend: false,
      height: 600,
      width: 600,
    };

    Plotly.newPlot("bubble", data, layout);
  });
}
