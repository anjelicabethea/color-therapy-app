var trash = document.getElementsByClassName('fa-trash');
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
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {

      //text content, represents content of descendants
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('/talk', {
      //the head, for the delete functionality
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
