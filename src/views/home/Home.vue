<template>
  <div>

    <b-row>
<!--      <b-col cols="12" md="6" xl="6" class="d-flex align-items-stretch mb-8">-->
<!--        <CarouselAnimation />-->
<!--      </b-col>-->
      <b-col cols="12" class="d-flex align-items-stretch">
        <BaseCard title="Factures" subtitle="Menu">
          <template v-slot:comcode>
            <div>
              <div class="d-flex flex-row">
                <div>
                  <img
                      src="@/assets/images/logo.png"
                      alt="logo"
                      class="rounded-circle mt-4"
                      width="150"
                      height="100"
                  />
                </div>
                <div class="pl-2 mt-4 mr-2">
                  <h1 class="mb-2 float-right">برنامج تسيير الفواتير</h1>
                  <br>
                  <h6 class="mb-3 float-right">مؤسسة بربوشي مكي عبد المجيد</h6>
                </div>
              </div>
              <hr class="custom-hr" />
              <b-row>
                <b-col cols="12" md="4" lg="3">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/users/people.png" class="img-fluid rounded-circle" width="65"/>
                    <h5 class="card-title mt-2 mb-1 pb-1">معلومات المؤسسة</h5>

                    <b-button block href="/jam3iya/persons" pill variant="danger" class="mt-1 d-flex align-items-center justify-content-center">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
                <b-col cols="12" md="4" lg="3">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/users/money-management.png" class="img-fluid rounded-circle" width="65" />
                    <h5 class="card-title mt-2 mb-1 pb-1">تسيير الزبائن</h5>

                    <b-button block href="/jam3iya/expenses" pill variant="primary" class="mt-1 d-flex align-items-center justify-content-center">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
                <b-col cols="12" md="4" lg="3">
                  <b-card class="mb-1 text-center">
                    <img src="@/assets/images/users/collateral.png" class="img-fluid rounded-circle" width="65" />
                    <h5 class="card-title mt-2 mb-1 pb-1">إنشاء فاتورة جديدة</h5>

                    <b-button block href="/jam3iya/expenses_dar_jma3a" pill variant="warning" class="mt-1 d-flex align-items-center justify-content-center text-white">
                      اضهار
                    </b-button>
                  </b-card>
                </b-col>
                <b-col cols="12" md="4" lg="3">
                  <b-card class="mb-1 text-center">
                    <img
                        src="@/assets/images/users/payment.png"
                        class="img-fluid rounded-circle"
                        width="65"/>
                    <h5 class="card-title mt-2 mb-1 pb-1">حول البرنامج</h5>

                    <b-button
                        block
                        href="/jam3iya/member_subscriptions"
                        pill
                        variant="success"
                        class="mt-1 d-flex align-items-center justify-content-center">
                      اضهار</b-button>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>


  </div>
</template>

<script>
import BaseCard from '../../components/card/BaseCard';
export default {
  name: "Home",
  components:{
    //CarouselAnimation: () => import("@/components/ui/carousel/CarouselAnimation"),
    BaseCard
  },
  data: () => ({

  }),
}
</script>

<style scoped>

</style>