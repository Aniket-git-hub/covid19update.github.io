const url = "https://api.covid19india.org/data.json";
const url_2 = "https://api.covid19api.com/summary";
	// for india
	// // [for indian states ]
	window.addEventListener("load",()=>fetch(url).then(res=>res.json()).then(data=>{
			const table = document.getElementById("table"); 
			const td1 = document.getElementById("conf");// confirm field
			const td2 = document.getElementById("rec");// recovered field
			const td3 = document.getElementById("dea");// deaths field
			let obj = data.statewise;
			td1.innerText = obj[0].confirmed;
			td2.innerText = obj[0].recovered;
			td3.innerText = obj[0].deaths;
			let i , text;
			text= "<input type='text' id='search' onkeyup='search()' title='Search Your State' placeholder='Search States/UTs'>"
			text+="<table id='tab'>";
			text+="<caption>All States/UT Stats</caption>";
			text+="<tr><th>Location</th><th>Total Confirmed</th><th>Active</th><th>Deceased</th><th>Recovered</th></tr>";
			for (i = 1; i < obj.length; i++) {
				text+="<tr><td>"+obj[i].state+"</td><td>"+obj[i].confirmed+"</td><td>"+obj[i].active+"</td><td>"+obj[i].deaths+"</td><td>"+obj[i].recovered+"</tr>";
			}
			text+="</table>";
			(table) && (table.innerHTML = text);
		}).catch(error=>{
			console.log(error);
		})
	);
// [search function]
  function search(){
  	let input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById("search");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("tab");
	  tr = table.getElementsByTagName("tr");
		  for (i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      txtValue = td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
    	   }
  	   }
   }
}
// [data for world]
	window.addEventListener("load",()=>fetch(url_2).then(res=> res.json()).then(data=>{
		let global_stat= data.Global;
		let country_stat = data.Countries;
 		const td1 = document.getElementById("Gconf");
		const td2 = document.getElementById("Grec");
		const td3 = document.getElementById("Gdea");
		const table = document.getElementById("table-global");
 		td1.innerText = global_stat.TotalConfirmed;
 		td2.innerText = global_stat.TotalRecovered;
 		td3.innerText = global_stat.TotalDeaths;
 		let i , text;
		text= "<input type='text' id='search' onkeyup='search()' title='Search Your State' placeholder='Search States/UTs'>"
		text+="<table id='tab'>";
		text+="<caption>Countries and their stats</caption>";
		text+="<tr><th>Location</th><th>Confirmed</th><th>Deceased</th><th>Recovered</th></tr>";
		for (i = 1; i < country_stat.length; i++) {
			text+="<tr><td>"+country_stat[i].Country+"</td><td>"+country_stat[i].TotalConfirmed+"</td><td>"+country_stat[i].TotalDeaths+"</td><td>"+country_stat[i].TotalRecovered+"</td></tr>";
		}
		text+="</table>";
		(table) && (table.innerHTML = text);
 	}).catch(error=>console.log(error))
);
// [modal fucntion]
const modal=document.getElementById("modal");
document.getElementById("modal-envok").addEventListener("click", ()=> modal.style.display = "block");
document.getElementById("close").addEventListener("click" , ()=>modal.style.display = "none");
window.onclick=(event)=>(event.target==modal)&&(modal.style.display="none");
