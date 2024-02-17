function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('SubmitButton').addEventListener('click', createEmployee);



// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', deleteEmployee);
// TODO
function createEmployee (){

  // get data from input field
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify({id:id,name:name})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    return response.json();
  })
  // call fetchEmployees
  .then(data => {
    fetchEmployees();
  })
  .catch(error=> console.error(error))
}

// TODO
function deleteEmployee (event){
  // get id
  const row = event.target.closest('tr');
  const id = row.querySelector('td:first-child').textContent;
  console.log(id) 
  // send id to BE
    fetch(`http://localhost:3000/api/v1/employee/${id}`,{
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    return response.json();
  })
  .then(data => {
    console.log(1);
    fetchEmployees();
  })
  .catch(error=> console.error(error))
}


  // call fetchEmployees


fetchEmployees()
