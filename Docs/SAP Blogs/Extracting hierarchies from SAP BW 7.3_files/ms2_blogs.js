function MscomInit() {
    MscomsetEvents();
    autoFirePV = window.varAutoFirePV != undefined ? window.varAutoFirePV : 1;
    autoFirePV == 1 ? MscomSendPageView(window.varCustomerTracking != undefined && window.varCustomerTracking == 1 ? 1 : 0) : (MscomSetSharedData(), muidCreated != 1 && MscomGetMUID(0))
}
function MscomSendPageView(createMuid) {
    MscomResetArrays();
    MscomSetSharedData(0);
    wcs["wcs.et"] = 0;
    createMuid != undefined && createMuid != 0 && muidCreated != 1 ? MscomGetMUID(1) : MscomBeacon()
}
function MscomCustomEvent() {
    var len, i, argumentname, argvalue, argname, index;
    try {
        for (MscomResetArrays(), MscomSetSharedData(5), wcs["wcs.et"] = 1, len = arguments.length, i = 0; i < len;) argumentname = arguments[i].toString().toLowerCase(), index = argumentname.indexOf("="), index >= 0 ? (argname = unescape(argumentname.substring(0, index)), argvalue = unescape(argumentname.substring(index + 1, argumentname.length)), argvalue = argvalue == undefined ? "" : argvalue, coreAttributes.indexOf("," + argname.toLowerCase() + ",") >= 0 ? (wcs["wcs." + argname.toLowerCase()] = argvalue == undefined ? "" : argvalue, i = i + 1) : (argname.indexOf("ms.") == 0 ? ms[argname] = argvalue : na[argname] = argvalue, i = i + 1)) : (argname = arguments[i].toString(), argvalue = arguments[i + 1] == undefined ? "" : arguments[i + 1].toString(), argname.indexOf("wcs.") == 0 ? wcs[argname.toLowerCase()] = argvalue : argname.indexOf("ms.") == 0 ? ms[argname] = argvalue : coreAttributes.indexOf("," + argname.toLowerCase() + ",") >= 0 ? wcs["wcs." + argname.toLowerCase()] = argvalue : na[argname] = argvalue, i = i + 2);
        MscomBeacon()
    } catch (e) {
    }
}
function MscomProcessClick(event) {
    var evt, e, pii, title, type, ctx, t, elems, n, i, etype;
    MscomResetArrays();
    wcs["wcs.et"] = 2;
    try {
        if (evt = event || window.event, evt) for (e = evt.srcElement || evt.target; e.tagName && MscomIsInList(e.tagName) == 0;) e = e.parentElement || e.parentNode;
        if (pii = 0, e && e.tagName) switch (e.tagName) {
            case "A":
                MscomSetSharedData(1);
                MscomReadAllTags(e);
                pii = MscomIsPII(e);
                pii == 0 && (title = document.all ? e.innerText || e.innerHTML : e.text || e.innerHTML, wcs["wcs.cn"] = title, wcs["wcs.cid"] = MscomGetId(e), wcs["wcs.ct"] = e.href ? e.href : "");
                MscomBeacon();
                break;
            case "IMG":
                MscomSetSharedData(2);
                MscomReadAllTags(e);
                pii = MscomIsPII(e);
                pii == 0 && (wcs["wcs.cn"] = e.alt ? e.alt : "", wcs["wcs.cid"] = MscomGetId(e), wcs["wcs.ct"] = MscomGetImageHREF(e));
                MscomBeacon();
                break;
            case "AREA":
                MscomSetSharedData(3);
                MscomReadAllTags(e);
                pii = MscomIsPII(e);
                pii == 0 && (wcs["wcs.cn"] = e.alt ? e.alt : "", wcs["wcs.cid"] = MscomGetId(e), wcs["wcs.ct"] = e.href ? e.href : "");
                MscomBeacon();
                break;
            case "INPUT":
                if (MscomSetSharedData(4), MscomReadAllTags(e), type = e.type || "", ctx = "", type && (type == "button" || type == "reset" || type == "submit" || type == "image") || type == "text" && (evt.which || evt.keyCode) == 13) {
                    if (t = e.value || e.name || e.alt || e.id, pii = MscomIsPII(e), pii == 0 && (wcs["wcs.cn"] = t ? t : "", wcs["wcs.cid"] = MscomGetId(e)), e.form) for (wcs["wcs.ct"] = e.form.action || window.location.pathname, elems = e.form.elements, n = 1, i = 0; i < elems.length; i++) etype = elems[i].type, etype == "text" && (pii = MscomIsPII(elems[i]), pii == 0 && (ctx += "&wcs.t" + n + "=" + MscomEncode(elems[i].name || elems[i].id) + "&wcs.v" + n + "=" + MscomEncode(elems[i].value), n++)); else wcs["wcs.ct"] = window.location.pathname;
                    wcs["wcs.ctx"] = ctx != "" ? ctx : ""
                }
                MscomBeacon();
                break;
            default:
                break
        }
    } catch (e) {
    }
}
function MscomBeacon() {
    var src, wcsvalues, srcString;
    try {
        src = [];
        src.push(window.location.protocol + trans_pixel_url);
        MscomInitMeta();
        wcsvalues = MscomGetStrFromArray(wcs);
        wcsvalues.charAt(0) == "&" && (wcsvalues = wcsvalues.substring(1));
        src.push(wcsvalues);
        src.push(MscomGetStrFromArray(ms));
        src.push(MscomGetStrFromArray(na));
        srcString = src.join("");
        srcString.length > 2048 ? srcString = srcString.substring(0, 2038) + "&wcs.tr=1" : srcString += "&wcs.tr=0";
        document.images ? (imgArray[imgArrayIndex] = new Image, imgArray[imgArrayIndex].src = srcString, imgArrayIndex++) : document.newasyncwrite('<IMG ALT="" BORDER="0" NAME="bImg" WIDTH="1" HEIGHT="1" SRC="' + srcString + '"/>')
    } catch (e) {
    }
}
function MscomGetDebugValues() {
    wcs["wcs.v"] = vs;
    wcs["wcs.vct"] = window.varCustomerTracking != undefined ? window.varCustomerTracking : "";
    wcs["wcs.vs"] = window.varSegmentation != undefined ? window.varSegmentation : "";
    wcs["wcs.vclt"] = window.varClickTracking != undefined ? window.varClickTracking : "";
    wcs["wcs.vfpv"] = window.varAutoFirePV != undefined ? window.varAutoFirePV : ""
}
function MscomSetTitle() {
    wcs["wcs.ti"] = document.title
}
function MscomSetTimeZoneOffSet() {
    var currDate = new Date;
    tz = currDate.getTimezoneOffset();
    wcs["wcs.tz"] = tz / -60
}
function MscomSetReferrer() {
    var ref = document.referrer;
    ref != null && ref != "" && (wcs["wcs.r"] = ref)
}
function MscomSetTimeStamp() {
    var currDate = new Date, currTime = currDate.getTime();
    wcs["wcs.ts"] = currTime.toString()
}
function MscomSetScreenResolution() {
    typeof screen == "object" && (wcs["wcs.sr"] = screen.width + "x" + screen.height)
}
function MscomSetClickStreamFlag() {
    window.varSegmentation != undefined && varSegmentation == 1 && (wcs["wcs.cs"] = "1")
}
function MscomReadAllTags(obj) {
    while (obj && obj != "undefined") MscomReadElementTags(obj), obj = obj.parentElement || obj.parentNode
}
function MscomSetCot(cotValue) {
    wcs["wcs.cot"] = cotValue != undefined ? cotValue : ""
}
function MscomSetSharedData(cotValue) {
    MscomSetTimeZoneOffSet();
    MscomSetCot(cotValue);
    MscomSetRouteCtrl();
    MscomSetTimeStamp();
    MscomSetCookieDisabledFlag();
    MscomSetEventId();
    MscomSetScreenResolution();
    MscomGetBrowserSize();
    MscomGetSilverLightInfo();
    MscomGetFlashInfo();
    MscomGetCTypeHpInfo();
    MscomSetClickStreamFlag();
    MscomIsHP();
    MscomSetReferrer();
    MscomSetTitle();
    MscomGetCurrentSD();
    MscomGetDebugValues();
    MscomSetBlogInfo();
}
function MscomGetCurrentSD() {
    wcs["wcs.rsd"] = window.location.host;
    wcs["wcs.rsus"] = window.location.pathname != "" ? window.location.pathname : "";
    wcs["wcs.rsqs"] = window.location.search != "" ? window.location.search : "";
    wcs["wcs.rihs"] = window.location.protocol == "https" || window.location.protocol == "https:" ? "1" : "0"
}
function MscomGetFlashInfo() {
    var flashMax = (new Date).getYear() - 1992, i, flash, plugin;
    if (navigator.userAgent.indexOf("MSIE") != -1) for (i = flashMax; i > 0; i--) try {
        flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
        wcs["wcs.fi"] = "1";
        wcs["wcs.fv"] = i + ".0";
        break
    } catch (e) {
    } else navigator.plugins["Shockwave Flash"] && (wcs["wcs.fi"] = "1", plugin = navigator.plugins["Shockwave Flash"], wcs["wcs.fv"] = plugin.description.split(" ")[2])
}
function MscomGetSilverLightInfo() {
    var sli, plugin, actualVer, temp;
    window.Silverlight != undefined && (wcs["wcs.se"] = "1");
    try {
        navigator.userAgent.indexOf("MSIE") != -1 ? (sli = new ActiveXObject("AgControl.AgControl"), sli && (wcs["wcs.si"] = "1", wcs["wcs.sv"] = MscomGetSlvVersion(sli))) : navigator.plugins["Silverlight Plug-In"] && (plugin = navigator.plugins["Silverlight Plug-In"], wcs["wcs.si"] = "1", actualVer = plugin.description, actualVer && actualVer != undefined && (temp = actualVer.split("."), actualVer = temp[0] + "." + temp[1], wcs["wcs.sv"] = actualVer))
    } catch (e) {
    }
}
function MscomInitMeta() {
    var metaelems, i, meta, mt;
    if (document.all ? metaelems = document.all.tags("meta") : document.documentElement && (metaelems = document.getElementsByTagName("meta")), metaTags = "", typeof metaelems != "undefined") for (i = 0; i < metaelems.length; i++) meta = metaelems.item(i), meta.name && (mt = meta.name.toLowerCase(), mt.indexOf("ms.") == 0 && (ms[meta.name] = meta.content))
}
function MscomReadElementTags(obj) {
    var result = "", pii, attr, nn, nnl;
    if (obj && (pii = MscomIsPII(obj), pii == 0)) for (attr in obj.attributes) attr != undefined && obj.attributes[attr] != null && obj.attributes[attr] != undefined && (nn = obj.attributes[attr].name, nn != null && nn != undefined && (nnl = nn.toLowerCase(), nnl.indexOf("ms.") == 0 && (ms[nn] = obj.attributes[attr].value)));
    return result
}
function MscomSetEventId() {
    wcs["wcs.eid"] = GenerateGuid()
}
function MscomGetBrowserSize() {
    document.body.clientWidth != undefined ? wcs["wcs.bs"] = document.body.clientWidth + "x" + document.body.clientHeight : document.documentElement && document.documentElement.clientWidth != undefined ? wcs["wcs.bs"] = document.documentElement.clientWidth + "x" + document.documentElement.clientHeight : window.innerWidth != undefined && (wcs["wcs.bs"] = window.innerWidth + "x" + window.innerHeight)
}
function MscomSetRouteCtrl() {
    wcs["wcs.route"] = window.Route != undefined ? window.Route : "";
    wcs["wcs.ctrl"] = window.Ctrl != undefined ? window.Ctrl : ""
}
function MscomGetCTypeHpInfo() {
    document.body && document.body.addBehavior && (document.body.addBehavior("#default#clientCaps"), document.body.connectionType && (wcs["wcs.cnt"] = document.body.connectionType))
}
function MscomIsHP() {
    document.body && document.body.addBehavior && (document.body.addBehavior("#default#homePage"), wcs["wcs.hp"] = document.body.isHomePage(location.href) ? "1" : "0")
}
function MscomSetCookieDisabledFlag() {
    var cookiePre = "", index = document.cookie.indexOf(sessionCookieName + "="), start, end;
    if (index == -1) {
        if (MscomSetTimeStamp(), sessionId = wcs["wcs.ts"], wcs["wcs.cd"] == 1) return;
        cookiePre = sessionCookieName + "=" + sessionId
    } else start = index + sessionCookieName.length + 1, end = document.cookie.length, cookiePre = sessionCookieName + "=" + document.cookie.substring(start, end);
    document.cookie = cookiePre;
    index = document.cookie.indexOf(sessionCookieName + "=");
    wcs["wcs.cd"] = index == -1 ? 1 : 0
}
function GuidPart() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
}
function GenerateGuid() {
    return GuidPart() + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + GuidPart() + GuidPart()
}
function MscomGetSlvVersion(control) {
    for (var slv = "", slVMax = (new Date).getYear() - 2004, j, i = slVMax; i > 0; i--) for (j = 9; j >= 0; j--) if (slv = i + "." + j, control.IsVersionSupported(slv)) return slv;
    return slv
}
function Mscomdebug() {
    window.alert(arguments[0])
}
function MscomGetId(obj) {
    return obj ? obj.id == undefined ? "" : obj.id : ""
}
function MscomGetImageHREF(obj) {
    var temp = obj;
    if (obj) {
        if (obj = obj.parentElement || obj.parentNode, obj && obj.tagName == "A") return obj.href ? obj.href : "";
        if (temp && temp.src) return temp.src
    }
    return ""
}
function MscomIsInList(tag) {
    for (var t in clickedElements) if (clickedElements[t] == tag.toUpperCase()) return 1;
    return 0
}
function MscomsetEvents() {
    if (window.varClickTracking != undefined && varClickTracking == 1 && document.body) if (document.body.addEventListener) {
        var event = navigator.appVersion.indexOf("MSIE") != -1 ? "click" : "mousedown";
        document.body.addEventListener(event, window.MscomProcessClick, 0)
    } else document.body.attachEvent && document.body.attachEvent("onclick", window.MscomProcessClick)
}
function MscomGetMUID(firebeacon) {
    if (muidCreated == 1 && firebeacon == 1) {
        MscomBeacon();
        return
    }
    if (window.varCustomerTracking != undefined && varCustomerTracking == 1) try {
        var muidsrc = window.location.protocol + "//c1.microsoft.com/c.gif?DI=4050&did=1&t=";
        firebeacon == 1 ? document.newasyncwrite('<iframe id="_msnFrame" src="' + muidsrc + '" style="z-index:-1;height:1px;width:1px;display:none;visibility:hidden;" onload="javascript:MscomBeacon();"><\/iframe>') : document.newasyncwrite('<iframe id="_msnFrame" src="' + muidsrc + '" style="z-index:-1;height:1px;width:1px;display:none;visibility:hidden;"><\/iframe>');
        muidCreated = 1
    } catch (e) {
        muidCreated = 0
    } else firebeacon == 1 && MscomBeacon()
}
function MscomEncode(S) {
    return typeof encodeURIComponent == "function" ? encodeURIComponent(S) : escape(S)
}
function MscomGetStrFromArray(strarray) {
    var retValue = "", key;
    for (key in strarray) strarray.hasOwnProperty(key) && (retValue += strarray[key] != undefined ? "&" + MscomEncode(key) + "=" + MscomEncode(strarray[key]) : "&" + MscomEncode(key) + "=");
    return retValue
}
function MscomResetArrays() {
    wcs = [];
    na = [];
    ms = []
}
function MscomIsPII(obj) {
    try {
        var pii = obj.getAttribute("data-dc");
        return pii != null && pii != undefined ? pii.toLowerCase() == "pii" ? 1 : 0 : 0
    } catch (e) {
        return 0
    }
}
function MscomSetBlogInfo(){
    var PREFIX = 'ms.blog.';
    for (var key in window.blogPost) {
        wcs[PREFIX + key] = window.blogPost[key];
    }
}
var fl = 0, sessionId = "", sessionDuration = 18e5, sessionCookieName = "MC0", qs = "", imgArray = [], imgArrayIndex = 0, tz = 420, clickedElements = ["A", "IMG", "AREA", "INPUT"], setCot = 0, trans_pixel_url = "//c.microsoft.com/trans_pixel.aspx?", autoFirePV = 0, muidCreated = 0, coreAttributes = ",sr,bs,ts,tz,ctrl,route,ti,si,se,sv,fi,fv,cid,tr,cn,ct,cot,cs,cnt,hp,cd,rsd,rsus,rsqs,rihs,r,pkey,", customTags = "", clickInfo = "", customInfo = "", wcs = [], na = [], ms = [], vs = 3.5;
document.newasyncwrite = function (c) {
    try {
        if (document.getElementById("_WEDCSInsertedData") == null) {
            var newNode = document.createElement("div");
            newNode.style.display = "none";
            newNode.id = "_WEDCSInsertedData";
            document.getElementsByTagName("body")[0].appendChild(newNode)
        }
        document.getElementById("_WEDCSInsertedData").innerHTML += c
    } catch (e) {
    }
};
MscomInit();