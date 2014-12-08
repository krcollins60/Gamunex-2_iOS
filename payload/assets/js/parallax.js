///////// PARALLAX MENU ///////////

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Stop animation and return current x position
function stopAnimation(element) {
	var node = $(element)[0];
	var regex = /matrix\(\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*\,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/;
    var transform = window.getComputedStyle(node).webkitTransform;
    var match = regex.exec(transform);
    if(match) {
      var properties = {};
      properties['y'] = Math.round( match[2] ); 
      properties['x'] = Math.round( match[1] );
      node.style['WebkitTransition'] = null;
      $(element).transition({ x : properties.x + "px",  y : properties.y + "px"},0);
    }
    for(var i = 0; i < storeTimerID.length; i+=1) {
    	 window.clearTimeout(storeTimerID[i]);
    }
    storeTimerID = [];
    
    return properties;
};

function stopAnimation2(element) {
	if(element) {
		var node = $(element)[0];
		var transform = getComputedStyle(node).webkitTransform;
		var position = new WebKitCSSMatrix(transform).m41;
		return position;
	}
};


var menuPos = {
	bg : 0,
	menu1 : 0,
	menu2 : 0,
	menu3 : 0
};

function parallaxElement(element, xProp, xPropLink, elementLink, xPropLink2, elementLink2) {
	
	var self = this;
	
	this.element = element;
	this.xProp = xProp;
	this.xPropLink = xPropLink;
	this.elementLink = elementLink;
	this.xPropLink2 = xPropLink2;
	this.elementLink2 = elementLink2;
	this.velocityX = [0];
	this.dragStartX = 0;
	this.dragEndX = 0;
	this.elementPrevPosX = 0;
	this.elementTotalWidth = $(this.element).outerWidth();
	this.elementParentWidth = $(this.element).parent().outerWidth() === 0 ? 1024 : $(this.element).parent().outerWidth();
	
	// get width if element default state is display none
	this.getElementWidth = function() {
		self.elementTotalWidth = $(self.element).outerWidth();
		if (self.elementTotalWidth === 0) {
			if(self.elementParentWidth !== 0) {
				self.elementTotalWidth = self.elementParentWidth;
			}else{
				self.elementTotalWidth = $(self.element).children().outerWidth() * $(self.element).children().length;
			}
		}
	};

	this.getElementWidth();
	
	this.moveElement = function(pos) {
		self.velocityX.push(Math.abs(pos.pxPerSecondX));
		var	currentX = pos.x;
		
		var menuActive = $(self.element).hasClass("active");

		/////////////////////////////////////////////////////////////////////////////////////////
		//////////////// START_DRAG /////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		if(pos.dragState === "START_DRAG" && menuActive) {
			self.getElementWidth();
			
			resetTransitTimers();
			
			//THIS HAS ISSUES
			// var stopPosition1 = stopAnimation2(self.element);
			// var stopPosition2 = stopAnimation2(self.elementLink);
			// var stopPosition3 = stopAnimation2(".background-wall");
 
			// menuPos[self.xProp] = stopPosition1 !== undefined ? stopPosition1 : menuPos[self.xProp];
			// menuPos[self.xPropLink] = stopPosition2 !== undefined ? stopPosition2 : menuPos[self.xPropLink];
			// menuPos.bg = stopPosition3 !== undefined ? stopPosition3 : menuPos.bg;
			
			self.dragStartX = menuPos[self.xProp];

		} // END START_DRAG
		
		/////////////////////////////////////////////////////////////////////////////////////////
		//////////////// END START_DRAG /////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		
		/////////////////////////////////////////////////////////////////////////////////////////
		////////////////////// DRAGGING /////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		if(pos.dragState === "DRAGGING" && menuActive && animationReady) {
			
			if (self.elementTotalWidth === 0) { self.getElementWidth(); }
			
			var elemetDragLengthX = Number(currentX) - Number(self.elementPrevPosX);

			if(self.elementTotalWidth > 1024) {
				menuPos[self.xProp] += elemetDragLengthX;
				if(typeof(menuPos[self.xPropLink]) === "number") { menuPos[self.xPropLink] += elemetDragLengthX / 4; }
				if(typeof(menuPos[self.xPropLink2]) === "number") { menuPos[self.xPropLink2] += elemetDragLengthX / 5; }
				menuPos.bg += elemetDragLengthX / 10;

                function animateDrag() {
    				$(self.element).transition({ x : menuPos[self.xProp] + "px" , queue : false}, 0);
    				$(self.elementLink).transition({ x : menuPos[self.xPropLink] + "px" , queue : false}, 0);
    				$(self.elementLink2).transition({ x : menuPos[self.xPropLink2] + "px" , queue : false}, 0);
    				$(".background-wall").transition({ x : menuPos.bg + "px" , queue : false}, 0);
                }
                
                requestAnimFrame(animateDrag);
			}
		} // END DRAGGING
		
		/////////////////////////////////////////////////////////////////////////////////////////
		//////////////// END DRAGGING ///////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		
		/////////////////////////////////////////////////////////////////////////////////////////
		//////////////// NOT DRAGGING ///////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		if (pos.dragState === "NOT_DRAGGING" && menuActive) {
			
			if(self.elementTotalWidth > 1024) {
			
				self.dragEndX = menuPos[self.xProp];
				var amountScrolledX = self.dragEndX - self.dragStartX;
				var scrollLengthX = Math.ceil(self.velocityX[self.velocityX.length - 2] / 10);
				var timeX = 2000;
	
				if (menuPos[self.xProp] + (scrollLengthX * -1) > ((self.elementTotalWidth - self.elementParentWidth) * -1) && menuPos[self.xProp] + scrollLengthX < 0) {
					
					if(self.dragStartX > self.dragEndX) {
						menuPos[self.xProp] += (scrollLengthX * -1);
						if(typeof(menuPos[self.xPropLink]) === "number") { menuPos[self.xPropLink] += (scrollLengthX * -1) / 4; }
						if(typeof(menuPos[self.xPropLink2]) === "number") { menuPos[self.xPropLink2] += (scrollLengthX * -1) / 5; }
						menuPos.bg += (scrollLengthX * -1) / 10;
					} else {
						menuPos[self.xProp] += scrollLengthX;
						if(typeof(menuPos[self.xPropLink]) === "number") {menuPos[self.xPropLink] += scrollLengthX / 4; };
						if(typeof(menuPos[self.xPropLink2]) === "number") {menuPos[self.xPropLink2] += scrollLengthX / 5; };
						menuPos.bg += scrollLengthX / 10;
					}
					
					$(self.element).transition({ x : menuPos[self.xProp] + "px", queue : false}, timeX, "detail");
					$(self.elementLink).transition({ x : menuPos[self.xPropLink] + "px", queue : false}, timeX, "detail");
					$(self.elementLink2).transition({ x : menuPos[self.xPropLink2] + "px", queue : false}, timeX, "detail");
					$(".background-wall").transition({ x : menuPos.bg + "px", queue : false}, timeX, "detail");
					
				} else { //overscrolled
					
					if(self.dragStartX > self.dragEndX) {
			
						var rightLimit = ((menuPos[self.xProp] + (self.elementTotalWidth - self.elementParentWidth)) * -1);
						menuPos[self.xProp] += Math.ceil(rightLimit);
						if(typeof(menuPos[self.xPropLink]) === "number") { menuPos[self.xPropLink] += Math.ceil(rightLimit) / 4; }
						if(typeof(menuPos[self.xPropLink2]) === "number") { menuPos[self.xPropLink2] += Math.ceil(rightLimit) / 5; }
						menuPos.bg += Math.ceil(rightLimit) / 10;
	
					} else if (self.dragStartX < self.dragEndX) {
						
						if(typeof(menuPos[self.xPropLink]) === "number") { menuPos[self.xPropLink] -= (menuPos[self.xProp] / 4);}
                        if(typeof(menuPos[self.xPropLink2]) === "number") { menuPos[self.xPropLink2] -= (menuPos[self.xProp] / 5);} 
                        menuPos.bg -= (menuPos[self.xProp] / 9.99);
                        menuPos[self.xProp] -= menuPos[self.xProp];

					} else {
						//console.log("no swipe");
					}
					
					$(self.element).transition({ x : menuPos[self.xProp] + "px", queue : false }, timeX, "snap");
					$(self.elementLink).transition({ x : menuPos[self.xPropLink] + "px", queue : false }, timeX, "snap");
					$(self.elementLink2).transition({ x : menuPos[self.xPropLink2] + "px", queue : false }, timeX, "snap");
					$(".background-wall").transition({ x : menuPos.bg + "px", queue : false}, timeX, "snap");
					
				}
	
				self.velocityX = [0];
			
			}

		} // END NOT_DRAGGING

		/////////////////////////////////////////////////////////////////////////////////////////
		//////////////// END NOT DRAGGING ///////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		
		self.elementPrevPosX = currentX;
		
	} // END moveElement
};

function resetTransitTimers() {
    for(var i = 0; i < storeTimerID.length; i+=1) {
        window.clearTimeout(storeTimerID[i]); // reset transit timers
    }
    storeTimerID = [];
};


var zTime = 500;
var animationReady = true;

parallaxElement.prototype.firstNavState = function(subMenu) {
	if(animationReady) {
	    
		animationReady = false;
		
		// menuPos.menu3 = 0;
		// menuPos.menu2 = 0;
		menuPos.menu1 = 0;
		// menuPos.bg = menuPos.menu1 / 10;
		$("#menuFirstLevel .menu-box, #menuSecondLevel .menu-box").transition({opacity : 1}, 0);
		$(".background-wall").transition({x : menuPos.bg + "px"}, zTime, "out");
	    $("#menuFirstLevel").addClass("active").transition({opacity: 1, scale: 1, y : 0 + "px", x: menuPos.menu1 +"px"}, zTime, "out");
	    $("#menuSecondLevel").removeClass("active").transition({opacity: 0, scale: 2, y : 0 + "px"}, zTime, "out");
	    $("#menuThirdLevel").removeClass("active");
	    setTimeout(function(){
	        $(".background-wall, #menuFirstLevel, #menuSecondLevel, #menuThirdLevel").clearQueue();
            animationReady = true;
            $("#menuSecondLevel, #menuThirdLevel, #CIDP-Sub-Menu, #PI-Sub-Menu, #ITP-Sub-Menu").addClass("hide");
            
        },zTime);// use set timeout as callback
        //resetTransitTimers();
    }
};

parallaxElement.prototype.secondNavState = function(subMenu) {
	if(animationReady) {
	    
		animationReady = false; 
		
		//menuPos.menu3 = 0;
		//menuPos.menu2 = 0;
		//menuPos.menu1 = 150; 
		//menuPos.bg = menuPos.menu1 / 10;

		$("#menuSecondLevel, #" + subMenu).removeClass("hide");
		$(".background-wall").transition({x : menuPos.bg + "px"}, zTime, "out");
	    $("#menuFirstLevel").removeClass("active").transition({opacity: 0.6, scale: 0.8, y : -50  + "px",  }, zTime, "out");
	    $("#menuSecondLevel").addClass("active").transition({opacity: 1, scale: 1, y : 0 + "px"}, zTime, "out");
	    $("#menuThirdLevel").removeClass("active").transition({opacity: 0, scale: 2, y : 0 + "px" }, zTime, "out");
	    setTimeout(function(){
	        $(".background-wall, #menuFirstLevel, #menuSecondLevel,  #menuThirdLevel").clearQueue();
            animationReady = true;
            $("#menuThirdLevel, .thirdtier").addClass("hide");
        },zTime);// use set timeout as callback
        //resetTransitTimers();
    }
};

parallaxElement.prototype.thirdNavState = function(subMenu) {

	if(animationReady) {
	    
		animationReady = false;
		
		//menuPos.menu3 = 0;
		//menuPos.menu2 = 75;
		//menuPos.menu1 = 150;
		//menuPos.bg = menuPos.menu1 / 10;
		
		$("#menuThirdLevel, #" + subMenu).removeClass("hide");
	    $("#menuFirstLevel").removeClass("active").transition({opacity: 1, scale: 0.6, y : -100  + "px" }, zTime, "out");
	    $("#menuSecondLevel").removeClass("active").transition({opacity: 1, scale: 0.8, y : -50 + "px"}, zTime, "out");
	    $("#menuThirdLevel").addClass("active").transition({opacity: 1, scale: 1, x : centerSubMenu("#menuThirdLevel") + "px", y : 0 + "px"}, zTime, "out");
	    setTimeout(function(){
	        $(".background-wall, #menuFirstLevel, #menuSecondLevel, #menuThirdLevel").clearQueue();
            animationReady = true;
        },zTime);// use set timeout as callback
        //resetTransitTimers();
    }
};


function centerSubMenu(subMenu) {
	var subMenuWidth = $(subMenu).outerWidth();
	var offset = 0;
	if(subMenuWidth < 1024) {
		offset = (1024 - subMenuWidth) / 2;
	}
	return offset;
};

// parallax navigation
var homeMenuStoryFlow;

function firstTierMenuPress(cssQuery) {
    
    if(animationReady){
        
    	var target = $(cssQuery.target).attr("id");
    	var rel = $(cssQuery.target).attr("rel");
    	
    	var menu1Active = $("#menuFirstLevel").hasClass("active");
    	var menu2Active = $("#menuSecondLevel").hasClass("active");
    	var menu3Active = $("#menuThirdLevel").hasClass("active");
    	
    	
    	if( $(cssQuery.target).attr("rel") === "CIDP-Sub-Menu" ) {
            homeMenuStoryFlow = "CIDP";
        } else if( $(cssQuery.target).attr("rel") === "PI-Sub-Menu" ) {
            homeMenuStoryFlow = "PI";
        } else if( $(cssQuery.target).attr("rel") === "ITP-Sub-Menu" ) {
            homeMenuStoryFlow = "ITP";
        } else {
            // do nothing
        }
    
    	if(menu1Active) {
    	    
    		dragTier2Navboxes.secondNavState(rel);
    
    		$("#menuFirstLevel .menu-box").transition({opacity : 0.5}, 0, function(){
               if(target === "CIDP_Cover") {
                     $("#selectCIDP").transition({opacity : 1}, 0);
                } else {
                    $(cssQuery.target).parent().transition({opacity : 1}, 0);
                }
            });
    
    	} else if(menu2Active) {
    	    
    		dragTier2Navboxes.firstNavState();
    		$("#menuFirstLevel .menu-box, #menuSecondLevel .menu-box").transition({opacity :1}, 0);
    		
    	} else {
    		dragTier2Navboxes.secondNavState();
    		$("#menuSecondLevel .menu-box").transition({opacity : 1}, 0);
    	}
	
	};
	
};

function secondTierMenuPress(cssQuery) {
    
    if(animationReady){
    	var target = $(cssQuery.target) /// add menu selection fade
    	var rel = $(cssQuery.target).attr("rel");
    	
    	//console.log(target)
    	
    	var menu1Active = $("#menuFirstLevel").hasClass("active");
    	var menu2Active = $("#menuSecondLevel").hasClass("active");
    	var menu3Active = $("#menuThirdLevel").hasClass("active");
    
    	if(menu2Active) {
    	    
    	    $("#menuSecondLevel .menu-box").transition({opacity : 0.5}, 0, function() {
    	        $(cssQuery.target).parent().transition({opacity : 1}, 0);
    	    });
    
    		var hasSub = $(cssQuery.target).hasClass("submenu") === false ? $(cssQuery.target).parents(".submenu").length > 0 : $(cssQuery.target).hasClass("submenu");
    		
    		if(hasSub){
    			dragTier2Navboxes.thirdNavState(rel);
    		}else{
    			gotoPageWithSection(rel, homeMenuStoryFlow);
    		}
    			
    	} else {
    	    $("#menuSecondLevel .menu-box").transition({opacity : 1}, 0);
    		dragTier2Navboxes.secondNavState();
    	}		
	}					
};

function thirdTierMenuPress(cssQuery) {
    if(animationReady){
    	var page = $(cssQuery.target).attr("rel");
    	gotoPageWithSection(page, homeMenuStoryFlow);
	}
};


function currentMenuSelected(cssQuery) { 
    if($(cssQuery.target).hasClass("menu-box")){
        $(cssQuery.target).addClass("menu-box-selected");
    } else {
        $(cssQuery.target).parents(".menu-box").addClass("menu-box-selected");
    }
}

// parallax drag setup

//var dragTier1Navboxes;
var dragTier2Navboxes;
var dragTier3Navboxes;


$(document).ready(function(){ //DragElement("element name", this property, link property, link element, link property2, link element2);
	//dragTier1Navboxes = new parallaxElement("#menuFirstLevel", "menu1", "", "");
	dragTier2Navboxes = new parallaxElement("#menuSecondLevel", "menu2", "menu1", "#menuFirstLevel");
	dragTier3Navboxes = new parallaxElement("#menuThirdLevel", "menu3", "menu2", "#menuSecondLevel", "menu1", "#menuFirstLevel");
});
