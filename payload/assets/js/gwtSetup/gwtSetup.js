Status = {
    "currentSection" : "", 
    "currentPage" : "", 
    "nextPage" : "", 
    "previousPage" : "", 
    "travelingToPageInSection" : "", 
    "travelingToSection" : "", 
    "travelingToSectionPosition" : "", 
    "currentSectionPosition" : 0, 
    "totalPages" : 0, 
    "startSection" : "HomeNav", 
    "startPage" : "HOME_0_0",
    "debug" : "false",
    "presentationStarted" : "false",
    "slideRestart" : "true", 
    "trackingReady" : "false", 
    "frameworkReady" : "false", 
    "informationRegistrationDone" : "false", 
    "animations" : "true", 
    "chartToggleOverride" : "false"
};

TrackingTypes = {
    "ActiveIngredient" : "ACTIVE_INGREDIENT",
    "Exploria" : "EXPLORIA"
};

EventConstants = {
    "PAGE_LOAD" : "PAGE_LOAD",
    "ANIMATE_IN_CONTENT" : "ANIMATE_IN_CONTENT", 
    "BIND_TO_HTML" : "BIND_TO_HTML", 
    "PAGE_LOADED" : "PAGE_LOADED", 
    "POST_VALIDATION" : "POST_VALIDATION", 
    "UNBIND_HTML" : "UNBIND_HTML", 
    "ANIMATE_OUT_CONTENT" : "ANIMATE_OUT_CONTENT", 
    "PAGE_CHANGED" : "PAGE_CHANGED", 
    "SECTION_CHANGED" : "SECTION_CHANGED"
};

ButtonsToRegister = {

};

BindButtonsToTrackingKey = {

};

function registerGWTComponents() {
    
    

    GWT_Setup_Pages();
    GWT_Setup_StoryFlows();
    
    

    

    ////////////////////////////////////////////////////////////
    //Hide all modal classes on launch
    $("#buttonContentSugar").transition({opacity : "0"}, 0, "out");
    $("#buttonContentSodium").transition({opacity : "0"
    }, 0, "out");
    $("#buttonContentOsmolality").transition({
        opacity : "0"
    }, 0, "out");
    $("#buttonContentVolume").transition({
        opacity : "0"
    }, 0, "out");

    $("#sugarbar").transition({
        opacity : "0"
    }, 0, "out");
    $("#sodiumbar").transition({
        opacity : "0"
    }, 0, "out");
    $("#osmobar").transition({
        opacity : "0"
    }, 0, "out");
    $("#volumebar").transition({
        opacity : "0"
    }, 0, "out");
    //reset last interaction
    registerEventCallBack(EventConstants.PAGE_CHANGED, "resetLastPage");

    // Parallax Home Menu setup
    // var dragFirstLevel = new DragContainer("menuFirstLevel", "#menuFirstLevel, .text-cover-plate");
    // dragFirstLevel.setCallback(dragTier1Navboxes.moveElement);
    var dragSecondLevel = new DragContainer("menuSecondLevel", "#menuSecondLevel, .text-cover-plate");
    dragSecondLevel.setCallback(dragTier2Navboxes.moveElement);
    var dragThirdLevel = new DragContainer("menuThirdLevel", "#menuThirdLevel");
    dragThirdLevel.setCallback(dragTier3Navboxes.moveElement);

    registerNewButtonWithCallback("firstTierButton_0_0", "#menuFirstLevel .hit-area, .text-cover-plate", "firstTierMenuPress");
    registerNewButtonWithCallback("secondTierButton_0_0", "#menuSecondLevel .hit-area", "secondTierMenuPress");
    registerNewButtonWithCallback("thirdTierButton_0_0", "#menuThirdLevel .hit-area", "thirdTierMenuPress");

    // resourses button
    registerNewButtonWithCallback("openResourcesButton", ".gamunex-logo", "showResourceNav");

    // highlight Nav Page
    registerEventCallBack(EventConstants.PAGE_CHANGED, "highlightNavPage");

    // goto home page
    registerNewButtonWithCallback("homebutton", ".grifLogo", "gotoHomePage");

    // register footer / swimlane nav buttons
    registerNewButtonWithCallback("footer-navigation_button", ".page-selection", "navigationButtonHandler");

    // register resource-selection buttons
    registerNewButtonWithCallback("footer-navigation_button", ".resource-selection, .read-more, #PI-5-1-bulletBG", "resourceButtonHandler");
    
    // 2.4 modal
    registerNewButtonWithCallback("CIDP-2-4-SD-Button1", ".CIDP-2-4-SD-Button1", "resourceButtonHandler");
   
    

    // footer navigation gestures
    var openNavigation = new Gesture(".page-content", "SWIPE_UP", slideNavigationUp);
    var closeNavigation = new Gesture(".page-content", "SWIPE_DOWN", slideNavigationDown);
    

    var CIDP_2_4_MAINTENANCE_THERAPY = new DragContainer("CIDP_2_4_MAINTENANCE_THERAPY_SLIDER", "#CIDP_2_4_MAINTENANCE_THERAPY_slideActive .slider-button");
    CIDP_2_4_MAINTENANCE_THERAPY.setCallback(CIDP_2_4slider);

    registerNewButtonWithCallback("getResultsCIDP_2_4_Button", "#CIDP_2_4_MAINTENANCE_THERAPY_slideActive #CIDP-2-4-vr-button", "getResultsCIDP_2_4");
    registerNewButtonWithCallback("study_design_2_4_Button", "#CIDP-2-4-sd-button", "getResultsCIDP_2_4_studyDesign");

////////
    registerNewButtonWithCallback("study_design_2_5_Button", "#CIDP-2-5-sd-button", "resourceButtonHandler");
    registerNewButtonWithCallback("sf_2_5_Button", "#CIDP-2-5-sf-button", "resourceButtonHandler");
    registerNewButtonWithCallback("sf_2_6_Button", "#CIDP-2-6-sf-button", "resourceButtonHandler");
////////  
    
    registerNewButtonWithCallback("study_design_2_6_Button", "#CIDP-2-6-sd-button", "resourceButtonHandler");

    registerNewButtonWithCallback("5-1-bullet1_Button", "#CIDP-5-1-bullet1", "getResultsCIDP_5_1Bullets");
    registerNewButtonWithCallback("5-1-bullet2_Button", "#CIDP-5-1-bullet2", "getResultsCIDP_5_1Bullets");
    registerNewButtonWithCallback("5-1-bullet3_Button", "#CIDP-5-1-bullet3", "getResultsCIDP_5_1Bullets");
    registerNewButtonWithCallback("5-1-bullet4_Button", "#CIDP-5-1-bullet4", "getResultsCIDP_5_1Bullets");

    registerNewButtonWithCallback("PI-2-1-IV-sd_Button", "#PI-2-1-IV-sd-button", "resourceButtonHandler");
    registerNewButtonWithCallback("PI-2-2-sd_Button", "#PI-2-2-sd-button", "resourceButtonHandler");


    registerNewButtonWithCallback("PI-5-1-bullet1_Button", "#PI-5-1-bullet1", "resourceButtonHandler");
    registerNewButtonWithCallback("PI-5-1-bullet1_Button", "#PI-5-1-bullet2", "resourceButtonHandler");
    registerNewButtonWithCallback("PI-5-1-bullet1_Button", "#PI-5-1-bullet3", "resourceButtonHandler");
    registerNewButtonWithCallback("CIDP-5-1-Button", ".CIDP-5-1-bullet-bg, .CIDP-5-1-bullets", "resourceButtonHandler");
    registerNewButtonWithCallback("ITP-5-1-bulletButton", ".ITP-5-1-bullet-bg", "resourceButtonHandler");
    
    
    registerNewButtonWithCallback("ITP-2-1-sd-button", "#ITP-2-1-sd-button", "resourceButtonHandler");

    //close modals
    registerNewButtonWithCallback("Close_All_Modals", ".closeXbutton", "closeModalWindow");

    //Challenger Question Buttons
    registerNewButtonWithCallback("Challenger_Question_Buttons", ".CIDP-0-1-challenger-button", "challengerButtonHandler");

    //CIDP_2_1_walkingman interaction
    registerNewButtonWithCallback("CIDP_2_1_walkingman_button", "#CIDP-2-1-graph", "CIDP_2_1_walkingman");

    // CIDP_2_3_TWO_COURSES
    registerNewButtonWithCallback("CIDP_2_3_TWO_COURSES_TOGGLE", "#CIDP_2_3_TWO_COURSES_slideActive .chart-hot-spot", "CIDP_2_3_TWO_COURSES");
    registerNewButtonWithCallback("CIDP_2_3_MAX_BUTTON", "#course-max", "CIDP_2_3_MAX");
    registerEventCallBack(EventConstants.PAGE_CHANGED, "CIDP_2_3_TWO_COURSES_Start");
    
    registerEventCallBackWithPage(EventConstants.PAGE_LOAD, 'trackVisit', "CIDP_2_3_TWO_COURSES_Start");

    // CIDP_1_3_SIGNS_SYMPTOMS INTERACTION
    registerNewButtonWithCallback("CIDP_1_3_SIGNS_SYMPTOMS_Button1", "#select_SignsAndSymptoms", "show_SignsAndSymptoms");
    registerNewButtonWithCallback("CIDP_1_3_SIGNS_SYMPTOMS_Button2", "#select_TreatableNeuropathy", "show_TreatableNeuropathy");
    // END CIDP_1_3_SIGNS_SYMPTOMS INTERACTION

    //CIDP_2_1_DISABILITY INTERACTION
    registerNewButtonWithCallback("CIDP-2-1-modal_Button", "#open-CIDP-2-1-INCAT span", "resourceButtonHandler");
    registerNewButtonWithCallback("CIDP-2-1-2-modal_Button", "#open-CIDP-2-1-study span", "resourceButtonHandler");

    //END CIDP_2_1_DISABILITY INTERACTION

    //CIDP_2_2_GRIP_STRENGTH INTERACTION
    registerNewButtonWithCallback("CIDP-2-2-graph_Button", "#CIDP-2-2-graph", "CIDP_2_2_GRIP_STRENGTH_Start");
    //END CIDP_2_2_GRIP_STRENGTH INTERACTION

    registerNewButtonWithCallback("CIDP-2-2-modal-sd_Button", "#CIDP-2-2-sd-button", "resourceButtonHandler");

    registerNewButtonWithCallback("CIDP-2-3-modal-sd_Button", "#CIDP-2-3-sd-button", "resourceButtonHandler");

    //SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW INTERACTION
    registerNewButtonWithCallback("CIDP-expanded-Button1", "#CIDP-expanded-button-sugarcontent", "expandSugar");
    registerNewButtonWithCallback("CIDP-expanded-Button2", "#CIDP-expanded-button-sodiumcontent", "expandSodium");
    registerNewButtonWithCallback("CIDP-expanded-Button3", "#CIDP-expanded-button-osmolality", "expandOsmolality");
    registerNewButtonWithCallback("CIDP-expanded-Button4", "#CIDP-expanded-button-volumeload", "expandVolumeLoad");

    //SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW INTERACTION

    // footer navigation buttons
    registerNewButtonWithCallback("footerAlbutein5Nav", "#tier1FooterMenuHotSpot", "footerMenuUp");
    registerNewButtonWithCallback("footerAlbutein25Nav", "#tier2FooterMenuHotSpot", "footerMenuDown");

    // set footer Nav
    registerEventCallBack(EventConstants.SECTION_CHANGED, "storyFlowFooterMenuSelector");
    
    
    registerNewButtonWithCallback("Merkies", ".get_Merkies", "get_Merkies");
     registerNewButtonWithCallback("Merkies", ".get_Hughes", "get_Hughes");
 

    // next/back history buttons
    registerNewButtonWithCallback("ancillary-forward-button", "#ancillary-forward-button", "historyGoToNextPage");
    registerNewButtonWithCallback("ancillary-back-button", "#ancillary-back-button", "historyGoToPreviousPage");

    registerEventCallBack(EventConstants.PAGE_CHANGED, "pageHistory");

    //swim lane nav buttons
    registerNewButtonWithCallback("ancillary-back-button", "#ancillary-navigation-CIDP-button, .SF_CIDP-button", "showCIDPSwim");
    registerNewButtonWithCallback("ancillary-back-button", "#ancillary-navigation-PI-button, .SF_PI-button", "showPISwim");
    registerNewButtonWithCallback("ancillary-back-button", "#ancillary-navigation-ITP-button, .SF_ITP-button", "showITPSwim");
    
    
    // launch PDF's
    var PI5PDFButton2 = new Button("PI5PDFButton", ".get_PI5");
    PI5PDFButton2.setExternalFile("assets/pdf/GAMUNEXC_PI_2012.pdf");
    
    var PI5PDFButton = new Button("PI5PDFButton", ".get_Latov");
    PI5PDFButton.setExternalFile("assets/pdf/Latov_paper.pdf");
    
    var PI10PDFButton = new Button("PI10PDFButton", ".get_Roifman");
    PI10PDFButton.setExternalFile("assets/pdf/Roifman_paper.pdf");
    
    var mono5PDFButton = new Button("mono5Button", ".get_Wasserman");
    mono5PDFButton.setExternalFile("assets/pdf/Wasserman_paper.pdf");
    
    var mono10PDFButton = new Button("mono10Button", ".get_Bussel");
    mono10PDFButton.setExternalFile("assets/pdf/Bussell_paper.pdf");
    
    var sellSheetPDFButton = new Button("sellSheetPDFButton", ".get_Hughes");
    sellSheetPDFButton.setExternalFile("assets/pdf/Hughes_paper.pdf");
    
    var distributorPDF = new Button("distributorPDF", ".get_Merkies");
    distributorPDF.setExternalFile("assets/pdf/Merkies_paper.pdf");

    var aanModal = new Button("AANGuidelinesButton", ".modal_AAN");
    
    ////////////////////////////////////////////////////////////
    
    // story flow bounce back
    var CIDPStartPageBounce = new DragContainer("CIDPStartPageBounce", "#CIDP_0_1_CHALLENGER_QUESTIONS_slideActive");
    CIDPStartPageBounce.setCallback(CIDPStartPage.moveElement);
    //var endFlowSwipeLeft1 = new Gesture("#CIDP_0_1_CHALLENGER_QUESTIONS_slideActive", "SWIPE_LEFT", swipePageLeft);

    var CIDPEndPageBounce = new DragContainer("CIDPEndPageBounce", "#SHARED_8_1_GAMUNEX_SUMMARY_slideActive");
    CIDPEndPageBounce.setCallback(CIDPEndPage.moveElement);
    //var endFlowSwipeRight1 = new Gesture("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", "SWIPE_RIGHT", swipePageRight);
    
    var PIStartPageBounce = new DragContainer("PIStartPageBounce", "#PI_0_2_CONCEPT_PAGE_slideActive");
    PIStartPageBounce.setCallback(PIStartPage.moveElement);
    //var endFlowSwipeLeft2 = new Gesture("#PI_0_2_CONCEPT_PAGE_slideActive", "SWIPE_LEFT", swipePageLeft);

    var PIEndPageBounce = new DragContainer("PIEndPageBounce", "#SHARED_8_1_GAMUNEX_SUMMARY_slideActive");
    PIEndPageBounce.setCallback(PIEndPage.moveElement);
    //var endFlowSwipeRight2 = new Gesture("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", "SWIPE_RIGHT", swipePageRight);

    var ITPStartPageBounce = new DragContainer("ITPStartPageBounce", "#ITP_0_2_CONCEPT_PAGE_slideActive");
    ITPStartPageBounce.setCallback(ITPStartPage.moveElement);
    //var endFlowSwipeLeft3 = new Gesture("#ITP_0_2_CONCEPT_PAGE_slideActive", "SWIPE_LEFT", swipePageLeft);

    var ITPEndPageBounce = new DragContainer("ITPEndPageBounce", "#SHARED_8_1_GAMUNEX_SUMMARY_slideActive");
    ITPEndPageBounce.setCallback(ITPEndPage.moveElement);
    //var endFlowSwipeRight3 = new Gesture("#SHARED_8_1_GAMUNEX_SUMMARY_slideActive", "SWIPE_RIGHT", swipePageRight);
    
    
    
    // swim lane navigation
    // var swimlaneYdragResources = new DragContainer("swimlaneDragYResources", ".resource-lane");
    // swimlaneYdragResources.setCallback(dragResourcesLane.moveElement);
// 
    // var swimlaneYdragEfficacy = new DragContainer("swimlaneDragYEfficacy", ".efficacy-lane");
    // swimlaneYdragEfficacy.setCallback(efficacyLane.moveElement);
    
    registerNewButtonWithCallback("swimLaneButton", ".swim-lane-button", "toggleSwimLaneNav");
    
    // var swimlaneXdrag1 = new DragContainer("swimlaneDragX", "#swim-lane-container-1");
    // swimlaneXdrag1.setCallback(dragSwimLaneX.moveElement);
// 
    // var swimlaneXdrag2 = new DragContainer("swimlaneDragX2", "#swim-lane-container-2");
    // swimlaneXdrag2.setCallback(dragSwimLaneX2.moveElement);
// 
    // var swimlaneXdrag3 = new DragContainer("swimlaneDragX3", "#swim-lane-container-3");
    // swimlaneXdrag3.setCallback(dragSwimLaneX3.moveElement);

    
    setTrackingModule(TrackingTypes.ActiveIngredient);
    Status.informationRegistrationDone = "true";
    startPresentation();

}; // end register gwt

