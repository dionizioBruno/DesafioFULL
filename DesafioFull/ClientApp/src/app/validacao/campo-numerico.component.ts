import { ValidacaoCampoComponent } from './campo.component';

export class ValidacaoCampoNumericoComponent extends ValidacaoCampoComponent {

  constructor() {
    super();
  }

  public formatar_decimal(campo: string, separador_milhar: string, separador_decimal: string, tecla, qtd_decimal: number): string {
    let key = '';
    let strCheck = '0123456789';
    let whichCode = 0;

    if (window.event)
      whichCode = tecla.keyCode;
    else
      whichCode = tecla.which;

    if (whichCode == 13) return campo;
    if (whichCode == 8) return campo;
    if (whichCode == 9) return campo;
    if (whichCode == 46) return campo;

    if ((whichCode >= 96) && (whichCode <= 105))
      whichCode = whichCode - 48;

    key = String.fromCharCode(whichCode);

    if (strCheck.indexOf(key) == -1) {
      tecla.target.readOnly = true;
      return campo;
    }

    campo = this.adicionar_separadores(campo, separador_milhar, separador_decimal, key, qtd_decimal, 1);

    return campo;
  }

  public formatar_decimal_pos_backspace_delete(campo: string, separador_milhar: string, separador_decimal: string, tecla, qtd_decimal: number) {
    let whichCode = 0;

    if (window.event)
      whichCode = tecla.keyCode;
    else
      whichCode = tecla.which;

    if (!(whichCode == 8 || whichCode == 46)) {
      super.habilitar_campo(tecla);
      return campo;
    }

    campo = this.adicionar_separadores(campo, separador_milhar, separador_decimal, '', qtd_decimal, 0);

    super.habilitar_campo(tecla);
    return campo;
  }

  private adicionar_separadores(campo: string, separador_milhar: string, separador_decimal: string, key: string, qtd_decimal: number, onKeydown: number): string {
    let i = 0;
    let j = 0;
    let len = 0;
    let len2 = 0;
    let cont = 0;
    let aux = '';
    let aux2 = '';
    let zero = '';
    let strCheck = '0123456789';

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

      campo += separador_decimal + aux.substr(len - qtd_decimal, (qtd_decimal - onKeydown));
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

        campo = '0' + separador_decimal + zero + aux.substr(0, len - onKeydown);
      }
    }

    return campo;
  }

  public formatar_inteiro(campo: string, tecla): string {
    let key = '';
    let strCheck = '0123456789';
    let whichCode = 0

    if (window.event)
      whichCode = tecla.keyCode;
    else
      whichCode = tecla.which;

    if (whichCode == 13) return campo;
    if (whichCode == 8) return campo;
    if (whichCode == 9) return campo;
    if (whichCode == 46) return campo;

    if ((whichCode >= 96) && (whichCode <= 105))
      whichCode = whichCode - 48;

    key = String.fromCharCode(whichCode);

    if (strCheck.indexOf(key) == -1)
      tecla.target.readOnly = true;

    return campo;
  }

}
