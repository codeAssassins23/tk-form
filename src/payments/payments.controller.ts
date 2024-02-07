import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payments.service';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';

@Controller('/admin')
@UseGuards(RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles('ADMIN')
  @Get('/payments')
  @Render('send_payment/send_payment')
  async getPayments(@Req() request: Request) {
    try {
      const cookies = await this.paymentService.loginAPI();
      const buyPriceUSD = await this.paymentService.getBuyPrice(cookies, 90, 1);
      const sellPriceUSD = await this.paymentService.getSellPrice(
        cookies,
        1,
        90,
      );
      const beneficiaries = await this.paymentService.getBeneficiaries(cookies);
      const user = request['user'];
      const countries = await this.paymentService.getCountries(cookies);
      const currencies = await this.paymentService.getCurrency(cookies);
      const purpose = await this.paymentService.getPurpose(cookies);
      return {
        user: user,
        buyFormat: buyPriceUSD.rate,
        buy: buyPriceUSD.rows,
        sellFormat: sellPriceUSD.rate,
        sell: sellPriceUSD.rows,
        beneficiaries,
        bene: JSON.stringify(beneficiaries),
        countries: countries,
        currencies: currencies,
        purpose: purpose,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post('/paymentsCurrency')
  async getPaymentsCurrency(@Body() body: any) {
    try {
      const { currencyRecibe } = body;
      const cookies = await this.paymentService.loginAPI();
      const buyPriceUSD = await this.paymentService.getBuyPrice(
        cookies,
        currencyRecibe,
        1,
      );
      const sellPriceUSD = await this.paymentService.getSellPrice(
        cookies,
        1,
        currencyRecibe,
      );
      return {
        buyFormat: buyPriceUSD.rate,
        buy: buyPriceUSD.rows,
        sellFormat: sellPriceUSD.rate,
        sell: sellPriceUSD.rows,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post('searchBeneficiaries')
  async searchBeneficiaries(@Body() body: any) {
    try {
      const { search } = body;
      const cookies = await this.paymentService.loginAPI();
      const beneficiaries = await this.paymentService.searchGetBeneficiaries(
        cookies,
        search,
      );

      return beneficiaries;
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post('getHolding')
  async getHolding(@Body() body: any) {
    try {
      const { currencySend } = body;
      const cookies = await this.paymentService.loginAPI();
      const holding = await this.paymentService.getHolding(
        cookies,
        currencySend,
      );
      return holding;
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post('generateWid')
  async generateWid(@Body() body: any) {
    try {
      const { dataCalculator } = body;
      const cookies = await this.paymentService.loginAPI();
      const wid = await this.paymentService.generateWid(
        cookies,
        parseFloat(dataCalculator.currencySendValue),
        parseFloat(dataCalculator.currencyRecibeValue),
        dataCalculator.sendInput,
      );
      return wid;
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post('sendPayment')
  async sendPayment(@Body() body: any) {
    try {
      const { dataPayment } = body;
      const cookies = await this.paymentService.loginAPI();
      const response = await this.paymentService.sendPayment(
        cookies,
        dataPayment,
      );
      if (response.err !== undefined) {
        if (response.err.errs.bene !== undefined) {
          return response.err.errs.bene.id;
        }
        if (response.err.errs.amount !== undefined) {
          return response.err.errs.amount.id;
        }
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
