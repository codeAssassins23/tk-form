import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';

@Controller('/admin')
@UseGuards(RolesGuard)
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Roles('ADMIN')
  @Get('/beneficiaries')
  @Render('beneficiaries/get_beneficiaries')
  async getBeneficiaries(@Req() request: Request) {
    const cookies = await this.beneficiariesService.loginAPI();
    const countries = await this.beneficiariesService.getCountries(cookies);
    const currencies = await this.beneficiariesService.getCurrency(cookies);
    const purpose = await this.beneficiariesService.getPurpose(cookies);
    const user = request['user'];
    return {
      purpose: purpose,
      user: user,
      countries: countries,
      currencies: currencies,
    };
  }

  @Roles('ADMIN')
  @Get('/getListBeneficiaries')
  async getAllBeneficiaries(@Query() queryParams: any) {
    const page = queryParams.start / 10;
    const search = queryParams.columns[0]?.search?.value;
    const searchCurrency = queryParams.columns[1]?.search?.value;

    const cookies = await this.beneficiariesService.loginAPI();
    if (search !== '' || searchCurrency !== '') {
      const searchBeneficiaries =
        await this.beneficiariesService.searchGetBeneficiaries(
          cookies,
          search,
          searchCurrency,
          page,
        );
      return {
        data: searchBeneficiaries.all,
        recordsTotal: searchBeneficiaries.total,
        recordsFiltered: searchBeneficiaries.total,
      };
    }
    const beneficiaries = await this.beneficiariesService.getBeneficiaries(
      cookies,
      page,
    );
    return {
      data: beneficiaries.all,
      recordsTotal: beneficiaries.total,
      recordsFiltered: beneficiaries.total,
    };
  }

  @Roles('ADMIN')
  @Post('/newBeneficiaries')
  async postBeneficiaries(@Body() body: any) {
    const { step1Data, step2Data } = body;

    const cookies = await this.beneficiariesService.loginAPI();
    const countries = await this.beneficiariesService.getCountries(cookies);
    const currencies = await this.beneficiariesService.getCurrency(cookies);
    const purpose = await this.beneficiariesService.getPurpose(cookies);
    const data = {
      step1Data,
      step2Data,
      countries,
      currencies,
      purpose,
    };
    const beneficiarieId = await this.beneficiariesService.postBeneficiaries(
      cookies,
      data,
    );
    if (beneficiarieId === 'error') {
      return 'error';
    }
    return 'success';
  }

  @Roles('ADMIN')
  @Post('/editBeneficiaries')
  async putBeneficiaries(@Body() body: any) {
    const { step1Data, step2Data, beneId } = body;
    const cookies = await this.beneficiariesService.loginAPI();
    const countries = await this.beneficiariesService.getCountries(cookies);
    const currencies = await this.beneficiariesService.getCurrency(cookies);
    const purpose = await this.beneficiariesService.getPurpose(cookies);
    const data = {
      step1Data,
      step2Data,
      countries,
      currencies,
      purpose,
    };
    const beneficiarie = await this.beneficiariesService.getViewEditBeneficiary(
      cookies,
      beneId,
      currencies,
      countries,
    );
    const beneficiarieId = await this.beneficiariesService.putBeneficiaries(
      cookies,
      data,
      beneficiarie.bene,
    );
    if (beneficiarieId === 'error') {
      return 'error';
    }
    return 'success';
  }

  @Roles('ADMIN')
  @Get('/beneficiaries/success')
  @Render('beneficiaries/message/successCreate')
  async createBeneficiarySuccess(@Req() request: Request) {
    const user = request['user'];
    return { user: user };
  }

  @Roles('ADMIN')
  @Post('/getBeneficiariesById')
  async getBeneficiariesById(@Body() body: { beneId: number }) {
    const beneId = body.beneId;
    const cookies = await this.beneficiariesService.loginAPI();
    const currencies = await this.beneficiariesService.getCurrency(cookies);
    const countries = await this.beneficiariesService.getCountries(cookies);
    const beneficiarie = await this.beneficiariesService.getViewBeneficiary(
      cookies,
      beneId,
      currencies,
      countries,
    );
    return beneficiarie;
  }

  @Roles('ADMIN')
  @Get('/beneficiaries/error')
  @Render('beneficiaries/message/errorCreate')
  async createBeneficiaryError(@Req() request: Request) {
    const user = request['user'];
    return { user: user };
  }
}
