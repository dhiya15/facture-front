<template>
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
        <div class="ml-auto mt-2 mt-md-0">
          <div class="btn-grp">
            <b-button variant="outline-info" v-b-modal.modal-center @click="hideAlerts(); resetAdd()">
              اضافة معلومات
            </b-button>
          </div>
        </div>
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
    >
      <template #cell(full_name)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ data.item.full_name_ar }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(full_name)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ data.item.address_ar }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(email)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ data.item.email }}
            </h6>
          </div>
        </div>
      </template>
      <template #cell(phone)="data">
        <div>
          <div>
            <h6 class="fw-medium mb-0">
              {{ data.item.phone }}
            </h6>
          </div>
        </div>
      </template>

      <template #cell(show_details)="data">
        <div>
          <b-button
              v-b-popover.hover.right="data.item.full_name_ar"
              title="Nom complète"
              size="sm"
              variant="primary"
              @click="hideAlerts(); show2 = true; getItem(data.item)"
              class="mr-2"
              v-b-modal.modal-center2
          >
            تعديل / حذف
          </b-button>

        </div>
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

    <b-modal
        id="modal-center"
        hide-footer
        centered
        title="اضافة زبون جديد"
        class="text-right"
    >
      <div class="d-block">
        <b-overlay :show="isLoading" rounded="sm">
          <b-row>
            <b-col cols="12" lg="12">
              <b-alert
                  variant="success"
                  class="d-flex align-items-center bt-alert"
                  show
                  dismissible
                  fade
                  v-if="showSuccess"
              >
                <span class="mr-4 text-right">تمت العملية بنجاح</span>
              </b-alert>
              <b-alert
                  variant="danger"
                  class="d-flex align-items-center bt-alert text-right"
                  show
                  dismissible
                  fade
                  v-if="showError"
              >
                <b-col class="mr-4">
                  <div v-for="(errorArray, idx) in error.errors" :key="idx">
                    <div v-for="(allErrors, idx) in errorArray" :key="idx">
                      <span class="text-danger text-right">{{ allErrors}} </span>
                    </div>
                  </div>
                  <div v-if="showErrorInvalid">
                    <span class="text-danger text-right">{{ error.message }} </span>
                  </div>
                </b-col>
              </b-alert>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-1"
                    label="عنوان البريد الالكتروني:"
                    label-for="input-1"
                    class="text-right"
                >
                  <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      placeholder="ادخل البريد الالكتروني"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="الاسم بالعربية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.full_name_ar"
                          placeholder="ادخل الاسم بالعربية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="الاسم بالفرنسية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.full_name_fr"
                          placeholder="ادخل الاسم بالفرنسية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="العنوان بالعربية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.address_ar"
                          placeholder="ادخل العنوان بالعربية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="العنوان بالفرنسية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.address_fr"
                          placeholder="ادخل العنوان بالفرنسية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>





                <b-form-group
                    id="input-group-2"
                    label="رقم الهاتف:"
                    label-for="input-2"
                    class="text-right"
                >
                  <b-form-input
                      id="input-2"
                      v-model="form.phone"
                      placeholder="ادخل رقم الهاتف"
                      required
                  ></b-form-input>
                </b-form-group>

                <div class="btn-grp">
                  <b-button type="submit" variant="primary">اضافة</b-button>
                  <b-button type="reset" variant="outline-danger">تفريغ</b-button>
                </div>
              </b-form>
            </b-col>
          </b-row>
        </b-overlay>
      </div>
    </b-modal>


    <b-modal
        id="modal-center2"
        hide-footer
        centered
        title="تعديل زبون"
        class="text-right"
    >
      <div class="d-block">
        <b-overlay :show="isLoading" rounded="sm">
          <b-row>
            <b-col cols="12" lg="12">
              <b-alert
                  variant="success"
                  class="d-flex align-items-center bt-alert"
                  show
                  dismissible
                  fade
                  v-if="showSuccess"
              >
                <span class="mr-4 text-right">تمت العملية بنجاح</span>
              </b-alert>
              <b-alert
                  variant="danger"
                  class="d-flex align-items-center bt-alert text-right"
                  show
                  dismissible
                  fade
                  v-if="showError"
              >
                <b-col class="mr-4">
                  <div v-for="(errorArray, idx) in error.errors" :key="idx">
                    <div v-for="(allErrors, idx) in errorArray" :key="idx">
                      <span class="text-danger text-right">{{ allErrors}} </span>
                    </div>
                  </div>
                  <div v-if="showErrorInvalid">
                    <span class="text-danger text-right">{{ error.message }} </span>
                  </div>
                </b-col>
              </b-alert>
              <b-form @submit="onSubmit2" v-if="show2">
                <b-form-group
                    id="input-group-1"
                    label="عنوان البريد الالكتروني:"
                    label-for="input-1"
                    class="text-right"
                >
                  <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      placeholder="ادخل البريد الالكتروني"
                  ></b-form-input>
                </b-form-group>

                <b-row>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="الاسم بالعربية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.full_name_ar"
                          placeholder="ادخل الاسم بالعربية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="الاسم بالفرنسية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.full_name_fr"
                          placeholder="ادخل الاسم بالفرنسية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="العنوان بالعربية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.address_ar"
                          placeholder="ادخل العنوان بالعربية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                        id="input-group-2"
                        label="العنوان بالفرنسية:"
                        label-for="input-2"
                        class="text-right"
                    >
                      <b-form-input
                          id="input-2"
                          v-model="form.address_fr"
                          placeholder="ادخل العنوان بالفرنسية"
                          required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>





                <b-form-group
                    id="input-group-2"
                    label="رقم الهاتف:"
                    label-for="input-2"
                    class="text-right"
                >
                  <b-form-input
                      id="input-2"
                      v-model="form.phone"
                      placeholder="ادخل رقم الهاتف"
                      required
                  ></b-form-input>
                </b-form-group>





                <div class="btn-grp">
                  <b-button type="submit" variant="primary">تعديل</b-button>
                  <b-button @click="onReset2" variant="outline-danger">حذف</b-button>
                </div>
              </b-form>
            </b-col>
          </b-row>
        </b-overlay>
      </div>
    </b-modal>


  </div>



</template>
<script>

export default {
  name: "MonthTable2",
  data: () => ({
    title: "MonthTable2",
    filter: null,
    fields: [
      {
        key: "full_name_ar",
        label: "الاسم بالعربية",
      },
      {
        key: "full_name_fr",
        label: "الاسم بالفرنسية",
      },
      {
        key: "email",
        label: "الايميل",
      },
      {
        key: "phone",
        label: "الهاتف",
      },
      {
        key: "address_ar",
        label: "العنوان بالعربية",
      },
      {
        key: "address_fr",
        label: "العنوان بالفرنسية",
      },
      {
        key: "show_details",
        label: "",
      },

    ],
    items: [],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,
    pageOptions: [5, 10, 15, { value: 100, text: "استضهر اكثر" }],
    form: {
      email: "",
      full_name_ar: "",
      full_name_fr: "",
      address_ar: "",
      address_fr: "",
      phone: "",
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
  }),
  mounted() {
    this.totalRows = this.items.length;
    this.getAllPersons()
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.showError = false
      this.showSuccess = false
      this.isLoading = true
      this.$http.post("members/create", this.form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.showSuccess = true
              this.getAllPersons()
              this.onReset()
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
    getAllPersons() {
      this.isLoading = true
      this.$http.get("members/get-all")
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
    onSubmit2(event) {
      event.preventDefault();
      this.showError = false
      this.showSuccess = false
      this.isLoading = true
      this.$http.post("members/update", this.form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then(response => {
            this.isLoading = false
            if(response.status === 200){
              this.showSuccess = true

              this.getAllPersons()
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
    onReset() {
      //   event.preventDefault();
      this.form.email = "";
      this.form.full_name_ar = "";
      this.form.full_name_fr = "";
      this.form.address_ar = "";
      this.form.address_fr = "";
      this.form.phone = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onReset2() {

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
              this.$http.post("members/delete", this.form)
                  .then(response => {
                    this.isLoading = false
                    if(response.status === 200){
                      this.show2 = false
                      this.showSuccess = true
                      this.getAllPersons()
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
    getItem(item) {
      this.hideAlerts()

      this.form.id = item.id
      this.form.phone = item.phone
      this.form.full_name_ar = item.full_name_ar
      this.form.full_name_fr = item.full_name_fr
      this.form.address_fr = item.address_fr
      this.form.address_ar = item.address_ar
      this.form.email = item.email
    },
    resetAdd() {
      this.form.email = "";
      this.form.full_name_ar = "";
      this.form.full_name_fr = "";
      this.form.address_ar = "";
      this.form.address_fr = "";
      this.form.phone = "";
    },
    hideAlerts() {
      this.showError = false
      this.showSuccess = false
    }
  },
};
</script>