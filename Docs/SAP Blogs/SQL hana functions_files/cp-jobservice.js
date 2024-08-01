'use strict';
/* User Service */
var cpJobService = angular.module('cpJobService', []);

//Delete button factory response.
cpJobService.factory('jobQuery', ['$resource',
    function($resource) {
        return $resource('/http.svc/upload_job_status', {}, {
            'querySuccessAndFailedExcel': {
                method: 'GET',
                params: {
                	importjob_id: '@importjob_id',
                	job_type: '@job_type',
                	request_status: '@request_status',
                	project_name: '@project_name',
                	project_phio: '@project_phio',
                	omaploio: '@omaploio',
                	versione: '@version',
                	language: '@language',
                	transtype: '@transtype',
                	build: '@build',
                	submitted: '@submitted',
                	$page:1,
                	$page_size:'5000',
                	$orderbycolumn: '@$orderbycolumn',
                	$orderbytype: '@$orderbytype'
                },
                isArray: false
            },
            'restartJob' : {
            	method: 'POST',
            	params: {
            		jobId: '@jobId',
            		restart: true
            	}
            },
            'cancelJob' : {
            	method: 'POST',
            	params: {
            		jobId: '@jobId',
            		cancel: true
            	}
            }
        });
    }]);
