<template>
  <b-row>
    <b-col cols="12">
      <b-card class="mb-4">
        <MonthTable></MonthTable>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import MonthTable from "../dashboards/dashboard-components/month-table/MonthTable9";
export default {
  name: "FormWizard",

  data: () => ({
    page: {
      title: "FormWizard",
    },
  }),

  components: {
    MonthTable
  },
};
</script>
