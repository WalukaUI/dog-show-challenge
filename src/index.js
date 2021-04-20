const baseURL = "http://localhost:3000/dogs"

function loadDogs() {
    fetch(`${baseURL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            createDogsTable(json)
            editDogs()
        })
}

function createDogsTable(b) {
    aa(b)

    function aa(json) {
        json.forEach(a => {
            const table = document.querySelector('#table-body')
            let tr1 = document.createElement('tr')
            let tr2 = document.createElement('tr')
            let tr3 = document.createElement('tr')
            let tr4 = document.createElement('tr')
            let td1 = document.createElement('td')
            td1.innerHTML = a.name
            let td2 = document.createElement('td')
            td2.innerHTML = a.breed
            let td3 = document.createElement('td')
            td3.innerHTML = a.sex
            let tdBtn = document.createElement('button')
            tdBtn.innerHTML = "Edit  .Dog"
            tdBtn.id = a.id
            tdBtn.className = 'EditDog'
            table.appendChild(tr1)
            table.appendChild(tr2)
            table.appendChild(tr3)
            table.appendChild(tr4)
            table.appendChild(td1)
            table.appendChild(td2)
            table.appendChild(td3)
            table.appendChild(tdBtn)
        })
    }

}
function editDogs() {
    const adog = document.querySelectorAll('.EditDog')
    for (let i = 0; i < adog.length; i++) {
        adog[i].addEventListener('click', function (e) {
            populateDetails(e.target.id)
        })
    }
}
function populateDetails(a) {
    fetch(`${baseURL}/${a}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(r => r.json())
        .then(j => {
            popolatedata(j);
        })
}

const firstInput = document.getElementById('firstInput'),
    secInput = document.getElementById('secondInput'),
    thiredInput = document.getElementById('thiredInput'),
    formValue = document.getElementById('formValue')

function popolatedata(j) {
    firstInput.value = j.name
    secInput.value = j.breed
    thiredInput.value = j.sex
    editDogDetails(j.id)
}

function editDogDetails(x) {
    formValue.addEventListener('click', (e) => {
        e.preventDefault()
        data = {
            name: firstInput.value,
            breed: secInput.value,
            sex: thiredInput.value
        }
        patchdata(x, data)
    })
}

function patchdata(x, data) {
    fetch(`${baseURL}/${x}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(r => r.json())
        .then(j => {
            console.log(j);
        })
    loadDogs()
}


document.addEventListener('DOMContentLoaded', () => {
    loadDogs()
})
