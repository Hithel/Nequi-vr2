
let listaMovIngreso = []
let listaMovEgreso = []

let form = document.querySelector('#formulario');
form.addEventListener('submit', (e) => {
    obtenerData(e)
    form.reset()
});

function obtenerData(e){
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target))

    if(localStorage.getItem("listaMov") == null){
        listaMov = [];
    }

    else  {
        listaMov = JSON.parse(localStorage.getItem("listaMov"));
    }

    listaMov.push(data);

    localStorage.setItem("listaMov", JSON.stringify(listaMov));
    mostrarData()

    saldoDisponible();
    
}

function mostrarData(){

    let tbodyIngresos = document.querySelector("#tbodyIngresos")
    let tbodyEgresos = document.querySelector("#tbodyEgresos")
    let html="";

    if(localStorage.getItem("listaMov") == null){
        listaMov = [];
    }

    else  {
        listaMov = JSON.parse(localStorage.getItem("listaMov"));
    }

    tbodyIngresos.innerHTML = "";
    tbodyEgresos.innerHTML = "";

    listaMov.forEach((element,index) => {

        if(element.movimiento === 'ingreso'){

            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td> ${element.movimiento}</td>
            <td> ${element.decripcion}</td>
            <td> ${element.valor}</td>
            <td><button onclick="eliminarData(${index})" class="btn btn-danger">Eliminar</buttom></td>
            `
            tbodyIngresos.appendChild(tr)
        }
    
        else if(element.movimiento === 'egreso'){


            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td> ${element.movimiento}</td>
            <td> ${element.decripcion}</td>
            <td> ${element.valor}</td>
            <td><button onclick="eliminarData(${index})" class="btn btn-danger">Eliminar</buttom></td>
            `
            tbodyEgresos.appendChild(tr)
        }
    });
}

function eliminarData(index) {
    if(localStorage.getItem("listaMov") == null){
        listaMov = [];
    }

    else  {
        listaMov = JSON.parse(localStorage.getItem("listaMov"));
    }

    listaMov.splice(index, 1);
    localStorage.setItem("listaMov", JSON.stringify(listaMov));
    mostrarData();
    saldoDisponible();
}

function saldoDisponible(){
    let saldoDis = document.querySelector("#saldoDis")
    let saldoIng = document.querySelector("#saldoIng");
    let saldoEgre = document.querySelector("#saldoEgre");

    let valorIng = 0
    let valorEgre = 0
    let vTotal = 0
    let listPorcentIng = [];
    let listPorcentEgre = [];
    let porcent = 0;



    if(localStorage.getItem("listaMov") == null){
        listaMov = [];
    }

    else  {
        listaMov = JSON.parse(localStorage.getItem("listaMov"));
    }


    listaMov.forEach((element) =>{

        if(element.movimiento === 'ingreso'){

            valorIng += parseFloat(element.valor);

            listPorcentIng.push(element.valor)
            
            listPorcentIng.forEach((element)=>{
                porcent = (element/valorIng)*100;
                console.log(porcent);
                
            })

        }

        else if(element.movimiento === 'egreso'){

            valorEgre += parseFloat(element.valor)

            listPorcentEgre.push(element.valor)
            
            listPorcentEgre.forEach((element)=>{

                porcent = (element/valorIng)*100;
                console.log(porcent);
            })
        }

    })

    vTotal = valorIng - valorEgre
    saldoDis.innerHTML = vTotal
    saldoIng.innerHTML = valorIng 
    saldoEgre.innerHTML = valorEgre


    console.log(listaMov);

    localStorage.setItem("listaMov", JSON.stringify(listaMov));
    mostrarData()

}
