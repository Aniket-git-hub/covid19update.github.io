const url = "https://api.covid19india.org/data.json";
const url_2 = "https://api.covid19api.com/summary";
const table = document.getElementById("table"); 		
	// for india
	const td1 = document.getElementById("conf");
	const td2 = document.getElementById("rec");
	const td3 = document.getElementById("dea");
	// for indian states 
	window.addEventListener("load", ()=>{
		fetch(url).then(res=>{
			return res.json();
		}).then(data=>{
			let obj = data.statewise;
			console.log(obj);
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
  

  function togle(){
  		if (table.style.display == "none") {
  			table.style.display = "block";
  		}else{
  			table.style.display = "none";
  		}
  }

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
	// we are gonna need it later
//  // for world
//  function getWorld(){
//  	fetch(url_2).then(res=>{
//  		return res.json();
//  	}).then(data=>{
//  		let obj = data.Countries;
//  		let i, text;
//  		text="<table>";
// 	    text+="<tr><th>Country</th><th>Total Confirmed</th><th>Total Recovered</th><th>Total Deaths</th></tr>";
// 	    for(i = 1; i<obj.length; i++){
// 	    	text+="<tr><td>"+obj[i].Country+"</td><td>"+obj[i].TotalConfirmed+"</td><td>"+obj[i].TotalRecovered+"</td><td>"+obj[i].TotalDeaths+"</td></tr>";
// 	    }
// 	    text+="</table>";
	    
// 	    document.getElementById("table").innerHTML = text;
//  	}).catch(error=>{
//  		console.log(error);
//  	});
//  } 
// Global data stats
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
