<template>
  <b-overlay :show="isLoading" rounded="sm">
  <div>
    <b-row>
      <b-col cols="12" md="4">
        <b-form-group
            label-for="filter-input"
            label-align-sm="right"
            class="mb-2"
        >
          <b-input-group>
            <b-input-group-append>
              <b-button
                  variant="danger"
                  :disabled="!filter"
                  @click="filter = ''"
              >تفريع</b-button
              >
            </b-input-group-append>
            <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="اكتب شيء للبحث"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" cols="12" class="text-left">

      </b-col>
      <b-col md="4" cols="12" class="text-left">

      </b-col>
    </b-row>



    <b-table
      responsive
      class="mb-0 mt-3 text-right"
      :items="items"
      :fields="fields"
      :filter="filter"
      :current-page="currentPage"
      :per-page="perPage"
      table-class="bg-transparent text-nowrap"
      v-if="items.length > 0"
      empty-text="لايوجد بيانات"
      :filter-function="filterFunction"
    >
      <template #cell(key)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ (data.item.info != null) ? data.item.info.key_ar : "-" }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(number)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ data.item.number }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(member)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ (data.item.member != null) ? data.item.member.full_name_ar : "-" }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(lang)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ (data.item.lang == "ar") ? "عربية" : "فرنسية" }}
            </h6>
          </div>
        </div>
      </template>

      <template #cell(with_price)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ (data.item.with_price == "oui") ? "بالسعر" : "بدون سعر" }}
            </h6>
          </div>
        </div>
      </template>

      <template #cell(show_details)="row">
        <div class="d-flex align-items-center">
          <b-form-checkbox
              v-model="row.detailsShowing"
              @change="openDetails(row)"
          >
            تفاصيل
          </b-form-checkbox>
        </div>
      </template>

      <template #row-details="row">
        <b-card class="border" style="background-color: rgba(244,244,246,0.6)">

          <b-row>
            <b-col cols="12" md="2" lg="2">
              <b-form-group
                  id="input-group-1"
                  label="النمط"
                  label-for="input-1"
                  class="text-right"
              >
                <b-form-select
                    v-model="row.item.info.id"
                    :options="infosOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="3">
              <b-form-group
                  id="input-group-1"
                  label="المستفيد"
                  label-for="input-1"
                  class="text-right"
              >
                <b-form-select
                    v-model="row.item.member.id"
                    :options="personsOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="2">
              <b-form-group
                  id="input-group-1"
                  label="رقم الفاتورة"
                  label-for="input-1"
                  class="text-right"
              >
                <b-form-input
                    id="input-1"
                    v-model="row.item.number"
                    placeholder="رقم الفاتورة"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="2">
              <b-form-group
                  id="input-group-1"
                  label="رقم الطلبية"
                  label-for="input-1"
                  class="text-right"
              >
                <b-form-input
                    id="input-1"
                    v-model="row.item.order_no"
                    placeholder="رقم الطلبية"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="2" lg="2">
              <b-form-group
                  id="input-group-2"
                  label="اللغة"
                  label-for="input-2"
                  class="text-right"
              >
                <b-form-select
                    v-model="row.item.lang"
                    :options="options2"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="1" lg="1">
              <b-form-group
                  id="input-group-2"
                  label="اظهار الثمن"
                  label-for="input-2"
                  class="text-right"
              >
                <b-form-select
                    v-model="row.item.with_price"
                    :options="options"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

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
              <h2 class="mb-0 mt-4">{{getTotalPrice(row).toLocaleString('dz', { useGrouping: true }).replace(/,/g, '  ')}} دج</h2>
            </b-col>
          </b-row>

          <b-table
              responsive
              class="mb-0 mt-3 text-right"
              :items="items3"
              :fields="fields2"
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
                    title="اسم المنتج"
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

          <br>
          <br>
          <div class="btn-grp">
            <b-button @click="onSubmit2(this, row)" variant="primary">حفظ وطباعة</b-button>
            <b-button @click="onReset2(row)" variant="outline-danger">حذف</b-button>
          </div>

        </b-card>
      </template>

    </b-table>

    <div v-if="items.length > 0">
      <b-pagination
          class="mt-3 float-left"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
      ></b-pagination>
    </div>

    <center v-else>
      <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
      <div v-else>
        <br/>
        <br/>
        <b-img :src="require('@/assets/images/folder.png')" width="150" height="150"/>
        <br/>
        <br/>
        <h5>لايوجد بيانات</h5>
      </div>
    </center>



  </div>

  </b-overlay>

</template>
<script>

export default {
  name: "MonthTable",
  data: () => ({
    title: "MonthTable",
    filter: null,
    fields: [
      {
        key: "number",
        label: "الرقم",
      },
      {
        key: "key",
        label: "النمط",
      },
      {
        key: "member",
        label: "الزبون",
      },
      {
        key: "lang",
        label: "اللغة",
      },
      {
        key: "with_price",
        label: "مع / بدون سعر",
      },
      {
        key: "show_details",
        label: "",
      },

    ],
    fields2: [
      {
        key: "name",
        label: "اسم المنتج",
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
    items: [],
    items3: [],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,
    pageOptions: [5, 10, 15, { value: 100, text: "استضهر اكثر" }],
    form: {
      name: "",
      unit: "-",
      price: 0,
      qte: 0
    },
    show: true,
    show2: true,
    show3: true,
    error: null,
    showError: false,
    showSuccess: false,
    successMessage: "",
    showErrorInvalid: false,
    isLoading: false,
    options: [
      { value: "oui", text: "نعم" },
      { value: "non", text: "لا" },
    ],
    options2: [
      { value: "ar", text: "عربية" },
      { value: "fr", text: "فرنسية" },
    ],
    personsOptions: [],
    infosOptions: [],
  }),
  mounted() {
    this.getAllInvoices()
    this.getAllInformation()
    this.getAllPersons()
  },
  methods: {
    getTotalPrice(row) {
      var total = 0
      var products = row.item.products.split("$")
      for(var i=0; i<products.length; i++) {
        var product = products[i].split("#")
        total = total + (parseInt(product[3]) * parseFloat(product[2]))
      }
      return parseFloat(total)
    },
    filterFunction(row, content) {
      return row.number.includes(content) || row.member.full_name_ar.includes(content) || row.member.full_name_fr.includes(content) || row.info.key.includes(content) || row.info.key_ar.includes(content)
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
    openDetails(row) {
      this.items3 = []
      var products = row.item.products.split("$")
      for(var i=0; i<products.length; i++) {
        var product = products[i].split("#")
        var form = {
          name: product[0],
          unit: product[1],
          price: parseFloat(product[2]),
          qte: parseInt(product[3])
        }
        console.log(form)
        this.items3.push(form)
      }
      row.toggleDetails()
    },
    deleteItem(item) {
      var idx = this.items3.indexOf(item);
      if (idx !== -1) {
        this.items3.splice(idx, 1);
      }
    },
    getAllInvoices() {
      this.isLoading = true
      this.$http.get("invoices/get-all")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.items = response.data.data
              for(var i=0; i<this.items.length; i++) {
                if(this.items[i].member == null) {
                  this.items[i].member = {
                    id: 0
                  }
                }
                if(this.items[i].info == null) {
                  this.items[i].info = {
                    id: 0
                  }
                }
              }
            }else{
              this.items = []
            }
            this.totalRows = this.items.length;
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)
          });
    },
    printReport(row) {
      this.isLoading = true

      var strProducts = "";
      for(var i=0; i<this.items3.length; i++) {
        strProducts = strProducts + this.items3[i].name + "#" + this.items3[i].unit + "#" + this.items3[i].price + "#" + this.items3[i].qte + "$";
      }
      strProducts = strProducts.substring(0, strProducts.length - 1)

      this.$http.post('/print-invoice', {
        id: row.item.id,
        client: row.item.member.id,
        items: this.items3,
        info: row.item.info.id,
        number: row.item.number,
        order_no: row.item.order_no,
        lang: row.item.lang,
        withPrice: row.item.with_price,
        products: strProducts,
        without_save: true
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
    onSubmit2(event, row) {
    //  event.preventDefault();

      var strProducts = "";
      for(var i=0; i<this.items3.length; i++) {
        strProducts = strProducts + this.items3[i].name + "#" + this.items3[i].unit + "#" + this.items3[i].price + "#" + this.items3[i].qte + "$";
      }
      strProducts = strProducts.substring(0, strProducts.length - 1)

      this.showError = false
      this.showSuccess = false
      this.isLoading = true
      this.$http.post("invoices/update", {
        id: row.item.id,
        member_id: row.item.member.id,
        info_id: row.item.info.id,
        number: row.item.number,
        order_no: row.item.order_no,
        lang: row.item.lang,
        with_price: row.item.with_price,
        products: strProducts
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.showSuccess = true
              this.getAllInvoices()
              this.printReport(row)
            }else{
              this.showError = true
            }
          })
          .catch(error => {
            this.isLoading = false
            this.showSuccess = false
            this.error = error.response.data
            if(this.error.errors === undefined){
              this.showErrorInvalid = true
            }
            console.log(error)
            this.showError = true
          });
    },
    onReset2(row) {

      this.$bvModal.msgBoxConfirm('يجب عليك تأكيد عملية الحذف', {
        title: 'يرجى التأكيد',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'نعم',
        cancelTitle: 'لا',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {

            if(value === true) {



              this.showError = false
              this.isLoading = true
              this.$http.post("invoices/delete", {id: row.item.id})
                  .then(response => {
                    this.isLoading = false
                    if(response.status === 200){
                      this.show2 = false
                      this.showSuccess = true
                      this.getAllInvoices()
                    }else{
                      this.showError = true
                    }
                  })
                  .catch(error => {
                    this.isLoading = false
                    this.error = error.response.data
                    if(this.error.errors === undefined){
                      this.showErrorInvalid = true
                    }
                    console.log(error)
                    this.showError = true
                  });



            }

          })
          .catch(err => {
            console.log(err)
          })




    },

    hideAlerts() {
      this.showError = false
      this.showSuccess = false
    },
    getAllInformation() {
      this.isLoading = true
      this.$http.get("infos/get-all")
          .then(response => {
            this.isLoading = false
            if(response.status === 200){

              for(var i=0; i<response.data.data.length; i++) {
                this.infosOptions.push({value: response.data.data[i].id, text: response.data.data[i].key_ar})
              }

            }else{
              this.infosOptions = []
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
              for(var i=0; i<response.data.data.length; i++) {
                this.personsOptions.push({value: response.data.data[i].id, text: response.data.data[i].full_name_ar})
              }
            }else{
              this.personsOptions = []
            }
            console.log(response.data.data)
          })
          .catch(error => {
            this.isLoading = false
            console.log(error.response.data)

          });
    },
  },
};
</script>

<style>
.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-right: 0;
  padding-right: 0;
}
</style>