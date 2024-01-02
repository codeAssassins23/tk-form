import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class DetailService {
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

  async getSearchHolddingAccount(
    cookies: any,
    search: string,
    currencyDeal: string,
  ): Promise<any> {
    try {
      let rows = [];
      let fund = 0;
      const requestBody = {
        sort: 'dealNumber',
        dir: 'desc',
        page: 0,
        limit: 10000,
        currencyId: currencyDeal,
        search: search,
        transactionType: '',
      };
      const url = `${this.apiUrl}/reports/holding/getList`;
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
        element.balance = parseInt(element.balance).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        element.entryDate = new Date(
          element.entryDate * 1000,
        ).toLocaleDateString();
        element.valueDate = new Date(
          element.valueDate * 1000,
        ).toLocaleDateString();

        if (element.deposit === '0.00') {
          element.color = 'danger';
          element.symbol = '-';
          element.icon = 'ki-outline ki-down';
          element.flag = element.currencyCode;
          fund = parseInt(element.withdrawal);
          element.fund = fund.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        } else if (element.withdrawal === '0.00') {
          element.color = 'success';
          element.symbol = '+';
          element.icon = 'ki-outline ki-up';
          element.flag = element.currencyCode;
          fund = parseInt(element.deposit);
          element.fund = fund.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        delete element.deposit;
        delete element.withdrawal;
        delete element.settlementPostId;
        delete element.description;
        delete element.exchangeRate;
        delete element.isPaid;
        delete element.entityName;
      });
      return { rows };
    } catch (error) {
      console.log(error, 'error en details');
    }
  }

  async getFlagCurrency(currencyId: string, cookies: any): Promise<any> {
    const date = await this.getDates();
    const dateTo = date.dateTo;
    const dateFrom = date.dateFrom;
    let rows = [];
    let balanceCurrency = '';
    let currencyCode = '';

    try {
      const requestBody = {
        sort: 'id',
        dir: 'desc',
        limit: 10,
        entityId: 0,
        entityName: '',
        currencyId: currencyId,
        dateRange: {
          dateRange: 'custom',
          customFrom: dateFrom,
          customTo: dateTo,
        },
      };
      const url = `${this.apiUrl}/reports/holdingAccounts/getList`;
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
        currencyCode = element.currencyCode;
        balanceCurrency = parseInt(element.balance).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      });
      return { balanceCurrency, currencyCode };
    } catch (error) {
      console.log(error, 'error en details');
    }
  }

  async getDetailHoldingAccount(
    dateFrom: string,
    dateTo: string,
    currencyCode: string,
    page: number,
    cookies: any,
  ) {
    if (dateFrom === '' && dateTo === 'false') {
      const date = await this.getDates();
      dateTo = date.dateTo;
      dateFrom = date.dateFrom;
    }

    try {
      let rows = [];
      let fund = 0;
      const requestBody = {
        sort: 'dealNumber',
        dir: 'desc',
        page: page,
        limit: 4,
        currencyId: currencyCode,
        search: '',
        transactionType: '',
        dateRange: {
          dateRange: 'custom',
          customFrom: dateFrom,
          customTo: dateTo,
        },
      };
      const url = `${this.apiUrl}/reports/holding/getList`;
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
        element.balance = parseInt(element.balance).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        element.entryDate = new Date(
          element.entryDate * 1000,
        ).toLocaleDateString();
        element.valueDate = new Date(
          element.valueDate * 1000,
        ).toLocaleDateString();
        if (element.deposit === '0.00') {
          element.color = 'danger';
          element.symbol = '-';
          element.icon = 'ki-outline ki-down';
          element.flag = element.currencyCode;
          fund = parseInt(element.withdrawal);
          element.fund = fund.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        } else if (element.withdrawal === '0.00') {
          element.color = 'success';
          element.symbol = '+';
          element.icon = 'ki-outline ki-up';
          element.flag = element.currencyCode;
          fund = parseInt(element.deposit);
          element.fund = fund.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        delete element.deposit;
        delete element.withdrawal;
        delete element.settlementPostId;
        delete element.description;
        delete element.exchangeRate;
        delete element.isPaid;
        delete element.entityName;
      });
      return { rows };
    } catch (error) {
      console.log(error, 'error en details');
    }
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
