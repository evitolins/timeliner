// http://momentjs.com/
// http://refreshless.com/nouislider/examples/#section-dates


////////////////////////
// Controller
////////////////////////
var Timeline = function () {
    this.nodes = [];
};

Timeline.prototype.addNodes = function(nodes) {
    this.nodes = nodes;
};

Timeline.prototype.addNode = function(node) {
    this.nodes.push(node);
};

Timeline.prototype.removeNode = function(node) {
    for (var i=0; i < this.nodes.length; i++) {
        if (this.nodes[i] === node) {
            this.nodes = this.nodes.splice(i, 1);
        }
    }
};

Timeline.prototype.filterRange = function (min, max) {
    var filtered = [];
    var date;
    var percent;
    for (var i=0; i < this.nodes.length; i++) {
        if (this.nodes[i].date >=min && this.nodes[i].date <= max) {
            date = this.nodes[i].date;
            this.nodes[i].percent = (date - min) / (max - min);
            filtered.push(this.nodes[i]);
        }
    }
    return filtered;
};

////////////////////////
// View
////////////////////////
var TimelineView = function (viewportElem, dataElem) {
    this.parElem = viewportElem || document.body;
    this.dataElem = dataElem || undefined;
    this.elem = document.createElement('div');
    this.elem.className = 'timeline';
    this.milestonesDisplayed = 0;

    this.parElem.appendChild(this.elem);
};

TimelineView.prototype.addMilestone = function (idx, position, offsetTop) {
    var elem = document.createElement('div');
    elem.style.left = (position * 100) + '%';
    elem.className = 'milestone';
    elem.style.top = offsetTop + 'px';

    var labelelem = document.createElement('div');
    labelelem.className = 'milestone-label';
    labelelem.innerHTML = idx;
  
    var infoelem = document.createElement('div');
    infoelem.className = 'milestone-info';
    //infoelem.style.top = offsetTop + 'px';

    var titleelem = document.createElement('div');
    titleelem.className = 'milestone-info-title';
    titleelem.innerHTML = 'Some Event With a Long Title';
  
    var dateelem = document.createElement('div');
    dateelem.className = 'milestone-info-date';
    dateelem.innerHTML = 'February 23, 1979';
  
    elem.appendChild(infoelem);
    elem.appendChild(labelelem);
    infoelem.appendChild(titleelem);
    infoelem.appendChild(dateelem);
    this.elem.appendChild(elem);
    return elem;
};

TimelineView.prototype.addMilestoneMarker = function (position, offsetTop) {
    var elem = document.createElement('div');
    elem.style.left = (position * 100) + '%';
    elem.className = 'milestone';
    elem.style.top = offsetTop + 'px';
    this.elem.appendChild(elem);
    return elem;
};

TimelineView.prototype.clearMilestones = function () {
    while (this.elem.firstChild) {
        this.elem.removeChild(this.elem.firstChild);
    }
};

TimelineView.prototype.renderMilestones = function (milestoneData) {
    var level = -1,
        infoW = 100,
        infoH = 40,
        unitW = this.parElem.clientWidth,
        distance,
        offsetTop,
        mm,
        i;

    this.clearMilestones();
    this.milestonesDisplayed = 0;
    for (i = milestoneData.length - 1; i >= 0; i--) {
        if (milestoneData[i + 1]) {
            distance = (milestoneData[i + 1].percent - milestoneData[i].percent) * unitW;
        } else {
            distance = undefined;
        }
        if (distance < infoW && distance !== undefined) {
            level--;
        } else {
            level = -1;
        }
        offsetTop = infoH * level;
        // this.addMilestone(milestoneData[i].id, milestoneData[i].percent, offsetTop);
        mm = this.addMilestoneMarker(milestoneData[i].percent, offsetTop);
        mm.appendChild(milestoneData[i].elem);

        this.milestonesDisplayed++;
    }
};

/**
 * Output timeline range data, with various options
 * @param  {Object} options {min, max, format, type}
 * @return {undefined}         [description]
 */
TimelineView.prototype.updateMilestonesData = function (options) {
    var min = options.min,
        max = options.max,
        format = options.format || 'MM/DD/YYYY',
        html = [];

    if (!options.type || options.type === 'text') {
        html.push(moment(parseInt(min)).format(format) + ":" + moment(parseInt(max)).format(format) + " (" + this.milestonesDisplayed + " milestones)");
    }
    if (options.type === 'fancy') {
        var minDate = {
                month : moment(parseInt(min)).format('MMM'),
                day: moment(parseInt(min)).format('D'),
                year: moment(parseInt(min)).format('YYYY')
            },
            maxDate = {
                month : moment(parseInt(max)).format('MMM'),
                day: moment(parseInt(max)).format('D'),
                year: moment(parseInt(max)).format('YYYY')
            };
            html.push("<table><tr><td>");
            html.push("    <div class='date_ui'>");
            html.push("        <div class='date_month'>"+minDate.month+"</div>");
            html.push("        <div class='date_day'>"+minDate.day+"</div>");
            html.push("        <div class='date_year'>"+minDate.year+"</div>");
            html.push("    </div>");
            html.push("</td>");
            html.push("<td>");
            html.push("    <div class='date_ui'>");
            html.push("        <div class='date_month'>"+maxDate.month+"</div>");
            html.push("        <div class='date_day'>"+maxDate.day+"</div>");
            html.push("        <div class='date_year'>"+maxDate.year+"</div>");
            html.push("    </div>");
            html.push("</td></tr></table>");

    }
    this.dataElem.innerHTML = html.join('');
};






////////////////////////
// Bind
////////////////////////
var TimelineBind = function (initMin, initMax, viewportElem) {
    var isDragging = false,
        dragOrigX = 0,
        min = initMin,
        max = initMax,
        minOrig = min,
        maxOrig = max,
        updateCallback,

        listeners = {
            resize : function (e) {
                update();
            },
            mouseup : function (e) {
                isDragging = false;
            },
            mousedown : function (e) {
                isDragging = true;
                dragOrigX = e.clientX;
                minStart = min;
                maxStart = max;
            },
            mousemove : function (e) {
                var x = e.clientX,
                    dist = x - dragOrigX,
                    unitW = this.clientWidth / (max - min);
                if (isDragging) {
                    min = minStart - (dist / unitW);
                    max = maxStart - (dist / unitW);
                    update();
                }
            },
            wheel : function (e) {
                var dir = (e.wheelDelta > 0) ? 1 : -1,
                    x = e.clientX,
                    width = this.clientWidth,
                    percentX = x / width,
                    increment = 0.1,
                    origSpan = max - min,
                    lZoom = increment * dir * percentX,
                    rZoom = increment * dir * (1 - percentX);

                min = min + (origSpan * lZoom);
                max = max - (origSpan * rZoom);
                update();
            }
        },

        update = function () {
            if (typeof updateCallback === 'function') {
                updateCallback.apply(this, [min, max]);
            }
        },

        set_callback = function (func) {
            updateCallback = func;
        },

        bind = function () {
            window.addEventListener('resize', listeners.resize);
            window.addEventListener('mouseup', listeners.mouseup);
            viewportElem.addEventListener('mousedown', listeners.mousedown);
            viewportElem.addEventListener('mousemove', listeners.mousemove);
            viewportElem.addEventListener('wheel', listeners.wheel);
        },

        unbind = function () {
            window.removeEventListener('resize', listeners.resize);
            window.removeEventListener('mouseup', listeners.mouseup);
            viewportElem.removeEventListener('mousedown', listeners.mousedown);
            viewportElem.removeEventListener('mousemove', listeners.mousemove);
            viewportElem.removeEventListener('wheel', listeners.wheel);
        };

    return {
        set_callback : set_callback,
        bind : bind,
        unbind : unbind
    };
};