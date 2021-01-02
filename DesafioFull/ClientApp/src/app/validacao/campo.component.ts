
export class ValidacaoCampoComponent {

  constructor() { }

  public habilitar_campo(tecla) {
    tecla.target.readOnly = false;
  }

}
