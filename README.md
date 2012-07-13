# Chron jQuery Plugin

Chron is jQuery plugin to create chronometers in your html pages.

## Usage

Include the plugin script

``` html
<script type="text/javascript" src="jquery-chron.js"></script>
```

``` js
$("#chron1").Chron();
```
  
or to customize properties

``` js
$("#chron2").Chron({
	days			: 1,//initial value for days
	hours			: 2,//initial value for hours
	minutes			: 20,//initial value for minutes
	seconds			: 45,//initial value for seconds
	days_sel		: "#days2",//days selector
	hours_sel		: "#hours2",//hours selector
	minutes_sel		: "#minutes2",//minutes selector
	seconds_sel		: "#seconds2",//seconds selector
	start			: "#start2",// start button selector
	stop			: "#stop2",// stop button selector
	reset			: "#reset2",// reset button selector
	pause			: "#pause2",// resume button selector
	resume			: "#resume2",// resume button selector
	start_chron		: start_chron,//this function will be executed before start chron
	stop_chron		: stop_chron,//this function will be executed before stop chron
	reset_chron		: reset_chron,//this function will be executed before reset chron
	pause_chron		: pause_chron,//this function will be executed before pause chron
	resume_chron	: resume_chron,//this function will be executed before resume chron
	target			: "*", //selectors for the events target
	auto			: true,//true if plugin generate html chronometer
});


```
