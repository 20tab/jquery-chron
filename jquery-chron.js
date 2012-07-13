/* ------------------------------------------------------------------------
	Class: Chron
	Use: Chronometer clone for jQuery
	Author: Raffaele Colace - 20tab s.r.l. (http://20tab.com)
	Version: 0.0.2 - Beta
------------------------------------------------------------------------- */
(function( $ ) {

	$.fn.Chron = function(options){
		//$.fn.Chron.config = ;			
		
		var config = $.extend({
			days			: 0,//initial value for days
			hours			: 0,//initial value for hours
			minutes			: 0,//initial value for minutes
			seconds			: 0,//initial value for seconds
			days_sel		: "#days",//days selector
			hours_sel		: "#hours",//hours selector
			minutes_sel		: "#minutes",//minutes selector
			seconds_sel		: "#seconds",//seconds selector
			start			: "#start",// start button selector
			stop			: "#stop",// stop button selector
			reset			: "#reset",// reset button selector
			pause			: "#pause",// resume button selector
			resume			: "#resume",// resume button selector
			start_chron		: function(){},//this function will be executed before start chron
			stop_chron		: function(){},//this function will be executed before stop chron
			reset_chron		: function(){},//this function will be executed before reset chron
			pause_chron		: function(){},//this function will be executed before pause chron
			resume_chron	: function(){},//this function will be executed before resume chron
			target			: "*", //selectors for the events target
			auto			: true,//true if plugin generate html chronometer
		},options);
		
		var running = false;
		var pause = false;
		
		$.fn.Chron.start_chron_def = function(){
			var check = config.start_chron();
			if(check != false){
				$(config.start).attr('disabled',true);
				$(config.stop).attr('disabled',false);
				$(config.resume).attr('disabled',true);
				$(config.pause).attr('disabled',false);
				running = true;
				run_chron();
			}
			$(config.target).trigger('chronstart');
		};
		
		$.fn.Chron.stop_chron_def = function(){
			var check = config.stop_chron();
			if(check != false){
				$(config.start).attr('disabled',false);
				$(config.stop).attr('disabled',true);
				$(config.resume).attr('disabled',true);
				$(config.pause).attr('disabled',true);
				
				config.days = 0;
				config.hours = 0;
				config.minutes = 0;
				config.seconds = 0;
				view_chron();
				running = false;
			}
			$(config.target).trigger('chronstop');
		};
		
		$.fn.Chron.pause_chron_def = function(){
			var check = config.pause_chron();
			if(check != false){
				$(config.start).attr('disabled',false);
				$(config.stop).attr('disabled',true);
				$(config.resume).attr('disabled',false);
				$(config.pause).attr('disabled',true);
				running = false;
				pause = true;
			}
			$(config.target).trigger('chronpause');
		};
		
		$.fn.Chron.resume_chron_def = function(){
			var check = config.resume_chron();
			if(check != false){
				$(config.start).attr('disabled',true);
				$(config.stop).attr('disabled',false);
				$(config.resume).attr('disabled',true);
				$(config.pause).attr('disabled',false);
				running = true;
				pause = false;
				run_chron();
			}
			$(config.target).trigger('chronresume');
		};
		
		$.fn.start = function(){
			$.fn.Chron.start_chron_def();
		};
		
		$.fn.resume = function(){
			$.fn.Chron.resume_chron_def();
		};
		
		$.fn.Chron.reset_chron_def = function(){
			var check = config.reset_chron();
			if(check != false){
				$.fn.Chron.stop_chron_def();
			}
			$(config.target).trigger('chronreset');
		};
		
		function run_chron(){
			if(running){
				if(config.seconds + 1 < 60){
					config.seconds = config.seconds + 1;
				}
				else{
					config.seconds = 0;
					if(config.minutes + 1 < 60){
						config.minutes = config.minutes +1;
					}
					else{
						config.minutes = 0;
						if(config.hours + 1 < 24){
							config.hours = config.hours + 1;
						}
						else{
							config.hours = 0;
							config.days = config.days +1;
						}
					}
				}
				setTimeout(run_chron,1000);
				view_chron();
			}
		}
	
		function view_chron(){
			$(config.days_sel).html(view_format(config.days));
			$(config.days_sel).data('days',config.days);
			$(config.hours_sel).html(view_format(config.hours));
			$(config.hours_sel).data('hours',config.hours);
			$(config.minutes_sel).html(view_format(config.minutes));
			$(config.minutes_sel).data('minutes',config.minutes);
			$(config.seconds_sel).html(view_format(config.seconds));
			$(config.seconds_sel).data('seconds',config.seconds);
		}
			
		function view_format(value){
			if(value < 10){
				value = "0" + value;
			}
			return value;
		}
		
		function format_selector(value){
			return value.replace("#","").replace(".","");
		}
		
		return this.each(function(){
			if(config.auto){
				$(this).html('<span id="'+format_selector(config.days_sel)+'" data-days = "'+config.days+'">'+view_format(config.days)+
				'</span>:<span id="'+format_selector(config.hours_sel)+'" data-hours = "'+config.hours+'">'+view_format(config.hours)+
				'</span>:<span id="'+format_selector(config.minutes_sel)+'" data-minutes = "'+config.minutes+'">'+view_format(config.minutes)+
				'</span>:<span id="'+format_selector(config.seconds_sel)+'" data-seconds = "'+config.seconds+'">'+view_format(config.seconds)+'</span>');
			}
			if(config.days != 0 || config.hours != 0 || config.minutes != 0 || config.seconds != 0){
				$(config.start).attr('disabled',true);
				$(config.pause).attr('disabled',true);
			}
			else{
				$(config.stop).attr('disabled',true);
				$(config.pause).attr('disabled',true);
				$(config.resume).attr('disabled',true);
			}			
			$(config.start).on('click',$.fn.Chron.start_chron_def);
			
			$(config.stop).on('click',$.fn.Chron.stop_chron_def);

			$(config.reset).on('click',$.fn.Chron.reset_chron_def);
			
			$(config.pause).on('click',$.fn.Chron.pause_chron_def);
			
			$(config.resume).on('click',$.fn.Chron.resume_chron_def);
			
		});	
	
	}
}( jQuery ) );
