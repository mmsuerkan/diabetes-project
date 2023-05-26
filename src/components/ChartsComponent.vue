<template>
  <div id="app">
    <div id="chart">
      <button class="export-button" @click="exportChartToPdf">PDF</button>
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
  </div>
</template>

<script>
import Vue from "vue";
import { ChartPlugin, LineSeries, Category, DataLabel, Tooltip, Legend } from '@syncfusion/ej2-vue-charts';
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
Vue.use(ChartPlugin);

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
    exportChartToPdf() {
      const element = document.getElementById('app');

      // Kırpma ayarları
      const cropOptions = {
        width: element.offsetWidth, // Genişlik
        height: element.offsetHeight, // Yükseklik
        x: 0, // Başlangıç noktası x koordinatı
        y: 110 // Başlangıç noktası y koordinatı
      };

      html2canvas(element, { ...cropOptions }).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; // PDF genişliği (in mm)
        var pageHeight = 295; // PDF yüksekliği (in mm)
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('BloodSugarAnalysis.pdf');
      });
    }
  },
  mounted() {
    this.fetchUserData();
  },
  provide : {
    chart: [LineSeries, Category, DataLabel, Legend, Tooltip]
  }
}
</script>

<style>
.export-button {
  position: absolute;
  top: 0px;
  right: 10px;
  padding-bottom: 20px;
  z-index: 9999; /* Yüksek bir değer atayarak diğer öğelerin üzerine çıkmasını sağlar */
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
