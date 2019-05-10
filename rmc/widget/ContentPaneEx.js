//------------------------------------------------------------------------------
// Copyright (c) 2004, 2007 IBM Corporation.  All Rights Reserved.
//------------------------------------------------------------------------------
// Extends the dojo.widget.ContentPane to provide additional customization.
//
// Author: Jinhua Xi

dojo.provide("rmc.widget.ContentPaneEx");

dojo.require("dojo.widget.*");
dojo.require("dojo.io.*");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.string");
dojo.require("dojo.string.extras");
dojo.require("dojo.html.style");

dojo.widget.defineWidget(
	"rmc.widget.ContentPaneEx",
	dojo.widget.ContentPane,
	{
		history: {
		},
		
		postCreate: function(args, frag, parentComp) {
			rmc.widget.ContentPaneEx.superclass.postCreate.apply(this, arguments);
		},
		
		destroy: function() {
			rmc.widget.ContentPaneEx.superclass.destroy.apply(this, arguments);
		},
		
		onLoad: function(e) {
			rmc.widget.ContentPaneEx.superclass.onLoad.apply(this, arguments);
			//alert("loaded: " + this.href);
			//alert("home: " + location.href);
			//alert("hash: " + location.hash); 
		},
	
		onDownloadEnd: function(url, data){
			
			// this is a workaround. ContentPane adjustpath is toooo slow.
			// so we disable it and manually fix the urls
			// currently this only apply to the Index pane
			if ( !this.adjustPaths) {
				data = data.replace(/\.\.\//g, "");		
			}
			// add alphabetic in glossary and index page
			if ((url == theApp.glossaryPaneUrl)||(url == theApp.indexPaneUrl)) {
				var regex;
				navigContent = "";
				if (url == theApp.glossaryPaneUrl)
				{
					regex = /<\s*a\s+id=\"_GLOSSARY_ITEM_([A-Z])\"\s+name=\".+\"\s*>\s*([A-Z])\s*<\s*\/a\s*>/gi;
					while (tag = regex.exec(data)){
						navigContent = navigContent + "<a href=\"#"+tag[1]+"\">"+tag[2]+"</a><br>"
					}
					regex = /<\s*a\s+id=\"_GLOSSARY_ITEM_(.+)\"\s+name=\"(.+)\"\s*>\s*([^<]*)\s*<\s*\/a\s*>/gi;
					while (tag = regex.exec(data)){
						var length = tag[0].length;
						tag[0] = "<a id=\"_GLOSSARY_ITEM_" + tag[1]+"\" name=\"" + tag[2] + "\">"+"&nbsp;&nbsp;&nbsp;&nbsp;" + tag[3] + "</a>";
						data = data.substring(0, tag.index) + tag[0]+data.substring(tag.index+length);
					}
				}
				else if (url == theApp.indexPaneUrl)
				{	
					regex = /<\s*a\s+id=\"(_INDEX_ITEM_[A-Z])\"\s+name=\"([A-Z])\"\s*>\s*([A-Z])\s*<\s*\/a\s*>/gi;
					while(tag = regex.exec(data)){
						var length = tag[0].length;
						navigContent = navigContent + "<a alphabet=\"true\" href=\"#" + tag[1] + "\">" + tag[3] + "</a><br>"
						tag[0] = "<a id=\""+tag[1] + "\" name=\"" + tag[2] + "\">" + tag[3] + "</a>";
						data = data.substring(0, tag.index) + tag[0] + data.substring(tag.index+length);
					}
				}
				
				var startStr = "<table style=\"left: 0px; top: 0px;\">\n<tr>\n<td width=10%>\n<div style=\"position:absolute ;overflow:auto;width:15px; left: 5px; top: 5px;\">\n<font face=\"Arial, Helvetica, sans-serif\">\n" + navigContent + "</font>\n</div>\n</td>\n<td width=10%><div>&nbsp;&nbsp;&nbsp;</div></td><td  width=85%>\n<div style=\"left: 20px; top: 10px;\">\n";
				regex = /<\s*body[^>]*>/gi;
				regex.lastIndex = 0;
				if (tag = regex.exec(data)){
					var length = tag[0].length;
					data = data.substring(0,tag.index+length) + startStr+data.substring(tag.index+length);
					endStr = "</div>\n</td>\n</tr>\n</table>";
					regex = /<\s*\/body.*[^>]*.*>/gi;
					if (tag = regex.exec(data)){
						data = data.substring(0,tag.index) + endStr+data.substring(tag.index);
					}
				}
			}
			
			rmc.widget.ContentPaneEx.superclass.onDownloadEnd.apply(this, arguments);

		},	
		
		
 		__END: true
	}
);
