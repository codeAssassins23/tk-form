import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
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

  async getHoldingSearchCurrency(cookie: any, search: string): Promise<any> {
    const date = await this.getDates();
    const dateTo = date.dateTo;
    const dateFrom = date.dateFrom;

    let percentage = 0;

    const rows = [];
    let result = [];
    try {
      for (let i = 0; i <= 10; i++) {
        if (rows.length === 0) {
          const requestBody = {
            sort: 'id',
            dir: 'desc',
            page: i,
            limit: 4,
            entityId: 0,
            entityName: '',
            currencyId: 0,
            dateRange: {
              dateRange: 'custom',
              customFrom: dateFrom,
              customTo: dateTo,
            },
          };
          const url = `${this.apiUrl}/reports/holdingAccounts/getList`;
          const cookieString = cookie.join('; ');
          const response = await axios({
            method: 'post',
            url: url,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookieString,
            },
            data: requestBody,
          });
          result = response.data.data.rows;

          result.forEach((element) => {
            element.balance = parseInt(element.balance);
            if (element.currencyCode === search) {
              delete element.number;
              delete element.entityId;
              delete element.entityName;

              const history = element.history;

              //Filter history
              if (history.length > 0) {
                const fechasEnMilisegundos = history.map(
                  (fecha) => parseInt(fecha.entryDate) * 1000,
                );
                const fechaMasAntigua = new Date(
                  Math.min(...fechasEnMilisegundos),
                );
                const fechaMasReciente = new Date(
                  Math.max(...fechasEnMilisegundos),
                );
                const entradaMasAntigua = history.find(
                  (fecha) =>
                    parseInt(fecha.entryDate) * 1000 ===
                    fechaMasAntigua.getTime(),
                );
                const entradaMasReciente = history.find(
                  (fecha) =>
                    parseInt(fecha.entryDate) * 1000 ===
                    fechaMasReciente.getTime(),
                );
                percentage =
                  ((entradaMasReciente.balanceAfter -
                    entradaMasAntigua.balanceBefore) /
                    entradaMasAntigua.balanceBefore) *
                  100;
                element.history = percentage;
              }
              if (history.length === 1) {
                let balanceBefore = history[0].balanceBefore;
                let balanceAfter = history[0].balanceAfter;
                percentage =
                  ((balanceAfter - balanceBefore) / balanceBefore) * 100;
                element.history = percentage;
              }
              if (history.length === 0) {
                percentage = 0;
                element.history = percentage;
              }
              //Agregar color
              if (element.history > 0) {
                element.color = 'success';
                element.symbol = '+';
                element.icon = 'ki-outline ki-up';
              }
              if (element.history < 0) {
                element.color = 'danger';
                element.symbol = '';
                element.icon = 'ki-outline ki-down';
              }
              if (element.history === 0) {
                element.color = 'secondary';
                element.symbol = '';
                element.icon = '';
              }
              //Format
              element.history = percentage.toFixed(3);

              rows.push(element);

              rows[0].balance = element.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            }
          });
        }
      }
      return { rows };
    } catch (error) {
      console.log(error, 'error en getHoldingSearchCurrency');
    }
  }

  async getHoldingFlags(cookie: any): Promise<Object> {
    const date = await this.getDates();
    const dateTo = date.dateTo;
    const dateFrom = date.dateFrom;

    let balanceUSD = {
      name: '',
      balance: 0,
    };
    let balanceMXN = {
      name: '',
      balance: 0,
    };
    let balanceCAD = {
      name: '',
      balance: 0,
    };
    let rows = [];
    try {
      for (let i = 0; i <= 10; i++) {
        if (
          balanceUSD.name === '' ||
          balanceMXN.name === '' ||
          balanceCAD.name === ''
        ) {
          const requestBody = {
            sort: 'id',
            dir: 'desc',
            page: i,
            limit: 4,
            entityId: 0,
            entityName: '',
            currencyId: 0,
            dateRange: {
              dateRange: 'custom',
              customFrom: dateFrom,
              customTo: dateTo,
            },
          };
          const url = `${this.apiUrl}/reports/holdingAccounts/getList`;
          const cookieString = cookie.join('; ');
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
            element.balance = parseInt(element.balance);
            if (element.currencyCode === 'USD') {
              balanceUSD.name = 'US Dollar, ' + element.currencyCode;
              balanceUSD.balance = element.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            }
            if (element.currencyCode === 'MXN') {
              balanceMXN.name = 'Mexican Peso, ' + element.currencyCode;
              balanceMXN.balance = element.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            }
            if (element.currencyCode === 'CAD') {
              balanceCAD.name = 'Canadian Dolar, ' + element.currencyCode;
              balanceCAD.balance = element.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            }
          });
        }
      }
      return { balanceUSD, balanceMXN, balanceCAD };
    } catch (error) {
      console.log(error, 'error en getHoldingFlags');
    }
  }

  async getHoldingAccounts(cookie: any, pages: number): Promise<any> {
    const date = await this.getDates();
    const dateTo = date.dateTo;
    const dateFrom = date.dateFrom;

    const requestBody = {
      sort: 'id',
      dir: 'desc',
      page: pages,
      limit: 4,
      entityId: 0,
      entityName: '',
      currencyId: 0,
      dateRange: {
        dateRange: 'custom',
        customFrom: dateFrom,
        customTo: dateTo,
      },
    };
    const url = `${this.apiUrl}/reports/holdingAccounts/getList`;
    const cookieString = cookie.join('; ');

    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
        data: requestBody,
      });
      const data = response.data.data.rows;
      var percentage = 0;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].id = i + 1;
          delete data[i].number;
          delete data[i].entityId;
          delete data[i].entityName;
          data[i].balance = parseInt(data[i].balance).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          const history = data[i].history;

          //Filter history
          if (history.length > 0) {
            const fechasEnMilisegundos = history.map(
              (fecha) => parseInt(fecha.entryDate) * 1000,
            );
            const fechaMasAntigua = new Date(Math.min(...fechasEnMilisegundos));
            const fechaMasReciente = new Date(
              Math.max(...fechasEnMilisegundos),
            );
            const entradaMasAntigua = history.find(
              (fecha) =>
                parseInt(fecha.entryDate) * 1000 === fechaMasAntigua.getTime(),
            );
            const entradaMasReciente = history.find(
              (fecha) =>
                parseInt(fecha.entryDate) * 1000 === fechaMasReciente.getTime(),
            );
            percentage =
              ((entradaMasReciente.balanceAfter -
                entradaMasAntigua.balanceBefore) /
                entradaMasAntigua.balanceBefore) *
              100;
            data[i].history = percentage;
          }
          if (history.length === 1) {
            let balanceBefore = history[0].balanceBefore;
            let balanceAfter = history[0].balanceAfter;
            percentage = ((balanceAfter - balanceBefore) / balanceBefore) * 100;
            data[i].history = percentage;
          }
          if (history.length === 0) {
            percentage = 0;
            data[i].history = percentage;
          }
          //Agregar color
          if (data[i].history > 0) {
            data[i].color = 'success';
            data[i].symbol = '+';
            data[i].icon = 'ki-outline ki-up';
          }
          if (data[i].history < 0) {
            data[i].color = 'danger';
            data[i].symbol = '';
            data[i].icon = 'ki-outline ki-down';
          }
          if (data[i].history === 0) {
            data[i].color = 'secondary';
            data[i].symbol = '';
            data[i].icon = '';
          }
          //Format
          data[i].history = percentage.toFixed(3);
        }
        return { data };
      } else {
        return data;
      }
    } catch (error) {
      console.log(error, 'error en getHoldingAccounts');
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
