
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
    console.log(response)
    if (response.ok) return response.json()
    // window.location.reload(true)
  })
  .then(data => {
    console.log('data', data)

    location.reload(true);

  })
});
