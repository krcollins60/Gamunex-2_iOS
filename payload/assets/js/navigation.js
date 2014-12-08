// last page array
var pageTracker = [];

// get last page swiped off of and reset it
function resetLastPage() {
    var lastPage, checkPageName;
    pageTracker.unshift(Status.currentPage);
    if (pageTracker[1]) {
        lastPage = pageTracker[1];
    }

    switch(lastPage) {

        case "CIDP_2_1_DISABILITY":
            CIDP_2_1_reset();
            break;
        case "CIDP_2_3_TWO_COURSES":
            resetCIDP_2_3();
            break;
        case "CIDP_2_2_GRIP_STRENGTH":
            resetCIDP_2_2();
            break;
        case "CIDP_2_4_MAINTENANCE_THERAPY":
            resetCIDP_2_4();
            break;
        case "SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW":
            SHARED_4_1Reset();
            break;

        default:
    }
    pageTracker.splice(2,1);
};

// goto home page
function gotoHomePage() {
    if (Status.currentPage !== "HOME_0_0") {
        slideNavigationDown();
        gotoPageWithSection("HOME_0_0", "HomeNav");
        dragTier2Navboxes.firstNavState();
        $("#container").transition({
            opacity : 0
        }, 600, 'out', function(){
            $("#container").transition({
                opacity : 1
            }, 300, 'out');
        });
    }
};

// SWIM LANE NAVIGATION
var swimLaneActive = false;

function toggleSwimLaneNav() {

 if(Status.currentSection == "CIDP") {
  showCIDPSwim();
    }
    if(Status.currentSection == "PI") {
   showPISwim();
    }
    if(Status.currentSection == "ITP") {
    showITPSwim();
    }
   
    if (swimLaneActive) {// if its open then close it
        $(".ancillary-storyflow-button, .ancillary-storyflow-button-R, .ancillary-storyflow-button-L").transition({ opacity : 0 , queue: false}, 300, "out", function() {
            $(".swim-lane-navigation").removeClass("swim-lane-nav-open").transition({ opacity : 0 , queue: false}, 0, "out", function() {
                $(".swim-lane-navigation").addClass("hide");
                swimLaneActive = false;
                slideNavigationDown();
            });
        });
        
    } else {// if its closed then open it
        
        $(".swim-lane-navigation").removeClass("hide").addClass("swim-lane-nav-open").transition({ opacity : 1 , queue: false}, 300, "out", function() {
            $(".ancillary-storyflow-button, .ancillary-storyflow-button-R, .ancillary-storyflow-button-L").transition({ opacity : 1 , queue: false}, 300, "out");
        });
        swimLaneActive = true;
        slideNavigationDown();
        disableSwiping();
    }
};

var navActive = false;

// HEADER NAVIGATION SLIDER
function slideNavigationDown(element) {
    if (Status.currentSection !== "HomeNav") {
        $(".footer-navigation").transition({ y : "20px", queue: false }, 500, "out", function(){
            $(this).addClass("hide");
        });
        
        if (!swimLaneActive && !modalWindowActive) {
            slideAncillaryNavUp(); 
            enableSwiping();
        }
        resourcesActive = false;
        navActive = false;
    }
};

// FOOTER NAVIGATION SLIDER
var resourcesActive = false;
function slideNavigationUp(element) {
    if (Status.currentSection !== "HomeNav" && !swimLaneActive && !modalWindowActive) {
        $(".footer-navigation").removeClass("hide").transition({y : "-165px", queue: false}, 500, "out");
        if (element === "resources") {
        	resourcesActive = true;
            $("#footerTier1, #footerTier2, #footerTier3, .footer-nav-dot").addClass("hide");
            $("#footerResources").removeClass("hide");
        } else {
        	if (resourcesActive == false) {
	            $("#footerResources").addClass("hide");
	            $("#footerTier1, #footerTier2, #footerTier3, .footer-nav-dot").removeClass("hide");
            }
        }
        disableSwiping();
        slideAncillaryNavDown();
        navActive = true;
    }
};

function slideAncillaryNavDown() {
    $(".ancillary-navigation").transition({
        y : "45px",
        queue: false
    }, 500, "out");
};

function slideAncillaryNavUp() {
    $(".ancillary-navigation").transition({
        y : "0px",
        queue: false
    }, 500, "out");
};


var footerMenuActive = 1;
function footerMenuDown() {
    if (footerMenuActive < 3) {
        footerMenuActive++;
    }
    footerMenuSelector();
};

function footerMenuUp() {
    if (footerMenuActive > 1) {
        footerMenuActive--;
    }
    footerMenuSelector();
};

function footerMenuSelector() {
    if (footerMenuActive === 1) {
        teir1FooterMenuStrip();
    } else if (footerMenuActive === 2) {
        teir2FooterMenuStrip();
    } else {
        teir3FooterMenuStrip();
    }
}

// shows / hides footer navigation strips
function teir1FooterMenuStrip() {
    $("#footerTier1, #footerTier2, #footerTier3").transition({
        y : "0px",
        queue: false
    }, 400, "in-out");
    $("#tier1FooterMenu").addClass("selected");
    $("#tier2FooterMenu").removeClass("selected");
    $("#tier3FooterMenu").removeClass("selected");
};

// shows / hides footer navigation strips
function teir2FooterMenuStrip() {
    $("#footerTier1, #footerTier2, #footerTier3").transition({
        y : "-146px",
        queue: false
    }, 400, "in-out");
    $("#tier1FooterMenu").removeClass("selected");
    $("#tier2FooterMenu").addClass("selected");
    $("#tier3FooterMenu").removeClass("selected");
};

function teir3FooterMenuStrip() {
    $("#footerTier1, #footerTier2, #footerTier3").transition({
        y : "-312px",
        queue: false
    }, 400, "in-out");
    $("#tier1FooterMenu").removeClass("selected");
    $("#tier2FooterMenu").removeClass("selected");
    $("#tier3FooterMenu").addClass("selected");
};

function showResourceNav() {
    slideNavigationUp("resources");
};

function navigationButtonHandler(cssQuery) {
    //console.log(cssQuery.target)
    var page = $(cssQuery.target).attr("rel");

    var storyFlow = "";
    if ($(cssQuery.target).hasClass("CIDP")) {
        storyFlow = "CIDP";
    } else if ($(cssQuery.target).hasClass("PI")) {
        storyFlow = "PI";
    } else if ($(cssQuery.target).hasClass("ITP")) {
        storyFlow = "ITP";
    }
    //var storyFlow = "";
    if (!page) {
        page = $(cssQuery.target).parent().attr("rel");
    }
    gotoPageWithSection(page, storyFlow);

    var swimLane = $(cssQuery.target).parents(".swim-lane");
    
    if (swimLane.length > 0) {
        toggleSwimLaneNav();
    } else {
        slideNavigationDown();
    }
};

function resourceButtonHandler(cssQuery) {
    //console.log(cssQuery.target);
    var modal = "#" + $(cssQuery.target).attr("rel");
    if (modal) {
        openModalWindow(modal);
          if (Status.currentPage == "CIDP_0_2_CONCEPT_PAGE") {
        $(".page-content").addClass("hide");
        }
         if (Status.currentPage == "PI_0_2_CONCEPT_PAGE") {
        $(".page-content").addClass("hide");
        }
        if (Status.currentPage == "ITP_0_2_CONCEPT_PAGE") {
        $(".page-content").addClass("hide");
        }
    }
    
    // show/hide text on one modal, not the other
    if (Status.currentPage == "CIDP_2_5_QOL_24_WEEKS") {
	    $(".showHide").addClass("hide");
    } else {
	    $(".showHide").removeClass("hide");
    }
    
    
};

var modalWindowActive = false;
function openModalWindow(modal) {
    $(".overlay, " + modal).removeClass("hide");
    modalWindowActive = true;
    disableSwiping();    
};

function closeModalWindow() {
    $(".scrolable-content").scrollTop(0);
    $(".overlay, .modal").addClass("hide");
    modalWindowActive = false;
    if(swimLaneActive){
        toggleSwimLaneNav();
    } else {
        slideNavigationDown();
    }
     if (Status.currentPage == "CIDP_0_2_CONCEPT_PAGE") {
          console.log("fired");
        $(".page-content").removeClass("hide");
        }
         if (Status.currentPage == "PI_0_2_CONCEPT_PAGE") {
        $(".page-content").removeClass("hide");
        }
        if (Status.currentPage == "ITP_0_2_CONCEPT_PAGE") {
        $(".page-content").removeClass("hide");
        }
};

// page history tracker (back / foward buttons)
var historyMomoryCap = 50;
var pageHistoryHolder = [];
var currentPageHistoryViewed = 0;
var historyButtonPress = false;

function pageHistory() {

    if (currentPageHistoryViewed > 1) {
        $("#ancillary-back-button span, .left-history-arrow").transition({
            opacity : 1
        }, 100);
    } else {
        $("#ancillary-back-button span, .left-history-arrow").transition({
            opacity : 0.5
        }, 100);
    }

    if (currentPageHistoryViewed < pageHistoryHolder.length) {
        $("#ancillary-forward-button span, .right-history-arrow").transition({
            opacity : 1
        }, 100);
    } else {
        $("#ancillary-forward-button span, .right-history-arrow").transition({
            opacity : 0.5
        }, 100);
    }

    if(historyButtonPress === false) {
        pageHistoryHolder.push({currentPage : Status.currentPage, currentSection : Status.currentSection});
        currentPageHistoryViewed = pageHistoryHolder.length;
        pageHistoryHolder.splice(historyMomoryCap,1);
    }
    historyButtonPress = false;
};

function getPageStoryFlow(currentPage) {

    var storyFlow = "";
    switch(Status.currentPage.charAt(0)) {
        case "C":
            storyFlow = "CIDP";
            break;

        case "P":
            storyFlow = "PI";
            break;

        case "I":
            storyFlow = "ITP";
            break;

    }
    return storyFlow;
}

function historyGoToNextPage() {
    if(currentPageHistoryViewed < pageHistoryHolder.length) {
        historyButtonPress = true;
        gotoPageWithSection(pageHistoryHolder[currentPageHistoryViewed].currentPage, pageHistoryHolder[currentPageHistoryViewed].currentSection);
        currentPageHistoryViewed += 1;
    }
};

function historyGoToPreviousPage() {
    if(currentPageHistoryViewed > 1){
        historyButtonPress = true;
        gotoPageWithSection(pageHistoryHolder[currentPageHistoryViewed - 2].currentPage, pageHistoryHolder[currentPageHistoryViewed - 2].currentSection);
        currentPageHistoryViewed -= 1;
    }
};

function DragElement(element, x, y, accelerate, leftOnly, rightOnly, storyFlow) {
    
    var self = this;
    
    this.element = element;
    this.accelerate = accelerate;
    this.leftOnly = leftOnly;
    this.rightOnly = rightOnly;
    this.storyFlow = storyFlow;
    this.XActive = x;
    this.YActive = y;
    this.velocityX = [0];
    this.velocityY = [0];
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.startPos = 0;
    this.dragEndX = 0;
    this.dragEndY = 0;
    this.elementPosX = 0;
    this.elementPosY = 0;
    this.scroll = true;
    this.elementPrevPosX = 0;
    this.elementPrevPosY = 0;
    this.elementTotalWidth = $(this.element).outerWidth();
    this.elementTotaltHeight = $(this.element).outerHeight();
    this.elementParentWidth = $(this.element).parent().outerWidth() === 0 ? 1024 : $(this.element).parent().outerWidth();
    this.elementParentHeight = $(this.element).parent().outerHeight() === 0 ? 768 : $(this.element).parent().outerHeight();
    
    // used to get width if element default state is display none
    this.getElementWidth = function() {
        self.elementTotalWidth = $(self.element).outerWidth();
        if (self.elementTotalWidth === 0) {
            if(self.elementParentWidth !== 0) {
                self.elementTotalWidth = self.elementParentWidth;
            }else{
                self.elementTotalWidth = $(self.element).children().outerWidth() * $(self.element).children().length;
            }
            //$(self.element).css("width", self.elementTotalWidth);
        }
    };
    
    // used to get height if element default state is display none
    this.getElementHeight = function() {
        self.elementTotaltHeight = $(self.element).outerHeight();
        if (self.elementTotaltHeight === 0) {
            if(self.elementParentHeight !== 0) {
                self.elementTotaltHeight = self.elementParentHeight;
            } else {
                self.elementTotaltHeight = $(self.element).children().outerHeight() * $(self.element).children().length;
            }
            //$(self.element).css("height", self.elementTotaltHeight);
        }
    };
    
    this.getElementWidth();
    this.getElementHeight();

    this.moveElement = function(pos) {
        
        document.onscroll = function(){console.log("scroll")}
        
        self.velocityX.push(Math.abs(pos.pxPerSecondX));
        self.velocityY.push(Math.abs(pos.pxPerSecondX));
        
        var currentX = pos.x;
        var currentY = pos.y;
        
        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////// START_DRAG /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        
        if(pos.dragState === "START_DRAG") {
            
            var stopPosition = stopAnimation(self.element);
            
            self.elementPrevPosX = stopPosition !== undefined ? stopPosition.x : currentX;
            self.elementPrevPosY = stopPosition !== undefined ? stopPosition.y : currentY;
            self.dragStartX = self.elementPosX;
            self.dragStartY = self.dragStartY;
            
            self.startPos = pos.x;
            
        } // END START_DRAG
        
        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////// END START_DRAG /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        
        if(!self.leftOnly) {
            if(self.startPos - currentX > 0) { // get direction
                self.scroll = false;
            } else {
                self.scroll = true;
            }
        }
        
        
        
        if(!self.rightOnly) {
            if(self.startPos - currentX < 0) { // get direction
                self.scroll = false;
                
            } else {
               self.scroll = true;
            }
        }
        
        // if(!self.accelerate) {
//                     
            // if(self.elementPosX <= (self.elementTotalWidth - 1024) * -1) {
                // self.elementPosX = (self.elementTotalWidth - 1024) * -1;
            // } else if(self.elementPosX >= 0) { 
//                  
                    // self.elementPosX = 0;
//                  
            // } else {
//                 
            // }
//             
            // if(self.elementPosY <= (self.getElementHeight - 768) * -1) {
                // self.elementPosY = (self.getElementHeight - 768) * -1;
            // } else if(self.elementPosY >= 0) { 
//                  
                    // self.elementPosY = 0;
//                  
            // } else {
//                 
            // }
        // }
        /////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// DRAGGING /////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////

        if(pos.dragState === "DRAGGING" && !navActive && self.scroll && (Status.currentSection === self.storyFlow || self.storyFlow === "all")) {
            
            if(self.XActive) {
                
                if (self.elementTotalWidth === 0) { self.getElementWidth(); }
                var elemetDragLengthX = Number(currentX) - Number(self.elementPrevPosX);
                self.elementPosX += elemetDragLengthX;
                $(self.element).transition({ x : self.elementPosX + "px" }, 0);
            }
            
            if(self.YActive) {
                
                if (self.elementTotaltHeight === 0) { self.getElementHeight(); }
                var elemetDragLengthY = Number(currentY) - Number(self.elementPrevPosY);
                self.elementPosY += elemetDragLengthY;
                
                $(self.element).transition({ y : self.elementPosY + "px" }, 0);
            }

        } // END DRAGGING
        
        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////// END DRAGGING ///////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        
        
        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////// NOT DRAGGING ///////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        
        if (pos.dragState === "NOT_DRAGGING" && !navActive && self.scroll && (Status.currentSection === self.storyFlow || self.storyFlow === "all")) {
            
            self.dragEndX = self.elementPosX;
            self.dragEndY = self.elementPosY;
            
            var amountScrolledX = self.dragEndX - self.dragStartX;
            var amountScrolledY = self.dragEndY - self.dragStartY;
            var scrollLengthX = Math.ceil(self.velocityX[self.velocityX.length - 2] / 10);
            var scrollLengthY = Math.ceil(self.velocityY[self.velocityY.length - 2] / 10);
            var timeX = 1300 - scrollLengthX;
            var timeY = 1300 - scrollLengthY;
            
            if(self.XActive && self.accelerate) {// acceleration
                if (self.elementPosX + (scrollLengthX * -1) > ((self.elementTotalWidth - self.elementParentWidth) * -1) && self.elementPosX + scrollLengthX < 0) {
                    if(self.dragStartX > self.dragEndX) {
                        self.elementPosX += (scrollLengthX * -1);
                    } else {
                        self.elementPosX += scrollLengthX;
                    }
                    $(self.element).transition({ x : self.elementPosX + "px", queue : false}, timeX, "out");
                } else { //overscrolled
                    if(self.dragStartX > self.dragEndX) {
                        self.elementPosX += ((self.elementPosX + (self.elementTotalWidth - self.elementParentWidth)) * -1);
                    } else if (self.dragStartX < self.dragEndX) {
                        self.elementPosX -= self.elementPosX;
                    } else {
                        console.log("no swipe");
                    }
                    $(self.element).transition({ x : self.elementPosX + "px", queue : false}, timeX, "snap");
                }
            } // END IF
            if(self.YActive && self.accelerate) {
                if (self.elementPosY + (scrollLengthY * -1) > ((self.elementTotaltHeight - self.elementParentHeight) * -1) && self.elementPosY + scrollLengthY < 0) {
                    if(self.dragStartY > self.dragEndY) {
                        self.elementPosY += (scrollLengthY * -1);
                    } else {
                        self.elementPosY += scrollLengthY;
                    }
                    $(self.element).transition({ y : self.elementPosY + "px", queue : false}, timeY, "out");
                } else {
                    if(self.dragStartY > self.dragEndY) {
                        self.elementPosY += ((self.elementPosY + (self.elementTotaltHeight - self.elementParentHeight)) * -1);
                    } else if (self.dragStartY < self.dragEndY) {
                        self.elementPosY -= self.elementPosY;
                    }else{
                        console.log("no swipe");
                    }
                    $(self.element).transition({ y : self.elementPosY + "px", queue : false}, timeY, "snap");
                }
            } // END IF
            
            self.velocityX = [0];
            self.velocityY = [0];
            
            $(self.element).clearQueue();
            
        } // END NOT_DRAGGING
        
        if (pos.dragState === "NOT_DRAGGING") {    
            normalizedAngle = Math.sin(pos.startAngle)
            if ((self.startPos - currentX > 0) && (normalizedAngle > -.8 && normalizedAngle < .8)) {
                gotoNextPage();
                console.log("gotoNextPage")
            }
            if((self.startPos - currentX < 0) && (normalizedAngle > -.8 && normalizedAngle < .8)) {
                gotoPreviousPage();
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////// END NOT DRAGGING ///////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        
        self.elementPrevPosX = currentX;
        self.elementPrevPosY = currentY;

    } // END moveElement
    
};
//DragElement("element", allow X = T/F, allow Y = T/F, accelerate, left, right, storyFlow);

// swimlane drag setup
var dragSwimLaneX;
var dragSwimLaneX2;
var dragSwimLaneX3;
var dragResourcesLane;
var efficacyLane;

// End Of Flow Bounce
var CIDPStartPage;
var CIDPEndPage;
var PIStartPage;
var PIEndPage;
var ITPStartPage;
var ITPEndPage;

$(document).ready(function() {//DragElement("element", allow X = T/F, allow Y = T/F, accelerate, left, right, storyFlow);
    dragSwimLaneX = new DragElement("#swim-lane-container-1", true, false, true, true, true, "all");
    dragSwimLaneX2 = new DragElement("#swim-lane-container-2", true, false, true, true, true, "all");
    dragSwimLaneX3 = new DragElement("#swim-lane-container-3", true, false, true, true, true, "all");
    dragResourcesLane = new DragElement(".resource-lane", false, true, true, true, true, "all");
    efficacyLane = new DragElement(".efficacy-lane", false, true, true, true, true, "all");
    
    // End Of Flow Bounce
    CIDPStartPage = new DragElement("#CIDP_0_1_CHALLENGER_QUESTIONS_slideActive", true, false, true, false, true, "CIDP");
    CIDPEndPage = new DragElement("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", true, false, true, true, false, "CIDP");
    PIStartPage = new DragElement("#PI_0_2_CONCEPT_PAGE_slideActive", true, false, true, false, true, "PI");
    PIEndPage = new DragElement("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", true, false, true, true, false, "PI");
    ITPStartPage = new DragElement("#ITP_0_2_CONCEPT_PAGE_slideActive", true, false, true, false, true, "ITP");
    ITPEndPage = new DragElement("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", true, false, true, true, false, "ITP");
});

// CIDP_2_1_walkingman
var gifAnimationReady = false;
function CIDP_2_1_walkingman() {
    $("#CIDP-2-1-graph-gray-bar").transition({
        height : "95px"
    }, 500, "out");
    $("#CIDP-2-1-graph-green-bar").transition({
        height : "211px"
    }, 500, "out", function() {
        gifAnimationReady = true;
        $("#CIDP-2-1-standingman-static-grey, #CIDP-2-1-standingman-static, #CIDP-2-1-graph-green-bar .bar-number, #CIDP-2-1-graph-gray-bar .bar-number").removeClass("hide").transition({
            opacity : 1
        }, 500, function() {
            $("#CIDP-2-1-standingman-static, #CIDP-2-1-standingman-static-grey").transition({
                queue: false,
                delay : 1000, 
                opacity : 0
            }, 500, function() {
                if(gifAnimationReady) {
                    $(this).addClass("hide");
                    $("#CIDP-2-1-walkingman-animated, #CIDP-2-1-walkingman-static-grey").removeClass("hide").transition({
                        queue: false,
                        opacity : 1
                    }, 500);
                }
            });
        });
    });
};

function CIDP_2_1_reset() {
    gifAnimationReady = false;
    $("#CIDP-2-1-walkingman-static-grey, #CIDP-2-1-standingman-static, #CIDP-2-1-walkingman-animated, #CIDP-2-1-graph-green-bar .bar-number, #CIDP-2-1-graph-gray-bar .bar-number").addClass("hide").transition({
        queue: false,
        opacity : 0
    }, 0);
    $("#CIDP-2-1-graph-gray-bar, #CIDP-2-1-graph-green-bar").transition({
        queue: false,
        height : "0px"
    }, 0);
};
// END CIDP_2_1_walkingman

//CIDP_2_3_TWO_COURSES INTERACTION
var id;
var CIDP_2_3_Ready = true;
function CIDP_2_3_TWO_COURSES(cssQuery) {
 $("#week-3-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide");
    $("#week-3-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 1});
    id = cssQuery.target.id;
    
    if (Status.currentPage === "CIDP_2_3_TWO_COURSES" && CIDP_2_3_Ready) {
    $("#week-3-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide");
    $("#week-3-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 1});
        CIDP_2_3_Ready = false;
        if (id === "course1") {
            
    //trackInteraction('CIDP_2_3_TWO_COURSES_Start');
            $("#CIDP-2-3-callout2, #CIDP-2-3-callout3,  #CIDP-2-3-callout4, #CIDP-2-3-callout5").transition({ opacity : 0, queue : false }, 200);
            
            $("#CIDP-2-3-chart").css({ background : "url(assets/images/2.3_graph_c1.png)"});
            
            $("#week-3-bar").transition({height : "90px", queue : false}, 500, "out", function() {
                $("#CIDP-2-3-callout1").removeClass("hide").transition({ opacity : 1, queue : false }, 200);
                $("#week-3-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide");
                $("#week-3-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 1});
                CIDP_2_3_Ready = true;
            });
            
            $("#week-6-bar .CIDP-2-3-chart-bar-numbers, #max-week-6-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 0, queue : false}, 0, "out");
            $("#week-6-bar").transition({ height : "0px", queue : false}, 0, "out");
            $("#max-week-6-bar").transition({ height : "0px", queue : false }, 0, "out");
            
            $("#week-24-bar .CIDP-2-3-chart-bar-numbers, #max-week-24-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 0, queue : false}, 0, "out");
            $("#week-24-bar").transition({ height : "0px", queue : false }, 0, "out");
            $("#max-week-24-bar").transition({ height : "0px", queue : false }, 0, "out");
            
        } else if (id === "course2") {
    //trackInteraction('CIDP_2_3_TWO_COURSES_Start');
            
            $("#CIDP-2-3-callout1, #CIDP-2-3-callout2, #CIDP-2-3-callout4, #CIDP-2-3-callout5").transition({opacity : 0, queue : false}, 200);
            $("#CIDP-2-3-chart").css({background : "url(assets/images/2.3_graph_c2.png)"});

            $("#week-6-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 1, queue : false}, 200, "out");
            $("#week-6-bar").transition({height : "185px", queue : false}, 500, "out", function() {
                $("#CIDP-2-3-callout3").removeClass("hide").transition({ opacity : 1 , queue : false}, 200);
                CIDP_2_3_Ready = true;
            });
            
            $("#week-24-bar .CIDP-2-3-chart-bar-numbers, #max-week-24-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 0, queue : false}, 0, "out");
            $("#week-24-bar").transition({ height : "0px", queue : false }, 0, "out");
            $("#max-week-24-bar").transition({ height : "0px" , queue : false}, 0, "out");
            
        } else {
    //trackInteraction('CIDP_2_3_TWO_COURSES_Start');
            
            
            
            $("#CIDP-2-3-callout1, #CIDP-2-3-callout2, #CIDP-2-3-callout3, #CIDP-2-3-callout4").transition({ opacity : 0 , queue : false}, 0);
            $("#CIDP-2-3-chart").css({ background : "url(assets/images/2.3_graph_c3.png)" });

            $("#week-24-bar .CIDP-2-3-chart-bar-numbers").transition({ opacity: 1, queue : false}, 200, "out");
            $("#week-24-bar").transition({ height : "185px", queue : false }, 500, "out", function() {
                //$("#CIDP-2-3-callout5").removeClass("hide").transition({opacity : 1},200);
                CIDP_2_3_Ready = true;
            });
            
        }
    }
};

var interacted = false;
function trackVisit() {
    interacted = false;
    //alert('pageVisit: ' + Status.currentPage);
    //commitMiscMetric('pageVisited', Status.currentPage);
}

function trackInteraction(name, data) {
    if(interacted)
        return;
    interacted = true;
    //alert('interacted');
    //console.log(data);
    commitMiscMetric('interaction', Status.currentPage+","+name+","+data);
}

function CIDP_2_3_TWO_COURSES_Start() {
    var cssQuery = {
        target : {
            id : "course1"
        }
    };
    CIDP_2_3_TWO_COURSES(cssQuery);
};

function CIDP_2_3_MAX() {
    //trackInteraction('CIDP_2_3_TWO_COURSES_Start');
    if (id === "course1") {
        
        $("#max-week-3-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide").transition({ opacity: 1, queue : false}, 200, "out");
        $("#max-week-3-bar").transition({ height : "30px"}, 500, "out", function() {
            $("#CIDP-2-3-callout2").removeClass("hide").transition({ opacity : 1, queue : false }, 200);
            $("#CIDP-2-3-callout1").removeClass("hide").transition({ opacity : 0, queue : false }, 200);

        });
    } else if (id === "course2") {

        $("#max-week-6-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide").transition({ opacity: 1, queue : false}, 200, "out");
        $("#max-week-6-bar").transition({ height : "113px" }, 500, "out", function() {
            $("#CIDP-2-3-callout4").removeClass("hide").transition({ opacity : 1, queue : false }, 200);
            $("#CIDP-2-3-callout3").removeClass("hide").transition({ opacity : 0, queue : false }, 200);

        });
        
    } else {
        $("#max-week-24-bar .CIDP-2-3-chart-bar-numbers").removeClass("hide");
        //$("#max-week-24-bar").transition({ height : "185px" }, 500, "out", function() {
            $("#CIDP-2-3-callout5").removeClass("hide").transition({ opacity : 1, queue : false }, 200);

        //});
    }
};
function resetCIDP_2_3() {
    $("#CIDP-2-3-chart").css({
        background : "url(assets/images/2.3_graph_c1.png)"
    });
    $("#week-3-bar, #max-week-3-bar, #week-6-bar, #max-week-6-bar, #week-24-bar, #max-week-24-bar").transition({
        height : "0px", 
        queue : false
    }, 0);
    $("#CIDP-2-3-callout1, #CIDP-2-3-callout2, #CIDP-2-3-callout3, #CIDP-2-3-callout4, #CIDP-2-3-callout5").addClass("hide").transition({
        opacity : 0,
        queue : false
    }, 0);
};
//END CIDP_2_3_TWO_COURSES INTERACTION

// CIDP_1_3_SIGNS_SYMPTOMS INTERACTION
function show_SignsAndSymptoms() {
    $("#TreatableNeuropathy-Toggle").addClass("hide");
    $("#SignsAndSymptoms-Toggle").removeClass("hide");
    $("#select_SignsAndSymptoms").removeClass("global-button-inactive").addClass("global-button-active");
    $("#select_TreatableNeuropathy").removeClass("global-button-active").addClass("global-button-inactive");
};
function show_TreatableNeuropathy() {
    $("#SignsAndSymptoms-Toggle").addClass("hide");
    $("#TreatableNeuropathy-Toggle").removeClass("hide");
    $("#select_SignsAndSymptoms").removeClass("global-button-active").addClass("global-button-inactive");
    $("#select_TreatableNeuropathy").removeClass("global-button-inactive").addClass("global-button-active");
};
// END CIDP_1_3_SIGNS_SYMPTOMS INTERACTION

//CIDP_2_1_DISABILITY INTERACTION
// function show_CIDP_2_1_INCAT() {
// $("#CIDP-2-1-modal").removeClass("hide");
// };

// function show_CIDP_2_1_study() {
// $("#CIDP-2-1-2-modal").removeClass("hide");
// };

function show_CIDP_2_2_study() {
    $("#CIDP-2-2-modal").removeClass("hide");
};

function show_CIDP_2_3_study() {
    $("#CIDP-2-3-modal").removeClass("hide");
};
//END CIDP_2_1_DISABILITY INTERACTION

//CIDP_2_2_GRIP_STRENGTH INTERACTION
function CIDP_2_2_GRIP_STRENGTH_Start() {
    $(".CIDP_2_2_BAR p").transition({
        delay : 500, opacity : 1
    }, 500);
    
    $("#gamunex_dominant").transition({
        height : "190px"
    }, 1000, "out");
    
    $("#placebo_dominant").transition({
        height : "20px"
    }, 1000, "out");
    
    $("#gamunex_nondominant").transition({
        height : "190px"
    }, 1000, "out");
    
    $("#placebo_nondominant").transition({
        height : "60px"
    }, 800, "out", function() {
        $("#improvement-bar").transition({
            queue: false,
            opacity : 1
        }, 200, "out", function() {
            $("#chart-arrow").transition({
                queue: false,
                opacity : 1
            }, 400);
            $("#hand-animation-1, #hand-animation-2,  #hand-animation-3").transition({
                 queue: false,
                opacity : 1
            }, 400);
        });
    });
};

function resetCIDP_2_2() {
    $("#chart-arrow, #improvement-bar, .CIDP_2_2_BAR p, #hand-animation-1, #hand-animation-2, #hand-animation-3").transition({
        opacity : 0
    }, 0);
    $("#gamunex_dominant, #placebo_dominant, #gamunex_nondominant, #placebo_nondominant").transition({
        height : "0px"
    }, 0);
};

//END CIDP_2_2_GRIP_STRENGTH INTERACTION

// close all modals
function closeModalButton() {
    $(".modal").addClass("hide");
    
};
// end close all modals

//SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW INTERACTION
//set the animation ready
function expandSugar() {
    if ($("#CIDP-expanded-button-sugarcontent").hasClass("active")) {
        $("#CIDP-expanded-button-sugarcontent").removeClass("active");
        $("#CIDP-expanded-button-sugarcontent").transition({
            y : "0px"
        }, 500, "out");
        $("#CIDP-expanded-button-sugarcontent .CIDP-expanded-buttons-middle").transition({
            height : "0px"
        }, 500, "out");
        $("#buttonContentSugar").transition({
            opacity : "0"
        }, 0, "out");
        $("#sugarbar").transition({
            opacity : "0"
        }, 0, "out");
        $("#sugarBtn").transition({
            opacity : "100"
        }, 0, "out");
        $("#sugarBtn").transition({
            opacity : "100"
        }, 0, "out");
        $("#sugarcontent-footer").addClass("hide");

        //volumeload - footer

    } else {
        $("#CIDP-expanded-button-sugarcontent").addClass("active");
        $("#CIDP-expanded-button-sugarcontent").transition({
            y : "-70px"
        }, 500, "out");
        $("#CIDP-expanded-button-sugarcontent .CIDP-expanded-buttons-middle").transition({
            height : "160px"
        }, 500, "out");
        $("#buttonContentSugar").transition({
            delay : 200, opacity : "100"
        }, 1000, "out");
        $("#sugarbar").transition({
            opacity : "100"
        }, 0, "out");
        $("#sugarBtn").transition({
            opacity : "0"
        }, 0, "out");
        $("#sugarcontent-footer").removeClass("hide");
    }
};

function expandSodium() {
    if ($("#CIDP-expanded-button-sodiumcontent").hasClass("active")) {
        $("#CIDP-expanded-button-sodiumcontent").removeClass("active");
        $("#CIDP-expanded-button-sodiumcontent").transition({
            y : "0px"
        }, 500, "out");
        $("#CIDP-expanded-button-sodiumcontent .CIDP-expanded-buttons-middle").transition({
            height : "0px"
        }, 500, "out");
        $("#buttonContentSodium").transition({
            opacity : "0"
        }, 0, "out");
        $("#sodiumbar").transition({
            opacity : "0"
        }, 0, "out");
        $("#sodiumBtn").transition({
            opacity : "100"
        }, 0, "out");
        $("#sodiumcontent-footer").addClass("hide");

    } else {
        $("#CIDP-expanded-button-sodiumcontent").addClass("active");
        $("#CIDP-expanded-button-sodiumcontent").transition({
            y : "-70px"
        }, 500, "out");
        $("#CIDP-expanded-button-sodiumcontent .CIDP-expanded-buttons-middle").transition({
            height : "160px"
        }, 500, "out");
        $("#buttonContentSodium").transition({
            delay : 200, opacity : "100"
        }, 1000, "out");
        $("#sodiumbar").transition({
            opacity : "100"
        }, 0, "out");
        $("#sodiumBtn").transition({
            opacity : "0"
        }, 0, "out");
        $("#sodiumcontent-footer").removeClass("hide");
    }
};

function expandOsmolality() {
    if ($("#CIDP-expanded-button-osmolality").hasClass("active")) {
        $("#CIDP-expanded-button-osmolality").removeClass("active");
        $("#CIDP-expanded-button-osmolality").transition({
            y : "0px"
        }, 500, "out");
        $("#CIDP-expanded-button-osmolality .CIDP-expanded-buttons-middle").transition({
            height : "0px"
        }, 500, "out");
        $("#buttonContentOsmolality").transition({
            opacity : "0"
        }, 0, "out");
        $("#osmobar").transition({
            opacity : "0"
        }, 0, "out");
        $("#osmoBtn").transition({
            opacity : "100"
        }, 0, "out");
        $("#osmolality-footer").addClass("hide");

    } else {
        $("#CIDP-expanded-button-osmolality").addClass("active");
        $("#CIDP-expanded-button-osmolality").transition({
            y : "-70px"
        }, 500, "out");
        $("#CIDP-expanded-button-osmolality .CIDP-expanded-buttons-middle").transition({
            height : "160px"
        }, 500, "out");
        $("#buttonContentOsmolality").transition({
            delay : 200, opacity : "100"
        }, 1000, "out");
        $("#osmobar").transition({
            opacity : "100"
        }, 0, "out");
        $("#osmoBtn").transition({
            opacity : "0"
        }, 0, "out");
        $("#osmolality-footer").removeClass("hide");
    }
};

function expandVolumeLoad() {
    if ($("#CIDP-expanded-button-volumeload").hasClass("active")) {
        
        $("#CIDP-expanded-button-volumeload").removeClass("active");
        $("#CIDP-expanded-button-volumeload").transition({
            y : "0px"
        }, 500, "out");
        $("#CIDP-expanded-button-volumeload .CIDP-expanded-buttons-middle").transition({
            height : "0px"
        }, 500, "out");
        $("#buttonContentVolume").transition({ opacity : "0"}, 200, "out");
        $("#volumebar").transition({
            opacity : "0"
        }, 0, "out");
        $("#volumeBtn").transition({
            opacity : "100"
        }, 0, "out");
        $("#volumeload-footer").addClass("hide");

    } else {
        $("#CIDP-expanded-button-volumeload").addClass("active");
        $("#CIDP-expanded-button-volumeload").transition({
            y : "-70px"
        }, 500, "out");
        $("#CIDP-expanded-button-volumeload .CIDP-expanded-buttons-middle").transition({
            height : "160px"
        }, 500, "out");
        $("#buttonContentVolume").transition({
            delay : 200, opacity : "100"
        }, 1000, "out");
        $("#volumebar").transition({
            opacity : "100"
        }, 0, "out");
        $("#volumeBtn").transition({
            opacity : "0"
        }, 0, "out");
        $("#volumeload-footer").removeClass("hide");
    }
};

function SHARED_4_1Reset(){
    $("#CIDP-expanded-button-sugarcontent").removeClass("active");
    $("#CIDP-expanded-button-sugarcontent").transition({
        y : "0px"
    }, 500, "out");
    $("#CIDP-expanded-button-sugarcontent .CIDP-expanded-buttons-middle").transition({
        height : "0px"
    }, 500, "out");
    $("#buttonContentSugar").transition({
        opacity : "0"
    }, 0, "out");
    $("#sugarbar").transition({
        opacity : "0"
    }, 0, "out");
    $("#sugarBtn").transition({
        opacity : "100"
    }, 0, "out");
    $("#sugarBtn").transition({
        opacity : "100"
    }, 0, "out");
    $("#sugarcontent-footer").addClass("hide");
        
    $("#CIDP-expanded-button-sodiumcontent").removeClass("active");
    $("#CIDP-expanded-button-sodiumcontent").transition({
        y : "0px"
    }, 500, "out");
    $("#CIDP-expanded-button-sodiumcontent .CIDP-expanded-buttons-middle").transition({
        height : "0px"
    }, 500, "out");
    $("#buttonContentSodium").transition({
        opacity : "0"
    }, 0, "out");
    $("#sodiumbar").transition({
        opacity : "0"
    }, 0, "out");
    $("#sodiumBtn").transition({
        opacity : "100"
    }, 0, "out");
    $("#sodiumcontent-footer").addClass("hide");
        
    $("#CIDP-expanded-button-volumeload").removeClass("active");
    $("#CIDP-expanded-button-volumeload").transition({
        y : "0px"
    }, 500, "out");
    $("#CIDP-expanded-button-volumeload .CIDP-expanded-buttons-middle").transition({
        height : "0px"
    }, 500, "out");
    $("#buttonContentVolume").transition({
        opacity : "0"
    }, 0, "out");
    $("#volumebar").transition({
        opacity : "0"
    }, 0, "out");
    $("#volumeBtn").transition({
        opacity : "100"
    }, 0, "out");
    $("#volumeload-footer").addClass("hide");
    
    $("#CIDP-expanded-button-osmolality").removeClass("active");
    $("#CIDP-expanded-button-osmolality").transition({
        y : "0px"
    }, 500, "out");
    $("#CIDP-expanded-button-osmolality .CIDP-expanded-buttons-middle").transition({
        height : "0px"
    }, 500, "out");
    $("#buttonContentOsmolality").transition({
        opacity : "0"
    }, 0, "out");
    $("#osmobar").transition({
        opacity : "0"
    }, 0, "out");
    $("#osmoBtn").transition({
        opacity : "100"
    }, 0, "out");
    $("#osmolality-footer").addClass("hide");
};

//END SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW INTERACTION

//Challenger Buttons
function challengerButtonHandler(cssQuery) {
    var page = $(cssQuery.target).attr("rel");
    gotoPageWithSection(page, "CIDP");
};


//CIDP_2_4_MAINTENANCE_THERAPY INTERACTION

function CIDP_2_4slider(pos) {

    var currentPos = pos.y - 515;
    //console.log(currentPos)
    if (currentPos <= 0 && currentPos > -216) {
        var legendPercent = Math.abs(currentPos) / 2.15;
        $("#CIDP_2_4_MAINTENANCE_THERAPY_slideActive .y-legend").text(Math.ceil(legendPercent) + "%");
        $("#CIDP_2_4_MAINTENANCE_THERAPY_slideActive .slider-button, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .result-underline, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .y-legend").transition({
            y : currentPos + "px"
        }, 0);
        $("#CIDP_2_4_MAINTENANCE_THERAPY_slideActive .y-trail").transition({
            height : Math.abs(currentPos) + "px"
        }, 0);
    }
};
function getResultsCIDP_2_4() {
    $(".gamunex-c-bar, .placebo-bar, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .result-callout, .gam-result, .placebo-result, .chart-legend, .gamunex-c-bar-number, .placebo-bar-number, .CIDP-2-4-SD-Button, .CIDP-2-4-SD-Button1").removeClass("hide");
    $("#CIDP-2-4-sd-button, #CIDP-2-4-chart-callout, .slider-button, .gam-31, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .y-trail, .y-trail-track, .CIDP-2-4-Result-button").addClass("hide");
    $(".CIDP-2-4-footnote").removeClass("hide");
};

function getResultsCIDP_2_4_studyDesign() {
    $("#CIDP-2-4-modal").removeClass("hide");
    //console.log("getResultsCIDP_2_4_studyDesign");
}

function resetCIDP_2_4() {
    $(".gamunex-c-bar, .placebo-bar, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .result-callout, .gam-result, .placebo-result, .chart-legend, .gamunex-c-bar-number, .placebo-bar-number, .CIDP-2-4-SD-Button, .CIDP-2-4-SD-Button1").addClass("hide");
    $("#CIDP-2-4-chart-callout, .slider-button, .gam-31, #CIDP_2_4_MAINTENANCE_THERAPY_slideActive .y-trail, .y-trail-track, .CIDP-2-4-Result-button").removeClass("hide");
    $(".CIDP-2-4-footnote").addClass("hide");
    var pos = {
        y : 515
    };
    CIDP_2_4slider(pos);
}

//CIDP_2_4_MAINTENANCE_THERAPY INTERACTION

function getResultsCIDP_2_5_studyDesign() {
    $("#CIDP-2-5-modal").removeClass("hide");

}

function getResultsCIDP_2_6_studyDesign() {
    $("#CIDP-2-6-modal").removeClass("hide");
}

// function getResultsCIDP_5_1Bullets(cssQuery) {
    // console.log("cssQuery.target.outerHTML = " + cssQuery.target.outerHTML);
    // $("#CIDP-5-1-modal-text p").html(cssQuery.target.outerHTML);
    // $("#CIDP-5-1-modal").removeClass("hide");
// }

function getResultsPI_2_1_SD_IV() {
    $("#PI-2-1-modal").removeClass("hide");
}

function getResultsPI_2_2_SD() {
    $("#PI-2-2-modal").removeClass("hide");
}

function getResultsPI_5_1Bullets(cssQuery) {
    $("#PI-5-1-modal").removeClass("hide");
}

function getResults2_1_SDButton() {
    $("#ITP-2-1-modal").removeClass("hide");
}

var footerMenuActive = 1;

function storyFlowFooterMenuSelector() {
    if (Status.currentSection === "CIDP") {
        footerMenuActive = 1;
    } else if (Status.currentSection === "PI") {
        footerMenuActive = 2;
    } else {
        footerMenuActive = 3;
    }
    footerMenuSelector();
};

function footerMenuDown() {
    if (footerMenuActive < 3) {
        footerMenuActive++;
    }
    footerMenuSelector();
};

function footerMenuUp() {
    if (footerMenuActive > 1) {
        footerMenuActive--;
    }
    footerMenuSelector();
};

function footerMenuSelector() {
    if (footerMenuActive === 1) {
        teir1FooterMenuStrip();
    } else if (footerMenuActive === 2) {
        teir2FooterMenuStrip();
    } else {
        teir3FooterMenuStrip();
    }
}

function showCIDPSwim() {
    $("#swim-lane-container-1").removeClass("hide");
    $("#swim-lane-container-2, #swim-lane-container-3").addClass("hide");
    $(".SF_CIDP-button, .SF_PI-button, .SF_ITP-button").css("color", "#777");
    $(".SF_CIDP-button").css("color", "#fff");
}

function showPISwim() {
    $("#swim-lane-container-2").removeClass("hide");
    $("#swim-lane-container-1, #swim-lane-container-3").addClass("hide");
    $(".SF_CIDP-button, .SF_PI-button, .SF_ITP-button").css("color", "#777");
    $(".SF_PI-button").css("color", "#fff");
}

function showITPSwim() {
    $("#swim-lane-container-3").removeClass("hide");
    $("#swim-lane-container-1, #swim-lane-container-2").addClass("hide");
    $(".SF_CIDP-button, .SF_PI-button, .SF_ITP-button").css("color", "#777");
    $(".SF_ITP-button").css("color", "#fff");
}

function flowHeaderSelector() {
    var currentFlow = Status.currentSection;
    var currentPage = "#" + Status.currentPage + "_slideActive";
    var watermark;
        
    if (currentFlow === "CIDP") {
        $(".select-header").removeClass("");
    } else if (currentFlow === "PI") {
        $(".select-header").removeClass("");
    } else {
        $(".select-header").removeClass("");
    }
}

function highlightNavPage() {
    
    var watermark, swimSelect, footerSelect;
    
    if(Status.currentSection === "CIDP") {
        watermark = "selected-background1";
        swimSelect = "#swim-lane-container-1";
        footerSelect = "#footerTier1";
    } else if(Status.currentSection === "PI") {
        watermark = "selected-background2";
        swimSelect = "#swim-lane-container-2";
        footerSelect = "#footerTier2";
    } else {
        watermark = "selected-background3";
        swimSelect = "#swim-lane-container-3";
        footerSelect = "#footerTier3";
    }
    
    $(".ancillary-nav-menu-box span").removeClass("selected-background1 selected-background2 selected-background3");
    $(swimSelect + " .ancillary-nav-menu-box span[rel=" + Status.currentPage + "]").addClass(watermark);
    $(footerSelect + " .ancillary-nav-menu-box span[rel=" + Status.currentPage + "]").addClass(watermark);
    

    // var marginLeft = parseInt($("#footerTier1 .ancillary-nav-menu-box").css("margin-left"), 10);
    // var menuBoxWidth = $("#footerTier1 .ancillary-nav-menu-box").outerWidth();
    // var menuCount = $("#footerTier1 .ancillary-nav-menu-box").length;
    // var menuTotalWidth = (marginLeft + menuBoxWidth) * menuCount;
    // var menuPosition = $("#footerTier1 span").hasClass("white-background") ? $("#footerTier1 .white-background").offset().left : 0;
    // var currentScrollPos = $("#footerTier1").scrollLeft();
    // var moveLeft = (currentScrollPos + menuPosition) - (menuBoxWidth + marginLeft);
    // $("#footerTier1").scrollLeft(moveLeft);
    
};

function get_Hughes(){
    gotoPageWithSection(CIDP_0_2_CONCEPT_PAGE_slideActive, Status.currentSection);
}

function get_Merkies(){
    gotoPageWithSection(CIDP_0_2_CONCEPT_PAGE_slideActive, Status.currentSection);
}


function swipePageLeft() {
    gotoNextPage();
}

function swipePageRight() {
    gotoPreviousPage();
}

