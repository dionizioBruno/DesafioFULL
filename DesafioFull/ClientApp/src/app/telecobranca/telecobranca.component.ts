import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ValidacaoCampoNumericoComponent } from '../validacao/campo-numerico.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-telecobranca-component',
  templateUrl: './telecobranca.component.html'
})

export class TelecobrancaComponent {
  public NumeroTitulo: string;
  public NomeDevedor: string;
  public CPFDevedor: string;
  public PercentualJuros: number;
  public PercentualMulta: number;
  public Parcelas: Parcela[];
  public Calculado: boolean;

  public Parcela_Numero: string;
  public Parcela_Valor: string;
  public Parcela_Vencimento: Date;
  public validacaoCampoNumerico: ValidacaoCampoNumericoComponent;

  public Msg_Calcular: string;
  public Msg_Inclusao_Parcelas: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;

    this.Parcelas = [];
    this.Calculado = false;
    this.Msg_Calcular = '';
    this.Msg_Inclusao_Parcelas = '';
    this.validacaoCampoNumerico = new ValidacaoCampoNumericoComponent();
  }

  public AdicionarParcela(numero: string, vencimento: Date, valor: string): boolean {
    if (numero == null || valor == null || vencimento == null) {
      this.Msg_Inclusao_Parcelas = '*Defina o número, valor e vencimento da parcela.';
      return false;
    }

    let num = parseInt(numero);
    let vlr = parseFloat(valor.replace(/\./g, '').replace(/,/g, '.'));

    if (isNaN(num) || num < 1) {
      this.Msg_Inclusao_Parcelas = '*Número inválido para parcela.';
      return false;
    }

    if (isNaN(vlr) || vlr <= 0) {
      this.Msg_Inclusao_Parcelas = '*Valor inválido para parcela.';
      return false;
    }

    if (vencimento.toString() == '') {
      this.Msg_Inclusao_Parcelas = '*Data inválida para parcela.';
      return false;
    }

    if (this.Parcelas.some(p => p.Numero == num)) {
      this.Msg_Inclusao_Parcelas = '*Parcela com número ' + numero + ' já existente.';
      return false;
    }

    vencimento = new Date(vencimento);
    vencimento.setMinutes(vencimento.getMinutes() + vencimento.getTimezoneOffset());

    this.Msg_Inclusao_Parcelas = '';
    this.Parcelas.push(new Parcela(num, new Date(vencimento), vlr));
    return true;
  }

  public RemoverParcela(numero: number) {
    this.Msg_Inclusao_Parcelas = '';
    let parcela = this.Parcelas.findIndex(p => p.Numero == numero);

    if (parcela > -1)
      this.Parcelas.splice(parcela, 1);
  }

  public Calcular(): boolean {
    if (this.CPFDevedor == null || this.CPFDevedor == ''
      || this.NomeDevedor == null || this.NomeDevedor == ''
      || this.NumeroTitulo == null || this.NumeroTitulo == ''
      || this.PercentualJuros == null || this.PercentualJuros.toString() == ''
      || this.PercentualMulta == null || this.PercentualMulta.toString() == ''
      || this.Parcelas.length == 0) {
      this.Msg_Calcular = '*Favor preencher todos os campos.';
      return false;
    }

    let percentualJuros = this.PercentualJuros;
    let percentualMulta = this.PercentualMulta;

    this.PercentualJuros = parseFloat(this.PercentualJuros.toString().replace(/\./g, '').replace(/,/g, '.'));
    this.PercentualMulta = parseFloat(this.PercentualMulta.toString().replace(/\./g, '').replace(/,/g, '.'));

    if (isNaN(this.PercentualJuros) || this.PercentualJuros <= 0) {
      this.PercentualJuros = percentualJuros;
      this.Msg_Calcular = '*Valor inválido para o percentual de Juros.';
      return false;
    }

    if (isNaN(this.PercentualMulta) || this.PercentualMulta <= 0) {
      this.PercentualMulta = percentualMulta;
      this.Msg_Calcular = '*Valor inválido para o percentual de Multa.';
      return false;
    }

    if (this.CPFDevedor.length < 11) {
      this.Msg_Calcular = '*Favor preencher todos os números do CPF.';
      return false;
    }

    let request = JSON.stringify(this, ['PercentualJuros', 'PercentualMulta', 'Parcelas', 'Numero', 'Vencimento', 'Valor']);
    this.PercentualJuros = percentualJuros;
    this.PercentualMulta = percentualMulta;

    this.http.post<string>(this.baseUrl + 'Telecobranca/Calcular', JSON.stringify(request), httpOptions).subscribe(result => {
      this.Parcelas = JSON.parse(JSON.stringify(result));
    }, error => {
      console.error(error);
    });

    this.Msg_Calcular = '';
    this.Calculado = true;
    return true;
  }

  public TotalOriginal(): number {
    let total = 0;

    this.Parcelas.forEach(p => {
      total += p.Valor;
    });

    return total;
  }

  public TotalAtualizado(): number {
    let total = 0;

    this.Parcelas.forEach(p => {
      total += p.Valor + p.Juros + p.Multa;
    });

    return total;
  }

  public MaiorAtraso(): number {
    return Math.max(...this.Parcelas.map(p => p.Atraso), 0);
  }

  public Voltar() {
    this.Calculado = false;
  }
}

class Parcela {
  public Numero: number;
  public Vencimento: Date;
  public Valor: number;
  public Atraso: number;
  public Juros: number;
  public Multa: number;

  constructor(numero: number, vencimento: Date, valor: number) {
    this.Numero = numero;
    this.Vencimento = vencimento;
    this.Valor = valor;
  }
}
