
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

    // movimientos(data);
    // saldoDisponibles(listaMovIngreso, listaMovEgreso);
}

// function movimientos(data){
//     let html="";


//         if(data.movimiento === 'ingreso'){
//             listaMovIngreso.push(data)

//             listaMovIngreso.forEach((element) =>{
//             html += "<tr>";
//             html += "<td>" + element.movimiento + "</td>";
//             html += "<td>" + element.decripcion + "</td>";
//             html += "<td>" + element.valor + "</td>";

//            html += '<td><button class="btn btn-danger">Eliminar</button></td>';

//            html += "</tr>";

//            document.querySelector("#tablaIngresos tbody").innerHTML = html;
//             })
//         }

//         else if(data.movimiento === 'egreso'){
//             listaMovEgreso.push(data)

//             listaMovEgreso.forEach((element) => {
//                 html += "<tr>";
//                 html += "<td>" + element.movimiento + "</td>";
//                 html += "<td>" + element.decripcion + "</td>";
//                 html += "<td>" + element.valor + "</td>";
    
//                html += '<td><button class="btn btn-danger">Eliminar</button></td>';
    
//                html += "</tr>";
    
//                document.querySelector("#tablaEgresoss tbody").innerHTML = html;  
//             })
//         }

//         return listaMovEgreso,listaMovIngreso
// }

// function saldoDisponible(){}




