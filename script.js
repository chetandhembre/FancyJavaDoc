/**
 * @author ChetanD
 */


var info12;
var autocomplete_array = [];
var autocomplete ;
var data ;

function loaddata() {
	d3.json("info.json", function(json) {
		   
		   info12=json;
		   d3.json("autocomplete.json", function(json) {
		   
		   			autocomplete = json;
		   			d3.json("data.json", function(json) {
		   
						   data = json;
						   render(data);
					});
			}); 
		   
	});

}


 

var ret;

var svg;
var width,height,force;

function load() {
	
	
	width  = window.screen.width * 0.55;
    height = window.screen.height;
    
    
	var info = document.getElementById("info");
	
	info.style.height = window.screen.height + 15 + "px";
	info.style.width = window.screen.width* 0.42 + "px";
	var auto = document.getElementById("searchquery");
	auto.addEventListener("keyup",keyuplistener);
	
	svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .on("click",clickonsvg);
	    
	    
	    
     force = d3.layout.force()
	    .gravity(0.05)
	    .distance(100)
	    .friction(0.5)
	    .size([width, height]);

     
     loaddata();
     
  	
}


function clickonsvg() {
	
	
	
} 

function keyuplistener() {
	
		  	
		  	
			var that = this;
			var query = that.value;
			
			
			if ( query.length > 0  ) {
			   
			   if( ret != null) {
			   	  
			   	onmouseout_circle(null,ret.index);
			   }
			   
			   ret = autocompleteIt( query);
			   
			   if( ret != null ) {
			   	
			   	  var type = ret.type;
			      var impinfo =  (type == 2) ? info12.nodes.class : ((type == 1) ? info12.nodes.interface : info12.nodes.exception);
			      getRequireInfoObject( impinfo ,ret.name );
			      //console.log(ret.index);
			      onclick_circle(null,ret.index);
			   	
			   }
			   
			   
			   	
			}
			
			
			
		
}

function render(json){	
  force
      .nodes(json.nodes)
      .links(json.links)
      .charge(-100)
      .gravity(0.05)     
      .start();
      
     
     
  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "#fafafa")
      .attr("opacity", "0.2")
      ;

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r", "10")
      .attr("x", -8)
      .attr("id",function(d,i){
        return "#a"+i;
      })
      .attr("data-value",function(d,i){
      	
      	 return d.type;
      	 
      })
      .attr("name",function(d,i){
      	
      	 return d.type;
      	 
      })
      .attr("y", -8)
      .attr("fill",function(d){

        if( d.type == 1) {
          return "#2DF51B";
        } else if( d.type == 2) {
          return "blue";
        } else {
          return "red"
        }
      })
      .attr("opacity","0.2")
      .attr("stroke","black")
      .attr("width", 16)
      .attr("height", 16)
      .attr("cursor","pointer")
      .on("mouseover",function(d,i){
           
           onmouseover_circle(d,i);
        
      })
      .on("mouseout",function(d,i){
          
          onmouseout_circle(d,i);
                  
      })
      .on("click",function(d,i){

          onmouseout_circle(d,i);
          
          getinfo(this,i)      
          onclick_circle(d,i);
          
      });   
         

//13 - 6
  node.append("text")
      .attr("dx", function( d,i ) {
      	return -(d.name.length*13/6);
      })
      .attr("dy", "-1.20em")
      .attr("id",function(d,i){
        return "a"+i;
      })
      .attr("display","none")
      .attr("fill","white")
      .text(function(d) { return d.name });

  force.on("tick", function() {

     
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
}


  
//});



function onmouseover_circle(d,i) {
	
	    
	    var array = d3.selectAll("circle").selectAll("#a"+i);
	    var array1 = array[i].parentNode;
	    
	     array1.setAttribute("opacity","1");
         
                          
        var text = d3.selectAll("text");
        text.selectAll("#a"+i)[i].parentNode.setAttribute("display","block");
        if( array[i].parentNode.getAttribute("r") >= 20) {
                 	
                     text.selectAll(id)[i].parentNode.setAttribute("dy","-2.40em");
                     	
                 } else {
                 	
                 	 text.selectAll(id)[i].parentNode.setAttribute("dy","-1.20em");
                 	
          }

        var json = data;
        for( var j = 0 ; j < json.links.length; j++) {
                  
            if(json.links[j].target.index == i || json.links[j].source.index == i) {
            
                 var target = (json.links[j].target.index == i) ? json.links[j].source.index : json.links[j].target.index;
                 var id = "#a"+target;
                 
                 
                 text.selectAll(id)[target].parentNode.setAttribute("display","block");
                 d3.selectAll(id).attr("opacity","1");
                 
                 if( array[target].parentNode.getAttribute("r") >= 20) {
                 	
                     text.selectAll(id)[target].parentNode.setAttribute("dy","-2.40em");
                     	
                 } else {
                 	
                 	 text.selectAll(id)[target].parentNode.setAttribute("dy","-1.20em");
                 	
                 }
                 
                 
                 
                 
                 
                   
            }
       }
         
        
}


function onmouseout_circle(d,i) {
	
		  var array = d3.selectAll("circle").selectAll("#a"+i);
          var array1 = array[i].parentNode;
         
          var text = d3.selectAll("text");
          text.selectAll("#a"+i)[i].parentNode.setAttribute("display","none");
          text.selectAll("#a"+i)[i].parentNode.setAttribute("dy","-1.20em");
          var json = data;       
          for( var j = 0 ; j < json.links.length; j++) {
            if(json.links[j].target.index == i || json.links[j].source.index == i) {
                 
                 var target = json.links[j].target.index == i ? json.links[j].source.index : json.links[j].target.index;
                 var id = "#a"+target;
                 text.selectAll(id)[target].parentNode.setAttribute("display","none");
                 text.selectAll(id)[target].parentNode.setAttribute("dy","-1.20em");
                 
            }
            
                             

          }
 
	
}


function makecirclesmall() {
	
	d3.selectAll("text").attr("display","none");
	d3.selectAll("circle").attr("opacity","0.2");
	d3.selectAll("circle").attr("r","10");
	
}


function onclick_circle(d,i) {
	
	  makecirclesmall();
	  document.getElementById("intro").style.display = "none";
	  document.getElementById("doc").style.display = "block";
	  
	  var array1 = d3.selectAll("circle").selectAll("#a"+i);
      var array2 = array1[i].parentNode;    
      array2.setAttribute("opacity","1");
      array2.setAttribute("r","20");
          
	       var text = d3.selectAll("text");
           text.selectAll("#a"+i)[i].parentNode.setAttribute("display","block");
          	text.selectAll("#a"+i)[i].parentNode.setAttribute("dy","-2.40em");
           var array = [];
           array.push(i);
           var json = data;
          for( var j = 0 ; j < json.links.length; j++) {
                  
            if(json.links[j].target.index == i || json.links[j].source.index == i) {
            
                 var target = (json.links[j].target.index == i) ? json.links[j].source.index : json.links[j].target.index;
                 var id = "#a"+target;
                 text.selectAll(id)[i].parentNode.setAttribute("display","block");
                 text.selectAll(id)[i].parentNode.setAttribute("dy","-2.40em");
                 array1[target].parentNode.setAttribute("opacity","1");
                 array1[target].parentNode.setAttribute("r","20");
                 text.selectAll(id)[target].parentNode.setAttribute("display","block");
                 text.selectAll(id)[target].parentNode.setAttribute("dy","-2.40em");
                 array.push(j);
                           
		                         
            }
          }
          

      	    force.charge(function(d,k) {
				         	
				         	
				         	if( array.indexOf(k) != -1 ){
				         	    	return -200;
				         	} else {    	
				    		        return -100;
				    		}            	 
		         });
		         
		         
		         force.linkDistance(function(d,k){
		         	
		         	if( array.indexOf(k) != -1 ){
				                    
				                    
				    		    	return 200;
				    } else	{	    	
				    		 return 100;
				    }		 
		         }) ;               
		         
		         force.theta(function(d,k){
		         	
		         	if( array.indexOf(k) != -1 ){
				                    
				                    console.log(i+":"+j+":"+k);
				    		    	return 1;
				    } else	{	    	
				    		 return 0;
				    }
		         	
		         });
		   
      
      
      
      force.start();

	
}


function getinfo(that,no) {
	
	
	var id = that.id;
	//alert();
	var type = that.getAttribute("data-value") ;
	console.log(that);
	var text = d3.selectAll("text").selectAll(id)[no].parentNode.__data__.name;
	var impinfo =  (type == 2) ? info12.nodes.class : ((type == 1) ? info12.nodes.interface : info12.nodes.exception);
	
	console.log(impinfo);
	getRequireInfoObject( impinfo,text );  
	
}


function getRequireInfoObject( impinfo ,text ) {
	
	
	
	impinfo.forEach( function (obj) {
		
		if( obj.name ===  text ) {
			
			console.log(obj);
			renderThisInfo(obj);
			
		}
		
	});
	




	
}



function renderThisInfo( obj ) {
	
	
	document.getElementById("nameOfObj").innerHTML = obj.name;
	document.getElementById("signature").innerHTML = obj.signature;
	document.getElementById("descritption").innerHTML = obj.description;
	
	var constructors = document.getElementById("constructor");
	constructors.innerHTML = "";
	
	
	if( obj.constructors != null) {
		var ulTag = document.createElement("ul");
		for(var j = 0 ; j < obj.constructors.length ;j++) {
		    
		    var constructor = obj.constructors[j];
		    console.log(constructor);
		    var liTag = document.createElement("li");
		    liTag.innerHTML = constructor.signature;
		    liTag.className = "constructor_signature";	
			var ulTag1 = document.createElement("ul");
			var liTag1 = document.createElement("li");
			liTag1.className = "constructor_desciption";
			liTag1.innerHTML = constructor.description;
			ulTag1.appendChild(liTag1);
				
			liTag.appendChild(ulTag1);
			ulTag.appendChild(liTag);
			
		    
		    	
			
		} 
		
		constructors.appendChild(ulTag);
    }
	var methods = document.getElementById("methods");
	methods.innerHTML = "";
	if( obj.methods != null ) {
		ulTag = document.createElement("ul");
		
		
		for(var j = 0 ; j < obj.methods.length ;j++) {
		    
		    var method = obj.methods[j];
		    console.log(method);
		    var liTag = document.createElement("li");
		    liTag.innerHTML = method.signature;
		    liTag.className = "method_signature";	
			var ulTag1 = document.createElement("ul");
			var liTag1 = document.createElement("li");
			liTag1.innerHTML = method.description;
	
			liTag1.className = "method_desciption";
			ulTag1.appendChild(liTag1);
			if( method.exception !== undefined) {
				
				for ( var  i = 0 ; i < method.exception.length ; i++ ){
					
				    liTag1 = document.createElement("li");
				    liTag1.innerHTML = method.exception[i].throws;
				    liTag1.className = "method_exception";	
				    ulTag1.appendChild(liTag1);	
				};
			
		   }	
			liTag.appendChild(ulTag1);
			ulTag.appendChild(liTag);
			
		    
		    	
			
		} 
		
		methods.appendChild(ulTag);
	}
	/**
	 * <li>
     			void destory()
     			 <ul>
     			 	<li>  Called by the servlet container to indicate to a servlet that the servlet is being taken out of service.</li>
     			 	
     			 </ul>
     		</li>
	 */
	
}


function autocompleteIt ( query ) {
	
	
	query = query.toLowerCase();
	var nodes = autocomplete.nodes;
	var ret = -1;
	var index = 9999;
	
	for ( var i = 0 ; i < nodes.length ;i++) {
		
		var node = nodes[i];
		
		var name =  node.name.toLowerCase();
		var ind = name.search(query);
		
	    	
		if( ind > -1 && index > ind ) {
		
		    	
			ret = i;
			index = ind;
			autocomplete_array.push(node.name);
			
		}
	}
	
	
	var obj = new Object();
	obj=nodes[ret];
	obj.index = ret;
	 
	return  ((ret == -1) ? null : nodes[ret]);
	
}

