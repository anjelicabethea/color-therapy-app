var trash = document.getElementsByClassName('fa-trash');
//trash can assigned
const colors = document.querySelectorAll('.color');
 // inside the main.js "JSON"
 //color assigned
 //using bracket notation, what you click on will bring you to the object
const moods = {
  red: "angry",
  blue: "sad",
  green: "lucky",
  purple: "royal",
  yellow: "happy"
}
//loop throung the length of the array of buttons
for (let i = 0; i < colors.length; i++) {
      // add an event listener for the buttons
  colors[i].addEventListener('click', () => {
    //allows user to chose a color, classList, list of all properties object 1
    //key value pairs
    const userColor = colors[i].classList[1];
    //all the message input values and fills in the inpur. reasigning the value of the input to moods [userColor]
    document.querySelector('.messageInput').value = moods[userColor]
    // fetch request if you want to directly make post request for /messages endpoint
  })
}

//chart======

// var data= {
//   // A labels array that can contain any sort of values
//   labels: ['mon','tues','weds','thurs','fri'],
//   // Our series array that contains series objects or in this case series data arrays
//   series: [
//     [5, 2, 4, 2, 0],
//     [3, 2, 9, 5, 4, 6],
//     [5, 2, 4, 2, 0],
//     [3, 2, 9, 5, 4, 6],
//     [2, 1, -3, -4, -2, 0]
//   ],
//   backgrounColor:'green'
// };
//
// var options = {
//   width: 300,
//   height: 200
// };

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
// new Chartist.Line('.ct-chart', data);


// function update(data, options, override) {
//   if(data) {
//     this.data = data || {};
//     this.data.labels = this.data.labels || [];
//     this.data.series = this.data.series || [];
//     // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
//     this.eventEmitter.emit('data', {
//       type: 'update',
//       data: this.data
//     });
//   };
//
//   if(options) {
//     this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options);
//
//     // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
//     // Otherwise we re-create the optionsProvider at this point
//     if(!this.initializeTimeoutId) {
//       this.optionsProvider.removeMediaQueryListeners();
//       this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
//     }
//   }
//
//   // Only re-created the chart if it has been initialized yet
//   if(!this.initializeTimeoutId) {
//     this.createChart(this.optionsProvider.getCurrentOptions());
//   }
//
//   // Return a reference to the chart object to chain up calls
//   return this;
// }



//method copies Array instance from an iterable object.
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log('click works')
      //text content, represents content of descendants
      // assigns name and msg
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('messages', {
      //the head, for the delete functionality
      //fetch messages and run delete method
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      //turns objects to a string
      body: JSON.stringify({
        name: name,
        msg: msg,
      }),
      //then... refreshes the page

    }).then(function (response) {
      window.location.reload();
    console.log(response)
    if (response.ok) return response.json()

    });
  });
});
