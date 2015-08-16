
;(function (window, document, Timeline, TimelineView, TimelineBind) { 'use strict';

    ////////////////////////
    // Timeline Example
    ////////////////////////
    var initMin = 1,
        initMax = 10,
        viewportElem = document.getElementById('viewport'),
        dataElem = document.getElementById('data'),
        tlc = new Timeline(),
        tlv = new TimelineView(viewportElem, dataElem),
        tlb = new TimelineBind(initMin, initMax, viewportElem),
        milestonesDisplayed = 0,

        update = function (min, max) {
            tlv.renderMilestones(tlc.filterRange(min, max));
            tlv.updateMilestonesData(min, max);
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
    update(initMin, initMax);
})(window, document, Timeline, TimelineView, TimelineBind);