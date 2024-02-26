<template>
  <b-col cols="12">
    <b-card class="mb-4">
      <MonthTable></MonthTable>
    </b-card>
  </b-col>

</template>



<script>
import MonthTable from "../dashboards/dashboard-components/month-table/MonthTable2";

export default {
  name: 'Expences',
  data: () => ({

  }),
  components: {
    MonthTable,
  },

};
</script>
