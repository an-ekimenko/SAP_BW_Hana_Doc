'use strict';

/* Services */
var cpServices = angular.module('cpDashboardsSharedModule', ['ngResource']);

/* A service to share code (functions) across different dashboards */
cpServices.factory("dashboardssharedservice", ['$filter', 'userSharedService', function($filter, sharedService){

    function decodeEntities(encodedString) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    }

    function escapeCSV(data) {

        if (typeof data == "string") {

            var res = data.replace(/"/g, '""');

            return res;

        } else {
            return data;
        }

    }

    function formatDate(date, dateFormat) {
        
        if (dateFormat == "JS Date String") {
            return date.toString();
        } else if (dateFormat == "(JS) timestamp") {
            return date.getTime();
        } else {
            return $filter('date')(date, dateFormat);
        }

    }
    
    function getFormattedDateCsvData(timestamp, dateFormat) {
        if(!timestamp) {
            return '""' + ',';
        }
        if(dateFormat) {
            return '"'+ formatDate(new Date(timestamp), dateFormat) +'"' + ',';
        } else {
            return '"'+new Date(timestamp)+'"' + ',';
        }
    }

    return {
        // Code used for exporting excel.
        convertToCSV: function(objArray, table_id, dateFormat) {
            var str = '';  
            var visCols = []; // what columns are currently visible.
            var col=0;

            // Loop through visible columns
            $(table_id + ' thead th').each( function () {
                // grab column name
                var title = ($(table_id + ' thead th').eq(col).text());
                // grab column data ID
                var variable = $(table_id + ' thead th').eq(col).attr('id');

                str += '"'+escapeCSV(title)+'"' + ",";
                visCols.push(variable);
                col++;
            });
            // for attached url data to columns
            switch(table_id) {
                case "#feedback_id" :
                    str += '"'+"Loio link"+'"' + ",";
                    break;
                case "#comments_id" :
                    str += '"'+"Comment link"+'"' + ",";
                    break;
                case "#table_id" :
                    str += '"'+"Title link"+'"' + ",";
                    str += '"'+"Product Name link"+'"' + ",";
                    break;
            }

            str.slice(0,-1);
            str += '\r\n';

            for (var i = 0; i < objArray.length; i++) {
                var line ='';
                for (var j=0; j < visCols.length; j++ ) {
                    var variable = visCols[j];

                    if (variable == 'lastmodifieddate' || variable == 'uploadedDate') {
                        // convert timestamp into date and then into CSV data
                    	line += getFormattedDateCsvData(objArray[i][variable], dateFormat);
                    	
                    } else if (variable == 'created_on') {
                        // convert timestamp into date and then into CSV data
                        if(table_id == '#comments_id') { // comments dashboard (backend response with created_date)
                            
                        	line += getFormattedDateCsvData(objArray[i]['created_date'], dateFormat);
                        }
                        else { // feedback dashboard (backend response with created_on)
                            
                        	line += getFormattedDateCsvData(objArray[i][variable], dateFormat);
                        }
                    } else if (variable == 'notSearchableFromOutside') {
                        line += '"'+escapeCSV( (objArray[i][variable] == 0)? 1 : 0 )+'"' + ','
                    } else {
                        line += '"'+escapeCSV( decodeEntities(objArray[i][variable]) )+'"' + ',';
                    }
                }
                
                // for attached url data to columns
	            switch(table_id) {
	                case "#feedback_id" :   // Loio link
	                    line += '"'+objArray[i].url+'"' + ',';
	                    break;
	                case "#comments_id" :   // Comment link
	                    if (objArray[i].topicURL) {
	                        line += '"'+ window.location.href.split('/').slice(0, 3).join('/')
	                                    + objArray[i].topicURL + "?show_comments=true&comment_id=" + objArray[i].id +'"' + ",";
	                    } else {
	                        line += '"'+""+'"' + ",";
	                    }
	                    break;
	                case "#table_id" :  // Title link + Product Name link
	                    if (objArray[i].transtype == "productpage.uacp") {
	                        line += '"'+""+'"' + ",";
	                    } else {
	
	                        if (objArray[i].transtype == "zip") {
	                            line += '"'+ window.location.href.split('/').slice(0, 3).join('/') 
	                                        + "/http.svc/download?deliverable_id="+objArray[i].id +'"' + ",";
	
	                        } else if (objArray[i].transtype == "html5.uacp") {
	                            line += '"'+window.location.href.split('/').slice(0, 3).join('/')
	                                        +sharedService.getViewerURLAlias(objArray[i].alias, null, objArray[i].state, objArray[i].loio,
	                                            objArray[i].version, objArray[i].locale)+'"' + ",";
	                        } else {
	                            line += '"'+window.location.href.split('/').slice(0, 3).join('/')
	                                        +sharedService.getRawContentURL(objArray[i].alias, objArray[i].state, objArray[i].rootPage, objArray[i].loio, 
	                                            objArray[i].version, objArray[i].locale)+'"' + ",";
	                        }
	
	                    }// Title link
	                    line += '"'+window.location.href.split('/').slice(0, 3).join('/')
	                                + sharedService.getProductURL(objArray[i].state, objArray[i].product, objArray[i].version, objArray[i].locale)+'"';
	                    //Product Name link
	                    break;
                }
                
                str += line + '\r\n';
            }
 
            return str;
        },
        downloadFile: function(csv,filename){
            if (!filename) {
                filename = 'export.csv';
            }
            var blob = new Blob(['\uFEFF'+csv],{type: "text/csv;charset=utf-16;"});
            
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename)
            }
            else if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                csv = 'data:text/csv;charset=utf-16,\uFEFF' + csv;
                var encodedCSV = encodeURI(csv);
                var link = document.createElement('a');
                link.setAttribute('href', encodedCSV);
                link.setAttribute('download', filename);
                link.click();
            } 
            else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature
                                                    // detection
                // Browsers that support HTML5 download
                // attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style = "visibility:hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    }           
            }
        },
        availableDateFormats: [
            'dd-MM-yyyy',
            'MM-dd-yyyy',
            'yyyy-MM-dd HH:mm:ss Z',
            'dd/MM/yyyy',
            'M/d/yy H:m',
            'EEEE, MMMM d, yyyy',
            'd-MMM-yyyy HH:mm',
            '*d/M/yyyy',
            'M/yy',
            'JS Date String',
            '(JS) timestamp',
            'Custom'
        ],
        dateFormatExplanations: {
            'dd-MM-yyyy':'DATE-MONTH-YEAR',
            'MM-dd-yyyy':'MONTH-DATE-YEAR',
            'yyyy-MM-dd HH:mm:ss Z':'YEAR-MONTH-DATE HOUR:MINUTES:SECONDS timezone offset (-1200-+1200)',
            'dd/MM/yyyy':'DATE/MONTH/YEAR',
            'M/d/yy H:m':'MOTH/DATE/YEAR HOUR(0-23):MINUTES(0-59)',
            'EEEE, MMMM d, yyyy':'DAY (NAME), MONTH, DATE, YEAR',
            'd-MMM-yyyy HH:mm':'DATE-MONTH(NAME)-YEAR HOUR(00-23):MINUTES(00-59)',
            '*d/M/yyyy':'PREFIX(*)DATE/MONTH(1-12)/YEAR',
            'M/yy':'MONTH(1-12)/YEAR',
            'JS Date String':'JavaScript full text date string',
            '(JS) timestamp':'number of milliseconds since January 1, 1970, 00:00:00',
            'Custom':''
        },
        customTooltip : [
            'The input can be composed of the following elements:',
            '<ul>',
            '<li><code><span class="str">yyyy</span></code>: 4 digit representation of year (e.g. AD 1 =&gt; 0001, AD 2010 =&gt; 2010)</li>',
            '<li><code><span class="str">yy</span></code>: 2 digit representation of year, padded (00-99). (e.g. AD 2001 =&gt; 01, AD 2010 =&gt; 10)</li>',
            '<li><code><span class="str">y</span></code>: 1 digit representation of year, e.g. (AD 1 =&gt; 1, AD 199 =&gt; 199)</li>',
            '<li><code><span class="str">MMMM</span></code>: Month in year (January-December)</li>',
            '<li><code><span class="str">MMM</span></code>: Month in year (Jan-Dec)</li>',
            '<li><code><span class="str">MM</span></code>: Month in year, padded (01-12)</li>',
            '<li><code><span class="str">M</span></code>: Month in year (1-12)</li>',
            '<li><code><span class="str">LLLL</span></code>: Stand-alone month in year (January-December)</li>',
            '<li><code><span class="str">dd</span></code>: Day in month, padded (01-31)</li>',
            '<li><code><span class="str">d</span></code>: Day in month (1-31)</li>',
            '<li><code><span class="str">EEEE</span></code>: Day in Week,(Sunday-Saturday)</li>',
            '<li><code><span class="str">EEE</span></code>: Day in Week, (Sun-Sat)</li>',
            '<li><code><span class="str">HH</span></code>: Hour in day, padded (00-23)</li>',
            '<li><code><span class="str">H</span></code>: Hour in day (0-23)</li>',
            '<li><code><span class="str">hh</span></code>: Hour in AM/PM, padded (01-12)</li>',
            '<li><code><span class="str">h</span></code>: Hour in AM/PM, (1-12)</li>',
            '<li><code><span class="str">mm</span></code>: Minute in hour, padded (00-59)</li>',
            '<li><code><span class="str">m</span></code>: Minute in hour (0-59)</li>',
            '<li><code><span class="str">ss</span></code>: Second in minute, padded (00-59)</li>',
            '<li><code><span class="str">s</span></code>: Second in minute (0-59)</li>',
            '<li><code><span class="str">sss</span></code>: Millisecond in second, padded (000-999)</li>',
            '<li><code><span class="str">a</span></code>: AM/PM marker</li>',
            '<li><code><span class="str">Z</span></code>: 4 digit (+sign) representation of the timezone offset (-1200-+1200)</li>',
            '<li><code><span class="str">ww</span></code>: Week of year, padded (00-53). Week 01 is the week with the first Thursday of the year</li>',
            '<li><code><span class="str">w</span></code>: Week of year (0-53). Week 1 is the week with the first Thursday of the year</li>',
            '</ul>'
    ].join("\n")

    };
}]);