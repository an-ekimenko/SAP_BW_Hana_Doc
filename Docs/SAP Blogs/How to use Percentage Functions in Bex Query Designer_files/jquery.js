/**
 * Copyright (C) 2010-2014 Graham Breach
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * jQuery.tagcanvas 2.4
 * For more information, please contact <graham@goat1000.com>
 */
(function (ah) {
    var I, G, H = Math.abs, ab = Math.sin, u = Math.cos, q = Math.max, au = Math.min, ai = Math.ceil, B = Math.sqrt, ak = Math.pow, f = {}, h = {}, k = {0: "0,", 1: "17,", 2: "34,", 3: "51,", 4: "68,", 5: "85,", 6: "102,", 7: "119,", 8: "136,", 9: "153,", a: "170,", A: "170,", b: "187,", B: "187,", c: "204,", C: "204,", d: "221,", D: "221,", e: "238,", E: "238,", f: "255,", F: "255,"}, v, b, M, aw, D, ax, A = document, n, a = {};
    for (I = 0; I < 256; ++I) {
        G = I.toString(16);
        if (I < 16) {
            G = "0" + G
        }
        h[G] = h[G.toUpperCase()] = I.toString() + ","
    }
    function ac(i) {
        return typeof i != "undefined"
    }

    function E(i) {
        return typeof i == "object" && i != null
    }

    function am(i, j, ay) {
        return isNaN(i) ? ay : au(ay, q(j, i))
    }

    function aq() {
        return false
    }

    function C() {
        return new Date().valueOf()
    }

    function y(ay, aB) {
        var j = [], az = ay.length, aA;
        for (aA = 0; aA < az; ++aA) {
            j.push(ay[aA])
        }
        j.sort(aB);
        return j
    }

    function ag(j) {
        var az = j.length - 1, ay, aA;
        while (az) {
            aA = ~~(Math.random() * az);
            ay = j[az];
            j[az] = j[aA];
            j[aA] = ay;
            --az
        }
    }

    function Y(i, ay, j) {
        this.x = i;
        this.y = ay;
        this.z = j
    }

    D = Y.prototype;
    D.length = function () {
        return B(this.x * this.x + this.y * this.y + this.z * this.z)
    };
    D.dot = function (i) {
        return this.x * i.x + this.y * i.y + this.z * i.z
    };
    D.cross = function (j) {
        var i = this.y * j.z - this.z * j.y, az = this.z * j.x - this.x * j.z, ay = this.x * j.y - this.y * j.x;
        return new Y(i, az, ay)
    };
    D.angle = function (j) {
        var i = this.dot(j), ay;
        if (i == 0) {
            return Math.PI / 2
        }
        ay = i / (this.length() * j.length());
        if (ay >= 1) {
            return 0
        }
        if (ay <= -1) {
            return Math.PI
        }
        return Math.acos(ay)
    };
    D.unit = function () {
        var i = this.length();
        return new Y(this.x / i, this.y / i, this.z / i)
    };
    function ad(ay, j) {
        j = j * Math.PI / 180;
        ay = ay * Math.PI / 180;
        var i = ab(ay) * u(j), aA = -ab(j), az = -u(ay) * u(j);
        return new Y(i, aA, az)
    }

    function N(i) {
        this[1] = {1: i[0], 2: i[1], 3: i[2]};
        this[2] = {1: i[3], 2: i[4], 3: i[5]};
        this[3] = {1: i[6], 2: i[7], 3: i[8]}
    }

    aw = N.prototype;
    N.Identity = function () {
        return new N([1, 0, 0, 0, 1, 0, 0, 0, 1])
    };
    N.Rotation = function (az, i) {
        var j = ab(az), ay = u(az), aA = 1 - ay;
        return new N([ay + ak(i.x, 2) * aA, i.x * i.y * aA - i.z * j, i.x * i.z * aA + i.y * j, i.y * i.x * aA + i.z * j, ay + ak(i.y, 2) * aA, i.y * i.z * aA - i.x * j, i.z * i.x * aA - i.y * j, i.z * i.y * aA + i.x * j, ay + ak(i.z, 2) * aA])
    };
    aw.mul = function (ay) {
        var az = [], aC, aB, aA = (ay.xform ? 1 : 0);
        for (aC = 1; aC <= 3; ++aC) {
            for (aB = 1; aB <= 3; ++aB) {
                if (aA) {
                    az.push(this[aC][1] * ay[1][aB] + this[aC][2] * ay[2][aB] + this[aC][3] * ay[3][aB])
                } else {
                    az.push(this[aC][aB] * ay)
                }
            }
        }
        return new N(az)
    };
    aw.xform = function (ay) {
        var j = {}, i = ay.x, aA = ay.y, az = ay.z;
        j.x = i * this[1][1] + aA * this[2][1] + az * this[3][1];
        j.y = i * this[1][2] + aA * this[2][2] + az * this[3][2];
        j.z = i * this[1][3] + aA * this[2][3] + az * this[3][3];
        return j
    };
    function o(az, aB, aG, aD) {
        var aC, aF, j, aE, aH = [], aA = Math.PI * (3 - B(5)), ay = 2 / az;
        for (aC = 0; aC < az; ++aC) {
            aF = aC * ay - 1 + (ay / 2);
            j = B(1 - aF * aF);
            aE = aC * aA;
            aH.push([u(aE) * j * aB, aF * aG, ab(aE) * j * aD])
        }
        return aH
    }

    function R(aA, ay, aD, aJ, aH) {
        var aI, aK = [], aB = Math.PI * (3 - B(5)), az = 2 / aA, aG, aF, aE, aC;
        for (aG = 0; aG < aA; ++aG) {
            aF = aG * az - 1 + (az / 2);
            aI = aG * aB;
            aE = u(aI);
            aC = ab(aI);
            aK.push(ay ? [aF * aD, aE * aJ, aC * aH] : [aE * aD, aF * aJ, aC * aH])
        }
        return aK
    }

    function J(ay, az, aC, aI, aG, aE) {
        var aH, aJ = [], aA = Math.PI * 2 / az, aF, aD, aB;
        for (aF = 0; aF < az; ++aF) {
            aH = aF * aA;
            aD = u(aH);
            aB = ab(aH);
            aJ.push(ay ? [aE * aC, aD * aI, aB * aG] : [aD * aC, aE * aI, aB * aG])
        }
        return aJ
    }

    function af(az, i, j, ay) {
        return R(az, 0, i, j, ay)
    }

    function al(az, i, j, ay) {
        return R(az, 1, i, j, ay)
    }

    function c(aA, i, j, ay, az) {
        az = isNaN(az) ? 0 : az * 1;
        return J(0, aA, i, j, ay, az)
    }

    function l(aA, i, j, ay, az) {
        az = isNaN(az) ? 0 : az * 1;
        return J(1, aA, i, j, ay, az)
    }

    function Q(aB, i) {
        var aA = aB, az, ay, j = (i * 1).toPrecision(3) + ")";
        if (aB[0] === "#") {
            if (!f[aB]) {
                if (aB.length === 4) {
                    f[aB] = "rgba(" + k[aB[1]] + k[aB[2]] + k[aB[3]]
                } else {
                    f[aB] = "rgba(" + h[aB.substr(1, 2)] + h[aB.substr(3, 2)] + h[aB.substr(5, 2)]
                }
            }
            aA = f[aB] + j
        } else {
            if (aB.substr(0, 4) === "rgb(" || aB.substr(0, 4) === "hsl(") {
                aA = (aB.replace("(", "a(").replace(")", "," + j))
            } else {
                if (aB.substr(0, 5) === "rgba(" || aB.substr(0, 5) === "hsla(") {
                    az = aB.lastIndexOf(",") + 1, ay = aB.indexOf(")");
                    i *= parseFloat(aB.substring(az, ay));
                    aA = aB.substr(0, az) + i.toPrecision(3) + ")"
                }
            }
        }
        return aA
    }

    function L(i, j) {
        if (window.G_vmlCanvasManager) {
            return null
        }
        var ay = A.createElement("canvas");
        ay.width = i;
        ay.height = j;
        return ay
    }

    function ae() {
        var j = L(3, 3), az, ay;
        if (!j) {
            return false
        }
        az = j.getContext("2d");
        az.strokeStyle = "#000";
        az.shadowColor = "#fff";
        az.shadowBlur = 3;
        az.globalAlpha = 0;
        az.strokeRect(2, 2, 2, 2);
        az.globalAlpha = 1;
        ay = az.getImageData(2, 2, 1, 1);
        j = null;
        return(ay.data[0] > 0)
    }

    function g(aF, j) {
        var ay = 1024, aB = aF.weightGradient, aA, aD, az, aE, aC;
        if (aF.gCanvas) {
            aD = aF.gCanvas.getContext("2d")
        } else {
            aF.gCanvas = aA = L(ay, 1);
            if (!aA) {
                return null
            }
            aD = aA.getContext("2d");
            aE = aD.createLinearGradient(0, 0, ay, 0);
            for (az in aB) {
                aE.addColorStop(1 - az, aB[az])
            }
            aD.fillStyle = aE;
            aD.fillRect(0, 0, ay, 1)
        }
        aC = aD.getImageData(~~((ay - 1) * j), 0, 1, 1).data;
        return"rgba(" + aC[0] + "," + aC[1] + "," + aC[2] + "," + (aC[3] / 255) + ")"
    }

    function T(aH, aA, j, aJ, aB, aG, aC, az, aF, aI) {
        var aE = aB + (aC || 0) + (az && az[0] < 0 ? H(az[0]) : 0), ay = aB + (aC || 0) + (az && az[1] < 0 ? H(az[1]) : 0), aD, aK;
        aH.font = aA;
        aH.textBaseline = "top";
        aH.fillStyle = j;
        aG && (aH.shadowColor = aG);
        aC && (aH.shadowBlur = aC);
        az && (aH.shadowOffsetX = az[0], aH.shadowOffsetY = az[1]);
        for (aD = 0; aD < aJ.length; ++aD) {
            aK = aI ? (aF - aI[aD]) / 2 : 0;
            aH.fillText(aJ[aD], aE + aK, ay);
            ay += parseInt(aA)
        }
    }

    function aj(aC, i, aB, j, az, aA, ay) {
        if (aA) {
            aC.beginPath();
            aC.moveTo(i, aB + az - aA);
            aC.arcTo(i, aB, i + aA, aB, aA);
            aC.arcTo(i + j, aB, i + j, aB + aA, aA);
            aC.arcTo(i + j, aB + az, i + j - aA, aB + az, aA);
            aC.arcTo(i, aB + az, i, aB + az - aA, aA);
            aC.closePath();
            aC[ay ? "stroke" : "fill"]()
        } else {
            aC[ay ? "strokeRect" : "fillRect"](i, aB, j, az)
        }
    }

    function t(aC, aK, aE, aP, aF, aM, aD, aN, aL, aJ, i, aH, aB, aI, aR) {
        var az = aE + H(i[0]) + 2 * (aJ + aH) + aN, aG = aP + H(i[1]) + 2 * (aJ + aH) + aN, aA, aS, aQ, aO, ay, j;
        aA = L(az, aG);
        if (!aA) {
            return null
        }
        aQ = ay = aN / 2;
        aO = az - aN;
        j = aG - aN;
        aH += aQ;
        aS = aA.getContext("2d");
        if (aM) {
            aS.fillStyle = aM;
            aj(aS, aQ, ay, aO, j, aB)
        }
        if (aN) {
            aS.strokeStyle = aD;
            aS.lineWidth = aN;
            aj(aS, aQ, ay, aO, j, aB, true)
        }
        T(aS, aK, aF, aC, aH, aL, aJ, i, aI, aR);
        return aA
    }

    function ar(aI, ay, aH, aC, aN, aJ, aD) {
        var aE = aI.width + (2 * aN) + aH, j = aI.height + (2 * aN) + aH, aG = L(aE, j), aK, aA, aM, az, aL, aF, aB;
        if (!aG) {
            return null
        }
        aA = aM = aH / 2;
        az = aE - aH;
        aL = j - aH;
        aN += aA;
        aK = aG.getContext("2d");
        if (ay) {
            aK.fillStyle = ay;
            aj(aK, aA, aM, az, aL, aJ)
        }
        if (aH) {
            aK.strokeStyle = aC;
            aK.lineWidth = aH;
            aj(aK, aA, aM, az, aL, aJ, true)
        }
        if (aD) {
            aF = L(aE, j);
            aB = aF.getContext("2d");
            aB.drawImage(aI, aN, aN, aI.width, aI.height);
            aB.globalCompositeOperation = "source-in";
            aB.fillStyle = aC;
            aB.fillRect(0, 0, aE, j);
            aB.globalCompositeOperation = "destination-over";
            aB.drawImage(aG, 0, 0);
            aB.globalCompositeOperation = "source-over";
            aK.drawImage(aF, 0, 0)
        } else {
            aK.drawImage(aI, aN, aN, aI.width, aI.height)
        }
        return aG
    }

    function V(aD, aG, aH, az) {
        var aI = H(az[0]), aE = H(az[1]), aA = aD.width + (aI > aH ? aI + aH : aH * 2), j = aD.height + (aE > aH ? aE + aH : aH * 2), aC = (aH || 0) + (az[0] < 0 ? aI : 0), ay = (aH || 0) + (az[1] < 0 ? aE : 0), aB, aF;
        aB = L(aA, j);
        if (!aB) {
            return null
        }
        aF = aB.getContext("2d");
        aG && (aF.shadowColor = aG);
        aH && (aF.shadowBlur = aH);
        az && (aF.shadowOffsetX = az[0], aF.shadowOffsetY = az[1]);
        aF.drawImage(aD, aC, ay, aD.width, aD.height);
        return aB
    }

    function r(aK, aC, aI) {
        var aJ = parseInt(aK.toString().length * aI), aB = parseInt(aI * 2 * aK.length), az = L(aJ, aB), aF, j, aA, aE, aH, aG, ay, aD;
        if (!az) {
            return null
        }
        aF = az.getContext("2d");
        aF.fillStyle = "#000";
        aF.fillRect(0, 0, aJ, aB);
        T(aF, aI + "px " + aC, "#fff", aK, 0, 0, 0, []);
        j = aF.getImageData(0, 0, aJ, aB);
        aA = j.width;
        aE = j.height;
        aD = {min: {x: aA, y: aE}, max: {x: -1, y: -1}};
        for (aG = 0; aG < aE; ++aG) {
            for (aH = 0; aH < aA; ++aH) {
                ay = (aG * aA + aH) * 4;
                if (j.data[ay + 1] > 0) {
                    if (aH < aD.min.x) {
                        aD.min.x = aH
                    }
                    if (aH > aD.max.x) {
                        aD.max.x = aH
                    }
                    if (aG < aD.min.y) {
                        aD.min.y = aG
                    }
                    if (aG > aD.max.y) {
                        aD.max.y = aG
                    }
                }
            }
        }
        if (aA != aJ) {
            aD.min.x *= (aJ / aA);
            aD.max.x *= (aJ / aA)
        }
        if (aE != aB) {
            aD.min.y *= (aJ / aE);
            aD.max.y *= (aJ / aE)
        }
        az = null;
        return aD
    }

    function m(i) {
        return"'" + i.replace(/(\'|\")/g, "").replace(/\s*,\s*/g, "', '") + "'"
    }

    function X(i, j, ay) {
        ay = ay || A;
        if (ay.addEventListener) {
            ay.addEventListener(i, j, false)
        } else {
            ay.attachEvent("on" + i, j)
        }
    }

    function an(aB, aE, aA, ay) {
        var aC = ay.imageScale, j, aD, az;
        if (!aE.complete) {
            return X("load", function () {
                an(aB, aE, aA, ay)
            }, aE)
        }
        if (!aB.complete) {
            return X("load", function () {
                an(aB, aE, aA, ay)
            }, aB)
        }
        aE.width = aE.width;
        aE.height = aE.height;
        if (aC) {
            aB.width = aE.width * aC;
            aB.height = aE.height * aC
        }
        aA.w = aB.width;
        aA.h = aB.height;
        if (ay.txtOpt) {
            if (ay.shadow) {
                j = V(aB, ay.shadow, ay.shadowBlur, ay.shadowOffset);
                if (j) {
                    aA.image = j;
                    aA.w = j.width;
                    aA.h = j.height
                }
            }
            if (ay.bgColour || ay.bgOutlineThickness) {
                aD = ay.bgColour == "tag" ? U(aA.a, "background-color") : ay.bgColour;
                az = ay.bgOutline == "tag" ? U(aA.a, "color") : (ay.bgOutline || ay.textColour);
                j = ar(aA.image, aD, ay.bgOutlineThickness, az, ay.padding, ay.bgRadius);
                if (ay.outlineMethod == "colour") {
                    aA.oimage = ar(aA.image, aD, ay.bgOutlineThickness, ay.outlineColour, ay.padding, ay.bgRadius, true)
                }
                if (j) {
                    aA.image = j;
                    aA.w = j.width;
                    aA.h = j.height
                }
            }
        }
    }

    function U(az, ay) {
        var j = A.defaultView, i = ay.replace(/\-([a-z])/g, function (aA) {
            return aA.charAt(1).toUpperCase()
        });
        return(j && j.getComputedStyle && j.getComputedStyle(az, null).getPropertyValue(ay)) || (az.currentStyle && az.currentStyle[i])
    }

    function s(ay, j) {
        var i = 1, az;
        if (ay.weightFrom) {
            i = 1 * (j.getAttribute(ay.weightFrom) || ay.textHeight)
        } else {
            if (az = U(j, "font-size")) {
                i = (az.indexOf("px") > -1 && az.replace("px", "") * 1) || (az.indexOf("pt") > -1 && az.replace("pt", "") * 1.25) || az * 3.3
            } else {
                ay.weight = false
            }
        }
        return i
    }

    function e(i) {
        return i.target && ac(i.target.id) ? i.target.id : i.srcElement.parentNode.id
    }

    function O(aA, aB) {
        var az, ay, i = parseInt(U(aB, "width")) / aB.width, j = parseInt(U(aB, "height")) / aB.height;
        if (ac(aA.offsetX)) {
            az = {x: aA.offsetX, y: aA.offsetY}
        } else {
            ay = W(aB.id);
            if (ac(aA.changedTouches)) {
                aA = aA.changedTouches[0]
            }
            if (aA.pageX) {
                az = {x: aA.pageX - ay.x, y: aA.pageY - ay.y}
            }
        }
        if (az && i && j) {
            az.x /= i;
            az.y /= j
        }
        return az
    }

    function z(ay) {
        var j = ay.target || ay.fromElement.parentNode, i = w.tc[j.id];
        if (i) {
            i.mx = i.my = -1;
            i.UnFreeze();
            i.EndDrag()
        }
    }

    function Z(aC) {
        var az, ay = w, j, aB, aA = e(aC);
        for (az in ay.tc) {
            j = ay.tc[az];
            if (j.tttimer) {
                clearTimeout(j.tttimer);
                j.tttimer = null
            }
        }
        if (aA && ay.tc[aA]) {
            j = ay.tc[aA];
            if (aB = O(aC, j.canvas)) {
                j.mx = aB.x;
                j.my = aB.y;
                j.Drag(aC, aB)
            }
            j.drawn = 0
        }
    }

    function x(az) {
        var j = w, i = A.addEventListener ? 0 : 1, ay = e(az);
        if (ay && az.button == i && j.tc[ay]) {
            j.tc[ay].BeginDrag(az)
        }
    }

    function av(aA) {
        var ay = w, j = A.addEventListener ? 0 : 1, az = e(aA), i;
        if (az && aA.button == j && ay.tc[az]) {
            i = ay.tc[az];
            Z(aA);
            if (!i.EndDrag() && !i.touched) {
                i.Clicked(aA)
            }
        }
    }

    function P(ay) {
        var i = w, j = e(ay);
        if (j && ay.changedTouches && i.tc[j]) {
            i.tc[j].touched = 1;
            i.tc[j].BeginDrag(ay)
        }
    }

    function p(ay) {
        var i = w, j = e(ay);
        if (j && ay.changedTouches && i.tc[j]) {
            ap(ay);
            if (!i.tc[j].EndDrag()) {
                i.tc[j].Draw();
                i.tc[j].Clicked(ay)
            }
        }
    }

    function ap(aC) {
        var az, ay = w, j, aB, aA = e(aC);
        for (az in ay.tc) {
            j = ay.tc[az];
            if (j.tttimer) {
                clearTimeout(j.tttimer);
                j.tttimer = null
            }
        }
        if (aA && ay.tc[aA] && aC.changedTouches) {
            j = ay.tc[aA];
            if (aB = O(aC, j.canvas)) {
                j.mx = aB.x;
                j.my = aB.y;
                j.Drag(aC, aB)
            }
            j.drawn = 0
        }
    }

    function aa(ay) {
        var i = w, j = e(ay);
        if (j && i.tc[j]) {
            ay.cancelBubble = true;
            ay.returnValue = false;
            ay.preventDefault && ay.preventDefault();
            i.tc[j].Wheel((ay.wheelDelta || ay.detail) > 0)
        }
    }

    function K(aA) {
        var j = w.tc, az, ay;
        aA = aA || C();
        for (az in j) {
            ay = j[az].interval;
            j[az].Draw(aA)
        }
        w.NextFrame(ay)
    }

    function W(ay) {
        var aB = A.getElementById(ay), i = aB.getBoundingClientRect(), aE = A.documentElement, aC = A.body, aD = window, az = aD.pageXOffset || aE.scrollLeft, aF = aD.pageYOffset || aE.scrollTop, aA = aE.clientLeft || aC.clientLeft, j = aE.clientTop || aC.clientTop;
        return{x: i.left + az - aA, y: i.top + aF - j}
    }

    function S(j, az, aA, ay) {
        var i = j.radius * j.z1 / (j.z1 + j.z2 + az.z);
        return{x: az.x * i * aA, y: az.y * i * ay, z: az.z, w: (j.z1 - az.z) / j.z2}
    }

    function at(i) {
        this.e = i;
        this.br = 0;
        this.line = [];
        this.text = [];
        this.original = i.innerText || i.textContent
    }

    ax = at.prototype;
    ax.Lines = function (aA) {
        var az = aA ? 1 : 0, aB, j, ay;
        aA = aA || this.e;
        aB = aA.childNodes;
        j = aB.length;
        for (ay = 0; ay < j; ++ay) {
            if (aB[ay].nodeName == "BR") {
                this.text.push(this.line.join(" "));
                this.br = 1
            } else {
                if (aB[ay].nodeType == 3) {
                    if (this.br) {
                        this.line = [aB[ay].nodeValue];
                        this.br = 0
                    } else {
                        this.line.push(aB[ay].nodeValue)
                    }
                } else {
                    this.Lines(aB[ay])
                }
            }
        }
        az || this.br || this.text.push(this.line.join(" "));
        return this.text
    };
    ax.SplitWidth = function (ay, aF, aC, aB) {
        var aA, az, aE, aD = [];
        aF.font = aB + "px " + aC;
        for (aA = 0; aA < this.text.length; ++aA) {
            aE = this.text[aA].split(/\s+/);
            this.line = [aE[0]];
            for (az = 1; az < aE.length; ++az) {
                if (aF.measureText(this.line.join(" ") + " " + aE[az]).width > ay) {
                    aD.push(this.line.join(" "));
                    this.line = [aE[az]]
                } else {
                    this.line.push(aE[az])
                }
            }
            aD.push(this.line.join(" "))
        }
        return this.text = aD
    };
    function F(i, j) {
        this.ts = C();
        this.tc = i;
        this.tag = j;
        this.x = this.y = this.w = this.h = this.sc = 1;
        this.z = 0;
        this.Draw = i.pulsateTo < 1 && i.outlineMethod != "colour" ? this.DrawPulsate : this.DrawSimple;
        this.radius = i.outlineRadius | 0;
        this.SetMethod(i.outlineMethod)
    }

    v = F.prototype;
    v.SetMethod = function (ay) {
        var j = {block: ["PreDraw", "DrawBlock"], colour: ["PreDraw", "DrawColour"], outline: ["PostDraw", "DrawOutline"], classic: ["LastDraw", "DrawOutline"], none: ["LastDraw"]}, i = j[ay] || j.outline;
        if (ay == "none") {
            this.Draw = function () {
                return 1
            }
        } else {
            this.drawFunc = this[i[1]]
        }
        this[i[0]] = this.Draw
    };
    v.Update = function (aE, aD, aF, aA, aB, aC, az, i) {
        var j = this.tc.outlineOffset, ay = 2 * j;
        this.x = aB * aE + az - j;
        this.y = aB * aD + i - j;
        this.w = aB * aF + ay;
        this.h = aB * aA + ay;
        this.sc = aB;
        this.z = aC
    };
    v.DrawOutline = function (aB, i, aA, j, ay, az) {
        aB.strokeStyle = az;
        aj(aB, i, aA, j, ay, this.radius, true)
    };
    v.DrawColour = function (az, aC, aA, aD, ay, i, aE, j, aB) {
        if (aE.oimage) {
            aE.alpha = 1;
            aE.Draw(az, j, aB, aE.oimage);
            return 1
        }
        return this[aE.image ? "DrawColourImage" : "DrawColourText"](az, aC, aA, aD, ay, i, aE, j, aB)
    };
    v.DrawColourText = function (aA, aD, aB, aE, ay, i, aF, j, aC) {
        var az = aF.colour;
        aF.colour = i;
        aF.alpha = 1;
        aF.Draw(aA, j, aC);
        aF.colour = az;
        return 1
    };
    v.DrawColourImage = function (aD, aG, aE, aH, aC, i, aK, j, aF) {
        var aI = aD.canvas, aA = ~~q(aG, 0), az = ~~q(aE, 0), aB = au(aI.width - aA, aH) + 0.5 | 0, aJ = au(aI.height - az, aC) + 0.5 | 0, ay;
        if (n) {
            n.width = aB, n.height = aJ
        } else {
            n = L(aB, aJ)
        }
        if (!n) {
            return this.SetMethod("outline")
        }
        ay = n.getContext("2d");
        ay.drawImage(aI, aA, az, aB, aJ, 0, 0, aB, aJ);
        aD.clearRect(aA, az, aB, aJ);
        aK.alpha = 1;
        aK.Draw(aD, j, aF);
        aD.setTransform(1, 0, 0, 1, 0, 0);
        aD.save();
        aD.beginPath();
        aD.rect(aA, az, aB, aJ);
        aD.clip();
        aD.globalCompositeOperation = "source-in";
        aD.fillStyle = i;
        aD.fillRect(aA, az, aB, aJ);
        aD.restore();
        aD.globalCompositeOperation = "destination-over";
        aD.drawImage(n, 0, 0, aB, aJ, aA, az, aB, aJ);
        aD.globalCompositeOperation = "source-over";
        return 1
    };
    v.DrawBlock = function (aB, i, aA, j, ay, az) {
        aB.fillStyle = az;
        aj(aB, i, aA, j, ay, this.radius)
    };
    v.DrawSimple = function (aA, i, j, az) {
        var ay = this.tc;
        aA.setTransform(1, 0, 0, 1, 0, 0);
        aA.strokeStyle = ay.outlineColour;
        aA.lineWidth = ay.outlineThickness;
        aA.shadowBlur = aA.shadowOffsetX = aA.shadowOffsetY = 0;
        aA.globalAlpha = 1;
        return this.drawFunc(aA, this.x, this.y, this.w, this.h, ay.outlineColour, i, j, az)
    };
    v.DrawPulsate = function (aB, i, j, az) {
        var aA = C() - this.ts, ay = this.tc;
        aB.setTransform(1, 0, 0, 1, 0, 0);
        aB.strokeStyle = ay.outlineColour;
        aB.lineWidth = ay.outlineThickness;
        aB.shadowBlur = aB.shadowOffsetX = aB.shadowOffsetY = 0;
        aB.globalAlpha = ay.pulsateTo + ((1 - ay.pulsateTo) * (0.5 + (u(2 * Math.PI * aA / (1000 * ay.pulsateTime)) / 2)));
        return this.drawFunc(aB, this.x, this.y, this.w, this.h, ay.outlineColour, i, j, az)
    };
    v.Active = function (ay, i, j) {
        return(i >= this.x && j >= this.y && i <= this.x + this.w && j <= this.y + this.h)
    };
    v.PreDraw = v.PostDraw = v.LastDraw = aq;
    function d(az, aK, aG, aJ, aH, aA, ay, aC, aI, aB, aF, j, aE, i) {
        var aD = az.ctxt;
        this.tc = az;
        this.image = aK.src ? aK : null;
        this.text = aK.src ? [] : aK;
        this.text_original = i;
        this.line_widths = [];
        this.title = aG.title || null;
        this.a = aG;
        this.position = new Y(aJ[0], aJ[1], aJ[2]);
        this.x = this.y = this.z = 0;
        this.w = aH;
        this.h = aA;
        this.colour = ay || az.textColour;
        this.bgColour = aC || az.bgColour;
        this.bgRadius = aI | 0;
        this.bgOutline = aB || this.colour;
        this.bgOutlineThickness = aF | 0;
        this.textFont = j || az.textFont;
        this.padding = aE | 0;
        this.weight = this.sc = this.alpha = 1;
        this.weighted = !az.weight;
        this.outline = new F(az, this);
        if (!this.image) {
            this.textHeight = az.textHeight;
            this.extents = r(this.text, this.textFont, this.textHeight);
            this.Measure(aD, az)
        }
        this.SetShadowColour = az.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
        this.SetDraw(az)
    }

    b = d.prototype;
    b.EqualTo = function (ay) {
        var j = ay.getElementsByTagName("img");
        if (this.a.href != ay.href) {
            return 0
        }
        if (j.length) {
            return this.image.src == j[0].src
        }
        return(ay.innerText || ay.textContent) == this.text_original
    };
    b.SetDraw = function (i) {
        this.Draw = this.image ? (i.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
        i.noSelect && (this.CheckActive = aq)
    };
    b.MeasureText = function (aB) {
        var az, ay = this.text.length, j = 0, aA;
        for (az = 0; az < ay; ++az) {
            this.line_widths[az] = aA = aB.measureText(this.text[az]).width;
            j = q(j, aA)
        }
        return j
    };
    b.Measure = function (aC, j) {
        this.h = this.extents ? this.extents.max.y + this.extents.min.y : this.textHeight;
        aC.font = this.font = this.textHeight + "px " + this.textFont;
        this.w = this.MeasureText(aC);
        if (j.txtOpt) {
            var az = j.txtScale, aA = az * this.textHeight, aB = aA + "px " + this.textFont, ay = [az * j.shadowOffset[0], az * j.shadowOffset[1]], i;
            aC.font = aB;
            i = this.MeasureText(aC);
            this.image = t(this.text, aB, i + az, (az * this.h) + az, this.colour, this.bgColour, this.bgOutline, az * this.bgOutlineThickness, j.shadow, az * j.shadowBlur, ay, az * this.padding, az * this.bgRadius, i, this.line_widths);
            if (j.outlineMethod == "colour") {
                this.oimage = t(this.text, aB, i + az, (az * this.h) + az, j.outlineColour, this.bgColour, j.outlineColour, az * this.bgOutlineThickness, j.shadow, az * j.shadowBlur, ay, az * this.padding, az * this.bgRadius, i, this.line_widths)
            }
            if (this.image) {
                this.w = this.image.width / az;
                this.h = this.image.height / az
            }
            this.SetDraw(j);
            j.txtOpt = !!this.image
        }
    };
    b.SetFont = function (i, j) {
        this.textFont = i;
        this.colour = j;
        this.extents = r(this.text, this.textFont, this.textHeight);
        this.Measure(this.tc.ctxt, this.tc)
    };
    b.SetWeight = function (i) {
        if (!this.text.length) {
            return
        }
        this.weight = i;
        this.Weight(this.tc.ctxt, this.tc);
        this.Measure(this.tc.ctxt, this.tc)
    };
    b.Weight = function (az, ay) {
        var j = this.weight, i = ay.weightMode;
        this.weighted = true;
        if (i == "colour" || i == "both") {
            this.colour = g(ay, (j - ay.min_weight) / (ay.max_weight - ay.min_weight))
        }
        if (i == "size" || i == "both") {
            if (ay.weightSizeMin > 0 && ay.weightSizeMax > ay.weightSizeMin) {
                this.textHeight = ay.weightSize * (ay.weightSizeMin + (ay.weightSizeMax - ay.weightSizeMin) * (j - ay.min_weight) / (ay.max_weight - ay.min_weight))
            } else {
                this.textHeight = j * ay.weightSize
            }
        }
        this.extents = r(this.text, this.textFont, this.textHeight)
    };
    b.SetShadowColourFixed = function (ay, j, i) {
        ay.shadowColor = j
    };
    b.SetShadowColourAlpha = function (ay, j, i) {
        ay.shadowColor = Q(j, i)
    };
    b.DrawText = function (aA, aD, az) {
        var aE = this.tc, aC = this.x, aB = this.y, aF = this.sc, j, ay;
        aA.globalAlpha = this.alpha;
        aA.fillStyle = this.colour;
        aE.shadow && this.SetShadowColour(aA, aE.shadow, this.alpha);
        aA.font = this.font;
        aC += aD / aF;
        aB += (az / aF) - (this.h / 2);
        for (j = 0; j < this.text.length; ++j) {
            ay = aC - (this.line_widths[j] / 2);
            aA.setTransform(aF, 0, 0, aF, aF * ay, aF * aB);
            aA.fillText(this.text[j], 0, 0);
            aB += this.textHeight
        }
    };
    b.DrawImage = function (aA, aH, az, aC) {
        var aE = this.x, aB = this.y, aI = this.sc, j = aC || this.image, aF = this.w, ay = this.h, aD = this.alpha, aG = this.shadow;
        aA.globalAlpha = aD;
        aG && this.SetShadowColour(aA, aG, aD);
        aE += (aH / aI) - (aF / 2);
        aB += (az / aI) - (ay / 2);
        aA.setTransform(aI, 0, 0, aI, aI * aE, aI * aB);
        aA.drawImage(j, 0, 0, aF, ay)
    };
    b.DrawImageIE = function (aA, aE, az) {
        var j = this.image, aF = this.sc, aD = j.width = this.w * aF, ay = j.height = this.h * aF, aC = (this.x * aF) + aE - (aD / 2), aB = (this.y * aF) + az - (ay / 2);
        aA.setTransform(1, 0, 0, 1, 0, 0);
        aA.globalAlpha = this.alpha;
        aA.drawImage(j, aC, aB)
    };
    b.Calc = function (i, ay) {
        var j, aB = this.tc, aA = aB.minBrightness, az = aB.maxBrightness, aC = aB.max_radius;
        j = i.xform(this.position);
        this.xformed = j;
        j = S(aB, j, aB.stretchX, aB.stretchY);
        this.x = j.x;
        this.y = j.y;
        this.z = j.z;
        this.sc = j.w;
        this.alpha = ay * am(aA + (az - aA) * (aC - this.z) / (2 * aC), 0, 1)
    };
    b.UpdateActive = function (aD, ay, aB) {
        var aA = this.outline, j = this.w, az = this.h, i = this.x - j / 2, aC = this.y - az / 2;
        aA.Update(i, aC, j, az, this.sc, this.z, ay, aB);
        return aA
    };
    b.CheckActive = function (aA, i, az) {
        var j = this.tc, ay = this.UpdateActive(aA, i, az);
        return ay.Active(aA, j.mx, j.my) ? ay : null
    };
    b.Clicked = function (aB) {
        var j = this.a, ay = j.target, az = j.href, i;
        if (ay != "" && ay != "_self") {
            if (self.frames[ay]) {
                self.frames[ay].document.location = az
            } else {
                try {
                    if (top.frames[ay]) {
                        top.frames[ay].document.location = az;
                        return
                    }
                } catch (aA) {
                }
                window.open(az, ay)
            }
            return
        }
        if (A.createEvent) {
            i = A.createEvent("MouseEvents");
            i.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
            if (!j.dispatchEvent(i)) {
                return
            }
        } else {
            if (j.fireEvent) {
                if (!j.fireEvent("onclick")) {
                    return
                }
            }
        }
        A.location = az
    };
    function w(aD, j, az) {
        var ay, aB, aC = A.getElementById(aD), aA = ["id", "class", "innerHTML"];
        if (!aC) {
            throw 0
        }
        if (ac(window.G_vmlCanvasManager)) {
            aC = window.G_vmlCanvasManager.initElement(aC);
            this.ie = parseFloat(navigator.appVersion.split("MSIE")[1])
        }
        if (aC && (!aC.getContext || !aC.getContext("2d").fillText)) {
            aB = A.createElement("DIV");
            for (ay = 0; ay < aA.length; ++ay) {
                aB[aA[ay]] = aC[aA[ay]]
            }
            aC.parentNode.insertBefore(aB, aC);
            aC.parentNode.removeChild(aC);
            throw 0
        }
        for (ay in w.options) {
            this[ay] = az && ac(az[ay]) ? az[ay] : (ac(w[ay]) ? w[ay] : w.options[ay])
        }
        this.canvas = aC;
        this.ctxt = aC.getContext("2d");
        this.z1 = 250 / this.depth;
        this.z2 = this.z1 / this.zoom;
        this.radius = au(aC.height, aC.width) * 0.0075;
        this.max_weight = 0;
        this.min_weight = 200;
        this.textFont = this.textFont && m(this.textFont);
        this.textHeight *= 1;
        this.pulsateTo = am(this.pulsateTo, 0, 1);
        this.minBrightness = am(this.minBrightness, 0, 1);
        this.maxBrightness = am(this.maxBrightness, this.minBrightness, 1);
        this.ctxt.textBaseline = "top";
        this.lx = (this.lock + "").indexOf("x") + 1;
        this.ly = (this.lock + "").indexOf("y") + 1;
        this.frozen = this.dx = this.dy = this.fixedAnim = this.touched = 0;
        this.fixedAlpha = 1;
        this.source = j || aD;
        this.transform = N.Identity();
        this.startTime = this.time = C();
        this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
        this.animTiming = (typeof w[this.animTiming] == "function" ? w[this.animTiming] : w.Smooth);
        if (this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
            this.ctxt.shadowColor = this.shadow;
            this.shadow = this.ctxt.shadowColor;
            this.shadowAlpha = ae()
        } else {
            delete this.shadow
        }
        this.Load();
        if (j && this.hideTags) {
            (function (i) {
                if (w.loaded) {
                    i.HideTags()
                } else {
                    X("load", function () {
                        i.HideTags()
                    }, window)
                }
            })(this)
        }
        this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
        this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
        if (this.tooltip) {
            if (this.tooltip == "native") {
                this.Tooltip = this.TooltipNative
            } else {
                this.Tooltip = this.TooltipDiv;
                if (!this.ttdiv) {
                    this.ttdiv = A.createElement("div");
                    this.ttdiv.className = this.tooltipClass;
                    this.ttdiv.style.position = "absolute";
                    this.ttdiv.style.zIndex = aC.style.zIndex + 1;
                    X("mouseover", function (i) {
                        i.target.style.display = "none"
                    }, this.ttdiv);
                    A.body.appendChild(this.ttdiv)
                }
            }
        } else {
            this.Tooltip = this.TooltipNone
        }
        if (!this.noMouse && !a[aD]) {
            X("mousemove", Z, aC);
            X("mouseout", z, aC);
            X("mouseup", av, aC);
            X("touchstart", P, aC);
            X("touchend", p, aC);
            X("touchcancel", p, aC);
            X("touchmove", ap, aC);
            if (this.dragControl) {
                X("mousedown", x, aC);
                X("selectstart", aq, aC)
            }
            if (this.wheelZoom) {
                X("mousewheel", aa, aC);
                X("DOMMouseScroll", aa, aC)
            }
            a[aD] = 1
        }
        w.started || (w.started = setTimeout(K, this.interval))
    }

    M = w.prototype;
    M.SourceElements = function () {
        if (A.querySelectorAll) {
            return A.querySelectorAll("#" + this.source)
        }
        return[A.getElementById(this.source)]
    };
    M.HideTags = function () {
        var ay = this.SourceElements(), j;
        for (j = 0; j < ay.length; ++j) {
            ay[j].style.display = "none"
        }
    };
    M.GetTags = function () {
        var aC = this.SourceElements(), aB, ay = [], aA, az;
        for (aA = 0; aA < aC.length; ++aA) {
            aB = aC[aA].getElementsByTagName("a");
            for (az = 0; az < aB.length; ++az) {
                ay.push(aB[az])
            }
        }
        return ay
    };
    M.CreateTag = function (aB, j) {
        var aE = aB.getElementsByTagName("img"), aA, aF, aD, ay, aC, az;
        j = j || [0, 0, 0];
        if (aE.length) {
            aA = new Image;
            aA.src = aE[0].src;
            aF = new d(this, aA, aB, j, 0, 0);
            an(aA, aE[0], aF, this);
            return aF
        }
        aD = new at(aB);
        aF = aD.Lines();
        ay = this.textFont || m(U(aB, "font-family"));
        if (this.splitWidth) {
            aF = aD.SplitWidth(this.splitWidth, this.ctxt, ay, this.textHeight)
        }
        aC = this.bgColour == "tag" ? U(aB, "background-color") : this.bgColour;
        az = this.bgOutline == "tag" ? U(aB, "color") : this.bgOutline;
        return new d(this, aF, aB, j, 2, this.textHeight + 2, this.textColour || U(aB, "color"), aC, this.bgRadius, az, this.bgOutlineThickness, ay, this.padding, aD.original)
    };
    M.UpdateTag = function (ay, i) {
        var az = this.textColour || U(i, "color"), j = this.textFont || m(U(i, "font-family"));
        ay.a = i;
        ay.title = i.title;
        if (ay.colour != az || ay.textFont != j) {
            ay.SetFont(j, az)
        }
    };
    M.Weight = function (az) {
        var ay = az.length, j, aA, aB = [];
        for (aA = 0; aA < ay; ++aA) {
            j = s(this, az[aA].a);
            if (j > this.max_weight) {
                this.max_weight = j
            }
            if (j < this.min_weight) {
                this.min_weight = j
            }
            aB.push(j)
        }
        if (this.max_weight > this.min_weight) {
            for (aA = 0; aA < ay; ++aA) {
                az[aA].SetWeight(aB[aA])
            }
        }
    };
    M.Load = function () {
        var aH = this.GetTags(), aD = [], aG, aC, az, ay, j, aA, aF, aB = [], aE = {sphere: o, vcylinder: af, hcylinder: al, vring: c, hring: l};
        if (aH.length) {
            aB.length = aH.length;
            for (aF = 0; aF < aH.length; ++aF) {
                aB[aF] = aF
            }
            this.shuffleTags && ag(aB);
            az = 100 * this.radiusx;
            ay = 100 * this.radiusy;
            j = 100 * this.radiusz;
            this.max_radius = q(az, q(ay, j));
            if (this.shapeArgs) {
                this.shapeArgs[0] = aH.length
            } else {
                aC = this.shape.toString().split(/[(),]/);
                aG = aC.shift();
                this.shape = aE[aG] || aE.sphere;
                this.shapeArgs = [aH.length, az, ay, j].concat(aC)
            }
            aA = this.shape.apply(this, this.shapeArgs);
            this.listLength = aH.length;
            for (aF = 0; aF < aH.length; ++aF) {
                aD.push(this.CreateTag(aH[aB[aF]], aA[aF]))
            }
            this.weight && this.Weight(aD, true)
        }
        this.taglist = aD
    };
    M.Update = function () {
        var aH = this.GetTags(), aG = [], aB = this.taglist, aI, aF = [], aD = [], az, aE, ay, aC, aA;
        if (!this.shapeArgs) {
            return this.Load()
        }
        if (aH.length) {
            ay = this.listLength = aH.length;
            aE = aB.length;
            for (aC = 0; aC < aE; ++aC) {
                aG.push(aB[aC]);
                aD.push(aC)
            }
            for (aC = 0; aC < ay; ++aC) {
                for (aA = 0, aI = 0; aA < aE; ++aA) {
                    if (aB[aA].EqualTo(aH[aC])) {
                        this.UpdateTag(aG[aA], aH[aC]);
                        aI = aD[aA] = -1
                    }
                }
                if (!aI) {
                    aF.push(aC)
                }
            }
            for (aC = 0, aA = 0; aC < aE; ++aC) {
                if (aD[aA] == -1) {
                    aD.splice(aA, 1)
                } else {
                    ++aA
                }
            }
            if (aD.length) {
                ag(aD);
                while (aD.length && aF.length) {
                    aC = aD.shift();
                    aA = aF.shift();
                    aG[aC] = this.CreateTag(aH[aA])
                }
                aD.sort(function (j, i) {
                    return j - i
                });
                while (aD.length) {
                    aG.splice(aD.pop(), 1)
                }
            }
            aA = aG.length / (aF.length + 1);
            aC = 0;
            while (aF.length) {
                aG.splice(ai(++aC * aA), 0, this.CreateTag(aH[aF.shift()]))
            }
            this.shapeArgs[0] = ay = aG.length;
            az = this.shape.apply(this, this.shapeArgs);
            for (aC = 0; aC < ay; ++aC) {
                aG[aC].position = new Y(az[aC][0], az[aC][1], az[aC][2])
            }
            this.weight && this.Weight(aG)
        }
        this.taglist = aG
    };
    M.SetShadow = function (i) {
        i.shadowBlur = this.shadowBlur;
        i.shadowOffsetX = this.shadowOffset[0];
        i.shadowOffsetY = this.shadowOffset[1]
    };
    M.Draw = function (aI) {
        if (this.paused) {
            return
        }
        var aC = this.canvas, aA = aC.width, aH = aC.height, aK = 0, az = (aI - this.time) * this.interval / 1000, aG = aA / 2 + this.offsetX, aF = aH / 2 + this.offsetY, aO = this.ctxt, aE, aP, aM, ay = -1, aB = this.taglist, aL = aB.length, j = this.frontSelect, aJ = (this.centreFunc == aq), aD;
        this.time = aI;
        if (this.frozen && this.drawn) {
            return this.Animate(aA, aH, az)
        }
        aD = this.AnimateFixed();
        aO.setTransform(1, 0, 0, 1, 0, 0);
        for (aM = 0; aM < aL; ++aM) {
            aB[aM].Calc(this.transform, this.fixedAlpha)
        }
        aB = y(aB, function (aQ, i) {
            return i.z - aQ.z
        });
        if (aD && this.fixedAnim.active) {
            aE = this.fixedAnim.tag.UpdateActive(aO, aG, aF)
        } else {
            this.active = null;
            for (aM = 0; aM < aL; ++aM) {
                aP = this.mx >= 0 && this.my >= 0 && this.taglist[aM].CheckActive(aO, aG, aF);
                if (aP && aP.sc > aK && (!j || aP.z <= 0)) {
                    aE = aP;
                    ay = aM;
                    aE.tag = this.taglist[aM];
                    aK = aP.sc
                }
            }
            this.active = aE
        }
        this.txtOpt || (this.shadow && this.SetShadow(aO));
        aO.clearRect(0, 0, aA, aH);
        for (aM = 0; aM < aL; ++aM) {
            if (!aJ && aB[aM].z <= 0) {
                try {
                    this.centreFunc(aO, aA, aH, aG, aF)
                } catch (aN) {
                    alert(aN);
                    this.centreFunc = aq
                }
                aJ = true
            }
            if (!(aE && aE.tag == aB[aM] && aE.PreDraw(aO, aB[aM], aG, aF))) {
                aB[aM].Draw(aO, aG, aF)
            }
            aE && aE.tag == aB[aM] && aE.PostDraw(aO)
        }
        if (this.freezeActive && aE) {
            this.Freeze()
        } else {
            this.UnFreeze();
            this.drawn = (aL == this.listLength)
        }
        if (this.fixedCallback) {
            this.fixedCallback(this, this.fixedCallbackTag);
            this.fixedCallback = null
        }
        aD || this.Animate(aA, aH, az);
        aE && aE.LastDraw(aO);
        aC.style.cursor = aE ? this.activeCursor : "";
        this.Tooltip(aE, this.taglist[ay])
    };
    M.TooltipNone = function () {
    };
    M.TooltipNative = function (j, i) {
        this.canvas.title = j && i.title ? i.title : ""
    };
    M.TooltipDiv = function (aA, j) {
        var i = this, az = i.ttdiv.style, aB = i.canvas.id, ay = "none";
        if (aA && j.title) {
            if (j.title != i.ttdiv.innerHTML) {
                az.display = ay
            }
            i.ttdiv.innerHTML = j.title;
            j.title = i.ttdiv.innerHTML;
            if (az.display == ay && !i.tttimer) {
                i.tttimer = setTimeout(function () {
                    var aC = W(aB);
                    az.display = "block";
                    az.left = aC.x + i.mx + "px";
                    az.top = aC.y + i.my + 24 + "px";
                    i.tttimer = null
                }, i.tooltipDelay)
            }
        } else {
            az.display = ay
        }
    };
    M.Transform = function (aB, i, aD) {
        if (i || aD) {
            var j = ab(i), aC = u(i), aE = ab(aD), aA = u(aD), ay = new N([aA, 0, aE, 0, 1, 0, -aE, 0, aA]), az = new N([1, 0, 0, 0, aC, -j, 0, j, aC]);
            aB.transform = aB.transform.mul(ay.mul(az))
        }
    };
    M.AnimateFixed = function () {
        var ay, j, aA, i, az;
        if (this.fadeIn) {
            j = C() - this.startTime;
            if (j >= this.fadeIn) {
                this.fadeIn = 0;
                this.fixedAlpha = 1
            } else {
                this.fixedAlpha = j / this.fadeIn
            }
        }
        if (this.fixedAnim) {
            if (!this.fixedAnim.transform) {
                this.fixedAnim.transform = this.transform
            }
            ay = this.fixedAnim, j = C() - ay.t0, aA = ay.angle, i, az = this.animTiming(ay.t, j);
            this.transform = ay.transform;
            if (j >= ay.t) {
                this.fixedCallbackTag = ay.tag;
                this.fixedCallback = ay.cb;
                this.fixedAnim = this.yaw = this.pitch = 0
            } else {
                aA *= az
            }
            i = N.Rotation(aA, ay.axis);
            this.transform = this.transform.mul(i);
            return(this.fixedAnim != 0)
        }
        return false
    };
    M.AnimatePosition = function (ay, aB, az) {
        var j = this, i = j.mx, aD = j.my, aA, aC;
        if (!j.frozen && i >= 0 && aD >= 0 && i < ay && aD < aB) {
            aA = j.maxSpeed, aC = j.reverse ? -1 : 1;
            j.lx || (j.yaw = aC * az * ((aA * 2 * i / ay) - aA));
            j.ly || (j.pitch = aC * az * -((aA * 2 * aD / aB) - aA));
            j.initial = null
        } else {
            if (!j.initial) {
                if (j.frozen && !j.freezeDecel) {
                    j.yaw = j.pitch = 0
                } else {
                    j.Decel(j)
                }
            }
        }
        this.Transform(j, j.pitch, j.yaw)
    };
    M.AnimateDrag = function (j, aA, az) {
        var i = this, ay = 100 * az * i.maxSpeed / i.max_radius / i.zoom;
        if (i.dx || i.dy) {
            i.lx || (i.yaw = i.dx * ay / i.stretchX);
            i.ly || (i.pitch = i.dy * -ay / i.stretchY);
            i.dx = i.dy = 0;
            i.initial = null
        } else {
            if (!i.initial) {
                i.Decel(i)
            }
        }
        this.Transform(i, i.pitch, i.yaw)
    };
    M.Freeze = function () {
        if (!this.frozen) {
            this.preFreeze = [this.yaw, this.pitch];
            this.frozen = 1;
            this.drawn = 0
        }
    };
    M.UnFreeze = function () {
        if (this.frozen) {
            this.yaw = this.preFreeze[0];
            this.pitch = this.preFreeze[1];
            this.frozen = 0
        }
    };
    M.Decel = function (i) {
        var az = i.minSpeed, aA = H(i.yaw), j = H(i.pitch);
        if (!i.lx && aA > az) {
            i.yaw = aA > i.z0 ? i.yaw * i.decel : 0
        }
        if (!i.ly && j > az) {
            i.pitch = j > i.z0 ? i.pitch * i.decel : 0
        }
    };
    M.Zoom = function (i) {
        this.z2 = this.z1 * (1 / i);
        this.drawn = 0
    };
    M.Clicked = function (ay) {
        var i = this.active;
        try {
            if (i && i.tag) {
                if (this.clickToFront === false || this.clickToFront === null) {
                    i.tag.Clicked(ay)
                } else {
                    this.TagToFront(i.tag, this.clickToFront, function () {
                        i.tag.Clicked(ay)
                    }, true)
                }
            }
        } catch (j) {
        }
    };
    M.Wheel = function (j) {
        var ay = this.zoom + this.zoomStep * (j ? 1 : -1);
        this.zoom = au(this.zoomMax, q(this.zoomMin, ay));
        this.Zoom(this.zoom)
    };
    M.BeginDrag = function (i) {
        this.down = O(i, this.canvas);
        i.cancelBubble = true;
        i.returnValue = false;
        i.preventDefault && i.preventDefault()
    };
    M.Drag = function (aA, az) {
        if (this.dragControl && this.down) {
            var ay = this.dragThreshold * this.dragThreshold, j = az.x - this.down.x, i = az.y - this.down.y;
            if (this.dragging || j * j + i * i > ay) {
                this.dx = j;
                this.dy = i;
                this.dragging = 1;
                this.down = az
            }
        }
    };
    M.EndDrag = function () {
        var i = this.dragging;
        this.dragging = this.down = null;
        return i
    };
    M.Pause = function () {
        this.paused = true
    };
    M.Resume = function () {
        this.paused = false
    };
    M.SetSpeed = function (j) {
        this.initial = j;
        this.yaw = j[0] * this.maxSpeed;
        this.pitch = j[1] * this.maxSpeed
    };
    M.FindTag = function (ay) {
        if (!ac(ay)) {
            return null
        }
        ac(ay.index) && (ay = ay.index);
        if (!E(ay)) {
            return this.taglist[ay]
        }
        var az, aA, j;
        if (ac(ay.id)) {
            az = "id", aA = ay.id
        } else {
            if (ac(ay.text)) {
                az = "innerText", aA = ay.text
            }
        }
        for (j = 0; j < this.taglist.length; ++j) {
            if (this.taglist[j].a[az] == aA) {
                return this.taglist[j]
            }
        }
    };
    M.RotateTag = function (aG, az, aF, i, aD, ay) {
        var aE = aG.xformed, aB = new Y(aE.x, aE.y, aE.z), aA = ad(aF, az), j = aB.angle(aA), aC = aB.cross(aA).unit();
        if (j == 0) {
            this.fixedCallbackTag = aG;
            this.fixedCallback = aD
        } else {
            this.fixedAnim = {angle: -j, axis: aC, t: i, t0: C(), cb: aD, tag: aG, active: ay}
        }
    };
    M.TagToFront = function (i, ay, az, j) {
        this.RotateTag(i, 0, 0, ay, az, j)
    };
    w.Start = function (ay, i, j) {
        w.tc[ay] = new w(ay, i, j)
    };
    function ao(i, j) {
        w.tc[j] && w.tc[j][i]()
    }

    w.Linear = function (i, j) {
        return j / i
    };
    w.Smooth = function (i, j) {
        return 0.5 - u(j * Math.PI / i) / 2
    };
    w.Pause = function (i) {
        ao("Pause", i)
    };
    w.Resume = function (i) {
        ao("Resume", i)
    };
    w.Reload = function (i) {
        ao("Load", i)
    };
    w.Update = function (i) {
        ao("Update", i)
    };
    w.SetSpeed = function (j, i) {
        if (E(i) && w.tc[j] && !isNaN(i[0]) && !isNaN(i[1])) {
            w.tc[j].SetSpeed(i);
            return true
        }
        return false
    };
    w.TagToFront = function (j, i) {
        if (!E(i)) {
            return false
        }
        i.lat = i.lng = 0;
        return w.RotateTag(j, i)
    };
    w.RotateTag = function (ay, i) {
        if (E(i) && w.tc[ay]) {
            if (isNaN(i.time)) {
                i.time = 500
            }
            var j = w.tc[ay].FindTag(i);
            if (j) {
                w.tc[ay].RotateTag(j, i.lat, i.lng, i.time, i.callback, i.active);
                return true
            }
        }
        return false
    };
    w.Delete = function (i) {
        delete a[i];
        delete w.tc[i]
    };
    w.NextFrame = function (i) {
        var j = window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        w.NextFrame = j ? w.NextFrameRAF : w.NextFrameTimeout;
        w.NextFrame(i)
    };
    w.NextFrameRAF = function () {
        requestAnimationFrame(K)
    };
    w.NextFrameTimeout = function (i) {
        setTimeout(K, i)
    };
    w.tc = {};
    w.options = {z1: 20000, z2: 20000, z0: 0.0002, freezeActive: false, freezeDecel: false, activeCursor: "pointer", pulsateTo: 1, pulsateTime: 3, reverse: false, depth: 0.5, maxSpeed: 0.05, minSpeed: 0, decel: 0.95, interval: 20, minBrightness: 0.1, maxBrightness: 1, outlineColour: "#ffff99", outlineThickness: 2, outlineOffset: 5, outlineMethod: "outline", outlineRadius: 0, textColour: "#ff99ff", textHeight: 15, textFont: "Helvetica, Arial, sans-serif", shadow: "#000", shadowBlur: 0, shadowOffset: [0, 0], initial: null, hideTags: true, zoom: 1, weight: false, weightMode: "size", weightFrom: null, weightSize: 1, weightSizeMin: null, weightSizeMax: null, weightGradient: {0: "#f00", 0.33: "#ff0", 0.66: "#0f0", 1: "#00f"}, txtOpt: true, txtScale: 2, frontSelect: false, wheelZoom: true, zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05, shape: "sphere", lock: null, tooltip: null, tooltipDelay: 300, tooltipClass: "tctooltip", radiusx: 1, radiusy: 1, radiusz: 1, stretchX: 1, stretchY: 1, offsetX: 0, offsetY: 0, shuffleTags: false, noSelect: false, noMouse: false, imageScale: 1, paused: false, dragControl: false, dragThreshold: 4, centreFunc: aq, splitWidth: 0, animTiming: "Smooth", clickToFront: false, fadeIn: 0, padding: 0, bgColour: null, bgRadius: 0, bgOutline: null, bgOutlineThickness: 0};
    for (I in w.options) {
        w[I] = w.options[I]
    }
    window.TagCanvas = w;
    jQuery.fn.tagcanvas = function (j, i) {
        var ay = {pause: function () {
            ah(this).each(function () {
                ao("Pause", ah(this)[0].id)
            })
        }, resume: function () {
            ah(this).each(function () {
                ao("Resume", ah(this)[0].id)
            })
        }, reload: function () {
            ah(this).each(function () {
                ao("Load", ah(this)[0].id)
            })
        }, update: function () {
            ah(this).each(function () {
                ao("Update", ah(this)[0].id)
            })
        }, tagtofront: function () {
            ah(this).each(function () {
                w.TagToFront(ah(this)[0].id, i)
            })
        }, rotatetag: function () {
            ah(this).each(function () {
                w.RotateTag(ah(this)[0].id, i)
            })
        }, "delete": function () {
            ah(this).each(function () {
                w.Delete(ah(this)[0].id)
            })
        }, setspeed: function () {
            ah(this).each(function () {
                w.SetSpeed(ah(this)[0].id, i)
            })
        }};
        if (typeof j == "string" && ay[j]) {
            ay[j].apply(this);
            return this
        } else {
            w.jquery = 1;
            ah(this).each(function () {
                w.Start(ah(this)[0].id, i, j)
            });
            return w.started
        }
    };
    X("load", function () {
        w.loaded = 1
    }, window)
})(jQuery);
