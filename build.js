document.getElementById("build_btn").addEventListener("click",function(){
	var xhttp = new XMLHttpRequest();
	var status = 0;

	xhttp.open("POST", "https://localhost/webinator_backend/main.php", true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			var quill_css = "";

			alert(response);
			console.log(response);
			var xhr = new XMLHttpRequest();
			xhr.open("POST","https://localhost/webinator_backend/echo_qcs.php",false);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200)
				{
					quill_css=this.responseText;
				}
			}
			xhr.send();

			code = JSON.parse(response);
			var zip = new JSZip();
			//var css_fldr = zip.folder("css");
			//css_fldr.file("quill_css_snow.css",quill_css);
			zip.file("quill_css_snow.css",quill_css,{binary : true});
			zip.file("index.html", code.page2);
			zip.generateAsync({type:"blob"})
			.then(function(content) {
				// see FileSaver.js
				saveAs(content, "code.zip");
			});
		}
	};

	//preprocessing of html markdown
	document.getElementById(current_container).style.border="";

	//if header_show checked, add header to start of each wpage
	if(document.getElementById("header_show").checked)
	{
		header=document.getElementById("wpage_0").cloneNode(true);
		header.className="wpage_header_or_footer";
		header.removeAttribute("id");
		//removes display: block style
		header.removeAttribute("style");
		var x=document.getElementsByClassName("wpages");
		for(var i=0; i<x.length ; i++)
		{
			x[i].insertBefore(header,x[i].firstChild);
		}
	}

	//if footer_show checked, add header to start of each wpage
	if(document.getElementById("footer_show").checked)
	{
		footer=document.getElementById("wpage_1").cloneNode(true);
		footer.className="wpage_header_or_footer";
		footer.removeAttribute("id");
		//removes display:block style
		footer.removeAttribute("style");
		var x=document.getElementsByClassName("wpages");
		for(var i=0; i<x.length ; i++)
		{
			x[i].appendChild(footer);
		}
	}
	//enable all buttons
	var list=document.getElementsByTagName("button");
	for(var i=0; i<list.length ; i++)
	{
		if(list[i].classList.contains("btn_disabled"))
		{
			list[i].style.pointerEvents="auto";
		}
	}
	//done preprocessing of html markdown
	
	wpage=document.getElementById("wpage_2");
	var data = {html: wpage.innerHTML};
	xhttp.send(JSON.stringify(data));

	//restore html markdown
	//remove header and footer from start of each wpage
	var x=document.getElementsByClassName("wpage_header_or_footer");
    for(var i = x.length-1; i >= 0; i--)
	{
		x[i].remove();
	}
	//disable all buttons
	var list=document.getElementsByTagName("button");
	for(var i=0; i<list.length ; i++)
	{
		if(list[i].classList.contains("btn_disabled"))
		{
			list[i].style.pointerEvents="none";
		}
	}
	//done restoring html markdown
});
