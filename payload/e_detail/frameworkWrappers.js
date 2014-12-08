/**

 * Framework Notes:
 * 
 * To customize the basic navigation swipes add the following keys to the status json:
 * "swipeNavigationTimeout"
 * "swipeNavigationThreshold"
 * "swipeLeftZone"
 * "swipeRightZone"
 * The values should be a number. 
 * Timeout pertains to the time, in milliseconds, it takes to complete a swipe
 * Threshold pertains to the distance, in pixels, required to trigger a swipe
 * Zones are the areas that cover the swipe area these are in degrees and they 
 * 		start from the center of the swipe direction and each degree amount is applies to 
 * 		each side of the center.
 */

var PresentationController = function () {}

/**
* gotoNextPage()
*
* Goes to the next page in the current story flow.
* Does nothing if you are at the end of the flow.
**/
PresentationController.prototype.nextPage = function () {
	gotoNextPage();
}
 
/** 
* gotoPreviousPage ()
*
* Goes to the previous page in the story flow.
* Does nothing if you are at the beggining of the story flow
**/
PresentationController.prototype.prevPage = function () {
	gotoPreviousPage();
}

/**
* gotoPage(pageID)
*
* Goes to the page indicated by the first attribute.
* This page must be in the current story flow or nothing will happen.
* 
* @param	pageID	String, correlates to a page in the html
**/
PresentationController.prototype.gotoPage = function (pageID) {
	gotoPage(pageID);
}

/**
* gotoPageWithSection(pageID, sectionID)
*
* Goes to the page indicated in the first attribute and
* switches you to the story flow indicated in the second attribute.
* If either value is invalid the user will stay on the same page.
* 
* @param	pageID		String, correlates to a page in the html
* @param	sectionID	String, correlates to a story flow
**/
PresentationController.prototype.gotoPageWithSection = function (pageID, sectionID) {
	gotoPageWithSection(pageID, sectionID)
}

/**
* gotoSection(sectionID)
*
* Goes to the indicated section. The page will always be the
* last visited page in that story flow. If the story flow has 
* never been visited the user will go to the first page of that 
* flow.
* 
* @param 	sectionID	String, the unique id of the section
**/
PresentationController.prototype.gotoSection = function (sectionID) {
	gotoSection(sectionID)
}


/** 
* registerEventCallBack(eventID, callback)
* 
* Registers a Framework event with a javascript callback. Whenever that Framework
* Event is fired the js callback will be fired as well.
* 
* @param	eventID		EventConstants, a constant with the event id string
* @param	callback	String, the javascript function. No parameters should be expected
**/
PresentationController.prototype.registerEventCallBack = function (eventID, callback) {
	registerEventCallBack(eventID, callback)
}

/** registerEventCallBackWithPage(eventID, callback, pageID)
* 
* Registers a Framework event with a javascript callback. Whenever that Framework
* Event is fired on the page specified the js callback will be fired as well.
* 
* @param	eventID		EventConstants, a constant with the event id string
* @param	callback	String, the javascript function. No parameters should be expected
* @param	pageID		String, the pageID that the callback should be fired for
**/
PresentationController.prototype.registerEventCallBackWithPage = function (eventID, callback, pageID) {
	registerEventCallBackWithPage(eventID, callback, pageID)
}

/** 
* disableSwiping()
*
* Disables all swiping
**/
PresentationController.prototype.disableSwiping = function () {
	disableSwiping()
}

/** 
* enableSwiping()
* 
* Enables all swiping
**/ 
PresentationController.prototype.enableSwiping = function () {
	enableSwiping()
}


//==========Sections========
/**
* registerNewSection(sectionID)
* 
* Registers a new section id with the framework. This id must be unique.
* If it is not unique it will overwrite the flow with the same name
* 
* @param	sectionID	String, a unique section id
* @classvar pages 	String, a List of comma separated page id's. No Spaces. This is the order of the story flow.
**/
var Section = function(sectionID) {
	this.sectionID = sectionID;
	this.pages = pages;
	registerNewSection(sectionID);
};

/** 
* setPagesInSection(sectionID, pages)
* 
* Registers a series of pages with a section. The pages and the section should
* have been previously registered with the registerNewPage() and 
* registerNewSection() functions. The pages variable is a comma separated
* list of pageID's. There should be no spaces in the list. The order of the 
* list is also the order that the pages will be in the framework when swiping.
* 
* @param	sectionID	String, a previously registered section id
* @param	pages		String, a List of comma separated page id's. No Spaces. This is the order of the story flow.
**/

Section.prototype.setPagesInSection = function (pages) {
	this.pages = pages; 
	setPagesInSection(this.sectionID, pages);
};

 /**setPreviousSectionAndPageForSection(sectionID, prevSectionID, pageID) 
 * 
 * For the given section id this registers the next section that should be traveled to
 * in the event that the user is at the end of the flow. If the string "null" is passed in
 * for any of the variables the value will be reset.
 * 
 * @param	sectionID		String, a previously registered section id
 * @param	prevSectionID	String, a previously registered section id
 * @param	pageID			String, a previously registered page id
 **/

Section.prototype.setPreviousSection = function (prevSectionID, pageID) {
	setPreviousSectionAndPageForSection(this.sectionID, prevSectionID, pageID);
};

/** setNextSectionAndPageForSection(sectionID, nextSectionID, pageID) 
 * 
 * For the given section id this registers the next section that should be traveled to
 * in the event that the user is at the end of the flow. If the string "null" is passed in
 * for any of the variables the value will be reset.
 * 
 * @param	sectionID		String, a previously registered section id
 * @param	nextsectionID	String, a previously registered section id
 * @param	pageID			String, a previously registered page id
 **/ 
Section.prototype.setNextSectionAndPageForSection = function (nextSectionID, pageID) {
	setNextSectionAndPageForSection(this.sectionID, nextSectionID, pageID)
};

/**
 * disableSwipingForSection()
 * 
 * disables swiping in a section
 * 
 * @param	sectionID	String, a unique section id
 **/
Section.prototype.disableSwipingForSection = function () {
	disableSwipingForSection(this.sectionID)
}

/** 
 * enableSwipingForSection()
 * 
 * enables swiping in a section
 * 
 * @param	sectionID	String, a unique section id
 **/ 
Section.prototype.enableSwipingForSection = function () {
	enableSwipingForSection(this.sectionID)
}

/**
 * Interface for commiting tracking data not automatically tracked by the framework
 * 
 */
var Tracking = function() {}

/**
 * Commits a misc metric into the tracking document for the session. 
 */
Tracking.prototype.commitMiscMetric = function (key, data) {
	commitMiscMetric(key, data);
}

/**
 * Sets the log level to start reporting from. For example if Debug was enabled
 * all traces between debug and off will go to the active console.
 * 
 * This is set to "OFF"
 * by default.
 * 
 * ALL
 * METRICS
 * TRACE
 * DEBUG
 * WARNING
 * ERROR
 * FATAL
 * OFF
 */
Tracking.prototype.setLogLevel = function (logLevel) {
	
}

//==========Modals==========
/** 
* var Modal = function(modalID, cssQueries)
* 
* Registers a set of html nodes to have their hide/show classes 
* managed by the framework. The modal id must be unique to all other
* modalID's. The cssQueries parameter can have multiple queries they
* only need to be separated by commas.
* 
* @param modalID		String, a unique modal id 
* @param cssQueries	String, a comma separated list of the queries that need their show/hide toggled
**/
var Modal = function(modalID, cssQuery) {
	this.modalID = modalID;
	this.cssQuery = cssQuery;
};

 /** 
 * Modal.open()
 *
 * Opens a modal with the modalID that is provided
 **/
Modal.prototype.open = function() {
	openModal(this.modalID);
};

/**
* closeModal()
*
* Closes all open modals
*
**/ 
Modal.prototype.close = function(){
	closeModal();
};
 
/** 
* var Chart = function(chartID, cssQueries)
*
* Registers a slide chart targeted by cssQueries to be associated later 
* with a framework button for displaying the chart. The chartID must be unique to all other
* chart ids managed by the framework. The cssQueries parameter can have multiple queries they
* only need to be separated by commas.
* 
* @param chartID		String, a unique chart id 
* @param cssQueries	String, a comma separated list of the queries targeting the chart container
**/
var Chart = function(chartID, cssQuery) {
	this.chartID = chartID;
	this.cssQuery = cssQuery;	
}

/** 
* registerNewButton(buttonId, cssQueries)
* 
* Registers a new button with the framework. The buttonId must be
* Unique.
* 
* @param	buttonID	String, Must be unique in relation to other buttons
* @param	cssQueries	String, Query for getting the button.
*
* @classvar	modalID	String, Must be unique in relation to other modals
* @classvar modalEnabled	Boolean, Whether or not modal is enabled.
* @classvar	chartID	String, Must be unique in relation to other charts
* @classvar chartEnabled	Boolean, Whether or not chart is enabled.
* @classvar callback	Function, The function to callback
* @classvar callbackEnabled	Boolean, Whether or not callback is enabled.
* @classvar externalResourceGuid 	String, 	
**/ 
var Button = function(buttonID, cssQuery){
	this.buttonID = buttonID;
	this.cssQuery = cssQuery;
	this.$ = $(cssQuery);
	this.modalID;
	this.modalEnabled = false;
	this.chartID;
	this.chartEnabled = false;
	this.callback;
	this.callbackEnabled = false;
	this.externalResourceGuid;
	this.externalFile;
	registerNewButton(buttonID, cssQuery);

	console.log("Registered New Button");
}

/** 
*  registerButtonWithModal(buttonId, modalId)
* 
* Registers a new button with the framework. The buttonId must be
* Unique. Invokes the callback when the button is clicked.
* 
* @param	buttonID	String, Must be unique in relation to other buttons
* @param	modalID		String, A previously registered modal
*
* @classvar modalEnabled	Boolean, Whether or not modal is enabled.
**/ 
Button.prototype.setModal = function(modalID) {
	this.modalID = modalID;
	
	if (typeof(modalID) !== undefined) {
		this.modalEnabled = true;
		registerButtonWithModal(this.buttonID , this.modalID);
	} else {
		this.modalEnabled = false;
		registerButtonWithModal(this.buttonID , null);
	}
};

/** 
* Button.setChart = function(chartId)
* Registers a new button with the framework. The buttonId must be
* unique. Displays chart specified by framework chartId when the button is clicked.
* 
* @param chartId		String, the id that identifies the chart with the framework
* 
* @classvars chartEnabled	Boolean, Whether or not chart is enabled.
**/ 
Button.prototype.setChart = function(chartID) {
	this.chartID = chartID;
	
	if (typeof(chartID) !== undefined) {
		this.chartEnabled = true;

	} else {
		this.chartEnabled = false;
	}
}

/** 
* registerNewButtonWithCallback(buttonId, cssQueries, callback)
* 
* Registers a new button with the framework. The buttonId must be
* Unique. Also automatically binds it to open a modal.
* 
* @param	buttonId	String, Must be unique in relation to other buttons
* @param	cssQueries	String, Query for getting the button.
* @param	callback	Function, The function to callback
**/
Button.prototype.setCallback = function(callback) {
	this.callback = callback;

	if (typeof(callback) !== undefined) {
		//console.log("registered new callback:" + this)
		this.callbackEnabled = true;
		registerButtonWithObjectCallback(this.buttonID, this);
	} else {
		this.callbackEnabled = false;
	}
}

/**
* Button setExternalResource = function(guid)
*
* Set's resources guid(universal id)
*
* @param	guid	String, Must be unique to Resource
**/
Button.prototype.setExternalResource = function(guid) {
	this.externalResourceGuid = guid;
}

/**
* Button setExternalFile = function(relPath)
*
* Configures a button to launch external asset from relPath
*
* @param	relPath	String, Path to file to be launched externally 
* 					by button - must be relative to host HTML file
**/
Button.prototype.setExternalFile = function(relPath) {
	this.externalFile = relPath;
	bindButtonExternalFile(this.buttonID, this.externalFile);
}


/**
* unregisterButton(buttonID)
*
* Registers a new button with the framework.
*
* @param	buttonID	String, Must be unique in relation to other buttons
**/
Button.prototype.remove = function() {
	unregisterButton(this.buttonID);
}

/**
* objectCallback()
* 
* In between callback and callback function happenning,
* this wraps the call in an object.(private function)
**/
Button.prototype.objectCallback = function() {
	//console.log("calling registered function")
	console.log(this.callback);
	if (this.callbackEnabled)
		this.callback.call(window, this);
}

/** Resources for Detail, yet to be implemented.
**/
var ResourceGroup = function() {
	this.rLookup = {};
	this.rArray = [];
}
/** Resources for Detail, yet to be implemented.
**/
ResourceGroup.prototype.addButton = function(button) {
	this.rArray.push(button);
	this.rLookup.button.buttonID = button;
}

/** DragContainer(dragID, cssQuery)
*
* Creates a drag container for use.
*
* @param	dragID	String, Must be unique in relation to other drag contaniers
* @param	cssQuery	String, Query for getting the drag item
* @classvar	callback	Function, The function to callback
*
* Valid Drag States:
*		"START_DRAG";
*	    "DRAGGING";
*		"NOT_DRAGGING"
**/
var DragContainer = function (dragID, cssQuery) {
	this.dragID = dragID;
	this.cssQuery = cssQuery;
	this.callback;
	this.previousTimeStamp;
	this.currentTimeStamp;
	this.runningTime;
	this.pxPerSecondX = 0;
	this.pxPerSecondY = 0;

	this.dragState;
	this.startX;
	this.startY;
	this.prevX;
	this.prevY;
	this.x;
	this.y;
	this.prevAngle;
	this.startAngle;
}

/** DragContainer.setCallback(callback)
*
* This function lets you set the callback function.
*
* @param	callback	Function, The function to callback
**/
DragContainer.prototype.setCallback = function (callback) {
	this.callback = callback;
	setDragAreaWithIdAndPositionAndCallback(this.dragID, this.cssQuery, this);
}

/**
* dragContainer.objectCallback()
* 
* In between callback and callback function happenning,
* this wraps the call in an object.(private function)
**/
DragContainer.prototype.objectCallback = function (x, y, dragState) {
	this.prevX = this.x;
	this.prevY = this.y;

	switch (dragState) {
		case "START_DRAG" :
			this.previousTimeStamp = (new Date()).getTime();
			this.startY = y;
			this.startX = x;
			this.runningTime = 0;
			this.pxPerSecondX = 0;
			this.pxPerSecondY = 0;
			break;
		case "DRAGGING" :
		case "NOT_DRAGGING":
			this.currentTimeStamp = (new Date()).getTime();
			var timeElapsed = this.currentTimeStamp - this.previousTimeStamp;

			this.runningTime += timeElapsed;

			this.startAngle = Math.atan2( y - this.startY, x - this.startX);
			this.prevAngle =  Math.atan2( y - this.prevY, x - this.prevX);
			
			this.pxPerSecondX = ((this.prevX - x) / timeElapsed) * 1000;
			this.pxPerSecondY = ((this.prevY - y) / timeElapsed) * 1000;

			this.previousTimeStamp = this.currentTimeStamp;
			//console.log()
	}

	this.x = x;
	this.y = y;
	this.dragState = dragState;

	this.callback.call(window,this);
}

/** Gesture()
 * 
 * Turns on a gesture of a specified type. Use remove() to 
 * turn off Listener for this gesture.
 *
 * @param	cssQuery	String, Query for getting the area wanted to use for the gesture
 * @param	type	String, Valid gesture types(below)
 * @param	callback	Function, The function to callback
 * Valid Gestures:
 * 		"SWIPE_LEFT"
 *		"SWIPE_RIGHT"
 *		"SWIPE_UP"
 *		"SWIPE_DOWN"
 *		"TAP"
 **/
var Gesture = function (cssQuery, type, callback) {
	this.css = cssQuery;
	this.callback = callback;
	this.gestureType = type;
	this.swipeThreshold = 80;
	this.tapThreshold = 15;
	this.swipeTimeoutThreshold = 200;
	this.numTouches = 1;
	registerNewGestureListener(type, cssQuery, this);
};

/** Gesture.customizeGesture()
 * 
 * Allows the user to customize several aspects of the gesture
 * 
 * @param	swipeThreshold	int, the minimum distance, in pixels, that must be travelled to trigger the callback
 * @param	tapThreshold	int, the amount of pixels a touchdown and touchup must remain within to register ans a tap
 * @param	swipeTimeoutThreshold	int, the amount of time, in milliseconds, that a swipe must be completed in
 */
Gesture.prototype.customizeGesture = function (newSwipeThreshold, newTapThreshold, newSwipeTimeoutThreshold) {
	this.remove();
	this.swipeThreshold = newSwipeThreshold;
	this.tapThreshold = newTapThreshold;
	this.swipeTimeoutThreshold = newSwipeTimeoutThreshold;
	registerNewCustomGestureListener(this.gestureType, this.css, this, this.swipeThreshold, this.tapThreshold, this.swipeTimeoutThreshold, this.numTouches);
}

Gesture.prototype.newNumTouches = function (newNumTouches) {
	this.numTouches = newNumTouches;
	registerNewCustomGestureListener(this.gestureType, this.css, this, this.swipeThreshold, this.tapThreshold, this.swipeTimeoutThreshold, this.numTouches);
}

Gesture.prototype.setSwipeZone = function (newSwipeZone) {
	this.swipeZone = newSwipeZone;
	setSwipeGestureZone(this.gestureType, this.css, this.swipeZone);
}


/** Gesture.objectCallback()
 * 
 * In between callback and callback function happening,
 * this wraps the call in an object.(private function)
 **/
Gesture.prototype.objectCallback = function() {
	this.callback.call(window, this);
};

/** Gesture.remove()
 * 
 * Turns off a gesture of a specified type. 
 **/
Gesture.prototype.remove = function() {
	removeGestureListener(this.gestureType, this.css);
};