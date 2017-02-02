/**
 * 
 * @author jskonst
 */
define('SvgPreview', ['forms', 'ui'], function (Forms, Ui, ModuleName) {
    function module_constructor(svgString) {
        var self = this

                , form = Forms.loadForm(ModuleName);
        var svStr = svgString;
        function onLoad() {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('width', form.panel.element.offsetWidth);
            svg.setAttribute('height', form.panel.element.offsetHeight);
            svg.setAttribute('viewBox', "0 0 " + 185 + " " + 185);
            svg.setAttribute('preserveAspectRatio', "xMinYMin meet");
            form.panel.element.appendChild(svg);
            svg.innerHTML = svStr;
            svg.viewBox.baseVal.width = svg.getBBox().width;
            svg.viewBox.baseVal.height = svg.getBBox().height;
        }

        self.show = function () {

            form.show();
            onLoad();
        };

        self.showModal = function (callback) {
            form.showModal(callback);
            onLoad();
        };
        form.btnClose.onActionPerformed = function () {
            form.close("closing");
        };

    }
    return module_constructor;
});
