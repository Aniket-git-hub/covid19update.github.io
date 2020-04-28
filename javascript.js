const url = "https://api.covid19india.org/data.json";
const url_2 = "https://api.covid19api.com/summary";
const table = document.getElementById("table"); 		
	// for india
	const td1 = document.getElementById("conf");
	const td2 = document.getElementById("rec");
	const td3 = document.getElementById("dea");
	// [for indian states ]
	window.addEventListener("load",()=>{
		 fetch(url).then(res=>{
			return res.json();
		}).then(data=>{
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
			table.innerHTML = text;
		}).catch(error=>{
			console.log(error);
		});
	});
  
// [togle function]
  function togle(){
  		if (table.style.display == "none") {
  			table.style.display = "block";
  		}else{
  			table.style.display = "none";
  		}
  }
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
	window.addEventListener("load", ()=>{
	const td1 = document.getElementById("Gconf");
	const td2 = document.getElementById("Grec");
	const td3 = document.getElementById("Gdea");
	fetch(url_2).then(res=>{
 		return res.json();
 	}).then(data=>{
 		let obj = data.Global;
 		td1.innerText = obj.TotalConfirmed;
 		td2.innerText = obj.TotalRecovered;
 		td3.innerText = obj.TotalDeaths;
 	}).catch(error=>{
 		console.log(error);
 	});
});
// [modal fucntion]
let modal = document.getElementById("modal");
document.getElementById("modal-envok").addEventListener("click", ()=>{

	modal.style.display = "block";

});
document.getElementById("close").addEventListener("click" , ()=>{
	modal.style.display = "none";
});
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
