<template>
  <div id="app">
    <ejs-chart :primaryXAxis="chartPrimaryXAxis" :title="chartTitle"
               :primaryYAxis="chartPrimaryYAxis" :legendSettings="chartLegendSettings"
               :tooltip="chartTooltip">
      <e-series-collection>
        <e-series type="Line" :dataSource="salesData" xName="month" yName="salesValue"
                  :marker="chartMarker" name="Sales">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import Vue from "vue";
import { ChartPlugin, LineSeries, Category, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-vue-charts';
Vue.use(ChartPlugin);
export default {
  data() {
    return {
      chartPrimaryYAxis : {
        title: 'Sales (Dollars)'
      },
      chartTitle : 'Monthly Sales Analysis',
      chartPrimaryXAxis : {
        valueType : 'Category',
        title: 'Months'
      },
      chartMarker : {
        dataLabel : {
          visible : true
        }
      },
      chartLegendSettings : {
        visible : true
      },
      chartTooltip : {
        enable : true
      },
      salesData : [
        { month: 'January', salesValue: 35 }, { month: 'February', salesValue: 28 },
        { month: 'March', salesValue: 34 }, { month: 'April', salesValue: 32 },
        { month: 'May', salesValue: 40 }, { month: 'June', salesValue: 32 },
        { month: 'July', salesValue: 35 }, { month: 'August', salesValue: 55 },
        { month: 'September', salesValue: 38 }, { month: 'October', salesValue: 30 },
        { month: 'November', salesValue: 25 }, { month: 'December', salesValue: 32 }
      ]
    };
  },
  provide : {
    chart: [LineSeries, Category, DataLabel, Legend, Tooltip]
  }
}
</script>

<style>
</style>
