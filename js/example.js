
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


    var createFakeElem = function (label) {
        var elem = document.createElement('div');
        elem.style.width = '100px';
        elem.style.height = '40px';
        elem.style.border = '1px solid black';
        elem.innerHTML = 'This is element ' + label;
        return elem;
    }

    ////////////////////////
    // Init
    ////////////////////////
    tlb.set_callback(update);
    tlb.bind();
    tlc.addNodes([
        {id: 0, date : -3, elem: createFakeElem(0)},
        {id: 1, date : 1, elem: createFakeElem(1)},
        {id: 2, date : 1.2, elem: createFakeElem(2)},
        {id: 3, date : 2, elem: createFakeElem(3)},
        {id: 4, date : 4, elem: createFakeElem(4)},
        {id: 5, date : 5, elem: createFakeElem(5)},
        {id: 6, date : 7, elem: createFakeElem(6)},
        {id: 7, date : 10, elem: createFakeElem(7)},
        {id: 8, date : 20, elem: createFakeElem(8)},
        {id: 9, date : 21, elem: createFakeElem(9)},
        {id: 10, date : 24, elem: createFakeElem(10)}
    ]);
    update(initMin, initMax);
})(window, document, Timeline, TimelineView, TimelineBind);