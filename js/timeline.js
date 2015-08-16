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

TimelineView.prototype.addMilestone = function (idx, position, level) {
    var elem = document.createElement('div');
    elem.style.left = (position * 100) + '%';
    elem.className = 'milestone';
    elem.style.top = (40 * level) + 'px';

    var labelelem = document.createElement('div');
    labelelem.className = 'milestone-label';
    labelelem.innerHTML = idx;
  
    var infoelem = document.createElement('div');
    infoelem.className = 'milestone-info';
    //infoelem.style.top = (40 * level) + 'px';

    var titleelem = document.createElement('div');
    titleelem.className = 'milestone-info-title';
    titleelem.innerHTML = 'Some Event...';
  
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

TimelineView.prototype.clearMilestones = function () {
    while (this.elem.firstChild) {
        this.elem.removeChild(this.elem.firstChild);
    }
};

TimelineView.prototype.renderMilestones = function (milestoneData) {
    var level = -1,
        infoW = 100,
        unitW = this.parElem.clientWidth,
        distance,
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
        this.addMilestone(milestoneData[i].id, milestoneData[i].percent, level);
        this.milestonesDisplayed++;
    }
};

TimelineView.prototype.updateMilestonesData = function () {
    var data = MIN.toFixed(2) + ":" + MAX.toFixed(2) + " (" + this.milestonesDisplayed + " milestones)";
    this.dataElem.innerHTML = data;
};






////////////////////////
// Bind
////////////////////////
var TimelineBind = function (viewportElem) {
    var isDragging = false,
        dragStartX = 0,
        posX = 0,
        posStartX = 0,
        minStart = MIN,
        maxStart = MAX,
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
                dragStartX = e.clientX;
                posStartX = posX;
            },
            mousemove : function (e) {
                var x = e.clientX,
                    unitW = this.clientWidth / (MAX - MIN);
                if (isDragging) {
                    posX = x - dragStartX + posStartX;
                    MIN = minStart - (posX / unitW);
                    MAX = maxStart - (posX / unitW);
                    update();
                }
            },
            wheel : function (e) {
                var dir = (e.wheelDelta > 0) ? 1 : -1,
                    x = e.clientX,
                    width = this.clientWidth,
                    percentX = x / width,
                    increment = 0.1,
                    origSpan = MAX - MIN,
                    lZoom = increment * dir * percentX,
                    rZoom = increment * dir * (1 - percentX);

                MIN = MIN + (origSpan * lZoom);
                MAX = MAX - (origSpan * rZoom);
                update();
            }
        },

        update = function () {
            if (typeof updateCallback === 'function') {
                updateCallback();
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