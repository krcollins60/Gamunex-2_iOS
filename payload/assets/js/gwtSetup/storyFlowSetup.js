function GWT_Setup_Pages(){
    
	// Register HOME Pages
	registerNewPage("HOME_0_0");
	
	// Register CIDP Pages
	registerNewPage("CIDP_0_1_CHALLENGER_QUESTIONS");
	registerNewPage("CIDP_0_2_CONCEPT_PAGE");
	registerNewPage("CIDP_1_1_PREVALENCE");
	//registerNewPage("CIDP_1_2_BACKGROUND");
	registerNewPage("CIDP_1_3_SIGNS_SYMPTOMS");
	registerNewPage("CIDP_2_1_DISABILITY");
	registerNewPage("CIDP_2_2_GRIP_STRENGTH");
	registerNewPage("CIDP_2_3_TWO_COURSES");
	registerNewPage("CIDP_2_4_MAINTENANCE_THERAPY");
	registerNewPage("CIDP_2_5_QOL_24_WEEKS");
	registerNewPage("CIDP_2_6_QOL_48_WEEKS");
	registerNewPage("CIDP_3_1_DOSING_ADMIN");
	//registerNewPage("CIDP_3_2_AAN_GUIDELINES");
	registerNewPage("CIDP_5_1_CIDP_SUMMARY");
	registerNewPage("CIDP_0_2_CONCEPT_PAGE");
	
	// Register PI Pages
	registerNewPage("PI_1_1_DISEASE_BACKGROUND");
	registerNewPage("PI_1_2_SIGNS_SYMPTOMS");
	registerNewPage("PI_2_1_IV");
	registerNewPage("PI_2_2_SC");
	registerNewPage("PI_3_1_IV_DOSING");
	registerNewPage("PI_3_2_SC_DOSING");
	registerNewPage("PI_4_1_PRODUCT_PROPERTIES_OVERVIEW");
	registerNewPage("PI_5_1_PI_SUMMARY");
	registerNewPage("PI_0_2_CONCEPT_PAGE");
	
	// Register ITP Pages
	registerNewPage("ITP_1_1_BACKGROUND");
	registerNewPage("ITP_2_1_PATIENT_LEVELS");
	registerNewPage("ITP_3_1_DOSING_ADMIN");
	registerNewPage("ITP_4_1_PRODUCT_PROPERTIES_OVERVIEW");
	registerNewPage("ITP_5_1_ITP_SUMMARY");
	registerNewPage("ITP_0_2_CONCEPT_PAGE");
	
	// Register SHARED Pages
	registerNewPage("SHARED_0_2_CONCEPT_PAGE");
    registerNewPage("SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW");
	registerNewPage("SHARED_6_1_PURIFICATION");
	registerNewPage("SHARED_6_2_EASY_TO_USE");
	registerNewPage("SHARED_7_1_PHYSICIAN_SERVICE");
	registerNewPage("SHARED_7_2_PATIENT_SUPPORT");
	registerNewPage("SHARED_8_1_GAMUNEX_SUMMARY");

};

function GWT_Setup_StoryFlows() {
	
	// Register HOME NAV
	registerNewSection("HomeNav");
	disableSwipingForSection("HomeNav");
	setPagesInSection("HomeNav",
			"HOME_0_0");
			
			// Register Story Flow	
	registerNewSection("Questions");
	disableSwipingForSection("Questions");
	setPagesInSection("Questions",
			"CIDP_0_1_CHALLENGER_QUESTIONS");
	
	
	// Register CIDP Story Flow
	registerNewSection("CIDP");
	setPagesInSection("CIDP",
			"CIDP_0_1_CHALLENGER_QUESTIONS,"+
			"CIDP_0_2_CONCEPT_PAGE,"+
			"CIDP_1_1_PREVALENCE," +
			//"CIDP_1_2_BACKGROUND," +
			"CIDP_1_3_SIGNS_SYMPTOMS," +
			"CIDP_2_1_DISABILITY," +
			"CIDP_2_2_GRIP_STRENGTH," +
			"CIDP_2_3_TWO_COURSES," +
			"CIDP_2_4_MAINTENANCE_THERAPY," +
			"CIDP_2_5_QOL_24_WEEKS," +
			"CIDP_2_6_QOL_48_WEEKS," +
			"CIDP_3_1_DOSING_ADMIN," +
			//"CIDP_3_2_AAN_GUIDELINES," +
			"SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW," +
			"CIDP_5_1_CIDP_SUMMARY," +
			"SHARED_6_1_PURIFICATION," +
			"SHARED_6_2_EASY_TO_USE," +
			"SHARED_7_2_PATIENT_SUPPORT," +
			"SHARED_7_1_PHYSICIAN_SERVICE," +
			"SHARED_8_1_GAMUNEX_SUMMARY");
		
			
	// Register PI Story Flow	
	registerNewSection("PI");
	setPagesInSection("PI",
			"PI_0_2_CONCEPT_PAGE," +
			"PI_1_1_DISEASE_BACKGROUND," +
			"PI_1_2_SIGNS_SYMPTOMS," +
			"PI_2_1_IV," +
			"PI_2_2_SC," +
			"PI_3_1_IV_DOSING," +
			"PI_3_2_SC_DOSING," +
			"SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW," +
			"PI_5_1_PI_SUMMARY," +
			"SHARED_6_1_PURIFICATION," +
			"SHARED_6_2_EASY_TO_USE," +
			"SHARED_7_2_PATIENT_SUPPORT," +
			"SHARED_7_1_PHYSICIAN_SERVICE," +
			"SHARED_8_1_GAMUNEX_SUMMARY");
		
			
	// Register ITP Story Flow	
	registerNewSection("ITP");
	setPagesInSection("ITP",
			"ITP_0_2_CONCEPT_PAGE," +
	        "ITP_1_1_BACKGROUND," +
			"ITP_2_1_PATIENT_LEVELS," +
			"ITP_3_1_DOSING_ADMIN," +
			"SHARED_4_1_PRODUCT_PROPERTIES_OVERVIEW," +
			"ITP_5_1_ITP_SUMMARY," +
			"SHARED_6_1_PURIFICATION," +
			"SHARED_6_2_EASY_TO_USE," +
			"SHARED_7_2_PATIENT_SUPPORT," +
			"SHARED_7_1_PHYSICIAN_SERVICE," +
			"SHARED_8_1_GAMUNEX_SUMMARY");
};