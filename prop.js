function hide_all_prop_tabs(){
	x=document.getElementsByClassName("prop_tabs");
	for(var i=0;i<x.length;i++)
	{
		x[i].style.display="none";
	}
}

document.getElementById("pages_btn").addEventListener("click",function(){
	document.getElementById("pages_modal").style.display="flex";
});

document.getElementById("home_page_edit_btn").addEventListener("click",function(){
	current_wpage=this.getAttribute("data-wpageid");
	alert(current_wpage);

	//disable pointer click on header/footer container divs
	var x=document.getElementsByClassName("disable_cursor_interaction");
	for(var i=0; i<x.length; i++)
	{
		x[i].style.pointerEvents="none";
	}
	//disable cursor, set cursor pointer to not-allowed
	document.getElementById("wpage_0").style.cursor="not-allowed";
	document.getElementById("wpage_1").style.cursor="not-allowed";

	//hide webpages which are not active
	wpages=document.getElementsByClassName("wpages");
	for(var i=0; i<wpages.length; i++)
	{
		if(wpages[i].id=="wpage_"+current_wpage)
		{
			wpages[i].style.display="block";
		}else
		{
			wpages[i].style.display="none";
		}
	}

	//check if header or footer block is checked
	//then set display property appropriately 
	if(document.getElementById("header_show").checked)
	{
		document.getElementById("wpage_0").style.display="block";
	}else
	{
		document.getElementById("wpage_0").style.display="none";
	}
	if(document.getElementById("footer_show").checked)
	{
		document.getElementById("wpage_1").style.display="block";
	}else
	{
		document.getElementById("wpage_1").style.display="none";
	}

	//minimize modal window
	document.getElementById("pages_modal").style.display="none";
});

document.getElementById("home_page_del_btn").addEventListener("click",function(){
	alert("wpage_"+this.getAttribute("data-wpageid"));
	document.getElementById("wpage_"+this.getAttribute("data-wpageid")).remove();
	document.getElementById("li_wpage_"+this.getAttribute("data-wpageid")).remove();
	
	var wpages=document.getElementsByClassName("wpages");
	//restore proper order of wpage_<number> count
	for(var i=0; i<wpages.length ; i++)
	{
		wpages[i].id="wpage_"+i.toString();
	}
	//set to zero manually if there are no webpages
	if(wpages.length==0)
	{
		last_wpage=0;
	}

	//add 'add webpage' message if there are no webpages
	if(wpages.length==0)
	{
		var add_wpage_div=document.createElement("div");
		add_wpage_div.id="add_wpage_msg";
		add_wpage_div.style.display="flex";
		add_wpage_div.style.justifyContent="center";
		add_wpage_div.innerHTML="Add a webpage to edit";
		add_wpage_div.style.fontSize="3em";

		document.getElementById("webpages").appendChild(add_wpage_div);
	}
});

document.getElementById("header_edit").addEventListener("click",function(){
		//hide all wpages
		var wpages=document.getElementsByClassName("wpages");
		for(var i=0; i<wpages.length; i++)
		{
			wpages[i].style.display="none";
		}
		//only show header block wpage
		document.getElementById("wpage_0").style.display="block";

		//enable pointer click on header/footer container divs
		var x=document.getElementsByClassName("disable_cursor_interaction");
		for(var i=0; i<x.length; i++)
		{
			x[i].style.pointerEvents="auto";
		}
		//enable cursor, set cursor pointer to auto
		document.getElementById("wpage_0").style.cursor="auto";
		//set current page to 0 i.e. header block wpage
		current_wpage=0;

		//minimize modal window
		document.getElementById("pages_modal").style.display="none";
});

document.getElementById("footer_edit").addEventListener("click",function(){
		//hide all wpages
		var wpages=document.getElementsByClassName("wpages");
		for(var i=0; i<wpages.length; i++)
		{
			wpages[i].style.display="none";
		}
		//only show footer block wpage
		document.getElementById("wpage_1").style.display="block";

		//enable pointer click on header/footer container divs
		var x=document.getElementsByClassName("disable_cursor_interaction");
		for(var i=0; i<x.length; i++)
		{
			x[i].style.pointerEvents="auto";
		}
		//enable cursor, set cursor pointer to auto
		document.getElementById("wpage_1").style.cursor="auto";
		//set current page to 1 i.e. footer block wpage
		current_wpage=1;

		//minimize modal window
		document.getElementById("pages_modal").style.display="none";
});

document.getElementById("header_show").addEventListener("change",function(){
	if(document.getElementById("header_show").checked)
	{
		document.getElementById("wpage_0").style.display="block";
	}else
	{
		document.getElementById("wpage_0").style.display="none";
	}
});

document.getElementById("footer_show").addEventListener("click",function(){
	if(document.getElementById("footer_show").checked)
	{
		document.getElementById("wpage_1").style.display="block";
	}else
	{
		document.getElementById("wpage_1").style.display="none";
	}
});

document.getElementById("pages_new_webpage_btn").addEventListener("click",function(){
	title=document.getElementById("pages_new_webpage_title");
	if(title.value=="")
	{
		alert("Webpage title can't be empty!");
	}else{
		//change current wpage to be that of newly added wpage
		current_wpage=last_wpage;
		current_container="container_0_"+current_wpage;

		//create webpage list entry for new webpage entry
		li_wpage=document.createElement("div");
		li_wpage.style.display="flex";
		li_wpage.id="li_wpage_"+last_wpage.toString();
		li_wpage.style.justifyContent="space-between";
		li_wpage.style.width = "92%";
		li_wpage.style.alignItems="center";

		//actual webpage div to be added in list of webpages
		new_wpage=document.createElement("div");
		new_wpage.id="wpage_"+last_wpage.toString();
		new_wpage.className="wpages";
		document.getElementById("webpages").appendChild(new_wpage);
	
		//title of webpage in entry
		wtitle=document.createElement("p");
		wtitle.innerHTML=title.value;
		li_wpage.appendChild(wtitle);

		//span div holding buttons
		btns=document.createElement("span");
		edit_btn = document.createElement("button");
		edit_btn.setAttribute("data-wpageid",last_wpage.toString());
		edit_btn.innerHTML="Edit Page";
		btns.appendChild(edit_btn);
		del_btn = document.createElement("button");
		del_btn.innerHTML="&times;";
		del_btn.setAttribute("data-wpageid",last_wpage.toString());
		del_btn.style.marginLeft="4px";
		btns.appendChild(del_btn);
		li_wpage.appendChild(btns);

		edit_btn.addEventListener("click",function(){
			current_wpage=this.getAttribute("data-wpageid");
			alert(current_wpage);
			
			//disable pointer click on header/footer container divs
			var x=document.getElementsByClassName("disable_cursor_interaction");
			for(var i=0; i<x.length; i++)
			{
				x[i].style.pointerEvents="none";
			}
			//disable cursor, set cursor pointer to not-allowed
			document.getElementById("wpage_0").style.cursor="not-allowed";
			document.getElementById("wpage_1").style.cursor="not-allowed";

			//hide webpages which are not active
			var wpages=document.getElementsByClassName("wpages");
			for(var i=0; i<wpages.length; i++)
			{
				if(wpages[i].id=="wpage_"+current_wpage)
				{
					wpages[i].style.display="block";
				}else
				{
					wpages[i].style.display="none";
				}
			}

			//check if header or footer block is checked
			//then set display property appropriately 
			if(document.getElementById("header_show").checked)
			{
				document.getElementById("wpage_0").style.display="block";
			}else
			{
				document.getElementById("wpage_0").style.display="none";
			}
			if(document.getElementById("footer_show").checked)
			{
				document.getElementById("wpage_1").style.display="block";
			}else
			{
				document.getElementById("wpage_1").style.display="none";
			}

			//minimize modal window
			document.getElementById("pages_modal").style.display="none";
		});

		del_btn.addEventListener("click",function(){
			alert("wpage_"+this.getAttribute("data-wpageid"));
			document.getElementById("wpage_"+this.getAttribute("data-wpageid")).remove();
			document.getElementById("li_wpage_"+this.getAttribute("data-wpageid")).remove();
				
			var wpages=document.getElementsByClassName("wpages");
			//restore proper order of wpage_<number> count
			for(var i=0; i<wpages.length ; i++)
			{
				wpages[i].id="wpage_"+i.toString();
			}
			//set to zero manually if there are no webpages
			if(wpages.length==0)
			{
				last_wpage=0;
			}

			//add 'add webpage' message if there are no webpages
			if(wpages.length==0)
			{
				var add_wpage_div=document.createElement("div");
				add_wpage_div.id="add_wpage_msg";
				add_wpage_div.style.display="flex";
				add_wpage_div.style.justifyContent="center";
				add_wpage_div.innerHTML="Add a webpage to edit";
				add_wpage_div.style.fontSize="3em";

				document.getElementById("webpages").appendChild(add_wpage_div);
			}
		});
	
		//hide webpages which are not active
		var wpages=document.getElementsByClassName("wpages");
		for(var i=0; i<wpages.length; i++)
		{
			if(wpages[i].id=="wpage_"+current_wpage)
			{
				wpages[i].style.display="block";
			}else
			{
				wpages[i].style.display="none";
			}
		}

		//add current webpage panel_no field into panel_no array
		panel_no.push(0);
		
		//add very first panel into actual webpage div
		add_first_panel(last_wpage);

		document.getElementById("webpages_list").appendChild(li_wpage);
		last_wpage+=1;
		title.value="";
	
		//check if at least one webpage exists
		//if yes, remove the add webpage message alert
		var wpages=document.getElementsByClassName("wpages");
		if(wpages.length>0)
		{
			x=document.getElementById("add_wpage_msg");
			if(x)
			{
				x.remove();
			}
		}
	}
});

document.getElementById("pages_modal_close_btn").addEventListener("click",function(){
	document.getElementById("pages_modal").style.display="none";
});

document.getElementById("image_online_search").addEventListener("click",function(){
	document.getElementById("unsplash_modal").style.display="flex";
});

document.getElementById("unsplash_modal_close").addEventListener("click",function(){
	document.getElementById("unsplash_modal").style.display="none";
});

document.getElementById("prop_open_btn").addEventListener("click", function() {
	document.getElementById("options").style.visibility = "visible";
	document.getElementById("prop_close_btn").style.visibility = "visible";
});

document.getElementById("prop_close_btn").style.visibility = "hidden";
document.getElementById("prop_close_btn").addEventListener("click", function() {
	document.getElementById("prop_close_btn").style.visibility = "hidden";
	document.getElementById("options").style.visibility = "hidden";
});

document.getElementById("bg_image_tab").style.display = "none";
document.getElementById("bg_color_btn").addEventListener("click", function() {
	document.getElementById("bg_image_tab").style.display = "none";
	document.getElementById("color_tab").style.display = "flex";
});

document.getElementById("bg_image_btn").addEventListener("click", function() {
	document.getElementById("color_tab").style.display = "none";
	document.getElementById("bg_image_tab").style.display = "block";
});


document.getElementById("layout_tab").style.display = "none";
document.getElementById("layout_btn").addEventListener("click",function(){
	document.getElementById("widgets_tab").style.display = "none";
	document.getElementById("layout_tab").style.display = "block";
});

document.getElementById("widgets_btn").addEventListener("click",function(){
	document.getElementById("layout_tab").style.display = "none";
	document.getElementById("widgets_tab").style.display = "flex";
});

document.getElementById("pick_color_btn").addEventListener("click", function() {
	color = document.getElementById("bg_color_color").value
	document.getElementById("bg_color_text").value = color;
	document.getElementById(current_container).style.backgroundColor = color;
});

document.getElementById("enter_color_btn").addEventListener("click", function() {
	color = document.getElementById("bg_color_text").value

	if(color[0]!='#')
		color='#'+color;

	document.getElementById("bg_color_color").select(color);
	document.getElementById(current_container).style.backgroundColor = color;
});


//Set margins when margin value changes in input
document.getElementById("margin_top").addEventListener("change", function(){
	x = document.getElementById("margin_top").value;
	document.getElementById("panel_"+current_panel_no.toString()+"_"+current_wpage.toString()).style.marginTop = x.toString()+"px";
})

document.getElementById("margin_left").addEventListener("change", function(){
	x = document.getElementById("margin_left").value;
	document.getElementById("panel_"+current_panel_no.toString()+"_"+current_wpage.toString()).style.marginLeft = x.toString()+"px";
})

document.getElementById("margin_right").addEventListener("change", function(){
	x = document.getElementById("margin_right").value;
	document.getElementById("panel_"+current_panel_no.toString()+"_"+current_wpage.toString()).style.marginRight = x.toString()+"px";
})

document.getElementById("margin_bottom").addEventListener("change", function(){
	x = document.getElementById("margin_bottom").value;
	document.getElementById("panel_"+current_panel_no.toString()+"_"+current_wpage.toString()).style.marginBottom = x.toString()+"px";
})

//Drag and Drop Events
var widget_btns=document.getElementsByClassName("widget_btns");
for(var i=0; i<widget_btns.length ; i++)
{
	widget_btns[i].addEventListener("dragstart",function(ev){
	   ev.dataTransfer.setData("text", ev.target.id);
	});
}

var unsplash_url="";
/*-------------Unsplash API integration--------------------*/
document.getElementById("unsplash_search_btn").addEventListener("click",function(){
	clientId="soNfYo2guabXEGePcQmX0Y0Dbh2Vgis6tiKRXtwKORo";
	query=document.getElementById("unsplash_query").value;
	//url = "https://api.unsplash.com/photos?client_id="+clientId+"&query="+query;
	url = "https://api.unsplash.com/search/photos?query="+query+"&client_id="+clientId;
	console.log(url);


	fetch(url)
		.then(function(data){
			return data.json();
		})
		.then(function(data){
			console.log(data);
			var images= new Array();

			data.results.forEach(photo =>{
				images.push(document.createElement("img"));
				images[images.length-1].src=photo.urls.regular;
				images[images.length-1].style.width="18%";
				images[images.length-1].style.height="44%";
				images[images.length-1].style.margin="1%";
				images[images.length-1].addEventListener("click",function(){
					for(var j=0 ; j< images.length ; j++)
					{
						images[j].style.outline = "";
					}
					this.style.outline="2px solid red";
					unsplash_url=this.src;
				});
			});

			for(var i=0; i<images.length ; i++)
			{
				document.getElementById("unsplash_search_result").appendChild(images[i]);
			}
		})
});

document.getElementById("unsplash_image_select").addEventListener("click",function(){
	if(unsplash_url == "")
	{
		alert("Select an image first!");
	}else{
		//clearing previous image if any
		document.getElementById("image_preview").innerHTML="";
		var x=document.getElementById(current_cdiv).querySelector(".image_tip");
		if(x)
		{
			x.remove();
		}
		var y=document.getElementById(current_cdiv).querySelector(".cimage");
		if(y)
		{
			y.remove()
		}

		var image = document.createElement("img");
		var image_thumb = document.createElement("img");
		image_thumb.src=unsplash_url.replace("w=1080","w=200");
		image_thumb.style.height="100%";

		image.src=unsplash_url;
		image.className="cimage";
		image.style.width="100%";
		image.style.height="100%";

		document.getElementById(current_cdiv).appendChild(image);
		document.getElementById("image_preview").appendChild(image_thumb);
		document.getElementById("unsplash_modal").style.display="none";

		props[current_wpage][current_panel_no][current_cdiv].onlineurl=unsplash_url.replace("w=1080","w=200");
	}
});
