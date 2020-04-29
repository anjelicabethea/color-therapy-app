// fetch ('/chart')
// .then(res=> res.json())
// .then(res=>{
//
// })
// let button = document.getElementById('submit')
// button.addEventListener('click', (e) => {
//   console.log(this);;
// })
document.querySelector('#submit').addEventListener('click',function (e) {
  // e.preventDefault()
  console.log(this.parentNode.childNodes[2].value);
  let color = this.parentNode.childNodes[2].value

  fetch('/colorcount', {
    method: 'put',
    headers : {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      'color': color,

    })
  })
  .then(response => {
      window.location.reload();
    console.log(response)
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data);
  })
});

// fetch('/getcolorcount')
// // .then(res => res.json())
// .then(res => {
//   console.log(res);
// })

fetch('getcolorcount', {
  method: 'GET',
  headers : {
      'Content-Type': 'application/json',
    },
  // body: JSON.stringify({
  //   'color': color,
  //
  // })
})
.then(response =>  response.json())
.then(data => {
  console.log(data[0]);
  let arrayOfNumsOfColorVote = [data[0].local['red'], data[0].local['blue'], data[0].local['green'], data[0].local['purple'], data[0].local['yellow']]
  console.log(arrayOfNumsOfColorVote)
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
          labels: ['Red', 'Blue', 'Green', 'Purple', 'Yellow'],
          datasets: [{
              label: 'Votes',
              backgroundColor: ['red', 'blue', 'green', 'purple', 'yellow'],
              borderColor: 'rgb(255, 99, 132)',
              data: arrayOfNumsOfColorVote
          }]
      },
      // Configuration options go here
      options: {}
  });
})
