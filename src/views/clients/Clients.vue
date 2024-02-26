<template>
  <b-col cols="12">
    <b-card class="mb-4">
      <!-- Header -->

      <MonthTable></MonthTable>
    </b-card>





  </b-col>

</template>



<script>
import MonthTable from "../dashboards/dashboard-components/month-table/MonthTable";

export default {
  name: 'index',
  data: () => ({

  }),
  components: {
    MonthTable,
  },

};
</script>
