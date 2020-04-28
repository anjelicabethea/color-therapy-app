console.log('heeelooo');
var trash = document.getElementsByClassName('remove');
document.querySelector('#chatSubmit').addEventListener('click',function (e) {
  e.preventDefault()
  const uName = document.querySelector('#uName').getAttribute('data-name')
  const color = document.querySelector('#color').getAttribute('data-color')
  const uId = document.querySelector('#uId').getAttribute('data-id')
  const msg = document.querySelector('#msg').value
  console.log(name,color,uId,msg);

  fetch('/talk', {
    method: 'post',
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    body: JSON.stringify({
      'color': color,
      'msg': {userName:uName, msg:msg}


    })
  })
  .then(response => {
      window.location.reload();
    console.log(response)
    if (response.ok) return response.json()

  })
  .then(data => {
    // console.log('data', data)

    // window.location.reload(true);

  })
});

//method copies Array instance from an iterable object.
// Array.from(trash).forEach(function (element) {
//   element.addEventListener('click', function () {
// console.log('aaayuu');
//       //text content, represents content of descendants
//     const name = this.parentNode.parentNode.childNodes[1].innerText;
//     const msg = this.parentNode.parentNode.childNodes[3].innerText;
//     fetch('/talk', {
//       //the head, for the delete functionality
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       //turns objects to a string
//       body: JSON.stringify({
//         name: name,
//         msg: msg,
//       }),
//       //then... refreshes the page
//
//     }).then(function (response) {
//       window.location.reload();
//     console.log(response)
//     if (response.ok) return response.json()
//
//     });
//   });
// });


Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    console.log('click works')
      //text content, represents content of descendants
      // assigns name and msg
      console.log(this.parentNode.childNodes);
    //   let msgId = this.parentNode.childNodes[3].dataset.id
    // // const name = this.parentNode.parentNode.childNodes[1].innerText;
    // // const msg = this.parentNode.parentNode.childNodes[3].innerText;
    // fetch('/newsfeeddelete', {
    //   //the head, for the delete functionality
    //   //fetch messages and run delete method
    //   method: 'delete',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   //turns objects to a string
    //   body: JSON.stringify({
    //     'id': msgId
    //   }),
    //   //then... refreshes the page
    //
    // }).then(function (response) {
    //   window.location.reload();
    //   console.log(response)
    // if (response.ok) return response.json()
    //
    // });
  });
});
