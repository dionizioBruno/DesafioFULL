"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacaoCampoNumericoComponent = void 0;
var campo_component_1 = require("./campo.component");
var ValidacaoCampoNumericoComponent = /** @class */ (function (_super) {
    __extends(ValidacaoCampoNumericoComponent, _super);
    function ValidacaoCampoNumericoComponent() {
        return _super.call(this) || this;
    }
    ValidacaoCampoNumericoComponent.prototype.formatar_decimal = function (campo, separador_milhar, separador_decimal, tecla, qtd_decimal) {
        var i = 0;
        var j = 0;
        var len = 0;
        var len2 = 0;
        var cont = 0;
        var aux = '';
        var aux2 = '';
        var key = '';
        var zero = '';
        var strCheck = '0123456789';
        var whichCode = 0;
        if (window.event)
            whichCode = tecla.keyCode;
        else
            whichCode = tecla.which;
        if (whichCode == 13)
            return campo;
        if (whichCode == 8)
            return campo;
        if (whichCode == 9)
            return campo;
        if (whichCode == 46)
            return campo;
        if ((whichCode >= 96) && (whichCode <= 105))
            whichCode = whichCode - 48;
        key = String.fromCharCode(whichCode);
        if (strCheck.indexOf(key) == -1) {
            tecla.target.readOnly = true;
            return campo;
        }
        if (campo == null)
            campo = '';
        len = campo.length;
        for (i = 0; i < len; i++)
            if ((campo.charAt(i) != '0') && (campo.charAt(i) != separador_decimal))
                break;
        aux = '';
        for (; i < len; i++)
            if (strCheck.indexOf(campo.charAt(i)) != -1)
                aux += campo.charAt(i);
        aux += key;
        len = aux.length;
        if (len > qtd_decimal) {
            aux2 = '';
            for (j = 0, i = len - (qtd_decimal + 1); i >= 0; i--) {
                if (j == 3) {
                    aux2 += separador_milhar;
                    j = 0;
                }
                aux2 += aux.charAt(i);
                j++;
            }
            campo = '';
            len2 = aux2.length;
            for (i = len2 - 1; i >= 0; i--)
                campo += aux2.charAt(i);
            campo += separador_decimal + aux.substr(len - qtd_decimal, (qtd_decimal - 1));
        }
        else {
            if (len == 0) {
                campo = '';
            }
            else {
                zero = '';
                for (cont = 1; cont <= (qtd_decimal - len); cont++) {
                    zero += '0';
                }
                campo = '0' + separador_decimal + zero + aux.substr(0, len - 1);
            }
        }
        return campo;
    };
    ValidacaoCampoNumericoComponent.prototype.formatar_inteiro = function (campo, tecla) {
        var key = '';
        var strCheck = '0123456789';
        var whichCode = 0;
        if (window.event)
            whichCode = tecla.keyCode;
        else
            whichCode = tecla.which;
        if (whichCode == 13)
            return campo;
        if (whichCode == 8)
            return campo;
        if (whichCode == 9)
            return campo;
        if (whichCode == 46)
            return campo;
        if ((whichCode >= 96) && (whichCode <= 105))
            whichCode = whichCode - 48;
        key = String.fromCharCode(whichCode);
        if (strCheck.indexOf(key) == -1)
            tecla.target.readOnly = true;
        return campo;
    };
    return ValidacaoCampoNumericoComponent;
}(campo_component_1.ValidacaoCampoComponent));
exports.ValidacaoCampoNumericoComponent = ValidacaoCampoNumericoComponent;
//# sourceMappingURL=campo-numerico.component.js.map