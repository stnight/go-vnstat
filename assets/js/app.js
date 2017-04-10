/**
 * Created by saintnight on 4/6/17.
 */
// Chart
let monthCanvas = document.querySelector('canvas#monthUsage')
var monthChart = new Chart(monthCanvas, {
    type: 'doughnut',
    data: {}
})
let hourCanvas = document.querySelector('canvas#hourUsage')
var hourChart = new Chart(hourCanvas, {
    type: 'line',
    data: {}
})
let dayCanvas = document.querySelector('canvas#dayUsage')
var dayChart = new Chart(dayCanvas, {
    type: 'bar',
    data: {}
})
const CreateDailyUsageChart = (record) => {
    dayChart.destroy()
    let dayCanvas = document.querySelector('canvas#dayUsage')
    // Generate labels
    let labels = [];
    record.interfaces[0].traffic.days.forEach((i) => {
        labels.push(`${i.date.month}/${i.date.day}/${i.date.year}`)
    })
    // Generate datasets
    let rxDataSet = {
        label: 'RX',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(100, 189, 193, 0.5)',
        borderColor: 'rgba(100, 189, 193, 0.5)',
        borderCapStyle: 'round',
        data: [],
        spanGaps: false
    }
    let txDataSet = {
        label: 'TX',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(206, 97, 100, 0.5)',
        borderColor: 'rgba(206, 97, 100, 0.5)',
        borderCapStyle: 'round',
        data: [],
        spanGaps: false
    }
    record.interfaces[0].traffic.days.forEach((i) => {
        rxDataSet.data.push(i.rx)
        txDataSet.data.push(i.tx)
    })
    dayChart = new Chart(dayCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                txDataSet,
                rxDataSet
            ]
        },
        options: {
            animation: {
                animateScale: true
            }
        }
    })
}

const CreateHourlyUsageChart = (record) => {
    hourChart.destroy()
    let hourCanvas = document.querySelector('canvas#hourUsage')
    // Generate labels
    let labels = [];
    record.interfaces[0].traffic.hours.forEach((i) => {
        labels.push(`${i.date.month}/${i.date.day}/${i.date.year} ${i.id}h`)
    })
    // Generate datasets
    let rxDataSet = {
        label: 'RX',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(100, 189, 193, 0.5)',
        borderColor: 'rgba(100, 189, 193, 0.5)',
        borderCapStyle: 'round',
        data: [],
        spanGaps: false
    }
    let txDataSet = {
        label: 'TX',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(206, 97, 100, 0.5)',
        borderColor: 'rgba(206, 97, 100, 0.5)',
        borderCapStyle: 'round',
        data: [],
        spanGaps: false
    }
    record.interfaces[0].traffic.hours.forEach((i) => {
        rxDataSet.data.push(i.rx)
        txDataSet.data.push(i.tx)
    })
    hourChart = new Chart(hourCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                txDataSet,
                rxDataSet
            ]
        },
        options: {
            animation: {
                animateScale: true
            }
        }
    })
}

const CreateMonthlyUsageChart = (record) => {
    monthChart.destroy()
    let monthCanvas = document.querySelector('canvas#monthUsage')
    monthChart = new Chart(monthCanvas, {
        type: 'doughnut',
        data: {
            labels: ['RX', 'TX'],
            datasets: [{
                data: [
                    record.interfaces[0].traffic.months[0].rx,
                    record.interfaces[0].traffic.months[0].tx
                ],
                backgroundColor: [
                    'rgba(100, 189, 193, 0.5)',
                    'rgba(206, 97, 100, 0.5)'
                ],
                borderColor: [
                    'rgba(100, 189, 193, 1)',
                    'rgba(206, 97, 100, 1)'
                ]
            }]
        },
        options: {
            animation: {
                animateScale: true
            }
        }
    })
}

// Vue Component
const info = new Vue({
    delimiters: ['({', '})'],
    el: '#InterfaceInfo',
    data: {
        name: '',
        totalRx: 0,
        totalTx: 0
    }
});

const menu = new Vue({
    delimiters: ['({', '})'],
    el: "#Interfaces",
    data: {
        selected: '',
        items: []
    },
    beforeMount: function () {
        axios.get('/AllInterfaces').then((res) => {
            this.items = res.data
        })
    },
    methods: {
        myclick: function (e) {
            e.preventDefault()
            var currentActive = document.querySelector('a.panel-block.is-active')
            if (currentActive != null) {
                currentActive.classList.toggle('is-active')
            }
            e.currentTarget.classList.toggle('is-active')
            // Call axios
            console.log(e)
            axios.get(`/VNStat/${e.target.innerText}`).then((res) => {
                CreateMonthlyUsageChart(res.data)
                CreateHourlyUsageChart(res.data)
                CreateDailyUsageChart(res.data)
                info.name = res.data.interfaces[0].nick
                info.totalRx = res.data.interfaces[0].traffic.total.rx
                info.totalTx = res.data.interfaces[0].traffic.total.tx
            })
        }
    }
})