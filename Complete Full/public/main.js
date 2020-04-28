var trash = document.getElementsByClassName('remove');
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



//method copies Array instance from an iterable object.
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log('click works')
      //text content, represents content of descendants
      // assigns name and msg
      console.log(this.parentNode.childNodes);
      let msgId = this.parentNode.childNodes[3].dataset.id
    // const name = this.parentNode.parentNode.childNodes[1].innerText;
    // const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('/newsfeeddelete', {
      //the head, for the delete functionality
      //fetch messages and run delete method
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      //turns objects to a string
      body: JSON.stringify({
        'id': msgId
      }),
      //then... refreshes the page

    }).then(function (response) {
      window.location.reload();
      console.log(response)
    if (response.ok) return response.json()

    });
  });
});
