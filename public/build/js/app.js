const cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};let paso=1;const paginaInicial=1,paginaFinal=3;let ultimoDivSeleccionado=null;function iniciarApp(){mostrarSeccion(),tabs(),paginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".cita__mostrar");e&&e.classList.remove("cita__mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("cita__mostrar");const o=document.querySelector(".cita__boton--actual");o&&o.classList.remove("cita__boton--actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("cita__boton--actual")}function tabs(){document.querySelectorAll(".cita__tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=+e.target.dataset.paso,mostrarSeccion(),paginador()})})}function paginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,paginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,paginador())})}async function consultarAPI(){try{const e=location.origin+"/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,c=document.createElement("P");c.classList.add("servicio__nombre"),c.textContent=o;const n=document.createElement("P");n.classList.add("servicio__precio"),n.textContent="$ "+a;const i=document.createElement("DIV");i.classList.add("servicio"),i.dataset.idServicio=t,i.onclick=function(){seleccionarServicio(e)},i.appendChild(c),i.appendChild(n),document.querySelector("#servicios").appendChild(i)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e!==t),a.classList.remove("servicio__seleccionado"),ultimoDivSeleccionado=null,cita.servicios=[]):(ultimoDivSeleccionado&&ultimoDivSeleccionado.classList.remove("servicio__seleccionado"),cita.servicios=[e],a.classList.add("servicio__seleccionado"),ultimoDivSeleccionado=a)}function idCliente(){const e=document.querySelector("#id").value;cita.id=e}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#horas").addEventListener("click",(function(e){cita.hora=e.target.dataset.horaId}))}function mostrarAlerta(e,t,o,a=!0){const c=document.querySelector(".alerta");c&&c.remove();const n=document.createElement("DIV");n.textContent=e,n.classList.add("alerta"),n.classList.add(`alerta__${t}--resumen`);document.querySelector(o).appendChild(n),a&&setTimeout(()=>{n.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".cita__resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Falta el servicio, la fecha o la hora","error",".cita__resumen",!1);const{nombre:t,fecha:o,hora:a,servicios:c}=cita,n=document.querySelector(`[data-hora-id="${a}"`).textContent,i=document.createElement("H3");i.textContent="Resumen de la cita",e.appendChild(i),c.forEach(t=>{const{id:o,precio:a,nombre:c}=t,n=document.createElement("DIV");n.classList.add("cita__contenedor");const i=document.createElement("P");i.innerHTML="<span>Servicio: </span> "+c;const r=document.createElement("P");r.innerHTML="<span>Precio: </span> $"+a,n.appendChild(i),n.appendChild(r),e.appendChild(n)});const r=document.createElement("P");r.innerHTML="<span>Nombre:</span> "+t;const s=new Date(o),l=s.getMonth(),d=s.getDate()+2,u=s.getFullYear(),m=new Date(Date.UTC(u,l,d)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"});console.log(m);const p=document.createElement("P");p.innerHTML="<span>Fecha:</span> "+m,console.log(cita);const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${n} Horas`;const h=document.createElement("BUTTON");h.classList.add("cita__reservar"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(r),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:a,id:c}=cita,n=a.map(e=>e.id),i=new FormData;i.append("fecha",t),i.append("horaId",o),i.append("usuarioId",c),i.append("servicios",n),console.log([...i]);try{const e=location.origin+"/api/citas",t=await fetch(e,{method:"POST",body:i});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita creada",text:"Tu cita ha sido agendada correctamente",button:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},2e3)})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error al guardar la cita"})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));