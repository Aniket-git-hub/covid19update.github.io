const url_india = "https://api.covid19india.org/data.json";
const url_world_data = "https://api.covid19api.com/summary";
const url_for_distric = "https://api.covid19india.org/state_district_wise.json";
const url_essentail_resources = "https://api.covid19india.org/resources/resources.json"
	// // [india  ]
	window.addEventListener("load",()=>fetch(url_india).then(res=>res.json()).then(data=>{
			let obj = data.statewise, i , text;
			const table = document.getElementById("table_indian_states"),
			 		delta_total = document.getElementById("delta_total"),// span for total delta 
				   	delta_Deaths = document.getElementById("delta_Deaths"),// span for total delta deaths
				   	delta_recovered = document.getElementById("delta_recovered"),// sapn for total delta recovered
				  	across_table = document.getElementById("table_across_india"),//getting across box
	     		  	across_tr = across_table.getElementsByTagName("tr"),// getting the tr of that table
		 		  	across_td = across_tr[1].getElementsByTagName("td"),// getting the td of tr
		 		  	updated_Time = document.getElementById("updated_Time");// getting updated_time p tag to display time
		 		  	// assining the value of the element
		 		  	updated_Time.innerHTML = obj[0].lastupdatedtime;
				  	across_td[0].innerHTML = obj[0].confirmed;
				  	across_td[1].innerHTML = obj[0].recovered;
				    across_td[2].innerHTML = obj[0].deaths;
			  		delta_total.innerHTML = obj[0].deltaconfirmed;
			  		delta_Deaths.innerHTML = obj[0].deltadeaths;
			  		delta_recovered.innerHTML = obj[0].deltarecovered;
			  		// this for the table to show the stats
				text= `<input type="text" class="search_box" 
						id="search "onkeyup="search(this.id, document.getElementById('table_india'))" 
						title="Search Your State" placeholder="Search States/UTs">`;
				text+=`<table id='table_india'>`;
				text+=`<caption>All States/UT Stats</caption>`;
				text+=`<tr>
							<th>Location</th>
							<th>Total Confirmed</th>
							<th>Active</th>
							<th>Deceased</th>
							<th>Recovered</th>
					   </tr>`;
				for(i = 1; i < obj.length; i++){
					text+=`<tr onclick='redirect(this)'>
								<td>${obj[i].state}</td>
								<td>${obj[i].confirmed}</td>
								<td>${obj[i].active}</td>
								<td>${obj[i].deaths}</td>
								<td>${obj[i].recovered}</td>
					       </tr>`;
				}
				text+=`</table>`;// assined the value to table as data
				(table) && (table.innerHTML = text);
			}).catch(error=>console.log(error)));// backup for errors
	// ********************************[world ]*************************************************
	window.addEventListener("load",()=>fetch(url_world_data).then(res=>res.json()).then(data=>{
		let global_stat= data.Global, country_stat = data.Countries, time = data.Date, i, text;
		const table = document.getElementById("table-global"),
			  across_table = document.getElementById("table_across_global"),
			  across_tr = across_table.getElementsByTagName("tr"),
			  across_td = across_tr[1].getElementsByTagName("td"),
			  newConfirmed = document.getElementById("newConfirmed"),
			  newRecovered = document.getElementById("newRecovered"),
			  newDeaths = document.getElementById("newDeaths"),
			  updated_Time = document.getElementById("updated_time_global");
			  updated_Time.innerHTML = time;
			  across_td[0].innerHTML = global_stat.TotalConfirmed;
			  across_td[1].innerHTML = global_stat.TotalRecovered;
			  across_td[2].innerHTML = global_stat.TotalDeaths;
			  newConfirmed.innerHTML = global_stat.NewConfirmed;
			  newRecovered.innerHTML = global_stat.NewRecovered;
			  newDeaths.innerHTML = global_stat.NewDeaths;
				text= `<input type="text" class="search_box" 
				id="search" onkeyup="search(this.id, document.getElementById('table_world'))" 
				title="Search Your Country" placeholder="Search Countries">`;
				text+=`<table id='table_world'>`;
				text+=`<caption>Countries and their stats</caption>`;
				text+= `<tr>
							<th>Location</th>
							<th>Confirmed</th>
							<th>Deceased</th>
							<th>Recovered</th>
						</tr>`;
				for (i = 1; i < country_stat.length; i++) {
					text+= `<tr>
								<td>${country_stat[i].Country}</td>
								<td>${country_stat[i].TotalConfirmed}</td>
								<td>${country_stat[i].TotalDeaths}</td>
								<td>${country_stat[i].TotalRecovered}</td>
							</tr>`;
				}
				text+=`</table>`;
				(table) && (table.innerHTML = text);
		 	}).catch(error=>console.log(error))
		 	);
//************************ [district]**************************************************************************************************************************************************************************
		  const redirect = (element)=>{
			const table = document.getElementById("modal_district");
			const state = element.getElementsByTagName("td")[0].innerHTML;	
				  table.style.display = 'block';
			fetch(url_for_distric).then(response=> response.json()).then(raw_data=>{
					let object = raw_data[state].districtData, text_data;					
						text_data= `<input type="text" class="search_box" 
						id="search" onkeyup="search(this.id, document.getElementById('table_district'))" 
						title="Search Your Districts" placeholder="Search Districts">`; 
						text_data+= `<table id='table_district'>`;
						text_data+=`<caption>District Stats</caption>`;
						text_data+=`<tr>
						<th>Location</th>
						<th>Total Confirmed</th>
						<th>Active</th>
						<th>Deceased</th>
						<th>Recovered</th>
						</tr>`; 
					for ( let distric in object){
					text_data +=`<tr>
					<td>${distric}</td>
					<td>${object[distric].confirmed}</td>
					<td>${object[distric].active}</td>
					<td>${object[distric].deceased}</td>
					<td>${object[distric].recovered}</td>
					</tr>`;
					}
					text_data +=`</table>`;
					(table) && (table.innerHTML = text_data)
			}).catch(err=>console.log(err))}
	// ******************************* [search function]********************************
  const search = (id_input, id_table)=>{
  	let input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById(id_input);
	  filter = input.value.toUpperCase();
	  table = id_table;
	  tr = table.getElementsByTagName("tr");
		  for (i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if(td){
		      txtValue = td.textContent || td.innerText;
		      if (txtValue.toUpperCase().indexOf(filter) > -1){
		        tr[i].style.display = "";
		    }else{
		        	tr[i].style.display = "none";
    	   	     }
  	   }
   }
};
 // **************[function for modal boxes]********************************
const modal_districts = document.getElementById("modal_district");
const modal=document.getElementById("modal");
document.getElementById("modal-envok").addEventListener("click", ()=> modal.style.display = "block");
document.getElementById("close").addEventListener("click" , ()=>modal.style.display = "none");
window.addEventListener("click", (event)=>{
	if(event.target == modal){
		modal.style.display = 'none';
	}else if (event.target == modal_districts) {
		modal_districts.style.display = 'none';
	}
});

	
