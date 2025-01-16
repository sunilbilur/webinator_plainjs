//panel no index indicates actual 
//panel no of the wpage
var pan_no = [0,0,0];
var current_panel_no = 0;

//container_panelNo_pageNo
var current_container = "container_0_2";

var last_wpage=3;
var current_wpage=0;

var prev_cdiv = "";
var current_cdiv = "";
var props = [[],[],[]];

hide_all_prop_tabs();

function get_panel(panel_no)
{
	var con = document.createElement('div');
	var panel_div = document.createElement('div');
	con.id="container_"+panel_no.toString()+"_"+current_wpage.toString();
	if(current_wpage==0 || current_wpage==1)
	{
		con.className="disable_cursor_interaction";
	}

	panel_div.id = "panel_"+panel_no.toString()+"_"+current_wpage.toString();

	con.style.display ="flex";
	con.style.justifyContent ="center";
	con.style.resize = "vertical";
	con.style.overflow = "auto";
	
	//css styling of panel
	panel_div.style.display = "flex";
	//panel_div.style.height = "200px";
	panel_div.style.margin = "20px";
	panel_div.style.width = "85%";
	panel_div.style.minHeight = "100px";
	panel_div.style.justifyContent ="center";
	panel_div.style.backgroundColor = "dodgerblue";

	props[current_wpage].push({});
	// [ { cdiv_01_0: {…}, cdiv_11_0: {…}, cdiv_21_0: {…} }, {...}, {...} ]

	for(let i=0; i<6; i++)
	{
		var tmp= document.createElement('div');
		tmp.id="div_"+i.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
		tmp.innerHTML=(i+1).toString()+" Columns";
		panel_div.appendChild(tmp);

		//css styling of div inside panel
		tmp.style.width="100%";
		tmp.style.cursor="pointer";
		tmp.style.padding="20px";
		tmp.style.margin="20px";
		tmp.style.display="flex";
		tmp.style.justifyContent="center";
		tmp.style.alignItems ="center";
		tmp.style.backgroundColor="#f1f1f1";
	}

	console.log(props);

	con.appendChild(panel_div);
	return con;
}

function create_containers(panel_no)
{
	for(let i=0; i<6; i++)
	{
		first_div="div_"+i.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString()
		document.getElementById(first_div).addEventListener("click", function() {
			var panel_div = document.createElement('div');
			for(var j=0; j<=i; j++)
			{
				//Column Divs
				var tmp=document.createElement('div');
				tmp.id = "div_"+j.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
				tmp.style.display = "flex";
				tmp.style.flexDirection = "column";
				tmp.style.position = "relative";
				//tmp.style.backgroundColor="#f1f1f1";
				tmp.style.outline = "1px dashed red";
				tmp.style.outlineOffset = "-2px";
				tmp.style.width = "100%";
				//tmp.style.padding="20px";
				//tmp.style.margin="20px";

				//choose(chrow) row divs
				for(var k=0; k<3; k++)
				{
					var ctmp=document.createElement('div');
					ctmp.id = "chrow_"+k.toString()+j.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
					ctmp.innerHTML=(k+1).toString()+" Rows";
					ctmp.style.display = "flex";
					ctmp.style.justifyContent = "center";
					ctmp.style.cursor= "pointer";
					ctmp.style.alignItems = "center";
					ctmp.style.margin="10px";
					//ctmp.style.width="100%";
					ctmp.style.padding="10px 0px";
					ctmp.style.height="100%";
					ctmp.style.backgroundColor="#aaaff1";
					ctmp.addEventListener("click",function(){
						alert(this.id);
					});
					tmp.appendChild(ctmp);
				}

				panel_div.appendChild(tmp);
			}
			document.getElementById("panel_"+panel_no.toString()+"_"+current_wpage.toString()).style.backgroundColor="transparent";
			document.getElementById("panel_"+panel_no.toString()+"_"+current_wpage.toString()).innerHTML = panel_div.innerHTML;

			for(let row=0; row<j; row++)
			{
				for(let col=0 ; col<3 ; col++)
				{
					chrow="chrow_"+col.toString()+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
					x=document.getElementById(chrow).addEventListener("click",function(){
						document.getElementById("div_"+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString()).style.outline="none";

						var div=document.createElement("div");
						//This loop creates container divs
						for(let l=0; l<=col; l++)
						{
							var cdiv=document.createElement("div");
							cdiv.id="cdiv_"+l.toString()+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
							cdiv.className = "cdiv_"+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString();
							cdiv.classList.add("draggable");
							cdiv.classList.add("cdiv");
							//cdiv.classList.add("droptarget");
							//cdiv.style.padding ="20px";
							cdiv.style.display="flex";
							cdiv.style.justifyContent = "center";
							cdiv.style.alignItems = "center";
							//cdiv.style.margin = "5px";
							cdiv.style.outline = "1px solid red";
							cdiv.style.outlineOffset ="0px";
							cdiv.style.height = "100%";
							cdiv.style.zIndex = "1";
							
							props[current_wpage][panel_no][cdiv.id]={
								type:"null"
							};
							
							div.appendChild(cdiv);
						}
						//alert("div_"+row.toString()+"_"+panel_no.toString());
						document.getElementById("div_"+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString()).innerHTML = div.innerHTML;
						cdivs=document.getElementsByClassName("cdiv_"+row.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString());

						//set height of cdivs to replace previously given 100%
						cdiv_height=cdivs[0].clientHeight;
						for(var i=0; i<cdivs.length ; i++)
						{
							cdivs[i].style.height=(cdiv_height)+"px";
						}

						$(".draggable").draggable({
							grid:[10,10],
							cancel: false
								
							//containment:"#container_"+panel_no.toString(),

						});
						$(".draggable").resizable({
							grid: 5,
							//removes vertical horizontal resize handles
							//helps for drag and drop
							handles: "se",
							resize: function(ev,ui){
								props[current_wpage][panel_no][this.id].width=this.clientWidth;
								props[current_wpage][panel_no][this.id].height=this.clientHeight;
								set_props_tab(panel_no,this.id);
							}
						});
						attach_handlers_drag_and_drop(row,panel_no);
					});
				}
			}
		});
	}
}

function set_props_tab(panel_no,id,run=false)
{
	t=props[current_wpage][panel_no][id].type;

	hide_all_prop_tabs();
	switch(t)
	{
		case "image":
			document.getElementById("image_tab").style.display="block";
			document.getElementById("image_width").value=props[current_wpage][panel_no][id].width;
			document.getElementById("image_height").value=props[current_wpage][panel_no][id].height;

			if(run && props[current_wpage][panel_no][id].file != undefined)
			{
				var selectedFile = props[current_wpage][panel_no][id].file;
				//alert(selectedFile);
				var reader = new FileReader();

				var img_thumb = document.createElement("img");
				img_thumb.style.height = "100%";
				document.getElementById("image_preview").appendChild(img_thumb);

				reader.onload = function(event) {
					img_thumb.src = event.target.result;
					img_main.src = event.target.result;
				};
				reader.readAsDataURL(selectedFile);
			}
			if(run && props[current_wpage][panel_no][id].onlineurl != "")
			{
				var img_thumb = document.createElement("img");
				img_thumb.style.height="100%";
				img_thumb.src=props[current_wpage][panel_no][id].onlineurl;
				document.getElementById("image_preview").appendChild(img_thumb);
			}
			break;

		case "text":
			document.getElementById("text_tab").style.display="block";
			break;

		case "button":
			document.getElementById("button_tab").style.display="block";
			document.getElementById("btn_text").value=props[current_wpage][panel_no][id].text;
			document.getElementById("btn_link").value=props[current_wpage][panel_no][id].link;
			document.getElementById("btn_width").value=props[current_wpage][panel_no][id].width;
			document.getElementById("btn_height").value=props[current_wpage][panel_no][id].height;
			break;

		case "embed":
			break;
	}
}

window.addEventListener('click', function(e){
	//alert(prev_cdiv);
	//alert(current_cdiv);
	//alert(e.target.className);
	//alert(e.target.id);

	if(prev_cdiv!="")
	{
		if(document.getElementById(prev_cdiv).contains(e.target) )
		{
			// Clicked in box
			//alert("inside");
		} else
		{
			// Clicked outside the box
			//alert("outside");
			
			//clicked inside the same div
			//if(prev_cdiv!=current_cdiv)
			{
				//enable dragging and resizing if disabled
				if($("#"+prev_cdiv).draggable("option","disabled"))
				{
					$("#"+prev_cdiv).draggable("enable");
					$("#"+prev_cdiv).resizable("enable");
				}
			}

			//check if clicked inside other cdiv or blank area on page
			if(e.target.classList.contains("cdiv"))
			{
				document.getElementById(current_cdiv).style.outline="1px solid blue";
				document.getElementById(current_cdiv).style.outlineOffset="0px";
			}else{
				document.getElementById(current_cdiv).style.outline="1px solid red";
				document.getElementById(current_cdiv).style.outlineOffset="0px";
			}
		}
	}
});

function attach_handlers_drag_and_drop(col_no,panel_no)
{
	cdivs=document.getElementsByClassName("cdiv_"+col_no.toString()+"_"+panel_no.toString()+"_"+current_wpage.toString());
	//alert(cdivs.length);
	for(let i=0; i<cdivs.length; i++)
	{
		cdivs[i].addEventListener("click",function(){
			//set colour of previously selected cdiv before updating value of current_div
			if(!current_cdiv=="")
			{
				document.getElementById(current_cdiv).style.outline="1px solid red";
				document.getElementById(current_cdiv).style.outlineOffset="0px";
			}

			prev_cdiv = current_cdiv;
			current_cdiv=this.id;
			this.style.outline= "1px solid blue";
			this.style.outlineOffset="0px";

			switch(props[current_wpage][panel_no][this.id].type)
			{
				case "text":
					$("#"+this.id).draggable("disable");
					$("#"+this.id).resizable("disable");
					break;
			}
	
			document.getElementById("image_preview").innerHTML="";
			set_props_tab(panel_no,this.id,true);
		});

		cdivs[i].addEventListener("dragstart", function(ev){
			ev.dataTransfer.setData("text", event.target.id);
		});
		
		cdivs[i].addEventListener("drop",function(ev){
			ev.preventDefault();

			id=ev.target.id;
			if(!current_cdiv=="")
			{
				document.getElementById(current_cdiv).style.outline="1px solid red";
			}
			current_cdiv=id;
			ev.target.style.outline = "";
			ev.target.style.outline="1px solid blue";
			ev.target.style.outlineOffset="0px";
			widget_type=ev.dataTransfer.getData("text")

			//alert(ev.dataTransfer.getData("text"));

			switch(widget_type)
			{
				case "image":
					tip=document.createElement("p");
					tip.innerHTML="set image from properties";
					tip.className="image_tip";
					this.appendChild(tip);
					
					//set props
					props[current_wpage][panel_no][id].type="image";
					props[current_wpage][panel_no][id].width=document.getElementById(id).clientWidth;
					props[current_wpage][panel_no][id].height=document.getElementById(id).clientHeight;
					props[current_wpage][panel_no][id].onlineurl="";

					document.getElementById("image_preview").innerHTML="";
					set_props_tab(panel_no,id,true);
					break;

				case "text":
					$("#"+id).draggable("disable");
					$("#"+id).resizable("disable");
					props[current_wpage][panel_no][id].type="text";

					tarea=document.createElement("div");
					tarea.style.width="100%";
					document.getElementById(id).appendChild(tarea);
					
					var quill = new Quill(tarea, {
					  modules: {
						toolbar: '#text_toolbar'     // Equivalent to { toolbar: { container: '#toolbar' }}
					  },
					  theme: "snow"
					});
					set_props_tab(panel_no,id);
					break;

				case "button":
					props[current_wpage][panel_no][id].type="button";
					props[current_wpage][panel_no][id].width=document.getElementById(id).clientWidth;
					props[current_wpage][panel_no][id].height=document.getElementById(id).clientHeight;
					props[current_wpage][panel_no][id].text="button";
					props[current_wpage][panel_no][id].link="#";
					
					link=document.createElement("a");
					link.style.width="100%";
					link.style.height="100%";
					link.className="btn_disabled";
					btn=document.createElement("button");
					btn.style.width="100%";
					btn.style.height="100%";
					btn.innerHTML="button";
					link.appendChild(btn);
					document.getElementById(id).appendChild(link);

					set_props_tab(panel_no,id);
					break;

				case "embed":
					break;
			}

			//widget properties event listeners
			//cuation : long list of functions
			document.getElementById("image_local_search").addEventListener("click",function(){
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

				var fileSelector = document.createElement('input');
				fileSelector.setAttribute('type', 'file');
				fileSelector.click();

				fileSelector.addEventListener("change",function(ev){
					props[current_wpage][panel_no][id].file = event.target.files[0];
					var selectedFile = event.target.files[0];
					var reader = new FileReader();

					var img_thumb = document.createElement("img");
					var img_main = document.createElement("img");
					img_thumb.style.height = "100%";
					img_main.style.width="100%";
					img_main.style.height="100%";
					img_main.className="cimage";
					document.getElementById("image_preview").appendChild(img_thumb);
					alert(current_cdiv);
					document.getElementById(current_cdiv).appendChild(img_main);

					reader.onload = function(event) {
						img_thumb.src = event.target.result;
						img_main.src = event.target.result;
					};
					reader.readAsDataURL(selectedFile);
				});
			});
			document.getElementById("image_width").addEventListener("change",function(){
				width=document.getElementById("image_width").value;
				document.getElementById(current_cdiv).style.width=width+"px";
				props[current_wpage][panel_no][current_cdiv].width=width;
			});
				
			document.getElementById("image_height").addEventListener("change",function(){
				height=document.getElementById("image_height").value;
				document.getElementById(current_cdiv).style.height=height+"px";
				props[current_wpage][panel_no][current_cdiv].height=height;
			});
			document.getElementById("btn_text").addEventListener("input",function(){
				text=document.getElementById("btn_text").value;
				document.getElementById(current_cdiv).lastChild.firstChild.innerHTML=text;
				props[current_wpage][panel_no][current_cdiv].text=text;
			});
			
			document.getElementById("btn_link").addEventListener("change",function(){
				link=document.getElementById("btn_link").value;
				x=document.getElementById(current_cdiv).lastChild;
				x.href=link;
				props[current_wpage][panel_no][current_cdiv].link=link;
			});

			document.getElementById("btn_width").addEventListener("change",function(){
				width=document.getElementById("btn_width").value;
				document.getElementById(current_cdiv).style.width=width+"px";
				props[current_wpage][panel_no][current_cdiv].width=width;
			});
			
			document.getElementById("btn_height").addEventListener("change",function(){
				height=document.getElementById("btn_height").value;
				document.getElementById(current_cdiv).style.height=height+"px";
				props[current_wpage][panel_no][current_cdiv].height=height;
			});
		});

		cdivs[i].addEventListener("dragover",function(ev){
			ev.preventDefault();
		});

		cdivs[i].addEventListener("dragenter",function(ev){
			ev.target.style.outline = "3px solid blue";
			ev.target.style.outlineOffset = "-3px";
		});

		cdivs[i].addEventListener("dragleave", function(ev) {
			ev.target.style.outline = "1px solid red";
			ev.target.style.outlineOffset="0px";
			if(!ev.target.classList.contains("cdiv"))
			{
				ev.target.style.outline="";
			}
		});
	}
}

function attach_handlers_draw_selection_border(panel_no)
{
	x="container_"+panel_no.toString()+"_"+current_wpage.toString()
	document.getElementById(x).addEventListener("click",function(){
		document.getElementById(current_container).style.border="";

		current_panel_no=panel_no;
		current_container="container_"+panel_no.toString()+"_"+current_wpage.toString();
		//alert(current_container);

		document.getElementById(current_container).style.border="2px solid slateblue";

		//document.getElementById(current_container).style.outlineOffset="-2px";
		//alert(current+" "+current_container);
	});
}

//Adding very first panel to webpage
function add_first_panel(cur_wpage)
{
	document.getElementById("wpage_"+cur_wpage).appendChild(get_panel(pan_no[cur_wpage]));
	if(cur_wpage!=0 && cur_wpage!=1)
	{
		document.getElementById(current_container).style.border="2px solid slateblue";
	}
	attach_handlers_draw_selection_border(pan_no[cur_wpage]);
	//document.getElementById(current_container).style.outlineOffset="-2px";
	create_containers(pan_no[cur_wpage]);
	pan_no[cur_wpage]=1;
}

//add first panel to very first webpage
add_first_panel(0);//header_wpage
current_wpage=1;
add_first_panel(1);//footer_wpage
current_wpage=2;
add_first_panel(2);//first_wpage

document.getElementById("add_panel").addEventListener("click", function() {
	alert("wpage_"+current_wpage);
	document.getElementById("wpage_"+current_wpage).appendChild(get_panel(pan_no[current_wpage]));
	attach_handlers_draw_selection_border(pan_no[current_wpage]);
	create_containers(pan_no[current_wpage]);
	pan_no[current_wpage]+=1;
});

document.getElementById("rm_panel").addEventListener("click", function() {
	document.getElementById("container_"+(pan_no[current_wpage]-1).toString()+"_"+current_wpage.toString()).remove();
	pan_no[current_wpage]-=1;
	alert(pan_no[current_wpage]);
});
