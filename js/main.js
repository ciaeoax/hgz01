document.getElementById('categoria').addEventListener('change', function(event){
    initTime = new Date();
});
document.getElementById('omision').addEventListener('change', function(event){
    document.getElementById('guantes').disabled = false;
});
document.getElementById('fm').addEventListener('change', function(event){
    document.getElementById('guantes').disabled = true;
    document.getElementById('guantes').checked = false;
});
document.getElementById('lm').addEventListener('change', function(event){
    document.getElementById('guantes').disabled = true;
    document.getElementById('guantes').checked = false;
});
document.getElementById('servicio').addEventListener('change', function(event){
    if (document.getElementById('servicio').value=="Otro"){
        document.getElementById('serviciotag').hidden = false;
        document.getElementById('serviciotxt').hidden = false;
        document.getElementById('serviciotxt').required = true;
    }else{
        document.getElementById('serviciotag').hidden = true;
        document.getElementById('serviciotxt').hidden = true;
        document.getElementById('serviciotxt').required = false;
    }
});
document.getElementById('categoria').addEventListener('change', function(event){
    if (document.getElementById('categoria').value=="Otro"){
        document.getElementById('categoriatag').hidden = false;
        document.getElementById('categoriatxt').hidden = false;
        document.getElementById('categoriatxt').required = true;
    }else{
        document.getElementById('categoriatag').hidden = true;
        document.getElementById('categoriatxt').hidden = true;
        document.getElementById('categoriatxt').required = false;

    }
});
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('submit').disabled = true;
    if (typeof initTime === 'undefined'){
        alert('Cambie Categoría a otro valor y regrese al valor original.');
        document.getElementById('submit').disabled = false;
        return;
    }
    if (!(document.getElementById('nombre').value).includes(" ")) {
        alert('Ingrese su Nombre Completo.');
        document.getElementById('submit').disabled = false;
        return;
    }
    if (document.getElementById('matricula').value.length != 8){
        alert('Ingrese una Matricula correcta: 8 dígitos.');
        document.getElementById('submit').disabled = false;
        return;
    }
    if (document.getElementById('servicio').value=="Otro"){
        serviciovalue = document.getElementById('serviciotxt').value;
        if (serviciovalue == ''){
            document.getElementById('submit').disabled = false;
            alert('Escriba el otro servicio. Seleccione un valor diferente y seleccione nuevamente Otro. O recargue.');
            return;
        }
    }else{
        serviciovalue = document.getElementById('servicio').value;
    }
    if (document.getElementById('categoria').value=="Otro"){
        categoriavalue = document.getElementById('categoriatxt').value;
        if (categoriavalue == ''){
            document.getElementById('submit').disabled = false;
            alert('Escriba la otra categoría. Seleccione un valor diferente y seleccione nuevamente Otro. O recargue.');
            return;
        }
    }else{
        categoriavalue = document.getElementById('categoria').value;
    }    
    endTime = new Date();
    var time = endTime - initTime;
    var minutes = Math.floor(time/(1000*60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    var seconds = Math.floor(time/1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    var mseconds = time - (seconds*1000);
    var duracion = minutes + ":" + seconds + "." + mseconds;    
    const formData = {
        turno: document.getElementById('turno').value,
        servicio: serviciovalue,
        nombre: document.getElementById('nombre').value,
        matricula: document.getElementById('matricula').value,
        categoria: categoriavalue,
        indicacion: document.querySelector("input[name=indicacion]:checked").value,
        accion: document.querySelector("input[name=accion]:checked").value,
        guantes: document.getElementById('guantes').checked,
        time: duracion,
        matricula2: document.getElementById('matriculaOpo').value
    };
    //console.log(time, duracion);
    fetch('https://script.google.com/macros/s/AKfycbzYmI-LG5Bo9bkmiMeFtaQVNhO26sAfmoWl9Ye8XhnfPN3dM57uAc7HOUBIuUl6YxtH/exec', { // Replace with your Web App URL
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Información registrada correctamente.');
        console.log('Exito:', serviciovalue, categoriavalue);
        document.getElementById('categoria').value = '';
        document.getElementById('guantes').checked = false;
        document.querySelector("input[name=indicacion]:checked").checked = false;
        document.querySelector("input[name=accion]:checked").checked = false;
        document.getElementById('categoriatag').hidden = true;
        document.getElementById('categoriatxt').hidden = true;
        document.getElementById('categoriatxt').value = '';        
        document.getElementById('matriculaOpo').value = '';
    })
    .catch((error) => {
        console.error('Error:', formData);
        alert('An error occurred while submitting the form.');
    });
        document.getElementById('submit').disabled = false;
});
document.getElementById('dataForm').addEventListener('reset', function(event){
    document.getElementById('serviciotag').hidden = true;
    document.getElementById('serviciotxt').hidden = true
    document.getElementById('categoriatag').hidden = true
    document.getElementById('categoriatxt').hidden = true
});