
console.log('heeelooo');
var trash = document.getElementsByClassName('remove');
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log('click works')
      //text content, represents content of descendants
      // assigns name and msg
      console.log(this.parentNode.childNodes[1].lastChild.dataset.id);
      let msgId = this.parentNode.childNodes[1].lastChild.dataset.id
    fetch('/chatdelete', {
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
