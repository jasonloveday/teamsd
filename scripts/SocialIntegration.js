SBT_CONFIGURATION = {
	showSBTFeature : false, // False = disable the SBT commenting feature
	debugMode : true, // True = show some debug information in JS console
	sbtPageUrl : window.location.protocol+"//"+window.location.host+"/services/methodweb/SampleSBT/forum2.html", // TEST - https://dst05lp3.lexington.ibm.com/SampleSBT/forum2.html
	forumUuid : "ccfd53fa-ff21-414e-9620-dc33ba6e1387", //w3-connections.com
	wrapper_div_id : "discussionForum"
};

var contentSBTForum = {
	div_name : 'contentSBTForum',
	init : function() {
		if(!SBT_CONFIGURATION.showSBTFeature) {
			if (SBT_CONFIGURATION.debugMode && console.debug) {
				console.debug("SBT forum switch:off");
			}
			return;
		}
		var containerCreated = contentSBTForum.createContainerDiv();
		if(!containerCreated) {
			if (CONFIGURATION.debugMode && console.debug) {
				console.debug("SBT Forum container does not exist.");
			}
			return;
		}
		window.addEventListener ("message", contentSBTForum.OnMessage, false);
		contentSBTForum.createIframe();
		var pageGuid = document.getElementById("page-guid").attributes.value.value;
		var SocialIframe = document.getElementById("SocialI");
		SocialIframe.src = SBT_CONFIGURATION.sbtPageUrl + "?forumUuid=" + SBT_CONFIGURATION.forumUuid + "&pageGuid=" + pageGuid;
		
	},
	createContainerDiv : function() {
		var wrapperDiv = document.getElementById(SBT_CONFIGURATION.wrapper_div_id);
		if(wrapperDiv != null) {
			var forumDiv = document.createElement("div");
			forumDiv.id = contentSBTForum.div_name;
			wrapperDiv.appendChild(forumDiv);
			return true;
		} else {
			return false;
		}
	},
	createIframe : function() {
		var html = ["<iframe width=\"100%\" height=\"200px\" id=\"SocialI\" marginheight=\"0\" frameborder=\"0\">","</iframe>"];
		document.getElementById(contentSBTForum.div_name).innerHTML = html.join("");
	},
	OnMessage : function(event) {
		var iframeDom=document.getElementById("SocialI");
		iframeDom.height=event.data.height;
		iframeDom.contentWindow.document.body.style.overflowY="hidden";
	}
};