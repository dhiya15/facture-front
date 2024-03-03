<template>
  <b-row>
    <b-col cols="12">
      <b-card class="mb-4">
        <h4 class="card-title mb-1">إنشاء فاتورة جديدة</h4>
        <FormWizardTab></FormWizardTab>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import FormWizardTab from "@/components/forms-layout/form-wizard/FormWizardTab";
export default {
  name: "FormWizard",

  data: () => ({
    page: {
      title: "FormWizard",
    },
  }),

  components: {
    FormWizardTab
  },
};
</script>
