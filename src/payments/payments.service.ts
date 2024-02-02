import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class PaymentService {
  private apiUrl = process.env.URL_LOGIN_API;

  async loginAPI(): Promise<any> {
    const url = `${this.apiUrl}/login/submitApiClientKeys`;
    const publicKey = process.env.PUBLIC_KEY_API;
    const secretKey = process.env.SECRET_KEY_API;
    const requestBody = {
      publicKey,
      secretKey,
      _getPage: true,
    };

    try {
      const response = await axios.post(url, requestBody);
      const requestCookie = response.headers['set-cookie'];
      return requestCookie;
    } catch (error) {
      console.error('Error en la solicitud a la API:', error.message);
    }
  }

  async getCurrency(cookies: any): Promise<any> {
    try {
      let rows = [];
      let allCurrency = [];
      const url = `${this.apiUrl}/reference/currencies/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.rows;
      rows.forEach((element) => {
        let rowsFilter = {
          id: element.id,
          code: element.code,
        };
        allCurrency.push(rowsFilter);
      });
      return allCurrency;
    } catch (error) {}
  }

  async getPurpose(cookies: any): Promise<any> {
    try {
      let rows = [];
      const url = `${this.apiUrl}/beneficiaries`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.page.purposes;
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(cookies: any): Promise<any> {
    try {
      let rows = [];
      let all = [];
      const url = `${this.apiUrl}/reference/countries/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });
      rows = response.data.data.rows;
      rows.forEach((element) => {
        let rowsFilter = {
          id: element.id,
          name: element.name,
          nameFormat: element.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-'),
        };
        // Verifica si nameFormat coincide con alguna de las condiciones
        if (
          rowsFilter.nameFormat === 'bouvet-island' ||
          rowsFilter.nameFormat === 'svalbard-and-jan-mayen'
        ) {
          rowsFilter.nameFormat = 'default-image';
        }
        all.push(rowsFilter);
      });
      return all;
    } catch (error) {
      console.log(error);
    }
  }

  async getBuyPrice(
    cookies: any,
    buyCurrencyId: number,
    sellCurrencyId: number,
  ): Promise<any> {
    try {
      const url = `${this.apiUrl}/orders/getPairInfo`;
      const cookieString = cookies.join('; ');
      const requestBody = {
        buyCurrencyId: buyCurrencyId,
        sellCurrencyId: sellCurrencyId,
        amount: 1,
      };

      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      let rows = parseFloat(response.data.data.rate);
      let rate = rows.toFixed(4);
      return { rate, rows };
    } catch (error) {
      console.log(error);
    }
  }

  async getSellPrice(
    cookie: any,
    buyCurrencyId: number,
    sellCurrencyId: number,
  ): Promise<any> {
    try {
      const url = `${this.apiUrl}/orders/getPairInfo`;
      const cookieString = cookie.join('; ');
      const requestBody = {
        buyCurrencyId: buyCurrencyId,
        sellCurrencyId: sellCurrencyId,
        amount: 1,
      };
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      let rows = parseFloat(response.data.data.rate);
      let rate = rows.toFixed(4);
      return { rate, rows };
    } catch (error) {
      console.log(error);
    }
  }

  async getBeneficiaries(cookies: any): Promise<any> {
    try {
      const url = `${this.apiUrl}/beneficiaries/getList`;
      const cookieString = cookies.join('; ');
      const requestBody = {
        sort: 'id',
        dir: 'desc',
        page: 0,
        limit: 10,
      };

      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'aplication/json',
          cookie: cookieString,
        },
        data: requestBody,
      });
      let rows = response.data.data.rows;
      rows.forEach((element) => {
        element.twoWords = this.obtenerPrimerasDosSilabas(element.name);
        element.accountNumber = '****' + element.accountNumber.slice(-4);
        element.bankNameFormat = element.bankName.slice(0, 30) + '...';
      });
      return rows;
    } catch (error) {}
  }

  async searchGetBeneficiaries(cookies: any, search: string) {
    let rows = [];

    try {
      const requestBody = {
        sort: 'id',
        dir: 'desc',
        page: 0,
        search: search,
        limit: 10,
        entityId: 14539,
      };

      const url = `${this.apiUrl}/beneficiaries/getList`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });

      rows = response.data.data.rows;
      rows.forEach((element) => {
        element.twoWords = this.obtenerPrimerasDosSilabas(element.name);
        element.accountNumber = '****' + element.accountNumber.slice(-4);
        element.bankNameFormat = element.bankName.slice(0, 30) + '...';
      });
      return { rows };
    } catch (error) {
      console.log(error);
    }
  }

  async getHolding(cookies: any, currencyId: number): Promise<any> {
    try {
      const url = `${this.apiUrl}/reports/holdingAccounts/getList`;
      const cookieString = cookies.join('; ');
      const date = await this.getDates();
      const requestBody = {
        sort: 'id',
        dir: 'desc',
        page: 0,
        limit: 10,
        currencyId: currencyId,
        dateRange: {
          dateRange: 'custom',
          customFrom: date.dateFrom,
          customTo: date.dateTo,
        },
      };

      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      let rows = response.data.data.rows;
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async generateWid(
    cookies: any,
    currencySend: number,
    currencyRecibe: number,
    amount: number,
  ): Promise<any> {
    try {
      const url = `${this.apiUrl}/payments/startQuick`;
      const cookieString = cookies.join('; ');
      const requestBody = {
        currencyIHaveId: currencySend,
        currencyToPayId: currencyRecibe,
        amount: amount,
        amountCurrencyId: currencySend,
        days: 1,
        placeInHolding: false,
      };
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      console.log(response.data.data);
      return response.data.data.wid;
    } catch (error) {
      console.log(error);
    }
  }

  async sendPayment(cookies: any, dataPayment: any): Promise<any> {
    try {
      const date = await this.getDates();
      const url = `${this.apiUrl}/payments/addPayment`;
      const cookieString = cookies.join('; ');
      dataPayment.data.sendInput = parseFloat(
        dataPayment.data.sendInput.replace(/,/g, ''),
      );
      const requestBody = {
        currencyToPayId: parseFloat(dataPayment.data.currencyRecibeValue),
        currencyIHaveId: parseFloat(dataPayment.data.currencySendValue),
        amount: {
          amount: dataPayment.data.sendInput,
          currencyId: parseFloat(dataPayment.data.currencySendValue),
        },
        placeInHolding: false,
        bene: {
          id: parseFloat(dataPayment.bene.id),
        },
        valueDate: date.dateTo,
        valueDateOffset: 2,
        reference: '',
        instructions: '',
        beneEmailChecked: 1,
        wid: dataPayment.wid,
      };
      console.log(requestBody);
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      console.log(response.data.data, 'response payment');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  obtenerPrimerasDosSilabas(palabra) {
    const palabras = palabra.split(' ');
    // Si hay al menos una palabra
    if (palabras.length >= 2) {
      let primeraLetraPrimeraPalabra = palabras[0][0];
      let primeraLetraSegundaPalabra = palabras[1][0];

      // Unir las dos letras y convertirlas a mayúsculas
      const iniciales = (
        primeraLetraPrimeraPalabra + primeraLetraSegundaPalabra
      ).toUpperCase();

      return iniciales;
    } else if (palabras.length < 2 && palabras.length > 0) {
      let primeraLetraPrimeraPalabra = palabras[0][0];
      let primeraLetraSegundaPalabra = palabras[0][1];
      if (primeraLetraSegundaPalabra === undefined) {
        primeraLetraSegundaPalabra = ' ';
      }
      // Unir las dos letras y convertirlas a mayúsculas
      const iniciales = (
        primeraLetraPrimeraPalabra + primeraLetraSegundaPalabra
      ).toUpperCase();

      return iniciales;
    }

    return null;
  }

  async getDates(): Promise<any> {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const dateTo = date.toISOString();
    date.setDate(date.getDate() - 30);
    const dateFrom = date.toISOString();
    return { dateFrom, dateTo };
  }
}
