"use strict";
(self["webpackChunkmd_html_preview"] = self["webpackChunkmd_html_preview"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__);


const PLUGIN_ID = 'jupyterlab-md-preview';
const plugin = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__.IFileBrowserFactory],
    activate(app, palette, browserFactory) {
        const { commands } = app;
        const cmd = 'markdown:render-html';
        commands.addCommand(cmd, {
            label: 'Render Markdown to HTML',
            execute: async () => {
                const widget = browserFactory.tracker.currentWidget;
                if (!widget) {
                    return;
                }
                const context = widget.context;
                const path = context.path;
                await app.serviceManager.serverSettings.fetch('/md-preview', {
                    method: 'POST',
                    body: JSON.stringify({ path })
                });
            }
        });
        // Кнопка в toolbar файлового браузера
        const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            iconClass: 'jp-MaterialIcon jp-MarkdownIcon',
            onClick: () => { commands.execute(cmd); },
            tooltip: 'Render Markdown to HTML'
        });
        browserFactory.defaultBrowser.toolbar.addItem('md-render', button);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.069daf5920710f247415.js.map