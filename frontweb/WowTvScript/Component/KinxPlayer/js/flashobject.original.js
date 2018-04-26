function WOWPlayerObject(swfObjectID, swfVersion, swfExpressInstall)
{
  this.flashID = typeof (swfObjectID) == "undefined" ? "EBSOnAirPlayer" : swfObjectID;
  this.flashVersion = typeof (swfVersion) == "undefined" ? "10.0.0" : swfVersion;
  this.flashExpressInstall = typeof (swfExpressInstall) == "undefined" ? null : swfExpressInstall;
  
  this.flashEventListeners = {};
  
  this.flashVariables = {
    currentFlashObjectName : "embedFlash"
  };
  this.flashParameters = {
  allowfullscreen : "true",
  allowscriptaccess : "always",
  bgcolor : "#000000",
  menu : "false",
  quality : "high",
  wmode : "direct"
  };
  this.flashAttributes = {
  id : this.flashID,
  name : this.flashID,
  align : "middle"
  };
  this.playInfoData = {
  host : "",
  isLive : true
  };
  this.flashObj = null;
}

WOWPlayerObject.prototype = {
addEventListener : function(eventType, flashEventListener)
{
  if(typeof (this.flashEventListeners[eventType]) == "undefined")
  {
    this.flashEventListeners[eventType] = [];
  }
  
  this.flashEventListeners[eventType].push(flashEventListener);
},

dispatchEvent : function(event, data)
{
  if(typeof (event) == "string")
  {
    event = {
      type : event
    };
  }
  
  if(!event.target)
  {
    event.target = this;
  }
  if(!event.data)
  {
    event.data = data;
  }
  
  if(!event.type){ throw new Error("Event object missing 'type' property."); }
  
  if(this.flashEventListeners[event.type] instanceof Array)
  {
    var eventListeners = this.flashEventListeners[event.type];
    var i = 0, len = eventListeners.length;
    for(i = 0; i < len; i++)
    {
      eventListeners[i].call(this, event);
    }
  }
},

drawFlashArea : function(id, swf, width, height)
{
  swfobject
      .embedSWF(swf, id, width, height, this.flashVersion, this.flashExpressInstall, this.flashVariables, this.flashParameters, this.flashAttributes);
  swfobject.createCSS("#" + id, "display:block;text-align:left;");
  this.flashObj = $("#" + this.flashID)[0];
},

removeEventListener : function(eventType, listener)
{
  if(this.flashEventListeners[eventType] instanceof Array)
  {
    var eventListeners = this.flashEventListeners[eventType];
    var i = 0, len = eventListeners.length;
    for(i = 0; i < len; i++)
    {
      if(eventListeners[i] === listener)
      {
        eventListeners.splice(i, 1);
        break;
      }
    }
  }
},

setStream : function(infoData)
{
  var data = typeof (infoData) == "undefined" ? this.playInfoData : infoData;
  
  if(typeof (this.flashObj) == "undefined")
  {
    this.flashObj = $("#" + this.flashID)[0];
  }
  
  this.flashObj.setStream(data);
}
};
