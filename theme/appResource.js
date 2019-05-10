//------------------------------------------------------------------------------
// Copyright (c) 1987, 2008 IBM Corporation.  All Rights Reserved.
//------------------------------------------------------------------------------
// this file define the localizable resource entries 
// the strings defined here should be localized

AppResource = function(){

// translate the strings below

// these are labels of the drawers
this.drawer_searchResult="Search Result";
this.drawer_glossary="Glossary";
this.drawer_index="Index";
this.drawer_profiling="Profiling";

// these labels of buttons
this.closeButton_text="Close";
this.collapseButton_text="Collapse";
this.expandButton_text="Expand";

this.dojoTreePane_error_load_tree="error loading tree";

// the icon tooltips in the toolbar
this.toolbar_tooltip_display_dropdown_menu="Display the drop-down menu";
this.toolbar_tooltip_display_glossary="Display Glossary";
this.toolbar_tooltip_display_index="Display Index";
this.toolbar_tooltip_sync="Synchronizes the view tree with the current content page";
this.toolbar_tooltip_email="Send feedback";
this.toolbar_tooltip_info="Show version and copyright information";

// the drop down menus
this.toolbar_menu_showall="Show All";
this.toolbar_menu_closeall="Close All";
this.toolbar_menu_glossary="Glossary";
this.toolbar_menu_index="Index";
this.toolbar_menu_search="Search";
this.toolbar_menu_sync="Link view with content page";
this.toolbar_menu_feedback="Feedback";
this.toolbar_menu_about="About";

// search scope text
this.searchScope_title="Search Scope";
this.searchScope_type_text="Type of page to search:";
this.searchScope_rpp="Results per page:";
this.searchScope_mc="Method Content";
this.searchScope_role="Role";
this.searchScope_task="Task";
this.searchScope_wp="Work Product";
this.searchScope_guidance="Guidance";
this.searchScope_process="Process";
this.searchScope_activity="Activity";
this.searchScope_general="general Content";

// search widget
this.searchWidget_inprogress="Search in progress...";
this.searchWidget_errorMessage = "Problems calling search engine";
this.searchWidget_searchText = "Search this Site:";	//This line needs to be re-translated by ITA
this.searchWidget_initiaStart = "Search applet initializing...";
this.searchWidget_initiaEnd = "Initialization done";
this.searchWidget_searchStart = "Search started to run...";
this.searchWidget_searchRnning = "Querying,please wait with patience...";
this.searchWidget_searchEnd = "Generating search results...";
this.searchWidget_noResults = "No Results found!";

// the pop up window title for the about box
this.about_box_title="Rational Method Composer";

// feedback email subject text
this.feedback_email_subject="About page: ";

// end of strings 
// ==================== no translation below this point ===================================
	this.searchResultPaneLabel = this.drawer_searchResult;
	this.glossaryPaneLabel =  this.drawer_glossary ;
	this.indexPaneLabel = this.drawer_index ;
	this.profilingPaneLabel = this.drawer_profiling;
	
	
};