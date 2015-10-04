Timeliner
===============================

<img align="right" height="200" src="http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/512/calendar.png">

*Timeliner* allow users to navigate a list of milestones across an infinite timeline.

You can use the controller to simply return a list of milestones within a given
range, or use Timeliner's view to illustrate the milestones within a customziable
timeline UI.

Dependencies
-------------------------------

**moment.js** is required for the Timeliner View for human-readable date & time data.


Installation
-------------------------------
1) Install dependencies

```bash
bower install
```

2) Source required scripts within your app

```html
<link rel="stylesheet" type="text/css" href="css/timeline.css">
...
<script src='bower_components/moment/min/moment.min.js'></script>
<script src='js/timeline.js'></script>
```


Examples
-------------------------------

### Filter Milestones Within Range

1) Create controller instance and give it milestone data

```javascript
var tlc = new Timeline();
tlc.addNodes([
    {date : 1419196252000},
    {date : 1429296252000},
    {date : 1439396252000},
    {date : 1449496252000},
    {date : 1459596252000},
    {date : 1469696252000},
    {date : 1479796252000},
    {date : 1489896252000},
    {date : 1499996252000},
    {date : 1501096252000},
    {date : 1511196252000)}
]);
```

2) Return milestones within specified range

```javascript
var filtered = tlc.filterRange(1449496252000, 1499996252000);
// Outputs:
// [
//     {date : 1449496252000, percent : 0},
//     {date : 1459596252000, percent : 0.12},
//     {date : 1469696252000, percent : 0.24},
//     {date : 1479796252000, percent : 0.46},
//     {date : 1489896252000, percent : 0.78},
//     {date : 1499996252000, percent : 1}
// ];
```
> Notice: This method also attaches position percentage data to assist with UI display



Reference
-------------------------------



Inspiration
-------------------------------
http://visjs.org/timeline_examples.html

