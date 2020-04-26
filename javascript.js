const url = "https://api.covid19india.org/data.json";
		window.setTimeout(start(), 100);
		function start(){
		fetch(url).then(res=>{
			return res.json();
		}).then(data=>{
			let obj = data.statewise;
			let i , text;
			text="<table>";
			text+="<tr><th>State</th><th>Active</th></tr>";
			
			for (i = 1; i < obj.length; i++) {
				text+="<tr><td>"+obj[i].state+"</td><td>"+obj[i].active+"</td></tr>";
			}
			text+="</table>";
			document.getElementById("table-india").innerHTML = text;
		});
	}