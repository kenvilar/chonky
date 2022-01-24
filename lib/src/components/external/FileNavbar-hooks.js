"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFolderChainItems = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var index_1 = require("../../action-definitions/index");
var selectors_1 = require("../../redux/selectors");
var dispatchers_thunks_1 = require("../../redux/thunks/dispatchers.thunks");
var file_helper_1 = require("../../util/file-helper");
var useFolderChainItems = function () {
    var folderChain = (0, react_redux_1.useSelector)(selectors_1.selectFolderChain);
    var dispatch = (0, react_redux_1.useDispatch)();
    var folderChainItems = (0, react_1.useMemo)(function () {
        var items = [];
        if (!folderChain)
            return items;
        var _loop_1 = function (i) {
            var file = folderChain[i];
            items.push({
                file: file,
                disabled: !file,
                onClick: !file_helper_1.FileHelper.isOpenable(file) || i === folderChain.length - 1
                    ? undefined
                    : function () {
                        return dispatch((0, dispatchers_thunks_1.thunkRequestFileAction)(index_1.ChonkyActions.OpenFiles, {
                            targetFile: file,
                            files: [file],
                        }));
                    },
            });
        };
        for (var i = 0; i < folderChain.length; ++i) {
            _loop_1(i);
        }
        return items;
    }, [dispatch, folderChain]);
    return folderChainItems;
};
exports.useFolderChainItems = useFolderChainItems;
