//------------------------------------------------------------------------------
// Copyright (c) 2004, 2007 IBM Corporation.  All Rights Reserved.
//------------------------------------------------------------------------------
// Extends the dojo.widget.AccordionContainer to add the following UI elements
// to its accordion panes:
//   1. Expand/Collapse indicators
//   2. Close buttons
//
// Author: Jinhua Xi
// Author: Kelvin Low

dojo.provide("rmc.widget.AccordionContainerEx");
dojo.require("dojo.widget.*");
dojo.require("dojo.io.*");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.string");
dojo.require("dojo.string.extras");
dojo.require("dojo.html.style");

dojo.widget.defineWidget(
	"rmc.widget.AccordionContainerEx",
	dojo.widget.AccordionContainer,
	{
		ns: "rmc",
		
		postCreate: function(args, frag, parentComp) {
			rmc.widget.AccordionContainerEx.superclass.postCreate.apply(this, arguments);
			this.duration = 10;
		},
		
		destroy: function() {
			rmc.widget.AccordionContainerEx.superclass.destroy.apply(this, arguments);
		},
		
		_addChild: function(/*Widget*/ widget) {
			// summary
			//		Internal call to add child, used during postCreate() and by the real addChild() call
			if (widget.open) {
				dojo.deprecated("open parameter deprecated, use 'selected=true' instead will be removed in ", "0.5");
				dojo.debug(widget.widgetId + ": open == " + widget.open);
				widget.selected = true;
			}
			if (widget.widgetType != "AccordionPaneEx") {
				var wrapper=dojo.widget.createWidget("AccordionPaneEx",{label: widget.label, selected: widget.selected, labelNodeClass: this.labelNodeClass, containerNodeClass: this.containerNodeClass, allowCollapse: this.allowCollapse, closeButton_text: theApp.res.closeButton_text });
				wrapper.addChild(widget);
				this.addWidgetAsDirectChild(wrapper);
				this.registerChild(wrapper, this.children.length);
				return wrapper;	// Widget
			} else {
				dojo.html.addClass(widget.containerNode, this.containerNodeClass);
				dojo.html.addClass(widget.labelNode, this.labelNodeClass);
				this.addWidgetAsDirectChild(widget);
				this.registerChild(widget, this.children.length);
				return widget;	// Widget
			}
		},
		
		_isAccordionPane: function(pane) {
			return pane.widgetType && 
				(pane.widgetType == "AccordionPane"
				|| pane.widgetType == "AccordionPaneEx");
		},
		
		showAll: function() {
			for (var i = 0; i < this.children.length; i++) {
				var pane = this.children[i];
				if (!pane.isShowing()) {
					pane.show();
				}
			}
		},
		
		hideAll : function() {
			for (var i = 0; i < this.children.length; i++) {
				var pane = this.children[i];
				if (pane.isShowing()) {
					pane.hide();
				}
			}
		},
		
		togglePane: function(/*Widget or id*/pane) {
			if (dojo.lang.isString(pane)) {
				pane = dojo.widget.byId(pane);
				if (pane != null) {
					if (!this._isAccordionPane(pane)) {
						pane = pane.parent;
					}
				}
			}
			
			if (pane.isShowing()) {
				pane.hide();
			} else {
				pane.show();
			}
			
			return pane;
		},
		
		showPane: function(/*Widget or id*/pane) {
			if (dojo.lang.isString(pane)) {
				pane = dojo.widget.byId(pane);
				if (pane != null) {
					if (!this._isAccordionPane(pane)) {
						pane = pane.parent;
					}
				}
			}
			
			if (!pane.isShowing()) {
				pane.show();
			}
			
			return pane;
		},
		
		hidePane: function(/*Widget or id*/pane) {
			if (dojo.lang.isString(pane)) {
				pane = dojo.widget.byId(pane);
				if (pane != null) {
					if (!this._isAccordionPane(pane)) {
						pane = pane.parent;
					}
				}
			}
			
			if (pane.isShowing()) {
				pane.hide();
			}
			
			return pane;
		},
		
		getShowingCount: function() {
			var count = 0;
			for (var i = 0; i < this.children.length; i++) {
				var pane = this.children[i];
				if (pane.isShowing()) {
					count++;
				}
			}
			
			return count;
		},
		
		getChildHeight: function(child)
		{
			var totalCollapsedHeight = 0;
			dojo.lang.forEach(this.children, function(child, idx){
				totalCollapsedHeight += child.getLabelHeight();
			});
			// size and position each pane
			var domSize=dojo.html.getContentBox(this.domNode);
			var childCollapsedHeight = child.getLabelHeight();
			var y = domSize.height-totalCollapsedHeight+childCollapsedHeight;
				
			return y;
		},

		selectChild: function(/*Widget*/ page){
			// summary
			//		close the current page and select a new one
			dojo.lang.forEach(this.children, function(child){child.setSelected(child==page);});

			// slide each pane that needs to be moved
			var y = 0;
			var anims = [];
			dojo.lang.forEach(this.children, function(child, idx){
				if(child.domNode.style.top != (y+"px")){
					anims.push(dojo.lfx.html.slideTo(child.domNode, {top: y, left: 0}, this.duration));
				}
				if (child.selected)
				{
					var totalCollapsedHeight = 0;
					dojo.lang.forEach(this.children, function(child, idx){
						totalCollapsedHeight += child.getLabelHeight();
					});
					// size and position each pane
					var domSize=dojo.html.getContentBox(this.domNode);
					var childCollapsedHeight = child.getLabelHeight();
					child.resizeTo(domSize.width, domSize.height-totalCollapsedHeight+childCollapsedHeight);
					
					var childHeight = domSize.height-totalCollapsedHeight+childCollapsedHeight;
					y += childHeight;
				}
				else
				{
					child.domNode.style["height"] = child.getLabelHeight()+'px';
					child.containerNode.style["height"] = '0px';
					y += child.getLabelHeight();
				}
				
			}, this);
			dojo.lfx.combine(anims).play();
		},
		
 		__END: true
	}
);

dojo.widget.defineWidget(
	"rmc.widget.AccordionPaneEx",
	dojo.widget.AccordionPane,
	{
		ns: "rmc",
		
		oldSize: null,
		
		templatePath: dojo.uri.dojoUri("../rmc/widget/templates/AccordionPaneEx.html"),
		templateCssPath: dojo.uri.dojoUri("../rmc/widget/templates/AccordionPaneEx.css"),
		
		postCreate: function(args, frag, parentComp) {
			rmc.widget.AccordionPaneEx.superclass.postCreate.apply(this, arguments);
			dojo.html.setVisibility(this.containerNode, false);
		},
		
		destroy: function() {
			rmc.widget.AccordionPaneEx.superclass.destroy.apply(this, arguments);
		},
		
		setSelected: function(/*Boolean*/ isSelected) {	
			rmc.widget.AccordionPaneEx.superclass.setSelected.apply(this, arguments);
			dojo.html.setVisibility(this.containerNode, this.selected);
		},
		
		resizeTo: function(width, height){
			rmc.widget.AccordionPaneEx.superclass.resizeTo.apply(this, arguments);
			if (!this.selected)
			{
				this.domNode.style["height"] = this.getLabelHeight()+'px';
				this.containerNode.style["height"] = '0px';
			}
		},
		
		show: function() {
			if (!this.isShowing()) {
				rmc.widget.AccordionPaneEx.superclass.show.apply(this, arguments);
				this.parent._setSizes();
			}
		},
		
		hide: function() {
			if (this.isShowing() ) {
				rmc.widget.AccordionPaneEx.superclass.hide.apply(this, arguments);
				this.parent._setSizes();
			}
		},
		
		minimizeLabel: function() {
		},

		restoreLabel: function() {
		},
		
		onCloseButtonClick: function() {
			this.hide();
			theApp.hideShowSplitPane(this.parent);
		},
		
		// handle key events
		onLabelKeyPress: function(/*Event*/ evt) {
	 		if (evt.keyCode == dojo.event.browser.keys.KEY_ENTER) {
	 			this.onLabelClick();
	 		}
		},
		
		onCloseButtonKeyPress: function(/*Event*/ evt) {
	 		if (evt.keyCode == dojo.event.browser.keys.KEY_ENTER) {
	 			this.onCloseButtonClick();
	 		}
		},
		
		__END: true
	}
);