
;(function (window, document, Timeline, TimelineView, TimelineBind) { 'use strict';

    ////////////////////////
    // Timeline Example
    ////////////////////////
    var initMin = 1419196252000,
        initMax = 1511196252000,
        viewportElem = document.getElementById('viewport_a'),
        dataElem = document.getElementById('data_a'),
        gridElem = document.getElementById('grid_a'),
        tlc = new Timeline(),
        tlv = new TimelineView(viewportElem, dataElem, gridElem),
        tlb = new TimelineBind(initMin, initMax, viewportElem),
        milestonesDisplayed = 0,

        update = function (min, max) {
            tlv.renderMilestones(tlc.filterRange(min, max));
            tlv.updateGridData(min, max);
            tlv.updateMilestonesData({
                min: min,
                max: max,
                type: 'fancy',
                format: 'M/D/YY LT'
            });
        };


    var createFakeElem = function (label) {
        var elem = document.createElement('div');
        elem.style.width = '100px';
        elem.style.height = '40px';
        elem.style.border = '1px solid black';
        elem.style.boxSizing = 'border-box';
        elem.innerHTML = 'This is element ' + label;
        return elem;
    };

    ////////////////////////
    // Init
    ////////////////////////
    tlb.set_callback(update);
    tlb.bind();
    tlc.addNodes([
        {id: 0, title: 'A', info: 'a', date : 1419196252000, elem: createFakeElem(0)},
        {id: 1, title: 'B', info: 'b', date : 1429296252000, elem: createFakeElem(1)},
        {id: 2, title: 'C', info: 'c', date : 1439396252000, elem: createFakeElem(2)},
        {id: 3, title: 'D', info: 'd', date : 1449496252000, elem: createFakeElem(3)},
        {id: 4, title: 'E', info: 'e', date : 1459596252000, elem: createFakeElem(4)},
        {id: 5, title: 'F', info: 'f', date : 1469696252000, elem: createFakeElem(5)},
        {id: 6, title: 'G', info: 'g', date : 1479796252000, elem: createFakeElem(6)},
        {id: 7, title: 'H', info: 'h', date : 1489896252000, elem: createFakeElem(7)},
        {id: 8, title: 'I', info: 'i', date : 1499996252000, elem: createFakeElem(8)},
        {id: 9, title: 'J', info: 'j', date : 1501096252000, elem: createFakeElem(9)},
        {id: 10, title: 'K', info: 'k', date : 1511196252000, elem: createFakeElem(10)}
    ]);
    update(initMin, initMax);
})(window, document, Timeline, TimelineView, TimelineBind);