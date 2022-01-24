"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyDownHandler = exports.useClickHandler = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var selectors_1 = require("../../redux/selectors");
var useClickHandler = function (onSingleClick, onDoubleClick) {
    var doubleClickDelay = (0, react_redux_1.useSelector)(selectors_1.selectDoubleClickDelay);
    var counter = (0, react_1.useRef)({
        clickCount: 0,
        clickTimeout: null,
    });
    return (0, react_1.useCallback)(function (event) {
        var mouseClickEvent = {
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
        };
        counter.current.clickCount++;
        if (counter.current.clickCount === 1) {
            if (onSingleClick) {
                event.preventDefault();
                onSingleClick(mouseClickEvent);
            }
            counter.current.clickCount = 1;
            // @ts-ignore
            counter.current.clickTimeout = setTimeout(function () { return (counter.current.clickCount = 0); }, doubleClickDelay);
        }
        else if (counter.current.clickCount === 2) {
            if (onDoubleClick) {
                event.preventDefault();
                onDoubleClick(mouseClickEvent);
            }
            if (typeof counter.current.clickTimeout === 'number') {
                clearTimeout(counter.current.clickTimeout);
                counter.current.clickTimeout = null;
                counter.current.clickCount = 0;
            }
        }
    }, [doubleClickDelay, onSingleClick, onDoubleClick, counter]);
};
exports.useClickHandler = useClickHandler;
var useKeyDownHandler = function (onKeyboardClick) {
    return (0, react_1.useCallback)(function (event) {
        if (!onKeyboardClick)
            return;
        var keyboardClickEvent = {
            enterKey: event.nativeEvent.code === 'Enter',
            spaceKey: event.nativeEvent.code === 'Space',
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
        };
        if (keyboardClickEvent.spaceKey || keyboardClickEvent.enterKey) {
            event.preventDefault();
            event.stopPropagation();
            onKeyboardClick(keyboardClickEvent);
        }
    }, [onKeyboardClick]);
};
exports.useKeyDownHandler = useKeyDownHandler;
