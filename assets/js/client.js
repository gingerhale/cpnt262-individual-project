'use strict';

let nameLabel = [], ageData = [], yearsRegisteredData = []

async function myChart() {
    await getData()


    const ctx = document.getElementById('chart').getContext('2d');
    const xLabels = []
    const chart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: nameLabel,
            datasets: [{
                label: 'Users age',
                data: ageData,
                backgroundColor: 'darkgoldenrod',
                borderColor: ['rgba(255, 99, 132, 1)',],
            },
            {
                label: 'Years Registered',
                data: yearsRegisteredData,
                backgroundColor: 'crimson',
                borderColor: ['rgba(255, 99, 132, 1)',],
            }]
        },
        options: {
            interaction: {
                mode: 'index',
            }
        }
    });
}

myChart()


async function getData(_endpoint) {

    try {

        const apiUrl = "https://randomuser.me/api/?results=10"
        const response = await fetch(apiUrl);
        const chartData = await response.json();

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const age = chartData.results.map((x) => x.dob.age)
        const name = chartData.results.map((x) => x.name.first)
        const yearsRegistered = chartData.results.map((x) => x.registered.age)
        
        nameLabel = name
        ageData = age
        yearsRegisteredData = yearsRegistered

    } catch (error) {
        console.log('Message: ', error.message);
        console.log('Name: ', error.name);
        console.log('Cause: ', error.cause);

        document.querySelector('body').innerHTML = `<div class="error">
                                                    <div class="errorText">
                                                    <h2>There was an Error</h2>
                                                    <p>${error.message}</p>
                                                    <p> Please check the page url and try again</p>
                                                    </div>
                                                    </div>`;
    }
}









