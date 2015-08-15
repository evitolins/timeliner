var MIN = 1,
    MAX = 10;

;(function (window, document, Timeline, TimelineView, TimelineBind) { 'use strict';

    ////////////////////////
    // Timeline Example
    ////////////////////////
    var viewportElem = document.getElementById('viewport'),
        dataElem = document.getElementById('data'),
        tlc = new Timeline(),
        tlv = new TimelineView(viewportElem),
        tlb = new TimelineBind(viewportElem),
        milestonesDisplayed = 0,

        renderMilestones = function () {
            var filtered = tlc.filterRange(MIN, MAX),
                level = -1,
                unitW = viewportElem.clientWidth,
                distance,
                i;

            tlv.clearMilestones();
            milestonesDisplayed = 0;
            for (i = filtered.length - 1; i >= 0; i--) {
            //for (var i=0; i < filtered.length; i++) {
                if (filtered[i + 1]) {
                    distance = (filtered[i + 1].percent - filtered[i].percent) * unitW;
                    //distance = (filtered[i].percent - filtered[i + 1].percent) * unitW;
                } else {
                    distance = undefined;
                }
                if (distance < 100 && distance !== undefined) {
                    level--;
                } else {
                    level = -1;
                }
                tlv.addMilestone(filtered[i].id, filtered[i].percent, level);
                milestonesDisplayed++;
            }
        },

        updateMilestonesData = function () {
            var data = MIN.toFixed(2) + ":" + MAX.toFixed(2) + " (" + milestonesDisplayed + " milestones)";
            dataElem.innerHTML = data;
        },

        update = function () {
            tlv.renderMilestones(tlc.filterRange(MIN, MAX));
            tlv.updateMilestonesData();
        };


    ////////////////////////
    // Init
    ////////////////////////
    tlb.set_callback(update);
    tlb.bind();
    tlc.addNodes([
        {id: 0, date : -3},
        {id: 1, date : 1},
        {id: 2, date : 1.2},
        {id: 3, date : 2},
        {id: 4, date : 4},
        {id: 5, date : 5},
        {id: 6, date : 7},
        {id: 7, date : 10},
        {id: 8, date : 20},
        {id: 9, date : 21},
        {id: 10, date : 24}
    ]);
    update();
})(window, document, Timeline, TimelineView, TimelineBind);