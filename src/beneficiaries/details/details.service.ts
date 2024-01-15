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
  async getDetailBeneficiaries(
    cookies: any,
    beneId: string,
    currencies: any,
    countries: any,
  ): Promise<any> {
    try {
      const url = `${this.apiUrl}/beneficiaries/view/${beneId}`;
      const cookieString = cookies.join('; ');
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieString,
        },
      });
      let beneficiaryData = response.data.data.bene;
      //currency bank
      currencies.forEach((element) => {
        if (element.id === beneficiaryData.currencyId) {
          beneficiaryData.currencyCode = element.code;
        }
      });
      //countries bene
      countries.forEach((element) => {
        if (element.id === beneficiaryData.countryId) {
          beneficiaryData.countryId = element.nameFormat;
          beneficiaryData.countryName = element.name;
        }
      });
      //country bank
      countries.forEach((element) => {
        if (element.id === beneficiaryData.mainBank.countryId) {
          beneficiaryData.mainBank.countryId = element.nameFormat;
          beneficiaryData.mainBank.countryName = element.name;
        }
      });

      let beneficiary = {
        id: beneficiaryData.id,
        name: beneficiaryData.name,
        nickname: beneficiaryData.nickname,
        countryId: beneficiaryData.countryId,
        countryName: beneficiaryData.countryName,
        address_line: beneficiaryData.address1 || beneficiaryData.address2,
        city: beneficiaryData.city,
        state_province: beneficiaryData.province,
        postal_code: beneficiaryData.postal,
        email_address: beneficiaryData.email,
        purpose_payment: beneficiaryData.purposeName,
        purpose_payment_description: beneficiaryData.purposeDescription,
      };

      let bank = {
        countryId: beneficiaryData.mainBank.countryId,
        countryName: beneficiaryData.mainBank.countryName,
        currency: beneficiaryData.currencyCode,
        name: beneficiaryData.mainBank.name,
        address_line:
          beneficiaryData.mainBank.address1 ||
          beneficiaryData.mainBank.address2,
        aba_number: beneficiaryData.mainBank.fullBankCode,
        account_number: beneficiaryData.mainBank.accountNumber,
        sending_bank_instructions: beneficiaryData.mainBank.fullBankCode,
      };

      return { bank, beneficiary };
    } catch (error) {}
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
}
