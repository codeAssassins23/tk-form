import { Controller, Get, Param, Render, Req, UseGuards } from '@nestjs/common';
import { DetailService } from './details.service';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';
@Controller('/admin')
@UseGuards(RolesGuard)
export class DetailBeneficiaries {
  constructor(private readonly detailService: DetailService) {}

  @Roles('ADMIN')
  @Get('/getBeneficiaries/detail/:beneId')
  @Render('beneficiaries/detail_beneficiaries')
  async index(@Req() request: Request, @Param('beneId') beneId: string) {
    const cookies = await this.detailService.loginAPI();
    const countries = await this.detailService.getCountries(cookies);
    const currencies = await this.detailService.getCurrency(cookies);
    const detailBeneficiaries = await this.detailService.getDetailBeneficiaries(
      cookies,
      beneId,
      currencies,
      countries,
    );
    const user = request['user'];
    return {
      bank: detailBeneficiaries.bank,
      beneficiary: detailBeneficiaries.beneficiary,
      user: user,
    };
  }
}
