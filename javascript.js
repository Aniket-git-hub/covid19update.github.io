const url = "https://api.covid19india.org/data.json";
const url_2 = "https://api.covid19api.com/summary" 		
	// for india
		function getIndia(){
		fetch(url).then(res=>{
			return res.json();
		}).then(data=>{
			let obj = data.statewise;
			let i , text;
			text = "<p>Total Covid19 cases in india is "+obj[0].confirmed+". And Total number of deaths is "+obj[0].deaths+" but "+obj[0].recovered+" people have won the fight of their life against covid19.</p>";
			text+="<table>";
			text+="<tr><th>State</th><th>Total Confirmed</th><th>Active</th><th>Deaths</th><th>Recovered</th></tr>";
			
			for (i = 1; i < obj.length; i++) {
				text+="<tr><td>"+obj[i].state+"</td><td>"+obj[i].confirmed+"</td><td>"+obj[i].active+"</td><td>"+obj[i].deaths+"</td><td>"+obj[i].recovered+"</tr>";
			}
			text+="</table>";
			document.getElementById("table").style.display = "inline-block";
			document.getElementById("table").innerHTML = text;
		}).catch(error=>{
			console.log(error);
		});
	}
 // for world
 function getWorld(){
 	fetch(url_2).then(res=>{
 		return res.json();
 	}).then(data=>{
 		let obj = data.Countries;
 		let i, text;
 		text="<table>";
	    text+="<tr><th>Country</th><th>Total Confirmed</th><th>Total Recovered</th><th>Total Deaths</th></tr>";
	    for(i = 1; i<obj.length; i++){
	    	text+="<tr><td>"+obj[i].Country+"</td><td>"+obj[i].TotalConfirmed+"</td><td>"+obj[i].TotalRecovered+"</td><td>"+obj[i].TotalDeaths+"</td></tr>";
	    }
	    text+="</table>";
	    document.getElementById("table").style.display = "inline-block";
	    document.getElementById("table").innerHTML = text;
 	}).catch(error=>{
 		console.log(error);
 	});
 } 

// for the total 
function getGlobal(){
	fetch(url_2).then(res=>{
 		return res.json();
 	}).then(data=>{
 		let obj = data.Global;
 		let text;
 		text="<table>";
	    text+="<tr><th>Total Confirmed</th><th>Total Recoverd</th><th>Total Deaths</th></tr>";
 		text+="<tr><td>"+obj.TotalConfirmed+"</td><td>"+obj.TotalRecovered+"</td><td>"+obj.TotalDeaths+"</td></tr>";
 		text+="</table>";
 		document.getElementById("table").style.display = "inline-block";
	    document.getElementById("table").innerHTML = text;
 	}).catch(error=>{
 		console.log(error);
 	});
}
