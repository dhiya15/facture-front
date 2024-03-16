<template>
  <b-overlay :show="isLoading" rounded="sm">
  <div>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      shape="tab"
    >


      <tab-content title="المعلومات الشخصية" icon="mdi mdi-information-outline" :before-change="checkInfo" >
        <b-row>
          <b-col cols="12" md="4" class="d-flex align-items-stretch" v-for="item in items" :key="item.id">
            <b-card :title="item.full_name_ar" :sub-title="item.header_ar" style="border: #d7d8dc solid 1px; border-radius: 10px; cursor: pointer" @click="currentInfo = item.id" :style="currentInfo == item.id ? 'background-color: #d7d8dc' : 'background-color: transparent'">
              <b-card-text>
                <br> - رقم الهاتف: {{item.phone}}
                <br> - البريد الالكتروني: {{item.email}}
                <br> - العنوان: {{item.address_ar}}
              </b-card-text>
              <b-card-text><b>النوع: {{item.key}}</b></b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </tab-content>


      <tab-content title="معلومات الزبون" icon="mdi mdi-account" :before-change="checkPerson">
        <b-row>
          <b-col cols="12" md="4" class="d-flex align-items-stretch" v-for="item in items2" :key="item.id">
            <b-card :title="item.full_name_ar" style="border: #d7d8dc solid 1px; border-radius: 10px; cursor: pointer" @click="currentPerson = item.id" :style="currentPerson == item.id ? 'background-color: #d7d8dc' : 'background-color: transparent'">
              <b-card-text>
                <br> - رقم الهاتف: {{item.phone}}
                <br> - البريد الالكتروني: {{item.email}}
                <br> - العنوان: {{item.address_ar}}
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </tab-content>


      <tab-content title="المنتجات" icon="mdi mdi-package-variant-closed" :before-change="checkProducts">
        <b-row>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="اسم المنتج:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.name"
                  placeholder="ادخل اسم المنتج"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="ثمن المتج:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.price"
                  placeholder="ادخل ثمن المنتج"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="الكمية:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.qte"
                  placeholder="ادخل كمية المنتج"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="الوحدة:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.unit"
                  placeholder="ادخل الوحدة"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <div class="btn-grp" style="margin-top: 30px">
              <b-button @click="addItem()" variant="primary">اضافة</b-button>
            </div>
          </b-col>
          <b-col>
            <h2 class="mb-0 mt-4">{{getTotalPrice().toLocaleString('dz', { useGrouping: true }).replace(/,/g, '  ')}} دج</h2>
          </b-col>
        </b-row>
        <b-table
            responsive
            class="mb-0 mt-3 text-right"
            :items="items3"
            :fields="fields"
            table-class="bg-transparent text-nowrap"
            empty-text="لايوجد بيانات"
            v-if="items3.length > 0"
        >
          <template #cell(name)="data">
            <div>
              <div>
                <h6 class="fw-medium mb-0">
                  {{ data.item.name }}
                </h6>
              </div>
            </div>
          </template>
          <template #cell(price)="data">
            <div>
              <div>
                <h6 class="fw-medium mb-0">
                  {{ data.item.price.toLocaleString('dz', { useGrouping: true }).replace(/,/g, '  ') }}
                </h6>
              </div>
            </div>
          </template>
          <template #cell(qte)="data">
            <div>
              <div>
                <h6 class="fw-medium mb-0">
                  {{ data.item.qte }}
                </h6>
              </div>
            </div>
          </template>
          <template #cell(total)="data">
            <div>
              <div>
                <h6 class="fw-medium mb-0">
                  {{ (data.item.qte * data.item.price).toLocaleString('dz', { useGrouping: true }).replace(/,/g, '  ') }}
                </h6>
              </div>
            </div>
          </template>
          <template #cell(show_details)="data">
            <div>
              <b-button
                  v-b-popover.hover.right="data.item.name"
                  title="Nom complète"
                  size="sm"
                  variant="primary"
                  @click="deleteItem(data.item)"
                  class="mr-2"
                  v-b-modal.modal-center2
              >
                حذف
              </b-button>

            </div>
          </template>

        </b-table>
      </tab-content>


      <tab-content title="اعدادات" icon="mdi mdi-settings" :before-change="checkSettings">

        <b-row>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="رقم الفاتورة:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form2.number"
                  placeholder="ادخل رقم الفاتورة"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
                id="input-group-2"
                label="رقم الطلبية:"
                label-for="input-2"
                class="text-right"
            >
              <b-form-input
                  id="input-2"
                  v-model="form2.order_no"
                  placeholder="ادخل رقم الطلبية"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group
            id="input-group-2"
            label="اللغة:"
            label-for="input-2"
            class="text-right"
        >
          <b-form-select
              v-model="form2.lang"
              :options="options2"
          ></b-form-select>
        </b-form-group>

        <b-form-group
            id="input-group-2"
            label="اظهار الثمن:"
            label-for="input-2"
            class="text-right"
        >
          <b-form-select
              v-model="form2.withPrice"
              :options="options"
          ></b-form-select>
        </b-form-group>



      </tab-content>


      <b-button variant="danger" dark slot="prev">
        رجوع
      </b-button>
      <b-button variant="primary" slot="next">
        التالي
      </b-button>
      <b-button variant="success" slot="finish">
        إنهاء
        <i class="mdi mdi-check ml-1"></i>
      </b-button>
    </form-wizard>
  </div>
  </b-overlay>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  name: "FormWizardTab",
  data: () => ({
    title: "FormWizardTab",
    items: [],
    items2: [],
    items3: [],
    error: null,
    showError: false,
    showSuccess: false,
    successMessage: "",
    showErrorInvalid: false,
    isLoading: false,
    currentInfo: -1,
    currentPerson: -1,
    form: {
      name: "",
      unit: "-",
      price: 0,
      qte: 0
    },
    form2: {
      number: "",
      order_no: "",
      lang: "",
      withPrice: ""
    },
    fields: [
      {
        key: "name",
        label: "الاسم",
      },
      {
        key: "price",
        label: "الثمن",
      },
      {
        key: "qte",
        label: "الكمية",
      },
      {
        key: "unit",
        label: "الوحدة",
      },
      {
        key: "total",
        label: "المجموع",
      },
      {
        key: "show_details",
        label: "",
      },
    ],
    options: [
      { value: "oui", text: "نعم" },
      { value: "non", text: "لا" },
    ],
    options2: [
      { value: "ar", text: "عربية" },
      { value: "fr", text: "فرنسية" },
    ],
  }),
  methods: {
    getTotalPrice() {
      var total = 0
      for(var i=0; i<this.items3.length; i++) {
        total = total + (this.items3[i].qte * this.items3[i].price)
      }
      return parseFloat(total)
    },
    onComplete: function () {
      this.printReport()
    },
    getAllInformation() {
      this.isLoading = true
      this.$http.get("infos/get-all")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.items = response.data.data
            }else{
              this.items = []
            }
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)

          });
    },
    getAllPersons() {
      this.isLoading = true
      this.$http.get("members/get-all")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.items2 = response.data.data
            }else{
              this.items2 = []
            }
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)

          });
    },
    checkInfo() {
      return this.currentInfo !== -1;
    },
    checkPerson() {
      return this.currentPerson !== -1;
    },
    checkProducts() {
      return this.items3.length > 0;
    },
    checkSettings() {
      return this.form2.lang != "" && this.form2.number != "" && this.form2.withPrice != "";
    },
    addItem() {
      if(this.form.name != "") {
        this.items3.push(this.form)
        this.form = {
          name: "",
          unit: "-",
          price: 0,
          qte: 0
        }
      }
    },
    deleteItem(item) {
      var idx = this.items3.indexOf(item);
      if (idx !== -1) {
        this.items3.splice(idx, 1);
      }
    },
    printReport() {
      this.isLoading = true

      var strProducts = "";
      for(var i=0; i<this.items3.length; i++) {
        strProducts = strProducts + this.items3[i].name + "#" + this.items3[i].unit + "#" + this.items3[i].price + "#" + this.items3[i].qte + "$";
      }
      strProducts = strProducts.substring(0, strProducts.length - 1)

      this.$http.post('/print-invoice', {
        info: this.currentInfo,
        client: this.currentPerson,
        items: this.items3,
        lang: this.form2.lang,
        number: this.form2.number,
        order_no: this.form2.order_no,
        withPrice: this.form2.withPrice,
        strProducts: strProducts
      }, {
        responseType: 'blob',
      }).then((response) => {
        this.isLoading = false
        var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
        var W = window.open(fileURL)
        W.window.print();

        this.$router.push({ path: '/old-factures' })
      });
    },
  },
  mounted() {
    this.getAllInformation()
    this.getAllPersons()
  },
  components: {
    FormWizard,
    TabContent,
  },
};
</script>

<style>
.vue-form-wizard .wizard-nav-pills {
  margin-top: 0;
  position: relative;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-right: 0px;
}
</style>