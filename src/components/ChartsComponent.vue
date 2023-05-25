<template>
  <div id="app">
    <ejs-chart :primaryXAxis="chartPrimaryXAxis" :title="chartTitle"
               :primaryYAxis="chartPrimaryYAxis" :legendSettings="chartLegendSettings"
               :tooltip="chartTooltip">
      <e-series-collection>
        <e-series type="Line" :dataSource="salesData" xName="month" yName="salesValue"
                  :marker="chartMarker" name="Time">
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import Vue from "vue";
import { ChartPlugin, LineSeries, Category, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-vue-charts';
Vue.use(ChartPlugin);
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";
export default {
  data() {
    return {
      chartPrimaryYAxis : {
        title: 'Blood Sugar Level'
      },
      chartTitle : 'Blood Sugar Analysis',
      chartPrimaryXAxis : {
        valueType : 'Category',
        title: 'Measurement Time'
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
      salesData : []
    };
  },
  methods: {
    fetchUserData() {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getDatabase();

      if (user) {
        const userRef = ref(db, 'users/' + user.uid + '/healthData');
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            let formattedData = Object.keys(data).map(key => {
              return {
                month: data[key].measurementTime,
                salesValue: data[key].bloodSugarLevel,
              };
            });
            formattedData.sort((a, b) => {
              return new Date('1970/01/01 ' + a.month) - new Date('1970/01/01 ' + b.month);
            });
            this.salesData = formattedData;
          }
        });
      } else {
        console.log("No user is signed in");
      }
    },
  },
  mounted() {
    this.fetchUserData(); // component yüklendiğinde veriyi çek
  },
  provide : {
    chart: [LineSeries, Category, DataLabel, Legend, Tooltip]
  }
}
</script>

<style>
</style>
