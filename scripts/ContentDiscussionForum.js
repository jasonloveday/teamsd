CONFIGURATION = {
	showDiscussionForum : false, // False = disable the RTC commenting feature
	debugMode : true, // True = show some debug information in JS console
	saveUserInfo : false, // True = save userId & password in cookie
	project_area : "Social Integration Comments", // Name of the project area where comment work items
	// are to be stored.
	server_url : "https://dst05lp3.lexington.ibm.com:9447",
	proxy_url : "https://method.ibm.com/proxy_oslc",// TEST - https://dst05lp3.lexington.ibm.com/proxy
	rtc : "/ccm",
	jts : "/jts",
	default_work_item_type : "defect", // The ID of the default work item type to be created when submitting comments.
	wrapper_div_id : "discussionForum"
};

DEFAULT_VAlUES = {
	LOGIN_BEFORE : "Log in to ",
	LOGIN_AFTER : " to show discussion",
	LOGIN_USERID : "User ID",
	LOGIN_USERPSD : "Password",
	LOGIN : "LOG IN",
	CHECK_RTC_CONFIG : "please check RTC config",
	CHECK_ID : "please input userID and password",
	CHECK_LOGIN : "please log in",
	CHECK_IDPWD : "please check your username and password",
	LOG_OUT : "log out success",
	CONNECT_TO : "connect to ",
	ERROR : " error",
	SUBJECT : "Subject",
	SUBMIT : "Submit",
	TIME_OUT : " time out",
	SUMMARY : "New discussion topic",
	DESCRIPTION : "Please input description",
	SUMMARY_DESCRIPTION : "please input summary!",
	NOPERMISSION : "no permission on RTC,please contact with RTC administrator",
	NOWITYPE : "can't find the work item type:",
	IN_COMMENT : "please input comment!",
	COMMENT : "add comment",
	QUICK_START : "go to start discussion",
	BACK_BEGINNING : "back to the beginning",
	SESSION_OUT : "Session expired.Please log in again.",
	LOG_OUT_MESSAGE : "log out",
	NO_FILEDAGAINSTRESOUCE : "No filed against,please check the project area"
};

var contentDiscussionForum = {
	div_name : 'contentDiscussionForum',
	loading_div_name : 'loadingSection',
	OSLC_CONTENT_TYPES : {
		SERVICE_URL : CONFIGURATION.server_url + CONFIGURATION.rtc,
		JTS_SERVICE_URL : CONFIGURATION.server_url + CONFIGURATION.jts,
		IMG_SERVICE_URL : CONFIGURATION.proxy_url + "/img?",
		PROXY_SERVICE_URL : CONFIGURATION.proxy_url + "/proxy",
		CATALOG_DESCRIPTION : "/oslc/workitems/catalog",
		CATALOG_XML : "/oslc/categories.xml",
		AUTH_STATUS_HEADER : "X-com-ibm-team-repository-web-auth-msg",
		DC_TERMS : "http://purl.org/dc/terms/",
		RDF : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		RTC_CM : "http://jazz.net/xmlns/prod/jazz/rtc/cm/1.0/",
	},
	// account for show comments
	userName : "",
	passWord : "",
	titleName : "",
	// work area name
	workArea : CONFIGURATION.project_area,
	workAreaId : "",
	userNameMap : null,
	userItemIdMap : null,
	filedAgainstResouce : "",
	isIE : false,
	init : function() {
		if (!CONFIGURATION.showDiscussionForum) {
			contentDiscussionForum.debug("OSLC Forum switch:off");
			return;
		}
		if(navigator.appName && navigator.appName == "Microsoft Internet Explorer"){
			contentDiscussionForum.isIE = true;
		}
		var containerCreated = contentDiscussionForum.createContainerDiv();
		if(!containerCreated) {
			contentDiscussionForum.debug("OSLC Forum container does not exist.");
			return;
		}
		if (!CONFIGURATION.project_area || !CONFIGURATION.server_url) {
			contentDiscussionForum
					.showLoginFormMessage(DEFAULT_VAlUES.CHECK_RTC_CONFIG);
		} else {
			if (!CONFIGURATION.saveUserInfo) {
				var xhr = contentDiscussionForum.createXMLHttpRequest();
				var iurl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ '/authenticated/identity';
				xhr.open('POST', contentDiscussionForum.getRequestURL(iurl), false);
				xhr.setRequestHeader('ProxyUrl', iurl);
				if(xhr.timeout){
					xhr.timeout = 5000;
				}
				xhr.onreadystatechange = function(){
					if (xhr.readyState == 4 && xhr.status == 200) {
						var header = xhr
								.getResponseHeader(contentDiscussionForum.OSLC_CONTENT_TYPES.AUTH_STATUS_HEADER);
						if (header != "authrequired") {
							var returnJson = JSON.parse(xhr.responseText);
							contentDiscussionForum.userName = returnJson.userId;// set userId
							contentDiscussionForum.showComments();
						} else {
							contentDiscussionForum.showLoginFormMessage();
						}
					}
				};
				if(xhr.onerror){
					xhr.onerror = function() {
						contentDiscussionForum.hideLoading();
						contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
							+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
							+ DEFAULT_VAlUES.ERROR);
					};
				}
				if(xhr.ontimeout){
					xhr.ontimeout = function() {
						contentDiscussionForum.hideLoading();
						contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
							+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
							+ DEFAULT_VAlUES.TIME_OUT);
					};
				}
				try{
					xhr.send();
				}catch(e){
					contentDiscussionForum.hideLoading();
					contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
							+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
							+ DEFAULT_VAlUES.ERROR);
					contentDiscussionForum.debug(e);
				}
			} else if (this.getCookie("userName") && this.getCookie("passWord")) {
				this.login();
			} else {
				contentDiscussionForum.showLoginFormMessage();
			}
		}
	},
	createContainerDiv : function() {
		var wrapperDiv = document.getElementById(CONFIGURATION.wrapper_div_id);
		if(wrapperDiv != null) {
			var loadingDiv = document.createElement("div");
			loadingDiv.id = contentDiscussionForum.loading_div_name;
			var forumDiv = document.createElement("div");
			forumDiv.id = contentDiscussionForum.div_name;
			wrapperDiv.appendChild(loadingDiv);
			wrapperDiv.appendChild(forumDiv);
			return true;
		} else {
			return false;
		}
	},
	createLoginForm : function(message) {
		var html = [];
		html = html.concat([ "<div id=\"hint\"><label>",
				DEFAULT_VAlUES.LOGIN_BEFORE, CONFIGURATION.server_url,
				DEFAULT_VAlUES.LOGIN.LOGIN_AFTER, "</label></div>" ]);
		html = html.concat([ "<div class=\"rain\">" ]);
		html = html.concat([ "<div class=\"border start\">" ]);
		html = html.concat([ "<form action=\"#\">" ]);
		html = html.concat([ "<label for=\"name\">",
				DEFAULT_VAlUES.LOGIN_USERID, "</label>" ]);
		html = html
				.concat([ "<input id=\"comment-username\" name=\"name\" type=\"text\" placeholder=\"User ID\"/>" ]);
		html = html.concat([ "<label for=\"pass\">",
				DEFAULT_VAlUES.LOGIN_USERPSD, "</label>" ]);
		html = html
				.concat([ "<input id=\"comment-password\" name=\"pass\" type=\"password\" placeholder=\"Password\"/>" ]);
		html = html
				.concat([ "<input type=\"submit\" value=\"",
						DEFAULT_VAlUES.LOGIN,
						"\" onclick=\"return contentDiscussionForum.login()\" onfocus=\"blur()\"/>" ]);
		html = html.concat([
				"<label id=\"comment-waitting\" class=\"rain-message\">",
				message, "</label>" ]);
		html = html.concat([ "</form>" ]);
		html = html.concat([ "</div>" ]);

		return html.join("");
	},

	showLoginForm : function(message) {
		document.getElementById(contentDiscussionForum.div_name).innerHTML = contentDiscussionForum
				.createLoginForm(message);
	},

	showLoginFormMessage : function(message) {
		if (document.getElementById("comment-waitting")) {
			document.getElementById("comment-waitting").innerHTML = message;
		} else {
			contentDiscussionForum.showLoginForm(message);
		}

	},

	login : function() {
		this.userName = document.getElementById('comment-username') != null ? document
				.getElementById('comment-username').value
				: this.getCookie("userName");
		this.passWord = document.getElementById('comment-password') != null ? document
				.getElementById('comment-password').value
				: this.getCookie("passWord");
		if (!this.userName || !this.passWord) {
			contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CHECK_ID);
			return false;
		}
		this.authorize(contentDiscussionForum.showComments);
		return false;
	},

	showComments : function() {
		if (CONFIGURATION.saveUserInfo) {
			contentDiscussionForum.setUserCookie(contentDiscussionForum.userName,
					contentDiscussionForum.passWord);
		}
		contentDiscussionForum.titleName = contentDiscussionForum
				.getUserInfo(contentDiscussionForum.userName);
		contentDiscussionForum.prepareQuery(contentDiscussionForum.handlePrepare);
	},

	getRequestURL : function(url) {
		var rqUrl = null;
		if (CONFIGURATION.proxy_url) {
			rqUrl = contentDiscussionForum.OSLC_CONTENT_TYPES.PROXY_SERVICE_URL;
		} else {
			rqUrl = url;
		}
		return rqUrl;
	},

	logout : function() {
		contentDiscussionForum.delCookie("userName");
		contentDiscussionForum.showLoginForm(DEFAULT_VAlUES.LOG_OUT);
		if (document.getElementById("comment-password")) {
			document.getElementById("comment-password").value = "";
		}
		var xhr = contentDiscussionForum.createXMLHttpRequest();
		var iurl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ '/service/com.ibm.team.repository.service.internal.ILogoutRestService';
		xhr.open('POST', contentDiscussionForum.getRequestURL(iurl), true);
		xhr.setRequestHeader('ProxyUrl', iurl);
		try{
			xhr.send();
		}catch(e){
			contentDiscussionForum.hideLoading();
			contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
					+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
					+ DEFAULT_VAlUES.ERROR);
			contentDiscussionForum.debug(e);
		}
	},

	authorize : function(callback) {
		contentDiscussionForum.showLoading();
		var xhr = contentDiscussionForum.createXMLHttpRequest();
		var iurl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ '/authenticated/identity';
		xhr.open('POST', contentDiscussionForum.getRequestURL(iurl), true);// must
		// visit
		// this url
		// first
		xhr.setRequestHeader('ProxyUrl', iurl);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				xhrX = contentDiscussionForum.createXMLHttpRequest();
				var i2url = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
						+ '/authenticated/j_security_check';
				xhrX.open('POST', contentDiscussionForum.getRequestURL(i2url), false);
				xhrX.setRequestHeader('Content-Type',
						'application/x-www-form-urlencoded;charset=UTF-8');
				xhrX.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				xhrX.setRequestHeader("Cache-Control",
						"no-cache,no-store,must-revalidate");
				xhrX.setRequestHeader("Pragma", "no-cache");
				xhrX.setRequestHeader("Expires", "-1");
				xhrX.setRequestHeader('ProxyUrl', i2url);
				// xhr.setRequestHeader("X-jazz-downstream-auth-client-level","4.0");
				xhrX.onreadystatechange = function(e) {
					if (xhrX.readyState == 4 && xhrX.status == 200) {
						// log
						// on
						// success
						authrequired = xhrX
								.getResponseHeader("X-com-ibm-team-repository-web-auth-msg");
						if (authrequired == "authrequired") {
							contentDiscussionForum.hideLoading();
							contentDiscussionForum
									.showLoginFormMessage(DEFAULT_VAlUES.CHECK_LOGIN);
						} else if (authrequired == "authfailed") {
							contentDiscussionForum.hideLoading();
							contentDiscussionForum
									.showLoginFormMessage(DEFAULT_VAlUES.CHECK_IDPWD);
						} else {
							if (callback) {
								callback.call(this);
							}
						}
					}
				};
				if(xhrX.onerror){
					xhrX.onerror = function() {
						contentDiscussionForum.hideLoading();
						contentDiscussionForum
								.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
										+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
										+ DEFAULT_VAlUES.ERROR);
					};
				}
				xhrX.send("j_username=" + contentDiscussionForum.userName
						+ "&j_password=" + contentDiscussionForum.passWord + "");
			} else if (xhr.readyState == 4) {
				contentDiscussionForum.hideLoading();
				contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
						+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
						+ DEFAULT_VAlUES.ERROR);
			}
			;
		};
		if(xhr.onerror && xhr.ontimeout){
			xhr.onerror = function() {
				contentDiscussionForum.hideLoading();
				contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
						+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
						+ DEFAULT_VAlUES.ERROR);
			};
			xhr.ontimeout = function() {
				contentDiscussionForum.hideLoading();
				contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
						+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
						+ DEFAULT_VAlUES.TIME_OUT);
			};
		}
		xhr.send();
	},

	prepareQuery : function(callback) {
		var xmlHttp = contentDiscussionForum.createXMLHttpRequest();
		if(contentDiscussionForum.isIE){
			xmlHttp.onreadystatechange = function(){
				var object = new Object();
				object.currentTarget = xmlHttp;
				callback.call(this,object);
			};
		}else{
			xmlHttp.onreadystatechange = callback;
		}
		var iurl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ contentDiscussionForum.OSLC_CONTENT_TYPES.CATALOG_DESCRIPTION;
		xmlHttp.open("GET", contentDiscussionForum.getRequestURL(iurl));
		xmlHttp.setRequestHeader("Accept", "application/xml");
		xmlHttp.setRequestHeader("OSLC-Core-Version", "2.0");
		xmlHttp.setRequestHeader('ProxyUrl', iurl);
		xmlHttp.send();
	},

	handlePrepare : function(object) {
		if (object.currentTarget.readyState == 4) {
			contentDiscussionForum.debug(object.currentTarget.reponseText);
			if (object.currentTarget.readyState == 4) {
				var rexml = contentDiscussionForum.getResponseXml(object.currentTarget);
				// get namespace
				var oslcns = contentDiscussionForum.getOslcNs(rexml);
				var areaArray = "";
				if(contentDiscussionForum.isIE){
					areaArray = rexml.getElementsByTagName("oslc:ServiceProvider");
				}else{
					areaArray = rexml.getElementsByTagNameNS(oslcns,"ServiceProvider");
				}
				for (var i = 0; i < areaArray.length; i++) {
					var areaName = "";
					if(contentDiscussionForum.isIE){
						areaName = areaArray[i].getElementsByTagName("dcterms:title");
					}else{
						areaName = areaArray[i].getElementsByTagNameNS(
							contentDiscussionForum.getDctermsNs(rexml), "title");
					}
					if (areaName.length > 0
							&& (areaName[0].textContent == contentDiscussionForum.workArea || areaName[0].text == contentDiscussionForum.workArea)) {
						// get work area Id
						resourceUrl = "";
						if(contentDiscussionForum.isIE){
							resourceUrl = areaArray[i].getElementsByTagName("oslc:details")[0].attributes
								.getNamedItem("rdf:resource").value;
						}else{
							resourceUrl = areaArray[i].getElementsByTagNameNS(
								oslcns, "details")[0].attributes
								.getNamedItem("rdf:resource").value;
						}
						contentDiscussionForum.workAreaId = resourceUrl.substring(
								resourceUrl.lastIndexOf('/') + 1,
								resourceUrl.length);
					}
				}
				if (!contentDiscussionForum.workAreaId) {
					alert(DEFAULT_VAlUES.CONNECT_TO
							+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
							+ DEFAULT_VAlUES.ERROR);
				}
				contentDiscussionForum.queryDiscussionByTag(document
						.getElementById("page-guid").attributes.value.value,
						contentDiscussionForum.showDiscussion);
				// get filedAgainst url,use to createWI
				contentDiscussionForum
						.getFiledAgainstResouce(contentDiscussionForum.workAreaId);
			}
		}
	},

	getFiledAgainstResouce : function(workAreaId) {
		if (!workAreaId) {
			alert(DEFAULT_VAlUES.CONNECT_TO
					+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
					+ DEFAULT_VAlUES.ERROR);
			return;
		}
		var url = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				  + contentDiscussionForum.OSLC_CONTENT_TYPES.CATALOG_XML + "?oslc_cm.query=rtc_cm:projectArea=%22" + contentDiscussionForum.workAreaId +"%22";
		var xhr = contentDiscussionForum.createXMLHttpRequest();
		xhr.open('GET', contentDiscussionForum.getRequestURL(url), true);
		xhr.setRequestHeader('ProxyUrl', url);
		xhr.onreadystatechange = function(e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var rexml = contentDiscussionForum.getResponseXml(xhr);
				var rtccmns = contentDiscussionForum.getRtc_cmNs(rexml);
				var categorys = "";
				if(contentDiscussionForum.isIE){
					categorys = rexml.getElementsByTagName("rtc_cm:Category");
				}else{
					categorys = rexml.getElementsByTagNameNS(rtccmns,
						"Category");
				}
				for (var i = 0; i < categorys.length; i++) {
					category = categorys[i];
					var projectArea = "";
					if(contentDiscussionForum.isIE){
						projectArea = category.getElementsByTagName("rtc_cm:projectArea")[0].getAttribute("rdf:resource");
					}else{
						projectArea = category.getElementsByTagNameNS(rtccmns,
							"projectArea")[0].getAttribute("rdf:resource");
					}
					if (projectArea.endWith(workAreaId)) {
						contentDiscussionForum.filedAgainstResouce = category
								.getAttribute("rdf:resource");
					}
				}
			}
		};
		xhr.send();
	},

	queryDiscussionByTag : function(guid, callback) {
		contentDiscussionForum.showLoading();
		var xmlhttp = contentDiscussionForum.createXMLHttpRequest();
		if (callback) {
			if(contentDiscussionForum.isIE){
				xmlhttp.onreadystatechange = function(){
					var object = new Object();
					object.currentTarget = xmlhttp;
					contentDiscussionForum.showDiscussion.call(this,object);
				}
			}else{
				xmlhttp.onreadystatechange = contentDiscussionForum.showDiscussion;
			}
		}
		var baseUrl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ "/oslc/contexts/"
				+ contentDiscussionForum.workAreaId
				+ "/workitems?oslc.where=dcterms:subject=%22"
				+ guid
				+ "%22 and oslc_cm:closed=false&oslc.select=dcterms:type,dcterms:identifier,dcterms:title,dcterms:subject,dcterms:created,rtc_ext:contextId,dcterms:creator,dcterms:description,oslc:discussedBy,oslc_cm:status&oslc.orderBy=-dcterms:created";
		xmlhttp.open("GET", contentDiscussionForum.getRequestURL(baseUrl), false);
		xmlhttp.setRequestHeader("OSLC-Core-Version", "2.0");
		xmlhttp.setRequestHeader("Content-type", "application/xml");
		xmlhttp.setRequestHeader("Accept", "application/xml");
		xmlhttp.setRequestHeader('ProxyUrl', baseUrl);
		try{
			xmlhttp.send();
		}catch(e){
			contentDiscussionForum.hideLoading();
			contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
					+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
					+ DEFAULT_VAlUES.ERROR);
			contentDiscussionForum.debug(e);
		}
	},

	showDiscussion : function(xmlHttp) {
		if (xmlHttp.currentTarget.readyState == 4) {
			contentDiscussionForum.debug(xmlHttp.currentTarget.reponseText);
			var rexml = contentDiscussionForum.getResponseXml(xmlHttp.currentTarget);
			var rdfns = contentDiscussionForum.getRdfNs(rexml);
			var dctermns = contentDiscussionForum.getDctermsNs(rexml);
			var oslcns = contentDiscussionForum.getOslcNs(rexml);
			var oslc_cmns = contentDiscussionForum.getOslc_cmNs(rexml);
			var wiArray = "";
			if(contentDiscussionForum.isIE){
				wiArray = rexml.getElementsByTagName("rdf:Description");
			}else{
				wiArray = rexml.getElementsByTagNameNS(rdfns, "Description");
			}
			var html = [];
			html = html
					.concat("<div id=\"basic-comment\" class=\"basic-comment\">");
			html = html.concat("<div id=\"comments\" class=\"clearfix\">");
			html = html
					.concat(
							"<div id=\"comment-top-div\"><input type=\"button\" class=\"log-out-message-top\" onclick=\"contentDiscussionForum.logout()\" value=\"",
							DEFAULT_VAlUES.LOG_OUT_MESSAGE, "\"/>");
			html = html
					.concat("<a id=\"go-to-end\" href=\"#comment-bottom-div\" target=\"_self\"></a></div>");
			html = html.concat("<ul id=\"comment_tree\">");
			if (wiArray.length > 0) {
				wi = wiArray[0];
				var wicreate = "";
				if(contentDiscussionForum.isIE){
					wicreate = wi.getElementsByTagName("dcterms:created");
				}else{
					wicreate = wi.getElementsByTagNameNS(
						dctermns, "created");
				}
				wi = contentDiscussionForum.sortWi(wi, wicreate);
				var wiurls = "";
				if(contentDiscussionForum.isIE){
					wiurls = wi.getElementsByTagName("oslc_cm:ChangeRequest");
				}else{
					wiurls = wi.getElementsByTagNameNS(oslc_cmns, "ChangeRequest");
				}
				var titles = "";
				if(contentDiscussionForum.isIE){
					titles = wi.getElementsByTagName("dcterms:title");
				}else{
					titles = wi.getElementsByTagNameNS(dctermns, "title");
				}
				var descriptions = "";
				if(contentDiscussionForum.isIE){
					descriptions = wi.getElementsByTagName("dcterms:description");
				}else{
					descriptions = wi.getElementsByTagNameNS(dctermns,
						"description");
				}
				var creators = "";
				if(contentDiscussionForum.isIE){
					creators = wi.getElementsByTagName("dcterms:creator");
				}else{
					creators = wi.getElementsByTagNameNS(dctermns, "creator");
				}
				var createds = "";
				if(contentDiscussionForum.isIE){
					createds = wi.getElementsByTagName("dcterms:created");
				}else{
					createds = wi.getElementsByTagNameNS(dctermns, "created");
				}
				var comments = "";
				if(contentDiscussionForum.isIE){
					comments = wi.getElementsByTagName("oslc:discussedBy");
				}else{
					comments = wi.getElementsByTagNameNS(oslcns, "discussedBy");
				}
				var statuss = "";
				if(contentDiscussionForum.isIE){
					statuss = wi.getElementsByTagName("oslc_cm:status");
				}else{
					statuss = wi.getElementsByTagNameNS(oslc_cmns, "status")
				}
				var types = "";
				if(contentDiscussionForum.isIE){
					types = wi.getElementsByTagName("dcterms:type");
				}else{
					types = wi.getElementsByTagNameNS(dctermns, "type");
				}
				for (var i = 0; i < titles.length; i++) {
					title = titles[i];
					description = descriptions[i];
					creator = creators[i];
					created = createds[i];
					comment = comments[i];
					res = creator.getAttribute("rdf:resource");
					uId = res.substring(res.lastIndexOf('/') + 1, res.length);
					uName = contentDiscussionForum.getUserInfo(uId);
					var defectUrl = wiurls[i].getAttribute("rdf:about");
					// WI
					html = html.concat("<li id=\"wi_", i, "\">");
					html = html
							.concat("<div class=\"comment_wrapper clearfix\">");
					html = html.concat("<div class=\"member\">");
					html = html.concat("<h5 class=\"display_name\">", uName,
							"</h5>");
					if(CONFIGURATION.proxy_url){
						html = html.concat("<img src=\"",
								contentDiscussionForum.OSLC_CONTENT_TYPES.IMG_SERVICE_URL,
								contentDiscussionForum.getPhotoPathByItemId(contentDiscussionForum.getItemIdByUserId(uId)), "\"  alt=\"", uName, "\"/>");
					}else{
						html = html.concat("<img src=\"",
								contentDiscussionForum.OSLC_CONTENT_TYPES.JTS_SERVICE_URL,
								"/users/photo/", uId, "\"  alt=\"", uName, "\"/>");
					}
					html = html.concat("</div>");
					html = html
							.concat(
									"<div class=\"comment-popup\" onclick=\"contentDiscussionForum.showCommentPopUp(this,'",
									comment.getAttribute("rdf:resource"),
									"',", i, ")\">");
					html = html.concat("<div class=\"comment\">");
					var cdate = newDate(created.firstChild.nodeValue).toLocaleString();
					html = html
							.concat(
									"<h6 class=\"comment_date\">",
									cdate,
									"<a class=\"hide-WI-link\" onclick=\"contentDiscussionForum.openWI('",
									defectUrl,
									"');event.cancelBubble = true;\">",
									types[i].firstChild.nodeValue, " ", defectUrl
											.substring(defectUrl
													.lastIndexOf('/') + 1,
													defectUrl.length), "</a>",
									statuss[i].firstChild.nodeValue, "</h6>");
					html = html.concat("<div class=\"comment_content\">");
					var titleHtml = "";
					if (title.getAttribute("rdf:parseType")) {
						titleHtml = title.firstChild.nodeValue;
					} else {
						titleHtml = title.firstChild.nodeValue.decodeHtml();
					}
					html = html
							.concat(
									"<p class=\"comment_content_summary\"><font class=\"comment_content_subject\">",
									DEFAULT_VAlUES.SUBJECT, ":</font>",
									titleHtml, "</p>");
					var desHtml = "";
					//remove the first line of the description
					desText = description.lastChild.nodeValue;
					if(desText && desText.indexOf('<br/>') > -1){
						desText = desText.substring(desText.indexOf('<br/>') + 5,desText.length);
					}
					if (description.getAttribute("rdf:parseType")) {
						desHtml = desText;
					} else {
						desHtml = desText.decodeHtml();
					}
					html = html.concat(
							"<p class=\"comment_content_description\">",
							desHtml, "</p>");
					html = html.concat("</div>");
					html = html.concat("<div class=\"expand-comment\"></div>");
					html = html.concat("</div></div>");
					html = html.concat("</li>");
				}
				html = html.concat("<li id=\"wi_new\"><div class=\"start-topic-wrapper\"><span class=\"start-topic\" onclick=\"contentDiscussionForum.showNewTopicSection()\">Start New Topic</span></div></li>");
			} else {
				// submit form
				html = html.concat("<li id=\"wi_new\"></li>");
			}
			html = html.concat("</ul>");
			html = html.concat("<div id=\"comment-bottom-div\">");
			html = html.concat("<a id=\"back-to-beginning\" href=\"#",
					contentDiscussionForum.div_name, "\" target=\"_self\"></a> ");
			html = html
					.concat(
							"<input type=\"button\" class=\"log-out-message-bottom\" onclick=\"contentDiscussionForum.logout()\" value=\"",
							DEFAULT_VAlUES.LOG_OUT_MESSAGE, "\"/>");
			html = html.concat("</div></div></div>");
			document.getElementById(contentDiscussionForum.div_name).innerHTML = html
					.join("");
			if(wiArray.length <= 0) {
				contentDiscussionForum.showNewTopicSection();
			}
			var cls = getElementsByClassName(document, "comment-popup");
			for (var i = 0; i < cls.length; i++) {
				cls[i].onclick();
			}
			contentDiscussionForum.hideLoading();
		}
	},

	openWI : function(url) {
		window.open(url, "_blank");
		return;
	},

	getWIComments : function(commentUrl) {
		contentDiscussionForum.testConnect();
		var xmlhttp = contentDiscussionForum.createXMLHttpRequest();
		var iurl = commentUrl
				+ "?oslc.orderBy=-dcterms:created&oslc.prefix=dcterms=<http://purl.org/dc/terms/>";
		xmlhttp.open("GET", contentDiscussionForum.getRequestURL(iurl), false);
		xmlhttp.setRequestHeader("OSLC-Core-Version", "2.0");
		xmlhttp.setRequestHeader("Accept", "application/json");
		xmlhttp.setRequestHeader("Content-type", "application/json");
		xmlhttp.setRequestHeader('ProxyUrl', iurl);
		xmlhttp.send();
		// means
		var jsonArray = new Array();
		var returnJson = JSON.parse(xmlhttp.responseText);
		var discussion = returnJson["rdf:about"];
		var json = new Object();
		if (discussion.indexOf("?") > -1) {
			discussion = discussion.substring(0, discussion.indexOf("?"));
		}
		if (!returnJson["oslc:comment"]
				|| returnJson["oslc:comment"].length == 0) {
			contentDiscussionForum.debug("no comments");
			json.curl = discussion;
			return json;// no comments,return url
		} else {
			var comments = returnJson["oslc:comment"];
			for (var i = 0; i < comments.length; i++) {
				var json = new Object();
				res = comments[i]["dcterms:creator"]["rdf:resource"];
				uId = res.substring(res.lastIndexOf('/') + 1, res.length);
				uName = contentDiscussionForum.getUserInfo(uId);
				json.uId = uId;
				json.uName = uName;
				json.time = comments[i]["dcterms:created"];
				json.text = comments[i]["dcterms:description"];
				json.curl = discussion;
				if (json.curl.indexOf("?") > -1) {
					json.curl = json.curl.substring(0, json.curl.indexOf("?"));
				}
				jsonArray[i] = json;
			}
		}
		return jsonArray;
	},

	createWIByOSLC : function() {
		if (!contentDiscussionForum.filedAgainstResouce) {
			alert(DEFAULT_VAlUES.NO_FILEDAGAINSTRESOUCE);
			contentDiscussionForum.hideLoading();
			return;
		}
		contentDiscussionForum.showLoading();
		contentDiscussionForum.testConnect();
		var summary = document.getElementById("comment-form-summary").value;
		var description = document.getElementById("comment-form-description").value;
		description = description == DEFAULT_VAlUES.DESCRIPTION ? "" : description;
		if (!summary || summary == DEFAULT_VAlUES.SUMMARY) {
			alert(DEFAULT_VAlUES.SUMMARY_DESCRIPTION);
			contentDiscussionForum.hideLoading();
			return;
		}
		var cwi = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ "/oslc/contexts/" + contentDiscussionForum.workAreaId + "/workitems/"
				+ CONFIGURATION.default_work_item_type;
		root = [ "<rdf:RDF " ];
		root = root.concat("xmlns:dcterms=\""
				+ contentDiscussionForum.OSLC_CONTENT_TYPES.DC_TERMS + "\" ");
		root = root.concat("xmlns:rdf=\""
				+ contentDiscussionForum.OSLC_CONTENT_TYPES.RDF + "\" ");
		root = root.concat("xmlns:rtc_cm=\""
				+ contentDiscussionForum.OSLC_CONTENT_TYPES.RTC_CM + "\"");
		root = root.concat(">");
		root = root.concat("<rdf:Description ");
		root = root.concat("rdf:nodeID=\"AO\"");
		root = root.concat(">");
		root = root.concat("<dcterms:title ");
		root = root.concat("rdf:parseType=\"Literal\"");
		root = root.concat(">");
		root = root.concat(summary.encodeHtml());
		root = root.concat("</dcterms:title>");
		root = root.concat("<dcterms:description rdf:parseType=\"Literal\">");
		if(getElementsByClassName(document,"pageTitle")[0]){
			var locaUrl = window.location.href;
			var target = "";
			if(locaUrl && locaUrl.indexOf('?') > -1){
				var search = window.location.search;
				target = locaUrl.replace(search,"");
			}else{
				target = locaUrl;
			}
			root = root.concat("<a href=\"",target,"\">",getElementsByClassName(document,"pageTitle")[0].innerHTML,"</a><br></br>");
		}
		root = root.concat(description.encodeHtml());
		root = root.concat("</dcterms:description>");
		root = root.concat("<rtc_cm:filedAgainst ");
		root = root.concat("rdf:resource=\""
				+ contentDiscussionForum.filedAgainstResouce + "\">");
		root = root.concat("</rtc_cm:filedAgainst>");
		root = root.concat("<dcterms:subject>");
		root = root
				.concat(document.getElementById("page-guid").attributes.value.value);// add
		// GUID
		root = root.concat("</dcterms:subject>");
		root = root.concat("</rdf:Description>");
		root = root.concat("</rdf:RDF>");
		var cwixhr = contentDiscussionForum.createXMLHttpRequest();
		cwixhr.open('POST', contentDiscussionForum.getRequestURL(cwi), false);
		cwixhr.setRequestHeader("Content-Type", "application/rdf+xml");
		cwixhr.setRequestHeader("OSLC-Core-Version", "2.0");
		cwixhr.setRequestHeader("Accept", "application/xml");
		cwixhr.setRequestHeader('ProxyUrl', cwi);
		cwixhr.onreadystatechange = function() {
			if (cwixhr.readyState == 4 && cwixhr.status == 201) {// 201 means
				// success,refresh
				contentDiscussionForum.hideLoading();
				// comments
				contentDiscussionForum.queryDiscussionByTag(document
						.getElementById("page-guid").attributes.value.value,
						contentDiscussionForum.showDiscussion);
			} else{
				if(contentDiscussionForum.isIE){
					// IE skip
				}else if (cwixhr.status == 403) {
					contentDiscussionForum.hideLoading();
					alert(DEFAULT_VAlUES.NOPERMISSION);
				} else if (cwixhr.status == 404) {
					contentDiscussionForum.hideLoading();
					alert(DEFAULT_VAlUES.NOWITYPE
							+ CONFIGURATION.default_work_item_type);
				}
			}
		};
		cwixhr.send(root.join(""));
		window.scrollTo(0, 99999);
	},

	showCommentPopUp : function(object, commentUrl, idx) {
		if (getElementsByClassName(object,"expand-comment")[0]) {
			getElementsByClassName(object,"expand-comment")[0].setAttribute(
					"class", "collapse-comment");
		} else if (getElementsByClassName(object,"collapse-comment")[0]) {
			getElementsByClassName(object,"collapse-comment")[0].setAttribute(
					"class", "expand-comment");
		}
		if (object.parentNode.parentNode.childNodes.length == 1) {
			// comments
			var commentArray = contentDiscussionForum.getWIComments(commentUrl);
			var html = [];
			var ul = document.createElement("ul");
			ul.setAttribute("class", "replies");
			
			if (commentArray.length > 0) {
				commentArray = contentDiscussionForum.sortComment(commentArray);
				for (var i = 0; i < commentArray.length; i++) {
					html = html.concat("<li class=\"reply deep-2\" id=\"reply_", idx, "_", i , "\">");
					html = html
							.concat("<div class=\"comment_wrapper clearfix\">");
					html = html.concat("<div class=\"member\">");
					html = html.concat("<h5 class=\"display_name\">",
							commentArray[i].uName, "</h5>");
					if(CONFIGURATION.proxy_url){
						html = html.concat("<img src=\"",
								contentDiscussionForum.OSLC_CONTENT_TYPES.IMG_SERVICE_URL,
								contentDiscussionForum.getPhotoPathByItemId(contentDiscussionForum.getItemIdByUserId(commentArray[i].uId)), "\"  alt=\"", commentArray[i].uName, "\"/>");
					}else{
						html = html.concat("<img src=\"",
								contentDiscussionForum.OSLC_CONTENT_TYPES.JTS_SERVICE_URL,
								"/users/photo/", commentArray[i].uId, "\"  alt=\"",
								commentArray[i].uName, "\"/>");
					}
					html = html.concat("</div>");
					html = html.concat("<div class=\"comment\">");
					html = html.concat("<h6 class=\"comment_date\">", newDate(commentArray[i].time.toLocaleString()).toLocaleString(), "</h6>");
					html = html.concat("<div class=\"comment_content\">");
					html = html.concat("<p>", commentArray[i].text, "</p>");
					html = html.concat("</div></div></li>");
				}
			}
			// submit form
			html = html.concat("<li class=\"reply deep-2\" id=\"reply_", idx, "_new\">");
			var url = "";
			if (commentArray.curl) {
				url = commentArray.curl;
			} else {
				url = commentArray[0].curl;
			}
			html = html.concat("<div class=\"reply-to-topic-wrapper\"><span class=\"reply-to-topic\" onclick=\"contentDiscussionForum.showReplyToTopicSection('" + idx + "', '", url, "')\">Reply to this Topic</span></div>");
			html = html.concat("</li>");
			ul.innerHTML = html.join("");
			object.parentNode.parentNode.appendChild(ul);
		} else {
			var commentElement = object.parentNode.parentNode
					.getElementsByTagName("ul")[0];
			object.parentNode.parentNode.removeChild(commentElement);
		}
		contentDiscussionForum.hideLoading();
	},

	addComments : function(url, object) {
		var parent = object.parentElement;
		while (parent.getElementsByTagName("textarea").length == 0) {
			parent = parent.parentElement;
		}
		var value = parent.getElementsByTagName("textarea")[0].value;
		if (!value || value == DEFAULT_VAlUES.COMMENT) {
			alert(DEFAULT_VAlUES.IN_COMMENT);
			contentDiscussionForum.hideLoading();
			return;
		}
		contentDiscussionForum.showLoading();
		contentDiscussionForum.testConnect();
		var xmlhttp = contentDiscussionForum.createXMLHttpRequest();
		postData = '{"dcterms:description": "' + value.encodeHtml() + '"}';
		baseUrl = url + "/oslc:comment";
		xmlhttp.open("POST", contentDiscussionForum.getRequestURL(baseUrl), false);
		xmlhttp.setRequestHeader("OSLC-Core-Version", "2.0");
		xmlhttp.setRequestHeader("Content-type", "application/json");
		xmlhttp.setRequestHeader("Accept", "application/xml");
		xmlhttp.setRequestHeader('ProxyUrl', baseUrl);
		xmlhttp.send(postData);

		contentDiscussionForum.hideLoading();
		if (xmlhttp.status == 403) {
			alert(DEFAULT_VAlUES.NOPERMISSION);
		} else {
			document.getElementById("comment-form-comment").value = "";
			// draw new comment
			var parent = object.parentNode;
			while (parent.className && parent.className != "replies") {
				parent = parent.parentNode;
			}
			if (parent.previousSibling
					&& getElementsByClassName(parent.previousSibling,"comment-popup").length > 0) {
				var WI = getElementsByClassName(parent.previousSibling,"comment-popup")[0];
				WI.onclick();
				WI.onclick();
			}
		}
	},

	getUserInfo : function(userId) {
		if (!contentDiscussionForum.userNameMap) {
			contentDiscussionForum.userNameMap = new Map();
		}
		var userName = contentDiscussionForum.userNameMap.get(userId);
		if (userName) {
			return userName;
		}
		// username
		var xmlhttp = contentDiscussionForum.createXMLHttpRequest();
		baseUrl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ "/oslc/users.xml?oslc_cm.query=rtc_cm:userId=%22" + userId
				+ "%22";
		xmlhttp.open("GET", contentDiscussionForum.getRequestURL(baseUrl), false);
		xmlhttp.setRequestHeader('ProxyUrl', baseUrl);
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 ){
				if(xmlhttp.status != 200){
					contentDiscussionForum.hideLoading();
					contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
							+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
							+ DEFAULT_VAlUES.ERROR);
					return;
				}
			}
		};
		try{
			xmlhttp.send();
		}catch(e){
			contentDiscussionForum.hideLoading();
			contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.CONNECT_TO
					+ contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
					+ DEFAULT_VAlUES.ERROR);
			contentDiscussionForum.debug(e);
		}
		var rexml = contentDiscussionForum.getResponseXml(xmlhttp);
	
		var dcns = contentDiscussionForum.getDcNs(rexml);
		if(contentDiscussionForum.isIE){
			userName = rexml.getElementsByTagName("dc:title")[0].text;
		}else{
			userName = rexml.getElementsByTagNameNS(dcns, "title")[0].innerHTML;
		}
		
		contentDiscussionForum.userNameMap.put(userId, userName);
		return userName;
	},

	testConnect : function() {
		var xhr = contentDiscussionForum.createXMLHttpRequest();
		var url = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL
				+ '/authenticated/identity';
		xhr.open('POST', contentDiscussionForum.getRequestURL(url), false);
		xhr.setRequestHeader('ProxyUrl', url);
		xhr.send();
		var header = xhr
				.getResponseHeader(contentDiscussionForum.OSLC_CONTENT_TYPES.AUTH_STATUS_HEADER);
		if (header == "authrequired") {
			contentDiscussionForum.showLoginFormMessage(DEFAULT_VAlUES.SESSION_OUT);
		}
	},

	getItemIdByUserId : function(id){
		id = unescape(id);
		if(!contentDiscussionForum.userItemIdMap){
			contentDiscussionForum.userItemIdMap = new Map();
		}
		var itemId = contentDiscussionForum.userItemIdMap.get(id);
		if (!itemId) {
			var xhr = contentDiscussionForum.createXMLHttpRequest();
			var iurl = contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL + "/service/com.ibm.team.repository.service.internal.IAdminRestService/contributors?searchTerm=%25" + id + "%25&";
			xhr.open('GET', contentDiscussionForum.getRequestURL(iurl), false);
			xhr.setRequestHeader('ProxyUrl', iurl);
			xhr.send();
			var xml = xhr.responseXML;
			var values = xml.getElementsByTagName("elements");
			for(var i=0;i<values.length;i++){
				contentDiscussionForum.userItemIdMap.put(values[i].getElementsByTagName("userId")[0].innerHTML,values[i].getElementsByTagName("itemId")[0].innerHTML);
			}
			itemId = contentDiscussionForum.userItemIdMap.get(id);
		}
		return itemId;
	},
	getPhotoPathByItemId : function(itemid){
		return contentDiscussionForum.OSLC_CONTENT_TYPES.SERVICE_URL + "/service/com.ibm.team.repository.service.internal.IMemberPhotoService?contributorItemId=" + itemid;
	},
	
	setUserCookie : function(uName, pWord) {
		this.addCookie("userName", uName, 7 * 24);
		this.addCookie("passWord", pWord, 7 * 24);
	},

	addCookie : function(objName, objValue, objHours) {// add cookie
		var str = objName + "=" + escape(objValue);
		if (objHours > 0) {
			var date = new Date();
			var ms = objHours * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			str += "; expires=" + date.toGMTString() + ";path=/";
		}
		document.cookie = str;
	},

	getCookie : function(objName) {
		var arrStr = document.cookie.split("; ");
		for (var i = 0; i < arrStr.length; i++) {
			var temp = arrStr[i].split("=");
			if (temp[0] == objName)
				return unescape(temp[1]);
		}
	},

	delCookie : function(name) {
		var date = new Date();
		date.setTime(date.getTime() - 365 * 3600 * 1000);
		document.cookie = name + "=a; expires=" + date.toGMTString()
				+ ";path=/";
	},

	showLoading : function() {
		var load = document.getElementById(contentDiscussionForum.loading_div_name);
		var target = document.getElementById(contentDiscussionForum.div_name);
		if (load && target) {
			load.style.left = '0px';
			load.style.height = load.parentElement.scrollHeight + "px";
			load.style.top = target.offsetTop + 'px';
			load.style.display = "block";
		}
	},

	hideLoading : function(type) {
		switch (type) {
		case 'toEnd':
			window.scrollTo(0, 99999);
			break;
		default:

		}
		;
		if (document.getElementById(contentDiscussionForum.loading_div_name)) {
			document.getElementById(contentDiscussionForum.loading_div_name).style.display = "none";
		}
	},

	sortWi : function(WIArray, timeArray) {
		// remove text element,for IE
		var noTextArray = new Array();
		var j = 0;
		for(var i = 0; i < WIArray.childNodes.length; i++){
			if(WIArray.childNodes[i].nodeName != '#text'){
				noTextArray[j++] = WIArray.childNodes[i];
			}
		}
		while (WIArray.childNodes.length > 0) {// remove old children
			WIArray.removeChild(WIArray.childNodes[0]);
		}
		for (var i = 0; i < noTextArray.length; i++) {// add new children
			WIArray.appendChild(noTextArray[i]);
		}
		var jsonArray = new Array();
		for (var i = 0; i < timeArray.length; i++) {
			var json = new Object();
			json.order = i;
			if(contentDiscussionForum.isIE){
				json.time = timeArray[i].text;
			}else{
				json.time = timeArray[i].innerHTML;
			}
			jsonArray[i] = json;
		}
		contentDiscussionForum.bubbleSortTime(jsonArray);
		var newWIArray = new Array();
		for (var i = 0; i < WIArray.childNodes.length; i++) {
			newWIArray[i] = WIArray.childNodes[jsonArray[i].order];
		}
		while (WIArray.childNodes.length > 0) {
			WIArray.removeChild(WIArray.childNodes[0]);
		}
		for (var i = 0; i < jsonArray.length; i++) {
			WIArray.appendChild(newWIArray[i]);
		}
		return WIArray;
	},

	sortComment : function(array) {
		var jsonArray = new Array();
		for (var i = 0; i < array.length; i++) {
			var json = new Object();
			json.order = i;
			json.time = array[i].time;
			jsonArray[i] = json;
		}
		contentDiscussionForum.bubbleSortTime(jsonArray);
		var newArray = new Array();
		for (var i = 0; i < array.length; i++) {
			newArray[i] = array[jsonArray[i].order];
		}
		return newArray;
	},

	bubbleSortTime : function(array/* [order:1,time:2015-01-13T04:04:11.544Z],[order:2,time:2015-01-13T04:04:11.544Z] */) {
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				var itime = new Date(array[i].time);
				var jtime = new Date(array[j].time);
				if (itime.getTime() > jtime.getTime()) {
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
		}
		return array;
	},

	createXMLHttpRequest : function() {
		if (window.XMLHttpRequest) {
			return new window.XMLHttpRequest;
		} else {
			try {
				return new ActiveXObject("MSXML2.XMLHTTP.3.0");
			} catch (ex) {
				return null;
			}
		}
	},

	getResponseXml : function(xhr) {
		var oDOM = "";
		if(typeof(DOMParser) == 'undefined'){// IE 7
			
			var oXmlDom = function(){
				var aVersions = [ "MSXML2.DOMDocument.5.0",
				   "MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0",
				   "MSXML2.DOMDocument","Microsoft.XmlDom"
				];
				for (var i = 0; i < aVersions.length; i++) {
					 try {
						 var oXmlDom = new ActiveXObject(aVersions[i]);
						 return oXmlDom;
					 } catch (oError) {
						   // do nothing
					 }
				}
			}.apply();
			oXmlDom.async = false;
			oXmlDom.loadXML(xhr.responseText);
			oXmlDom.removeChild(oXmlDom.childNodes[0]);
			oDOM = oXmlDom;
		} else {
			var parser = new DOMParser();
			oDOM = parser.parseFromString(xhr.responseText,
					'application/xml');
		}
		return oDOM;
	},

	getOslcNs : function(rexml) {
		return rexml.childNodes[0].attributes.getNamedItem("xmlns:oslc").value;
	},

	getOslc_cmNs : function(rexml) {
		if (rexml.childNodes[0].attributes.getNamedItem("xmlns:oslc_cm")) {
			return rexml.childNodes[0].attributes.getNamedItem("xmlns:oslc_cm").value;
		}
	},

	getDctermsNs : function(rexml) {
		if (rexml.childNodes[0].attributes.getNamedItem("xmlns:dcterms")) {
			return rexml.childNodes[0].attributes.getNamedItem("xmlns:dcterms").value;
		}
	},

	getRdfNs : function(rexml) {
		return rexml.childNodes[0].attributes.getNamedItem("xmlns:rdf").value;
	},

	getJfs_procnsNs : function(rexml) {
		return rexml.childNodes[0].attributes.getNamedItem("xmlns:jfs_proc").value;
	},

	getRtc_cmNs : function(rexml) {
		return rexml.childNodes[0].attributes.getNamedItem("xmlns:rtc_cm").value;
	},

	getDcNs : function(rexml) {
		return rexml.childNodes[0].attributes.getNamedItem("xmlns:dc").value;
	},
	
	showNewTopicSection : function() {
		var ulElement = document.getElementById("comment_tree");
		var newLiElement = ulElement.querySelector("#wi_new");
		var html = [];
		html = html.concat("<div class=\"comment_wrapper clearfix\">");
				html = html.concat("<div class=\"member\">");
				html = html.concat("<h5 class=\"display_name\">",
						contentDiscussionForum.titleName, "</h5>");
				if(CONFIGURATION.proxy_url){
					html = html.concat("<img src=\"",
							contentDiscussionForum.OSLC_CONTENT_TYPES.IMG_SERVICE_URL,
							contentDiscussionForum.getPhotoPathByItemId(contentDiscussionForum.getItemIdByUserId(contentDiscussionForum.userName)), "\"  alt=\"", contentDiscussionForum.titleName, "\"/>");
				}else{
					html = html.concat("<img src=\"",
							contentDiscussionForum.OSLC_CONTENT_TYPES.JTS_SERVICE_URL,
							"/users/photo/", contentDiscussionForum.userName, "\"  alt=\"",
							contentDiscussionForum.titleName, "\"/>");
				}
				html = html.concat("</div>");
				html = html
						.concat("<div id=\"comment_submit\" class=\"comment_submit\">");
				html = html.concat("<h6 class=\"comment_date\"></h6>");
				html = html.concat("<div class=\"comment-summary\">");
				html = html
						.concat(
								"<input type=\"text\" id=\"comment-form-summary\" value=\"",
								DEFAULT_VAlUES.SUMMARY,
								"\" onfocus=\"if(value=='",
								DEFAULT_VAlUES.SUMMARY,
								"'){this.style.color='black';value=''}\" onblur=\"if(value==''){this.style.color='gray';value='",
								DEFAULT_VAlUES.SUMMARY, "'}\"/>");
				html = html.concat("</div>");
				html = html.concat("<div class=\"comment-description\">");
				html = html
						.concat(
								"<textarea id=\"comment-form-description\" onfocus=\"if(value=='",
								DEFAULT_VAlUES.DESCRIPTION,
								"'){this.style.color='black';value=''}\" onblur=\"if(value==''){this.style.color='gray';value='",
								DEFAULT_VAlUES.DESCRIPTION, "'}\">",
								DEFAULT_VAlUES.DESCRIPTION, "</textarea>");
				html = html.concat("</div>");
				html = html.concat("<div class=\"comment-submit\">");
				html = html
						.concat(
								"<input type=\"button\" onclick=\"contentDiscussionForum.createWIByOSLC()\" value=\"",
								DEFAULT_VAlUES.SUBMIT, "\"/>");
				html = html.concat("</div>");
				html = html.concat("</div>");
				html = html.concat("</div>");
		newLiElement.innerHTML = html.join("");
	},

	showReplyToTopicSection : function(idx, url) {
		var liElement = document.getElementById("reply_" + idx + "_new");
		var html = [];
		html = html.concat("<div class=\"comment_wrapper clearfix\">");
			html = html.concat("<div class=\"member\">");
			html = html.concat("<h5 class=\"display_name\">",
					contentDiscussionForum.titleName, "</h5>");
			if(CONFIGURATION.proxy_url){
				html = html.concat("<img src=\"",
						contentDiscussionForum.OSLC_CONTENT_TYPES.IMG_SERVICE_URL,
						contentDiscussionForum.getPhotoPathByItemId(contentDiscussionForum.getItemIdByUserId(contentDiscussionForum.userName)), "\"  alt=\"", contentDiscussionForum.titleName, "\"/>");
			}else{
				html = html.concat("<img src=\"",
						contentDiscussionForum.OSLC_CONTENT_TYPES.JTS_SERVICE_URL,
						"/users/photo/", contentDiscussionForum.userName, "\"  alt=\"",
						contentDiscussionForum.titleName, "\"/>");
			}
			html = html.concat("</div>");
			html = html.concat("<div class=\"comment\">");
			html = html.concat("<h6 class=\"comment_date\"></h6>");
			html = html.concat("<div class=\"comment-description\">");
			html = html
					.concat(
							"<textarea id=\"comment-form-comment\" onfocus=\"if(value=='",
							DEFAULT_VAlUES.COMMENT,
							"'){this.style.color='black';value=''}\" onblur=\"if(value==''){this.style.color='gray';value='",
							DEFAULT_VAlUES.COMMENT, "'}\">",
							DEFAULT_VAlUES.COMMENT, "</textarea>");
			html = html.concat("</div>");
			html = html.concat("</div>");
			html = html.concat("<div class=\"comment-submit\">");
			html = html
					.concat(
							"<input type=\"button\" onclick=\"contentDiscussionForum.addComments('",
							url, "',this)\" value=\"", DEFAULT_VAlUES.SUBMIT,
							"\"/>");
			html = html.concat("</div>");
			liElement.innerHTML = html.join("");
	},
	debug : function(content){
		if(navigator.appName && navigator.appVersion 
			&& navigator.appName == "Microsoft Internet Explorer"){
			// ignore IE
		}else{
			if(CONFIGURATION.debugMode && typeof(console) == 'undefined' && console.debug){
				console.debug(content);
			}
		}
	}

};

String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};

String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};

var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
var HTML_DECODE = {
	"&lt;" : "<",
	"&gt;" : ">",
	"&amp;" : "&",
	"&nbsp;" : " ",
	"&quot;" : "\"",
	"&copy;" : ""

// Add more
};

String.prototype.encodeHtml = function(s) {
	s = (s != undefined) ? s : this.toString();
	return (typeof s != "string") ? s : s.replace(REGX_HTML_ENCODE,
			function($0) {
				var c = $0.charCodeAt(0), r = [ "&#" ];
				c = (c == 0x20) ? 0xA0 : c;
				r.push(c);
				r.push(";");
				return r.join("");
			});
};

String.prototype.decodeHtml = function(s) {
	s = (s != undefined) ? s : this.toString();
	s = s.replace("</br>", "").replace("&lt;/br&gt;", "");
	return (typeof s != "string") ? s : s.replace(REGX_HTML_DECODE, function(
			$0, $1) {
		var c = HTML_DECODE[$0];
		if (c == undefined) {
			// Maybe is Entity Number
			if (!isNaN($1)) {
				c = String.fromCharCode(($1 == 160) ? 32 : $1);
			} else {
				c = $0;
			}
		}
		return c;
	});
};

function Map() {
	this.container = new Object();
}

Map.prototype.put = function(key, value) {
	this.container[key] = value;
};

Map.prototype.get = function(key) {
	return this.container[key];
};

Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for ( var key in this.container) {
		if (key == 'extend') {
			continue;
		}
		keyset[count] = key;
		count++;
	}
	return keyset;
};

Map.prototype.size = function() {
	var count = 0;
	for ( var key in this.container) {
		if (key == 'extend') {
			continue;
		}
		count++;
	}
	return count;
};

Map.prototype.remove = function(key) {
	delete this.container[key];
};

Map.prototype.toString = function() {
	var str = "";
	for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
		str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
	}
	return str;
};

function getElementsByClassName(object,className){
	if(!object.getElementsByClassName){
		object.getElementsByClassName=function(cls){
				var els=this.getElementsByTagName('*');
				var ell=els.length;
				var elements=[];
				for(var n=0;n<ell;n++){
						var oCls=els[n].className||'';
						if(oCls.indexOf(cls)<0)        continue;
						oCls=oCls.split(/\s+/);
						var oCll=oCls.length;
						for(var j=0;j<oCll;j++){
								if(cls==oCls[j]){
										elements.push(els[n]);
										break;
								}
						}
				}
				return elements;
		};
	}
	return object.getElementsByClassName(className);
}

// "2015-03-09T08:46:24.299Z" UTC date
function newDate(UTCDate) { 
	if(contentDiscussionForum.isIE){
		var dstr = UTCDate.split('T'); 
		var day = dstr[0].split('-');
		var time = dstr[1].split(':');
		var timez = time[2].split('.');
		var date = new Date(); 
		date.setUTCFullYear(day[0], day[1] - 1, day[2]); 
		date.setUTCHours(time[0]-8, time[1], timez[0], 0); 
		return date; 
	}else{
		return new Date(UTCDate);
	}
	
}
